import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    // Helper to add a timeout to promises so the UI doesn't hang forever
    const withTimeout = async <T,>(p: Promise<T>, ms = 20000): Promise<T> => {
        let timeout: ReturnType<typeof setTimeout> | null = null;
        const timeoutPromise = new Promise<never>((_, reject) => {
            timeout = setTimeout(() => reject(new Error('Operation timed out')), ms);
        });

        try {
            return await Promise.race([p, timeoutPromise]) as T;
        } finally {
            if (timeout) clearTimeout(timeout);
        }
    };
    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);
        setStatusText('Uploading the file...');

        try {
            const uploadedFile = await withTimeout(fs.upload([file]));
            if(!uploadedFile) {
                return setStatusText('Error: Failed to upload file');
            }

            setStatusText('Converting to image...');
            const imageFile = await withTimeout(convertPdfToImage(file));
            if(!imageFile.file) {
                return setStatusText('Error: Failed to convert PDF to image');
            }

            setStatusText('Uploading the image...');
            const uploadedImage = await withTimeout(fs.upload([imageFile.file]));
            if(!uploadedImage) {
                return setStatusText('Error: Failed to upload image');
            }

            setStatusText('Preparing data...');
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: (uploadedFile as any).path,
                imagePath: (uploadedImage as any).path,
                companyName, jobTitle, jobDescription,
                feedback: '',
            }
            await withTimeout(kv.set(`resume:${uuid}`, JSON.stringify(data)));

            setStatusText('Analyzing...');

            const feedback = await withTimeout(ai.feedback(
                (uploadedFile as any).path,
                prepareInstructions({ jobTitle, jobDescription })
            ), 60000);
            
            // Check if feedback indicates an error
            if (!feedback || (feedback as any).success === false) {
                const errorMsg = (feedback as any)?.error?.message || 'Failed to analyze resume';
                return setStatusText(`Error: ${errorMsg}`);
            }

            // feedback.message.content may be string or an array/object depending on SDK
            // handle gracefully
            let feedbackText = '';
            try {
                // @ts-expect-error - runtime shape
                feedbackText = typeof feedback.message.content === 'string'
                    ? feedback.message.content
                    : feedback.message.content[0]?.text ?? JSON.stringify(feedback);
            } catch (err) {
                feedbackText = JSON.stringify(feedback);
            }

            try {
                data.feedback = JSON.parse(feedbackText);
            } catch (err) {
                // If parsing fails, store raw feedback for debugging
                data.feedback = { raw: feedbackText } as any;
            }

            await withTimeout(kv.set(`resume:${uuid}`, JSON.stringify(data)));
            setStatusText('Analysis complete, redirecting...');
            navigate(`/resume/${uuid}`);
        } catch (err: any) {
            const msg = err instanceof Error ? err.message : String(err);
            setStatusText(`Error: ${msg}`);
        } finally {
            setIsProcessing(false);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main>
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Get expert analysis for your ideal position</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Upload your resume to get an ATS score and actionable suggestions</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
