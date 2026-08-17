import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dylan Hawkins — Terminal Portfolio",
  description:
    "Interactive terminal-style portfolio for Dylan Hawkins, Software Engineer and Games Developer. Type 'help' to get started.",
  keywords: [
    "Dylan Hawkins",
    "Software Engineer",
    "Games Developer",
    "Portfolio",
    "Murdoch University",
    "Computer Science",
    "Games Technology",
    "Next.js",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
