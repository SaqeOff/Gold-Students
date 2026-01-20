import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/SidebarContext";
import { UserProvider } from "@/components/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import { GroupsProvider } from "@/context/GroupsContext";
import { SearchProvider } from "@/context/SearchContext"; // Added import
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: "Gold Students Club | Exclusive International Community",
  description:
    "An invite-only international community for high-achieving students. Access exclusive opportunities, build your network, and accelerate your career.",
  keywords: [
    "students",
    "opportunities",
    "networking",
    "elite",
    "international",
    "community",
  ],
  authors: [{ name: "Gold Students Club" }],
  openGraph: {
    title: "Gold Students Club",
    description: "Exclusive International Community for High-Achievers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#020617] text-white`}
      >
        <AuthProvider>
          <UserProvider>
            <GroupsProvider>
              <SearchProvider> {/* Added SearchProvider */}
                <SidebarProvider>
                  {/* Fixed Sidebar */}
                  <Sidebar />

                  {/* Main Content Area */}
                  <div className="lg:ml-[280px] min-h-screen flex flex-col">
                    {/* Sticky Header */}
                    <Header />

                    {/* Page Content */}
                    <main className="flex-1 p-4 lg:p-6">{children}</main>
                  </div>
                </SidebarProvider>
              </SearchProvider> {/* Closed SearchProvider */}
            </GroupsProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
