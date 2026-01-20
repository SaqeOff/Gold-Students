"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Filter,
    Search as SearchIcon,
    Radio,
    MapPin,
    Clock,
    Building2,
    ChevronRight,
    Zap,
    Shield,
    Target,
    X,
} from "lucide-react";
import { opportunities, currentUser } from "@/lib/mockData";
import { rankOpportunities, RankedOpportunity } from "@/lib/logic";
import { CyberLayout } from "@/components/cyber/CyberLayout";
import { CyberCard } from "@/components/cyber/CyberCard";
import { GlitchText } from "@/components/cyber/GlitchText";
import { COLORS } from "@/components/cyber/constants";

// =========================================
// TARGET RETICLE (Match Score)
// =========================================
const TargetReticle = ({ score }: { score: number }) => {
    const isHighMatch = score >= 90;
    const color = isHighMatch ? COLORS.matrixGreen : score >= 70 ? COLORS.cyberCyan : COLORS.highVoltageGold;

    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: isHighMatch ? 3 : 8, repeat: Infinity, ease: "linear" }}
            >
                <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
                <circle cx="50" cy="50" r="35" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
                {/* Reticle marks */}
                <line x1="50" y1="5" x2="50" y2="15" stroke={color} strokeWidth="2" />
                <line x1="50" y1="85" x2="50" y2="95" stroke={color} strokeWidth="2" />
                <line x1="5" y1="50" x2="15" y2="50" stroke={color} strokeWidth="2" />
                <line x1="85" y1="50" x2="95" y2="50" stroke={color} strokeWidth="2" />
            </motion.svg>
            <span className="text-lg font-mono font-bold" style={{ color }}>{score}%</span>
        </div>
    );
};

// =========================================
// OPPORTUNITY CARD (Cyber Style)
// =========================================
const OpportunityCard = ({
    opportunity,
    onViewDetails,
    onApply,
}: {
    opportunity: RankedOpportunity;
    onViewDetails: (id: string) => void;
    onApply?: (opp: RankedOpportunity) => void;
}) => {
    const [isApplying, setIsApplying] = useState(false);
    const matchScore = opportunity.matchResult?.score || 75;
    const isVerified = opportunity.isVerified;

    const typeLabels: Record<string, string> = {
        internship: "INTERNSHIP",
        scholarship: "SCHOLARSHIP",
        fellowship: "FELLOWSHIP",
        competition: "COMPETITION",
        grant: "GRANT",
    };

    return (
        <div onClick={() => onViewDetails(opportunity.id)}>
            <CyberCard hoverEffect={true} className="cursor-pointer group h-full flex flex-col justify-between">
                <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            {/* Type Badge */}
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className="text-[9px] font-mono tracking-widest px-2 py-0.5 border rounded-sm"
                                    style={{
                                        borderColor: `${COLORS.cyberCyan}50`,
                                        color: COLORS.cyberCyan,
                                        backgroundColor: `${COLORS.cyberCyan}10`,
                                    }}
                                >
                                    {typeLabels[opportunity.type] || opportunity.type.toUpperCase()}
                                </span>
                                {isVerified && (
                                    <span
                                        className="text-[9px] font-mono tracking-widest px-2 py-0.5 border rounded-sm flex items-center gap-1"
                                        style={{
                                            borderColor: `${COLORS.highVoltageGold}50`,
                                            color: COLORS.highVoltageGold,
                                            backgroundColor: `${COLORS.highVoltageGold}10`,
                                        }}
                                    >
                                        <Shield className="w-3 h-3" /> VERIFIED
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-[#00f3ff] transition-colors">
                                {opportunity.title}
                            </h3>

                            {/* Company */}
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Building2 className="w-4 h-4" />
                                <span>{opportunity.source_partner}</span>
                            </div>
                        </div>

                        {/* Match Score Reticle */}
                        <TargetReticle score={matchScore} />
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{opportunity.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                                {opportunity.deadline.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {opportunity.requirements?.slice(0, 3).map((req, i) => (
                            <span
                                key={i}
                                className="text-[10px] font-mono px-2 py-0.5 border border-white/10 text-slate-400 bg-white/5 rounded-sm"
                            >
                                {req}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs text-slate-500 font-mono">
                        ID: {opportunity.id.slice(0, 8).toUpperCase()}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onApply) {
                                setIsApplying(true);
                                setTimeout(() => {
                                    onApply(opportunity);
                                    setIsApplying(false);
                                }, 500);
                            }
                        }}
                        className="flex items-center gap-2 text-sm font-bold hover:brightness-125 transition-all uppercase tracking-wider"
                        style={{ color: COLORS.matrixGreen }}
                    >
                        {isApplying ? <Zap className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                        {isApplying ? "APPLYING..." : "QUICK APPLY"}
                    </button>
                    {/* Access Link */}
                    <div
                        className="flex items-center gap-1 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: COLORS.cyberCyan }}
                    >
                        ACCESS <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </CyberCard>
        </div>
    );
};

// =========================================
// FILTER PANEL
// =========================================
interface FilterState {
    search: string;
    types: string[];
    verifiedOnly: boolean;
    sortBy: string;
}

const FilterPanel = ({
    filters,
    onFilterChange,
    isOpen,
    onClose,
    resultCount,
}: {
    filters: FilterState;
    onFilterChange: (f: FilterState) => void;
    isOpen: boolean;
    onClose: () => void;
    resultCount: number;
}) => {
    const types = ["internship", "scholarship", "fellowship", "competition", "grant"];
    const sortOptions = [
        { value: "smart", label: "AI RANKED" },
        { value: "deadline", label: "DEADLINE" },
        { value: "newest", label: "NEWEST" },
    ];

    const ToggleSwitch = ({
        checked,
        onChange,
        label,
    }: {
        checked: boolean;
        onChange: (v: boolean) => void;
        label: string;
    }) => (
        <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{label}</span>
            <div
                className={`relative w-10 h-5 rounded-full border transition-all ${checked ? 'border-[#00f3ff] bg-[#00f3ff]/20' : 'border-white/20 bg-white/5'}`}
                onClick={() => onChange(!checked)}
            >
                <div
                    className={`absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all ${checked ? 'left-[22px] bg-[#00f3ff]' : 'left-0.5 bg-slate-500'}`}
                />
            </div>
        </label>
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:sticky top-0 left-0 h-screen w-72 z-50 lg:z-auto
          border-r border-[#00f3ff]/20 bg-[#020617]/95 backdrop-blur-xl
          flex flex-col transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                {/* Panel Header */}
                <div className="p-4 border-b border-[#00f3ff]/20">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-green-400 tracking-widest">LIVE FEED</span>
                        </div>
                        <button onClick={onClose} className="lg:hidden p-1 text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Technical markings */}
                    <div className="flex items-center justify-between text-[8px] font-mono text-[#00f3ff]/50 mb-2">
                        <span>SYS:FILTER_v3.0</span>
                        <span>NODE:ACTIVE</span>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-[#00f3ff]/10">
                    <div className="relative group">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#00f3ff] transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH SIGNAL..."
                            value={filters.search}
                            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#00f3ff]/50 focus:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                    {/* Type Filters */}
                    <div>
                        <h4 className="text-[10px] font-mono text-[#00f3ff] uppercase tracking-widest mb-3 font-bold">
                            SIGNAL TYPE
                        </h4>
                        <div className="space-y-2">
                            {types.map((type) => (
                                <ToggleSwitch
                                    key={type}
                                    label={type.toUpperCase()}
                                    checked={filters.types.includes(type)}
                                    onChange={(checked) => {
                                        const newTypes = checked
                                            ? [...filters.types, type]
                                            : filters.types.filter((t) => t !== type);
                                        onFilterChange({ ...filters, types: newTypes });
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Verified Toggle */}
                    <div>
                        <h4 className="text-[10px] font-mono text-[#00f3ff] uppercase tracking-widest mb-3 font-bold">
                            VERIFICATION
                        </h4>
                        <ToggleSwitch
                            label="VERIFIED ONLY"
                            checked={filters.verifiedOnly}
                            onChange={(v) => onFilterChange({ ...filters, verifiedOnly: v })}
                        />
                    </div>

                    {/* Sort */}
                    <div>
                        <h4 className="text-[10px] font-mono text-[#00f3ff] uppercase tracking-widest mb-3 font-bold">
                            SORT FREQUENCY
                        </h4>
                        <div className="space-y-1">
                            {sortOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => onFilterChange({ ...filters, sortBy: opt.value })}
                                    className={`w-full text-left px-3 py-2 text-sm font-mono transition-all border-l-2 ${filters.sortBy === opt.value
                                        ? "bg-[#00f3ff]/10 text-[#00f3ff] border-[#00f3ff]"
                                        : "text-slate-400 hover:bg-white/5 border-transparent"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-[#00f3ff]/20 bg-[#00f3ff]/5">
                    <div className="text-center">
                        <span className="text-3xl font-mono font-bold text-[#00f3ff] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                            {resultCount}
                        </span>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">SIGNALS DETECTED</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

// =========================================
// MAIN PAGE COMPONENT
// =========================================
export default function OpportunitiesPage() {
    const router = useRouter();

    const [filters, setFilters] = useState<FilterState>({
        search: "",
        types: [],
        verifiedOnly: false,
        sortBy: "smart",
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [rankedOpportunities, setRankedOpportunities] = useState<RankedOpportunity[]>([]);

    useEffect(() => {
        let ranked = rankOpportunities(currentUser, opportunities, {
            type: (filters.types.length === 1 ? filters.types[0] : undefined) as any,
            verifiedOnly: filters.verifiedOnly,
        });

        if (filters.types.length > 1) {
            ranked = ranked.filter((opp) => filters.types.includes(opp.type));
        }

        if (filters.search.trim()) {
            const searchLower = filters.search.toLowerCase();
            ranked = ranked.filter(
                (opp) =>
                    opp.title.toLowerCase().includes(searchLower) ||
                    opp.description.toLowerCase().includes(searchLower) ||
                    opp.source_partner.toLowerCase().includes(searchLower) ||
                    opp.location.toLowerCase().includes(searchLower)
            );
        }

        if (filters.sortBy === "deadline") {
            ranked = [...ranked].sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
        } else if (filters.sortBy === "newest") {
            ranked = [...ranked].sort((a, b) => b.posted_at.getTime() - a.posted_at.getTime());
        }

        setRankedOpportunities(ranked);
    }, [filters]);

    // Active Applications State (Persisted in session practically)
    const [activeApps, setActiveApps] = useState<RankedOpportunity[]>([]);

    // Seed Random 7 Active Applications on Mount
    useEffect(() => {
        const shuffled = [...opportunities].sort(() => 0.5 - Math.random());
        // Mock ranked items for seeded data
        const seeded = shuffled.slice(0, 7).map(opp => ({ ...opp, matchResult: { score: Math.floor(70 + Math.random() * 25), confidence: "High" } as any }));
        setActiveApps(seeded);
    }, []);

    const handleApply = (opp: RankedOpportunity) => {
        // Prevent duplicates
        if (!activeApps.find(a => a.id === opp.id)) {
            setActiveApps(prev => [opp, ...prev]);
        }
    };

    const handleViewDetails = (id: string) => {
        router.push(`/opportunities/${id}`);
    };

    const stats = useMemo(() => {
        const total = rankedOpportunities.length;
        const verified = rankedOpportunities.filter((o) => o.isVerified).length;
        const avgScore = total
            ? Math.round(rankedOpportunities.reduce((sum, o) => sum + (o.matchResult?.score || 0), 0) / total)
            : 0;
        return { total, verified, avgScore };
    }, [rankedOpportunities]);

    return (
        <CyberLayout>
            <div className="flex min-h-[calc(100vh-100px)]">
                {/* Filter Sidebar */}
                <FilterPanel
                    filters={filters}
                    onFilterChange={setFilters}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    resultCount={rankedOpportunities.length}
                />

                {/* Main Content */}
                <div className="flex-1 w-full pl-0 lg:pl-6">
                    {/* Header */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#00f3ff]/20 bg-slate-900/50 backdrop-blur-sm rounded-2xl mb-6">
                        <div>
                            <div className="flex items-center gap-3">
                                <Target className="w-8 h-8 text-[#00f3ff]" />
                                <GlitchText text="MISSION SELECT" className="text-2xl md:text-3xl font-bold text-white" />
                            </div>
                            <p className="text-slate-500 mt-1 font-mono text-sm tracking-wide">
                                [AI_RANKED_OPPORTUNITIES :: PROFILE_MATCHED]
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-8 bg-black/20 p-4 rounded-xl border border-white/5">
                            {[
                                { value: stats.total, label: "TARGETS", color: COLORS.cyberCyan },
                                { value: stats.verified, label: "VERIFIED", color: COLORS.highVoltageGold },
                                { value: `${stats.avgScore}%`, label: "AVG MATCH", color: COLORS.matrixGreen },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-2xl font-mono font-bold" style={{ color: stat.color }}>
                                        {stat.value}
                                    </div>
                                    <div className="text-[9px] font-mono text-slate-500 tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Filter */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 border font-mono text-sm font-bold rounded-lg"
                            style={{
                                borderColor: `${COLORS.cyberCyan}50`,
                                color: COLORS.cyberCyan,
                                backgroundColor: `${COLORS.cyberCyan}10`,
                            }}
                        >
                            <Radio className="w-4 h-4" />
                            TUNE FILTER
                        </button>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20 mt-6">
                        {rankedOpportunities.map((opp) => (
                            <OpportunityCard
                                key={opp.id}
                                opportunity={opp}
                                onViewDetails={handleViewDetails}
                                onApply={handleApply}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {rankedOpportunities.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-center border items-center p-8 rounded-2xl border-white/10 bg-white/5">
                            <Target className="w-16 h-16 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-400">No Signals Detected</h3>
                            <p className="text-slate-500 max-w-md mt-2">
                                Adjust your frequency filter or broaden your search parameters.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </CyberLayout>
    );
}
