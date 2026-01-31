import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RuralClinic AI | Clinical Intake & Triage",
  description:
    "AI-powered clinical intake and triage platform for rural healthcare. Fast, accessible, and designed for low-resource environments.",
  keywords: [
    "healthcare",
    "triage",
    "AI",
    "rural health",
    "clinical decision support",
    "patient intake",
  ],
  authors: [{ name: "RuralClinic AI" }],
  openGraph: {
    title: "RuralClinic AI",
    description: "Clinical intake at the speed of voice",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} bg-background text-text-primary min-h-screen antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
