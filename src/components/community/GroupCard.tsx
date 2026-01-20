"use client";

import React, { useState } from "react";
import { Users, UserPlus, CheckCircle2 } from "lucide-react";
import { CyberCard } from "@/components/cyber/CyberCard";
import { COLORS } from "@/components/cyber/constants";

interface GroupCardProps {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    icon: string;
    category: string;
    isJoined?: boolean;
    onJoin?: (groupId: string) => void;
}

export default function GroupCard({
    id,
    name,
    description,
    memberCount,
    icon,
    category,
    isJoined = false,
    onJoin,
}: GroupCardProps) {
    const [joined, setJoined] = useState(isJoined);

    const handleJoin = () => {
        setJoined(true);
        onJoin?.(id);
    };

    return (
        <CyberCard className="p-5 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    {icon}
                </div>

                <div className="flex-1 min-w-0">
                    {/* Category Tag */}
                    <span className="text-[10px] text-[#00f3ff] uppercase tracking-widest border border-[#00f3ff]/30 px-2 py-0.5 rounded-full bg-[#00f3ff]/5">
                        {category}
                    </span>
                    <h3 className="font-bold text-white text-lg mt-1 truncate">{name}</h3>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">{description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto">
                {/* Member Count */}
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Users className="w-4 h-4 text-[#FFD700]" />
                    <span>{memberCount.toLocaleString()} members</span>
                </div>

                {/* Join Button */}
                {joined ? (
                    <button
                        disabled
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0aff00]/20 text-[#0aff00] border border-[#0aff00]/30 text-sm font-bold shadow-[0_0_10px_rgba(10,255,0,0.2)]"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Joined
                    </button>
                ) : (
                    <button
                        onClick={handleJoin}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-sm font-bold hover:bg-indigo-500/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all"
                    >
                        <UserPlus className="w-4 h-4" />
                        Join Group
                    </button>
                )}
            </div>
        </CyberCard>
    );
}
