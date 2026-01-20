"use client";

import { motion } from "framer-motion";
import { COLORS } from "./constants";

export const AmbientBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Ambient Plasma Orbs */}
        <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
                background: `radial-gradient(circle, ${COLORS.cyberCyan}15 0%, transparent 70%)`,
                filter: "blur(100px)",
            }}
            animate={{
                x: [0, 50, -30, 0],
                y: [0, -30, 50, 0],
                scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
        <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
                background: `radial-gradient(circle, ${COLORS.matrixGreen}12 0%, transparent 70%)`,
                filter: "blur(120px)",
            }}
            animate={{
                x: [0, -40, 60, 0],
                y: [0, 60, -40, 0],
                scale: [1, 0.9, 1.15, 1],
            }}
            transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
                background: `radial-gradient(circle, ${COLORS.highVoltageGold}08 0%, transparent 60%)`,
                filter: "blur(150px)",
            }}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />

        {/* Perspective Grid */}
        <div
            className="absolute inset-0"
            style={{
                background: `
          linear-gradient(to bottom, transparent 0%, ${COLORS.voidBlack} 100%),
          linear-gradient(90deg, rgba(0,243,255,0.04) 1px, transparent 1px),
          linear-gradient(rgba(0,243,255,0.04) 1px, transparent 1px)
        `,
                backgroundSize: "100% 100%, 60px 60px, 60px 60px",
                transform: "perspective(500px) rotateX(60deg)",
                transformOrigin: "center top",
                animation: "gridScroll 20s linear infinite",
            }}
        />

        {/* Vignette Overlay */}
        <div
            className="absolute inset-0"
            style={{
                background: `radial-gradient(ellipse at center, transparent 0%, ${COLORS.voidBlack}90 80%)`,
            }}
        />

        {/* Scanlines */}
        <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
                background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 243, 255, 0.15) 2px,
          rgba(0, 243, 255, 0.15) 4px
        )`,
            }}
        />

        <style jsx>{`
      @keyframes gridScroll {
        0% {
          background-position: 0 0, 0 0, 0 0;
        }
        100% {
          background-position: 0 0, 0 60px, 0 60px;
        }
      }
    `}</style>
    </div>
);
