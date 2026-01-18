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

// Simulated admin check - in production this would check auth
const isAdmin = true;

export default function AdminPage() {
    // Access denied state
    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
                    <p className="text-slate-400 mb-6 max-w-md">
                        You do not have permission to access the Admin Dashboard. This area
                        is restricted to authorized administrators only.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 transition-colors"
                    >
                        Return to Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <header className="bg-slate-900/80 border-b border-white/5 sticky top-0 z-50">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-xl bg-amber-500/20">
                            <Shield className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-sm text-slate-400">Gold Students Club Control Center</p>
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                        </button>
                        <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                        <div className="w-px h-6 bg-slate-700 mx-2" />
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-sm font-bold text-slate-900">
                                A
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-white">Admin User</p>
                                <p className="text-xs text-slate-400">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6 space-y-6">
                {/* Stats Overview */}
                <section>
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-amber-500" />
                        Platform Overview
                    </h2>
                    <StatsOverview />
                </section>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Verification Table - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <VerificationTable />
                    </div>

                    {/* Access Control - Takes 1 column */}
                    <div>
                        <AccessControl />
                    </div>
                </div>

                {/* Activity Log Placeholder */}
                <section className="bg-slate-900/80 rounded-xl border border-white/5 p-6">
                    <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-amber-500" />
                        Recent Admin Activity
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
                                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-2 h-2 rounded-full ${item.type === "verify" || item.type === "approve"
                                                ? "bg-green-500"
                                                : item.type === "reject"
                                                    ? "bg-red-500"
                                                    : "bg-blue-500"
                                            }`}
                                    />
                                    <span className="text-sm text-slate-300">
                                        {item.action}:{" "}
                                        <span className="text-white">{item.target}</span>
                                    </span>
                                </div>
                                <span className="text-xs text-slate-500">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
