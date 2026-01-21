"use client";

import React from "react";
import {
    Shield,
    ShieldAlert,
    Settings,
    Users,
    Activity,
    Bell,
    LogOut,
} from "lucide-react";
import StatsOverview from "@/components/admin/StatsOverview";
import VerificationTable from "@/components/admin/VerificationTable";
import AccessControl from "@/components/admin/AccessControl";
import { CyberLayout } from "@/components/cyber/CyberLayout";
import { CyberCard } from "@/components/cyber/CyberCard";
import { GlitchText } from "@/components/cyber/GlitchText";
import { COLORS } from "@/components/cyber/constants";

// Simulated admin check - in production this would check auth
const isAdmin = true;

export default function AdminPage() {
    // Access denied state
    if (!isAdmin) {
        return (
            <CyberLayout>
                <div className="min-h-[80vh] flex items-center justify-center p-6">
                    <CyberCard className="!border-red-500/50 max-w-md w-full text-center p-8">
                        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse">
                            <ShieldAlert className="w-10 h-10 text-red-500" />
                        </div>
                        <GlitchText className="text-2xl font-bold text-white mb-2">ACCESS DENIED</GlitchText>
                        <p className="text-slate-400 mb-6 font-mono text-sm leading-relaxed">
                            ERROR_CODE: 403_FORBIDDEN<br />
                            This node is restricted to authorized administrators only.
                        </p>
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-red-500 text-black font-bold hover:bg-red-400 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                        >
                            Return to Safe Zone
                        </a>
                    </CyberCard>
                </div>
            </CyberLayout>
        );
    }

    return (
        <CyberLayout>
            <div className="space-y-6">
                {/* Header */}
                <CyberCard className="sticky top-4 z-40 !backdrop-blur-xl !bg-black/40 border !border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                <Shield className="w-6 h-6 text-red-500" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                                    <GlitchText>ADMIN_DASHBOARD</GlitchText>
                                </h1>
                                <p className="text-xs text-red-400 font-mono tracking-wider">SYSTEM_CONTROL_CENTER :: LEVEL_10</p>
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div className="flex items-center gap-3">
                            <button className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-red-500/50 transition-all relative group">
                                <Bell className="w-5 h-5 group-hover:animate-swing" />
                                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
                            </button>
                            <button className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-red-500/50 transition-all">
                                <Settings className="w-5 h-5 hover:animate-spin-slow" />
                            </button>
                            <div className="w-px h-8 bg-white/10 mx-2" />
                            <div className="flex items-center gap-3 border border-white/10 rounded-xl p-1.5 pr-4 bg-white/5">
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                                    A
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-bold text-white">Admin User</p>
                                    <p className="text-[10px] text-red-400 font-mono uppercase">Super Admin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CyberCard>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 gap-6">
                        <CyberCard className="!border-amber-500/20">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wide border-b border-white/5 pb-2">
                                <Activity className="w-5 h-5 text-amber-500" />
                                <span className="text-amber-500">System Metrics</span>
                            </h2>
                            <StatsOverview />
                        </CyberCard>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Verification Table - Takes 2 columns */}
                        <div className="lg:col-span-2 space-y-6">
                            <CyberCard className="h-full !border-blue-500/20">
                                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wide border-b border-white/5 pb-2">
                                    <Shield className="w-5 h-5 text-blue-500" />
                                    <span className="text-blue-500">Verification Queue</span>
                                </h2>
                                <VerificationTable />
                            </CyberCard>
                        </div>

                        {/* Access Control - Takes 1 column */}
                        <div className="space-y-6">
                            <CyberCard className="h-full !border-red-500/20">
                                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wide border-b border-white/5 pb-2">
                                    <Users className="w-5 h-5 text-red-500" />
                                    <span className="text-red-500">Access Control</span>
                                </h2>
                                <AccessControl />
                            </CyberCard>
                        </div>
                    </div>

                    {/* Activity Log */}
                    <CyberCard className="!border-purple-500/20">
                        <h3 className="font-bold text-white flex items-center gap-2 mb-6 uppercase tracking-wide border-b border-white/5 pb-2">
                            <Users className="w-5 h-5 text-purple-500" />
                            <span className="text-purple-500">Recent Admin Activity</span>
                        </h3>
                        <div className="space-y-3">
                            {[
                                {
                                    action: "Verified opportunity",
                                    target: "MIT Summer Research Fellowship",
                                    time: "2 minutes ago",
                                    type: "verify",
                                },
                                {
                                    action: "Approved user",
                                    target: "john.doe@stanford.edu",
                                    time: "15 minutes ago",
                                    type: "approve",
                                },
                                {
                                    action: "Updated access control",
                                    target: "Enabled waitlist verification",
                                    time: "1 hour ago",
                                    type: "settings",
                                },
                                {
                                    action: "Rejected opportunity",
                                    target: "Suspicious Housing Listing",
                                    time: "2 hours ago",
                                    type: "reject",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/5 rounded pl-2 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${item.type === "verify" || item.type === "approve"
                                                ? "bg-green-500 text-green-500"
                                                : item.type === "reject"
                                                    ? "bg-red-500 text-red-500"
                                                    : "bg-blue-500 text-blue-500"
                                                }`}
                                        />
                                        <span className="text-sm text-slate-300 font-mono">
                                            {item.action}:{" "}
                                            <span className="text-white font-bold group-hover:text-[#00f3ff] transition-colors">{item.target}</span>
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-500 font-mono">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </CyberCard>
                </div>
            </div>
        </CyberLayout>
    );
}
