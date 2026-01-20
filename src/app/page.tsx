"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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
  Crosshair,
  Activity,
} from "lucide-react";

import AINotificationSystem from "@/components/AINotificationSystem";
import AIReportModal from "@/components/AIReportModal";

// =========================================
// PROJECT NEON - DESIGN TOKENS
// =========================================
const COLORS = {
  voidBlack: "#050505",
  cyberCyan: "#00f3ff",
  highVoltageGold: "#FFD700",
  matrixGreen: "#0aff00",
  errorRed: "#ff003c",
};

// =========================================
// LAYER 1: AMBIENT PLASMA & GRID BACKGROUND
// =========================================
const AmbientBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Ambient Plasma Orbs */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
      style={{
        background: `radial-gradient(circle, ${COLORS.cyberCyan}15 0%, transparent 70%)`,
        filter: "blur(100px)",
      }}
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -30, 50, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
      style={{
        background: `radial-gradient(circle, ${COLORS.matrixGreen}12 0%, transparent 70%)`,
        filter: "blur(120px)",
      }}
      animate={{
        x: [0, -40, 60, 0],
        y: [0, 60, -40, 0],
        scale: [1, 0.9, 1.15, 1],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
      style={{
        background: `radial-gradient(circle, ${COLORS.highVoltageGold}08 0%, transparent 60%)`,
        filter: "blur(150px)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Perspective Grid */}
    <div
      className="absolute inset-0"
      style={{
        background: `
          linear-gradient(to bottom, transparent 0%, ${COLORS.voidBlack} 100%),
          linear-gradient(90deg, rgba(0,243,255,0.04) 1px, transparent 1px),
          linear-gradient(rgba(0,243,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 60px 60px, 60px 60px",
        transform: "perspective(500px) rotateX(60deg)",
        transformOrigin: "center top",
        animation: "gridScroll 20s linear infinite",
      }}
    />

    {/* Vignette Overlay - Slightly lighter for brightness */}
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse at center, transparent 0%, ${COLORS.voidBlack}90 80%)`,
      }}
    />

    {/* Scanlines */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 243, 255, 0.15) 2px,
          rgba(0, 243, 255, 0.15) 4px
        )`,
      }}
    />

    <style jsx>{`
      @keyframes gridScroll {
        0% {
          background-position: 0 0, 0 0, 0 0;
        }
        100% {
          background-position: 0 0, 0 60px, 0 60px;
        }
      }
    `}</style>
  </div>
);

// =========================================
// LAYER 2: DATA RAIN WITH PARALLAX
// =========================================
interface DataStreamProps {
  left: string;
  delay: number;
  duration: number;
  opacity: number;
  fontSize: string;
  chars: string[];
}

const DataStream = ({ left, delay, duration, opacity, fontSize, chars }: DataStreamProps) => {
  const [streamChars, setStreamChars] = useState<string[]>([]);

  useEffect(() => {
    // Generate random characters for this stream
    const generated = Array.from({ length: 30 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    );
    setStreamChars(generated);
  }, [chars]);

  return (
    <motion.div
      className="absolute top-0 font-mono whitespace-pre leading-tight"
      style={{
        left,
        fontSize,
        color: COLORS.matrixGreen,
        opacity,
        textShadow: `0 0 10px ${COLORS.matrixGreen}60`,
        writingMode: "vertical-rl",
        textOrientation: "upright",
      }}
      initial={{ y: "-100%" }}
      animate={{ y: "100vh" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {streamChars.map((char, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const DataRain = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const chars = ["0", "1", "A", "B", "C", "D", "E", "F", "X", "▓", "░", "█"];

  // Parallax effect - inverse mouse movement
  const parallaxX = useTransform(mouseX, [0, window?.innerWidth || 1920], [20, -20]);
  const parallaxY = useTransform(mouseY, [0, window?.innerHeight || 1080], [10, -10]);
  const smoothX = useSpring(parallaxX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(parallaxY, { stiffness: 50, damping: 30 });

  // Generate streams with varied properties
  const streams = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${5 + i * 6.5}%`,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      opacity: 0.1 + Math.random() * 0.2,
      fontSize: `${8 + Math.random() * 6}px`,
    }));
  }, []);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden pointer-events-none z-[1]"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      {streams.map((stream) => (
        <DataStream
          key={stream.id}
          left={stream.left}
          delay={stream.delay}
          duration={stream.duration}
          opacity={stream.opacity}
          fontSize={stream.fontSize}
          chars={chars}
        />
      ))}
    </motion.div>
  );
};

// =========================================
// UTILITY COMPONENTS
// =========================================

// Glitch Text with decode effect
const GlitchText = ({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDecoding, setIsDecoding] = useState(true);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    const timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          children
            .split("")
            .map((char, index) => {
              if (index < iteration) return children[index];
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        if (iteration >= children.length) {
          clearInterval(interval);
          setIsDecoding(false);
        }
        iteration += 1 / 2;
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [children, delay]);

  return (
    <span className={`font-mono ${className} ${isDecoding ? "text-[#00f3ff]" : ""}`}>
      {displayText || children}
    </span>
  );
};

// CyberCard with cut corners and hover effects
const CyberCard = ({
  children,
  className = "",
  delay = 0,
  glowColor = COLORS.cyberCyan,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glowColor?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      delay,
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    }}
    whileHover={{
      scale: 1.02,
      boxShadow: `0 0 40px ${glowColor}30, inset 0 0 20px ${glowColor}10`,
    }}
    className={`
      relative overflow-hidden
      bg-black/50 backdrop-blur-xl
      border border-white/10
      transition-all duration-300
      hover:border-[#00f3ff]/50
      ${className}
    `}
    style={{
      clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
    }}
  >
    {/* Inner glow effect */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${glowColor}20 0%, transparent 50%)`,
      }}
    />
    {/* Corner Decorations */}
    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#00f3ff]/30" />
    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#00f3ff]/30" />
    <div className="absolute bottom-6 left-2 w-4 h-4 border-l-2 border-b-2 border-[#00f3ff]/30" />
    {children}
  </motion.div>
);

// Reactor Core Progress Bar
const ReactorCore = ({ percentage }: { percentage: number }) => {
  const totalSegments = 20;
  const filledSegments = Math.floor((percentage / 100) * totalSegments);

  return (
    <div className="flex-1 min-w-[200px] max-w-md">
      <div className="flex justify-between text-sm mb-3">
        <span className="text-[#00f3ff]/60 font-mono text-xs tracking-widest uppercase">
          Core Status
        </span>
        <motion.span
          className="text-6xl font-bold tracking-tighter"
          style={{
            color: COLORS.highVoltageGold,
            textShadow: `0 0 30px ${COLORS.highVoltageGold}80, 0 0 60px ${COLORS.highVoltageGold}40`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="flex gap-1 h-4 bg-black/50 p-1 border border-white/10">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-full"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: i < filledSegments ? 1 : 0.2,
              scaleY: 1,
              backgroundColor:
                i < filledSegments
                  ? i < filledSegments * 0.3
                    ? COLORS.matrixGreen
                    : i < filledSegments * 0.7
                      ? COLORS.highVoltageGold
                      : COLORS.cyberCyan
                  : "#1a1a1a",
            }}
            transition={{ delay: 0.8 + i * 0.03, duration: 0.2 }}
            style={{
              boxShadow:
                i < filledSegments
                  ? `0 0 10px ${i < filledSegments * 0.3
                    ? COLORS.matrixGreen
                    : i < filledSegments * 0.7
                      ? COLORS.highVoltageGold
                      : COLORS.cyberCyan
                  }60`
                  : "none",
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-white/30 font-mono">0%</span>
        <span className="text-[10px] text-white/30 font-mono">OPTIMAL</span>
        <span className="text-[10px] text-white/30 font-mono">100%</span>
      </div>
    </div>
  );
};

// Decorative Crosshair SVG
const CrosshairDecor = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-8 h-8 text-[#00f3ff]/20 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
  </svg>
);

// =========================================
// STATS & ACTIVITY DATA (PRESERVED)
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// =========================================
// DASHBOARD COMPONENT
// =========================================

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: COLORS.voidBlack }}
    >
      {/* LAYER 1: Ambient Background with Grid */}
      <AmbientBackground />

      {/* LAYER 2: Data Rain with Parallax */}
      <DataRain mouseX={mouseX} mouseY={mouseY} />

      {/* LAYER 3: Content Overlay */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AINotificationSystem />
        <AIReportModal isOpen={isModalOpen} onClose={closeModal} />

        {/* =========================================
            HERO SECTION - COMMAND CENTER
            ========================================= */}
        <motion.section variants={heroVariants}>
          <CyberCard className="p-8 lg:p-10" glowColor={COLORS.highVoltageGold}>
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#00f3ff]/40 tracking-widest">
                SYS-CORE-v2.4
              </span>
              <div className="w-2 h-2 rounded-full bg-[#0aff00] animate-pulse" />
            </div>

            <CrosshairDecor className="absolute top-4 left-1/2 -translate-x-1/2 opacity-30" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 border border-[#00f3ff]/30 bg-[#00f3ff]/5"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                  }}
                  animate={{
                    borderColor: ["rgba(0,243,255,0.3)", "rgba(0,243,255,0.6)", "rgba(0,243,255,0.3)"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-4 h-4 text-[#00f3ff]" />
                  <span className="text-[#00f3ff] text-xs font-mono uppercase tracking-widest">
                    System Online
                  </span>
                </motion.div>
                <span className="text-[10px] font-mono text-white/30">
                  // GOLD_MEMBER_ACCESS
                </span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                <GlitchText delay={200}>OPPORTUNITY</GlitchText>
                <br />
                <Link
                  href="/profile"
                  className="inline-block mt-2"
                  style={{
                    color: COLORS.highVoltageGold,
                    textShadow: `0 0 20px ${COLORS.highVoltageGold}60`,
                  }}
                >
                  <GlitchText delay={400}>READINESS INDEX</GlitchText>
                </Link>
              </h1>

              <p className="text-white/50 text-lg max-w-2xl mb-8 font-light">
                Analyzing{" "}
                <span
                  className="font-bold"
                  style={{ color: COLORS.cyberCyan }}
                >
                  47 data vectors
                </span>{" "}
                across your profile, applications, and network topology.
              </p>

              <div className="flex items-end gap-8 flex-wrap">
                <ReactorCore percentage={87} />

                <motion.button
                  type="button"
                  onClick={openModal}
                  className="flex items-center gap-3 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all"
                  style={{
                    backgroundColor: COLORS.highVoltageGold,
                    color: COLORS.voidBlack,
                    clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                    boxShadow: `0 0 30px ${COLORS.highVoltageGold}40`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 50px ${COLORS.highVoltageGold}60`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Brain className="w-5 h-5" />
                  Access Full Report
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Bottom decorative line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            />
          </CyberCard>
        </motion.section>

        {/* =========================================
            STATS GRID - TACTICAL DISPLAY
            ========================================= */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
          variants={containerVariants}
        >
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            const cardId = `A-0${index + 1}`;
            return (
              <motion.div key={card.title} variants={cardVariants}>
                <Link href={card.href} className="block group">
                  <CyberCard
                    className="p-6 h-full"
                    delay={0.3 + index * 0.1}
                    glowColor={
                      index === 0
                        ? COLORS.cyberCyan
                        : index === 1
                          ? COLORS.highVoltageGold
                          : "#a855f7"
                    }
                  >
                    {/* Card ID Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="text-[8px] font-mono text-white/20 tracking-widest">
                        {cardId}
                      </span>
                      <CrosshairDecor className="w-4 h-4" />
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[8px] font-mono text-[#0aff00]/60 tracking-widest">
                        SYS-RDY
                      </span>
                    </div>

                    <div className="relative z-10 pt-4">
                      <div
                        className={`w-14 h-14 flex items-center justify-center mb-4 border ${card.iconColor}`}
                        style={{
                          borderColor:
                            index === 0
                              ? `${COLORS.cyberCyan}40`
                              : index === 1
                                ? `${COLORS.highVoltageGold}40`
                                : "#a855f740",
                          backgroundColor:
                            index === 0
                              ? `${COLORS.cyberCyan}10`
                              : index === 1
                                ? `${COLORS.highVoltageGold}10`
                                : "#a855f710",
                          clipPath:
                            "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
                        }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      <h3 className="text-white/50 text-xs font-mono uppercase tracking-widest mb-2">
                        {card.title}
                      </h3>

                      <motion.p
                        className="text-5xl font-bold text-white mb-2 tracking-tighter"
                        style={{
                          textShadow: `0 0 20px ${index === 0
                              ? COLORS.cyberCyan
                              : index === 1
                                ? COLORS.highVoltageGold
                                : "#a855f7"
                            }40`,
                        }}
                      >
                        {card.value}
                      </motion.p>

                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${card.iconColor}`}>
                          {card.change}
                        </p>
                        <ArrowRight
                          className={`w-4 h-4 ${card.iconColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`}
                        />
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${index === 0
                            ? COLORS.cyberCyan
                            : index === 1
                              ? COLORS.highVoltageGold
                              : "#a855f7"
                          }, transparent)`,
                      }}
                    />
                  </CyberCard>
                </Link>
              </motion.div>
            );
          })}
        </motion.section>

        {/* =========================================
            RECENT ACTIVITY - TRANSMISSION LOG
            ========================================= */}
        <motion.section variants={cardVariants}>
          <CyberCard className="p-6" delay={0.6}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  <GlitchText delay={800}>TRANSMISSION LOG</GlitchText>
                </h2>
                <span className="text-[10px] font-mono text-[#00f3ff]/40 tracking-widest">
                  // REALTIME_FEED
                </span>
              </div>
              <Link
                href="/community"
                className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider transition-colors group"
                style={{ color: COLORS.cyberCyan }}
              >
                View Archive
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Activity Items */}
            <div className="space-y-3">
              {recentActivity.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.15 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] hover:border-[#00f3ff]/30 hover:bg-[#00f3ff]/5 transition-all group"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                      }}
                    >
                      <div
                        className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-[#00f3ff]/40 transition-colors"
                        style={{
                          clipPath:
                            "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
                        }}
                      >
                        <Icon className="w-5 h-5 text-white/40 group-hover:text-[#00f3ff] transition-colors" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate group-hover:text-[#00f3ff] transition-colors">
                          {item.title}
                        </p>
                        <p className="text-sm text-white/30 font-mono">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
                          {item.time}
                        </span>
                        <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#00f3ff] group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer decoration */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/20 tracking-widest">
                LAST_SYNC: 00:00:47
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0aff00] animate-pulse" />
                <span className="text-[10px] font-mono text-[#0aff00]/60 tracking-widest">
                  LIVE
                </span>
              </div>
            </div>
          </CyberCard>
        </motion.section>
      </motion.div>
    </div>
  );
}
