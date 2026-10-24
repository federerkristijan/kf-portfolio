import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { connection } from "next/server";

import "./globals.css";
import { Navbar } from "@/components/global/navbar/Navbar";
import Footer from "@/components/global/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Kristijan Federer",
  description: "AI Systems Engineer",
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Render every page per request so it carries the CSP nonce from middleware.
  await connection();

  return (
    <html lang="en" className={inter.className}>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
