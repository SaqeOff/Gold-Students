"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserGoal, ExperienceLevel, TrustLevel } from "@/types";
import { currentUser as mockUser } from "@/lib/mockData";

// =========================================
// USER CONTEXT
// Persists onboarding data via localStorage
// Falls back to mock data if no saved user
// =========================================

interface OnboardingData {
    name: string;
    university: string;
    country: string;
    password: string;
    goals: string[];
    skills: string[];
}

interface UserContextType {
    user: User;
    isNewUser: boolean;
    isLoaded: boolean;
    saveOnboardingData: (data: OnboardingData) => void;
    clearOnboardingData: () => void;
}

const STORAGE_KEY = "gold_students_onboarding_user";

// Create context with default mock user value (avoids null issues)
const UserContext = createContext<UserContextType>({
    user: mockUser,
    isNewUser: false,
    isLoaded: false,
    saveOnboardingData: () => { },
    clearOnboardingData: () => { },
});

/**
 * Converts onboarding form data to a full User object
 */
function createUserFromOnboarding(data: OnboardingData): User {
    return {
        id: `user_${Date.now()}`,
        name: data.name,
        email: `${data.name.toLowerCase().replace(/\s+/g, ".")}@${data.university.toLowerCase().replace(/\s+/g, "")}.edu`,
        avatar: undefined,
        university: data.university,
        country: data.country,
        skills: data.skills,
        interests: ["Technology", "Innovation", "Education"],
        goals: data.goals.map((g) => {
            if (g === "Startup") return UserGoal.Startup;
            if (g === "Research") return UserGoal.Research;
            return UserGoal.Internship;
        }),
        xp_level: ExperienceLevel.Beginner,
        trust_level: TrustLevel.Silver,
        trust_score: 75,
        xp_points: 500,
        profile_completeness: 85,
        badges: [
            {
                id: "badge_new",
                name: "New Member",
                icon: "🌟",
                description: "Welcome to Gold Students Club!",
                earnedAt: new Date(),
            },
        ],
        joined_at: new Date(),
        last_active: new Date(),
        linkedin_url: undefined,
        github_url: undefined,
    };
}

export function UserProvider({ children }: { children: ReactNode }) {
    // Initialize with mock user to avoid hydration mismatches
    const [user, setUser] = useState<User>(mockUser);
    const [isNewUser, setIsNewUser] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved user from localStorage on mount (client-side only)
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data: OnboardingData = JSON.parse(saved);
                setUser(createUserFromOnboarding(data));
                setIsNewUser(true);
            }
        } catch (e) {
            console.error("Failed to load saved user:", e);
        }
        setIsLoaded(true);
    }, []);

    // Save onboarding data to localStorage
    const saveOnboardingData = (data: OnboardingData) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            setUser(createUserFromOnboarding(data));
            setIsNewUser(true);
        } catch (e) {
            console.error("Failed to save user:", e);
        }
    };

    // Clear saved data (reset to mock user)
    const clearOnboardingData = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            setUser(mockUser);
            setIsNewUser(false);
        } catch (e) {
            console.error("Failed to clear user:", e);
        }
    };

    // Always render children - no blocking on load
    // Components can check isLoaded if they need to know
    return (
        <UserContext.Provider value={{ user, isNewUser, isLoaded, saveOnboardingData, clearOnboardingData }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}

// Export for components that need direct access to current user
export { mockUser };
