"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    X,
    Sparkles,
    TrendingUp,
    Shield,
    Zap,
    Brain,
    Target,
    ChevronRight,
    ExternalLink,
    Loader2,
} from "lucide-react";
import { useUser } from "@/components/UserContext";
import { generateUserReport, AnalysisResult, Insight, Recommendation } from "@/lib/aiLogic";
import Link from "next/link";

interface AiReportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Typewriter hook for verdict text
function useTypewriter(text: string, speed: number = 30, startTyping: boolean = true) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!startTyping) {
            setDisplayText("");
            setIsComplete(false);
            return;
        }

        let index = 0;
        setDisplayText("");
        setIsComplete(false);

        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayText(text.slice(0, index + 1));
                index++;
            } else {
                setIsComplete(true);
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, startTyping]);

    return { displayText, isComplete };
}

// Insight icon mapping
function getInsightIcon(category: Insight["category"]) {
    switch (category) {
        case "trust": return Shield;
        case "skills": return Zap;
        case "goals": return Target;
        case "network": return Brain;
        default: return Sparkles;
    }
}

// Severity color mapping
function getSeverityColor(severity: Insight["severity"]) {
    switch (severity) {
        case "positive": return "text-green-400 bg-green-500/20 border-green-500/30";
        case "critical": return "text-red-400 bg-red-500/20 border-red-500/30";
        default: return "text-amber-400 bg-amber-500/20 border-amber-500/30";
    }
}

// Priority badge
function PriorityBadge({ priority }: { priority: Recommendation["priority"] }) {
    const colors = {
        high: "bg-red-500/20 text-red-400 border-red-500/30",
        medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        low: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    };

    return (
        <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[priority]}`}>
            {priority}
        </span>
    );
}

export default function AiReportModal({ isOpen, onClose }: AiReportModalProps) {
    const { user } = useUser();
    const [isScanning, setIsScanning] = useState(true);
    const [report, setReport] = useState<AnalysisResult | null>(null);
    const [showContent, setShowContent] = useState(false);

    // Generate report when modal opens
    useEffect(() => {
        if (isOpen) {
            setIsScanning(true);
            setShowContent(false);

            // Simulate AI scanning delay
            const scanTimer = setTimeout(() => {
                const generatedReport = generateUserReport(user);
                setReport(generatedReport);
                setIsScanning(false);

                // Small delay before showing content for animation
                setTimeout(() => setShowContent(true), 200);
            }, 1500);

            return () => clearTimeout(scanTimer);
        } else {
            // Reset state when closed
            setIsScanning(true);
            setReport(null);
            setShowContent(false);
        }
    }, [isOpen, user]);

    // Typewriter effect for verdict
    const { displayText: verdictText, isComplete: verdictComplete } = useTypewriter(
        report?.verdict || "",
        25,
        showContent && !!report
    );

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="w-full max-w-2xl max-h-[85vh] overflow-y-auto pointer-events-auto
                        bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800
                        border border-white/10 rounded-3xl shadow-2xl
                        animate-scaleIn"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 px-6 py-4 border-b border-white/10 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-slate-900" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Gold AI Strategic Analysis</h2>
                                <p className="text-xs text-slate-400">Powered by Opportunity Matching Engine</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Scanning State */}
                        {isScanning && (
                            <div className="py-16 flex flex-col items-center justify-center animate-pulse">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full border-4 border-slate-700" />
                                    <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                                    <Brain className="absolute inset-0 m-auto w-8 h-8 text-amber-400" />
                                </div>
                                <p className="mt-6 text-lg font-medium text-white">Scanning Profile...</p>
                                <p className="text-sm text-slate-400 mt-1">Analyzing {user.skills.length + user.goals.length + 4} data points</p>
                            </div>
                        )}

                        {/* Report Content */}
                        {!isScanning && report && showContent && (
                            <div className="space-y-6 animate-fadeIn">
                                {/* Section 1: Profile Strength */}
                                <section className="p-5 rounded-2xl bg-slate-800/50 border border-white/5">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-white flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-amber-500" />
                                            Profile Strength
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{report.tierEmoji}</span>
                                            <span className="text-amber-400 font-bold">{report.profileTier} Tier</span>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="relative">
                                        <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${report.profileStrength}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between mt-2 text-xs text-slate-400">
                                            <span>Emerging</span>
                                            <span className="text-amber-400 font-bold">{report.profileStrength}%</span>
                                            <span>Elite</span>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: AI Verdict with Typewriter */}
                                <section className={`p-5 rounded-2xl border ${report.verdictType === "success"
                                        ? "bg-green-500/10 border-green-500/20"
                                        : report.verdictType === "warning"
                                            ? "bg-amber-500/10 border-amber-500/20"
                                            : "bg-blue-500/10 border-blue-500/20"
                                    }`}>
                                    <h3 className="font-semibold text-white flex items-center gap-2 mb-3">
                                        <Brain className={`w-5 h-5 ${report.verdictType === "success"
                                                ? "text-green-400"
                                                : report.verdictType === "warning"
                                                    ? "text-amber-400"
                                                    : "text-blue-400"
                                            }`} />
                                        AI Verdict
                                    </h3>
                                    <p className={`text-lg leading-relaxed ${report.verdictType === "success"
                                            ? "text-green-300"
                                            : report.verdictType === "warning"
                                                ? "text-amber-300"
                                                : "text-blue-300"
                                        }`}>
                                        {verdictText}
                                        {!verdictComplete && (
                                            <span className="inline-block w-2 h-5 bg-current ml-0.5 animate-pulse" />
                                        )}
                                    </p>
                                </section>

                                {/* Insights Grid */}
                                <section>
                                    <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                                        <Zap className="w-5 h-5 text-amber-500" />
                                        Key Insights
                                    </h3>
                                    <div className="grid gap-3">
                                        {report.insights.map((insight, index) => {
                                            const Icon = getInsightIcon(insight.category);
                                            return (
                                                <div
                                                    key={index}
                                                    className={`p-4 rounded-xl border ${getSeverityColor(insight.severity)} transition-all duration-300`}
                                                    style={{ animationDelay: `${index * 100}ms` }}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="text-2xl">{insight.icon}</div>
                                                        <div>
                                                            <h4 className="font-medium text-white">{insight.title}</h4>
                                                            <p className="text-sm text-slate-300 mt-1">{insight.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>

                                {/* Section 3: Top Recommendations */}
                                <section>
                                    <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                                        <Target className="w-5 h-5 text-amber-500" />
                                        Top 3 Recommendations
                                    </h3>
                                    <div className="space-y-3">
                                        {report.recommendations.map((rec, index) => (
                                            <Link
                                                key={rec.id}
                                                href={rec.link}
                                                onClick={onClose}
                                                className="block p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-amber-500/30 hover:bg-slate-800 transition-all group"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">
                                                                {index + 1}. {rec.title}
                                                            </span>
                                                            <PriorityBadge priority={rec.priority} />
                                                        </div>
                                                        <p className="text-sm text-slate-400">{rec.reason}</p>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>

                                {/* Footer */}
                                <div className="pt-4 border-t border-white/10 text-center">
                                    <p className="text-xs text-slate-500">
                                        Analyzed {report.dataPointsAnalyzed} data points • Updated {new Date().toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
