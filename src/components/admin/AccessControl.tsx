"use client";

import React, { useState } from "react";
import {
    Lock,
    Users,
    Mail,
    ShieldCheck,
    Globe,
    UserPlus,
    AlertTriangle,
} from "lucide-react";

interface ToggleProps {
    label: string;
    description: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    icon: React.ReactNode;
}

function Toggle({ label, description, enabled, onChange, icon }: ToggleProps) {
    return (
        <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    {icon}
                </div>
                <div>
                    <h4 className="font-medium text-white">{label}</h4>
                    <p className="text-sm text-slate-400 mt-0.5">{description}</p>
                </div>
            </div>
            <button
                onClick={() => onChange(!enabled)}
                className={`relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ${enabled ? "bg-green-500" : "bg-slate-700"
                    }`}
                role="switch"
                aria-checked={enabled}
            >
                <span
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${enabled ? "left-8" : "left-1"
                        }`}
                />
            </button>
        </div>
    );
}

export default function AccessControl() {
    const [inviteOnly, setInviteOnly] = useState(true);
    const [waitlistVerification, setWaitlistVerification] = useState(true);
    const [emailVerification, setEmailVerification] = useState(true);
    const [geoRestrictions, setGeoRestrictions] = useState(false);

    return (
        <div className="bg-slate-900/80 rounded-xl border border-white/5 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-amber-500" />
                    Access Control
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                    Manage community access and verification settings
                </p>
            </div>

            {/* Toggles */}
            <div className="p-6 space-y-4">
                <Toggle
                    label="Invite-Only Mode"
                    description="Only users with valid invite codes can join the community"
                    enabled={inviteOnly}
                    onChange={setInviteOnly}
                    icon={<UserPlus className="w-5 h-5" />}
                />

                <Toggle
                    label="Waitlist Verification"
                    description="New applicants must be manually approved by admin"
                    enabled={waitlistVerification}
                    onChange={setWaitlistVerification}
                    icon={<Users className="w-5 h-5" />}
                />

                <Toggle
                    label="Email Verification Required"
                    description="Users must verify their .edu email address"
                    enabled={emailVerification}
                    onChange={setEmailVerification}
                    icon={<Mail className="w-5 h-5" />}
                />

                <Toggle
                    label="Geographic Restrictions"
                    description="Limit access to specific countries"
                    enabled={geoRestrictions}
                    onChange={setGeoRestrictions}
                    icon={<Globe className="w-5 h-5" />}
                />
            </div>

            {/* Status Banner */}
            <div className="px-6 pb-6">
                <div
                    className={`p-4 rounded-xl flex items-start gap-3 ${inviteOnly
                            ? "bg-green-500/10 border border-green-500/20"
                            : "bg-amber-500/10 border border-amber-500/20"
                        }`}
                >
                    {inviteOnly ? (
                        <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                        <p
                            className={`font-medium ${inviteOnly ? "text-green-400" : "text-amber-400"
                                }`}
                        >
                            {inviteOnly ? "Community is Protected" : "Community is Open"}
                        </p>
                        <p className="text-sm text-slate-400 mt-0.5">
                            {inviteOnly
                                ? "Only verified, invited students can access the platform."
                                : "Warning: Anyone can register. Enable Invite-Only mode for security."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="px-6 pb-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-slate-800/50">
                    <div className="text-2xl font-bold text-white">247</div>
                    <div className="text-xs text-slate-400">Waitlist</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-800/50">
                    <div className="text-2xl font-bold text-amber-400">12</div>
                    <div className="text-xs text-slate-400">Pending Invites</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-800/50">
                    <div className="text-2xl font-bold text-green-400">98%</div>
                    <div className="text-xs text-slate-400">Invite Acceptance</div>
                </div>
            </div>
        </div>
    );
}
