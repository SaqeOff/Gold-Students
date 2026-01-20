"use client";

import React from "react";
import { AmbientBackground } from "./AmbientBackground";
import { DataRain } from "./DataRain";
import { COLORS } from "./constants";

export const CyberLayout = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div
            className={`min-h-screen relative flex flex-col ${className}`}
            style={{ backgroundColor: COLORS.voidBlack }}
        >
            <AmbientBackground />
            <DataRain />
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
};
