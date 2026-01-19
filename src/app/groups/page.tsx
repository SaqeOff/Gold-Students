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
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                    <MessageSquare className="w-10 h-10 text-slate-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">No Groups Joined Yet</h2>
                <p className="text-slate-400 mb-6 max-w-md">
                    Join interest groups from the Community page to start chatting with peers who share your passions.
                </p>
                <Link
                    href="/community?tab=groups"
                    className="px-6 py-3 rounded-xl gold-gradient text-black font-semibold hover:opacity-90 transition-opacity"
                >
                    Browse Groups
                </Link>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-120px)] flex rounded-2xl overflow-hidden border border-slate-800 bg-[#0a0f1c]">
            {/* 
              LEFT SIDEBAR: GROUP LIST 
              Hidden on mobile if chat is active
            */}
            <div className={`
                ${isSidebarOpen ? 'flex' : 'hidden'} md:flex
                w-full md:w-80 flex-col 
                border-r border-slate-800 bg-[#0f172a]
            `}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <h2 className="font-bold text-white flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-amber-500" />
                        My Groups
                    </h2>
                    <Link href="/community?tab=groups">
                        <div className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
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
                                    ? 'bg-amber-500/10 border border-amber-500/20'
                                    : 'hover:bg-slate-800 border border-transparent'}
                            `}
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl shadow-sm">
                                {group.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h3 className={`font-medium truncate ${activeGroupId === group.id ? 'text-amber-500' : 'text-white'}`}>
                                        {group.name}
                                    </h3>
                                    {/* Last msg time mock */}
                                    <span className="text-[10px] text-slate-500">12:40</span>
                                </div>
                                <p className="text-xs text-slate-400 truncate">
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
                flex-1 flex-col bg-[#020617]
            `}>
                {activeGroup ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-[#0f172a]/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <button
                                    className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white"
                                    onClick={() => setIsSidebarOpen(true)}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl">
                                    {activeGroup.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        {activeGroup.name}
                                        <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-400">
                                            {activeGroup.category}
                                        </span>
                                    </h3>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <Users className="w-3 h-3" /> {activeGroup.memberCount.toLocaleString()} members
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-white">
                                <Info className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                            {/* Warning / Welcome */}
                            <div className="flex justify-center my-4">
                                <span className="bg-slate-800/50 text-slate-500 text-xs px-3 py-1 rounded-full border border-slate-800">
                                    This is the start of the {activeGroup.name} channel.
                                </span>
                            </div>

                            {activeMessages.map((msg, idx) => {
                                const isMe = msg.senderId === "me";
                                const isSystem = msg.isSystem;
                                const showAvatar = !isMe && !isSystem && (idx === 0 || activeMessages[idx - 1].senderId !== msg.senderId);

                                if (isSystem) {
                                    return (
                                        <div key={msg.id} className="flex justify-center my-4">
                                            <span className="text-center text-xs text-slate-500 italic px-4 py-1">
                                                {msg.text}
                                            </span>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={msg.id} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'} group`}>
                                        {!isMe && (
                                            <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                                                {msg.avatar || "👤"}
                                            </div>
                                        )}

                                        <div className={`max-w-[75%] md:max-w-[60%]`}>
                                            {!isMe && showAvatar && (
                                                <p className="text-xs text-slate-500 ml-1 mb-1">{msg.senderName}</p>
                                            )}
                                            <div className={`p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${isMe
                                                    ? 'bg-amber-600 text-white rounded-tr-sm'
                                                    : 'bg-slate-800 border border-slate-700/50 text-slate-200 rounded-tl-sm'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <p className={`text-[10px] text-slate-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>

                                        {isMe && (
                                            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20 text-xs">
                                                ME
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-slate-800 bg-[#0f172a]">
                            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2 focus-within:border-amber-500/30 transition-colors shadow-lg">
                                <button className="p-2 text-slate-500 hover:text-amber-500 transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={`Message #${activeGroup.name}...`}
                                    className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none px-2"
                                />
                                <button className="p-2 text-slate-500 hover:text-amber-500 transition-colors">
                                    <Smile className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={!inputText.trim()}
                                    className="p-2 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-amber-500 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-500">
                        Select a group to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}
