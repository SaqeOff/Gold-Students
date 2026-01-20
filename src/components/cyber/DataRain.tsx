"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { COLORS } from "./constants";

interface DataStreamProps {
    left: string;
    delay: number;
    duration: number;
    opacity: number;
    fontSize: string;
    chars: string[];
}

const DataStream = ({ left, delay, duration, opacity, fontSize, chars }: DataStreamProps) => {
    const [streamChars, setStreamChars] = useState<string[]>([]);

    useEffect(() => {
        const generated = Array.from({ length: 30 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
        );
        setStreamChars(generated);
    }, [chars]);

    return (
        <motion.div
            className="absolute top-0 font-mono whitespace-pre leading-tight"
            style={{
                left,
                fontSize,
                color: COLORS.matrixGreen,
                opacity,
                textShadow: `0 0 10px ${COLORS.matrixGreen}60`,
                writingMode: "vertical-rl",
                textOrientation: "upright",
            }}
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            {streamChars.map((char, i) => (
                <motion.span
                    key={i}
                    animate={{
                        opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.div>
    );
};

export const DataRain = () => {
    // Self-contained mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        if (typeof window !== "undefined") {
            window.addEventListener("mousemove", handleMouseMove);
        }
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("mousemove", handleMouseMove);
            }
        }
    }, [mouseX, mouseY]);

    const chars = ["0", "1", "A", "B", "C", "D", "E", "F", "X", "▓", "░", "█"];

    const parallaxX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [20, -20]);
    const parallaxY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [10, -10]);
    const smoothX = useSpring(parallaxX, { stiffness: 50, damping: 30 });
    const smoothY = useSpring(parallaxY, { stiffness: 50, damping: 30 });

    const streams = useMemo(() => {
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: `${5 + i * 6.5}%`,
            delay: Math.random() * 5,
            duration: 8 + Math.random() * 12,
            opacity: 0.1 + Math.random() * 0.2,
            fontSize: `${8 + Math.random() * 6}px`,
        }));
    }, []);

    return (
        <motion.div
            className="fixed inset-0 overflow-hidden pointer-events-none z-[1]"
            style={{
                x: smoothX,
                y: smoothY,
            }}
        >
            {streams.map((stream) => (
                <DataStream
                    key={stream.id}
                    left={stream.left}
                    delay={stream.delay}
                    duration={stream.duration}
                    opacity={stream.opacity}
                    fontSize={stream.fontSize}
                    chars={chars}
                />
            ))}
        </motion.div>
    );
};
