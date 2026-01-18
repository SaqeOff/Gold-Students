"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// =========================================
// AUTH CONTEXT - ROBUST AUTHENTICATION ENGINE
// Handles register, login, logout with localStorage persistence
// =========================================

// User data structure
export interface AuthUser {
    id: string;
    name: string;
    email: string;
    password?: string; // Only stored locally, never exposed
    university?: string;
    country?: string;
    skills: string[];
    goals: string[];
    role: "admin" | "student";
    avatar?: string;
    createdAt: string;
}

// Registration data from onboarding
export interface RegistrationData {
    name: string;
    email: string;
    password: string;
    university: string;
    country: string;
    skills: string[];
    goals: string[];
}

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    isAdmin: boolean;
    isAuthenticated: boolean;
    register: (data: RegistrationData) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    toast: { message: string; type: "success" | "error" } | null;
    clearToast: () => void;
}

// Storage keys
const USER_DATA_KEY = "gsc_user_data";
const AUTH_CREDS_KEY = "gsc_auth_creds";
const SESSION_KEY = "gsc_session";

// Admin credentials
const ADMIN_EMAIL = "admin";
const ADMIN_PASSWORD = "13389392";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const router = useRouter();

    // Check for existing session on mount
    useEffect(() => {
        try {
            const session = localStorage.getItem(SESSION_KEY);
            if (session) {
                const sessionData = JSON.parse(session);
                if (sessionData.role === "admin") {
                    // Restore admin session
                    setUser({
                        id: "admin_001",
                        name: "Super Admin",
                        email: "admin@goldstudents.club",
                        skills: [],
                        goals: [],
                        role: "admin",
                        createdAt: new Date().toISOString(),
                    });
                } else {
                    // Restore student session from saved data
                    const userData = localStorage.getItem(USER_DATA_KEY);
                    if (userData) {
                        const parsed = JSON.parse(userData);
                        setUser({
                            ...parsed,
                            role: "student",
                        });
                    }
                }
            }
        } catch (e) {
            console.error("Failed to restore session:", e);
            localStorage.removeItem(SESSION_KEY);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Clear toast after 3 seconds
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    // =========================================
    // REGISTER - Create new account
    // =========================================
    const register = async (data: RegistrationData): Promise<void> => {
        console.log("🔵 Starting registration process...", data);

        // Create user object
        const newUser: AuthUser = {
            id: `user_${Date.now()}`,
            name: data.name,
            email: data.email.toLowerCase().trim(),
            university: data.university,
            country: data.country,
            skills: data.skills,
            goals: data.goals,
            role: "student",
            createdAt: new Date().toISOString(),
        };

        console.log("🔵 User object created:", newUser);

        // Save full user data
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));
        console.log("🔵 Saved to localStorage:", USER_DATA_KEY);

        // Save credentials separately for login verification
        localStorage.setItem(AUTH_CREDS_KEY, JSON.stringify({
            email: data.email.toLowerCase().trim(),
            password: data.password,
        }));
        console.log("🔵 Saved credentials:", AUTH_CREDS_KEY);

        // Create session
        localStorage.setItem(SESSION_KEY, JSON.stringify({ role: "student", email: newUser.email }));
        console.log("🔵 Created session:", SESSION_KEY);

        // Set user state
        setUser(newUser);
        console.log("🔵 User state updated");

        // Show success toast
        setToast({ message: "Account created successfully! Welcome to Gold Students Club.", type: "success" });
        console.log("🔵 Toast notification shown");

        // Redirect to dashboard
        console.log("🔵 Attempting redirect to / in 500ms...");
        setTimeout(() => {
            console.log("🔵 Executing router.push(\"/\")");
            router.push("/");
        }, 500);

        console.log("🔵 Registration complete!");
    };

    // =========================================
    // LOGIN - Authenticate existing user
    // =========================================
    const login = async (email: string, password: string): Promise<void> => {
        const normalizedEmail = email.toLowerCase().trim();

        // Check for Admin login
        if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const adminUser: AuthUser = {
                id: "admin_001",
                name: "Super Admin",
                email: "admin@goldstudents.club",
                skills: [],
                goals: [],
                role: "admin",
                createdAt: new Date().toISOString(),
            };

            localStorage.setItem(SESSION_KEY, JSON.stringify({ role: "admin" }));
            setUser(adminUser);
            setToast({ message: "Welcome back, Admin!", type: "success" });
            router.push("/admin");
            return;
        }

        // Check for admin with wrong password
        if (normalizedEmail === ADMIN_EMAIL) {
            throw new Error("Invalid admin password.");
        }

        // Check stored credentials
        try {
            const credsData = localStorage.getItem(AUTH_CREDS_KEY);
            if (!credsData) {
                throw new Error("Account not found. Please register first.");
            }

            const creds = JSON.parse(credsData);

            // Strict email and password match
            if (creds.email === normalizedEmail && creds.password === password) {
                // Load full user data
                const userData = localStorage.getItem(USER_DATA_KEY);
                if (!userData) {
                    throw new Error("User data corrupted. Please register again.");
                }

                const parsedUser = JSON.parse(userData) as AuthUser;

                // Create session
                localStorage.setItem(SESSION_KEY, JSON.stringify({ role: "student", email: normalizedEmail }));

                setUser({ ...parsedUser, role: "student" });
                setToast({ message: `Welcome back, ${parsedUser.name}!`, type: "success" });
                router.push("/");
                return;
            } else {
                throw new Error("Invalid email or password.");
            }
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            throw new Error("Login failed. Please try again.");
        }
    };

    // =========================================
    // LOGOUT - Clear session (keep data for demo)
    // =========================================
    const logout = () => {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
        setToast({ message: "Logged out successfully.", type: "success" });
        router.push("/login");
    };

    const clearToast = () => setToast(null);

    const value: AuthContextType = {
        user,
        isLoading,
        isAdmin: user?.role === "admin",
        isAuthenticated: !!user,
        register,
        login,
        logout,
        toast,
        clearToast,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
            {/* Global Toast Notification */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-[200] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slideUp ${toast.type === "success"
                    ? "bg-green-500/90 text-white"
                    : "bg-red-500/90 text-white"
                    }`}>
                    <span className="text-lg">{toast.type === "success" ? "✓" : "✕"}</span>
                    <p className="font-medium">{toast.message}</p>
                </div>
            )}
            <style jsx global>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
