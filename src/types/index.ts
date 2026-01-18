// =========================================
// GOLD STUDENTS CLUB - Type Definitions
// The Source of Truth for all data structures
// =========================================

// =========================================
// Enums
// =========================================

/** User's primary goal on the platform */
export enum UserGoal {
    Research = "Research",
    Startup = "Startup",
    Internship = "Internship",
}

/** User's experience level */
export enum ExperienceLevel {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Expert = "Expert",
}

/** User's trust level in the platform (Access Economy) */
export enum TrustLevel {
    Silver = "Silver",
    Gold = "Gold",
    Platinum = "Platinum",
}

/** Types of opportunities available */
export enum OpportunityType {
    Grant = "Grant",
    Job = "Job",
    Mentor = "Mentor",
    Housing = "Housing",
}

/** Competition level for "Silent Competition" feature */
export enum CompetitionLevel {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}

// =========================================
// Badge System
// =========================================

export interface Badge {
    id: string;
    name: string;
    icon: string; // Emoji or icon identifier
    description: string;
    earnedAt: Date;
}

// =========================================
// User Interface
// =========================================

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    university: string;
    country: string;

    // Skills & Interests (used for matching)
    skills: string[];
    interests: string[];

    // Goals & Experience
    goals: UserGoal[];
    xp_level: ExperienceLevel;

    // Trust Graph
    trust_level: TrustLevel;
    trust_score: number; // 0-100

    // Gamification
    badges: Badge[];
    xp_points: number;

    // Profile completeness for Opportunity Readiness Index
    profile_completeness: number; // 0-100

    // Timestamps
    joined_at: Date;
    last_active: Date;

    // Social Links (Case Requirement 3.1)
    linkedin_url?: string;
    github_url?: string;
}

// =========================================
// Opportunity Interface
// =========================================

export interface Opportunity {
    id: string;
    type: OpportunityType;
    title: string;
    description: string;

    // Requirements for matching
    requirements: string[];
    preferred_skills: string[];

    // Location & Timing
    location: string;
    deadline: Date;
    start_date?: Date;

    // Trust & Verification
    isVerified: boolean;
    source_partner: string;

    // Silent Competition Feature
    competition_level: CompetitionLevel;
    applicant_count?: number;

    // Additional metadata
    compensation?: string;
    duration?: string;
    remote_friendly: boolean;

    // Timestamps
    posted_at: Date;
    updated_at: Date;
}

// =========================================
// Match Result Interface
// =========================================

export interface MatchResult {
    opportunity_id: string;
    user_id: string;

    // Match score (0-100)
    score: number;

    // Gap Analysis for the user
    matching_skills: string[];
    missing_skills: string[];
    gap_analysis: string[]; // Array of reasons/recommendations

    // Confidence & Priority
    confidence: "Low" | "Medium" | "High";
    priority: "Normal" | "High" | "Urgent";

    // Timestamps
    calculated_at: Date;
}

// =========================================
// Trust Log (for Trust Graph feature)
// =========================================

export interface TrustLog {
    id: string;
    user_id: string;
    action: "verification" | "referral" | "endorsement" | "activity" | "penalty";
    points: number; // Can be positive or negative
    description: string;
    verified_by?: string;
    created_at: Date;
}

// =========================================
// Application Tracking
// =========================================

export type ApplicationStatus =
    | "draft"
    | "submitted"
    | "under_review"
    | "interview"
    | "accepted"
    | "rejected"
    | "withdrawn";

export interface Application {
    id: string;
    user_id: string;
    opportunity_id: string;
    status: ApplicationStatus;

    // Progress tracking
    submitted_at?: Date;
    last_updated: Date;

    // Notes & Feedback
    notes?: string;
    feedback?: string;
}

// =========================================
// Squad Feature (Team Formation)
// =========================================

export interface Squad {
    id: string;
    name: string;
    description: string;
    leader_id: string;
    member_ids: string[];

    // Focus area
    focus: string[];

    // Visibility
    is_public: boolean;

    // Timestamps
    created_at: Date;
}

// =========================================
// Notification System
// =========================================

export type NotificationType =
    | "match"
    | "deadline"
    | "application_update"
    | "squad_invite"
    | "badge_earned"
    | "trust_update";

export interface Notification {
    id: string;
    user_id: string;
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    read: boolean;
    created_at: Date;
}

// =========================================
// Opportunity Readiness Index
// =========================================

export interface ReadinessIndex {
    user_id: string;
    overall_score: number; // 0-100

    // Component scores
    profile_score: number;
    skills_score: number;
    activity_score: number;
    network_score: number;

    // Recommendations
    recommendations: string[];

    // Data points analyzed
    data_points_count: number;

    // Last calculation
    calculated_at: Date;
}
