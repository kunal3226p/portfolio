import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kunal Paul | Futuristic Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}