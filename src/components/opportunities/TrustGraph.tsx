"use client";

import React from "react";
import {
    Shield,
    ShieldCheck,
    UserCheck,
    Activity,
    AlertTriangle,
    Clock,
    CheckCircle2,
    Users,
} from "lucide-react";

interface TrustGraphProps {
    isVerified: boolean;
    sourcePartner: string;
    postedAt: Date;
}

interface TimelineStep {
    icon: React.ReactNode;
    title: string;
    description: string;
    status: "complete" | "pending" | "warning";
}

export default function TrustGraph({
    isVerified,
    sourcePartner,
    postedAt,
}: TrustGraphProps) {
    // Define timeline steps based on verification status
    const verifiedSteps: TimelineStep[] = [
        {
            icon: <UserCheck className="w-5 h-5" />,
            title: "Posted by Partner",
            description: sourcePartner,
            status: "complete",
        },
        {
            icon: <ShieldCheck className="w-5 h-5" />,
            title: "Verified by Admin",
            description: "Identity & legitimacy confirmed",
            status: "complete",
        },
        {
            icon: <Activity className="w-5 h-5" />,
            title: "Community Signal",
            description: "High trust rating",
            status: "complete",
        },
    ];

    const unverifiedSteps: TimelineStep[] = [
        {
            icon: <Users className="w-5 h-5" />,
            title: "Posted by User",
            description: sourcePartner,
            status: "complete",
        },
        {
            icon: <Clock className="w-5 h-5" />,
            title: "Pending Verification",
            description: "Under review by our team",
            status: "warning",
        },
    ];

    const steps = isVerified ? verifiedSteps : unverifiedSteps;

    const getStatusColors = (status: TimelineStep["status"]) => {
        switch (status) {
            case "complete":
                return {
                    bg: "bg-green-500/20",
                    border: "border-green-500/50",
                    text: "text-green-400",
                    line: "bg-green-500",
                };
            case "pending":
                return {
                    bg: "bg-slate-700/50",
                    border: "border-slate-600",
                    text: "text-slate-400",
                    line: "bg-slate-600",
                };
            case "warning":
                return {
                    bg: "bg-amber-500/20",
                    border: "border-amber-500/50",
                    text: "text-amber-400",
                    line: "bg-amber-500",
                };
        }
    };

    return (
        <div className="glass-card rounded-xl p-5 border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-500" />
                    Trust Graph
                </h3>
                {isVerified ? (
                    <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/20 px-2 py-1 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        Unverified
                    </span>
                )}
            </div>

            {/* Timeline */}
            <div className="relative">
                {steps.map((step, index) => {
                    const colors = getStatusColors(step.status);
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={index} className="flex gap-4">
                            {/* Icon & Line */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text}`}
                                >
                                    {step.icon}
                                </div>
                                {!isLast && (
                                    <div
                                        className={`w-0.5 h-8 ${colors.line} opacity-50 my-1`}
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className={`flex-1 ${isLast ? "" : "pb-4"}`}>
                                <h4 className={`font-medium ${colors.text}`}>{step.title}</h4>
                                <p className="text-sm text-slate-400">{step.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500">
                    Posted {postedAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
            </div>
        </div>
    );
}
