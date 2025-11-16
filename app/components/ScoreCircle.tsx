const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = score / 100;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div className="relative w-[100px] h-[100px]">
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 100 100"
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    className="dark-mode-stroke-bg"
                    stroke="#e5e7eb"
                    strokeWidth={stroke}
                    fill="transparent"
                />
                {/* Partial circle with gradient */}
                <defs>
                    <linearGradient id="grad-light" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#000000" />
                        <stop offset="100%" stopColor="#404040" />
                    </linearGradient>
                    <linearGradient id="grad-dark" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#cccccc" />
                    </linearGradient>
                </defs>
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    className="dark-mode-stroke"
                    stroke="url(#grad-light)"
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>

            {/* Score and issues */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-base text-black dark-mode-text">{`${score}/100`}</span>
            </div>
        </div>
    );
};

export default ScoreCircle;
