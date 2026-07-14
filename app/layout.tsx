import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import { getSettings } from "@/lib/server-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const DEFAULT_TITLE = "GUELLY Morel — Développeur Full Stack | Web & Data";
const DEFAULT_DESC =
  "Développeur Full Stack à Cotonou (Bénin). Je conçois des applications web modernes avec Laravel, React et Next.js — pensées comme des systèmes qui durent, en évolution vers le Data Engineering.";

// Metadata is generated from the admin-editable settings (SEO group),
// falling back to the static defaults if the API is unreachable.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const seo = settings?.seo ?? {};
  const brand = settings?.navbar?.brand ?? "GUELLY Morel";
  const title = seo.title || DEFAULT_TITLE;
  const description = seo.description || DEFAULT_DESC;

  return {
    title: {
      default: title,
      template: `%s | ${brand}`,
    },
    description,
    keywords: [
      "GUELLY Morel", "développeur full stack", "Laravel", "React", "Next.js",
      "TypeScript", "Data Engineering", "Cotonou", "Bénin", "développeur web freelance",
    ],
    creator: brand,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: `${brand} — Portfolio`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
