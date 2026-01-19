"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    Users,
    Sparkles,
    Search,
    UserPlus,
    Hash,
    Zap,
    Brain,
    Globe,
    Rocket,
    BookOpen,
} from "lucide-react";
import { User, UserGoal, ExperienceLevel, TrustLevel } from "@/types";
import { currentUser } from "@/lib/mockData";
import { calculatePeerMatch, PeerMatchResult } from "@/lib/logic";
import PeerCard from "@/components/community/PeerCard";
import GroupCard from "@/components/community/GroupCard";
import { useGroups } from "@/context/GroupsContext";
import { useRouter } from "next/navigation";

// =========================================
// DUMMY USERS FOR DEMONSTRATION
// Diverse profiles to show Jaccard matching
// =========================================

const dummyPeers: User[] = [
    {
        id: "peer_001",
        name: "Sarah Johnson",
        email: "sarah@mit.edu",
        avatar: undefined,
        university: "MIT",
        country: "United States",
        skills: ["Python", "Machine Learning", "Data Analysis", "TensorFlow", "Statistics"],
        interests: ["AI Research", "Startups", "Climate Tech"],
        goals: [UserGoal.Research, UserGoal.Startup],
        xp_level: ExperienceLevel.Expert,
        trust_level: TrustLevel.Gold,
        xp_points: 2800,
        trust_score: 92,
        profile_completeness: 95,
        badges: [],
        joined_at: new Date("2025-09-01"),
        last_active: new Date(),
    },
    {
        id: "peer_002",
        name: "Raj Patel",
        email: "raj@stanford.edu",
        avatar: undefined,
        university: "Stanford",
        country: "United States",
        skills: ["Python", "Deep Learning", "Computer Vision", "PyTorch", "Research"],
        interests: ["AI Safety", "Autonomous Systems"],
        goals: [UserGoal.Research],
        xp_level: ExperienceLevel.Expert,
        trust_level: TrustLevel.Gold,
        xp_points: 3200,
        trust_score: 95,
        profile_completeness: 100,
        badges: [],
        joined_at: new Date("2025-06-15"),
        last_active: new Date(),
    },
    {
        id: "peer_003",
        name: "Elena Schmidt",
        email: "elena@tu-munich.de",
        avatar: undefined,
        university: "TU Munich",
        country: "Germany",
        skills: ["JavaScript", "React", "Node.js", "TypeScript", "UI/UX"],
        interests: ["Web Development", "EdTech", "Design"],
        goals: [UserGoal.Startup, UserGoal.Internship],
        xp_level: ExperienceLevel.Intermediate,
        trust_level: TrustLevel.Silver,
        xp_points: 1500,
        trust_score: 78,
        profile_completeness: 85,
        badges: [],
        joined_at: new Date("2025-10-01"),
        last_active: new Date(),
    },
    {
        id: "peer_004",
        name: "Yuki Tanaka",
        email: "yuki@tokyo-u.ac.jp",
        avatar: undefined,
        university: "University of Tokyo",
        country: "Japan",
        skills: ["Python", "NLP", "Machine Learning", "Japanese", "Research"],
        interests: ["Language AI", "Cultural Analytics"],
        goals: [UserGoal.Research],
        xp_level: ExperienceLevel.Intermediate,
        trust_level: TrustLevel.Silver,
        xp_points: 1800,
        trust_score: 82,
        profile_completeness: 90,
        badges: [],
        joined_at: new Date("2025-08-20"),
        last_active: new Date(),
    },
    {
        id: "peer_005",
        name: "Marcus Williams",
        email: "marcus@oxford.ac.uk",
        avatar: undefined,
        university: "Oxford",
        country: "United Kingdom",
        skills: ["Data Science", "Statistics", "R", "Python", "Economics"],
        interests: ["FinTech", "Quantitative Finance"],
        goals: [UserGoal.Internship],
        xp_level: ExperienceLevel.Expert,
        trust_level: TrustLevel.Gold,
        xp_points: 2500,
        trust_score: 88,
        profile_completeness: 92,
        badges: [],
        joined_at: new Date("2025-07-10"),
        last_active: new Date(),
    },
];

// =========================================
// INTEREST GROUPS DATA
// =========================================

const interestGroups = [
    {
        id: "grp_001",
        name: "AI Research Network",
        description:
            "Connect with fellow researchers working on cutting-edge AI projects. Share papers, discuss breakthroughs, and find collaborators.",
        memberCount: 1247,
        icon: "🤖",
        category: "Research",
    },
    {
        id: "grp_002",
        name: "Startup Founders Circle",
        description:
            "A community for student entrepreneurs. Get feedback on ideas, find co-founders, and learn from those who've built before.",
        memberCount: 856,
        icon: "🚀",
        category: "Entrepreneurship",
    },
    {
        id: "grp_003",
        name: "Housing Hackers",
        description:
            "Find roommates, share housing tips, and navigate the international student housing market together.",
        memberCount: 2103,
        icon: "🏠",
        category: "Lifestyle",
    },
    {
        id: "grp_004",
        name: "Grant Writers Guild",
        description:
            "Master the art of grant writing. Share successful proposals, get peer reviews, and discover new funding opportunities.",
        memberCount: 634,
        icon: "📝",
        category: "Funding",
    },
    {
        id: "grp_005",
        name: "Climate Tech Collective",
        description:
            "Students passionate about using technology to combat climate change. Projects, discussions, and job opportunities.",
        memberCount: 1089,
        icon: "🌍",
        category: "Impact",
    },
    {
        id: "grp_006",
        name: "Machine Learning Study Group",
        description:
            "Weekly paper readings, coding sessions, and ML competitions. All skill levels welcome.",
        memberCount: 1567,
        icon: "🧠",
        category: "Learning",
    },
];

// =========================================
// TYPES
// =========================================

type TabType = "peers" | "groups";

interface RankedPeer {
    user: User;
    match: PeerMatchResult;
}

// =========================================
// MAIN COMPONENT
// =========================================

export default function CommunityPage() {
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
        return dummyPeers
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
    const router = useRouter();

    const handleConnect = (userId: string) => {
        console.log("Connect with:", userId);
        alert(`Connection request sent to ${userId}!`);
    };

    const handleJoinGroup = (groupId: string) => {
        const group = interestGroups.find(g => g.id === groupId);
        if (group) {
            joinGroup(group);
            // Optional: Redirect to group chat immediately
            // router.push("/groups");
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <header className="p-6 md:p-8 border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                            <Users className="w-8 h-8 text-amber-500" />
                            Build Your Squad
                        </h1>
                        <p className="text-slate-400 mt-1">
                            Find peers with complementary skills and shared goals
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                                {dummyPeers.length}
                            </div>
                            <div className="text-xs text-slate-400 uppercase">Peers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-amber-400">
                                {interestGroups.length}
                            </div>
                            <div className="text-xs text-slate-400 uppercase">Groups</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tabs & Search */}
            <div className="px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-800/50">
                    <button
                        onClick={() => setActiveTab("peers")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "peers"
                            ? "bg-amber-500 text-slate-900"
                            : "text-slate-400 hover:text-white"
                            }`}
                    >
                        <UserPlus className="w-4 h-4" />
                        Find Peers
                    </button>
                    <button
                        onClick={() => setActiveTab("groups")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "groups"
                            ? "bg-amber-500 text-slate-900"
                            : "text-slate-400 hover:text-white"
                            }`}
                    >
                        <Hash className="w-4 h-4" />
                        Interest Groups
                    </button>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder={
                            activeTab === "peers" ? "Search peers..." : "Search groups..."
                        }
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                </div>
            </div>

            {/* Content */}
            <main className="px-6 md:px-8 py-6">
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
                                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                                    <Users className="w-10 h-10 text-slate-600" />
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
                                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                                    <Hash className="w-10 h-10 text-slate-600" />
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
                <div className="px-6 md:px-8 pb-8">
                    <div className="glass-card rounded-xl p-4 border border-amber-500/20 flex items-start gap-4">
                        <Sparkles className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-white">AI-Powered Matching</h4>
                            <p className="text-sm text-slate-400 mt-1">
                                Peers are ranked using Jaccard Similarity on skills (50pts) +
                                Goal Overlap (30pts) + Context Match (20pts). Higher scores mean
                                stronger collaboration potential.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
