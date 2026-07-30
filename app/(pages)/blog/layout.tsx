import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles, tutoriels et réflexions sur le développement full stack, Laravel, React, Next.js, l'architecture web et le Data Engineering.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
