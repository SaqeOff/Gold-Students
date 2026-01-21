"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    Filter,
    Sparkles,
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
import { OpportunityType } from "@/types";

// =========================================
// DESIGN TOKENS
// =========================================
const COLORS = {
    void: "#020202",
    cyan: "#00f0ff",
    amber: "#f5a623",
    green: "#0aff00",
    pink: "#ff0080",
};

// =========================================
// SCRAMBLE TEXT COMPONENT
// =========================================
const ScrambleText = ({ text, className = "" }: { text: string; className?: string }) => {
    const [displayText, setDisplayText] = useState("");
    const chars = "!@#$%^&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ?><[]{}";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 0.5;
        }, 25);
        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{displayText || text}</span>;
};

// =========================================
// MAGNETIC FIELD BACKGROUND
// =========================================
const MagneticField = () => {
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const particleCount = isMobile ? 8 : 18;

    const shapes = useMemo(() => {
        return Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 20 + Math.random() * 40,
            rotation: Math.random() * 360,
            speed: 0.5 + Math.random() * 1.5,
            type: ["tetra", "cube", "octa"][Math.floor(Math.random() * 3)],
            color: Math.random() > 0.5 ? COLORS.cyan : COLORS.amber,
        }));
    }, [particleCount]);

    const stars = useMemo(() => {
        return Array.from({ length: isMobile ? 30 : 80 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 2,
            opacity: 0.2 + Math.random() * 0.5,
            duration: 3 + Math.random() * 4,
        }));
    }, [isMobile]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            {/* Deep void gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,180,200,0.03) 0%, transparent 50%)`,
                }}
            />

            {/* Starfield */}
            {stars.map((star) => (
                <motion.div
                    key={`star-${star.id}`}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* 3D Wireframe Shapes */}
            {shapes.map((shape) => {
                const parallaxX = (mousePos.x - 0.5) * 30 * (shape.speed / 2);
                const parallaxY = (mousePos.y - 0.5) * 30 * (shape.speed / 2);

                return (
                    <motion.div
                        key={shape.id}
                        className="absolute"
                        style={{
                            left: `${shape.x}%`,
                            top: `${shape.y}%`,
                            width: shape.size,
                            height: shape.size,
                        }}
                        animate={{
                            x: [parallaxX - 10, parallaxX + 10, parallaxX - 10],
                            y: [parallaxY - 5, parallaxY + 5, parallaxY - 5],
                            rotate: [shape.rotation, shape.rotation + 360],
                        }}
                        transition={{
                            x: { duration: 8 / shape.speed, repeat: Infinity, ease: "easeInOut" },
                            y: { duration: 6 / shape.speed, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 20 / shape.speed, repeat: Infinity, ease: "linear" },
                        }}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ opacity: 0.15 }}>
                            {shape.type === "tetra" && (
                                <polygon
                                    points="50,10 90,80 10,80"
                                    fill="none"
                                    stroke={shape.color}
                                    strokeWidth="0.5"
                                />
                            )}
                            {shape.type === "cube" && (
                                <>
                                    <rect x="20" y="20" width="60" height="60" fill="none" stroke={shape.color} strokeWidth="0.5" />
                                    <line x1="20" y1="20" x2="35" y2="5" stroke={shape.color} strokeWidth="0.5" />
                                    <line x1="80" y1="20" x2="95" y2="5" stroke={shape.color} strokeWidth="0.5" />
                                    <line x1="35" y1="5" x2="95" y2="5" stroke={shape.color} strokeWidth="0.5" />
                                    <line x1="95" y1="5" x2="95" y2="65" stroke={shape.color} strokeWidth="0.5" />
                                    <line x1="80" y1="80" x2="95" y2="65" stroke={shape.color} strokeWidth="0.5" />
                                </>
                            )}
                            {shape.type === "octa" && (
                                <>
                                    <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke={shape.color} strokeWidth="0.5" />
                                    <line x1="50" y1="5" x2="50" y2="95" stroke={shape.color} strokeWidth="0.3" />
                                    <line x1="5" y1="50" x2="95" y2="50" stroke={shape.color} strokeWidth="0.3" />
                                </>
                            )}
                        </svg>
                    </motion.div>
                );
            })}
        </div>
    );
};

// =========================================
// SCANNER OVERLAY
// =========================================
const ScannerOverlay = () => (
    <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    >
        <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{
                background: `linear-gradient(90deg, transparent, ${COLORS.cyan}30, transparent)`,
                boxShadow: `0 0 20px ${COLORS.cyan}20`,
            }}
            animate={{ top: ["-2px", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />
    </motion.div>
);

// =========================================
// TARGET RETICLE (Match Score)
// =========================================
const TargetReticle = ({ score }: { score: number }) => {
    const isHighMatch = score >= 90;
    const color = isHighMatch ? COLORS.green : score >= 70 ? COLORS.cyan : COLORS.amber;

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
                {/* Corner brackets */}
                <path d="M 20,10 L 10,10 L 10,20" fill="none" stroke={color} strokeWidth="1.5" />
                <path d="M 80,10 L 90,10 L 90,20" fill="none" stroke={color} strokeWidth="1.5" />
                <path d="M 20,90 L 10,90 L 10,80" fill="none" stroke={color} strokeWidth="1.5" />
                <path d="M 80,90 L 90,90 L 90,80" fill="none" stroke={color} strokeWidth="1.5" />
            </motion.svg>
            <span className="text-lg font-mono font-bold" style={{ color }}>{score}%</span>
        </div>
    );
};

// =========================================
// MISSION CARD (Data Slab)
// =========================================
const MissionCard = ({
    opportunity,
    onViewDetails,
}: {
    opportunity: RankedOpportunity;
    onViewDetails: (id: string) => void;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

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
        <motion.div
            ref={cardRef}
            className="relative group cursor-pointer"
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onViewDetails(opportunity.id)}
        >
            <motion.div
                className="relative overflow-hidden border border-white/10 backdrop-blur-xl"
                style={{
                    backgroundColor: "rgba(10, 10, 15, 0.85)",
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Shimmer effect on hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(105deg, transparent 40%, ${COLORS.cyan}10 50%, transparent 60%)`,
                    }}
                    animate={isHovered ? { x: ["-100%", "200%"] } : { x: "-100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Corner accent */}
                <div
                    className="absolute top-0 left-0 w-16 h-16"
                    style={{
                        background: `linear-gradient(135deg, ${isVerified ? COLORS.amber : COLORS.cyan}20 0%, transparent 50%)`,
                    }}
                />

                <div className="p-5" style={{ transform: "translateZ(20px)" }}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            {/* Type Badge */}
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className="text-[9px] font-mono tracking-widest px-2 py-0.5 border"
                                    style={{
                                        borderColor: `${COLORS.cyan}50`,
                                        color: COLORS.cyan,
                                        backgroundColor: `${COLORS.cyan}10`,
                                    }}
                                >
                                    {typeLabels[opportunity.type] || opportunity.type.toUpperCase()}
                                </span>
                                {isVerified && (
                                    <span
                                        className="text-[9px] font-mono tracking-widest px-2 py-0.5 border flex items-center gap-1"
                                        style={{
                                            borderColor: `${COLORS.amber}50`,
                                            color: COLORS.amber,
                                            backgroundColor: `${COLORS.amber}10`,
                                        }}
                                    >
                                        <Shield className="w-3 h-3" /> VERIFIED
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
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
                                className="text-[10px] font-mono px-2 py-0.5 border border-white/10 text-slate-400 bg-white/5"
                            >
                                {req}
                            </span>
                        ))}
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-xs text-slate-500 font-mono">
                            ID: {opportunity.id.slice(0, 8).toUpperCase()}
                        </span>
                        <motion.div
                            className="flex items-center gap-1 text-sm font-medium"
                            style={{ color: COLORS.cyan }}
                            whileHover={{ x: 5 }}
                        >
                            ACCESS <ChevronRight className="w-4 h-4" />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom cut corner accent */}
                <div
                    className="absolute bottom-0 right-0 w-5 h-5"
                    style={{
                        background: `linear-gradient(315deg, ${COLORS.cyan}40 0%, transparent 50%)`,
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

// =========================================
// FILTER PANEL (Frequency Tuner)
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
            <motion.div
                className="relative w-12 h-6 rounded-full border"
                style={{
                    borderColor: checked ? COLORS.cyan : "rgba(255,255,255,0.2)",
                    backgroundColor: checked ? `${COLORS.cyan}20` : "rgba(255,255,255,0.05)",
                }}
                onClick={() => onChange(!checked)}
            >
                <motion.div
                    className="absolute top-1 w-4 h-4 rounded-full"
                    style={{ backgroundColor: checked ? COLORS.cyan : "rgba(255,255,255,0.3)" }}
                    animate={{ left: checked ? 26 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </motion.div>
        </label>
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                className={`
          fixed lg:sticky top-0 left-0 h-screen w-72 z-50 lg:z-auto
          border-r border-white/5 bg-[#050508]/95 backdrop-blur-xl
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          transition-transform lg:transition-none
        `}
            >
                {/* Panel Header */}
                <div className="p-4 border-b border-white/5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: COLORS.green }}
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="text-[10px] font-mono text-green-400 tracking-widest">LIVE FEED</span>
                        </div>
                        <button onClick={onClose} className="lg:hidden p-1 text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Technical markings */}
                    <div className="flex items-center justify-between text-[8px] font-mono text-slate-600 mb-2">
                        <span>SYS:FILTER_v2.4</span>
                        <span>NODE:ACTIVE</span>
                    </div>
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                </div>

                {/* Search */}
                <div className="p-4 border-b border-white/5">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="SEARCH SIGNAL..."
                            value={filters.search}
                            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Type Filters */}
                    <div>
                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
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
                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
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
                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                            SORT FREQUENCY
                        </h4>
                        <div className="space-y-1">
                            {sortOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => onFilterChange({ ...filters, sortBy: opt.value })}
                                    className={`w-full text-left px-3 py-2 text-sm font-mono transition-all ${filters.sortBy === opt.value
                                        ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500"
                                        : "text-slate-400 hover:bg-white/5 border-l-2 border-transparent"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/5">
                    <div className="text-center">
                        <span className="text-2xl font-mono font-bold" style={{ color: COLORS.cyan }}>
                            {resultCount}
                        </span>
                        <p className="text-[10px] font-mono text-slate-500 uppercase">SIGNALS DETECTED</p>
                    </div>
                </div>
            </motion.aside>
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
            type: filters.types.length === 1 ? (filters.types[0] as OpportunityType) : undefined,
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
        <div className="min-h-screen relative" style={{ backgroundColor: COLORS.void }}>
            {/* Background Effects */}
            <MagneticField />
            <ScannerOverlay />

            {/* Content Layer */}
            <div className="relative z-10 flex">
                {/* Filter Sidebar */}
                <FilterPanel
                    filters={filters}
                    onFilterChange={setFilters}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    resultCount={rankedOpportunities.length}
                />

                {/* Main Content */}
                <div className="flex-1 min-h-screen">
                    {/* Header */}
                    <header className="p-6 md:p-8 border-b border-white/5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 font-mono">
                                    <Target className="w-8 h-8" style={{ color: COLORS.cyan }} />
                                    <ScrambleText text="MISSION SELECT" />
                                </h1>
                                <p className="text-slate-500 mt-1 font-mono text-sm">
                                    [AI_RANKED_OPPORTUNITIES :: PROFILE_MATCHED]
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-6">
                                {[
                                    { value: stats.total, label: "TARGETS", color: COLORS.cyan },
                                    { value: stats.verified, label: "VERIFIED", color: COLORS.amber },
                                    { value: `${stats.avgScore}%`, label: "AVG MATCH", color: COLORS.green },
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
                                className="lg:hidden flex items-center gap-2 px-4 py-2 border font-mono text-sm"
                                style={{
                                    borderColor: `${COLORS.cyan}50`,
                                    color: COLORS.cyan,
                                    backgroundColor: `${COLORS.cyan}10`,
                                }}
                            >
                                <Radio className="w-4 h-4" />
                                TUNE FILTER
                            </button>
                        </div>
                    </header>

                    {/* Grid */}
                    <main className="p-6 md:p-8">
                        {rankedOpportunities.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {rankedOpportunities.map((opportunity, i) => (
                                    <motion.div
                                        key={opportunity.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <MissionCard opportunity={opportunity} onViewDetails={handleViewDetails} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <motion.div
                                    className="w-24 h-24 rounded-full border-2 flex items-center justify-center mb-6"
                                    style={{ borderColor: `${COLORS.cyan}30` }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                >
                                    <SearchIcon className="w-10 h-10" style={{ color: COLORS.cyan }} />
                                </motion.div>
                                <h3 className="text-xl font-mono font-semibold text-white mb-2">NO SIGNALS DETECTED</h3>
                                <p className="text-slate-500 font-mono text-sm max-w-md">
                                    Adjust frequency parameters to locate mission targets.
                                </p>
                                <button
                                    onClick={() => setFilters({ search: "", types: [], verifiedOnly: false, sortBy: "smart" })}
                                    className="mt-6 px-6 py-2 font-mono text-sm border"
                                    style={{
                                        borderColor: COLORS.amber,
                                        color: COLORS.amber,
                                        backgroundColor: `${COLORS.amber}10`,
                                    }}
                                >
                                    RESET FREQUENCY
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
