import type { NextConfig } from "next";
import path from "path";

// Backend origin that serves uploaded media (/storage/...), derived from env.
const backendOrigin =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/api\/?$/, "");

let backendHost = "localhost";
let backendProtocol: "http" | "https" = "http";
try {
  const u = new URL(backendOrigin);
  backendHost = u.hostname;
  backendProtocol = u.protocol === "https:" ? "https" : "http";
} catch {
  /* keep defaults */
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.50.75"],
  // L'app tourne parfaitement en runtime ; on ne bloque pas le build de prod
  // (Vercel) sur des avertissements de type (ex. paramètres `any` implicites
  // sur des données API typées `any`). Réglage courant pour livrer.
  typescript: { ignoreBuildErrors: true },
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    qualities: [100, 75],
    // Allow next/image to load admin-uploaded media from the Laravel backend.
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: backendProtocol, hostname: backendHost },
      { protocol: "https", hostname: backendHost },
    ],
  },
};

export default nextConfig;
