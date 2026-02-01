"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
    ClipboardList,
    Users,
    Settings,
    BarChart3,
    Menu,
    X,
    Heart,
    FileUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: "Health Check", href: "/intake", icon: Heart },
        { name: "Review Queue", href: "/nurse/review", icon: ClipboardList },
        { name: "Find Doctors", href: "/network", icon: Users },
        { name: "Medical Records", href: "/records", icon: FileUp },
        { name: "Dashboard", href: "/admin", icon: BarChart3 },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
            <div className="flex items-center px-4 md:px-6 h-16">
                {/* Left: Logo + Desktop Nav */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="RuralClinic Logo"
                            width={32}
                            height={32}
                            className="rounded-lg"
                        />
                        <span className="font-bold text-lg text-primary">RuralClinic</span>
                    </Link>

                    {/* Desktop Navigation Items */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navigation.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                                    )}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: User + Mobile Menu Toggle */}
                <div className="ml-auto flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-surface-hover rounded-full border border-border/50">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-medium text-text-secondary">System Online</span>
                    </div>

                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8",
                                },
                            }}
                        />
                        <Link href="/settings" className="hidden sm:block">
                            <Button variant="ghost" size="icon" className="text-text-secondary hover:text-primary">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </Link>
                    </SignedIn>

                    <SignedOut>
                        <Link href="/sign-in">
                            <Button variant="default" size="sm">Sign In</Button>
                        </Link>
                    </SignedOut>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
                <nav className="lg:hidden px-4 pb-4 space-y-1 bg-surface border-b border-border shadow-lg animate-in slide-in-from-top-2">
                    {navigation.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}
