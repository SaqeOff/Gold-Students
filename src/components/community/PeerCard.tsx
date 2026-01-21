"use client";

import React, { useState } from "react";
import {
    UserPlus,
    MessageCircle,
    Send,
    GraduationCap,
    MapPin,
    Target,
    Sparkles,
    Users,
    Clock,
} from "lucide-react";
import { User } from "@/types";
import { PeerMatchResult } from "@/lib/logic";
import { CyberCard } from "@/components/cyber/CyberCard";
import { COLORS } from "@/components/cyber/constants";

interface PeerCardProps {
    user: User;
    matchResult: PeerMatchResult;
    onConnect?: (userId: string) => void;
}

// Country flag emoji helper
const getCountryFlag = (country: string): string => {
    const flags: Record<string, string> = {
        "United States": "🇺🇸",
        Germany: "🇩🇪",
        "United Kingdom": "🇬🇧",
        France: "🇫🇷",
        Japan: "🇯🇵",
        Canada: "🇨🇦",
        Australia: "🇦🇺",
        India: "🇮🇳",
        China: "🇨🇳",
        Singapore: "🇸🇬",
    };
    return flags[country] || "🌍";
};

// Score color based on value
function getScoreColor(score: number): string {
    if (score >= 70) return "text-[#0aff00] border-[#0aff00]/30 shadow-[0_0_10px_rgba(10,255,0,0.2)]";
    if (score >= 40) return "text-[#FFD700] border-[#FFD700]/30 shadow-[0_0_10px_rgba(255,215,0,0.2)]";
    return "text-slate-400 border-slate-600";
}

export default function PeerCard({
    user,
    matchResult,
    onConnect,
}: PeerCardProps) {
    const [connectionStatus, setConnectionStatus] = useState<"idle" | "pending" | "connected">("idle");
    const { score, sharedSkills, sharedGoals, sameUniversity, sameCountry } =
        matchResult;

    const handleConnect = () => {
        setConnectionStatus("pending");
        onConnect?.(user.id);
    };

    return (
        <CyberCard className="p-0 h-full flex flex-col">
            {/* Header with Match Score */}
            <div className="p-5 pb-4">
                <div className="flex items-start justify-between gap-4">
                    {/* Avatar & Info */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-0.5 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-2xl font-bold text-[#FFD700]">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                            {/* Trust Level Badge */}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center text-xs text-slate-900 font-bold border-2 border-slate-900">
                                ⭐
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-lg tracking-wide">{user.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <GraduationCap className="w-4 h-4 text-[#00f3ff]" />
                                {user.university}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400 mt-0.5">
                                <MapPin className="w-4 h-4 text-[#00f3ff]" />
                                {getCountryFlag(user.country)} {user.country}
                            </div>
                        </div>
                    </div>

                    {/* Match Score Badge */}
                    <div
                        className={`px-3 py-2 rounded-xl border text-center bg-black/40 backdrop-blur-md ${getScoreColor(
                            score
                        )}`}
                    >
                        <div className="text-2xl font-bold font-mono">{score}%</div>
                        <div className="text-[10px] uppercase tracking-wider opacity-80">
                            Match
                        </div>
                    </div>
                </div>
            </div>

            {/* Why You Match - Innovation Feature */}
            <div className="px-5 pb-4 flex-1">
                <h4 className="text-[10px] font-bold text-[#00f3ff] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    Why You Match
                </h4>
                <div className="flex flex-wrap gap-2">
                    {/* Shared Goals */}
                    {sharedGoals.map((goal) => (
                        <span
                            key={goal}
                            className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs flex items-center gap-1"
                        >
                            <Target className="w-3 h-3" />
                            {goal}
                        </span>
                    ))}

                    {/* Same University */}
                    {sameUniversity && (
                        <span className="px-2 py-1 rounded-full bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/20 text-xs flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            Same University
                        </span>
                    )}

                    {/* Same Country */}
                    {sameCountry && (
                        <span className="px-2 py-1 rounded-full bg-[#0aff00]/10 text-[#0aff00] border border-[#0aff00]/20 text-xs flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Same Country
                        </span>
                    )}

                    {/* Shared Skills Count */}
                    {sharedSkills.length > 0 && (
                        <span className="px-2 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 text-xs flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {sharedSkills.length} Shared Skills
                        </span>
                    )}
                </div>

                {/* Top Shared Skills Preview */}
                {sharedSkills.length > 0 && (
                    <div className="mt-3 text-sm border-t border-white/5 pt-3">
                        <span className="text-slate-500">Skills: </span>
                        <span className="text-slate-300">
                            {sharedSkills
                                .slice(0, 3)
                                .map((s) => s.replace(/_/g, " "))
                                .join(", ")}
                            {sharedSkills.length > 3 && ` +${sharedSkills.length - 3} more`}
                        </span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="px-5 py-4 bg-black/40 border-t border-white/5 flex items-center gap-3">
                {connectionStatus === "idle" ? (
                    <button
                        onClick={handleConnect}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-slate-900 font-bold text-sm hover:from-[#FFE55C] hover:to-[#FFB733] transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                    >
                        <UserPlus className="w-4 h-4" />
                        Connect
                    </button>
                ) : connectionStatus === "pending" ? (
                    <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 text-[#FFD700] font-semibold text-sm cursor-not-allowed border border-[#FFD700]/30"
                    >
                        <Clock className="w-4 h-4 animate-pulse" />
                        Pending
                    </button>
                ) : (
                    <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0aff00]/20 text-[#0aff00] font-semibold text-sm cursor-not-allowed border border-[#0aff00]/30"
                    >
                        ✓ Connected
                    </button>
                )}

                {/* Telegram Button */}
                <a
                    href={`https://t.me/${user.name.toLowerCase().replace(/\s+/g, "_")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-[#00f3ff]/20 hover:text-[#00f3ff] hover:border-[#00f3ff]/50 border border-transparent transition-all"
                    title="Message on Telegram"
                >
                    <Send className="w-5 h-5" />
                </a>

                {/* Chat Button */}
                <button
                    className="p-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-transparent hover:border-white/20"
                    title="Send Message"
                >
                    <MessageCircle className="w-5 h-5" />
                </button>
            </div>
        </CyberCard>
    );
}
