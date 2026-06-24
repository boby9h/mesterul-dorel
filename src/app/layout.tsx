import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BRAND } from "@/lib/constants";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });

const url = BRAND.url;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "Mesterul Dorel — Meseriași verificați pentru orice lucrare",
    template: "%s · Mesterul Dorel",
  },
  description:
    "Găsește rapid instalatori, electricieni, zugravi și alți meseriași verificați din zona ta. Primește oferte, compară prețuri și recenzii, alege cu încredere.",
  keywords: [
    "meseriași", "instalator", "electrician", "zugrav", "servicii la domiciliu",
    "reparații", "amenajări", "România", "Mesterul Dorel",
  ],
  authors: [{ name: BRAND.name }],
  applicationName: BRAND.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url,
    siteName: BRAND.name,
    title: "Mesterul Dorel — Meseriași verificați pentru orice lucrare",
    description:
      "Găsește rapid instalatori, electricieni și alți profesioniști verificați din zona ta. Oferte, prețuri și recenzii într-un singur loc.",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mesterul Dorel — Meseriași verificați",
    description: "Găsești rapid meseriașul potrivit pentru orice lucrare.",
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F97316",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
