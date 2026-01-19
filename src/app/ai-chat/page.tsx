"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Sidebar, ArrowLeft, Bot, Loader2 } from "lucide-react";
import Link from 'next/link';
import { useUser } from "@/components/UserContext";

export default function AIChatPage() {
    const { user } = useUser();
    const [messages, setMessages] = useState([
        { id: 1, sender: "ai", text: `Hello ${user.name.split(" ")[0]}! I've analyzed your profile. How can I assist you with your goals in ${user.goals[0] || "your career"} today?` }
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
        setMessages(prev => [...prev, userMessage]);
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
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    sender: "ai",
                    text: data.response
                }]);
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    sender: "ai",
                    text: "I'm having trouble connecting right now. Please try again later."
                }]);
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: "ai",
                text: "Something went wrong. Please check your connection."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-amber-500/30">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft className="h-5 w-5 text-gray-400" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-black" />
                            </div>
                            <h1 className="font-bold text-lg tracking-tight">
                                Gold<span className="text-amber-500">AI</span> Assistant
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden md:block text-sm text-gray-400">Elite Member Access</span>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl flex flex-col gap-6">
                <div className="flex-1 overflow-y-auto space-y-6 pb-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && (
                                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/5">
                                    <Bot className="h-6 w-6 text-amber-500" />
                                </div>
                            )}
                            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.sender === 'user'
                                ? 'bg-amber-600 text-white rounded-tr-sm'
                                : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'
                                }`}>
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                            </div>
                            {msg.sender === 'user' && (
                                <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 border border-amber-500/30">
                                    <User className="h-5 w-5 text-amber-500" />
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-4 justify-start">
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/5">
                                <Bot className="h-6 w-6 text-amber-500" />
                            </div>
                            <div className="bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm p-4 rounded-2xl flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                                <span className="text-sm text-gray-400">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="sticky bottom-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask for career advice, opportunities, or insights..."
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 backdrop-blur-md shadow-2xl"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-3">
                        AI can make mistakes. Consider checking important information.
                    </p>
                </div>
            </main>
        </div>
    );
}
