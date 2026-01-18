"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    ShieldCheck,
    Users,
    Clock,
    Bookmark,
    Wrench,
    Send,
    Building2,
    Globe,
    DollarSign,
    CheckCircle2,
    ExternalLink,
    AlertTriangle,
} from "lucide-react";
import { opportunities, currentUser } from "@/lib/mockData";
import {
    calculateMatchScore,
    formatCompetitionLabel,
    getCompetitionColor,
} from "@/lib/logic";
import { formatDate, daysUntilDeadline } from "@/lib/utils";
import TrustGraph from "@/components/opportunities/TrustGraph";
import GapAnalysisCard from "@/components/opportunities/GapAnalysisCard";

// Commitment stage type
type CommitmentStage = "none" | "interested" | "preparing" | "applied";

export default function OpportunityDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [commitment, setCommitment] = useState<CommitmentStage>("none");

    // Find opportunity by ID
    const opportunity = useMemo(() => {
        return opportunities.find((opp) => opp.id === params.id);
    }, [params.id]);

    // Calculate match result in real-time
    const matchResult = useMemo(() => {
        if (!opportunity) return null;
        return calculateMatchScore(currentUser, opportunity);
    }, [opportunity]);

    // 404 State
    if (!opportunity || !matchResult) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-10 h-10 text-amber-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Opportunity Not Found
                    </h1>
                    <p className="text-slate-400 mb-6">
                        This opportunity may have been removed or the link is incorrect.
                    </p>
                    <button
                        onClick={() => router.push("/opportunities")}
                        className="px-6 py-3 rounded-lg bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 transition-colors"
                    >
                        Browse Opportunities
                    </button>
                </div>
            </div>
        );
    }

    const daysLeft = daysUntilDeadline(opportunity.deadline);
    const isUrgent = daysLeft <= 7 && daysLeft > 0;
    const isPast = daysLeft < 0;

    // Score color
    const getScoreColor = (score: number) => {
        if (score >= 80) return "#22c55e";
        if (score >= 50) return "#f59e0b";
        return "#ef4444";
    };

    return (
        <div className="min-h-screen pb-24">
            {/* Back Button */}
            <div className="p-4 md:p-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Opportunities
                </button>
            </div>

            {/* Hero Section */}
            <header className="px-4 md:px-6 pb-6">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left: Info */}
                        <div className="flex-1">
                            {/* Type & Verified Badge */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-sm">
                                    {opportunity.type}
                                </span>
                                {opportunity.isVerified ? (
                                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                                        <ShieldCheck className="w-4 h-4" />
                                        Verified Partner
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm">
                                        <AlertTriangle className="w-4 h-4" />
                                        Unverified
                                    </span>
                                )}
                                {/* Silent Competition Badge */}
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${getCompetitionColor(
                                        opportunity.competition_level
                                    )} bg-slate-800`}
                                >
                                    {formatCompetitionLabel(opportunity.competition_level)}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                {opportunity.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-4 text-slate-400">
                                <span className="flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-amber-500" />
                                    {opportunity.source_partner}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-amber-500" />
                                    {opportunity.location}
                                </span>
                                <span
                                    className={`flex items-center gap-2 ${isPast ? "text-slate-500" : isUrgent ? "text-red-400" : ""
                                        }`}
                                >
                                    {isUrgent ? (
                                        <Clock className="w-5 h-5" />
                                    ) : (
                                        <Calendar className="w-5 h-5 text-amber-500" />
                                    )}
                                    {isPast
                                        ? "Deadline passed"
                                        : isUrgent
                                            ? `${daysLeft} days left!`
                                            : `Deadline: ${formatDate(opportunity.deadline)}`}
                                </span>
                            </div>

                            {/* Compensation & Duration */}
                            {(opportunity.compensation || opportunity.duration) && (
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {opportunity.compensation && (
                                        <span className="flex items-center gap-2 text-green-400">
                                            <DollarSign className="w-5 h-5" />
                                            {opportunity.compensation}
                                        </span>
                                    )}
                                    {opportunity.duration && (
                                        <span className="flex items-center gap-2 text-slate-400">
                                            <Clock className="w-5 h-5" />
                                            {opportunity.duration}
                                        </span>
                                    )}
                                    {opportunity.remote_friendly && (
                                        <span className="flex items-center gap-2 text-blue-400">
                                            <Globe className="w-5 h-5" />
                                            Remote Friendly
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right: Match Score Ring */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative w-32 h-32">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        fill="none"
                                        stroke={getScoreColor(matchResult.score)}
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={2 * Math.PI * 56}
                                        strokeDashoffset={
                                            2 * Math.PI * 56 * (1 - matchResult.score / 100)
                                        }
                                        className="transition-all duration-1000"
                                        style={{
                                            filter: `drop-shadow(0 0 8px ${getScoreColor(
                                                matchResult.score
                                            )}50)`,
                                        }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-white">
                                        {matchResult.score}%
                                    </span>
                                    <span className="text-xs text-slate-400 uppercase">Match</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 mt-2 text-center">
                                Based on your profile
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <section className="glass-card rounded-xl p-6 border border-white/10">
                            <h2 className="text-lg font-semibold text-white mb-4">
                                About This Opportunity
                            </h2>
                            <p className="text-slate-300 leading-relaxed">
                                {opportunity.description}
                            </p>
                        </section>

                        {/* Requirements */}
                        <section className="glass-card rounded-xl p-6 border border-white/10">
                            <h2 className="text-lg font-semibold text-white mb-4">
                                Requirements
                            </h2>
                            <ul className="space-y-2">
                                {opportunity.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        {matchResult.matching_skills.includes(
                                            req.toLowerCase().replace(/\s+/g, "_")
                                        ) ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex-shrink-0 mt-0.5" />
                                        )}
                                        <span className="text-slate-300">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Why This Fits You */}
                        {matchResult.gap_analysis.length > 0 && (
                            <section className="glass-card rounded-xl p-6 border border-amber-500/20">
                                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-amber-500" />
                                    Match Analysis
                                </h2>
                                <ul className="space-y-2">
                                    {matchResult.gap_analysis.map((reason, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-slate-300"
                                        >
                                            <span className="text-amber-500">•</span>
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Trust Graph */}
                        <TrustGraph
                            isVerified={opportunity.isVerified}
                            sourcePartner={opportunity.source_partner}
                            postedAt={opportunity.posted_at}
                        />

                        {/* Gap Analysis */}
                        <GapAnalysisCard matchResult={matchResult} />

                        {/* Applicant Stats */}
                        {opportunity.applicant_count && (
                            <div className="glass-card rounded-xl p-5 border border-white/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400 text-sm">Applicants</span>
                                    <span className="text-white font-semibold">
                                        {opportunity.applicant_count.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Footer - Soft Commitment */}
            <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-4 z-50">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Commitment Status */}
                        <div className="text-sm text-slate-400">
                            {commitment === "none" && "Choose your commitment level"}
                            {commitment === "interested" && "✓ Saved to your interests"}
                            {commitment === "preparing" && "✓ Marked as preparing"}
                            {commitment === "applied" && "✓ Application submitted!"}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            {/* Save Interest */}
                            <button
                                onClick={() => setCommitment("interested")}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${commitment === "interested"
                                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                                        : "bg-slate-800 text-slate-300 border border-white/10 hover:border-blue-500/30"
                                    }`}
                            >
                                <Bookmark
                                    className={`w-5 h-5 ${commitment === "interested" ? "fill-blue-400" : ""
                                        }`}
                                />
                                <span className="hidden sm:inline">Save Interest</span>
                            </button>

                            {/* Preparing */}
                            <button
                                onClick={() => setCommitment("preparing")}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${commitment === "preparing"
                                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                                        : "bg-slate-800 text-slate-300 border border-white/10 hover:border-purple-500/30"
                                    }`}
                            >
                                <Wrench className="w-5 h-5" />
                                <span className="hidden sm:inline">Preparing</span>
                            </button>

                            {/* Apply Now */}
                            <button
                                onClick={() => setCommitment("applied")}
                                disabled={isPast}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${isPast
                                        ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                                        : commitment === "applied"
                                            ? "bg-green-500 text-white"
                                            : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20"
                                    }`}
                            >
                                {commitment === "applied" ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Applied
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Apply Now
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
