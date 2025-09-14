import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social Media Empire - Data-Integrated Platform",
  description: "Ultimate data-integrated social media management platform with AI-powered analytics and automation",
  keywords: ["Social Media", "Analytics", "AI", "Marketing", "Automation", "Data Integration"],
  authors: [{ name: "Social Media Empire Team" }],
  openGraph: {
    title: "Social Media Empire - Data-Integrated Platform",
    description: "Ultimate data-integrated social media management platform with AI-powered analytics and automation",
    url: "https://socialempire.ai",
    siteName: "Social Media Empire",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Empire - Data-Integrated Platform",
    description: "Ultimate data-integrated social media management platform with AI-powered analytics and automation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
