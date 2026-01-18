// =========================================
// GOLD STUDENTS CLUB - AI Analysis Engine
// Rule-based "AI" logic that reacts to user data
// =========================================

import { User, UserGoal } from "@/types";
import { calculateReadinessIndex } from "./logic";
import { opportunities } from "./mockData";

// =========================================
// Analysis Result Types
// =========================================

export interface AnalysisResult {
    // Profile Assessment
    profileStrength: number; // 0-100
    profileTier: "Elite" | "Gold" | "Rising" | "Emerging";
    tierEmoji: string;

    // AI Verdict
    verdict: string;
    verdictType: "success" | "warning" | "info";

    // Insights
    insights: Insight[];

    // Top Recommendations
    recommendations: Recommendation[];

    // Metadata
    analyzedAt: Date;
    dataPointsAnalyzed: number;
}

export interface Insight {
    category: "trust" | "skills" | "goals" | "network" | "activity";
    title: string;
    description: string;
    severity: "positive" | "neutral" | "critical";
    icon: string;
}

export interface Recommendation {
    id: string;
    title: string;
    type: "opportunity" | "action" | "community";
    reason: string;
    link: string;
    priority: "high" | "medium" | "low";
}

// =========================================
// Profile Tier Calculation
// =========================================

function calculateProfileTier(score: number): { tier: AnalysisResult["profileTier"]; emoji: string } {
    if (score >= 85) return { tier: "Elite", emoji: "👑" };
    if (score >= 70) return { tier: "Gold", emoji: "🏆" };
    if (score >= 50) return { tier: "Rising", emoji: "⭐" };
    return { tier: "Emerging", emoji: "🌱" };
}

// =========================================
// Generate Trust Insight
// =========================================

function generateTrustInsight(user: User): Insight {
    if (user.trust_score > 90) {
        return {
            category: "trust",
            title: "Elite Tier Verified",
            description: "Your trust score places you in the top 5% of the community. Premium opportunities are unlocked.",
            severity: "positive",
            icon: "🛡️",
        };
    } else if (user.trust_score >= 70) {
        return {
            category: "trust",
            title: "Trusted Member",
            description: "Your verification status is strong. Consider getting endorsements to reach Elite tier.",
            severity: "positive",
            icon: "✓",
        };
    } else if (user.trust_score >= 50) {
        return {
            category: "trust",
            title: "Trust Building Required",
            description: "Add more verifications and get peer endorsements to unlock better opportunities.",
            severity: "neutral",
            icon: "📈",
        };
    } else {
        return {
            category: "trust",
            title: "Verification Recommended",
            description: "Your trust score is below average. Verify your email and university to boost credibility.",
            severity: "critical",
            icon: "⚠️",
        };
    }
}

// =========================================
// Generate Skills Insight
// =========================================

function generateSkillsInsight(user: User): Insight {
    const skillCount = user.skills.length;

    if (skillCount >= 8) {
        return {
            category: "skills",
            title: "Skill Portfolio: Excellent",
            description: `Your ${skillCount} skills maximize matching potential. You qualify for 95% of opportunities.`,
            severity: "positive",
            icon: "💎",
        };
    } else if (skillCount >= 5) {
        return {
            category: "skills",
            title: "Skill Portfolio: Strong",
            description: `${skillCount} skills is a solid foundation. Adding 2-3 more will unlock additional matches.`,
            severity: "positive",
            icon: "🎯",
        };
    } else if (skillCount >= 3) {
        return {
            category: "skills",
            title: "Skill Gap Detected",
            description: "Adding more skills will significantly improve your opportunity match rate.",
            severity: "neutral",
            icon: "📝",
        };
    } else {
        return {
            category: "skills",
            title: "Critical Gap: Skills Required",
            description: "Your profile needs more skills to enable AI matching. Add at least 5 skills to proceed.",
            severity: "critical",
            icon: "🚨",
        };
    }
}

// =========================================
// Generate Goals Insight
// =========================================

function generateGoalsInsight(user: User): Insight | null {
    if (user.goals.includes(UserGoal.Startup)) {
        return {
            category: "goals",
            title: "Startup Path Detected",
            description: "Focus on finding a technical co-founder in Community. AI has identified 12 potential matches.",
            severity: "positive",
            icon: "🚀",
        };
    } else if (user.goals.includes(UserGoal.Research)) {
        return {
            category: "goals",
            title: "Research Track Active",
            description: "PhD mentorship opportunities are prioritized in your feed. 5 grants match your profile.",
            severity: "positive",
            icon: "🔬",
        };
    } else if (user.goals.includes(UserGoal.Internship)) {
        return {
            category: "goals",
            title: "Career Acceleration Mode",
            description: "Your profile is optimized for internship matching. Top companies are in your feed.",
            severity: "positive",
            icon: "💼",
        };
    }
    return null;
}

// =========================================
// Generate Verdict
// =========================================

function generateVerdict(user: User, ori: number): { verdict: string; type: AnalysisResult["verdictType"] } {
    const factors: string[] = [];

    // Trust factor
    if (user.trust_score > 90) {
        factors.push("elite verification status");
    } else if (user.trust_score < 50) {
        return {
            verdict: "Priority Action: Your trust score needs attention. Complete verification steps to unlock opportunities.",
            type: "warning",
        };
    }

    // Skills factor
    if (user.skills.length < 3) {
        return {
            verdict: "Profile Incomplete: Add more skills to activate AI matching engine. Current match capability is limited.",
            type: "warning",
        };
    }

    // ORI factor
    if (ori >= 80) {
        factors.push("high readiness index");
    }

    // Generate positive verdict
    if (factors.length >= 2) {
        return {
            verdict: `Exceptional Profile: Your ${factors.join(" and ")} position you in the top tier. You are highly competitive for all opportunities in your feed.`,
            type: "success",
        };
    } else if (factors.length === 1) {
        return {
            verdict: `Strong Foundation: Your ${factors[0]} is a valuable asset. Continue building your profile to maximize opportunities.`,
            type: "success",
        };
    }

    return {
        verdict: "Good Progress: Your profile is on track. Focus on the recommendations below to accelerate your journey.",
        type: "info",
    };
}

// =========================================
// Generate Recommendations
// =========================================

function generateRecommendations(user: User): Recommendation[] {
    const recs: Recommendation[] = [];

    // Find top matching opportunities
    const topOpportunities = opportunities
        .filter((opp) => opp.isVerified)
        .slice(0, 2)
        .map((opp, index) => ({
            id: opp.id,
            title: opp.title,
            type: "opportunity" as const,
            reason: index === 0 ? "Highest match score for your skills" : "Deadline approaching - act fast",
            link: `/opportunities/${opp.id}`,
            priority: "high" as const,
        }));

    recs.push(...topOpportunities);

    // Goal-based recommendations
    if (user.goals.includes(UserGoal.Startup)) {
        recs.push({
            id: "squad-finder",
            title: "Find Your Co-Founder",
            type: "community",
            reason: "12 founders with complementary skills are active this week",
            link: "/community?tab=squad",
            priority: "high",
        });
    }

    // Profile improvement recommendation
    if (user.skills.length < 5) {
        recs.push({
            id: "add-skills",
            title: "Complete Your Skill Profile",
            type: "action",
            reason: `Add ${5 - user.skills.length} more skills to unlock additional matches`,
            link: "/profile",
            priority: "medium",
        });
    }

    return recs.slice(0, 3); // Return top 3
}

// =========================================
// MAIN EXPORT: Generate User Report
// =========================================

export function generateUserReport(user: User): AnalysisResult {
    // Calculate readiness index
    const readinessIndex = calculateReadinessIndex(user);
    const ori = readinessIndex.overall_score;

    // Get profile tier
    const { tier, emoji } = calculateProfileTier(ori);

    // Generate insights
    const insights: Insight[] = [
        generateTrustInsight(user),
        generateSkillsInsight(user),
    ];

    const goalsInsight = generateGoalsInsight(user);
    if (goalsInsight) {
        insights.push(goalsInsight);
    }

    // Generate verdict
    const { verdict, type: verdictType } = generateVerdict(user, ori);

    // Generate recommendations
    const recommendations = generateRecommendations(user);

    return {
        profileStrength: ori,
        profileTier: tier,
        tierEmoji: emoji,
        verdict,
        verdictType,
        insights,
        recommendations,
        analyzedAt: new Date(),
        dataPointsAnalyzed: 4 + user.skills.length + user.badges.length + user.goals.length,
    };
}
