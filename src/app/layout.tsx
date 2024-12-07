import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/global/navbar/Navbar";

export const metadata: Metadata = {
  title: "Kristijan Federer",
  description: "Fullstack Software Developer",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
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
