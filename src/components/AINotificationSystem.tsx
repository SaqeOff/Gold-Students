"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, X } from "lucide-react";

interface NotificationScenario {
  id: number;
  message: string;
  type: "recommendation" | "alert" | "insight";
}

const SCENARIOS: NotificationScenario[] = [
  { id: 1, message: "New internship match: Data Analyst at Google. 98% match with your profile. Apply now?", type: "recommendation" },
  { id: 2, message: "Your profile visibility is low. Update your 'Skills' section to boost it by 15%.", type: "insight" },
  { id: 3, message: "Networking tip: Connect with 3 alumni from 'Finance Club' to expand your reach.", type: "recommendation" },
  { id: 4, message: "Event Alert: 'Future of AI' webinar starts in 2 hours. Register to secure your spot.", type: "alert" },
  { id: 5, message: "Based on your recent activity, we recommend the 'Advanced Python' course.", type: "recommendation" },
  { id: 6, message: "You have 2 pending mentorship requests. Review them to start your journey.", type: "alert" },
  { id: 7, message: "Did you know? Completing your 'Bio' increases recruiter engagement by 2x.", type: "insight" },
  { id: 8, message: "Scholarship deadline approaching: 'Global Leaders Fund' closes in 3 days.", type: "alert" },
  { id: 9, message: "New Article: 'How to ace your first interview'. Read it to prepare.", type: "recommendation" },
  { id: 10, message: "Profile optimization: Add a project to your portfolio to stand out.", type: "insight" },
];

export default function AINotificationSystem() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<NotificationScenario | null>(null);
  const router = useRouter();

  const showRandomNotification = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * SCENARIOS.length);
    setCurrentScenario(SCENARIOS[randomIndex]);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Initial delay before the first notification
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 5000); 

    const interval = setInterval(() => {
      // Hide current notification if open (optional, depending on desired behavior)
       setIsVisible(false);
       
       // Small delay to allow exit animation before showing new one or just replace
       setTimeout(() => {
           showRandomNotification();
       }, 500);

    }, Math.floor(Math.random() * (30000 - 20000 + 1) + 20000)); // Random between 20-30s

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [showRandomNotification]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleClick = () => {
    router.push("/ai-chat");
  };

  if (!currentScenario) return null;

  return (
    <div
      className={`fixed top-24 right-6 z-50 w-80 transform transition-all duration-500 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        onClick={handleClick}
        className="cursor-pointer overflow-hidden rounded-xl border border-amber-500/30 bg-black/80 p-4 shadow-2xl backdrop-blur-md transition-transform hover:scale-105 hover:border-amber-400/50 group"
      >
        {/* Glow effect */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/20 blur-3xl group-hover:bg-amber-400/30 transition-all duration-500"></div>

        <div className="relative flex items-start gap-3">
          <div className="flex-shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-2 shadow-lg shadow-amber-500/20">
            <Sparkles className="h-5 w-5 text-black" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-amber-500">AI Insight</h4>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-200 leading-relaxed">
              {currentScenario.message}
            </p>
            <p className="mt-2 text-xs text-amber-500/80 font-medium group-hover:text-amber-400 transition-colors">
              Click to chat with AI &rarr;
            </p>
          </div>
        </div>
        
        {/* Progress bar for time until next or just visual flair - let's do a bottom border gradient */}
         <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
      </div>
    </div>
  );
}
