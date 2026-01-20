"use client";

import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "./constants";

export const CyberCard = ({
    children,
    className = "",
    delay = 0,
    glowColor = COLORS.cyberCyan,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    glowColor?: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
            delay,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
        }}
        whileHover={{
            scale: 1.02,
            boxShadow: `0 0 40px ${glowColor}30, inset 0 0 20px ${glowColor}10`,
        }}
        className={`
      relative overflow-hidden
      bg-black/50 backdrop-blur-xl
      border border-white/10
      transition-all duration-300
      hover:border-[#00f3ff]/50
      ${className}
    `}
        style={{
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
        }}
    >
        {/* Inner glow effect */}
        <div
            className="absolute inset-0 opacity-20"
            style={{
                background: `radial-gradient(ellipse at 50% 0%, ${glowColor}20 0%, transparent 50%)`,
            }}
        />
        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#00f3ff]/30" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#00f3ff]/30" />
        <div className="absolute bottom-6 left-2 w-4 h-4 border-l-2 border-b-2 border-[#00f3ff]/30" />
        {children}
    </motion.div>
);
