"use client";

import React from "react";

interface CircularProgressProps {
    value: number; // 0-100
    size?: number;
    strokeWidth?: number;
    color?: string;
    backgroundColor?: string;
    showValue?: boolean;
    label?: string;
    glowEffect?: boolean;
}

/**
 * Premium Circular Progress Gauge with SVG
 * Features glow effect and smooth animations
 */
export default function CircularProgress({
    value,
    size = 120,
    strokeWidth = 8,
    color = "#f59e0b", // Gold/Amber
    backgroundColor = "rgba(255, 255, 255, 0.1)",
    showValue = true,
    label,
    glowEffect = true,
}: CircularProgressProps) {
    // Clamp value between 0 and 100
    const clampedValue = Math.min(100, Math.max(0, value));

    // SVG calculations
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;
    const center = size / 2;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
                style={{
                    filter: glowEffect ? `drop-shadow(0 0 10px ${color}40)` : undefined,
                }}
            >
                {/* Glow filter definition */}
                {glowEffect && (
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                )}

                {/* Background circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                    className="opacity-30"
                />

                {/* Progress circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                    filter={glowEffect ? "url(#glow)" : undefined}
                />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {showValue && (
                    <span
                        className="font-bold text-white"
                        style={{ fontSize: size * 0.25 }}
                    >
                        {Math.round(clampedValue)}
                    </span>
                )}
                {label && (
                    <span
                        className="text-slate-400 uppercase tracking-wider"
                        style={{ fontSize: size * 0.09 }}
                    >
                        {label}
                    </span>
                )}
            </div>
        </div>
    );
}

/**
 * Mini version for compact displays
 */
export function CircularProgressMini({
    value,
    color = "#f59e0b",
}: {
    value: number;
    color?: string;
}) {
    return (
        <CircularProgress
            value={value}
            size={48}
            strokeWidth={4}
            color={color}
            showValue={true}
            glowEffect={false}
        />
    );
}
