"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Shared dashboard layout with navigation.
 * Mobile-first responsive sidebar.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content - No Sidebar Margin */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
