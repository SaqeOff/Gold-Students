"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    UserCircle,
    Crown,
    X,
    ShieldAlert,
    LogOut,
    MessageSquare, // Icon for Groups
} from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Opportunities", href: "/opportunities", icon: Briefcase },
    { name: "Community", href: "/community", icon: Users },
    { name: "Interest Groups", href: "/groups", icon: MessageSquare }, // ADDED
    { name: "My Profile", href: "/profile", icon: UserCircle },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { isOpen, close } = useSidebar();
    const { user, isAdmin, isAuthenticated, logout } = useAuth();

    // Hide sidebar on login page
    if (pathname === "/login") {
        return null;
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                    onClick={close}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full w-[280px]
          bg-[#0f172a] border-r border-slate-800
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                {/* Logo Section */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg gold-glow">
                            <Crown className="w-5 h-5 text-slate-900" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-white tracking-tight">
                                Gold Students
                            </span>
                            <span className="text-xs text-slate-500 font-medium -mt-1">
                                Exclusive Club
                            </span>
                        </div>
                    </Link>

                    {/* Mobile Close Button */}
                    <button
                        onClick={close}
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <ul className="space-y-1.5">
                        {navItems.map((item) => {
                            // Exact match for home, startsWith for others
                            const isActive = item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href);
                            const Icon = item.icon;

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={close}
                                        className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      font-medium text-sm transition-all duration-200
                      ${isActive
                                                ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                            }
                    `}
                                    >
                                        <Icon
                                            className={`w-5 h-5 ${isActive ? "text-amber-500" : "text-slate-500"
                                                }`}
                                        />
                                        {item.name}
                                        {isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-gold" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Admin Panel Link - ONLY VISIBLE TO ADMINS */}
                    {isAdmin && (
                        <div className="mt-6 pt-6 border-t border-slate-800">
                            <p className="text-xs text-slate-600 uppercase tracking-wider px-4 mb-2">
                                Admin
                            </p>
                            <Link
                                href="/admin"
                                onClick={close}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl
                                    font-medium text-sm transition-all duration-200
                                    ${pathname === "/admin"
                                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                        : "text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                    }
                                `}
                            >
                                <ShieldAlert className={`w-5 h-5 ${pathname === "/admin" ? "text-red-400" : "text-slate-500"}`} />
                                Control Panel
                                {pathname === "/admin" && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                )}
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-slate-800">
                    {/* User Info Card */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 mb-3">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                <span className="text-lg">{isAdmin ? "👑" : "🏆"}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">
                                    {user?.name || "Guest User"}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {isAdmin ? "Super Admin" : "Verified Elite"}
                                </p>
                            </div>
                        </div>
                        {!isAdmin && (
                            <>
                                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="w-4/5 h-full gold-gradient rounded-full" />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    80% to Platinum Level
                                </p>
                            </>
                        )}
                    </div>

                    {/* Logout Button */}
                    {isAuthenticated && (
                        <button
                            type="button"
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800/50 hover:border-red-500/30 transition-all group"
                        >
                            <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                            <span className="font-medium text-sm">Logout</span>
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
}
