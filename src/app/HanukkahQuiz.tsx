"use client";

import React, { useState, useEffect } from 'react';
import { Flame, Gift, Star, Moon, Music } from 'lucide-react';

// Rest of the code remains exactly the same...
// (Previous code continues unchanged from here)

const styleSheet = `
@keyframes sparkle {
0%, 100% { opacity: 1; transform: scale(1); }
50% { opacity: 0.5; transform: scale(0.8); }
}

@keyframes float {
0%, 100% { transform: translateY(0); }
50% { transform: translateY(-20px); }
}

@keyframes twinkle {
0%, 100% { opacity: 0.2; }
50% { opacity: 0.8; }
}

@keyframes flicker {
0%, 100% { opacity: 1; transform: scale(1); }
50% { opacity: 0.8; transform: scale(0.98); }
}
`;

const Star1 = ({ style } :{style : React.CSSProperties} ) => (
<div 
    className="absolute animate-[twinkle_3s_ease-in-out_infinite]"
    style={style}
>
    <div className="w-1 h-1 bg-yellow-200 rounded-full" />
</div>
);

const BackgroundStars = () => (
<div className="fixed inset-0 overflow-hidden pointer-events-none">
    {Array(100).fill(0).map((_, i) => (
    <Star1
        key={i}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`
        }}
    />
    ))}
</div>
);

const Dreidel = ({ style = {} }) => (
<div 
    className="hover:animate-spin transition-all duration-1000 cursor-pointer"
    style={{ ...style, animationDuration: '3s' }}
>
    <svg width="40" height="40" viewBox="0 0 100 100">
    <polygon 
        points="50,10 90,50 50,90 10,50" 
        className="fill-yellow-400 stroke-blue-600"
        filter="url(#glow)"
    />
    <defs>
        <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
        </filter>
    </defs>
    <text 
        x="50" 
        y="55" 
        textAnchor="middle" 
        className="fill-blue-900 font-bold text-2xl"
    >
        נ
    </text>
    </svg>
</div>
);

const FloatingDreidels = () => {
const dreidelPositions = Array(12).fill(0).map(() => ({
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 90}%`,
    animationDelay: `${Math.random() * 5}s`,
    rotate: `${Math.random() * 360}deg`
}));

return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {dreidelPositions.map((pos, i) => (
        <div
        key={i}
        className="absolute animate-[float_6s_ease-in-out_infinite]"
        style={{
            left: pos.left,
            top: pos.top,
            animationDelay: pos.animationDelay,
        }}
        >
        <Dreidel style={{ transform: `rotate(${pos.rotate})` }} />
        </div>
    ))}
    </div>
);
};

const Menorah = ({ count } : {count : number} ) => (
<div className="relative">
    <div className="flex justify-center items-end gap-2 mb-8">
      {/* Base of Menorah */}
    <div className="absolute bottom-0 w-full h-4 bg-yellow-600 rounded-full blur-sm" />
    
      {/* Shamash */}
    <div className="relative h-20 mx-4">
        <div className="w-3 h-16 bg-gradient-to-t from-yellow-600 to-yellow-100 rounded-full" />
        <Flame 
        className="absolute -top-6 left-1/2 -translate-x-1/2 animate-[flicker_1.5s_ease-in-out_infinite] text-yellow-400" 
        size={24}
        />
    </div>
    
    {Array(8).fill(0).map((_, index) => (
        <div key={index} className="relative h-16">
        <div className="w-3 h-12 bg-gradient-to-t from-yellow-600 to-yellow-100 rounded-full" />
        {index < count && (
            <Flame 
            className="absolute -top-6 left-1/2 -translate-x-1/2 animate-[flicker_1.5s_ease-in-out_infinite] text-yellow-400" 
            size={24}
            />
        )}
        </div>
    ))}
    </div>
    </div>
);

const HanukkahQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const questions = [
        {
            question: "כמה ימים חוגגים את חג החנוכה?",
            options: ["6 ימים", "7 ימים", "8 ימים", "9 ימים"],
            correctAnswer: "8 ימים",
            explanation: "חג החנוכה נמשך 8 ימים, כנגד הנס שבו פך השמן הספיק לשמונה ימים"
        },
        {
            question: "מה שם המטבע שמשחקים בו בחנוכה?",
            options: ["דרעידל", "סביבון", "חנוכייה", "לביבה"],
            correctAnswer: "סביבון",
            explanation: "הסביבון הוא משחק מסורתי בחנוכה, ועליו האותיות נ׳ ג׳ ה׳ פ׳"
        },
        {
            question: "איזה שמן השתמשו בבית המקדש?",
            options: ["שמן קנולה", "שמן זית", "שמן סויה", "שמן חמניות"],
            correctAnswer: "שמן זית",
            explanation: "שמן הזית היה השמן הטהור ששימש להדלקת המנורה בבית המקדש"
        },
        {
            question: "מי היו הגיבורים שניצחו ביוון?",
            options: ["הפרושים", "החשמונאים", "הצדוקים", "הרומאים"],
            correctAnswer: "החשמונאים",
            explanation: "החשמונאים, בהנהגת מתתיהו ובניו, הובילו את המרד נגד היוונים"
        },
        {
            question: "כמה נרות מדליקים בסך הכל במשך כל ימי החנוכה?",
            options: ["36", "44", "45", "50"],
            correctAnswer: "44",
            explanation: "מדליקים נר אחד ביום הראשון, שניים בשני וכן הלאה, בנוסף לשמש - סך הכל 44 נרות"
        },
    
    ];

    const handleAnswerClick = (selectedAnswer: string) => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
            setShowExplanation(true);
        } else {
            setShowExplanation(true);
        }
        
        setTimeout(() => {
            setShowExplanation(false);
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowScore(true);
            }
        }, 2500);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setShowExplanation(false);
    };

    useEffect(() => {
        // Add custom animations
        const style = document.createElement('style');
        style.textContent = styleSheet;
        document.head.appendChild(style);
        return () => {document.head.removeChild(style);}
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-blue-950 p-4">
            <style>{styleSheet}</style>
            
            {/* Interactive Background Elements */}
            <BackgroundStars />
            <FloatingDreidels />
            
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/api/placeholder/400/400')] opacity-5" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/50" />
            </div>
            
            {/* Main Content */}
            <div className="max-w-2xl mx-auto relative">
                {/* Music Toggle */}
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-blue-900/50 hover:bg-blue-800/50 
                            transition-all duration-300 text-yellow-400 hover:text-yellow-300"
                >
                    <Music className={`${isPlaying ? 'animate-pulse' : ''}`} />
                </button>

                <div className="relative bg-gradient-to-tr from-blue-900/80 to-purple-900/80 rounded-xl 
                            shadow-2xl backdrop-blur-sm border border-indigo-500/30 p-8">
                    
                    <Menorah count={currentQuestion + 1} />
                    
                    <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400 
                                flex items-center justify-center gap-3 animate-[flicker_4s_ease-in-out_infinite]">
                        <Star className="text-yellow-400" size={32} />
                        חידון חנוכה
                        <Star className="text-yellow-400" size={32} />
                    </h1>
                    
                    {showScore ? (
                        <div className="text-center bg-blue-900/70 p-8 rounded-xl backdrop-blur-sm border border-blue-400/30">
                            <h2 className="text-3xl mb-6 text-white">
                                הציון שלך הוא: {score} מתוך {questions.length}
                            </h2>
                            <div className="flex justify-center gap-3 mb-6">
                                {Array(score).fill(0).map((_, index) => (
                                    <Gift key={index} className="text-yellow-400 animate-bounce" size={32} />
                                ))}
                            </div>
                            <button
                                onClick={restartQuiz}
                                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-8 py-3 rounded-xl 
                                        hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-bold 
                                        transform hover:scale-105 shadow-lg"
                            >
                                שחק שוב
                            </button>
                        </div>
                    ) : (
                        <div className="bg-blue-900/70 p-6 rounded-xl backdrop-blur-sm border border-blue-400/30">
                            <div className="mb-6">
                                <p className="text-lg font-medium text-yellow-300 flex items-center gap-2">
                                    <Moon className="animate-pulse" />
                                    שאלה {currentQuestion + 1} מתוך {questions.length}
                                </p>
                                <h2 className="text-2xl mt-3 text-white">{questions[currentQuestion].question}</h2>
                            </div>
                            
                            {showExplanation ? (
                                <div className="bg-green-800/50 p-6 rounded-xl mb-4 text-white animate-fade-in border border-green-500/30">
                                    {questions[currentQuestion].explanation}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerClick(option)}
                                            className="w-full text-right p-4 bg-blue-800/50 border border-yellow-500/30 rounded-xl 
                                                    hover:bg-yellow-500/20 text-white transition-all duration-300
                                                    transform hover:scale-[1.02] hover:border-yellow-400 relative group"
                                        >
                                            <span className="relative z-10">{option}</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent 
                                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HanukkahQuiz;