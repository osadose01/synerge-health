import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
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
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://synergehealth.com"),
  title: {
    default: "Synerge Health — Africa's Digital Health Venture Studio",
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
    title: "Synerge Health — Africa's Digital Health Venture Studio",
    description:
      "We co-found, fund, and operate healthtech startups from first insight to market scale.",
    url: "https://synergehealth.com",
    siteName: "Synerge Health",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synerge Health — Africa's Digital Health Venture Studio",
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
      className={`${bricolage.variable} ${jakarta.variable} ${inter.variable} ${jetbrains.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
