"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Shield,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Zap,
  Target,
  Users,
  X,
  Brain,
  ChevronRight,
} from "lucide-react";

import AINotificationSystem from "@/components/AINotificationSystem";
import AIReportModal from "@/components/AIReportModal";

// =========================================
// STATS & ACTIVITY DATA
// =========================================

const statsCards = [
  {
    title: "Active Applications",
    value: "7",
    change: "+2 this week",
    icon: FileText,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    href: "/opportunities",
  },
  {
    title: "Trust Score",
    value: "94",
    change: "Elite Status",
    icon: Shield,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    href: "/profile",
  },
  {
    title: "New Matches",
    value: "12",
    change: "3 high priority",
    icon: Sparkles,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    href: "/opportunities?sort=smart",
  },
];

const recentActivity = [
  {
    icon: Target,
    title: "McKinsey Summer Associate",
    description: "Application viewed by recruiter",
    time: "2h ago",
    href: "/opportunities",
  },
  {
    icon: Users,
    title: "Sarah Chen joined your squad",
    description: "Stanford CS '26",
    time: "5h ago",
    href: "/community",
  },
  {
    icon: Zap,
    title: "New opportunity match",
    description: "Goldman Sachs - 95% fit",
    time: "1d ago",
    href: "/opportunities",
  },
];

// =========================================
// DASHBOARD COMPONENT
// =========================================

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <AINotificationSystem />
      {/* =========================================
          AI REPORT MODAL
          ========================================= */}
      <AIReportModal isOpen={isModalOpen} onClose={closeModal} />

      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-950/50 border border-slate-800 p-8 lg:p-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              Welcome back
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
            Your{" "}
            <Link href="/profile" className="gold-text-gradient hover:opacity-80 transition-opacity">
              Opportunity Readiness Index
            </Link>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-6">
            is calculating based on your latest activities, applications, and
            network growth. We&apos;re analyzing <strong className="text-white">47 data points</strong> to optimize
            your matches.
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-1 min-w-[200px] max-w-md">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Calculating...</span>
                <span className="text-amber-500 font-semibold">~87%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full gold-gradient rounded-full animate-pulse" style={{ width: "87%" }} />
              </div>
            </div>
            <button
              type="button"
              onClick={openModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient text-slate-900 font-semibold text-sm hover:opacity-90 transition-all hover:scale-105 gold-glow"
            >
              View Full Report
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================
          STATS GRID
          ========================================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} border ${card.borderColor} p-6 transition-all duration-300 hover:border-opacity-50 hover:scale-[1.02] group`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4 ${card.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-4xl font-bold text-white mb-2">{card.value}</p>
                <p className={`text-sm ${card.iconColor}`}>{card.change}</p>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </Link>
          );
        })}
      </section>

      {/* =========================================
          RECENT ACTIVITY
          ========================================= */}
      <section className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <Link href="/community" className="text-sm text-amber-500 hover:text-amber-400 transition-colors font-medium flex items-center gap-1 group">
            View all
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="space-y-4">
          {recentActivity.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-amber-500/30 hover:bg-slate-800/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate group-hover:text-amber-400 transition-colors">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-600">{item.time}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-amber-500 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
