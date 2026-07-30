import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Services de développement web : applications full stack Laravel / Next.js, architecture logicielle, sites WordPress, optimisation de performance et accompagnement technique.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
