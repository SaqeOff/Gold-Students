"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    User,
    GraduationCap,
    MapPin,
    Rocket,
    FlaskConical,
    Briefcase,
    Home,
    Sparkles,
    Check,
    X,
    ArrowRight,
    ArrowLeft,
    Zap,
    Brain,
    Globe,
    Shield,
    ChevronRight,
    Lock,
    Mail,
} from "lucide-react";
import { CyberLayout } from "@/components/cyber/CyberLayout";
import { CyberCard } from "@/components/cyber/CyberCard";
import { GlitchText } from "@/components/cyber/GlitchText";
import { COLORS } from "@/components/cyber/constants";

// Step indicator component
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`
                            w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm font-mono border
                            transition-all duration-500 ease-out clip-path-polygon
                            ${step < currentStep
                                ? `bg-[#0aff00]/20 border-[#0aff00] text-[#0aff00]`
                                : step === currentStep
                                    ? `bg-[#FFD700]/20 border-[#FFD700] text-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.3)] scale-110`
                                    : "bg-slate-900 border-slate-700 text-slate-500"
                            }
                        `}
                        style={{
                            clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)"
                        }}
                    >
                        {step < currentStep ? <Check className="w-5 h-5" /> : step}
                    </div>
                    {step < totalSteps && (
                        <div
                            className={`
                                w-12 h-0.5 mx-1 transition-all duration-500
                                ${step < currentStep ? "bg-[#0aff00]" : "bg-slate-800"}
                            `}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

// Goal selection card
function GoalCard({
    icon: Icon,
    label,
    selected,
    onClick,
}: {
    icon: React.ElementType;
    label: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="w-full text-left"
        >
            <CyberCard
                className={`transition-all duration-300 h-full ${selected ? '!border-[#FFD700] !bg-[#FFD700]/10' : 'hover:!border-white/30'}`}
                hoverEffect={!selected}
            >
                <div className="flex flex-col items-start gap-3">
                    <div className={`p-2 rounded-lg ${selected ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-white/5 text-slate-400'}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className={`font-bold font-mono ${selected ? "text-[#FFD700]" : "text-white"}`}>
                            {label}
                        </h3>
                    </div>
                    {selected && (
                        <div className="absolute top-2 right-2">
                            <Check className="w-5 h-5 text-[#FFD700]" />
                        </div>
                    )}
                </div>
            </CyberCard>
        </button>
    );
}

// Skill tag component
function SkillTag({
    skill,
    onRemove,
    removable = true,
}: {
    skill: string;
    onRemove?: () => void;
    removable?: boolean;
}) {
    return (
        <span
            className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-bold border rounded-sm"
            style={{
                borderColor: `${COLORS.cyberCyan}50`,
                color: COLORS.cyberCyan,
                backgroundColor: `${COLORS.cyberCyan}10`,
            }}
        >
            {skill}
            {removable && onRemove && (
                <button
                    onClick={onRemove}
                    className="hover:text-white transition-colors"
                >
                    <X className="w-3 h-3" />
                </button>
            )}
        </span>
    );
}

// Suggestion tag component
function SuggestionTag({ skill, onClick }: { skill: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-1 px-3 py-1.5 font-mono text-xs font-bold border border-white/10 text-slate-400 hover:text-white hover:border-[#00f3ff] hover:bg-[#00f3ff]/10 transition-all rounded-sm group"
        >
            <span className="text-[#00f3ff] opacity-50 group-hover:opacity-100">+</span>
            {skill}
        </button>
    );
}

// Analysis animation messages
const analysisMessages = [
    { icon: Brain, text: "ANALYZING_NEURAL_PATTERNS...", color: COLORS.cyberCyan },
    { icon: Globe, text: "SCANNING_GLOBAL_OPPORTUNITIES...", color: COLORS.matrixGreen },
    { icon: Zap, text: "CALCULATING_READINESS_INDEX...", color: COLORS.highVoltageGold },
    { icon: Shield, text: "GENERATING_TRUST_GRAPH...", color: COLORS.errorRed },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [isRegistering, setIsRegistering] = useState(false);

    // UNSTOPPABLE REDIRECT: Track if redirect has been initiated
    const redirectInitiatedRef = useRef(false);
    const failsafeTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        university: "",
        country: "",
        password: "",
        goals: [] as string[],
        skills: [] as string[],
    });

    // Skill input state
    const [skillInput, setSkillInput] = useState("");
    const suggestedSkills = ["Public Speaking", "React", "Data Analysis", "Python", "Machine Learning", "Leadership"];

    // Analysis animation state
    const [analysisIndex, setAnalysisIndex] = useState(0);
    const [analysisComplete, setAnalysisComplete] = useState(false);

    // Handle goal selection
    const toggleGoal = (goal: string) => {
        setFormData((prev) => ({
            ...prev,
            goals: prev.goals.includes(goal)
                ? prev.goals.filter((g) => g !== goal)
                : [...prev.goals, goal],
        }));
    };

    // Handle skill addition
    const addSkill = (skill: string) => {
        const normalizedSkill = skill.trim();
        if (normalizedSkill && !formData.skills.includes(normalizedSkill)) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, normalizedSkill],
            }));
        }
        setSkillInput("");
    };

    // Handle skill removal
    const removeSkill = (skill: string) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    // Handle skill input keydown
    const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && skillInput.trim()) {
            e.preventDefault();
            addSkill(skillInput);
        }
    };

    // Analysis animation effect with UNSTOPPABLE REDIRECT
    useEffect(() => {
        if (currentStep === 4 && !redirectInitiatedRef.current) {
            console.log("🔵 ONBOARDING: Step 4 reached, initiating UNSTOPPABLE redirect sequence");
            redirectInitiatedRef.current = true; // Mark as initiated - CANNOT be stopped now
            setIsRegistering(true);

            // Animation interval
            const interval = setInterval(() => {
                setAnalysisIndex((prev) => {
                    if (prev < analysisMessages.length - 1) {
                        return prev + 1;
                    }
                    return prev;
                });
            }, 800);

            // UNSTOPPABLE FAILSAFE: Stored in ref so cleanup can't kill it
            failsafeTimerRef.current = setTimeout(() => {
                console.log("🔵 ONBOARDING: FAILSAFE executing - FORCING redirect with window.location");
                window.location.href = "/";
            }, 4500) as any;

            // Try normal registration
            setTimeout(async () => {
                console.log("🔵 ONBOARDING: Attempting registration...");
                setAnalysisComplete(true);

                try {
                    await register({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        university: formData.university,
                        country: formData.country,
                        skills: formData.skills,
                        goals: formData.goals,
                    });
                    console.log("🔵 ONBOARDING: Registration SUCCESS - router.push will handle redirect");
                    if (failsafeTimerRef.current) {
                        clearTimeout(failsafeTimerRef.current);
                    }
                } catch (e) {
                    console.error("🔴 ONBOARDING: Registration FAILED -", e);
                }
            }, 2500);

            return () => {
                clearInterval(interval);
            };
        }
    }, [currentStep, formData, register, router]);

    // Navigation handlers
    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return formData.name.trim() && formData.email.trim() && formData.email.includes("@") && formData.university.trim() && formData.country.trim() && formData.password.length >= 6;
            case 2:
                return formData.goals.length > 0;
            case 3:
                return formData.skills.length >= 1;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (canProceed() && currentStep < 4) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    // Generic Input Component
    const CyberInput = ({ label, icon: Icon, type = "text", value, onChange, placeholder, ...props }: any) => (
        <div>
            <label className="flex items-center gap-2 text-xs font-mono font-bold text-[#00f3ff] mb-2 uppercase tracking-wide">
                <Icon className="w-3.5 h-3.5" />
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-black/40 border border-[#00f3ff]/30 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-[#00f3ff] focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all font-mono text-sm"
                {...props}
            />
        </div>
    );

    return (
        <CyberLayout>
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-2 p-3 bg-black/40 border border-[#FFD700]/30 rounded-xl backdrop-blur-md">
                            <Sparkles className="w-6 h-6 text-[#FFD700]" />
                            <h1 className="text-xl font-bold text-white tracking-widest uppercase font-mono">
                                Gold<span className="text-[#FFD700]">Students</span>
                            </h1>
                        </div>
                        <p className="text-slate-400 font-mono text-xs tracking-wider mt-2">INITIALIZING_ELITE_USER_PROTOCOL...</p>
                    </div>

                    {/* Step Indicator */}
                    <StepIndicator currentStep={currentStep} totalSteps={4} />

                    {/* Main Card */}
                    <CyberCard className="!p-8 min-h-[500px] flex flex-col justify-between">
                        {/* Steps Content */}
                        <div className="flex-1">
                            {/* Step 1: Identity */}
                            {currentStep === 1 && (
                                <div className="space-y-6 animate-pulse-fade-in">
                                    <div className="text-center mb-8">
                                        <GlitchText text="IDENTIFICATION" className="text-2xl font-bold text-white mb-2" />
                                        <p className="text-slate-400 font-mono text-xs">ENTER_USER_CREDENTIALS</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <CyberInput
                                            label="Full Name" icon={User}
                                            value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Alex Chen"
                                        />
                                        <CyberInput
                                            label="Email Address" icon={Mail} type="email"
                                            value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="you@university.edu"
                                        />
                                        <CyberInput
                                            label="University" icon={GraduationCap}
                                            value={formData.university} onChange={(e: any) => setFormData({ ...formData, university: e.target.value })}
                                            placeholder="MIT, Stanford..."
                                        />
                                        <CyberInput
                                            label="Country" icon={MapPin}
                                            value={formData.country} onChange={(e: any) => setFormData({ ...formData, country: e.target.value })}
                                            placeholder="United States"
                                        />
                                        <div className="md:col-span-2">
                                            <CyberInput
                                                label="Create Password" icon={Lock} type="password"
                                                value={formData.password} onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
                                                placeholder="Min. 6 characters"
                                            />
                                            {/* Strength Bar */}
                                            <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-300 ${formData.password.length === 0 ? "w-0" :
                                                        formData.password.length < 6 ? "w-1/3 bg-red-500" :
                                                            formData.password.length < 8 ? "w-2/3 bg-[#FFD700]" :
                                                                "w-full bg-[#0aff00]"
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Goals */}
                            {currentStep === 2 && (
                                <div className="space-y-6 animate-pulse-fade-in">
                                    <div className="text-center mb-8">
                                        <GlitchText text="PRIMARY_OBJECTIVE" className="text-2xl font-bold text-white mb-2" />
                                        <p className="text-slate-400 font-mono text-xs">SELECT_TARGET_PARAMETERS</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <GoalCard icon={Rocket} label="Startup" selected={formData.goals.includes("Startup")} onClick={() => toggleGoal("Startup")} />
                                        <GoalCard icon={FlaskConical} label="Research" selected={formData.goals.includes("Research")} onClick={() => toggleGoal("Research")} />
                                        <GoalCard icon={Briefcase} label="Internship" selected={formData.goals.includes("Internship")} onClick={() => toggleGoal("Internship")} />
                                        <GoalCard icon={Home} label="Housing" selected={formData.goals.includes("Housing")} onClick={() => toggleGoal("Housing")} />
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Skills */}
                            {currentStep === 3 && (
                                <div className="space-y-6 animate-pulse-fade-in">
                                    <div className="text-center mb-8">
                                        <GlitchText text="SKILL_MATRIX" className="text-2xl font-bold text-white mb-2" />
                                        <p className="text-slate-400 font-mono text-xs">UPLOAD_COMPETENCIES</p>
                                    </div>

                                    <div className="relative">
                                        <CyberInput
                                            label="Add Skill" icon={Brain}
                                            value={skillInput} onChange={(e: any) => setSkillInput(e.target.value)}
                                            placeholder="Type and press Enter..."
                                            onKeyDown={handleSkillKeyDown}
                                        />
                                        <p className="text-[10px] text-slate-500 font-mono mt-1 text-right">PRESS ENTER TO ADD</p>
                                    </div>

                                    {/* Added Skills */}
                                    {formData.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-2 p-4 border border-white/5 bg-black/20 rounded-lg">
                                            {formData.skills.map((skill) => (
                                                <SkillTag key={skill} skill={skill} onRemove={() => removeSkill(skill)} />
                                            ))}
                                        </div>
                                    )}

                                    {/* Suggestions */}
                                    <div>
                                        <h4 className="text-[10px] font-mono text-[#00f3ff] mb-3 uppercase">DETECTED_SUGGESTIONS:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestedSkills
                                                .filter((s) => !formData.skills.includes(s))
                                                .map((skill) => (
                                                    <SuggestionTag key={skill} skill={skill} onClick={() => addSkill(skill)} />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Analysis */}
                            {currentStep === 4 && (
                                <div className="py-8 animate-pulse-fade-in flex flex-col items-center justify-center h-full">
                                    <div className="text-center mb-12">
                                        <GlitchText
                                            text={analysisComplete ? "ACCESS_GRANTED" : "PROCESSING_DATA"}
                                            className="text-2xl font-bold text-white mb-2"
                                        />
                                        <p className="text-slate-400 font-mono text-xs">
                                            {analysisComplete
                                                ? "DASHBOARD_INITIALIZATION_COMPLETE"
                                                : "CALCULATING_COMPATIBILITY_VECTORS..."}
                                        </p>
                                    </div>

                                    <div className="space-y-4 w-full max-w-sm">
                                        {analysisMessages.map((msg, index) => {
                                            const Icon = msg.icon;
                                            const isActive = index === analysisIndex;
                                            const isComplete = index < analysisIndex;

                                            return (
                                                <div
                                                    key={index}
                                                    className={`
                                                        flex items-center gap-4 p-3 rounded border transition-all duration-300 font-mono text-xs
                                                        ${isActive || isComplete ? '' : 'bg-transparent border-white/5 text-slate-600'}
                                                    `}
                                                    style={{
                                                        borderColor: isActive ? msg.color : isComplete ? COLORS.matrixGreen : 'rgba(255,255,255,0.1)',
                                                        backgroundColor: isActive ? `${msg.color}20` : isComplete ? `${COLORS.matrixGreen}20` : 'transparent',
                                                        color: isActive ? 'white' : isComplete ? COLORS.matrixGreen : 'inherit'
                                                    }}
                                                >
                                                    <Icon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} style={{ color: isActive ? msg.color : isComplete ? COLORS.matrixGreen : 'currentcolor' }} />
                                                    <span>{msg.text}</span>
                                                    {isComplete && <Check className="w-4 h-4 ml-auto" />}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {!analysisComplete && (
                                        <div className="mt-8 relative">
                                            <div className="w-16 h-16 border-4 border-[#00f3ff]/20 rounded-full border-t-[#00f3ff] animate-spin" />
                                        </div>
                                    )}

                                    {analysisComplete && (
                                        <div className="mt-8">
                                            <div className="w-16 h-16 rounded-full bg-[#0aff00]/20 flex items-center justify-center animate-bounce border border-[#0aff00] shadow-[0_0_20px_#0aff00]">
                                                <Check className="w-8 h-8 text-[#0aff00]" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* Navigation */}
                        {currentStep < 4 && (
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className={`
                                        flex items-center gap-2 px-5 py-2.5 rounded hover:bg-white/5 font-mono text-xs font-bold transition-all
                                        ${currentStep === 1 ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:text-white"}
                                    `}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    BACK
                                </button>

                                <button
                                    onClick={nextStep}
                                    disabled={!canProceed()}
                                    className={`
                                        flex items-center gap-2 px-6 py-2.5 rounded font-mono text-xs font-bold transition-all border
                                        ${canProceed()
                                            ? "bg-[#00f3ff] text-black border-[#00f3ff] hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]"
                                            : "bg-transparent border-slate-700 text-slate-700 cursor-not-allowed"
                                        }
                                    `}
                                >
                                    {currentStep === 3 ? "INITIATE_ANALYSIS" : "CONTINUE"}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </CyberCard>

                    {/* Footer */}
                    <p className="text-center text-slate-600 font-mono text-[10px] mt-6 tracking-widest uppercase">
                        Protocol v9.0.1 :: Authorized Access Only
                    </p>
                </div>
            </div>

            <style jsx>{`
                .animate-pulse-fade-in {
                    animation: pulseFadeIn 0.5s ease-out;
                }
                @keyframes pulseFadeIn {
                    0% { opacity: 0; transform: scale(0.98); }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </CyberLayout>
    );
}
