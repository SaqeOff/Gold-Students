"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Sparkles,
    User,
    ArrowLeft,
    Bot,
    Loader2,
    X,
    Cpu,
    Activity,
    Terminal,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/UserContext";

// =========================================
// DESIGN TOKENS
// =========================================
const COLORS = {
    voidBlack: "#050505",
    cyberCyan: "#00f3ff",
    highVoltageGold: "#FFD700",
    matrixGreen: "#0aff00",
    errorRed: "#ff003c",
};

// =========================================
// CIRCUIT BACKGROUND PATTERN
// =========================================
const CircuitBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Hex Grid Pattern */}
        <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: `
          linear-gradient(30deg, ${COLORS.cyberCyan}20 12%, transparent 12.5%, transparent 87%, ${COLORS.cyberCyan}20 87.5%, ${COLORS.cyberCyan}20),
          linear-gradient(150deg, ${COLORS.cyberCyan}20 12%, transparent 12.5%, transparent 87%, ${COLORS.cyberCyan}20 87.5%, ${COLORS.cyberCyan}20),
          linear-gradient(30deg, ${COLORS.cyberCyan}20 12%, transparent 12.5%, transparent 87%, ${COLORS.cyberCyan}20 87.5%, ${COLORS.cyberCyan}20),
          linear-gradient(150deg, ${COLORS.cyberCyan}20 12%, transparent 12.5%, transparent 87%, ${COLORS.cyberCyan}20 87.5%, ${COLORS.cyberCyan}20),
          linear-gradient(60deg, ${COLORS.cyberCyan}10 25%, transparent 25.5%, transparent 75%, ${COLORS.cyberCyan}10 75%, ${COLORS.cyberCyan}10),
          linear-gradient(60deg, ${COLORS.cyberCyan}10 25%, transparent 25.5%, transparent 75%, ${COLORS.cyberCyan}10 75%, ${COLORS.cyberCyan}10)
        `,
                backgroundSize: "80px 140px",
                backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px",
            }}
        />

        {/* Ambient Glow */}
        <div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
            style={{
                background: `radial-gradient(circle, ${COLORS.cyberCyan}15 0%, transparent 70%)`,
                filter: "blur(100px)",
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
          rgba(0, 243, 255, 0.1) 2px,
          rgba(0, 243, 255, 0.1) 4px
        )`,
            }}
        />

        {/* Vignette */}
        <div
            className="absolute inset-0"
            style={{
                background: `radial-gradient(ellipse at center, transparent 0%, ${COLORS.voidBlack} 80%)`,
            }}
        />
    </div>
);

// =========================================
// AI MESSAGE BUBBLE (CYBERPUNK STYLE)
// =========================================
const AIMessageBubble = ({ text }: { text: string }) => (
    <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex gap-4 justify-start"
    >
        {/* AI Avatar */}
        <div
            className="h-12 w-12 flex-shrink-0 flex items-center justify-center border border-cyan-500/30 bg-cyan-950/30"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
                boxShadow: `0 0 20px ${COLORS.cyberCyan}20`,
            }}
        >
            <Cpu
                className="h-6 w-6 text-cyan-400"
                style={{ filter: `drop-shadow(0 0 6px ${COLORS.cyberCyan})` }}
            />
        </div>

        {/* Message Content */}
        <div
            className="max-w-[80%] p-4 bg-cyan-950/20 border border-cyan-500/20 backdrop-blur-sm relative"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
                boxShadow: `inset 0 0 30px ${COLORS.cyberCyan}08`,
            }}
        >
            {/* Top accent */}
            <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                    background: `linear-gradient(90deg, ${COLORS.cyberCyan}60, transparent)`,
                }}
            />

            {/* Corner decoration */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-cyan-500/40" />

            <p className="leading-relaxed whitespace-pre-wrap text-gray-200 font-light">
                {text.split(/(\d+|AI|Gold|Elite|career|profile)/gi).map((part, i) =>
                    /\d+|AI|Gold|Elite|career|profile/i.test(part) ? (
                        <span
                            key={i}
                            className="text-amber-400 font-medium"
                            style={{ textShadow: `0 0 10px ${COLORS.highVoltageGold}40` }}
                        >
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </p>

            {/* Technical label */}
            <div className="mt-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan-500/50 tracking-wider">
                    AI_CORE::RESPONSE
                </span>
            </div>
        </div>
    </motion.div>
);

// =========================================
// USER MESSAGE BUBBLE (CYBERPUNK STYLE)
// =========================================
const UserMessageBubble = ({ text }: { text: string }) => (
    <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex gap-4 justify-end"
    >
        {/* Message Content */}
        <div
            className="max-w-[80%] p-4 bg-slate-900/80 border border-amber-500/20 backdrop-blur-sm relative"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                boxShadow: `0 0 20px ${COLORS.highVoltageGold}10`,
            }}
        >
            {/* Top accent */}
            <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                    background: `linear-gradient(90deg, transparent, ${COLORS.highVoltageGold}60)`,
                }}
            />

            {/* Corner decoration */}
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-amber-500/40" />

            <p className="leading-relaxed whitespace-pre-wrap text-white">{text}</p>

            {/* Technical label */}
            <div className="mt-2 flex items-center justify-end gap-2">
                <span className="text-[10px] font-mono text-amber-500/50 tracking-wider">
                    USER::QUERY
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
        </div>

        {/* User Avatar */}
        <div
            className="h-12 w-12 flex-shrink-0 flex items-center justify-center border border-amber-500/30 bg-amber-950/30"
            style={{
                clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%, 0 30%)",
                boxShadow: `0 0 20px ${COLORS.highVoltageGold}20`,
            }}
        >
            <User
                className="h-6 w-6 text-amber-400"
                style={{ filter: `drop-shadow(0 0 6px ${COLORS.highVoltageGold})` }}
            />
        </div>
    </motion.div>
);

// =========================================
// LOADING INDICATOR
// =========================================
const AIThinkingIndicator = () => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 justify-start"
    >
        <div
            className="h-12 w-12 flex-shrink-0 flex items-center justify-center border border-cyan-500/30 bg-cyan-950/30"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
            }}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <Cpu className="h-6 w-6 text-cyan-400" />
            </motion.div>
        </div>

        <div
            className="p-4 bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
            }}
        >
            <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-cyan-400"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
            <span className="text-sm font-mono text-cyan-400/60 tracking-wider">
                PROCESSING_QUERY...
            </span>
        </div>
    </motion.div>
);

// =========================================
// MAIN CHAT PAGE COMPONENT
// =========================================
export default function AIChatPage() {
    const { user } = useUser();
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "ai",
            text: `Hello ${user.name.split(" ")[0]}! I've analyzed your profile. How can I assist you with your goals in ${user.goals[0] || "your career"} today?`,
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { id: Date.now(), sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.text,
                    userProfile: user,
                }),
            });

            const data = await response.json();

            if (data.response) {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        sender: "ai",
                        text: data.response,
                    },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        sender: "ai",
                        text: "I'm having trouble connecting right now. Please try again later.",
                    },
                ]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: "ai",
                    text: "Something went wrong. Please check your connection.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen text-white flex flex-col font-sans selection:bg-cyan-500/30"
            style={{ backgroundColor: COLORS.voidBlack }}
        >
            <CircuitBackground />

            {/* =========================================
          HEADER - TERMINAL STATUS BAR
          ========================================= */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative z-20 border-b border-cyan-500/20 bg-black/80 backdrop-blur-xl sticky top-0"
                style={{
                    boxShadow: `0 4px 30px rgba(0,0,0,0.5), inset 0 -1px 0 ${COLORS.cyberCyan}20`,
                }}
            >
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        {/* Back Button */}
                        <Link
                            href="/"
                            className="p-2 border border-cyan-500/20 bg-black/40 hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-all"
                            style={{
                                clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 20%)",
                            }}
                        >
                            <ArrowLeft className="h-5 w-5 text-cyan-400" />
                        </Link>

                        {/* Title */}
                        <div className="flex items-center gap-3">
                            <div
                                className="h-10 w-10 flex items-center justify-center border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10"
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
                                    boxShadow: `0 0 20px ${COLORS.cyberCyan}30`,
                                }}
                            >
                                <Sparkles
                                    className="h-5 w-5 text-cyan-400"
                                    style={{ filter: `drop-shadow(0 0 6px ${COLORS.cyberCyan})` }}
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-cyan-500/50 tracking-widest">
                                        [AI_CORE__ONLINE] ::
                                    </span>
                                </div>
                                <h1
                                    className="font-bold text-lg tracking-tight font-mono"
                                    style={{
                                        color: COLORS.cyberCyan,
                                        textShadow: `0 0 20px ${COLORS.cyberCyan}60`,
                                    }}
                                >
                                    Gold<span className="text-amber-400">AI</span> Terminal
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Status */}
                    <div className="flex items-center gap-4">
                        <span className="hidden md:block text-xs font-mono text-cyan-500/40 tracking-wider">
                            ELITE_ACCESS::GRANTED
                        </span>
                        <div className="flex items-center gap-2 px-3 py-1.5 border border-green-500/30 bg-green-950/20">
                            <Activity className="w-3 h-3 text-green-400" />
                            <motion.div
                                className="h-2 w-2 rounded-full bg-green-500"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    boxShadow: [
                                        `0 0 5px ${COLORS.matrixGreen}`,
                                        `0 0 15px ${COLORS.matrixGreen}`,
                                        `0 0 5px ${COLORS.matrixGreen}`,
                                    ],
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="text-[10px] font-mono text-green-400 tracking-wider">
                                LIVE
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom accent */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${COLORS.cyberCyan}50, ${COLORS.highVoltageGold}30, transparent)`,
                    }}
                />
            </motion.header>

            {/* =========================================
          CHAT AREA - DATA LOG
          ========================================= */}
            <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl flex flex-col gap-6 relative z-10">
                {/* Messages Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 overflow-y-auto space-y-6 pb-4 pr-2"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: `${COLORS.cyberCyan}40 transparent`,
                    }}
                >
                    {/* Session Start Marker */}
                    <div className="flex items-center gap-4 py-4">
                        <div
                            className="flex-1 h-[1px]"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${COLORS.cyberCyan}30)`,
                            }}
                        />
                        <span className="text-[10px] font-mono text-cyan-500/40 tracking-widest px-4">
                            SESSION_START::INITIALIZED
                        </span>
                        <div
                            className="flex-1 h-[1px]"
                            style={{
                                background: `linear-gradient(90deg, ${COLORS.cyberCyan}30, transparent)`,
                            }}
                        />
                    </div>

                    {/* Messages */}
                    {messages.map((msg) =>
                        msg.sender === "ai" ? (
                            <AIMessageBubble key={msg.id} text={msg.text} />
                        ) : (
                            <UserMessageBubble key={msg.id} text={msg.text} />
                        )
                    )}

                    {/* Loading State */}
                    {isLoading && <AIThinkingIndicator />}

                    <div ref={messagesEndRef} />
                </motion.div>

                {/* =========================================
            INPUT AREA - COMMAND LINE
            ========================================= */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="sticky bottom-6"
                >
                    {/* Input Container */}
                    <div
                        className="relative bg-black/60 backdrop-blur-xl border border-cyan-500/20 p-1"
                        style={{
                            clipPath:
                                "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
                            boxShadow: `0 0 30px rgba(0,0,0,0.5), inset 0 0 20px ${COLORS.cyberCyan}05`,
                        }}
                    >
                        {/* Top accent line */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-[2px]"
                            style={{
                                background: `linear-gradient(90deg, ${COLORS.cyberCyan}80, ${COLORS.highVoltageGold}60, ${COLORS.cyberCyan}80)`,
                            }}
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Terminal Prefix */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                            <Terminal className="w-4 h-4 text-cyan-500/40" />
                            <span className="text-cyan-500/40 font-mono text-sm">{">"}</span>
                        </div>

                        {/* Input Field */}
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Enter command or query..."
                            className="w-full bg-transparent py-4 pl-16 pr-16 text-white placeholder-cyan-500/30 focus:outline-none font-mono text-sm tracking-wide"
                            style={{
                                caretColor: COLORS.cyberCyan,
                            }}
                        />

                        {/* Send Button */}
                        <motion.button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 border border-cyan-500/30 bg-cyan-950/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            style={{
                                clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 20%)",
                            }}
                            whileHover={{
                                boxShadow: `0 0 20px ${COLORS.cyberCyan}60`,
                                borderColor: `${COLORS.cyberCyan}60`,
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Send
                                className="h-4 w-4 text-cyan-400"
                                style={{ filter: `drop-shadow(0 0 4px ${COLORS.cyberCyan})` }}
                            />
                        </motion.button>

                        {/* Corner decorations */}
                        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-500/30" />
                        <div className="absolute bottom-4 right-6 w-3 h-3 border-b border-r border-cyan-500/30" />
                    </div>

                    {/* Disclaimer */}
                    <p className="text-center text-[10px] text-cyan-500/30 mt-3 font-mono tracking-widest">
                        [!] AI_DISCLAIMER :: VERIFY CRITICAL INFORMATION INDEPENDENTLY
                    </p>
                </motion.div>
            </main>
        </motion.div>
    );
}
