"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// =========================================
// TYPES
// =========================================

export interface Group {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    memberCount: number;
}

export interface Message {
    id: string;
    groupId: string;
    senderId: string;
    senderName: string;
    avatar?: string; // Emoji or URL
    text: string;
    timestamp: number; // Date.now()
    isSystem?: boolean;
}

interface GroupsContextType {
    joinedGroups: Group[];
    messages: Record<string, Message[]>; // groupId -> messages[]
    joinGroup: (group: Group) => void;
    leaveGroup: (groupId: string) => void;
    sendMessage: (groupId: string, text: string) => void;
    isMember: (groupId: string) => boolean;
}

// =========================================
// INITIAL DATA
// =========================================

const INITIAL_GROUPS: Group[] = [
    {
        id: "grp_001",
        name: "AI Research Network",
        description: "Connect with fellow researchers working on cutting-edge AI projects.",
        memberCount: 1247,
        icon: "🤖",
        category: "Research",
    },
    {
        id: "grp_002",
        name: "Startup Founders Circle",
        description: "A community for student entrepreneurs.",
        memberCount: 856,
        icon: "🚀",
        category: "Entrepreneurship",
    }
];

// Initial mock messages
const MOCK_MESSAGES: Record<string, Message[]> = {
    "grp_001": [
        { id: "m1", groupId: "grp_001", senderId: "sys", senderName: "System", text: "Welcome to the AI Research Network!", timestamp: Date.now() - 1000000, isSystem: true },
        { id: "m2", groupId: "grp_001", senderId: "u2", senderName: "Sarah Chen", text: "Has anyone tried the new Gemini 1.5 Pro API yet? The context window is insane.", timestamp: Date.now() - 500000, avatar: "👩‍💻" },
        { id: "m3", groupId: "grp_001", senderId: "u3", senderName: "Alex Rivera", text: "Yeah, I'm using it for my thesis. It handles the entire codebase analysis perfectly.", timestamp: Date.now() - 200000, avatar: "👨‍🎓" }
    ],
    "grp_002": [
        { id: "m1", groupId: "grp_002", senderId: "sys", senderName: "System", text: "Welcome to Founders Circle! Pitch your ideas here.", timestamp: Date.now() - 800000, isSystem: true },
        { id: "m2", groupId: "grp_002", senderId: "u4", senderName: "Mike Ross", text: "Looking for a technical co-founder for a Fintech app. React Native exp required.", timestamp: Date.now() - 100000, avatar: "👔" }
    ]
};

// =========================================
// CONTEXT
// =========================================

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export function GroupsProvider({ children }: { children: ReactNode }) {
    // Load from local storage or use defaults
    const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);
    const [messages, setMessages] = useState<Record<string, Message[]>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Hydrate from LocalStorage
    useEffect(() => {
        const savedGroups = localStorage.getItem("gold_joined_groups");
        const savedMessages = localStorage.getItem("gold_group_messages");

        if (savedGroups) {
            setJoinedGroups(JSON.parse(savedGroups));
        } else {
            // Default join a couple of groups for demo purposes
            setJoinedGroups(INITIAL_GROUPS);
        }

        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            setMessages(MOCK_MESSAGES);
        }

        setIsLoaded(true);
    }, []);

    // 2. Persist to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("gold_joined_groups", JSON.stringify(joinedGroups));
            localStorage.setItem("gold_group_messages", JSON.stringify(messages));
        }
    }, [joinedGroups, messages, isLoaded]);


    // =========================================
    // ACTIONS
    // =========================================

    const joinGroup = (group: Group) => {
        setJoinedGroups((prev) => {
            if (prev.some((g) => g.id === group.id)) return prev;
            return [...prev, group];
        });

        // Add a welcome message if no history exists
        if (!messages[group.id]) {
            setMessages(prev => ({
                ...prev,
                [group.id]: [{
                    id: `sys_${Date.now()}`,
                    groupId: group.id,
                    senderId: "sys",
                    senderName: "System",
                    text: `You joined ${group.name}. Say hello!`,
                    timestamp: Date.now(),
                    isSystem: true
                }]
            }));
        }
    };

    const leaveGroup = (groupId: string) => {
        setJoinedGroups((prev) => prev.filter((g) => g.id !== groupId));
    };

    const isMember = (groupId: string) => {
        return joinedGroups.some(g => g.id === groupId);
    };

    const sendMessage = (groupId: string, text: string) => {
        const newMessage: Message = {
            id: `msg_${Date.now()}`,
            groupId,
            senderId: "me", // Current user
            senderName: "Me", // Ideally from UserContext
            text,
            timestamp: Date.now(),
            isSystem: false
        };

        setMessages(prev => ({
            ...prev,
            [groupId]: [...(prev[groupId] || []), newMessage]
        }));

        // Simulate Auto-Reply (Mock "Aliveness")
        setTimeout(() => {
            const replies = [
                "That's an interesting point!",
                "Totally agree.",
                "Can you share more details?",
                "I was just thinking about that too.",
                "Does anyone have resources on this?",
                "Great insight! 🚀"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            const randomUser = ["Sarah", "Mike", "Alex", "David", "Jessica"][Math.floor(Math.random() * 5)];

            const replyMsg: Message = {
                id: `rep_${Date.now()}`,
                groupId,
                senderId: `user_${Math.random()}`,
                senderName: randomUser,
                avatar: ["👨‍💻", "👩‍💼", "🧑‍🔬", "👨‍🎨"][Math.floor(Math.random() * 4)],
                text: randomReply,
                timestamp: Date.now(),
            };

            setMessages(prev => ({
                ...prev,
                [groupId]: [...(prev[groupId] || []), replyMsg]
            }));
        }, 2500 + Math.random() * 3000); // 2.5s - 5.5s delay
    };

    const value = {
        joinedGroups,
        messages,
        joinGroup,
        leaveGroup,
        sendMessage,
        isMember
    };

    return (
        <GroupsContext.Provider value={value}>
            {children}
        </GroupsContext.Provider>
    );
}

export function useGroups() {
    const context = useContext(GroupsContext);
    if (context === undefined) {
        throw new Error("useGroups must be used within a GroupsProvider");
    }
    return context;
}
