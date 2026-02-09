import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import StructuredData from "@/components/StructuredData";
import TrackingProvider from "@/components/tracking/TrackingProvider";
import CookieConsent from "@/components/tracking/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://predictanalyse.com"),
  title: "Predict Analyse | Prévention Santé au Travail par l'IA",
  description:
    "Predict Analyse utilise l'intelligence artificielle pour diagnostiquer les risques de TMS et RPS, réduire l'absentéisme et améliorer la santé au travail de vos collaborateurs.",
  keywords: [
    "santé au travail",
    "TMS",
    "RPS",
    "prévention",
    "absentéisme",
    "IA santé",
    "bien-être au travail",
    "ergonomie",
    "Predicta",
    "Predict Analyse",
    "risques psychosociaux",
    "troubles musculo-squelettiques",
    "prévention santé entreprise",
    "QVT",
    "qualité de vie au travail",
    "plateforme santé IA",
    "diagnostic TMS",
    "réduction absentéisme",
  ],
  authors: [{ name: "Predict Analyse" }],
  publisher: "Predict Analyse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://predictanalyse.com",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Predict Analyse | Prévention Santé au Travail par l'IA",
    description:
      "Diagnostiquez les risques, prédisez l'absentéisme et améliorez la santé de vos équipes avec notre plateforme IA.",
    type: "website",
    locale: "fr_FR",
    url: "https://predictanalyse.com",
    siteName: "Predict Analyse",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Predict Analyse - Prévention Santé au Travail par l'IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Predict Analyse | Prévention Santé au Travail par l'IA",
    description:
      "Diagnostiquez les risques, prédisez l'absentéisme et améliorez la santé de vos équipes avec notre plateforme IA.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <TrackingProvider>
          {children}
          <CookieConsent />
        </TrackingProvider>
      </body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}
