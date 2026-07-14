import { apiBaseUrl } from "./backend";

/**
 * Server-side fetch of site settings (used for dynamic <head> metadata).
 * Returns null on any failure so callers can fall back to static defaults.
 */
export async function getSettings(): Promise<Record<string, any> | null> {
  try {
    const res = await fetch(`${apiBaseUrl()}/settings`, {
      headers: { Accept: "application/json" },
      // Revalidate periodically so admin edits show without a redeploy.
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
