"use client";

import React, { useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, X, Briefcase, Users, Hash, ChevronRight, ArrowRight, Zap } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { opportunities, mockUsers, interestGroups } from "@/lib/mockData";
import Link from "next/link";

// =========================================
// TYPES
// =========================================
type SearchCategory = "all" | "opportunities" | "peers" | "groups";

export default function GlobalSearchOverlay() {
    const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearch();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when opened
    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeSearch();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeSearch]);

    // FILTER RESULTS
    const results = useMemo(() => {
        if (!searchQuery.trim()) return { opportunities: [], peers: [], groups: [] };

        const query = searchQuery.toLowerCase();

        const filteredOpportunities = opportunities.filter(
            (o) =>
                o.title.toLowerCase().includes(query) ||
                o.description.toLowerCase().includes(query) ||
                o.source_partner.toLowerCase().includes(query)
        ).slice(0, 5);

        const filteredPeers = mockUsers.filter(
            (u) =>
                u.name.toLowerCase().includes(query) ||
                u.university.toLowerCase().includes(query) ||
                u.skills.some((s) => s.toLowerCase().includes(query))
        ).slice(0, 5);

        const filteredGroups = interestGroups.filter(
            (g) =>
                g.name.toLowerCase().includes(query) ||
                g.description.toLowerCase().includes(query) ||
                g.category.toLowerCase().includes(query)
        ).slice(0, 5);

        return {
            opportunities: filteredOpportunities,
            peers: filteredPeers,
            groups: filteredGroups,
        };
    }, [searchQuery]);

    const hasResults =
        results.opportunities.length > 0 ||
        results.peers.length > 0 ||
        results.groups.length > 0;

    const handleNavigate = (path: string) => {
        closeSearch();
        router.push(path);
    };

    return (
        <AnimatePresence>
            {isSearchOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) closeSearch();
                        }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Search Container */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-4xl mx-auto mt-4 md:mt-20 flex flex-col max-h-[90vh] md:max-h-[80vh] overflow-hidden rounded-xl border border-cyan-500/20 bg-[#050508] shadow-[0_0_50px_rgba(0,243,255,0.15)]"
                    >
                        {/* Header / Input Area */}
                        <div className="flex items-center gap-4 p-4 border-b border-white/10 bg-white/5">
                            <Search className="w-5 h-5 text-cyan-500" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search opportunities, peers, groups..."
                                className="flex-1 bg-transparent text-lg text-white placeholder-slate-500 outline-none font-mono"
                            />
                            <button
                                onClick={closeSearch}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <span className="sr-only">Close</span>
                                <kbd className="hidden md:inline-block px-2 py-1 text-xs font-mono text-slate-500 bg-black/50 border border-white/10 rounded mr-2">
                                    ESC
                                </kbd>
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Results Area */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            {!searchQuery.trim() ? (
                                /* Empty State / Suggested */
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                                    <Zap className="w-12 h-12 text-cyan-500/50 mb-4" />
                                    <p className="text-slate-400 font-mono text-sm">
                                        Type to search across the entire network
                                    </p>
                                </div>
                            ) : !hasResults ? (
                                /* No Results */
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                                        <Search className="w-8 h-8 text-red-500/50" />
                                    </div>
                                    <h3 className="text-white font-mono mb-1">No signals detected</h3>
                                    <p className="text-slate-500 text-sm">
                                        Try adjusting your search criteria
                                    </p>
                                </div>
                            ) : (
                                /* Results Grid */
                                <div className="space-y-8">
                                    {/* Opportunities */}
                                    {results.opportunities.length > 0 && (
                                        <section>
                                            <h3 className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 px-2">
                                                <Briefcase className="w-4 h-4" />
                                                Opportunities ({results.opportunities.length})
                                            </h3>
                                            <div className="grid gap-2">
                                                {results.opportunities.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleNavigate(`/opportunities/${item.id}`)}
                                                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-cyan-500/30 transition-all group text-left w-full"
                                                    >
                                                        <div className="mt-1 w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 text-xs font-bold font-mono">
                                                            OPP
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                                                                    {item.title}
                                                                </h4>
                                                                {item.isVerified && (
                                                                    <span className="text-[10px] bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/30 font-mono">
                                                                        VERIFIED
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-slate-400 mt-0.5">
                                                                {item.source_partner} • {item.location}
                                                            </p>
                                                        </div>
                                                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                                                    </button>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Peers */}
                                    {results.peers.length > 0 && (
                                        <section>
                                            <h3 className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-3 px-2">
                                                <Users className="w-4 h-4" />
                                                Peers ({results.peers.length})
                                            </h3>
                                            <div className="grid gap-2">
                                                {results.peers.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleNavigate(`/profile/${item.id}`)}
                                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-purple-500/30 transition-all group text-left w-full"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400 font-bold">
                                                            {item.name.charAt(0)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-sm text-slate-400">
                                                                {item.university} • {item.goals[0]}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            {item.skills.slice(0, 2).map((skill, i) => (
                                                                <span key={i} className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-slate-400 border border-white/5">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Groups */}
                                    {results.groups.length > 0 && (
                                        <section>
                                            <h3 className="flex items-center gap-2 text-xs font-mono text-green-400 uppercase tracking-widest mb-3 px-2">
                                                <Hash className="w-4 h-4" />
                                                Groups ({results.groups.length})
                                            </h3>
                                            <div className="grid gap-2">
                                                {results.groups.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleNavigate(`/community?tab=groups`)}
                                                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-green-500/30 transition-all group text-left w-full"
                                                    >
                                                        <div className="text-2xl w-10 h-10 flex items-center justify-center bg-green-500/10 rounded-lg border border-green-500/20">
                                                            {item.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-white font-medium group-hover:text-green-400 transition-colors">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-sm text-slate-400 line-clamp-1">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <span className="text-xs text-slate-500 font-mono self-center">
                                                            {item.memberCount} members
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-white/10 bg-white/5 flex justify-between text-[10px] text-slate-500 font-mono uppercase">
                            <span>Global Search v1.0</span>
                            <div className="flex gap-4">
                                <span>Specific command: @user, #group</span>
                                <span>Enter to select</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
