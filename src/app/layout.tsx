import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/global/navbar/Navbar";

export const metadata: Metadata = {
  title: "Kristijan Federer",
  description: "Fullstack Software Developer",
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
