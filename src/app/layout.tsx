import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdellah Raissouni | Engineering Student & Web Developer",
  description: "Professional portfolio of Abdellah Raissouni, an engineering student and web developer specializing in creating impressive, modern web experiences.",
  keywords: ["web developer", "engineering", "portfolio", "frontend", "Abdellah Raissouni"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
