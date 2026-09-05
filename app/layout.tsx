import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENTANGLE: A QUANTUM ODYSSEY",
  description: "Explore the real quantum computing. One qubit at a time. September 8-9, 2026 at Silver Oak University.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
};

import GlobalQuantumField from "@/components/layout/GlobalQuantumField";
import Background3DElements from "@/components/visuals/Background3DElements";
import CursorLight from "@/components/visuals/CursorLight";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <CursorLight />
        <Background3DElements />
        <GlobalQuantumField />
        {children}
      </body>
    </html>
  );
}
