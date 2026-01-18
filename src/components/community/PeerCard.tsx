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
import { User, UserGoal } from "@/types";
import { PeerMatchResult } from "@/lib/logic";

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
    if (score >= 70) return "text-green-400 bg-green-500/20 border-green-500/30";
    if (score >= 40) return "text-amber-400 bg-amber-500/20 border-amber-500/30";
    return "text-slate-400 bg-slate-700 border-slate-600";
}

export default function PeerCard({
    user,
    matchResult,
    onConnect,
}: PeerCardProps) {
    const [connectionStatus, setConnectionStatus] = useState<"idle" | "pending" | "connected">("idle");
    const { score, sharedSkills, sharedGoals, sameUniversity, sameCountry, reasons } =
        matchResult;

    const handleConnect = () => {
        setConnectionStatus("pending");
        onConnect?.(user.id);
    };

    return (
        <div className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5">
            {/* Header with Match Score */}
            <div className="p-5 pb-4">
                <div className="flex items-start justify-between gap-4">
                    {/* Avatar & Info */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5">
                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold text-amber-400">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                            {/* Trust Level Badge */}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs text-slate-900 font-bold">
                                ⭐
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white text-lg">{user.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <GraduationCap className="w-4 h-4" />
                                {user.university}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400 mt-0.5">
                                <MapPin className="w-4 h-4" />
                                {getCountryFlag(user.country)} {user.country}
                            </div>
                        </div>
                    </div>

                    {/* Match Score Badge */}
                    <div
                        className={`px-3 py-2 rounded-xl border text-center ${getScoreColor(
                            score
                        )}`}
                    >
                        <div className="text-2xl font-bold">{score}%</div>
                        <div className="text-xs uppercase tracking-wider opacity-80">
                            Match
                        </div>
                    </div>
                </div>
            </div>

            {/* Why You Match - Innovation Feature */}
            <div className="px-5 pb-4">
                <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Why You Match
                </h4>
                <div className="flex flex-wrap gap-2">
                    {/* Shared Goals */}
                    {sharedGoals.map((goal) => (
                        <span
                            key={goal}
                            className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center gap-1"
                        >
                            <Target className="w-3 h-3" />
                            {goal}
                        </span>
                    ))}

                    {/* Same University */}
                    {sameUniversity && (
                        <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            Same University
                        </span>
                    )}

                    {/* Same Country */}
                    {sameCountry && (
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Same Country
                        </span>
                    )}

                    {/* Shared Skills Count */}
                    {sharedSkills.length > 0 && (
                        <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {sharedSkills.length} Shared Skills
                        </span>
                    )}
                </div>

                {/* Top Shared Skills Preview */}
                {sharedSkills.length > 0 && (
                    <div className="mt-3 text-sm text-slate-500">
                        Skills:{" "}
                        <span className="text-slate-400">
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
            <div className="px-5 py-4 bg-slate-800/50 border-t border-white/5 flex items-center gap-3">
                {connectionStatus === "idle" ? (
                    <button
                        onClick={handleConnect}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold text-sm hover:from-amber-400 hover:to-amber-500 transition-colors"
                    >
                        <UserPlus className="w-4 h-4" />
                        Connect
                    </button>
                ) : connectionStatus === "pending" ? (
                    <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700 text-amber-400 font-semibold text-sm cursor-not-allowed border border-amber-500/30"
                    >
                        <Clock className="w-4 h-4 animate-pulse" />
                        Pending
                    </button>
                ) : (
                    <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600/20 text-green-400 font-semibold text-sm cursor-not-allowed border border-green-500/30"
                    >
                        ✓ Connected
                    </button>
                )}

                {/* Telegram Button */}
                <a
                    href={`https://t.me/${user.name.toLowerCase().replace(/\s+/g, "_")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                    title="Message on Telegram"
                >
                    <Send className="w-5 h-5" />
                </a>

                {/* Chat Button */}
                <button
                    className="p-2.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                    title="Send Message"
                >
                    <MessageCircle className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
