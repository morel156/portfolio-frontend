import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez GUELLY Morel, développeur Full Stack à Cotonou (Bénin) : projet web, application, conseil ou collaboration — réponse sous 24h.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
