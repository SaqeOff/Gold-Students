"use client";

import React from "react";
import {
    CheckCircle2,
    XCircle,
    BookOpen,
    TrendingUp,
    AlertCircle,
    ExternalLink,
} from "lucide-react";
import { MatchResult } from "@/types";

interface GapAnalysisCardProps {
    matchResult: MatchResult;
}

export default function GapAnalysisCard({ matchResult }: GapAnalysisCardProps) {
    const {
        score,
        matching_skills,
        missing_skills,
        gap_analysis,
    } = matchResult;

    // Filter gap_analysis to only show skill-related items
    const skillGaps = gap_analysis.filter((g) =>
        g.toLowerCase().includes("missing") || g.toLowerCase().includes("skill")
    );

    return (
        <div className="glass-card rounded-xl p-5 border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-500" />
                    Readiness Audit
                </h3>
                <span
                    className={`text-sm font-bold ${score >= 80
                            ? "text-green-400"
                            : score >= 50
                                ? "text-amber-400"
                                : "text-red-400"
                        }`}
                >
                    {score}% Match
                </span>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Your Strengths */}
                <div className="space-y-3">
                    <h4 className="text-xs font-medium text-green-400 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" />
                        Your Strengths
                    </h4>
                    {matching_skills.length > 0 ? (
                        <ul className="space-y-2">
                            {matching_skills.map((skill, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 text-sm text-slate-300"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="capitalize">
                                        {skill.replace(/_/g, " ")}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-slate-500 italic">
                            No matching skills yet
                        </p>
                    )}
                </div>

                {/* Missing Requirements */}
                <div className="space-y-3">
                    <h4 className="text-xs font-medium text-red-400 uppercase tracking-wider flex items-center gap-2">
                        <XCircle className="w-3 h-3" />
                        Missing Requirements
                    </h4>
                    {missing_skills.length > 0 ? (
                        <ul className="space-y-2">
                            {missing_skills.map((skill, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between gap-2 text-sm"
                                >
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                        <span className="capitalize">
                                            {skill.replace(/_/g, " ")}
                                        </span>
                                    </div>
                                    <a
                                        href={`https://www.coursera.org/search?query=${encodeURIComponent(
                                            skill.replace(/_/g, " ")
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                                    >
                                        <BookOpen className="w-3 h-3" />
                                        Learn
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-green-400 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            All requirements met!
                        </p>
                    )}
                </div>
            </div>

            {/* Summary */}
            {missing_skills.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-amber-400 font-medium">
                                {missing_skills.length} skill gap
                                {missing_skills.length > 1 ? "s" : ""} detected
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                Close these gaps to increase your match score and chances of
                                success
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Perfect Match State */}
            {score === 100 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-green-400 font-medium">
                                Perfect Match!
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                Your profile meets all the requirements for this opportunity
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
