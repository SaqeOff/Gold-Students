"use client";

import React, { useState, useEffect } from "react";
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

// Step indicator component
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`
                            w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                            transition-all duration-500 ease-out
                            ${step < currentStep
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-90"
                                : step === currentStep
                                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 scale-110 shadow-lg shadow-amber-500/30"
                                    : "bg-slate-800 text-slate-500"
                            }
                        `}
                    >
                        {step < currentStep ? <Check className="w-5 h-5" /> : step}
                    </div>
                    {step < totalSteps && (
                        <div
                            className={`
                                w-12 h-1 mx-1 rounded-full transition-all duration-500
                                ${step < currentStep ? "bg-green-500" : "bg-slate-800"}
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
            className={`
                relative p-6 rounded-2xl border-2 transition-all duration-300 text-left
                ${selected
                    ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20"
                    : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800"
                }
            `}
        >
            {selected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-slate-900" />
                </div>
            )}
            <Icon className={`w-8 h-8 mb-3 ${selected ? "text-amber-400" : "text-slate-400"}`} />
            <h3 className={`font-semibold text-lg ${selected ? "text-white" : "text-slate-300"}`}>
                {label}
            </h3>
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
            className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                bg-amber-500/20 text-amber-400 border border-amber-500/30
            `}
        >
            {skill}
            {removable && onRemove && (
                <button
                    onClick={onRemove}
                    className="hover:bg-amber-500/30 rounded-full p-0.5 transition-colors"
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
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                bg-slate-700 text-slate-300 border border-slate-600 hover:border-amber-500/50 
                hover:bg-amber-500/10 hover:text-amber-400 transition-all duration-200"
        >
            <span>+</span>
            {skill}
        </button>
    );
}

// Analysis animation messages
const analysisMessages = [
    { icon: Brain, text: "Analyzing your skills...", color: "text-purple-400" },
    { icon: Globe, text: "Scanning global opportunities...", color: "text-blue-400" },
    { icon: Zap, text: "Calculating Readiness Index...", color: "text-amber-400" },
    { icon: Shield, text: "Generating Trust Graph...", color: "text-green-400" },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [isRegistering, setIsRegistering] = useState(false);

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

    // Analysis animation effect
    useEffect(() => {
        if (currentStep === 4 && !isRegistering) {
            setIsRegistering(true);

            const interval = setInterval(() => {
                setAnalysisIndex((prev) => {
                    if (prev < analysisMessages.length - 1) {
                        return prev + 1;
                    }
                    return prev;
                });
            }, 800);

            // Register user after analysis animation
            const timeout = setTimeout(async () => {
                setAnalysisComplete(true);

                // Register via AuthContext (handles storage and login)
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
                    // AuthContext register() handles redirect internally
                } catch (e) {
                    console.error("Registration failed:", e);
                    // Fallback: Even if registration fails, redirect to dashboard
                    // (User can try logging in again)
                    setTimeout(() => {
                        router.push("/");
                    }, 1000);
                }
            }, 3500);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [currentStep, formData, register, isRegistering, router]);

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

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            {/* Background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Main card */}
            <div className="relative w-full max-w-2xl">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-slate-900" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Gold Students Club</h1>
                    </div>
                    <p className="text-slate-400">Join the world's most exclusive student community</p>
                </div>

                {/* Step indicator */}
                <StepIndicator currentStep={currentStep} totalSteps={4} />

                {/* Card container */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    {/* Step 1: Identity */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">Let's get started</h2>
                                <p className="text-slate-400">Tell us about yourself</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                        <User className="w-4 h-4 text-amber-400" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Alex Chen"
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                        <Mail className="w-4 h-4 text-amber-400" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@university.edu"
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                        <GraduationCap className="w-4 h-4 text-amber-400" />
                                        University
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.university}
                                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                                        placeholder="MIT, Stanford, Oxford..."
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                        <MapPin className="w-4 h-4 text-amber-400" />
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        placeholder="United States"
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                        <Lock className="w-4 h-4 text-amber-400" />
                                        Create Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Min. 6 characters"
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                    />
                                    {/* Password Strength Bar */}
                                    <div className="mt-2">
                                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${formData.password.length === 0 ? "w-0" :
                                                    formData.password.length < 6 ? "w-1/3 bg-red-500" :
                                                        formData.password.length < 8 ? "w-2/3 bg-amber-500" :
                                                            "w-full bg-green-500"
                                                    }`}
                                            />
                                        </div>
                                        <p className={`text-xs mt-1 ${formData.password.length === 0 ? "text-slate-500" :
                                            formData.password.length < 6 ? "text-red-400" :
                                                formData.password.length < 8 ? "text-amber-400" :
                                                    "text-green-400"
                                            }`}>
                                            {formData.password.length === 0 ? "You'll use this to log back in" :
                                                formData.password.length < 6 ? "Weak - Use at least 6 characters" :
                                                    formData.password.length < 8 ? "Good - 8+ characters recommended" :
                                                        "Strong password!"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Goals */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">What is your primary focus?</h2>
                                <p className="text-slate-400">Select all that apply — this helps our AI find the best matches</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <GoalCard
                                    icon={Rocket}
                                    label="🚀 Startup"
                                    selected={formData.goals.includes("Startup")}
                                    onClick={() => toggleGoal("Startup")}
                                />
                                <GoalCard
                                    icon={FlaskConical}
                                    label="🔬 Research"
                                    selected={formData.goals.includes("Research")}
                                    onClick={() => toggleGoal("Research")}
                                />
                                <GoalCard
                                    icon={Briefcase}
                                    label="💼 Internship"
                                    selected={formData.goals.includes("Internship")}
                                    onClick={() => toggleGoal("Internship")}
                                />
                                <GoalCard
                                    icon={Home}
                                    label="🏡 Housing"
                                    selected={formData.goals.includes("Housing")}
                                    onClick={() => toggleGoal("Housing")}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Skills */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">Add your top skills</h2>
                                <p className="text-slate-400">Type a skill and press Enter, or click suggestions below</p>
                            </div>

                            {/* Skill input */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={handleSkillKeyDown}
                                    placeholder="Type a skill and press Enter..."
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                />
                                {skillInput && (
                                    <button
                                        onClick={() => addSkill(skillInput)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-amber-500 text-slate-900 rounded-lg text-sm font-medium hover:bg-amber-400 transition-colors"
                                    >
                                        Add
                                    </button>
                                )}
                            </div>

                            {/* Added skills */}
                            {formData.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.map((skill) => (
                                        <SkillTag key={skill} skill={skill} onRemove={() => removeSkill(skill)} />
                                    ))}
                                </div>
                            )}

                            {/* Suggestions */}
                            <div>
                                <h4 className="text-sm font-medium text-slate-400 mb-3">Suggested skills:</h4>
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

                    {/* Step 4: AI Analysis */}
                    {currentStep === 4 && (
                        <div className="py-8 animate-fadeIn">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {analysisComplete ? "Welcome to Gold Students Club!" : "AI Analysis in Progress"}
                                </h2>
                                <p className="text-slate-400">
                                    {analysisComplete
                                        ? "Your personalized dashboard is ready"
                                        : "Our AI is preparing your personalized experience"}
                                </p>
                            </div>

                            {/* Analysis animation */}
                            <div className="space-y-4 max-w-sm mx-auto">
                                {analysisMessages.map((msg, index) => {
                                    const Icon = msg.icon;
                                    const isActive = index === analysisIndex;
                                    const isComplete = index < analysisIndex;

                                    return (
                                        <div
                                            key={index}
                                            className={`
                                                flex items-center gap-4 p-4 rounded-xl transition-all duration-500
                                                ${isActive
                                                    ? "bg-slate-800/80 border border-amber-500/30 scale-105"
                                                    : isComplete
                                                        ? "bg-slate-800/50 opacity-60"
                                                        : "bg-slate-800/30 opacity-30"
                                                }
                                            `}
                                        >
                                            <div
                                                className={`
                                                    w-10 h-10 rounded-full flex items-center justify-center
                                                    ${isComplete
                                                        ? "bg-green-500/20"
                                                        : isActive
                                                            ? "bg-amber-500/20"
                                                            : "bg-slate-700"
                                                    }
                                                `}
                                            >
                                                {isComplete ? (
                                                    <Check className="w-5 h-5 text-green-400" />
                                                ) : isActive ? (
                                                    <Icon className={`w-5 h-5 ${msg.color} animate-pulse`} />
                                                ) : (
                                                    <Icon className="w-5 h-5 text-slate-500" />
                                                )}
                                            </div>
                                            <span
                                                className={`
                                                    font-medium
                                                    ${isComplete
                                                        ? "text-green-400"
                                                        : isActive
                                                            ? msg.color
                                                            : "text-slate-500"
                                                    }
                                                `}
                                            >
                                                {msg.text}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Loading indicator */}
                            {!analysisComplete && (
                                <div className="flex justify-center mt-8">
                                    <div className="relative w-16 h-16">
                                        <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
                                        <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                                    </div>
                                </div>
                            )}

                            {/* Complete checkmark */}
                            {analysisComplete && (
                                <div className="flex justify-center mt-8">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center animate-scaleIn">
                                        <Check className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation buttons */}
                    {currentStep < 4 && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`
                                    flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all
                                    ${currentStep === 1
                                        ? "text-slate-600 cursor-not-allowed"
                                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                                    }
                                `}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>

                            <button
                                onClick={nextStep}
                                disabled={!canProceed()}
                                className={`
                                    flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all
                                    ${canProceed()
                                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/25"
                                        : "bg-slate-700 text-slate-500 cursor-not-allowed"
                                    }
                                `}
                            >
                                {currentStep === 3 ? "Analyze My Profile" : "Continue"}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-slate-500 text-sm mt-6">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.5);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
