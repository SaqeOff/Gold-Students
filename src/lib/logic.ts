// =========================================
// GOLD STUDENTS CLUB - Core Business Logic
// Matching, Ranking, and Analytics Algorithms
// =========================================

import {
    User,
    Opportunity,
    MatchResult,
    UserGoal,
    OpportunityType,
    CompetitionLevel,
    ReadinessIndex,
} from "@/types";
import { normalizeTag, normalizeTags } from "./utils";

// =========================================
// 1. SKILL OVERLAP CALCULATION
// =========================================

export interface SkillOverlapResult {
    percentage: number;
    matching: string[];
    missing: string[];
}

/**
 * Calculates the overlap between user skills and required skills.
 * Uses normalized tags (lowercase, trimmed, underscores) for comparison.
 * 
 * @param userSkills - Array of user's skills
 * @param reqSkills - Array of required skills for an opportunity
 * @returns SkillOverlapResult with percentage, matching, and missing skills
 */
export function calculateSkillOverlap(
    userSkills: string[],
    reqSkills: string[]
): SkillOverlapResult {
    // Edge case: If no requirements, 100% match (no barriers)
    if (reqSkills.length === 0) {
        return { percentage: 100, matching: [], missing: [] };
    }

    // Normalize all skills for fair comparison
    const normalizedUserSkills = new Set(normalizeTags(userSkills));
    const normalizedReqSkills = normalizeTags(reqSkills);

    const matching: string[] = [];
    const missing: string[] = [];

    for (const skill of normalizedReqSkills) {
        if (normalizedUserSkills.has(skill)) {
            matching.push(skill);
        } else {
            missing.push(skill);
        }
    }

    // Safe division using Math.max(1, length) to prevent division by zero
    const percentage = Math.round(
        (matching.length / Math.max(1, normalizedReqSkills.length)) * 100
    );

    return { percentage, matching, missing };
}

// =========================================
// 2. OPPORTUNITY MATCH ENGINE (Killer Feature)
// Scoring: Skills (60) + Goal Alignment (20) + Context (20) = 100
// =========================================

/**
 * Maps Opportunity Type to corresponding User Goals.
 * Used for goal alignment scoring.
 */
const OPPORTUNITY_TO_GOAL_MAP: Record<OpportunityType, UserGoal[]> = {
    [OpportunityType.Grant]: [UserGoal.Research],
    [OpportunityType.Job]: [UserGoal.Internship, UserGoal.Startup],
    [OpportunityType.Mentor]: [UserGoal.Research, UserGoal.Startup],
    [OpportunityType.Housing]: [UserGoal.Research, UserGoal.Internship],
};

/**
 * Checks if opportunity type aligns with any of the user's goals.
 */
function checkGoalAlignment(
    userGoals: UserGoal[],
    opportunityType: OpportunityType
): boolean {
    const alignedGoals = OPPORTUNITY_TO_GOAL_MAP[opportunityType] || [];
    return userGoals.some((goal) => alignedGoals.includes(goal));
}

/**
 * Checks if any user interests appear in the opportunity text.
 */
function checkInterestAlignment(
    userInterests: string[],
    opportunity: Opportunity
): boolean {
    const searchText = `${opportunity.title} ${opportunity.description}`.toLowerCase();
    const normalizedInterests = normalizeTags(userInterests);

    return normalizedInterests.some((interest) => {
        const searchTerm = interest.replace(/_/g, " ");
        return searchText.includes(searchTerm);
    });
}

/**
 * Extracts country from location string.
 * Handles formats like "Berlin, Germany" or "Remote / Bay Area"
 */
function extractCountry(location: string): string {
    const parts = location.split(",");
    if (parts.length > 1) {
        return parts[parts.length - 1].trim().toLowerCase();
    }
    return location.toLowerCase();
}

/**
 * Calculates match score between a user and an opportunity.
 * 
 * Scoring Formula (Total 100 points):
 * - A. Skill Match (60 pts): 60 * (hit / Math.max(1, req.length))
 * - B. Goal Alignment (20 pts): +20 if opportunity type maps to user goal
 * - C. Context Match (20 pts): +10 country match, +10 remote/global
 * 
 * @param user - The user profile
 * @param opportunity - The opportunity to match against
 * @returns MatchResult with score, gap_analysis, and reasons
 */
export function calculateMatchScore(
    user: User,
    opportunity: Opportunity
): MatchResult {
    let totalScore = 0;
    const gapAnalysis: string[] = [];
    const reasons: string[] = [];

    // =========================================
    // A. SKILL MATCH (60 points max)
    // Formula: 60 * (hit / Math.max(1, req.length))
    // =========================================
    const skillOverlap = calculateSkillOverlap(user.skills, opportunity.requirements);
    const skillScore = Math.round(60 * (skillOverlap.matching.length / Math.max(1, opportunity.requirements.length)));
    totalScore += skillScore;

    // Populate gap_analysis with missing skills (Innovation feature)
    if (skillOverlap.missing.length > 0) {
        skillOverlap.missing.forEach((skill) => {
            const readableSkill = skill.replace(/_/g, " ");
            gapAnalysis.push(`Missing required skill: ${readableSkill}`);
        });
    }

    if (skillOverlap.matching.length > 0) {
        reasons.push(`Matches ${skillOverlap.matching.length} of ${opportunity.requirements.length} required skills`);
    }

    // =========================================
    // B. GOAL ALIGNMENT (20 points max)
    // +20 if opportunity type maps to user goal
    // =========================================
    if (checkGoalAlignment(user.goals, opportunity.type)) {
        totalScore += 20;
        const goalNames = user.goals.join(", ");
        reasons.push(`Fits your goal: ${goalNames}`);
    } else {
        gapAnalysis.push(`Opportunity type "${opportunity.type}" may not align with your goals`);
    }

    // =========================================
    // C. CONTEXT MATCH (20 points max)
    // +10 country match OR "Global", +10 remote friendly
    // =========================================
    const oppCountry = extractCountry(opportunity.location);
    const userCountry = user.country.toLowerCase();

    // Country/Location match (+10 points)
    if (
        oppCountry.includes(userCountry) ||
        oppCountry.includes("global") ||
        oppCountry.includes("any") ||
        opportunity.location.toLowerCase().includes("remote")
    ) {
        totalScore += 10;
        if (opportunity.remote_friendly) {
            reasons.push("Remote-friendly opportunity");
        } else if (oppCountry.includes("global")) {
            reasons.push("Open to applicants globally");
        }
    } else {
        gapAnalysis.push(`Location: ${opportunity.location} (may require relocation)`);
    }

    // Remote/Verified bonus (+10 points)
    if (opportunity.isVerified) {
        totalScore += 10;
        reasons.push("Verified by trusted partner: " + opportunity.source_partner);
    } else {
        gapAnalysis.push("⚠️ Unverified source - proceed with caution");
    }

    // =========================================
    // Determine confidence based on score
    // =========================================
    let confidence: "Low" | "Medium" | "High";
    if (totalScore >= 75) {
        confidence = "High";
    } else if (totalScore >= 50) {
        confidence = "Medium";
    } else {
        confidence = "Low";
    }

    // =========================================
    // Determine priority based on deadline
    // =========================================
    const daysUntilDeadline = Math.ceil(
        (opportunity.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    let priority: "Normal" | "High" | "Urgent";
    if (daysUntilDeadline <= 7) {
        priority = "Urgent";
        reasons.push(`⏰ Deadline in ${daysUntilDeadline} days - Apply soon!`);
    } else if (daysUntilDeadline <= 14) {
        priority = "High";
    } else {
        priority = "Normal";
    }

    // Add interest match as bonus reason
    if (checkInterestAlignment(user.interests, opportunity)) {
        reasons.push("Matches your interests");
    }

    return {
        opportunity_id: opportunity.id,
        user_id: user.id,
        score: Math.min(100, Math.max(0, totalScore)), // Clamp to 0-100
        matching_skills: skillOverlap.matching,
        missing_skills: skillOverlap.missing,
        gap_analysis: gapAnalysis,
        confidence,
        priority,
        calculated_at: new Date(),
    };
}

// =========================================
// 3. PEER MATCHING ENGINE (Community Feature)
// Scoring: Skills (50) + Goals (30) + Context (20) = 100
// =========================================

export interface PeerMatchResult {
    score: number;
    sharedSkills: string[];
    sharedGoals: UserGoal[];
    uniqueSkillsA: string[];
    uniqueSkillsB: string[];
    sameUniversity: boolean;
    sameCountry: boolean;
    reasons: string[];
}

/**
 * Calculates peer match score using Jaccard Similarity + Goal overlap.
 * 
 * Scoring Formula (Total 100 points):
 * - A. Skills Overlap (50 pts): Jaccard Similarity * 50
 * - B. Goals Overlap (30 pts): (Intersection / userA.goals.length) * 30
 * - C. Context Boost (20 pts): +10 same university, +10 same country
 * 
 * @param userA - First user
 * @param userB - Second user
 * @returns PeerMatchResult with score and compatibility breakdown
 */
export function calculatePeerMatch(userA: User, userB: User): PeerMatchResult {
    let totalScore = 0;
    const reasons: string[] = [];

    // =========================================
    // A. SKILLS OVERLAP (50 points max)
    // Jaccard Similarity: (Intersection / Union) * 50
    // =========================================
    const skillsA = new Set(normalizeTags(userA.skills));
    const skillsB = new Set(normalizeTags(userB.skills));

    const intersection = new Set([...skillsA].filter((x) => skillsB.has(x)));
    const union = new Set([...skillsA, ...skillsB]);

    // Jaccard similarity (safe division)
    let skillsScore = 0;
    if (union.size > 0) {
        skillsScore = (intersection.size / union.size) * 50;
    }
    totalScore += skillsScore;

    if (intersection.size > 0) {
        reasons.push(`${intersection.size} shared skills`);
    }

    // =========================================
    // B. GOALS OVERLAP (30 points max)
    // Formula: (Intersection / userA.goals.length) * 30
    // =========================================
    const goalsA = new Set(userA.goals);
    const goalsB = new Set(userB.goals);
    const sharedGoals = userA.goals.filter((g) => goalsB.has(g));

    let goalsScore = 0;
    if (userA.goals.length > 0) {
        goalsScore = (sharedGoals.length / userA.goals.length) * 30;
    }
    totalScore += goalsScore;

    if (sharedGoals.length > 0) {
        reasons.push(`Shared goals: ${sharedGoals.join(", ")}`);
    }

    // =========================================
    // C. CONTEXT BOOST (20 points max)
    // +10 same university, +10 same country
    // =========================================
    const sameUniversity =
        userA.university.toLowerCase() === userB.university.toLowerCase();
    const sameCountry =
        userA.country.toLowerCase() === userB.country.toLowerCase();

    if (sameUniversity) {
        totalScore += 10;
        reasons.push(`Same university: ${userA.university}`);
    }

    if (sameCountry) {
        totalScore += 10;
        reasons.push(`Same country: ${userA.country}`);
    }

    // Calculate unique skills
    const uniqueSkillsA = [...skillsA].filter((x) => !skillsB.has(x));
    const uniqueSkillsB = [...skillsB].filter((x) => !skillsA.has(x));

    return {
        score: Math.min(100, Math.round(totalScore)),
        sharedSkills: [...intersection],
        sharedGoals,
        uniqueSkillsA,
        uniqueSkillsB,
        sameUniversity,
        sameCountry,
        reasons,
    };
}

// =========================================
// 4. READINESS INDEX CALCULATION
// For Dashboard ORI display
// =========================================

const READINESS_LEVELS = [
    { min: 90, label: "Market Ready", emoji: "🚀" },
    { min: 75, label: "Highly Competitive", emoji: "⭐" },
    { min: 60, label: "Strong Candidate", emoji: "💪" },
    { min: 40, label: "Emerging Talent", emoji: "🌱" },
    { min: 0, label: "Getting Started", emoji: "📚" },
];

/**
 * Calculates the Opportunity Readiness Index for a user.
 * 
 * Composite Score (0-100):
 * - Profile Completeness: 25%
 * - Trust Score: 25%
 * - Badges Count: 25% (Cap at 4 badges = max)
 * - Skills Count: 25% (Cap at 10 skills = max)
 */
export function calculateReadinessIndex(user: User): ReadinessIndex {
    const recommendations: string[] = [];

    // Component 1: Profile Completeness (25%)
    const profileScore = user.profile_completeness * 0.25;
    if (user.profile_completeness < 100) {
        recommendations.push(
            `Complete your profile (${100 - user.profile_completeness}% remaining)`
        );
    }

    // Component 2: Trust Score (25%)
    const trustScore = user.trust_score * 0.25;
    if (user.trust_score < 80) {
        recommendations.push("Increase trust score through verifications and referrals");
    }

    // Component 3: Badges Count (25%) - Cap at 4 badges
    const badgesCapped = Math.min(user.badges.length, 4);
    const badgesScore = (badgesCapped / 4) * 100 * 0.25;
    if (user.badges.length < 4) {
        recommendations.push(`Earn ${4 - user.badges.length} more badges to maximize score`);
    }

    // Component 4: Skills Count (25%) - Cap at 10 skills
    const skillsCapped = Math.min(user.skills.length, 10);
    const skillsScore = (skillsCapped / 10) * 100 * 0.25;
    if (user.skills.length < 10) {
        recommendations.push(`Add ${10 - user.skills.length} more skills to your profile`);
    }

    const overallScore = Math.round(
        profileScore + trustScore + badgesScore + skillsScore
    );

    return {
        user_id: user.id,
        overall_score: overallScore,
        profile_score: Math.round(user.profile_completeness),
        skills_score: Math.round((skillsCapped / 10) * 100),
        activity_score: Math.round(user.trust_score),
        network_score: Math.round((badgesCapped / 4) * 100),
        recommendations,
        data_points_count: 4 + user.skills.length + user.badges.length,
        calculated_at: new Date(),
    };
}

/**
 * Gets the readiness level label for a given score.
 */
export function getReadinessLevel(score: number): { label: string; emoji: string } {
    const level = READINESS_LEVELS.find((l) => score >= l.min);
    return level || READINESS_LEVELS[READINESS_LEVELS.length - 1];
}

// =========================================
// 5. SILENT COMPETITION INDICATOR
// User-friendly competition labels
// =========================================

/**
 * Converts competition level enum to user-friendly display text.
 * Designed to reduce applicant anxiety (UX innovation).
 */
export function formatCompetitionLabel(level: CompetitionLevel): string {
    switch (level) {
        case CompetitionLevel.High:
            return "🔥 High Traffic";
        case CompetitionLevel.Medium:
            return "⚖️ Moderate Competition";
        case CompetitionLevel.Low:
            return "💎 Early Applicant Advantage";
        default:
            return "📊 Unknown";
    }
}

/**
 * Gets competition level color for UI styling.
 */
export function getCompetitionColor(level: CompetitionLevel): string {
    switch (level) {
        case CompetitionLevel.High:
            return "text-red-500";
        case CompetitionLevel.Medium:
            return "text-amber-500";
        case CompetitionLevel.Low:
            return "text-green-500";
        default:
            return "text-slate-400";
    }
}

// Keep the old name as alias for backward compatibility
export const formatCompetitionLevel = formatCompetitionLabel;

// =========================================
// 6. RANKING & RECOMMENDATIONS ENGINE
// Multi-criteria sorting with filters
// =========================================

export interface FilterOptions {
    type?: OpportunityType;
    country?: string;
    minScore?: number;
    competition_level?: CompetitionLevel;
    verifiedOnly?: boolean;
    remoteOnly?: boolean;
}

export interface RankedOpportunity extends Opportunity {
    matchResult: MatchResult;
}

/**
 * Ranks opportunities for a user with optional filtering.
 * 
 * Sorting Priority (Strict Order):
 * 1. Verification: isVerified=true MUST come first (Trust Graph)
 * 2. Score: Higher match score first
 * 3. Deadline: Soonest deadline first
 */
export function rankOpportunities(
    user: User,
    opportunities: Opportunity[],
    filters?: FilterOptions
): RankedOpportunity[] {
    // Step 1: Calculate match scores for all opportunities
    let rankedOpps: RankedOpportunity[] = opportunities.map((opp) => ({
        ...opp,
        matchResult: calculateMatchScore(user, opp),
    }));

    // Step 2: Apply filters
    if (filters) {
        if (filters.type) {
            rankedOpps = rankedOpps.filter((opp) => opp.type === filters.type);
        }

        if (filters.country) {
            const filterCountry = filters.country.toLowerCase();
            rankedOpps = rankedOpps.filter(
                (opp) =>
                    opp.location.toLowerCase().includes(filterCountry) ||
                    opp.location.toLowerCase().includes("global") ||
                    opp.remote_friendly
            );
        }

        if (filters.minScore !== undefined) {
            rankedOpps = rankedOpps.filter(
                (opp) => opp.matchResult.score >= filters.minScore!
            );
        }

        if (filters.competition_level) {
            rankedOpps = rankedOpps.filter(
                (opp) => opp.competition_level === filters.competition_level
            );
        }

        if (filters.verifiedOnly) {
            rankedOpps = rankedOpps.filter((opp) => opp.isVerified);
        }

        if (filters.remoteOnly) {
            rankedOpps = rankedOpps.filter((opp) => opp.remote_friendly);
        }
    }

    // Step 3: Sort by priority criteria (STRICT ORDER)
    rankedOpps.sort((a, b) => {
        // Priority 1: Verified opportunities MUST come first (Trust Graph)
        if (a.isVerified !== b.isVerified) {
            return a.isVerified ? -1 : 1;
        }

        // Priority 2: Higher match score first
        if (a.matchResult.score !== b.matchResult.score) {
            return b.matchResult.score - a.matchResult.score;
        }

        // Priority 3: Soonest deadline first
        return a.deadline.getTime() - b.deadline.getTime();
    });

    return rankedOpps;
}

// =========================================
// HELPER FUNCTIONS
// =========================================

/**
 * Gets top N matching opportunities for a user.
 */
export function getTopMatches(
    user: User,
    opportunities: Opportunity[],
    limit: number = 5
): RankedOpportunity[] {
    return rankOpportunities(user, opportunities).slice(0, limit);
}

/**
 * Gets opportunities with urgent deadlines (within 7 days).
 */
export function getUrgentOpportunities(
    user: User,
    opportunities: Opportunity[]
): RankedOpportunity[] {
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    return rankOpportunities(user, opportunities).filter(
        (opp) => opp.deadline.getTime() - now <= sevenDays && opp.deadline.getTime() > now
    );
}

/**
 * Gets opportunities where user is missing only 1-2 skills (quick wins).
 */
export function getQuickWinOpportunities(
    user: User,
    opportunities: Opportunity[]
): RankedOpportunity[] {
    return rankOpportunities(user, opportunities).filter(
        (opp) =>
            opp.matchResult.missing_skills.length <= 2 &&
            opp.matchResult.missing_skills.length > 0
    );
}

/**
 * Gets recommended peers for squad formation.
 */
export function getRecommendedPeers(
    currentUser: User,
    allUsers: User[],
    limit: number = 5
): Array<{ user: User; match: PeerMatchResult }> {
    return allUsers
        .filter((u) => u.id !== currentUser.id)
        .map((user) => ({
            user,
            match: calculatePeerMatch(currentUser, user),
        }))
        .sort((a, b) => b.match.score - a.match.score)
        .slice(0, limit);
}
