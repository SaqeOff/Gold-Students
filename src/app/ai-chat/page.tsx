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
import { CyberLayout } from "@/components/cyber/CyberLayout";
import { CyberCard } from "@/components/cyber/CyberCard";
import { GlitchText } from "@/components/cyber/GlitchText";
import { COLORS } from "@/components/cyber/constants";

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
            className="h-12 w-12 flex-shrink-0 flex items-center justify-center border border-[#00f3ff]/30 bg-[#00f3ff]/5"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
                boxShadow: `0 0 20px ${COLORS.cyberCyan}20`,
            }}
        >
            <Cpu
                className="h-6 w-6 text-[#00f3ff]"
                style={{ filter: `drop-shadow(0 0 6px ${COLORS.cyberCyan})` }}
            />
        </div>

        {/* Message Content */}
        <div
            className="max-w-[80%] p-4 bg-[#00f3ff]/5 border border-[#00f3ff]/20 backdrop-blur-sm relative"
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
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#00f3ff]/40" />

            <p className="leading-relaxed whitespace-pre-wrap text-slate-200 font-light font-mono text-sm">
                {text.split(/(\d+|AI|Gold|Elite|career|profile)/gi).map((part, i) =>
                    /\d+|AI|Gold|Elite|career|profile/i.test(part) ? (
                        <span
                            key={i}
                            className="text-[#FFD700] font-bold"
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
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse" />
                <span className="text-[10px] font-mono text-[#00f3ff]/50 tracking-wider">
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
            className="max-w-[80%] p-4 bg-slate-900/80 border border-[#FFD700]/20 backdrop-blur-sm relative"
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
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#FFD700]/40" />

            <p className="leading-relaxed whitespace-pre-wrap text-white font-mono text-sm">{text}</p>

            {/* Technical label */}
            <div className="mt-2 flex items-center justify-end gap-2">
                <span className="text-[10px] font-mono text-[#FFD700]/50 tracking-wider">
                    USER::QUERY
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
            </div>
        </div>

        {/* User Avatar */}
        <div
            className="h-12 w-12 flex-shrink-0 flex items-center justify-center border border-[#FFD700]/30 bg-[#FFD700]/5"
            style={{
                clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%, 0 30%)",
                boxShadow: `0 0 20px ${COLORS.highVoltageGold}20`,
            }}
        >
            <User
                className="h-6 w-6 text-[#FFD700]"
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
            className="h-12 w-12 flex-shrink-0 flex items-center justify-center border border-[#00f3ff]/30 bg-[#00f3ff]/5"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
            }}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <Cpu className="h-6 w-6 text-[#00f3ff]" />
            </motion.div>
        </div>

        <div
            className="p-4 bg-[#00f3ff]/5 border border-[#00f3ff]/20 flex items-center gap-3"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
            }}
        >
            <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#00f3ff]"
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
            <span className="text-sm font-mono text-[#00f3ff]/60 tracking-wider">
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
        <CyberLayout>
            <div className="h-[calc(100vh-100px)] p-4 md:p-6 max-w-5xl mx-auto">
                <CyberCard className="h-full flex flex-col !p-0 overflow-hidden !border-[#00f3ff]/30 shadow-[0_0_50px_rgba(0,243,255,0.1)]">
                    {/* =========================================
                    HEADER - TERMINAL STATUS BAR
                    ========================================= */}
                    <div className="relative z-20 border-b border-[#00f3ff]/20 bg-black/40 backdrop-blur-xl shrink-0">
                        <div className="px-4 h-16 flex items-center justify-between">
                            {/* Left Section */}
                            <div className="flex items-center gap-4">
                                {/* Back Button */}
                                <Link
                                    href="/"
                                    className="p-2 border border-[#00f3ff]/20 bg-white/5 hover:border-[#00f3ff]/50 hover:bg-[#00f3ff]/10 transition-all rounded-lg"
                                >
                                    <ArrowLeft className="h-5 w-5 text-[#00f3ff]" />
                                </Link>

                                {/* Title */}
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex items-center justify-center border border-[#00f3ff]/30 bg-[#00f3ff]/10 rounded-lg">
                                        <Sparkles
                                            className="h-5 w-5 text-[#00f3ff]"
                                            style={{ filter: `drop-shadow(0 0 6px ${COLORS.cyberCyan})` }}
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono text-[#00f3ff]/50 tracking-widest">
                                                [AI_CORE__ONLINE] ::
                                            </span>
                                        </div>
                                        <h1 className="font-bold text-lg tracking-tight font-mono text-[#00f3ff]">
                                            Gold<span className="text-[#FFD700]">AI</span> Terminal
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Status */}
                            <div className="flex items-center gap-4">
                                <span className="hidden md:block text-xs font-mono text-[#00f3ff]/40 tracking-wider">
                                    ELITE_ACCESS::GRANTED
                                </span>
                                <div className="flex items-center gap-2 px-3 py-1.5 border border-[#10b981]/30 bg-[#10b981]/10 rounded">
                                    <Activity className="w-3 h-3 text-[#10b981]" />
                                    <span className="text-[10px] font-mono text-[#10b981] tracking-wider font-bold">
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
                    </div>

                    {/* =========================================
                    CHAT AREA - DATA LOG
                    ========================================= */}
                    <div className="flex-1 overflow-y-auto space-y-6 pt-6 pb-4 px-4 md:px-6 relative scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        <div className="absolute inset-0 bg-[#00f3ff]/5 pointer-events-none opacity-20" />

                        {/* Session Start Marker */}
                        <div className="flex items-center gap-4 py-4 opacity-50">
                            <div
                                className="flex-1 h-[1px]"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${COLORS.cyberCyan}30)`,
                                }}
                            />
                            <span className="text-[10px] font-mono text-[#00f3ff] tracking-widest px-4">
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
                    </div>

                    {/* =========================================
                    INPUT AREA - COMMAND LINE
                    ========================================= */}
                    <div className="p-4 md:p-6 bg-black/40 border-t border-[#00f3ff]/20 shrink-0">
                        {/* Input Container */}
                        <div
                            className="relative bg-slate-900/60 backdrop-blur-xl border border-[#00f3ff]/30 p-1 rounded-lg"
                            style={{
                                boxShadow: `inset 0 0 20px ${COLORS.cyberCyan}05`,
                            }}
                        >
                            {/* Terminal Prefix */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                                <Terminal className="w-4 h-4 text-[#00f3ff]/60" />
                                <span className="text-[#00f3ff]/60 font-mono text-sm">{">"}</span>
                            </div>

                            {/* Input Field */}
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Enter command or query..."
                                className="w-full bg-transparent py-4 pl-16 pr-16 text-white placeholder-[#00f3ff]/30 focus:outline-none font-mono text-sm tracking-wide"
                                style={{
                                    caretColor: COLORS.cyberCyan,
                                }}
                            />

                            {/* Send Button */}
                            <motion.button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 border border-[#00f3ff]/30 bg-[#00f3ff]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded"
                                whileHover={{
                                    boxShadow: `0 0 20px ${COLORS.cyberCyan}60`,
                                    borderColor: `${COLORS.cyberCyan}60`,
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Send
                                    className="h-4 w-4 text-[#00f3ff]"
                                    style={{ filter: `drop-shadow(0 0 4px ${COLORS.cyberCyan})` }}
                                />
                            </motion.button>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-center text-[10px] text-[#00f3ff]/30 mt-3 font-mono tracking-widest pl-2">
                            [!] AI_DISCLAIMER :: VERIFY CRITICAL INFORMATION INDEPENDENTLY
                        </p>
                    </div>
                </CyberCard>
            </div>
        </CyberLayout>
    );
}
