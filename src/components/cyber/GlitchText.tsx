"use client";

import { useState, useEffect } from "react";

export const GlitchText = ({
    children,
    className = "",
    delay = 0,
}: {
    children: string;
    className?: string;
    delay?: number;
}) => {
    const [displayText, setDisplayText] = useState("");
    const [isDecoding, setIsDecoding] = useState(true);
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    useEffect(() => {
        const timeout = setTimeout(() => {
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplayText(
                    children
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) return children[index];
                            if (char === " ") return " ";
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );
                if (iteration >= children.length) {
                    clearInterval(interval);
                    setIsDecoding(false);
                }
                iteration += 1 / 2;
            }, 30);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [children, delay]);

    return (
        <span className={`font-mono ${className} ${isDecoding ? "text-[#00f3ff]" : ""}`}>
            {displayText || children}
        </span>
    );
};
