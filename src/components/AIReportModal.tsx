"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Brain,
    TrendingUp,
    Zap,
    Target,
    Users,
    Briefcase,
    Code,
    Globe,
    Cpu,
    Download,
    AlertTriangle,
    Sparkles,
} from "lucide-react";

// =========================================
// DESIGN TOKENS - POLISHED SCI-FI GLASS
// =========================================
const COLORS = {
    bgVoid: "#020202",
    bgCard: "rgba(255,255,255,0.03)",
    cyberCyan: "#00d4e5",
    gold: "#f5a623",
    green: "#22c55e",
    pink: "#ec4899",
    textPrimary: "#ffffff",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    border: "rgba(255,255,255,0.05)",
    borderHover: "rgba(255,255,255,0.15)",
};

// =========================================
// CLEAN RADAR CHART (Subtle Version)
// =========================================
const RadarChart = () => {
    const skills = [
        { label: "Tech", value: 85, angle: 0 },
        { label: "Innovation", value: 80, angle: 60 },
        { label: "Global", value: 75, angle: 120 },
        { label: "Leadership", value: 90, angle: 180 },
        { label: "Academic", value: 70, angle: 240 },
        { label: "Impact", value: 88, angle: 300 },
    ];

    const getPoint = (angle: number, value: number) => {
        const rad = (angle - 90) * (Math.PI / 180);
        const radius = (value / 100) * 38;
        return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) };
    };

    const polygonPoints = skills.map((s) => {
        const p = getPoint(s.angle, s.value);
        return `${p.x},${p.y}`;
    }).join(" ");

    return (
        <div className="relative w-44 h-44">
            <motion.div
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                    background: `conic-gradient(from 0deg, transparent 0deg, ${COLORS.cyberCyan}10 20deg, transparent 40deg)`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                {[18, 28, 38].map((r) => (
                    <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={COLORS.border} strokeWidth="0.5" />
                ))}
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                    const rad = (angle - 90) * (Math.PI / 180);
                    return (
                        <line key={angle} x1="50" y1="50" x2={50 + 40 * Math.cos(rad)} y2={50 + 40 * Math.sin(rad)} stroke={COLORS.border} strokeWidth="0.5" />
                    );
                })}
            </svg>
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                <motion.polygon
                    points={polygonPoints}
                    fill={`${COLORS.cyberCyan}15`}
                    stroke={COLORS.cyberCyan}
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                />
                {skills.map((s, i) => {
                    const p = getPoint(s.angle, s.value);
                    return (
                        <motion.circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r="2.5"
                            fill={COLORS.cyberCyan}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + i * 0.05 }}
                        />
                    );
                })}
            </svg>
            {skills.map((s, i) => {
                const labelRad = (s.angle - 90) * (Math.PI / 180);
                const labelDist = 48;
                return (
                    <span
                        key={i}
                        className="absolute text-[9px] text-slate-500"
                        style={{
                            left: `${50 + labelDist * Math.cos(labelRad)}%`,
                            top: `${50 + labelDist * Math.sin(labelRad)}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        {s.label}
                    </span>
                );
            })}
            <div className="absolute inset-0 m-auto w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.cyberCyan }} />
        </div>
    );
};

// =========================================
// CLEAN TIMELINE
// =========================================
const Timeline = () => {
    const steps = [
        { icon: Code, title: "Now", subtitle: "Strong Foundation", desc: "Ready for mid-level internships. Industry-standard tech stack.", color: COLORS.green, active: true },
        { icon: Users, title: "Q3 2026", subtitle: "Network Expansion", desc: "50+ high-value connections. Team lead potential.", color: COLORS.cyberCyan, active: false },
        { icon: Globe, title: "Q1 2027", subtitle: "Global Impact", desc: "Target: Big Tech role or YC Startup Founder.", color: COLORS.gold, active: false },
    ];

    return (
        <div className="space-y-1">
            {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.15 }}
                        className="relative"
                    >
                        {index < steps.length - 1 && (
                            <div className="absolute left-[15px] top-9 w-[1px] h-12" style={{ backgroundColor: `${step.color}30` }} />
                        )}
                        <div className="flex items-start gap-4 pb-5">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{
                                    backgroundColor: `${step.color}15`,
                                    boxShadow: step.active ? `0 0 0 2px ${step.color}` : "none"
                                }}
                            >
                                <Icon className="w-4 h-4" style={{ color: step.color }} />
                            </div>
                            <div className="flex-1 pt-0.5">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-xs font-medium text-slate-400">{step.title}</span>
                                    {step.active && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400">Current</span>
                                    )}
                                </div>
                                <h5 className="text-sm font-medium text-white">{step.subtitle}</h5>
                                <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

// =========================================
// CLEAN PROGRESS BAR
// =========================================
const ProgressBar = ({ label, percentage, rank, color }: { label: string; percentage: number; rank: string; color: string }) => (
    <div className="mb-5">
        <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">{label}</span>
            <span className="font-semibold" style={{ color }}>{rank}</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
        </div>
    </div>
);

// =========================================
// GLASS CARD WRAPPER
// =========================================
const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        className={`bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-all ${className}`}
    >
        {children}
    </motion.div>
);

// =========================================
// MAIN MODAL COMPONENT
// =========================================
interface AIReportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AIReportModal({ isOpen, onClose }: AIReportModalProps) {
    const [isScanning, setIsScanning] = useState(true);
    const [scanStep, setScanStep] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setIsScanning(true);
            setScanStep(0);
            const steps = [
                setTimeout(() => setScanStep(1), 400),
                setTimeout(() => setScanStep(2), 900),
                setTimeout(() => setScanStep(3), 1400),
                setTimeout(() => setIsScanning(false), 2000),
            ];
            return () => steps.forEach(clearTimeout);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const scanMessages = ["Initializing analysis...", "Scanning portfolio...", "Benchmarking peers...", "Generating insights..."];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden border border-white/10"
                        style={{
                            backgroundColor: COLORS.bgVoid,
                            boxShadow: "0 0 60px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ========================================= */}
                        {/* AMBIENT LIGHT LEAKS - Atmospheric Void   */}
                        {/* ========================================= */}

                        {/* Top-Left Cyan Glow */}
                        <div
                            className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
                            style={{
                                background: "radial-gradient(circle at 0% 0%, rgba(0, 180, 200, 0.08) 0%, transparent 60%)",
                                filter: "blur(80px)",
                            }}
                        />

                        {/* Bottom-Right Amber Glow */}
                        <div
                            className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
                            style={{
                                background: "radial-gradient(circle at 100% 100%, rgba(180, 100, 20, 0.12) 0%, transparent 60%)",
                                filter: "blur(100px)",
                            }}
                        />

                        {/* Center Subtle Vignette */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                            }}
                        />

                        {/* Header */}
                        <div className="relative z-10 flex-shrink-0 px-6 py-5 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-black" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                        AI Strategic Analysis
                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                            PRO
                                        </span>
                                    </h2>
                                    <p className="text-xs text-slate-500">Powered by Gold Students AI Engine</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}>
                            {isScanning ? (
                                <div className="h-full min-h-[400px] flex flex-col items-center justify-center">
                                    <div className="relative mb-8">
                                        <div className="w-24 h-24 rounded-full border border-white/10" />
                                        <motion.div
                                            className="absolute inset-0 w-24 h-24 rounded-full border-2 border-t-transparent"
                                            style={{ borderColor: COLORS.cyberCyan }}
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                        />
                                        <div className="absolute inset-0 m-auto w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                            <Cpu className="w-6 h-6 text-cyan-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-3">{scanMessages[scanStep]}</h3>
                                    <div className="flex gap-1.5">
                                        {[0, 1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="h-1.5 w-10 rounded-full transition-all duration-300"
                                                style={{ backgroundColor: i <= scanStep ? COLORS.cyberCyan : "rgba(255,255,255,0.1)" }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

                                    {/* Top Section */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <GlassCard className="lg:col-span-2" delay={0.1}>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-[10px] font-semibold px-2 py-1 rounded bg-amber-500 text-black">ELITE</span>
                                                <span className="text-xs text-green-400 flex items-center gap-1">
                                                    <TrendingUp className="w-3 h-3" /> Top 2%
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3">Exceptional Profile Strength</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl">
                                                Your portfolio demonstrates <span className="text-white">high-impact leadership</span> and{" "}
                                                <span className="text-white">technical versatility</span>. AI models predict a{" "}
                                                <span className="text-green-400 font-semibold">94% match rate</span> with Tier-1 opportunities.
                                            </p>
                                            <div className="grid grid-cols-3 gap-4">
                                                {[
                                                    { label: "Trust Score", value: "94", suffix: "/100", color: COLORS.gold },
                                                    { label: "Market Value", value: "High", suffix: " Demand", color: COLORS.cyberCyan },
                                                    { label: "Growth", value: "+12%", suffix: " MoM", color: COLORS.green },
                                                ].map((stat, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 + i * 0.1 }}
                                                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                                                    >
                                                        <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">{stat.label}</p>
                                                        <p className="text-xl font-bold" style={{ color: stat.color }}>
                                                            {stat.value}<span className="text-xs text-slate-500 font-normal">{stat.suffix}</span>
                                                        </p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </GlassCard>

                                        <GlassCard delay={0.2}>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Target className="w-4 h-4 text-cyan-400" />
                                                <span className="text-xs text-slate-400 font-medium">Skill Matrix</span>
                                            </div>
                                            <div className="flex justify-center py-2">
                                                <RadarChart />
                                            </div>
                                            <p className="text-[11px] text-slate-500 text-center mt-2">Balanced with Tech & Impact focus</p>
                                        </GlassCard>
                                    </div>

                                    {/* Middle Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <GlassCard delay={0.3}>
                                            <div className="flex items-center justify-between mb-5">
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="w-4 h-4 text-cyan-400" />
                                                    <span className="text-xs text-slate-400 font-medium">Career Trajectory</span>
                                                </div>
                                                <span className="text-[10px] text-slate-500">18 Month Projection</span>
                                            </div>
                                            <Timeline />
                                        </GlassCard>

                                        <GlassCard delay={0.4}>
                                            <div className="flex items-center justify-between mb-5">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-pink-400" />
                                                    <span className="text-xs text-slate-400 font-medium">Peer Benchmark</span>
                                                </div>
                                                <span className="text-[10px] text-slate-500">vs 12,400 members</span>
                                            </div>
                                            <ProgressBar label="Technical Skills" percentage={92} rank="Top 8%" color={COLORS.green} />
                                            <ProgressBar label="Community Trust" percentage={98} rank="Top 2%" color={COLORS.gold} />
                                            <ProgressBar label="Activity Level" percentage={85} rank="Top 15%" color={COLORS.cyberCyan} />
                                            <div className="mt-4 p-3 rounded-lg bg-pink-500/5 border border-pink-500/10">
                                                <p className="text-xs text-pink-300">
                                                    <AlertTriangle className="w-3 h-3 inline mr-1.5" />
                                                    Increase activity to reach the Top 5% globally.
                                                </p>
                                            </div>
                                        </GlassCard>
                                    </div>

                                    {/* Portfolio Table */}
                                    <GlassCard delay={0.5}>
                                        <div className="flex items-center gap-2 mb-5">
                                            <Zap className="w-4 h-4 text-amber-400" />
                                            <span className="text-xs text-slate-400 font-medium">Portfolio Analysis</span>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="text-[10px] text-slate-500 uppercase tracking-wide border-b border-white/5">
                                                        <th className="pb-3 font-medium">Project</th>
                                                        <th className="pb-3 font-medium">AI Score</th>
                                                        <th className="pb-3 font-medium">Feedback</th>
                                                        <th className="pb-3 font-medium"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm">
                                                    {[
                                                        { name: "E-Commerce Platform", score: 92, feedback: "Strong architecture. Add unit tests.", color: COLORS.green },
                                                        { name: "Neural Net Visualizer", score: 88, feedback: "Visually stunning. Optimize performance.", color: COLORS.gold },
                                                    ].map((project, i) => (
                                                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                                                            <td className="py-4 text-white">{project.name}</td>
                                                            <td className="py-4">
                                                                <span className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: `${project.color}15`, color: project.color }}>
                                                                    {project.score}/100
                                                                </span>
                                                            </td>
                                                            <td className="py-4 text-slate-400 text-xs">{project.feedback}</td>
                                                            <td className="py-4">
                                                                <span className="text-xs text-cyan-400 cursor-pointer hover:underline">View →</span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </GlassCard>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-3 pt-2">
                                        <button
                                            onClick={onClose}
                                            className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-all"
                                        >
                                            Close
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="px-5 py-2.5 rounded-xl bg-amber-500 text-black text-sm font-semibold flex items-center gap-2 hover:bg-amber-400 transition-all"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download Report
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
}
