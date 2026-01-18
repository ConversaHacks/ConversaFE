import { useEffect } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFCF9] animate-in fade-in duration-700">
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Abstract Human Motif */}
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-orange-100 rounded-full blur-sm opacity-80" />
                <div className="absolute bottom-4 right-4 w-32 h-32 bg-indigo-50 rounded-full blur-sm opacity-80" />

                {/* Memory Fragments / Speech Bubbles */}
                <div className="absolute top-12 left-12 w-16 h-12 bg-indigo-200/40 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
                <div className="absolute top-8 right-16 w-14 h-10 bg-orange-200/40 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
                <div className="absolute top-20 right-8 w-12 h-12 bg-teal-100/40 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.2s' }} />

                {/* Central Visual */}
                <div className="relative z-10 flex gap-4 items-end">
                    <div className="w-20 h-28 bg-[#F5E6D3] rounded-t-full rounded-b-lg shadow-sm" />
                    <div className="w-20 h-28 bg-[#E3DCD2] rounded-t-full rounded-b-lg shadow-sm" />
                </div>

                {/* Connecting Threads (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 256 256">
                    <path d="M80,180 Q128,140 176,180" fill="none" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                    <circle cx="128" cy="150" r="2" fill="#818CF8" className="animate-ping" />
                </svg>
            </div>

            <div className="mt-12 text-center z-10">
                <h1 className="text-4xl font-semibold text-slate-800 tracking-tight">Conversa</h1>
                <p className="mt-3 text-slate-400 font-medium tracking-wide text-sm opacity-80">
                    Remember what matters. Stay present.
                </p>
            </div>
        </div>
    );
};

export default SplashScreen;
