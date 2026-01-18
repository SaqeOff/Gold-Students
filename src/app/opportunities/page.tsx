"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Filter, Sparkles, Search as SearchIcon } from "lucide-react";
import { opportunities, currentUser } from "@/lib/mockData";
import { rankOpportunities, RankedOpportunity } from "@/lib/logic";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import FilterSidebar, {
    FilterState,
    SortOption,
} from "@/components/opportunities/FilterSidebar";

export default function OpportunitiesPage() {
    const router = useRouter();

    // Filter state
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        types: [],
        verifiedOnly: false,
        sortBy: "smart",
    });

    // Sidebar visibility (mobile)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filtered and ranked opportunities
    const [rankedOpportunities, setRankedOpportunities] = useState<
        RankedOpportunity[]
    >([]);

    // Calculate ranked opportunities when filters change
    useEffect(() => {
        // Get all opportunities ranked by AI score
        let ranked = rankOpportunities(currentUser, opportunities, {
            type: filters.types.length === 1 ? filters.types[0] : undefined,
            verifiedOnly: filters.verifiedOnly,
        });

        // Filter by multiple types if more than one selected
        if (filters.types.length > 1) {
            ranked = ranked.filter((opp) => filters.types.includes(opp.type));
        }

        // Search filter
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

        // Apply sorting
        if (filters.sortBy === "deadline") {
            ranked = [...ranked].sort(
                (a, b) => a.deadline.getTime() - b.deadline.getTime()
            );
        } else if (filters.sortBy === "newest") {
            ranked = [...ranked].sort(
                (a, b) => b.posted_at.getTime() - a.posted_at.getTime()
            );
        }
        // "smart" is the default from rankOpportunities (verified + score + deadline)

        setRankedOpportunities(ranked);
    }, [filters]);

    // Handler for viewing opportunity details
    const handleViewDetails = (id: string) => {
        router.push(`/opportunities/${id}`);
    };

    // Stats for header
    const stats = useMemo(() => {
        const total = rankedOpportunities.length;
        const verified = rankedOpportunities.filter((o) => o.isVerified).length;
        const avgScore = total
            ? Math.round(
                rankedOpportunities.reduce((sum, o) => sum + o.matchResult.score, 0) /
                total
            )
            : 0;
        return { total, verified, avgScore };
    }, [rankedOpportunities]);

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <header className="p-6 md:p-8 border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                            <Sparkles className="w-8 h-8 text-amber-500" />
                            Explore Opportunities
                        </h1>
                        <p className="text-slate-400 mt-1">
                            AI-ranked matches based on your profile
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{stats.total}</div>
                            <div className="text-xs text-slate-400 uppercase">Matches</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-amber-400">
                                {stats.verified}
                            </div>
                            <div className="text-xs text-slate-400 uppercase">Verified</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">
                                {stats.avgScore}%
                            </div>
                            <div className="text-xs text-slate-400 uppercase">Avg Score</div>
                        </div>
                    </div>

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white border border-white/10"
                    >
                        <Filter className="w-5 h-5" />
                        Filters
                        {(filters.types.length > 0 || filters.verifiedOnly) && (
                            <span className="w-5 h-5 rounded-full bg-amber-500 text-xs flex items-center justify-center text-slate-900">
                                {filters.types.length + (filters.verifiedOnly ? 1 : 0)}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex">
                {/* Filter Sidebar */}
                <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    resultCount={rankedOpportunities.length}
                />

                {/* Opportunities Grid */}
                <main className="flex-1 p-6 md:p-8">
                    {rankedOpportunities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {rankedOpportunities.map((opportunity) => (
                                <OpportunityCard
                                    key={opportunity.id}
                                    opportunity={opportunity}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                                <SearchIcon className="w-10 h-10 text-slate-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                No matches found
                            </h3>
                            <p className="text-slate-400 max-w-md">
                                Try adjusting your filters or search terms to find more opportunities
                                that match your profile.
                            </p>
                            <button
                                onClick={() =>
                                    setFilters({
                                        search: "",
                                        types: [],
                                        verifiedOnly: false,
                                        sortBy: "smart",
                                    })
                                }
                                className="mt-6 px-6 py-2 rounded-lg bg-amber-500/20 text-amber-400 font-medium hover:bg-amber-500/30 transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
