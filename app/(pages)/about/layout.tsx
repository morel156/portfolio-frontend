import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez le parcours de GUELLY Morel, développeur Full Stack à Cotonou (Bénin) : expériences, formations, philosophie produit et évolution vers le Data Engineering.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
