// =========================================
// GOLD STUDENTS CLUB - Mock Data
// Rich, realistic data for demonstration
// =========================================

import {
    User,
    Opportunity,
    Badge,
    UserGoal,
    ExperienceLevel,
    TrustLevel,
    OpportunityType,
    CompetitionLevel,
    Application,
    TrustLog,
    Notification,
} from "@/types";

// =========================================
// Current User: Alex Chen (Candidate Profile)
// A strong candidate with intentional skill gaps
// =========================================

export const currentUser: User = {
    id: "user_001",
    name: "Alex Chen",
    email: "alex.chen@berkeley.edu",
    avatar: "/avatars/alex.jpg",
    university: "UC Berkeley",
    country: "United States",

    // Skills - Note: Missing "Public Speaking", "Leadership", "German"
    skills: [
        "Python",
        "Machine Learning",
        "Data Analysis",
        "TensorFlow",
        "React",
        "TypeScript",
        "SQL",
        "Research Methods",
        "Technical Writing",
    ],

    interests: [
        "Artificial Intelligence",
        "Climate Tech",
        "EdTech",
        "Social Impact",
    ],

    goals: [UserGoal.Research, UserGoal.Startup],
    xp_level: ExperienceLevel.Intermediate,

    // Trust Graph
    trust_level: TrustLevel.Gold,
    trust_score: 94,

    // Gamification
    badges: [
        {
            id: "badge_001",
            name: "Early Adopter",
            icon: "🚀",
            description: "Joined during beta phase",
            earnedAt: new Date("2025-09-15"),
        },
        {
            id: "badge_002",
            name: "Profile Champion",
            icon: "✨",
            description: "100% profile completion",
            earnedAt: new Date("2025-10-01"),
        },
        {
            id: "badge_003",
            name: "Connector",
            icon: "🤝",
            description: "Invited 5+ verified members",
            earnedAt: new Date("2025-11-20"),
        },
    ],
    xp_points: 2750,
    profile_completeness: 92,

    joined_at: new Date("2025-09-15"),
    last_active: new Date(),

    // Social Links
    linkedin_url: "https://linkedin.com/in/alexchen-ml",
    github_url: "https://github.com/alexchen-ml",
};

// =========================================
// Mock Opportunities (15 diverse items)
// Intentionally includes mismatches for Gap Analysis testing
// =========================================

export const opportunities: Opportunity[] = [
    // =========================================
    // HOUSING (2 items)
    // =========================================
    {
        id: "opp_001",
        type: OpportunityType.Housing,
        title: "Erasmus Student Dormitory in Berlin",
        description:
            "Modern shared accommodation in Berlin-Mitte for international students. Includes high-speed internet, study rooms, and access to co-working spaces. Perfect for students doing research internships in Germany.",
        requirements: ["German A2 Level", "Valid Student Visa", "EU/Schengen Insurance"],
        preferred_skills: ["German Language"],
        location: "Berlin, Germany",
        deadline: new Date("2026-03-15"),
        start_date: new Date("2026-09-01"),
        isVerified: true,
        source_partner: "DAAD Germany",
        competition_level: CompetitionLevel.Medium,
        applicant_count: 45,
        compensation: "€350/month",
        duration: "12 months",
        remote_friendly: false,
        posted_at: new Date("2026-01-10"),
        updated_at: new Date("2026-01-15"),
    },
    {
        id: "opp_002",
        type: OpportunityType.Housing,
        title: "Stanford GSB Student Housing Exchange",
        description:
            "Exclusive housing exchange program for visiting scholars and MBA students. Located near campus with access to all Stanford facilities.",
        requirements: ["Graduate Student Status", "Minimum 3.5 GPA", "Research Proposal"],
        preferred_skills: ["Research Methods"],
        location: "Stanford, California",
        deadline: new Date("2026-02-28"),
        start_date: new Date("2026-06-01"),
        isVerified: true,
        source_partner: "Stanford University",
        competition_level: CompetitionLevel.High,
        applicant_count: 120,
        compensation: "$800/month (subsidized)",
        duration: "3-6 months",
        remote_friendly: false,
        posted_at: new Date("2026-01-05"),
        updated_at: new Date("2026-01-12"),
    },

    // =========================================
    // MENTORS (5 items - Verified PhD students)
    // =========================================
    {
        id: "opp_003",
        type: OpportunityType.Mentor,
        title: "AI Research Mentorship - Dr. Sarah Kim",
        description:
            "1-on-1 mentorship with MIT PhD candidate specializing in reinforcement learning. Weekly 1-hour sessions focused on research methodology and paper writing.",
        requirements: ["Machine Learning", "Python", "Research Experience"],
        preferred_skills: ["PyTorch", "Research Methods"],
        location: "Remote",
        deadline: new Date("2026-02-15"),
        isVerified: true,
        source_partner: "MIT CSAIL",
        competition_level: CompetitionLevel.High,
        applicant_count: 89,
        duration: "6 months",
        remote_friendly: true,
        posted_at: new Date("2026-01-08"),
        updated_at: new Date("2026-01-14"),
    },
    {
        id: "opp_004",
        type: OpportunityType.Mentor,
        title: "Climate Tech Founder Mentorship",
        description:
            "Mentorship from Stanford PhD and YC-backed founder. Focus on turning research into startups. Ideal for students interested in climate tech ventures.",
        requirements: ["Startup Interest", "Technical Background", "Climate Knowledge"],
        preferred_skills: ["Business Development", "Pitching"],
        location: "Remote / Bay Area",
        deadline: new Date("2026-03-01"),
        isVerified: true,
        source_partner: "Stanford StartX",
        competition_level: CompetitionLevel.High,
        applicant_count: 156,
        duration: "4 months",
        remote_friendly: true,
        posted_at: new Date("2026-01-12"),
        updated_at: new Date("2026-01-16"),
    },
    {
        id: "opp_005",
        type: OpportunityType.Mentor,
        title: "Product Management Career Coach",
        description:
            "Guidance from ex-Google PM now at a Series B startup. Perfect for engineers transitioning to product roles.",
        requirements: ["Technical Background", "Communication Skills", "Product Thinking"],
        preferred_skills: ["Agile", "User Research"],
        location: "Remote",
        deadline: new Date("2026-02-20"),
        isVerified: true,
        source_partner: "PM School",
        competition_level: CompetitionLevel.Medium,
        applicant_count: 67,
        duration: "3 months",
        remote_friendly: true,
        posted_at: new Date("2026-01-11"),
        updated_at: new Date("2026-01-15"),
    },
    {
        id: "opp_006",
        type: OpportunityType.Mentor,
        title: "Public Speaking & Leadership Coach",
        description:
            "Transform your presentation skills with a TEDx speaker and executive coach. Focus on academic conferences and startup pitches.",
        requirements: ["Public Speaking", "Leadership", "English Fluency"],
        preferred_skills: ["Presentation Design", "Storytelling"],
        location: "Remote",
        deadline: new Date("2026-02-10"),
        isVerified: true,
        source_partner: "Toastmasters International",
        competition_level: CompetitionLevel.Low,
        applicant_count: 23,
        duration: "2 months",
        remote_friendly: true,
        posted_at: new Date("2026-01-09"),
        updated_at: new Date("2026-01-13"),
    },
    {
        id: "opp_007",
        type: OpportunityType.Mentor,
        title: "PhD Research Advisor - NLP Focus",
        description:
            "Weekly research discussions with Stanford NLP group PhD candidate. Focus on transformer architectures and language model fine-tuning.",
        requirements: ["NLP Knowledge", "Python", "Deep Learning", "Research Papers"],
        preferred_skills: ["Hugging Face", "BERT/GPT Experience"],
        location: "Remote",
        deadline: new Date("2026-02-25"),
        isVerified: true,
        source_partner: "Stanford NLP Group",
        competition_level: CompetitionLevel.High,
        applicant_count: 112,
        duration: "6 months",
        remote_friendly: true,
        posted_at: new Date("2026-01-07"),
        updated_at: new Date("2026-01-14"),
    },

    // =========================================
    // GRANTS (5 items - Mix of Verified/Unverified)
    // =========================================
    {
        id: "opp_008",
        type: OpportunityType.Grant,
        title: "Google Research Scholar Award",
        description:
            "Up to $60,000 for PhD students conducting research in AI, ML, or HCI. Funding for equipment, travel, and research assistants.",
        requirements: ["PhD Student", "Machine Learning", "Published Research"],
        preferred_skills: ["TensorFlow", "Research Methods"],
        location: "Global",
        deadline: new Date("2026-04-01"),
        isVerified: true,
        source_partner: "Google Research",
        competition_level: CompetitionLevel.High,
        applicant_count: 2500,
        compensation: "$60,000",
        duration: "1 year",
        remote_friendly: true,
        posted_at: new Date("2026-01-01"),
        updated_at: new Date("2026-01-10"),
    },
    {
        id: "opp_009",
        type: OpportunityType.Grant,
        title: "Climate Innovation Seed Grant",
        description:
            "Seed funding for student-led climate tech projects. Open to undergraduate and graduate students with prototype-stage ideas.",
        requirements: ["Climate Tech Focus", "Prototype", "Team of 2-4"],
        preferred_skills: ["Sustainability", "Engineering"],
        location: "Global",
        deadline: new Date("2026-03-15"),
        isVerified: true,
        source_partner: "MIT Solve",
        competition_level: CompetitionLevel.Medium,
        applicant_count: 340,
        compensation: "$25,000",
        duration: "6 months",
        remote_friendly: true,
        posted_at: new Date("2026-01-05"),
        updated_at: new Date("2026-01-12"),
    },
    {
        id: "opp_010",
        type: OpportunityType.Grant,
        title: "Emerging Markets Research Fellowship",
        description:
            "Research grant for students studying technology adoption in emerging markets. Requires fieldwork component.",
        requirements: ["Research Proposal", "Language Skills", "Field Research Experience"],
        preferred_skills: ["Qualitative Research", "Local Language"],
        location: "Africa / South Asia",
        deadline: new Date("2026-02-28"),
        isVerified: false, // UNVERIFIED - for Trust Graph testing
        source_partner: "Unknown Foundation",
        competition_level: CompetitionLevel.Low,
        applicant_count: 45,
        compensation: "$15,000",
        duration: "4 months",
        remote_friendly: false,
        posted_at: new Date("2026-01-08"),
        updated_at: new Date("2026-01-14"),
    },
    {
        id: "opp_011",
        type: OpportunityType.Grant,
        title: "Blockchain for Social Good Grant",
        description:
            "Funding for projects using blockchain technology for social impact. Looking for innovative applications beyond cryptocurrency.",
        requirements: ["Blockchain Knowledge", "Solidity", "Social Impact Focus"],
        preferred_skills: ["Smart Contracts", "DeFi"],
        location: "Global",
        deadline: new Date("2026-03-20"),
        isVerified: false, // UNVERIFIED - for Trust Graph testing
        source_partner: "Crypto Foundation",
        competition_level: CompetitionLevel.Medium,
        applicant_count: 78,
        compensation: "$30,000",
        duration: "8 months",
        remote_friendly: true,
        posted_at: new Date("2026-01-10"),
        updated_at: new Date("2026-01-15"),
    },
    {
        id: "opp_012",
        type: OpportunityType.Grant,
        title: "Women in STEM Research Award",
        description:
            "Supporting women researchers in computer science and engineering. Covers conference travel, equipment, and research costs.",
        requirements: ["Female Identifying", "STEM Field", "Research Project"],
        preferred_skills: ["Published Papers", "Conference Experience"],
        location: "Global",
        deadline: new Date("2026-04-15"),
        isVerified: true,
        source_partner: "AnitaB.org",
        competition_level: CompetitionLevel.Medium,
        applicant_count: 890,
        compensation: "$10,000",
        duration: "1 year",
        remote_friendly: true,
        posted_at: new Date("2026-01-02"),
        updated_at: new Date("2026-01-11"),
    },

    // =========================================
    // JOBS (3 items)
    // =========================================
    {
        id: "opp_013",
        type: OpportunityType.Job,
        title: "ML Research Intern - DeepMind",
        description:
            "Summer internship at DeepMind London. Work on cutting-edge research in reinforcement learning and AI safety.",
        requirements: ["PhD Student", "Machine Learning", "Python", "Published Research"],
        preferred_skills: ["JAX", "Reinforcement Learning", "AI Safety"],
        location: "London, UK",
        deadline: new Date("2026-02-01"),
        start_date: new Date("2026-06-01"),
        isVerified: true,
        source_partner: "DeepMind",
        competition_level: CompetitionLevel.High,
        applicant_count: 3200,
        compensation: "£6,000/month",
        duration: "3 months",
        remote_friendly: false,
        posted_at: new Date("2026-01-03"),
        updated_at: new Date("2026-01-10"),
    },
    {
        id: "opp_014",
        type: OpportunityType.Job,
        title: "Software Engineering Intern - Stripe",
        description:
            "Build the future of financial infrastructure. Work on real production systems handling billions in transactions.",
        requirements: ["Software Engineering", "Backend Development", "SQL"],
        preferred_skills: ["Ruby", "Go", "Distributed Systems"],
        location: "San Francisco / Remote",
        deadline: new Date("2026-02-15"),
        start_date: new Date("2026-05-15"),
        isVerified: true,
        source_partner: "Stripe",
        competition_level: CompetitionLevel.High,
        applicant_count: 4500,
        compensation: "$10,000/month",
        duration: "3 months",
        remote_friendly: true,
        posted_at: new Date("2026-01-04"),
        updated_at: new Date("2026-01-12"),
    },
    {
        id: "opp_015",
        type: OpportunityType.Job,
        title: "Data Science Fellow - World Bank",
        description:
            "Apply data science to global development challenges. Work with economists and policy experts on real-world impact projects.",
        requirements: ["Data Science", "Python", "Economics Knowledge", "Policy Interest"],
        preferred_skills: ["R", "Stata", "Impact Evaluation"],
        location: "Washington D.C.",
        deadline: new Date("2026-03-01"),
        start_date: new Date("2026-07-01"),
        isVerified: true,
        source_partner: "World Bank Group",
        competition_level: CompetitionLevel.Medium,
        applicant_count: 780,
        compensation: "$7,500/month",
        duration: "6 months",
        remote_friendly: false,
        posted_at: new Date("2026-01-06"),
        updated_at: new Date("2026-01-13"),
    },
];

// =========================================
// Mock Applications
// =========================================

export const applications: Application[] = [
    {
        id: "app_001",
        user_id: "user_001",
        opportunity_id: "opp_003",
        status: "under_review",
        submitted_at: new Date("2026-01-12"),
        last_updated: new Date("2026-01-15"),
    },
    {
        id: "app_002",
        user_id: "user_001",
        opportunity_id: "opp_008",
        status: "draft",
        last_updated: new Date("2026-01-14"),
    },
    {
        id: "app_003",
        user_id: "user_001",
        opportunity_id: "opp_014",
        status: "submitted",
        submitted_at: new Date("2026-01-10"),
        last_updated: new Date("2026-01-10"),
    },
    {
        id: "app_004",
        user_id: "user_001",
        opportunity_id: "opp_009",
        status: "interview",
        submitted_at: new Date("2026-01-08"),
        last_updated: new Date("2026-01-16"),
        notes: "Second round interview scheduled for Jan 20",
    },
    {
        id: "app_005",
        user_id: "user_001",
        opportunity_id: "opp_004",
        status: "submitted",
        submitted_at: new Date("2026-01-13"),
        last_updated: new Date("2026-01-13"),
    },
    {
        id: "app_006",
        user_id: "user_001",
        opportunity_id: "opp_005",
        status: "accepted",
        submitted_at: new Date("2025-12-20"),
        last_updated: new Date("2026-01-05"),
        feedback: "Congratulations! We're excited to have you join the program.",
    },
    {
        id: "app_007",
        user_id: "user_001",
        opportunity_id: "opp_013",
        status: "rejected",
        submitted_at: new Date("2025-12-15"),
        last_updated: new Date("2026-01-02"),
        feedback: "Strong candidate but we had limited spots this cycle.",
    },
];

// =========================================
// Mock Trust Logs
// =========================================

export const trustLogs: TrustLog[] = [
    {
        id: "trust_001",
        user_id: "user_001",
        action: "verification",
        points: 10,
        description: "Email verified",
        created_at: new Date("2025-09-15"),
    },
    {
        id: "trust_002",
        user_id: "user_001",
        action: "verification",
        points: 25,
        description: "University email verified - UC Berkeley",
        verified_by: "system",
        created_at: new Date("2025-09-16"),
    },
    {
        id: "trust_003",
        user_id: "user_001",
        action: "referral",
        points: 15,
        description: "Referred by Gold member: James Wilson",
        verified_by: "user_042",
        created_at: new Date("2025-09-15"),
    },
    {
        id: "trust_004",
        user_id: "user_001",
        action: "endorsement",
        points: 10,
        description: "Skill endorsed: Machine Learning",
        verified_by: "user_023",
        created_at: new Date("2025-10-20"),
    },
    {
        id: "trust_005",
        user_id: "user_001",
        action: "activity",
        points: 5,
        description: "Completed first application",
        created_at: new Date("2025-10-25"),
    },
    {
        id: "trust_006",
        user_id: "user_001",
        action: "endorsement",
        points: 10,
        description: "Skill endorsed: Python",
        verified_by: "user_056",
        created_at: new Date("2025-11-10"),
    },
    {
        id: "trust_007",
        user_id: "user_001",
        action: "referral",
        points: 20,
        description: "Successfully referred 3 new members",
        created_at: new Date("2025-11-20"),
    },
];

// =========================================
// Mock Notifications
// =========================================

export const notifications: Notification[] = [
    {
        id: "notif_001",
        user_id: "user_001",
        type: "application_update",
        title: "Application Update",
        message: "Your Climate Innovation Seed Grant application moved to interview stage!",
        link: "/applications/app_004",
        read: false,
        created_at: new Date("2026-01-16T10:30:00"),
    },
    {
        id: "notif_002",
        user_id: "user_001",
        type: "match",
        title: "New Match: 95% Fit",
        message: "World Bank Data Science Fellow matches your skills perfectly",
        link: "/opportunities/opp_015",
        read: false,
        created_at: new Date("2026-01-15T14:20:00"),
    },
    {
        id: "notif_003",
        user_id: "user_001",
        type: "deadline",
        title: "Deadline Approaching",
        message: "DeepMind ML Research Intern deadline in 14 days",
        link: "/opportunities/opp_013",
        read: true,
        created_at: new Date("2026-01-14T09:00:00"),
    },
    {
        id: "notif_004",
        user_id: "user_001",
        type: "squad_invite",
        title: "Squad Invitation",
        message: "Sarah Chen invited you to join 'Climate AI Researchers'",
        link: "/squads/invite_001",
        read: false,
        created_at: new Date("2026-01-13T16:45:00"),
    },
    {
        id: "notif_005",
        user_id: "user_001",
        type: "badge_earned",
        title: "New Badge Earned!",
        message: "You earned the 'Connector' badge for inviting 5+ members",
        read: true,
        created_at: new Date("2025-11-20T12:00:00"),
    },
];

// =========================================
// Helper: Get opportunities by type
// =========================================

export function getOpportunitiesByType(type: OpportunityType): Opportunity[] {
    return opportunities.filter((opp) => opp.type === type);
}

// =========================================
// Helper: Get verified opportunities only
// =========================================

export function getVerifiedOpportunities(): Opportunity[] {
    return opportunities.filter((opp) => opp.isVerified);
}

// =========================================
// Helper: Get active applications
// =========================================

export function getActiveApplications(): Application[] {
    return applications.filter(
        (app) => !["accepted", "rejected", "withdrawn"].includes(app.status)
    );
}

// =========================================
// Stats for Dashboard
// =========================================

export const dashboardStats = {
    activeApplications: getActiveApplications().length,
    trustScore: currentUser.trust_score,
    newMatches: 12, // Would be calculated dynamically
    opportunitiesViewed: 47,
    profileViews: 23,
    squadMembers: 5,
};
