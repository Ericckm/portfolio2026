import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personSchema, websiteSchema } from "@/lib/schema";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jb-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://erickmartins.dev"),
  title: {
    default: "Erick Martins — Full Stack Developer | Typescript & Next.js",
    template: "%s | Erick Martins",
  },
  description:
    "Full Stack Developer with 3+ years building production apps with React, Next.js and Node.js. Open to remote opportunities.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "JavaScript Developer",
    "Remote Developer",
    "Brazilian Developer",
    "Erick Martins",
  ],
  authors: [{ name: "Erick Martins" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/logo_nobg.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://erickmartins.dev",
    siteName: "Erick Martins — Full Stack Developer",
    title: "Erick Martins — Full Stack Developer | Typescript & Next.js",
    description:
      "Full Stack Developer building fast, accessible web applications. Open to remote opportunities.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Erick Martins — Full Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Martins — Full Stack Developer",
    description:
      "Full Stack Developer with React, Next.js and Node.js. Open to remote opportunities.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jbMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema]),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
