import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://synergehealth.com"),
  title: {
    default: "Synerge Health",
    template: "%s | Synerge Health",
  },
  description:
    "Synerge Health is a venture studio building and scaling Africa's next generation of digital health companies through strategic guidance, operational support, and seed funding.",
  keywords: [
    "HealthTech",
    "Venture Studio",
    "Africa Healthcare",
    "Digital Health",
    "Sub-Saharan Africa",
    "Startup Accelerator",
  ],
  authors: [{ name: "Synerge Health" }],
  openGraph: {
    title: "Synerge Health",
    description:
      "We co-found, fund, and operate healthtech startups from first insight to market scale.",
    url: "https://synergehealth.com",
    siteName: "Synerge Health",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synerge Health",
    description:
      "We co-found, fund, and operate healthtech startups from first insight to market scale.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} ${playfair.variable} h-full`}
    >
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-[#060B09] text-[#F8FAFC] antialiased">
        {/* Subtle grid overlay */}
        <div className="grid-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

