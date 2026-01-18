"use client";

import React from "react";
import {
    Search,
    Filter,
    X,
    ShieldCheck,
    Briefcase,
    GraduationCap,
    UserCheck,
    Home,
    SortAsc,
} from "lucide-react";
import { OpportunityType } from "@/types";

export type SortOption = "smart" | "deadline" | "newest";

export interface FilterState {
    search: string;
    types: OpportunityType[];
    verifiedOnly: boolean;
    sortBy: SortOption;
}

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    isOpen: boolean;
    onClose: () => void;
    resultCount: number;
}

const TYPE_OPTIONS = [
    { value: OpportunityType.Grant, label: "Grants", icon: GraduationCap },
    { value: OpportunityType.Job, label: "Jobs", icon: Briefcase },
    { value: OpportunityType.Mentor, label: "Mentors", icon: UserCheck },
    { value: OpportunityType.Housing, label: "Housing", icon: Home },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "smart", label: "Smart Match" },
    { value: "deadline", label: "Deadline (Soonest)" },
    { value: "newest", label: "Newest First" },
];

export default function FilterSidebar({
    filters,
    onFilterChange,
    isOpen,
    onClose,
    resultCount,
}: FilterSidebarProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ ...filters, search: e.target.value });
    };

    const handleTypeToggle = (type: OpportunityType) => {
        const newTypes = filters.types.includes(type)
            ? filters.types.filter((t) => t !== type)
            : [...filters.types, type];
        onFilterChange({ ...filters, types: newTypes });
    };

    const handleVerifiedToggle = () => {
        onFilterChange({ ...filters, verifiedOnly: !filters.verifiedOnly });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({ ...filters, sortBy: e.target.value as SortOption });
    };

    const handleClearFilters = () => {
        onFilterChange({
            search: "",
            types: [],
            verifiedOnly: false,
            sortBy: "smart",
        });
    };

    const hasActiveFilters =
        filters.search !== "" ||
        filters.types.length > 0 ||
        filters.verifiedOnly ||
        filters.sortBy !== "smart";

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:sticky top-0 left-0 h-full lg:h-auto lg:top-24
          w-80 max-w-[85vw] lg:w-72
          bg-slate-900 lg:bg-transparent
          z-50 lg:z-0
          transform transition-transform duration-300 lg:transform-none
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto
        `}
            >
                <div className="p-6 lg:p-0 space-y-6">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between lg:hidden">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Filter className="w-5 h-5 text-amber-500" />
                            Filters
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="glass-card rounded-xl p-4 border border-white/10">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search opportunities..."
                                value={filters.search}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Opportunity Types */}
                    <div className="glass-card rounded-xl p-4 border border-white/10">
                        <h3 className="text-sm font-medium text-white mb-3 uppercase tracking-wider">
                            Type
                        </h3>
                        <div className="space-y-2">
                            {TYPE_OPTIONS.map(({ value, label, icon: Icon }) => (
                                <label
                                    key={value}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.types.includes(value)}
                                        onChange={() => handleTypeToggle(value)}
                                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
                                    />
                                    <Icon className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm text-slate-300">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Verified Only Toggle */}
                    <div className="glass-card rounded-xl p-4 border border-white/10">
                        <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-amber-500" />
                                <span className="text-sm text-white">Verified Only</span>
                            </div>
                            <button
                                onClick={handleVerifiedToggle}
                                className={`relative w-12 h-6 rounded-full transition-colors ${filters.verifiedOnly ? "bg-amber-500" : "bg-slate-700"
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${filters.verifiedOnly ? "translate-x-6" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        </label>
                        <p className="text-xs text-slate-500 mt-2">
                            Show only opportunities from verified partners
                        </p>
                    </div>

                    {/* Sort By */}
                    <div className="glass-card rounded-xl p-4 border border-white/10">
                        <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
                            <SortAsc className="w-4 h-4" />
                            Sort By
                        </h3>
                        <select
                            value={filters.sortBy}
                            onChange={handleSortChange}
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                            {SORT_OPTIONS.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Results Count & Clear */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">
                            {resultCount} result{resultCount !== 1 ? "s" : ""}
                        </span>
                        {hasActiveFilters && (
                            <button
                                onClick={handleClearFilters}
                                className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
