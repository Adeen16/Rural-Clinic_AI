import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RuralClinic AI | Instant Triage",
  description: "AI-powered clinical decision support for rural healthcare. Speak naturally, get instant triage recommendations.",
  keywords: ["healthcare", "triage", "AI", "rural health", "clinical decision support"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} bg-background text-foreground min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
