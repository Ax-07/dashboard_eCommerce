import React, { useEffect, useRef } from 'react';

interface TextAnimationProps {
    text?: string;
}

export const TextAnimation: React.FC<TextAnimationProps> = ({text}) => {
    const defaultText = "Text Animation";
    const displayedText = text ? text : defaultText;
    const textRef = useRef<SVGTextElement>(null);
    const duration = "1.5s";
    const delay = "1s";

    useEffect(() => {
        const textLength = 600; // Change this value to fit your needs
        if (textRef.current) {
            textRef.current.style.strokeDasharray = `${textLength}px`;
            textRef.current.style.strokeDashoffset = `${textLength}px`;
        }
    }, []);

    return (
        <svg className="w-full h-auto mt-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150" height="150" width="1200" >
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="10%" style={{ stopColor: '#fff', stopOpacity: 0 }}>
                        <animate attributeName="stop-opacity" values="0;1" dur={duration} begin={delay} repeatCount="0" fill='freeze'/>
                    </stop>
                    <stop offset="50%" style={{ stopColor: '#333', stopOpacity: 0 }}>
                        <animate attributeName="stop-opacity" values="0;1" dur={duration} begin={delay} repeatCount="0" fill='freeze'/>
                    </stop>
                    <stop offset="80%" style={{ stopColor: '#d9d9d9', stopOpacity: 0 }}>
                        <animate attributeName="stop-opacity" values="0;1" dur={duration} begin={delay} repeatCount="0" fill='freeze'/>
                    </stop>
                </linearGradient>
                <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="80%" style={{ stopColor: '#999', stopOpacity: 0 }}>
                        <animate attributeName="stop-opacity" values="0;1" dur={duration} repeatCount="0" fill='freeze'/>
                    </stop>
                    <stop offset="100%" style={{ stopColor: '#fff', stopOpacity: 0 }}>
                        <animate attributeName="stop-opacity" values="0;1" dur={duration} repeatCount="0" fill='freeze'/>
                    </stop>
                </linearGradient>
                <filter id="shadow-sm" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="0" floodColor={"#fff"}>
                        <animate attributeName="flood-opacity" values="0;1;0.1" dur={duration} begin={delay} repeatCount="0" fill='freeze'/>
                        <animate attributeName="stdDeviation" values="0;2;0" dur="1.5s" begin="2.5s" repeatCount="0" fill='freeze'/>
                    </feDropShadow>                
                </filter>
            </defs>
            <text
                ref={textRef}
                x="50%"
                y="50%"
                fill="url(#grad)"
                fontSize="128px"
                fontStyle="italic"
                fontFamily="Roboto"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke="url(#gradStroke)"
                strokeWidth="2"
                filter="url(#shadow)"
            >
                {displayedText}
                <animate attributeName="stroke-dashoffset" from="700" to="0" dur={"3s"} fill="freeze" />
            </text>
        </svg>
    )
};