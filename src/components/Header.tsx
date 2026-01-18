"use client";

import { Search, Bell, Menu, Crown } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export default function Header() {
    const { toggle } = useSidebar();

    return (
        <header className="sticky top-0 z-30 h-16 glass border-b border-slate-800/50">
            <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggle}
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="w-5 h-5 text-slate-400" />
                    </button>

                    {/* Search Bar */}
                    <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 w-[280px] lg:w-[360px] transition-all focus-within:border-amber-500/50 focus-within:bg-slate-800">
                        <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search opportunities, members..."
                            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                        />
                        <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-700/50 text-[10px] text-slate-500 font-medium">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {/* Gold Level Badge - CRITICAL FEATURE */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 gold-glow">
                        <Crown className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-semibold text-amber-500">
                            🏆 Gold Level
                        </span>
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2.5 rounded-xl hover:bg-slate-800/50 transition-colors group">
                        <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-slate-900" />
                    </button>

                    {/* Profile Avatar */}
                    <button className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center ring-2 ring-slate-800 hover:ring-amber-500/50 transition-all">
                        <span className="text-sm font-bold text-slate-900">G</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
