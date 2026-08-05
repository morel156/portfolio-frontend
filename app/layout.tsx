import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import { getSettings } from "@/lib/server-data";
import { SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

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

// Code de vérification Google Search Console (méthode « balise HTML ») pour la
// propriété https://portfolio-morelguelly.vercel.app. Ce code est public par
// nature — il est visible dans le HTML —, il n'a donc pas à rester secret.
// Surclassable par la variable d'environnement GOOGLE_SITE_VERIFICATION
// (Vercel → Settings → Environment Variables) si la propriété change.
const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
  "cznXN0HR9av-bW3r0aBY6y6u56W2SUfZx90afprbWdQ";

// Metadata is generated from the admin-editable settings (SEO group),
// falling back to the static defaults if the API is unreachable.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const seo = settings?.seo ?? {};
  const brand = settings?.navbar?.brand ?? "GUELLY Morel";
  const title = seo.title || DEFAULT_TITLE;
  const description = seo.description || DEFAULT_DESC;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${brand}`,
    },
    description,
    keywords: [
      "GUELLY Morel", "développeur full stack", "Laravel", "React", "Next.js",
      "TypeScript", "Data Engineering", "Cotonou", "Bénin", "développeur web freelance",
      "création site web Bénin", "développeur Laravel Cotonou",
    ],
    authors: [{ name: brand, url: SITE_URL }],
    creator: brand,
    ...(GOOGLE_SITE_VERIFICATION
      ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
      : {}),
    alternates: {
      canonical: "/",
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
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: SITE_URL,
      siteName: `${brand} — Portfolio`,
      title,
      description,
      images: [
        {
          url: "/Accueil_partie1.png",
          width: 1882,
          height: 913,
          alt: `Portfolio de ${brand} — Développeur Full Stack`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/Accueil_partie1.png"],
    },
  };
}

// Données structurées (Google) : identité + site. Améliore la compréhension
// du profil par les moteurs de recherche (rich results).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "GUELLY Morel Hectore Ramanou",
  alternateName: "GUELLY Morel",
  url: SITE_URL,
  image: `${SITE_URL}/6.png`,
  jobTitle: "Développeur Full Stack",
  description: DEFAULT_DESC,
  email: "mailto:guellymorelhectoreramanou@gmail.com",
  telephone: "+2290150387702",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cotonou",
    addressCountry: "BJ",
  },
  sameAs: [
    "https://github.com/morel156",
    "https://www.linkedin.com/in/morel-guelly-a05a1b420",
  ],
  knowsAbout: [
    "Laravel", "React", "Next.js", "TypeScript", "PHP", "Python",
    "Data Engineering", "WordPress", "Développement web",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GUELLY Morel — Portfolio",
  url: SITE_URL,
  inLanguage: "fr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
