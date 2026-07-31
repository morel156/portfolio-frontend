import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GUELLY Morel — Développeur Full Stack",
    short_name: "GUELLY Morel",
    description:
      "Portfolio de GUELLY Morel, développeur Full Stack à Cotonou (Bénin) : projets, services et parcours.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#2563eb",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
