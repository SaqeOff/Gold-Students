"use client";

import React from "react";
import {
    Shield,
    Award,
    MapPin,
    GraduationCap,
    Target,
    Sparkles,
    Lock,
    ChevronRight,
    Trophy,
    Star,
    Zap,
    TrendingUp,
    Linkedin,
    Github,
} from "lucide-react";
import { useUser } from "@/components/UserContext";
import { useAuth } from "@/context/AuthContext";
import { calculateReadinessIndex, getReadinessLevel } from "@/lib/logic";
import CircularProgress from "@/components/ui/CircularProgress";
import { CyberLayout } from "@/components/cyber/CyberLayout";
import { CyberCard } from "@/components/cyber/CyberCard";
import { GlitchText } from "@/components/cyber/GlitchText";
import { COLORS } from "@/components/cyber/constants";

// Mock "Next Skills" for trajectory visualization
const nextLogicalSkills = ["Public Speaking", "Leadership", "Project Management"];

// Country flag emoji helper
const getCountryFlag = (country: string): string => {
    const flags: Record<string, string> = {
        "United States": "🇺🇸",
        "Germany": "🇩🇪",
        "United Kingdom": "🇬🇧",
        "France": "🇫🇷",
        "Japan": "🇯🇵",
        "Canada": "🇨🇦",
        "Australia": "🇦🇺",
    };
    return flags[country] || "🌍";
};

export default function ProfilePage() {
    // Get user from AuthContext (real registered data)
    const { user: authUser, isAdmin } = useAuth();
    const { user: currentUser } = useUser();

    // Use auth user if available (real data), fallback to mock user
    const displayUser = authUser?.role === "student" ? {
        ...currentUser,
        name: authUser.name,
        email: authUser.email || currentUser.email,
        university: authUser.university || currentUser.university,
        bio: authUser.country ? `🌍 ${authUser.country}` : (currentUser as any).bio,
        skills: authUser.skills.length > 0 ? authUser.skills : currentUser.skills,
        goals: authUser.goals.length > 0 ? authUser.goals.map((g: string) => ({ id: g, title: g, description: "", category: "personal" } as any)) : currentUser.goals,
    } : currentUser;

    // If admin, show simplified admin profile
    if (isAdmin) {
        return (
            <CyberLayout>
                <div className="space-y-8">
                    <CyberCard className="!border-red-500/50 !shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                        <div className="relative p-4 md:p-8">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,#ef4444_0%,transparent_50%)]" />
                            <div className="relative flex flex-col md:flex-row items-center gap-8">
                                <div className="relative">
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-red-500 to-red-900 p-1 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                                        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-5xl md:text-6xl">
                                            👑
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-red-600 text-white text-sm font-bold flex items-center gap-1 shadow-lg shadow-red-500/30 border border-red-400">
                                        <Shield className="w-4 h-4" />
                                        ADMIN
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <GlitchText className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        {authUser?.name || "Super Admin"}
                                    </GlitchText>
                                    <p className="text-red-400 font-medium mb-4 tracking-widest uppercase text-sm">System Administrator</p>
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                        <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/30 uppercase tracking-wider">
                                            🔐 God Mode
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/30 uppercase tracking-wider">
                                            ⚡ Full Access
                                        </span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">∞</div>
                                    <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider">Access Level</p>
                                </div>
                            </div>
                        </div>
                    </CyberCard>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <CyberCard className="!border-red-500/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                                    <Shield className="w-5 h-5 text-red-400" />
                                </div>
                                <h3 className="font-semibold text-white">Security Clearance</h3>
                            </div>
                            <p className="text-3xl font-bold text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">Level 10</p>
                            <p className="text-sm text-slate-500 mt-1">Maximum clearance</p>
                        </CyberCard>
                        <CyberCard className="!border-amber-500/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                                    <Zap className="w-5 h-5 text-amber-400" />
                                </div>
                                <h3 className="font-semibold text-white">Permissions</h3>
                            </div>
                            <p className="text-3xl font-bold text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">All</p>
                            <p className="text-sm text-slate-500 mt-1">Read, Write, Delete, Admin</p>
                        </CyberCard>
                        <CyberCard className="!border-green-500/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                    <Target className="w-5 h-5 text-green-400" />
                                </div>
                                <h3 className="font-semibold text-white">Status</h3>
                            </div>
                            <p className="text-3xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">Active</p>
                            <p className="text-sm text-slate-500 mt-1">Session authenticated</p>
                        </CyberCard>
                    </div>

                    <CyberCard>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"></span>
                            Admin Capabilities
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {["Manage Users", "Review Applications", "Moderate Content", "System Settings", "View Analytics", "Send Notifications", "Manage Opportunities", "Access Logs"].map((cap) => (
                                <div key={cap} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center hover:border-red-500/50 hover:bg-red-500/5 transition-all cursor-crosshair">
                                    <p className="text-sm text-slate-300">{cap}</p>
                                </div>
                            ))}
                        </div>
                    </CyberCard>
                </div>
            </CyberLayout>
        );
    }

    // Calculate ORI based on display user
    const readinessIndex = calculateReadinessIndex(displayUser);
    const readinessLevel = getReadinessLevel(readinessIndex.overall_score);

    return (
        <CyberLayout>
            <div className="space-y-8">
                {/* =========================================
              HERO SECTION
              ========================================= */}
                <CyberCard className="relative overflow-hidden !p-0">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#f59e0b_0%,transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#00f3ff_0%,transparent_50%)]" />
                    </div>

                    <div className="relative p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Avatar */}
                            <div className="relative group">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-[3px] shadow-[0_0_30px_rgba(255,215,0,0.3)] group-hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-shadow duration-500">
                                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-5xl md:text-6xl font-bold text-[#FFD700]">
                                        {displayUser.name.charAt(0)}
                                    </div>
                                </div>
                                {/* Trust Level Badge */}
                                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-[#FFD700] text-black text-sm font-bold flex items-center gap-1 shadow-lg shadow-[#FFD700]/50 border border-white/20">
                                    <Trophy className="w-4 h-4" />
                                    {displayUser.trust_level}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <GlitchText className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {displayUser.name}
                                </GlitchText>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400 mt-2">
                                    <span className="flex items-center gap-2 hover:text-[#00f3ff] transition-colors">
                                        <GraduationCap className="w-5 h-5 text-[#00f3ff]" />
                                        {displayUser.university}
                                    </span>
                                    <span className="flex items-center gap-2 hover:text-[#00f3ff] transition-colors">
                                        <MapPin className="w-5 h-5 text-[#00f3ff]" />
                                        {getCountryFlag(displayUser.country)} {displayUser.country}
                                    </span>
                                </div>

                                {/* Goals */}
                                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                                    {displayUser.goals.map((goal: any) => (
                                        <span
                                            key={goal.id}
                                            className="px-3 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] text-sm font-bold border border-[#FFD700]/30 hover:bg-[#FFD700]/20 transition-colors uppercase tracking-wide"
                                        >
                                            <Target className="w-3 h-3 inline mr-1 mb-0.5" />
                                            {typeof goal === 'string' ? goal : goal.title}
                                        </span>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                                    {displayUser.linkedin_url && (
                                        <a
                                            href={displayUser.linkedin_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 transition-colors border border-[#0077b5]/30 group"
                                        >
                                            <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="group-hover:text-white transition-colors">LinkedIn</span>
                                        </a>
                                    )}
                                    {displayUser.github_url && (
                                        <a
                                            href={displayUser.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 transition-colors border border-white/10 group"
                                        >
                                            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="group-hover:text-white transition-colors">GitHub</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* XP Points */}
                            <div className="text-center relative">
                                <div className="text-4xl font-bold text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                                    {displayUser.xp_points.toLocaleString()}
                                </div>
                                <div className="text-[#00f3ff] text-xs font-bold tracking-[0.2em] mt-1 uppercase opacity-70">XP Points</div>
                            </div>
                        </div>
                    </div>
                </CyberCard>

                {/* =========================================
              BENTO GRID - Main Stats
              ========================================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* ORI Card - Large */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <CyberCard className="h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                                    <TrendingUp className="w-5 h-5 text-[#FFD700]" />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Opportunity Readiness</span>
                                </h3>
                                <span className="text-[#FFD700] text-sm font-bold px-3 py-1 rounded bg-[#FFD700]/10 border border-[#FFD700]/20">
                                    {readinessLevel.emoji} {readinessLevel.label}
                                </span>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative">
                                    <CircularProgress
                                        value={readinessIndex.overall_score}
                                        size={160}
                                        strokeWidth={12}
                                        color="#FFD700"
                                        label="ORI"
                                        glowEffect={true}
                                    />
                                    <div className="absolute inset-0 bg-[#FFD700]/5 blur-3xl rounded-full -z-10 animate-pulse" />
                                </div>

                                <div className="flex-1 space-y-5 w-full">
                                    {/* Component Scores */}
                                    <div className="space-y-4">
                                        <ProgressBar
                                            label="Profile"
                                            value={readinessIndex.profile_score}
                                            color="bg-[#00f3ff]"
                                        />
                                        <ProgressBar
                                            label="Skills"
                                            value={readinessIndex.skills_score}
                                            color="bg-[#10b981]"
                                        />
                                        <ProgressBar
                                            label="Activity"
                                            value={readinessIndex.activity_score}
                                            color="bg-[#bf5af2]"
                                        />
                                        <ProgressBar
                                            label="Network"
                                            value={readinessIndex.network_score}
                                            color="bg-[#FFD700]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Recommendations */}
                            {readinessIndex.recommendations.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <p className="text-xs text-[#00f3ff] mb-3 uppercase tracking-widest font-bold">Recommended Actions:</p>
                                    <ul className="space-y-2">
                                        {readinessIndex.recommendations.slice(0, 2).map((rec, i) => (
                                            <li key={i} className="text-sm text-slate-300 flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5 hover:border-[#00f3ff]/30 transition-colors">
                                                <ChevronRight className="w-4 h-4 text-[#00f3ff]" />
                                                {rec}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CyberCard>
                    </div>

                    {/* Trust Score Card */}
                    <CyberCard>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
                            <Shield className="w-5 h-5 text-[#10b981]" />
                            Trust Score
                        </h3>

                        <div className="flex flex-col items-center py-4">
                            <div className="relative mb-2 group">
                                <Shield className="w-28 h-28 text-[#10b981]/10 group-hover:text-[#10b981]/20 transition-colors duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl font-black text-[#10b981] drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                        {displayUser.trust_score}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-[#10b981]/5 blur-2xl rounded-full -z-10" />
                            </div>
                            <p className="text-[#10b981] text-xs font-bold uppercase tracking-wider bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/20">Verified Gold Member</p>
                            <div className="mt-6 flex gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 transition-all duration-300 ${i <= Math.ceil(displayUser.trust_score / 20)
                                            ? "text-[#FFD700] fill-[#FFD700] drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]"
                                            : "text-slate-800"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </CyberCard>

                    {/* Profile Completeness Card */}
                    <CyberCard>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
                            <Sparkles className="w-5 h-5 text-[#bf5af2]" />
                            Profile
                        </h3>

                        <div className="flex flex-col items-center py-4">
                            <CircularProgress
                                value={displayUser.profile_completeness}
                                size={120}
                                strokeWidth={10}
                                color="#bf5af2"
                                showValue={true}
                                glowEffect={true}
                            />
                            <p className="text-slate-400 text-sm mt-4 font-medium">
                                {displayUser.profile_completeness === 100
                                    ? <span className="text-[#bf5af2]">Profile Complete!</span>
                                    : <span><span className="text-[#bf5af2]">{100 - displayUser.profile_completeness}%</span> to go</span>}
                            </p>
                        </div>
                    </CyberCard>
                </div>

                {/* =========================================
              SKILL TRAJECTORY SECTION
              ========================================= */}
                <CyberCard>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                            <Zap className="w-5 h-5 text-[#FFD700]" />
                            Skill Trajectory
                        </h3>
                        <span className="text-xs text-[#00f3ff] font-mono border border-[#00f3ff]/30 px-2 py-1 rounded bg-[#00f3ff]/5">
                            DETECTED: {displayUser.skills.length}
                        </span>
                    </div>

                    <div className="space-y-8">
                        {/* Acquired Skills */}
                        <div>
                            <p className="text-xs text-slate-500 mb-4 uppercase tracking-[0.2em] font-bold">
                                // Acquired Skills
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {displayUser.skills.map((skill: string) => (
                                    <span
                                        key={skill}
                                        className="relative group px-4 py-2 rounded bg-slate-900 border border-white/10 overflow-hidden transition-all hover:border-[#00f3ff]/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                                    >
                                        <div className="absolute inset-0 bg-[#00f3ff]/0 group-hover:bg-[#00f3ff]/5 transition-colors" />
                                        <span className="relative text-sm font-medium text-slate-300 group-hover:text-[#00f3ff] transition-colors">{skill}</span>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Next Logical Skills (Locked) */}
                        <div>
                            <p className="text-xs text-slate-500 mb-4 uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                                // Next Logical Steps <Lock className="w-3 h-3" />
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {nextLogicalSkills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 rounded bg-black/40 text-slate-600 text-sm font-medium border border-slate-800 flex items-center gap-2 opacity-70"
                                    >
                                        <Lock className="w-3 h-3" />
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <p className="text-xs text-[#00f3ff]/70 mt-4 font-mono">
                                &gt; SYSTEM ADVICE: Based on your goals and current trajectory, these skills will boost your profile match rate by 24%.
                            </p>
                        </div>
                    </div>
                </CyberCard>

                {/* =========================================
              BADGES SECTION
              ========================================= */}
                <CyberCard>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                            <Award className="w-5 h-5 text-[#FFD700]" />
                            Achievements
                        </h3>
                        <span className="text-[#FFD700] text-sm font-bold">
                            {displayUser.badges.length} unlocked
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayUser.badges.map((badge: any) => (
                            <div
                                key={badge.id}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]"
                            >
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 border border-[#FFD700]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                    {badge.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white group-hover:text-[#FFD700] transition-colors">{badge.name}</h4>
                                    <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{badge.description}</p>
                                </div>
                            </div>
                        ))}

                        {/* Locked Badge Placeholder */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-dashed border-slate-800 opacity-60">
                            <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                                <Lock className="w-6 h-6 text-slate-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-600">Next Badge</h4>
                                <p className="text-xs text-slate-700">Apply to 5 opportunities</p>
                            </div>
                        </div>
                    </div>
                </CyberCard>

                {/* =========================================
              ABOUT & INTERESTS
              ========================================= */}
                <CyberCard>
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4">
                        System Data: <span className="text-[#00f3ff]">About & Interests</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xs text-[#00f3ff]/70 uppercase tracking-[0.2em] mb-4 font-bold">
                                // Interests_Tags
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {displayUser.interests.map((interest: string) => (
                                    <span
                                        key={interest}
                                        className="px-3 py-1.5 rounded bg-[#00f3ff]/10 text-[#00f3ff] text-sm font-medium border border-[#00f3ff]/30 hover:bg-[#00f3ff]/20 transition-colors"
                                    >
                                        #{interest}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs text-[#00f3ff]/70 uppercase tracking-[0.2em] mb-4 font-bold">
                                // Account_Status
                            </h4>
                            <div className="flex items-center gap-4">
                                <div className="px-4 py-2 rounded bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                                    {displayUser.xp_level}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Member Since</span>
                                    <span className="text-white font-mono text-sm">
                                        {displayUser.joined_at.toLocaleDateString("en-US", {
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CyberCard>
            </div>
        </CyberLayout>
    );
}

// =========================================
// Helper Components
// =========================================

function ProgressBar({
    label,
    value,
    color,
}: {
    label: string;
    value: number;
    color: string;
}) {
    // Extract base color for glow effect
    const glowColor = color.replace('bg-', 'text-');

    return (
        <div className="group">
            <div className="flex justify-between text-xs mb-1 font-mono uppercase tracking-wide">
                <span className="text-slate-500 group-hover:text-slate-300 transition-colors">{label}</span>
                <span className={`font-bold ${glowColor} group-hover:brightness-125 transition-all`}>{value}%</span>
            </div>
            <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-1000 shadow-[0_0_10px_currentColor]`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
