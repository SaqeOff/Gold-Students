"use client";

import React, { useState } from "react";
import { Users, UserPlus, CheckCircle2 } from "lucide-react";

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
        <div className="glass-card rounded-2xl p-5 border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center text-3xl">
                    {icon}
                </div>

                <div className="flex-1">
                    {/* Category Tag */}
                    <span className="text-xs text-amber-400 uppercase tracking-wider">
                        {category}
                    </span>
                    <h3 className="font-semibold text-white text-lg mt-0.5">{name}</h3>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 line-clamp-2 mb-4">{description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between">
                {/* Member Count */}
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Users className="w-4 h-4" />
                    <span>{memberCount.toLocaleString()} members</span>
                </div>

                {/* Join Button */}
                {joined ? (
                    <button
                        disabled
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Joined
                    </button>
                ) : (
                    <button
                        onClick={handleJoin}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/30 transition-colors"
                    >
                        <UserPlus className="w-4 h-4" />
                        Join Group
                    </button>
                )}
            </div>
        </div>
    );
}
