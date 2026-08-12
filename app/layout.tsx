import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const displayFont = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: "400",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["400", "500", "700"],
});

const worksans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vaibhav Yadav — Product Implementation Consultant · BI · AI Agents",
  description:
    "Vaibhav Yadav — Associate Product Implementation Consultant at EngiNeo Solutions. Enterprise SaaS implementation (Keka HRMS, Happay), Power BI & data analytics, and AI agent / GenAI workflow automation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${jbmono.variable} ${worksans.variable} font-body bg-ink text-paper antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
