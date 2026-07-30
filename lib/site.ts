/**
 * URL canonique du site (frontend).
 * Surclassable via NEXT_PUBLIC_SITE_URL (ex. si un domaine custom arrive).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-morelguelly.vercel.app"
).replace(/\/$/, "");
