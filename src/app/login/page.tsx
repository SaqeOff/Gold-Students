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
        <div className="fixed inset-0 z-[100] min-h-screen flex items-center justify-center p-4 bg-[#020617]">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Login Card - Perfectly Centered with Shake Animation */}
            <div className={`relative w-full max-w-md z-10 ${shake ? "animate-shake" : ""}`}>
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 mb-4 shadow-lg shadow-amber-500/20">
                        <Crown className="w-8 h-8 text-slate-900" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-400">Sign in to Gold Students Club</p>
                </div>

                {/* Card */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
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
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@university.edu"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
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
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !email || !password}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl gold-gradient text-slate-900 font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed gold-glow"
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
                            <span className="px-4 bg-slate-900 text-slate-500">New to Gold Students?</span>
                        </div>
                    </div>

                    {/* Join Link */}
                    <Link
                        href="/onboarding"
                        className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl border border-slate-700 text-white font-medium hover:border-amber-500/50 hover:bg-slate-800/50 transition-all group"
                    >
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        Create Your Gold ID
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-600 mt-6">
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
