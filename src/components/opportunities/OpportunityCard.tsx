"use client";

import React from "react";
import {
    MapPin,
    Calendar,
    ShieldCheck,
    ExternalLink,
    Clock,
    Users,
    AlertCircle,
    Briefcase,
    GraduationCap,
    Home,
    UserCheck,
} from "lucide-react";
import { RankedOpportunity, formatCompetitionLabel, getCompetitionColor } from "@/lib/logic";
import { OpportunityType } from "@/types";
import { formatDate, daysUntilDeadline } from "@/lib/utils";

interface OpportunityCardProps {
    opportunity: RankedOpportunity;
    onViewDetails?: (id: string) => void;
}

// Icon mapping for opportunity types
const TYPE_ICONS: Record<OpportunityType, React.ReactNode> = {
    [OpportunityType.Grant]: <GraduationCap className="w-5 h-5" />,
    [OpportunityType.Job]: <Briefcase className="w-5 h-5" />,
    [OpportunityType.Mentor]: <UserCheck className="w-5 h-5" />,
    [OpportunityType.Housing]: <Home className="w-5 h-5" />,
};

// Score color based on value
function getScoreColor(score: number): string {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-amber-400";
    return "text-red-400";
}

function getScoreRingColor(score: number): string {
    if (score >= 80) return "#22c55e"; // green-500
    if (score >= 50) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
}

export default function OpportunityCard({
    opportunity,
    onViewDetails,
}: OpportunityCardProps) {
    const { matchResult } = opportunity;
    const daysLeft = daysUntilDeadline(opportunity.deadline);
    const isUrgent = daysLeft <= 7 && daysLeft > 0;
    const isPast = daysLeft < 0;

    return (
        <div
            className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${opportunity.isVerified
                    ? "border-amber-500/30 hover:border-amber-500/50"
                    : "border-white/10 hover:border-white/20"
                }`}
        >
            {/* Header */}
            <div className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3">
                    {/* Type Icon & Title */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className={`p-2 rounded-lg ${opportunity.isVerified
                                        ? "bg-amber-500/20 text-amber-400"
                                        : "bg-slate-700 text-slate-400"
                                    }`}
                            >
                                {TYPE_ICONS[opportunity.type]}
                            </div>
                            <span className="text-xs uppercase tracking-wider text-slate-400">
                                {opportunity.type}
                            </span>
                            {opportunity.isVerified && (
                                <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verified
                                </span>
                            )}
                        </div>
                        <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2">
                            {opportunity.title}
                        </h3>
                    </div>

                    {/* Match Score Ring */}
                    <div className="flex-shrink-0">
                        <div className="relative w-14 h-14">
                            <svg className="w-14 h-14 transform -rotate-90">
                                <circle
                                    cx="28"
                                    cy="28"
                                    r="24"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="4"
                                />
                                <circle
                                    cx="28"
                                    cy="28"
                                    r="24"
                                    fill="none"
                                    stroke={getScoreRingColor(matchResult.score)}
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeDasharray={2 * Math.PI * 24}
                                    strokeDashoffset={
                                        2 * Math.PI * 24 * (1 - matchResult.score / 100)
                                    }
                                    className="transition-all duration-500"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span
                                    className={`text-sm font-bold ${getScoreColor(
                                        matchResult.score
                                    )}`}
                                >
                                    {matchResult.score}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Source Partner */}
                <p className="text-sm text-slate-400 mt-2">
                    {opportunity.source_partner}
                </p>
            </div>

            {/* Description */}
            <div className="px-5 pb-3">
                <p className="text-sm text-slate-300 line-clamp-2">
                    {opportunity.description}
                </p>
            </div>

            {/* Smart Metrics */}
            <div className="px-5 pb-3 space-y-2">
                {/* Competition Level */}
                <div
                    className={`flex items-center gap-2 text-sm ${getCompetitionColor(
                        opportunity.competition_level
                    )}`}
                >
                    <Users className="w-4 h-4" />
                    <span>{formatCompetitionLabel(opportunity.competition_level)}</span>
                    {opportunity.applicant_count && (
                        <span className="text-slate-500">
                            • {opportunity.applicant_count.toLocaleString()} applicants
                        </span>
                    )}
                </div>

                {/* Gap Analysis */}
                {matchResult.missing_skills.length > 0 && matchResult.score < 100 && (
                    <div className="flex items-start gap-2 text-sm text-slate-400">
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>
                            Missing:{" "}
                            <span className="text-amber-400">
                                {matchResult.missing_skills
                                    .slice(0, 2)
                                    .map((s) => s.replace(/_/g, " "))
                                    .join(", ")}
                            </span>
                            {matchResult.missing_skills.length > 2 && (
                                <span className="text-slate-500">
                                    {" "}
                                    +{matchResult.missing_skills.length - 2} more
                                </span>
                            )}
                        </span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 bg-slate-800/50 border-t border-white/5">
                <div className="flex items-center justify-between">
                    {/* Location & Deadline */}
                    <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-slate-400">
                            <MapPin className="w-4 h-4" />
                            {opportunity.location.split(",")[0]}
                        </span>
                        <span
                            className={`flex items-center gap-1 ${isPast
                                    ? "text-slate-500"
                                    : isUrgent
                                        ? "text-red-400"
                                        : "text-slate-400"
                                }`}
                        >
                            {isUrgent ? (
                                <Clock className="w-4 h-4" />
                            ) : (
                                <Calendar className="w-4 h-4" />
                            )}
                            {isPast ? (
                                "Closed"
                            ) : isUrgent ? (
                                <span className="font-medium">{daysLeft}d left</span>
                            ) : (
                                formatDate(opportunity.deadline)
                            )}
                        </span>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => onViewDetails?.(opportunity.id)}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/30 transition-colors"
                    >
                        View Details
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>

                {/* Compensation if available */}
                {opportunity.compensation && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                        <span className="text-sm font-medium text-green-400">
                            {opportunity.compensation}
                        </span>
                        {opportunity.duration && (
                            <span className="text-sm text-slate-500">
                                {" "}
                                • {opportunity.duration}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
