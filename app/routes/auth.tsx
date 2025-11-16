import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'CheckMyResume | Auth' },
    { name: 'description', content: 'Sign in to your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 rounded-2xl p-10 bg-white">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-black">Welcome Back</h1>
                        <h2 className="text-gray-700">Sign In to Advance Your Career Path</h2>
                        <p className="text-sm text-gray-500 mt-2 max-w-md">
                            New here? No worries! Signing in will create your account automatically. 
                            Simply click "Log In" below to begin.
                        </p>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth
