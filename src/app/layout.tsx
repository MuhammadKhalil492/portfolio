import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khalilsafi.vercel.app"),
  title: {
    default: "Muhammad Khalil Safi | Full Stack Developer",
    template: "%s | Muhammad Khalil Safi",
  },
  description:
    "Full Stack Developer specializing in Laravel, React, and the TALL stack. Building scalable web applications and complex marketplaces.",
  keywords: [
    "Full Stack Developer",
    "Laravel Developer",
    "React Developer",
    "TALL Stack",
    "Web Developer Pakistan",
    "Muhammad Khalil Safi",
  ],
  authors: [{ name: "Muhammad Khalil Safi" }],
  creator: "Muhammad Khalil Safi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://khalilsafi.vercel.app",
    title: "Muhammad Khalil Safi | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Laravel, React, and the TALL stack.",
    siteName: "Muhammad Khalil Safi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Khalil Safi | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Laravel, React, and the TALL stack.",
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
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
