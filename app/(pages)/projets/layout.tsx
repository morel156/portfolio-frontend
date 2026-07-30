import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Projets de GUELLY Morel : applications web full stack, SaaS et systèmes construits avec Laravel, React, Next.js et Python — dont StabilIT, plateforme d'évaluation de stabilité digitale.",
  alternates: { canonical: "/projets" },
};

export default function ProjetsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
