import { NextResponse } from "next/server";
import { User } from "@/types";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: Request) {
    try {
        const { message, userProfile }: { message: string; userProfile: User } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // ==========================================
        // STRATEGY 1: GEMINI API (If Key Exists)
        // ==========================================
        if (GEMINI_API_KEY) {
            try {
                const systemPrompt = `
          You are the "Gold AI Assistant" for the Gold Students Club, an elite community for high-achieving students.
          
          User Profile Context:
          - Name: ${userProfile.name}
          - University: ${userProfile.university}
          - Major/Skills: ${userProfile.skills.join(", ")}
          - Trust Score: ${userProfile.trust_score} (Elite Status)
          - Goals: ${userProfile.goals.join(", ")}
          
          Your Goal:
          Provide concise, high-value career advice, networking tips, and opportunity recommendations based on their profile.
          Be professional, encouraging, and elite in tone.
          
          User Message: ${message}
        `;

                const response = await fetch(GEMINI_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: systemPrompt }] }],
                    }),
                });

                const data = await response.json();

                if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                    return NextResponse.json({
                        response: data.candidates[0].content.parts[0].text,
                        source: "gemini"
                    });
                }
            } catch (error) {
                console.error("Gemini API Error:", error);
                // Fallback to local logic on error
            }
        }

        // ==========================================
        // STRATEGY 2: SMART FALLBACK (Rule-Based)
        // ==========================================

        // 1. Analyze Keywords
        const lowerMsg = message.toLowerCase();
        let responseText = "";

        // 2. Profile-Aware Responses
        if (lowerMsg.includes("internship") || lowerMsg.includes("job") || lowerMsg.includes("work")) {
            responseText = `Based on your skills in ${userProfile.skills.slice(0, 2).join(" and ")}, you are a strong candidate for opportunities at top tech firms. Your Trust Score of ${userProfile.trust_score} gives you priority access. Check the 'Opportunities' tab for matches.`;
        }
        else if (lowerMsg.includes("network") || lowerMsg.includes("connect")) {
            responseText = `As a student at ${userProfile.university}, you should connect with alumni in the Gold Community. I found 3 highly relevant mentors with similar goals in ${userProfile.goals[0] || "your field"}.`;
        }
        else if (lowerMsg.includes("profile") || lowerMsg.includes("score") || lowerMsg.includes("trust")) {
            if (userProfile.trust_score >= 90) {
                responseText = `Your profile is top-tier (Score: ${userProfile.trust_score}). You have 'Elite Status'. To maintain this, keep engaging with the community and keep your portfolio updated.`;
            } else {
                responseText = `Your Trust Score is ${userProfile.trust_score}. To reach 'Elite Status' (>90), try adding more detailed project descriptions and verifying your university email.`;
            }
        }
        else if (lowerMsg.includes("skill") || lowerMsg.includes("learn")) {
            responseText = `Your current skill set (${userProfile.skills.length} listed) is solid. To align with your goal of '${userProfile.goals[0]}', consider adding 'Cloud Computing' or 'System Design' to your portfolio.`;
        }
        else {
            // General Greeting / Default
            responseText = `Hello ${userProfile.name}! I'm here to help you maximize your Gold Students membership. Ask me about internships, networking, or how to improve your trust score.`;
        }

        return NextResponse.json({ response: responseText, source: "logic_engine" });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
