import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const calSans = localFont({
  src: "../../public/font/CalSans-Regular.ttf",
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://naufalrafianto.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Muhammad Naufal Rafianto — Software Engineer",
    template: "%s | Naufal Rafianto",
  },
  description:
    "Portfolio of Muhammad Naufal Rafianto — Software Engineer specializing in frontend, full-stack, and AI/ML projects.",
  keywords: ["Naufal Rafianto", "Software Engineer", "Next.js", "React", "Portfolio"],
  authors: [{ name: "Muhammad Naufal Rafianto" }],
  creator: "Muhammad Naufal Rafianto",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Naufal Rafianto",
    title: "Muhammad Naufal Rafianto — Software Engineer",
    description:
      "Portfolio of Muhammad Naufal Rafianto — Software Engineer specializing in frontend, full-stack, and AI/ML projects.",
    images: [
      {
        url: "/image/IMG_8073.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Naufal Rafianto — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Naufal Rafianto — Software Engineer",
    description:
      "Portfolio of Muhammad Naufal Rafianto — Software Engineer specializing in frontend, full-stack, and AI/ML projects.",
    images: ["/image/IMG_8073.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${calSans.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}