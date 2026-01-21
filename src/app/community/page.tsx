"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
    Users,
    Sparkles,
    Search,
    UserPlus,
    Hash,
} from "lucide-react";
import { User } from "@/types";
import { currentUser, mockUsers, interestGroups } from "@/lib/mockData";
import { calculatePeerMatch, PeerMatchResult } from "@/lib/logic";
import PeerCard from "@/components/community/PeerCard";
import GroupCard from "@/components/community/GroupCard";
import { useGroups } from "@/context/GroupsContext";
import { CyberLayout } from "@/components/cyber/CyberLayout";
import { GlitchText } from "@/components/cyber/GlitchText";
import { CyberCard } from "@/components/cyber/CyberCard";
import { COLORS } from "@/components/cyber/constants";

// =========================================
// TYPES
// =========================================

type TabType = "peers" | "groups";

interface RankedPeer {
    user: User;
    match: PeerMatchResult;
}

// =========================================
// INNER COMPONENT (uses useSearchParams)
// =========================================

function CommunityPageContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<TabType>("peers");
    const [searchQuery, setSearchQuery] = useState("");

    // Handle tab query parameter (e.g., /community?tab=squad redirects from My Squad)
    useEffect(() => {
        const tabParam = searchParams.get("tab");
        // "squad" param means user clicked My Squad - show peers (squad building)
        if (tabParam === "squad" || tabParam === "peers") {
            setActiveTab("peers");
        } else if (tabParam === "groups") {
            setActiveTab("groups");
        }
    }, [searchParams]);

    // Calculate peer matches and sort by score (highest first)
    const rankedPeers = useMemo<RankedPeer[]>(() => {
        return mockUsers
            .map((peer) => ({
                user: peer,
                match: calculatePeerMatch(currentUser, peer),
            }))
            .sort((a, b) => b.match.score - a.match.score);
    }, []);

    // Filter peers by search
    const filteredPeers = useMemo(() => {
        if (!searchQuery.trim()) return rankedPeers;
        const query = searchQuery.toLowerCase();
        return rankedPeers.filter(
            (p) =>
                p.user.name.toLowerCase().includes(query) ||
                p.user.university.toLowerCase().includes(query) ||
                p.user.skills.some((s) => s.toLowerCase().includes(query))
        );
    }, [rankedPeers, searchQuery]);

    // Filter groups by search
    const filteredGroups = useMemo(() => {
        if (!searchQuery.trim()) return interestGroups;
        const query = searchQuery.toLowerCase();
        return interestGroups.filter(
            (g) =>
                g.name.toLowerCase().includes(query) ||
                g.description.toLowerCase().includes(query) ||
                g.category.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const { joinGroup, isMember } = useGroups();

    const handleConnect = (userId: string) => {
        console.log("Connect with:", userId);
        alert(`Connection request sent to ${userId}!`);
    };

    const handleJoinGroup = (groupId: string) => {
        const group = interestGroups.find(g => g.id === groupId);
        if (group) {
            joinGroup(group);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <CyberCard className="p-6 md:p-8 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                            <Users className="w-8 h-8 text-[#FFD700]" />
                            <GlitchText>Build Your Squad</GlitchText>
                        </h1>
                        <p className="text-slate-400 mt-1">
                            Find peers with complementary skills and shared goals
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6">
                        <div className="text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="text-2xl font-bold text-white">
                                {mockUsers.length}
                            </div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Peers</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="text-2xl font-bold text-[#FFD700] shadow-[#FFD700]/20 drop-shadow-sm">
                                {interestGroups.length}
                            </div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Groups</div>
                        </div>
                    </div>
                </div>
            </CyberCard>

            {/* Tabs & Search */}
            <div className="px-1 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
                    <button
                        onClick={() => setActiveTab("peers")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${activeTab === "peers"
                            ? "bg-[#FFD700] text-slate-900 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <UserPlus className="w-4 h-4" />
                        Find Peers
                    </button>
                    <button
                        onClick={() => setActiveTab("groups")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${activeTab === "groups"
                            ? "bg-[#00f3ff] text-slate-900 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <Hash className="w-4 h-4" />
                        Interest Groups
                    </button>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#00f3ff] transition-colors" />
                    <input
                        type="text"
                        placeholder={
                            activeTab === "peers" ? "Search peers..." : "Search groups..."
                        }
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all"
                    />
                </div>
            </div>

            {/* Content */}
            <main className="">
                {activeTab === "peers" ? (
                    <>
                        {filteredPeers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredPeers.map(({ user, match }) => (
                                    <PeerCard
                                        key={user.id}
                                        user={user}
                                        matchResult={match}
                                        onConnect={handleConnect}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 relative">
                                    <Users className="w-10 h-10 text-slate-600" />
                                    <div className="absolute inset-0 rounded-full animate-ping bg-slate-700/20" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No peers found
                                </h3>
                                <p className="text-slate-400 max-w-md">
                                    {searchQuery
                                        ? "Try adjusting your search query"
                                        : "We couldn't find any peers matching your profile yet. Check back soon!"}
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {filteredGroups.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredGroups.map((group) => (
                                    <GroupCard
                                        key={group.id}
                                        {...group}
                                        isJoined={isMember(group.id)}
                                        onJoin={handleJoinGroup}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 relative">
                                    <Hash className="w-10 h-10 text-slate-600" />
                                    <div className="absolute inset-0 rounded-full animate-ping bg-slate-700/20" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No groups found
                                </h3>
                                <p className="text-slate-400 max-w-md">
                                    Try adjusting your search query to find interest groups
                                </p>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* AI Matching Info */}
            {activeTab === "peers" && (
                <div className="mt-8">
                    <CyberCard className="p-4 flex items-start gap-4 border-[#FFD700]/20" glowColor={COLORS.highVoltageGold}>
                        <Sparkles className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-white flex items-center gap-2">
                                AI-Powered Matching
                                <span className="text-[10px] bg-[#FFD700]/10 text-[#FFD700] px-2 py-0.5 rounded border border-[#FFD700]/20">BETA</span>
                            </h4>
                            <p className="text-sm text-slate-400 mt-1">
                                Peers are ranked using Jaccard Similarity on skills (50pts) +
                                Goal Overlap (30pts) + Context Match (20pts). Higher scores mean
                                stronger collaboration potential.
                            </p>
                        </div>
                    </CyberCard>
                </div>
            )}
        </>
    );
}

// =========================================
// LOADING FALLBACK
// =========================================

function CommunityLoadingFallback() {
    return (
        <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-800/50 rounded-xl"></div>
            <div className="h-12 bg-slate-800/50 rounded-xl w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-48 bg-slate-800/50 rounded-xl"></div>
                ))}
            </div>
        </div>
    );
}

// =========================================
// MAIN PAGE COMPONENT (with Suspense)
// =========================================

export default function CommunityPage() {
    return (
        <CyberLayout>
            <Suspense fallback={<CommunityLoadingFallback />}>
                <CommunityPageContent />
            </Suspense>
        </CyberLayout>
    );
}
