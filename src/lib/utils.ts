// =========================================
// GOLD STUDENTS CLUB - Utility Functions
// Helper functions for data processing
// =========================================

/**
 * Normalizes a tag string for consistent matching.
 * - Trims whitespace
 * - Converts to lowercase
 * - Replaces spaces with underscores
 * 
 * @example normalizeTag("Machine Learning ") => "machine_learning"
 * @example normalizeTag("  Data Science  ") => "data_science"
 */
export function normalizeTag(tag: string): string {
    return tag
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");
}

/**
 * Normalizes an array of tags for consistent matching.
 */
export function normalizeTags(tags: string[]): string[] {
    return tags.map(normalizeTag);
}

/**
 * Formats a number as currency.
 * 
 * @example formatCurrency(5000) => "$5,000"
 * @example formatCurrency(5000, "EUR") => "€5,000"
 */
export function formatCurrency(
    amount: number,
    currency: "USD" | "EUR" | "GBP" = "USD"
): string {
    const symbols: Record<string, string> = {
        USD: "$",
        EUR: "€",
        GBP: "£",
    };

    const formatter = new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return `${symbols[currency]}${formatter.format(amount)}`;
}

/**
 * Formats a date in a human-readable format.
 * 
 * @example formatDate(new Date()) => "Jan 17, 2026"
 */
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

/**
 * Formats a date as a relative time string.
 * 
 * @example formatRelativeTime(new Date(Date.now() - 3600000)) => "1 hour ago"
 */
export function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffSeconds < 60) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    return `${diffMonths}mo ago`;
}

/**
 * Calculates the number of days until a deadline.
 */
export function daysUntilDeadline(deadline: Date): number {
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Checks if a deadline is approaching (within 7 days).
 */
export function isDeadlineApproaching(deadline: Date): boolean {
    const days = daysUntilDeadline(deadline);
    return days > 0 && days <= 7;
}

/**
 * Checks if a deadline has passed.
 */
export function isDeadlinePassed(deadline: Date): boolean {
    return daysUntilDeadline(deadline) < 0;
}

/**
 * Generates a unique ID (simplified version).
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Truncates text to a maximum length with ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
}

/**
 * Calculates skill overlap between user skills and requirements.
 */
export function calculateSkillOverlap(
    userSkills: string[],
    requirements: string[]
): {
    matching: string[];
    missing: string[];
    percentage: number;
} {
    const normalizedUserSkills = normalizeTags(userSkills);
    const normalizedRequirements = normalizeTags(requirements);

    const matching = normalizedRequirements.filter((req) =>
        normalizedUserSkills.includes(req)
    );
    const missing = normalizedRequirements.filter(
        (req) => !normalizedUserSkills.includes(req)
    );

    const percentage =
        normalizedRequirements.length > 0
            ? Math.round((matching.length / normalizedRequirements.length) * 100)
            : 100;

    return { matching, missing, percentage };
}

// =========================================
// PLACEHOLDER: Match Score Algorithm
// =========================================

/**
 * TODO: Implement the full match score calculation algorithm.
 *
 * The algorithm should consider:
 *
 * 1. SKILL MATCH (40% weight)
 *    - Calculate overlap between user skills and opportunity requirements
 *    - Consider preferred skills as bonus points
 *    - Normalize skill names before comparison
 *
 * 2. INTEREST ALIGNMENT (20% weight)
 *    - Match user interests with opportunity type/description
 *    - Use keyword extraction for semantic matching
 *
 * 3. GOAL COMPATIBILITY (15% weight)
 *    - Check if opportunity type aligns with user goals
 *    - Research -> Grants, Mentors
 *    - Startup -> Mentors, Jobs
 *    - Internship -> Jobs, Grants
 *
 * 4. EXPERIENCE LEVEL (15% weight)
 *    - Match user xp_level with opportunity complexity
 *    - Beginner -> Low competition opportunities
 *    - Expert -> High competition opportunities
 *
 * 5. LOCATION & TIMING (10% weight)
 *    - Consider remote_friendly flag
 *    - Check deadline feasibility
 *    - Match location preferences
 *
 * GAP ANALYSIS OUTPUT:
 * - List specific missing skills
 * - Suggest learning resources
 * - Estimate time to fill gaps
 * - Prioritize quick wins vs long-term investments
 *
 * @param user - The user profile
 * @param opportunity - The opportunity to match against
 * @returns MatchResult with score and gap analysis
 */
// export function calculateMatchScore(
//   user: User,
//   opportunity: Opportunity
// ): MatchResult {
//   // Implementation coming in Task 3
// }

/**
 * TODO: Implement Trust Score calculation.
 *
 * Trust score is influenced by:
 * - Profile verification status
 * - Activity consistency
 * - Referrals given/received
 * - Endorsements from verified members
 * - Time on platform
 * - Application success rate
 */
// export function calculateTrustScore(trustLogs: TrustLog[]): number {
//   // Implementation coming in Task 3
// }

/**
 * TODO: Implement Opportunity Readiness Index calculation.
 *
 * Components:
 * - Profile completeness (25%)
 * - Skills breadth and depth (25%)
 * - Activity score (25%)
 * - Network score (25%)
 */
// export function calculateReadinessIndex(user: User): ReadinessIndex {
//   // Implementation coming in Task 3
// }
