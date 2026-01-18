"use client";

import React, { useState } from "react";
import {
    CheckCircle2,
    XCircle,
    Clock,
    ShieldCheck,
    ShieldAlert,
    ExternalLink,
    Loader2,
    AlertTriangle,
} from "lucide-react";
import { Opportunity } from "@/types";
import { opportunities } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";

interface VerificationItem {
    opportunity: Opportunity;
    trustSignal: "Low" | "Medium" | "High";
    status: "pending" | "verifying" | "rejecting" | "verified" | "rejected";
}

// Helper to determine trust signal based on source
function getTrustSignal(
    opportunity: Opportunity
): VerificationItem["trustSignal"] {
    if (opportunity.source_partner.includes("University")) return "High";
    if (opportunity.source_partner.includes("Foundation")) return "High";
    if (opportunity.source_partner.includes("Inc") || opportunity.source_partner.includes("Corp"))
        return "Medium";
    return "Low";
}

export default function VerificationTable() {
    // Initialize with unverified opportunities
    const [items, setItems] = useState<VerificationItem[]>(() =>
        opportunities
            .filter((opp) => !opp.isVerified)
            .map((opp) => ({
                opportunity: opp,
                trustSignal: getTrustSignal(opp),
                status: "pending" as const,
            }))
    );

    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleVerify = async (id: string) => {
        // Set verifying state
        setItems((prev) =>
            prev.map((item) =>
                item.opportunity.id === id ? { ...item, status: "verifying" } : item
            )
        );

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Remove from list and show toast
        setItems((prev) => prev.filter((item) => item.opportunity.id !== id));
        showToast("✓ Opportunity Verified & Added to Trust Graph", "success");
    };

    const handleReject = async (id: string) => {
        // Set rejecting state
        setItems((prev) =>
            prev.map((item) =>
                item.opportunity.id === id ? { ...item, status: "rejecting" } : item
            )
        );

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Remove from list and show toast
        setItems((prev) => prev.filter((item) => item.opportunity.id !== id));
        showToast("Opportunity Rejected", "error");
    };

    const getTrustSignalColor = (signal: VerificationItem["trustSignal"]) => {
        switch (signal) {
            case "High":
                return "text-green-400 bg-green-500/20";
            case "Medium":
                return "text-amber-400 bg-amber-500/20";
            case "Low":
                return "text-red-400 bg-red-500/20";
        }
    };

    return (
        <div className="bg-slate-900/80 rounded-xl border border-white/5 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-500" />
                    Verification Queue
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs">
                        {items.length} pending
                    </span>
                </h3>
            </div>

            {/* Table */}
            {items.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs text-slate-400 uppercase tracking-wider border-b border-white/5">
                                <th className="px-6 py-3 font-medium">Opportunity</th>
                                <th className="px-6 py-3 font-medium">Source Partner</th>
                                <th className="px-6 py-3 font-medium">Posted</th>
                                <th className="px-6 py-3 font-medium">Trust Signal</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {items.map(({ opportunity, trustSignal, status }) => (
                                <tr
                                    key={opportunity.id}
                                    className="hover:bg-slate-800/50 transition-colors"
                                >
                                    {/* Title */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">
                                                {opportunity.type === "Grant"
                                                    ? "💰"
                                                    : opportunity.type === "Job"
                                                        ? "💼"
                                                        : opportunity.type === "Mentor"
                                                            ? "👤"
                                                            : "🏠"}
                                            </span>
                                            <div>
                                                <p className="font-medium text-white line-clamp-1">
                                                    {opportunity.title}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {opportunity.type}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Source Partner */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-300">
                                            {opportunity.source_partner}
                                        </span>
                                    </td>

                                    {/* Posted Date */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-400">
                                            {formatDate(opportunity.posted_at)}
                                        </span>
                                    </td>

                                    {/* Trust Signal */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrustSignalColor(
                                                trustSignal
                                            )}`}
                                        >
                                            {trustSignal === "High" ? (
                                                <ShieldCheck className="w-3 h-3" />
                                            ) : trustSignal === "Low" ? (
                                                <AlertTriangle className="w-3 h-3" />
                                            ) : (
                                                <Clock className="w-3 h-3" />
                                            )}
                                            {trustSignal}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {status === "verifying" ? (
                                                <span className="flex items-center gap-2 text-sm text-green-400">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Verifying...
                                                </span>
                                            ) : status === "rejecting" ? (
                                                <span className="flex items-center gap-2 text-sm text-red-400">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Rejecting...
                                                </span>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleVerify(opportunity.id)}
                                                        className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                                                        title="Verify Opportunity"
                                                    >
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(opportunity.id)}
                                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                        title="Reject Opportunity"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* Empty State */
                <div className="px-6 py-12 text-center">
                    <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-medium text-white">All caught up!</p>
                    <p className="text-sm text-slate-400 mt-1">
                        No pending verifications at this time.
                    </p>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div
                    className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 ${toast.type === "success"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                >
                    {toast.type === "success" ? (
                        <CheckCircle2 className="w-5 h-5" />
                    ) : (
                        <XCircle className="w-5 h-5" />
                    )}
                    {toast.message}
                </div>
            )}
        </div>
    );
}
