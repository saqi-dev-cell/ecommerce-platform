import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { CompareProvider } from "@/contexts/CompareContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import SkipLink from "@/components/ui/SkipLink";
import QuickActions from "@/components/ui/QuickActions";
import CompareBar from "@/components/ui/CompareBar";
import ScrollToTop from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "A modern e-commerce platform built with Next.js",
  keywords: "ecommerce, shopping, online store, products",
  authors: [{ name: "E-Commerce Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <ErrorBoundary>
          <ToastProvider>
            <AuthProvider>
              <CartProvider>
                <CompareProvider>
                  <WishlistProvider>
                    <div id="main-content">
                      {children}
                    </div>
                    <QuickActions />
                    <CompareBar />
                    <ScrollToTop />
                  </WishlistProvider>
                </CompareProvider>
              </CartProvider>
            </AuthProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
