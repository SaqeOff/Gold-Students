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
        country: authUser.country || currentUser.country,
        skills: authUser.skills.length > 0 ? authUser.skills : currentUser.skills,
        goals: authUser.goals.length > 0 ? (authUser.goals as unknown as typeof currentUser.goals) : currentUser.goals,
    } : currentUser;

    // If admin, show simplified admin profile
    if (isAdmin) {
        return (
            <div className="min-h-screen p-6 md:p-8 space-y-8">
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950 via-slate-900 to-slate-900 border border-red-500/20">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#ef4444_0%,transparent_50%)]" />
                    </div>
                    <div className="relative p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-red-500 to-red-700 p-1">
                                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-5xl md:text-6xl">
                                        👑
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold flex items-center gap-1 shadow-lg shadow-red-500/30">
                                    <Shield className="w-4 h-4" />
                                    ADMIN
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {authUser?.name || "Super Admin"}
                                </h1>
                                <p className="text-red-400 font-medium mb-4">System Administrator</p>
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium border border-red-500/30">
                                        🔐 God Mode
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium border border-red-500/30">
                                        ⚡ Full Access
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-6xl font-bold text-red-500">∞</div>
                                <p className="text-slate-400 text-sm mt-1">Access Level</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="font-semibold text-white">Security Clearance</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-400">Level 10</p>
                        <p className="text-sm text-slate-500 mt-1">Maximum clearance</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-amber-400" />
                            </div>
                            <h3 className="font-semibold text-white">Permissions</h3>
                        </div>
                        <p className="text-3xl font-bold text-amber-400">All</p>
                        <p className="text-sm text-slate-500 mt-1">Read, Write, Delete, Admin</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <Target className="w-5 h-5 text-green-400" />
                            </div>
                            <h3 className="font-semibold text-white">Status</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-400">Active</p>
                        <p className="text-sm text-slate-500 mt-1">Session authenticated</p>
                    </div>
                </section>

                <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Admin Capabilities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Manage Users", "Review Applications", "Moderate Content", "System Settings", "View Analytics", "Send Notifications", "Manage Opportunities", "Access Logs"].map((cap) => (
                            <div key={cap} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                                <p className="text-sm text-slate-300">{cap}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    }

    // Calculate ORI based on display user
    const readinessIndex = calculateReadinessIndex(displayUser);
    const readinessLevel = getReadinessLevel(readinessIndex.overall_score);

    return (
        <div className="min-h-screen p-6 md:p-8 space-y-8">
            {/* =========================================
          HERO SECTION
          ========================================= */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#f59e0b_0%,transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#3b82f6_0%,transparent_50%)]" />
                </div>

                <div className="relative p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-1">
                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-5xl md:text-6xl font-bold text-amber-400">
                                    {displayUser.name.charAt(0)}
                                </div>
                            </div>
                            {/* Trust Level Badge */}
                            <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 text-sm font-bold flex items-center gap-1 shadow-lg shadow-amber-500/30">
                                <Trophy className="w-4 h-4" />
                                {displayUser.trust_level}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {displayUser.name}
                            </h1>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400">
                                <span className="flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-amber-500" />
                                    {displayUser.university}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-amber-500" />
                                    {getCountryFlag(displayUser.country)} {displayUser.country}
                                </span>
                            </div>

                            {/* Goals */}
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                                {displayUser.goals.map((goal) => (
                                    <span
                                        key={goal}
                                        className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium border border-amber-500/30"
                                    >
                                        <Target className="w-3 h-3 inline mr-1" />
                                        {goal}
                                    </span>
                                ))}
                            </div>

                            {/* Social Links (Case Requirement 3.1) */}
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                                {displayUser.linkedin_url && (
                                    <a
                                        href={displayUser.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors border border-blue-500/30"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        LinkedIn
                                    </a>
                                )}
                                {displayUser.github_url && (
                                    <a
                                        href={displayUser.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/80 text-slate-300 hover:bg-slate-600 transition-colors border border-slate-600"
                                    >
                                        <Github className="w-4 h-4" />
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* XP Points */}
                        <div className="text-center">
                            <div className="text-4xl font-bold text-amber-400">
                                {displayUser.xp_points.toLocaleString()}
                            </div>
                            <div className="text-slate-400 text-sm">XP Points</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================
          BENTO GRID - Main Stats
          ========================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* ORI Card - Large */}
                <div className="md:col-span-2 lg:col-span-2 glass-card rounded-2xl p-6 border border-amber-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-amber-500" />
                            Opportunity Readiness Index
                        </h3>
                        <span className="text-amber-400 text-sm font-medium">
                            {readinessLevel.emoji} {readinessLevel.label}
                        </span>
                    </div>

                    <div className="flex items-center gap-8">
                        <CircularProgress
                            value={readinessIndex.overall_score}
                            size={160}
                            strokeWidth={12}
                            color="#f59e0b"
                            label="ORI"
                            glowEffect={true}
                        />

                        <div className="flex-1 space-y-4">
                            {/* Component Scores */}
                            <div className="space-y-3">
                                <ProgressBar
                                    label="Profile"
                                    value={readinessIndex.profile_score}
                                    color="bg-blue-500"
                                />
                                <ProgressBar
                                    label="Skills"
                                    value={readinessIndex.skills_score}
                                    color="bg-green-500"
                                />
                                <ProgressBar
                                    label="Activity"
                                    value={readinessIndex.activity_score}
                                    color="bg-purple-500"
                                />
                                <ProgressBar
                                    label="Network"
                                    value={readinessIndex.network_score}
                                    color="bg-amber-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    {readinessIndex.recommendations.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-sm text-slate-400 mb-2">Quick wins to improve your score:</p>
                            <ul className="space-y-1">
                                {readinessIndex.recommendations.slice(0, 2).map((rec, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-amber-500" />
                                        {rec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Trust Score Card */}
                <div className="glass-card rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5 text-green-500" />
                        Trust Score
                    </h3>

                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <Shield className="w-24 h-24 text-green-500/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold text-green-400">
                                    {displayUser.trust_score}
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mt-2">Verified Gold Member</p>
                        <div className="mt-4 flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i <= Math.ceil(displayUser.trust_score / 20)
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-slate-600"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Profile Completeness Card */}
                <div className="glass-card rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        Profile
                    </h3>

                    <div className="flex flex-col items-center">
                        <CircularProgress
                            value={displayUser.profile_completeness}
                            size={100}
                            strokeWidth={8}
                            color="#a855f7"
                            showValue={true}
                            glowEffect={false}
                        />
                        <p className="text-slate-400 text-sm mt-3">
                            {displayUser.profile_completeness === 100
                                ? "Profile Complete!"
                                : `${100 - displayUser.profile_completeness}% to go`}
                        </p>
                    </div>
                </div>
            </div>

            {/* =========================================
          SKILL TRAJECTORY SECTION
          ========================================= */}
            <section className="glass-card rounded-2xl p-6 border border-amber-500/20">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500" />
                        Skill Trajectory
                    </h3>
                    <span className="text-sm text-slate-400">
                        {displayUser.skills.length} skills acquired
                    </span>
                </div>

                <div className="space-y-6">
                    {/* Acquired Skills */}
                    <div>
                        <p className="text-sm text-slate-400 mb-3 uppercase tracking-wider">
                            Acquired Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {displayUser.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 text-sm font-medium border border-amber-500/30 hover:border-amber-500/50 transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Next Logical Skills (Locked) */}
                    <div>
                        <p className="text-sm text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Next Logical Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {nextLogicalSkills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-4 py-2 rounded-full bg-slate-800/50 text-slate-500 text-sm font-medium border border-slate-700 flex items-center gap-2 cursor-not-allowed"
                                >
                                    <Lock className="w-3 h-3" />
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-3">
                            Based on your goals and current trajectory, these skills will boost your profile
                        </p>
                    </div>
                </div>
            </section>

            {/* =========================================
          BADGES SECTION
          ========================================= */}
            <section className="glass-card rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        Achievements
                    </h3>
                    <span className="text-sm text-amber-400">
                        {displayUser.badges.length} badges earned
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayUser.badges.map((badge) => (
                        <div
                            key={badge.id}
                            className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-amber-500/30 transition-colors"
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center text-2xl">
                                {badge.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-white">{badge.name}</h4>
                                <p className="text-sm text-slate-400">{badge.description}</p>
                            </div>
                        </div>
                    ))}

                    {/* Locked Badge Placeholder */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-dashed border-slate-700 opacity-50">
                        <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-slate-500">Next Badge</h4>
                            <p className="text-sm text-slate-600">Apply to 5 opportunities</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================
          ABOUT & INTERESTS
          ========================================= */}
            <section className="glass-card rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">About & Interests</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-3">
                            Interests
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {displayUser.interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-3">
                            Experience Level
                        </h4>
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold">
                                {displayUser.xp_level}
                            </span>
                            <span className="text-slate-400">
                                Member since {displayUser.joined_at.toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
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
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-white font-medium">{value}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-1000`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

