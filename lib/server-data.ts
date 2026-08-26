import { apiBaseUrl } from "./backend";

/**
 * Délai max accordé au backend avant de retomber sur les valeurs par défaut.
 * Sans borne, `fetch` attend indéfiniment : un backend endormi (Render free
 * tier) suffit alors à faire dépasser les 60 s de prérendu de Next et à casser
 * le déploiement Vercel.
 */
const SETTINGS_TIMEOUT_MS = 3000;

/**
 * Pendant `next build`, le backend n'est pas forcément joignable (service
 * endormi, backend local absent de la CI). Les réglages ne sont pas
 * indispensables au build — les métadonnées ont des valeurs par défaut — et
 * l'ISR (revalidate 60) les récupère dès les premières requêtes en production.
 */
function isBuildPhase(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}

/**
 * Server-side fetch of site settings (used for dynamic <head> metadata).
 * Returns null on any failure so callers can fall back to static defaults.
 */
export async function getSettings(): Promise<Record<string, any> | null> {
  if (isBuildPhase()) return null;

  try {
    const res = await fetch(`${apiBaseUrl()}/settings`, {
      headers: { Accept: "application/json" },
      // Revalidate periodically so admin edits show without a redeploy.
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(SETTINGS_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
