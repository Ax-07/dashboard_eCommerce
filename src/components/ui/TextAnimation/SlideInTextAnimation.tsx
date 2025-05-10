import React from "react";

interface SlideInTextAnimationProps {
    text?: string;
}

export const SlideInTextAnimation: React.FC<SlideInTextAnimationProps> = ({ text }) => {
    const defaultText = "Text Animation";
    const displayedText = text || defaultText;
    const letters = displayedText.split("");

    return (
        <div className="mt-10 flex items-center justify-start">
            {letters.map((letter, index) => (
                <span
                    key={index}
                    className="inline-block animate-moveIn text-2xl font-bold opacity-0"
                    style={{ animationDelay: `${(index / 7) + 0.25}s` }}
                >
                    {letter}
                </span>
            ))}
        </div>
    );
};
