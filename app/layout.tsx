import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RevealAnimation } from "@/components/shared/RevealAnimation";
import { ScrollToHomeButton } from "@/components/shared/ScrollToHomeButton";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { site } from "@/lib/site";

import "./globals.css";

// Self-hosted (SIL Open Font License) — no request to Google at runtime.
const display = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const sans = localFont({
  src: [{ path: "./fonts/inter-latin-wght-normal.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "INJ Makeup Studio & Academy | Bridal Makeup Artist in Hyderabad",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  formatDetection: { telephone: false },
  openGraph: {
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff8ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton variant="floating" />
        <ScrollToHomeButton />
        <RevealAnimation />
      </body>
    </html>
  );
}
