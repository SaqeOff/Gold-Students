"use client";

import React, { useState, useEffect } from "react";
import {
    X,
    Brain,
    TrendingUp,
    Zap,
    Target,
    ChevronRight,
    Sparkles,
    Shield,
    Award,
    Users,
    Briefcase,
    Code,
    Globe
} from "lucide-react";
import Link from "next/link";

interface AIReportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AIReportModal({ isOpen, onClose }: AIReportModalProps) {
    const [isScanning, setIsScanning] = useState(true);
    const [scanStep, setScanStep] = useState(0);

    // Simulate complex scanning process
    useEffect(() => {
        if (isOpen) {
            setIsScanning(true);
            setScanStep(0);

            const steps = [
                setTimeout(() => setScanStep(1), 500),  // Analyzing Portfolio
                setTimeout(() => setScanStep(2), 1200), // Benchmarking Peers
                setTimeout(() => setScanStep(3), 2000), // Calculating Trajectory
                setTimeout(() => setIsScanning(false), 2800) // Done
            ];

            return () => steps.forEach(clearTimeout);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const scanMessages = [
        "Initializing Neural Scan...",
        "Analyzing Portfolio Depth...",
        "Benchmarking vs Top 5% Peers...",
        "Projecting Career Trajectory..."
    ];

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                    className="relative w-full max-w-5xl h-[90vh] flex flex-col bg-[#050b14] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Header */}
                    <div className="flex-shrink-0 px-6 py-4 border-b border-white/10 bg-[#050b14] flex items-center justify-between z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <Sparkles className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">AI Strategic Analysis <span className="text-amber-500 text-sm font-normal border border-amber-500/30 px-2 py-0.5 rounded-full ml-2">PRO</span></h2>
                                <p className="text-xs text-slate-400">Powered by Gold Students Opportunity Engine™</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {isScanning ? (
                            <div className="h-full flex flex-col items-center justify-center p-10">
                                <div className="relative mb-8">
                                    <div className="w-32 h-32 rounded-full border-4 border-slate-800" />
                                    <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                                    <div className="absolute inset-0 w-24 h-24 m-auto rounded-full border-4 border-blue-500/50 border-b-transparent animate-spin-slow" />
                                    <Brain className="absolute inset-0 m-auto w-12 h-12 text-white animate-pulse" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{scanMessages[scanStep]}</h3>
                                <div className="flex gap-1">
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} className={`h-1.5 w-12 rounded-full transition-colors duration-500 ${i <= scanStep ? 'bg-amber-500' : 'bg-slate-800'}`} />
                                    ))}
                                </div>
                                <p className="text-slate-400 mt-6 font-mono text-sm">Processing datapoint: {Math.floor(Math.random() * 100000)}x{Math.floor(Math.random() * 100)}</p>
                            </div>
                        ) : (
                            <div className="p-6 space-y-8">

                                {/* TOP SECTION: VERDICT & SUMMARY */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Main Verification Card */}
                                    <div className="lg:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-amber-500/20 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/15 transition-all"></div>

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded">ELITE TIER</span>
                                                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> TOP 2%</span>
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2">Exceptional Profile Strength</h3>
                                            <p className="text-slate-300 leading-relaxed mb-6 max-w-xl">
                                                Your portfolio demonstrates <span className="text-white font-medium">high-impact leadership</span> and <span className="text-white font-medium">technical versatility</span>.
                                                The AI models predict a <span className="text-emerald-400 font-bold">94% match rate</span> with Tier-1 tech/finance opportunities.
                                            </p>

                                            <div className="flex gap-4">
                                                <div className="flex-1 bg-black/30 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
                                                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Trust Score</p>
                                                    <p className="text-2xl font-bold text-amber-500">94<span className="text-sm text-slate-500 text-base font-normal">/100</span></p>
                                                </div>
                                                <div className="flex-1 bg-black/30 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
                                                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Market Value</p>
                                                    <p className="text-2xl font-bold text-blue-400">High<span className="text-sm text-slate-500 text-base font-normal ml-1">Demand</span></p>
                                                </div>
                                                <div className="flex-1 bg-black/30 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
                                                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Growth Velocity</p>
                                                    <p className="text-2xl font-bold text-emerald-400">+12%<span className="text-sm text-slate-500 text-base font-normal ml-1">MoM</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skill Radar Mockup (CSS/SVG) */}
                                    <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 flex flex-col items-center justify-center relative">
                                        <h4 className="absolute top-4 left-6 text-sm font-semibold text-slate-300 flex items-center gap-2"><Target className="w-4 h-4 text-purple-400" /> Skill Matrix</h4>

                                        {/* Simple CSS Hexagon Radar */}
                                        <div className="relative w-48 h-48 mt-4">
                                            {/* Background Grid */}
                                            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                                                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-400" />
                                                <polygon points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-400" />
                                            </svg>

                                            {/* Data Shape */}
                                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                                                <polygon points="50,15 85,35 80,75 50,85 20,65 15,35" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2" />
                                            </svg>

                                            {/* Labels */}
                                            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">Tech</span>
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">Leadership</span>
                                            <span className="absolute top-1/4 right-0 text-[10px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">Innovation</span>
                                            <span className="absolute bottom-1/4 right-0 text-[10px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">Global</span>
                                            <span className="absolute top-1/4 left-0 text-[10px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">Impact</span>
                                            <span className="absolute bottom-1/4 left-0 text-[10px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">Academic</span>
                                        </div>
                                        <p className="text-xs text-purple-400 mt-4 text-center">Balanced Profile: Strong Tech & Impact bias</p>
                                    </div>
                                </div>

                                {/* MIDDLE SECTION: TRAJECTORY & PEER STATS */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Career Trajectory */}
                                    <div className="p-6 rounded-3xl bg-slate-900 border border-white/5">
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="font-semibold text-white flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-400" /> Career Trajectory</h4>
                                            <span className="text-xs text-slate-500">Projection: 18 Months</span>
                                        </div>

                                        <div className="space-y-6 relative">
                                            {/* Vertical Line */}
                                            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-800" />

                                            {/* Steps */}
                                            <div className="relative flex items-start gap-4">
                                                <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center shrink-0 z-10">
                                                    <Code className="w-4 h-4 text-green-500" />
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-medium text-white">Current State: Strong Foundation</h5>
                                                    <p className="text-xs text-slate-400 mt-1">Ready for mid-level internships. Tech stack is industry-standard.</p>
                                                </div>
                                            </div>

                                            <div className="relative flex items-start gap-4 opacity-75">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/50 flex items-center justify-center shrink-0 z-10">
                                                    <Users className="w-4 h-4 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-medium text-white">Q3 2026: Network Expansion</h5>
                                                    <p className="text-xs text-slate-400 mt-1">Predicted 50+ high-value connections. Team lead potential.</p>
                                                </div>
                                            </div>

                                            <div className="relative flex items-start gap-4 opacity-50">
                                                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 z-10">
                                                    <Globe className="w-4 h-4 text-amber-500" />
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-medium text-white">Q1 2027: Global Impact</h5>
                                                    <p className="text-xs text-slate-400 mt-1">Target: Big Tech Role / YC Startup Founder</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Peer Benchmarking */}
                                    <div className="p-6 rounded-3xl bg-slate-900 border border-white/5">
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="font-semibold text-white flex items-center gap-2"><Users className="w-5 h-5 text-pink-400" /> Peer Benchmark</h4>
                                            <span className="text-xs text-slate-500">vs 12,400 Members</span>
                                        </div>

                                        <div className="space-y-5">
                                            <div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-slate-400">Technical Skills</span>
                                                    <span className="text-emerald-400 font-bold">Top 8%</span>
                                                </div>
                                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 w-[92%] rounded-full" />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-slate-400">Community Trust</span>
                                                    <span className="text-amber-400 font-bold">Top 2%</span>
                                                </div>
                                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-amber-500 w-[98%] rounded-full" />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-slate-400">Activity Level</span>
                                                    <span className="text-blue-400 font-bold">Top 15%</span>
                                                </div>
                                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500 w-[85%] rounded-full" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs text-pink-200">
                                            💡 <span className="font-bold">Insight:</span> Increasing your activity level (posts, comments) could boost your overall rank into the Top 5% Global.
                                        </div>
                                    </div>
                                </div>

                                {/* BOTTOM: PORTFOLIO DEEP DIVE */}
                                <div className="rounded-3xl bg-slate-900/80 border border-white/5 overflow-hidden">
                                    <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                                        <h4 className="font-semibold text-white flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> Portfolio Deep Dive</h4>
                                    </div>
                                    <div className="p-2">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="text-xs text-slate-500 uppercase border-b border-white/5">
                                                    <th className="px-4 py-3 font-medium">Project Evaluated</th>
                                                    <th className="px-4 py-3 font-medium">AI Impact Score</th>
                                                    <th className="px-4 py-3 font-medium">Key Feedback</th>
                                                    <th className="px-4 py-3 font-medium">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                <tr className="hover:bg-white/5 transition-colors">
                                                    <td className="px-4 py-4 text-white font-medium">E-Commerce Platform</td>
                                                    <td className="px-4 py-4"><span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-xs">92/100</span></td>
                                                    <td className="px-4 py-4 text-slate-400">Strong architecture. Add unit tests.</td>
                                                    <td className="px-4 py-4"><span className="text-amber-500 hover:text-amber-400 cursor-pointer text-xs font-bold">View &gt;</span></td>
                                                </tr>
                                                <tr className="hover:bg-white/5 transition-colors">
                                                    <td className="px-4 py-4 text-white font-medium">Neural Net Viz</td>
                                                    <td className="px-4 py-4"><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs">88/100</span></td>
                                                    <td className="px-4 py-4 text-slate-400">Visually stunning. optimize perfs.</td>
                                                    <td className="px-4 py-4"><span className="text-amber-500 hover:text-amber-400 cursor-pointer text-xs font-bold">View &gt;</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="flex justify-end gap-4 pt-4">
                                    <button onClick={onClose} className="px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors">
                                        Close Report
                                    </button>
                                    <button onClick={onClose} className="px-6 py-3 rounded-xl gold-gradient text-black font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-amber-500/20">
                                        Download PDF Bundle <Award className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
