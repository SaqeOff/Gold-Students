"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, Crown, LogIn, Radio, Zap } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { useSearch } from "@/context/SearchContext";
import GlobalSearchOverlay from "./GlobalSearchOverlay";

// =========================================
// CYBER NOTIFICATION NODE COMPONENT
// =========================================
const CyberNotificationNode = ({ onClick, hasNotification = true }: { onClick?: () => void; hasNotification?: boolean }) => {
    return (
        <motion.button
            onClick={onClick}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Angular Container */}
            <div
                className="relative p-2.5 bg-black/60 backdrop-blur-sm border border-cyan-500/30 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:bg-cyan-950/30"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)",
                }}
            >
                {/* Pulsing Border Glow */}
                <motion.div
                    className="absolute inset-0 border border-cyan-400/20"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)",
                    }}
                    animate={{
                        boxShadow: [
                            "0 0 5px rgba(0,243,255,0.1)",
                            "0 0 15px rgba(0,243,255,0.3)",
                            "0 0 5px rgba(0,243,255,0.1)",
                        ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Icon with Neon Glow */}
                <Radio
                    className="w-5 h-5 text-cyan-400 transition-all duration-300 group-hover:text-cyan-300"
                    style={{
                        filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))",
                    }}
                />

                {/* Active Plasma Indicator (Notification Dot) */}
                {hasNotification && (
                    <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.8, 1],
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    >
                        <div
                            className="w-full h-full rounded-full bg-red-500"
                            style={{
                                boxShadow: "0 0 10px rgba(239,68,68,1), 0 0 20px rgba(239,68,68,0.6)",
                            }}
                        />
                        {/* Inner core */}
                        <div className="absolute inset-[2px] rounded-full bg-red-400" />
                    </motion.div>
                )}

                {/* Corner Technical Accent */}
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-500/40" />
            </div>

            {/* Hover Glow Effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, rgba(0,243,255,0.15) 0%, transparent 70%)",
                }}
            />

            {/* Technical Label */}
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-cyan-500/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                NEURO-LINK
            </span>
        </motion.button>
    );
};

// =========================================
// CYBER SEARCH BAR COMPONENT
// =========================================
// =========================================
// CYBER SEARCH BAR COMPONENT
// =========================================
const CyberSearchBar = () => {
    const { searchQuery, setSearchQuery, openSearch } = useSearch();

    return (
        <div
            className="hidden sm:flex items-center gap-3 px-4 py-2.5 bg-black/40 backdrop-blur-sm border border-cyan-500/20 w-[280px] lg:w-[360px] transition-all focus-within:border-cyan-400/50 focus-within:bg-cyan-950/20"
            style={{
                clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
            }}
            onClick={openSearch} // Open on container click
        >
            <Search className="w-4 h-4 text-cyan-500/50 flex-shrink-0" />
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opportunities, members..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none font-mono cursor-pointer"
                readOnly // Make it read-only here so it forces using the overlay for typing, preventing "disappearing" focus issues
            />
            <kbd
                className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-950/50 text-[10px] text-cyan-500/60 font-mono border border-cyan-500/20"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                }}
            >
                ⌘K
            </kbd>
        </div>
    );
};

// =========================================
// GOLD LEVEL BADGE (ENHANCED)
// =========================================
const GoldLevelBadge = () => (
    <motion.div
        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30"
        style={{
            clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)",
            boxShadow: "0 0 20px rgba(245,158,11,0.2)",
        }}
        whileHover={{
            boxShadow: "0 0 30px rgba(245,158,11,0.4)",
        }}
    >
        <Crown
            className="w-4 h-4 text-amber-500"
            style={{ filter: "drop-shadow(0 0 4px rgba(245,158,11,0.8))" }}
        />
        <span className="text-sm font-mono font-semibold text-amber-500">
            GOLD_LVL
        </span>
        <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
    </motion.div>
);

// =========================================
// MAIN HEADER COMPONENT
// =========================================
export default function Header() {
    const { toggle } = useSidebar();

    const handleNotificationClick = () => {
        // Navigate to AI chat or open notification panel
        window.location.href = "/ai-chat";
    };

    return (
        <header
            className="sticky top-0 z-30 h-16 bg-black/80 backdrop-blur-xl border-b border-cyan-500/10"
            style={{
                boxShadow: "0 4px 30px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(0,243,255,0.1)",
            }}
        >
            {/* Scanline overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 243, 255, 0.1) 2px,
            rgba(0, 243, 255, 0.1) 4px
          )`,
                }}
            />

            <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4 relative z-10">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <motion.button
                        onClick={toggle}
                        className="lg:hidden p-2 border border-cyan-500/20 bg-black/40 transition-colors hover:border-cyan-400/50"
                        style={{
                            clipPath: "polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="w-5 h-5 text-cyan-400" />
                    </motion.button>

                    {/* Cyber Search Bar */}
                    <CyberSearchBar />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Log In Button */}
                    <Link
                        href="/login"
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-cyan-950/30 text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-all border border-cyan-500/20 hover:border-cyan-400/50"
                        style={{
                            clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                        }}
                    >
                        <LogIn className="w-4 h-4" />
                        ACCESS
                    </Link>

                    {/* Gold Level Badge */}
                    <GoldLevelBadge />

                    {/* Cyber Notification Node */}
                    <CyberNotificationNode
                        onClick={handleNotificationClick}
                        hasNotification={true}
                    />

                    {/* Profile Avatar */}
                    <motion.button
                        className="relative w-10 h-10 flex items-center justify-center border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-amber-600/20"
                        style={{
                            clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)",
                            boxShadow: "0 0 15px rgba(245,158,11,0.2)",
                        }}
                        whileHover={{
                            boxShadow: "0 0 25px rgba(245,158,11,0.4)",
                            scale: 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-sm font-bold font-mono text-amber-500">G</span>
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500/50" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-500/50" />
                    </motion.button>
                </div>
            </div>

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(0,243,255,0.3), rgba(245,158,11,0.3), transparent)",
                }}
                animate={{
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
            />
            <GlobalSearchOverlay />
        </header>
    );
}
