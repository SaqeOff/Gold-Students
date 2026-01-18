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

  const openModal = () => {
    setIsScanning(true);
    setIsModalOpen(true);
    // Start scanning animation
    setTimeout(() => {
      setIsScanning(false);
    }, 1500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsScanning(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* =========================================
          AI REPORT MODAL
          ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-white/10 rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 px-6 py-4 border-b border-white/10 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">✨ Gold AI Strategic Analysis</h2>
                    <p className="text-xs text-slate-400">Powered by Opportunity Matching Engine</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {isScanning ? (
                  /* Scanning Animation */
                  <div className="py-16 flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-slate-700" />
                      <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                      <Brain className="absolute inset-0 m-auto w-8 h-8 text-amber-400" />
                    </div>
                    <p className="mt-6 text-lg font-medium text-white">Scanning Profile...</p>
                    <p className="text-sm text-slate-400 mt-1">Analyzing 47 data points</p>
                  </div>
                ) : (
                  /* Analysis Results */
                  <div className="space-y-6">
                    {/* Profile Strength */}
                    <section className="p-5 rounded-2xl bg-slate-800/50 border border-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-amber-500" />
                          Profile Strength
                        </h3>
                        <span className="text-amber-400 font-bold">👑 Elite Tier</span>
                      </div>
                      <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full w-[87%]" />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>0%</span>
                        <span className="text-amber-400 font-bold">87%</span>
                        <span>100%</span>
                      </div>
                    </section>

                    {/* AI Verdict */}
                    <section className="p-5 rounded-2xl border bg-green-500/10 border-green-500/20">
                      <h3 className="font-semibold text-white flex items-center gap-2 mb-3">
                        <Brain className="w-5 h-5 text-green-400" />
                        AI Verdict
                      </h3>
                      <p className="text-lg text-green-300">
                        Exceptional Profile: Your elite verification status and strong skill portfolio position you in the top tier. You are highly competitive for all opportunities in your feed.
                      </p>
                    </section>

                    {/* Key Insights */}
                    <section>
                      <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-amber-500" />
                        Key Insights
                      </h3>
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl border bg-green-500/10 border-green-500/20">
                          <h4 className="font-medium text-white">🛡️ Elite Tier Verified</h4>
                          <p className="text-sm text-slate-300 mt-1">Your trust score (94) places you in the top 5% of the community.</p>
                        </div>
                        <div className="p-4 rounded-xl border bg-green-500/10 border-green-500/20">
                          <h4 className="font-medium text-white">💎 Strong Skill Portfolio</h4>
                          <p className="text-sm text-slate-300 mt-1">Your skills maximize matching potential for premium opportunities.</p>
                        </div>
                      </div>
                    </section>

                    {/* Recommendations */}
                    <section>
                      <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-amber-500" />
                        Top 3 Next Steps
                      </h3>
                      <div className="space-y-3">
                        <Link
                          href="/opportunities"
                          onClick={closeModal}
                          className="block p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-amber-500/30 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-white font-medium group-hover:text-amber-400">1. Apply to Top Matches</span>
                              <p className="text-sm text-slate-400">3 high-priority opportunities waiting</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400" />
                          </div>
                        </Link>
                        <Link
                          href="/community"
                          onClick={closeModal}
                          className="block p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-amber-500/30 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-white font-medium group-hover:text-amber-400">2. Find Co-Founders</span>
                              <p className="text-sm text-slate-400">12 potential matches in your network</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400" />
                          </div>
                        </Link>
                        <Link
                          href="/profile"
                          onClick={closeModal}
                          className="block p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-amber-500/30 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-white font-medium group-hover:text-amber-400">3. Complete Your Profile</span>
                              <p className="text-sm text-slate-400">15% remaining for full optimization</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400" />
                          </div>
                        </Link>
                      </div>
                    </section>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
