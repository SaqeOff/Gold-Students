"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    MessageSquare,
    Hash,
    Search,
    MoreVertical,
    Send,
    Smile,
    Paperclip,
    ArrowLeft,
    Users,
    Info
} from "lucide-react";
import { useGroups } from "@/context/GroupsContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AmbientBackground } from "@/components/cyber/AmbientBackground";
import { COLORS } from "@/components/cyber/constants";

export default function GroupsChatPage() {
    const { joinedGroups, messages, sendMessage } = useGroups();
    const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
    const [inputText, setInputText] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Mobile toggle
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-select first group if available
    useEffect(() => {
        if (!activeGroupId && joinedGroups.length > 0) {
            setActiveGroupId(joinedGroups[0].id);
        }
    }, [joinedGroups, activeGroupId]);

    const activeGroup = joinedGroups.find(g => g.id === activeGroupId);
    const activeMessages = activeGroupId ? (messages[activeGroupId] || []) : [];

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeMessages, activeGroupId]);

    const handleSend = () => {
        if (!inputText.trim() || !activeGroupId) return;
        sendMessage(activeGroupId, inputText);
        setInputText("");
    };

    if (joinedGroups.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505]">
                <AmbientBackground />
                <div className="relative z-10 font-bold">
                    <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <MessageSquare className="w-10 h-10 text-slate-500" />
                    </div>
                </div>
                <h2 className="relative z-10 text-2xl font-bold text-white mb-2">No Groups Joined Yet</h2>
                <p className="relative z-10 text-slate-400 mb-6 max-w-md">
                    Join interest groups from the Community page to start chatting with peers who share your passions.
                </p>
                <Link
                    href="/community?tab=groups"
                    className="relative z-10 px-6 py-3 rounded-xl bg-[#FFD700] text-black font-bold hover:bg-[#FFE55C] transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                >
                    Browse Groups
                </Link>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-120px)] flex rounded-2xl overflow-hidden border border-[#00f3ff]/20 bg-[#050505] relative shadow-2xl">
            {/* Background for Chat */}
            <div className="absolute inset-0 z-0 opacity-50">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f3ff]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-[100px]" />
            </div>

            {/* 
              LEFT SIDEBAR: GROUP LIST 
              Hidden on mobile if chat is active
            */}
            <div className={`
                ${isSidebarOpen ? 'flex' : 'hidden'} md:flex
                w-full md:w-80 flex-col relative z-20
                border-r border-white/10 bg-[#050510]/80 backdrop-blur-xl
            `}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h2 className="font-bold text-white flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-[#FFD700]" />
                        My Groups
                    </h2>
                    <Link href="/community?tab=groups">
                        <div className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-[#00f3ff] transition-colors">
                            <Search className="w-5 h-5" />
                        </div>
                    </Link>
                </div>

                {/* Group List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {joinedGroups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => {
                                setActiveGroupId(group.id);
                                setIsSidebarOpen(false); // Close sidebar on mobile
                            }}
                            className={`
                                w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all
                                ${activeGroupId === group.id
                                    ? 'bg-[#FFD700]/10 border border-[#FFD700]/30 shadow-[inset_0_0_20px_rgba(255,215,0,0.05)]'
                                    : 'hover:bg-white/5 border border-transparent'}
                            `}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm ${activeGroupId === group.id ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-slate-800 text-slate-400'}`}>
                                {group.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h3 className={`font-medium truncate ${activeGroupId === group.id ? 'text-[#FFD700]' : 'text-white'}`}>
                                        {group.name}
                                    </h3>
                                    {/* Last msg time mock */}
                                    <span className="text-[10px] text-slate-500">12:40</span>
                                </div>
                                <p className="text-xs text-slate-400 truncate opacity-70">
                                    {messages[group.id]?.slice(-1)[0]?.text || group.description}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 
              RIGHT MAIN: CHAT AREA 
              Hidden on mobile if sidebar is active
            */}
            <div className={`
                ${!isSidebarOpen ? 'flex' : 'hidden md:flex'} 
                flex-1 flex-col relative z-10 bg-transparent
            `}>
                {activeGroup ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-[#050510]/60 backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                <button
                                    className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white"
                                    onClick={() => setIsSidebarOpen(true)}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xl">
                                    {activeGroup.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        {activeGroup.name}
                                        <span className="px-2 py-0.5 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/30 text-[10px] text-[#00f3ff] uppercase tracking-wider">
                                            {activeGroup.category}
                                        </span>
                                    </h3>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <Users className="w-3 h-3" /> {activeGroup.memberCount.toLocaleString()} members
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-[#00f3ff] transition-colors">
                                <Info className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                            {/* Warning / Welcome */}
                            <div className="flex justify-center my-4">
                                <span className="bg-slate-900/80 text-slate-400 text-xs px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
                                    Welcome to the start of the <span className="text-[#FFD700]">{activeGroup.name}</span> link.
                                </span>
                            </div>

                            {activeMessages.map((msg, idx) => {
                                const isMe = msg.senderId === "me";
                                const isSystem = msg.isSystem;
                                const showAvatar = !isMe && !isSystem && (idx === 0 || activeMessages[idx - 1].senderId !== msg.senderId);

                                if (isSystem) {
                                    return (
                                        <div key={msg.id} className="flex justify-center my-4">
                                            <span className="text-center text-xs text-[#00f3ff] opacity-70 italic px-4 py-1 border-b border-[#00f3ff]/20">
                                                {msg.text}
                                            </span>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={msg.id} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'} group animate-in slide-in-from-bottom-2 duration-300`}>
                                        {!isMe && (
                                            <div className={`w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                                                {msg.avatar || "👤"}
                                            </div>
                                        )}

                                        <div className={`max-w-[75%] md:max-w-[60%]`}>
                                            {!isMe && showAvatar && (
                                                <p className="text-xs text-[#00f3ff] ml-1 mb-1 opacity-70">{msg.senderName}</p>
                                            )}
                                            <div className={`p-3.5 rounded-2xl shadow-lg text-sm leading-relaxed backdrop-blur-sm ${isMe
                                                ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black font-medium rounded-tr-sm shadow-[#FFD700]/10'
                                                : 'bg-slate-800/80 border border-white/10 text-slate-200 rounded-tl-sm shadow-black/20'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <p className={`text-[10px] text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>

                                        {isMe && (
                                            <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center shrink-0 border border-[#FFD700]/20 text-[10px] text-[#FFD700] font-bold">
                                                ME
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-[#050510]/80 backdrop-blur-xl">
                            <div className="flex items-center gap-2 bg-slate-900/50 border border-white/10 rounded-xl p-2 focus-within:border-[#00f3ff]/50 focus-within:bg-slate-900 transition-all shadow-lg">
                                <button className="p-2 text-slate-500 hover:text-[#00f3ff] transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={`Message #${activeGroup.name}...`}
                                    className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none px-2 font-medium"
                                />
                                <button className="p-2 text-slate-500 hover:text-[#FFD700] transition-colors">
                                    <Smile className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={!inputText.trim()}
                                    className="p-2 bg-[#00f3ff] text-black rounded-lg hover:bg-[#00f3ff]/90 disabled:opacity-50 disabled:hover:bg-[#00f3ff] transition-all shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                                >
                                    <Send className="w-4 h-4 font-bold" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-500 flex-col gap-4">
                        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center animate-pulse">
                            <Hash className="w-10 h-10 text-slate-600" />
                        </div>
                        <p>Select a group to initialize link.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
