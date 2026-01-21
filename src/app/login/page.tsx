"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
    Crown,
    Mail,
    Lock,
    ArrowRight,
    Sparkles,
    AlertCircle,
    Loader2,
} from "lucide-react";
import { AmbientBackground } from "@/components/cyber/AmbientBackground";
import { DataRain } from "@/components/cyber/DataRain";
import { CyberCard } from "@/components/cyber/CyberCard";
import { GlitchText } from "@/components/cyber/GlitchText";
import { COLORS } from "@/components/cyber/constants";

// =========================================
// LOGIN PAGE - THE GATE
// Fullscreen standalone, centered card
// Shake animation on error
// =========================================

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await login(email, password);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Login failed";
            setError(message);
            // Trigger shake animation
            setShake(true);
            setTimeout(() => setShake(false), 500);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Fullscreen container - completely standalone
        <div className="fixed inset-0 z-[100] min-h-screen flex items-center justify-center p-4 bg-[#050505] overflow-hidden">
            {/* Background Effects */}
            <AmbientBackground />
            <DataRain />

            {/* Login Card - Perfectly Centered with Shake Animation */}
            <div className={`relative w-full max-w-md z-10 ${shake ? "animate-shake" : ""}`}>
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] mb-4 shadow-lg shadow-[#FFD700]/20">
                        <Crown className="w-8 h-8 text-slate-900" />
                    </div>
                    <div className="mb-2">
                        <GlitchText className="text-3xl font-bold text-white">Welcome Back</GlitchText>
                    </div>
                    <p className="text-slate-400">Sign in to Gold Students Club</p>
                </div>

                {/* Card */}
                <CyberCard className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 animate-fadeIn">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email or Username
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#00f3ff] transition-colors" />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@university.edu"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all outline-none"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#00f3ff] transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all outline-none"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !email || !password}
                            className="relative overflow-hidden w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-slate-900 font-bold hover:from-[#FFE55C] hover:to-[#FFB733] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[#050510] text-slate-500">New to Gold Students?</span>
                        </div>
                    </div>

                    {/* Join Link */}
                    <Link
                        href="/onboarding"
                        className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl border border-slate-700 text-white font-medium hover:border-[#00f3ff]/50 hover:bg-[#00f3ff]/5 hover:text-[#00f3ff] transition-all group"
                    >
                        <Sparkles className="w-5 h-5 text-[#FFD700]" />
                        Create Your Gold ID
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00f3ff] group-hover:translate-x-1 transition-all" />
                    </Link>
                </CyberCard>

                {/* Footer */}
                <p className="text-center text-xs text-slate-600 mt-6 relative z-10">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>

            {/* Shake Animation CSS */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-10px); }
                    40% { transform: translateX(10px); }
                    60% { transform: translateX(-10px); }
                    80% { transform: translateX(10px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
