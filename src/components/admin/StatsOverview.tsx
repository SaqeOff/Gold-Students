"use client";

import React from "react";
import {
    Users,
    Clock,
    Coins,
    Shield,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
} from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    change: number;
    changeLabel: string;
    icon: React.ReactNode;
    iconBg: string;
}

function StatCard({
    title,
    value,
    change,
    changeLabel,
    icon,
    iconBg,
}: StatCardProps) {
    const isPositive = change >= 0;

    return (
        <div className="bg-slate-900/80 rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-slate-400 uppercase tracking-wider">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-white mt-2">{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${iconBg}`}>{icon}</div>
            </div>

            {/* Trend */}
            <div className="mt-4 flex items-center gap-2">
                <span
                    className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"
                        }`}
                >
                    {isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                    ) : (
                        <TrendingDown className="w-4 h-4" />
                    )}
                    {isPositive ? "+" : ""}
                    {change}%
                </span>
                <span className="text-sm text-slate-500">{changeLabel}</span>
            </div>
        </div>
    );
}

export default function StatsOverview() {
    const stats = [
        {
            title: "Total Students",
            value: "1,247",
            change: 12.5,
            changeLabel: "vs last month",
            icon: <Users className="w-6 h-6 text-blue-400" />,
            iconBg: "bg-blue-500/20",
        },
        {
            title: "Pending Verifications",
            value: "23",
            change: -8.3,
            changeLabel: "from yesterday",
            icon: <Clock className="w-6 h-6 text-amber-400" />,
            iconBg: "bg-amber-500/20",
        },
        {
            title: "Active Grants",
            value: "$2.4M",
            change: 34.2,
            changeLabel: "total value",
            icon: <Coins className="w-6 h-6 text-green-400" />,
            iconBg: "bg-green-500/20",
        },
        {
            title: "Trust Index",
            value: "87.4",
            change: 2.1,
            changeLabel: "avg score",
            icon: <Shield className="w-6 h-6 text-purple-400" />,
            iconBg: "bg-purple-500/20",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
            ))}
        </div>
    );
}
