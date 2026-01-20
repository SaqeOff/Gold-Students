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
import { CyberLayout } from "@/components/cyber/CyberLayout";
import { CyberCard } from "@/components/cyber/CyberCard";
import { GlitchText } from "@/components/cyber/GlitchText";
import { COLORS } from "@/components/cyber/constants";

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
            <CyberLayout>
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6 relative">
                            <AlertTriangle className="w-10 h-10 text-[#FFD700]" />
                            <div className="absolute inset-0 rounded-full animate-ping bg-[#FFD700]/10" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            <GlitchText>Opportunity Not Found</GlitchText>
                        </h1>
                        <p className="text-slate-400 mb-6">
                            This opportunity may have been removed or the link is incorrect.
                        </p>
                        <button
                            onClick={() => router.push("/opportunities")}
                            className="px-6 py-3 rounded-lg bg-[#FFD700] text-slate-900 font-medium hover:bg-[#FFE55C] transition-colors shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                        >
                            Browse Opportunities
                        </button>
                    </div>
                </div>
            </CyberLayout>
        );
    }

    const daysLeft = daysUntilDeadline(opportunity.deadline);
    const isUrgent = daysLeft <= 7 && daysLeft > 0;
    const isPast = daysLeft < 0;

    // Score color
    const getScoreColor = (score: number) => {
        if (score >= 80) return COLORS.matrixGreen;
        if (score >= 50) return COLORS.highVoltageGold;
        return COLORS.errorRed;
    };

    return (
        <CyberLayout className="pb-24">
            {/* Back Button */}
            <div className="mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-400 hover:text-[#00f3ff] transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Opportunities
                </button>
            </div>

            {/* Hero Section */}
            <CyberCard className="p-6 md:p-8 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f3ff]/5 rounded-full blur-[100px]" />
                <div className="flex flex-col lg:flex-row gap-6 relative z-10">
                    {/* Left: Info */}
                    <div className="flex-1">
                        {/* Type & Verified Badge */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-sm border border-slate-600/50">
                                {opportunity.type}
                            </span>
                            {opportunity.isVerified ? (
                                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#0aff00]/10 text-[#0aff00] text-sm border border-[#0aff00]/20">
                                    <ShieldCheck className="w-4 h-4" />
                                    Verified Partner
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] text-sm border border-[#FFD700]/20">
                                    <AlertTriangle className="w-4 h-4" />
                                    Unverified
                                </span>
                            )}
                            {/* Silent Competition Badge */}
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${getCompetitionColor(
                                    opportunity.competition_level
                                )} bg-slate-800 border border-current opacity-80`}
                            >
                                {formatCompetitionLabel(opportunity.competition_level)}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            <GlitchText>{opportunity.title}</GlitchText>
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-slate-400">
                            <span className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-[#FFD700]" />
                                {opportunity.source_partner}
                            </span>
                            <span className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#FFD700]" />
                                {opportunity.location}
                            </span>
                            <span
                                className={`flex items-center gap-2 ${isPast ? "text-slate-500" : isUrgent ? "text-[#ff003c]" : ""
                                    }`}
                            >
                                {isUrgent ? (
                                    <Clock className="w-5 h-5" />
                                ) : (
                                    <Calendar className="w-5 h-5 text-[#FFD700]" />
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
                                    <span className="flex items-center gap-2 text-[#0aff00]">
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
                                    <span className="flex items-center gap-2 text-[#00f3ff]">
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
                                    stroke="rgba(255,255,255,0.05)"
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
                                        )}80)`,
                                    }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-white" style={{ textShadow: `0 0 10px ${getScoreColor(matchResult.score)}` }}>
                                    {matchResult.score}%
                                </span>
                                <span className="text-xs text-slate-400 uppercase tracking-widest">Match</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 mt-2 text-center">
                            Based on your profile
                        </p>
                    </div>
                </div>
            </CyberCard>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <CyberCard className="p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#00f3ff] rounded-full shadow-[0_0_10px_#00f3ff]" />
                            About This Opportunity
                        </h2>
                        <p className="text-slate-300 leading-relaxed">
                            {opportunity.description}
                        </p>
                    </CyberCard>

                    {/* Requirements */}
                    <CyberCard className="p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#00f3ff] rounded-full shadow-[0_0_10px_#00f3ff]" />
                            Requirements
                        </h2>
                        <ul className="space-y-2">
                            {opportunity.requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    {matchResult.matching_skills.includes(
                                        req.toLowerCase().replace(/\s+/g, "_")
                                    ) ? (
                                        <CheckCircle2 className="w-5 h-5 text-[#0aff00] flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(10,255,0,0.3)]" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex-shrink-0 mt-0.5" />
                                    )}
                                    <span className="text-slate-300">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </CyberCard>

                    {/* Why This Fits You */}
                    {matchResult.gap_analysis.length > 0 && (
                        <CyberCard className="p-6 border-[#FFD700]/30" glowColor={COLORS.highVoltageGold}>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 text-[#FFD700]" />
                                Match Analysis
                            </h2>
                            <ul className="space-y-2">
                                {matchResult.gap_analysis.map((reason, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-slate-300"
                                    >
                                        <span className="text-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.5)]">•</span>
                                        {reason}
                                    </li>
                                ))}
                            </ul>
                        </CyberCard>
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
                        <CyberCard className="p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-sm">Applicants</span>
                                <span className="text-white font-semibold text-lg" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>
                                    {opportunity.applicant_count.toLocaleString()}
                                </span>
                            </div>
                        </CyberCard>
                    )}
                </div>
            </div>

            {/* Sticky Footer - Soft Commitment */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#050505]/90 backdrop-blur-xl border-t border-[#00f3ff]/20 p-4 z-50">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Commitment Status */}
                        <div className="text-sm text-slate-400">
                            {commitment === "none" && "Choose your commitment level"}
                            {commitment === "interested" && <span className="text-[#00f3ff]">✓ Saved to your interests</span>}
                            {commitment === "preparing" && <span className="text-purple-400">✓ Marked as preparing</span>}
                            {commitment === "applied" && <span className="text-[#0aff00]">✓ Application submitted!</span>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            {/* Save Interest */}
                            <button
                                onClick={() => setCommitment("interested")}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${commitment === "interested"
                                    ? "bg-[#00f3ff]/20 text-[#00f3ff] border border-[#00f3ff]/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                                    : "bg-slate-800 text-slate-300 border border-white/10 hover:border-[#00f3ff]/30 hover:text-white"
                                    }`}
                            >
                                <Bookmark
                                    className={`w-5 h-5 ${commitment === "interested" ? "fill-[#00f3ff] stroke-[#00f3ff]" : ""
                                        }`}
                                />
                                <span className="hidden sm:inline">Save Interest</span>
                            </button>

                            {/* Preparing */}
                            <button
                                onClick={() => setCommitment("preparing")}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${commitment === "preparing"
                                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                    : "bg-slate-800 text-slate-300 border border-white/10 hover:border-purple-500/30 hover:text-white"
                                    }`}
                            >
                                <Wrench className="w-5 h-5" />
                                <span className="hidden sm:inline">Preparing</span>
                            </button>

                            {/* Apply Now */}
                            <button
                                onClick={() => setCommitment("applied")}
                                disabled={isPast}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all relative overflow-hidden ${isPast
                                    ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                                    : commitment === "applied"
                                        ? "bg-[#0aff00] text-black shadow-[0_0_20px_#0aff00]"
                                        : "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-slate-900 hover:from-[#FFE55C] hover:to-[#FFB733] shadow-[0_0_20px_rgba(255,215,0,0.3)]"
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
        </CyberLayout>
    );
}
