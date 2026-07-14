// ─────────────────────────────────────────────────────────────────────────
// Résolution robuste de l'URL du backend (Laravel).
//
// 3 contextes gérés :
//   • PRODUCTION  → NEXT_PUBLIC_API_URL pointe vers un vrai backend (ex. Railway
//                   https://xxx.up.railway.app/api) : on l'utilise tel quel
//                   (front et back sont sur des domaines différents).
//   • LOCAL       → sous Windows `localhost` résout vers ::1 (IPv6) avant IPv4,
//                   or Herd n'écoute que sur 127.0.0.1 → on force IPv4.
//   • LAN (dev)   → site ouvert via une IP 192.168.x (téléphone / autre poste)
//                   → on parle au même hôte sur le port du backend.
// ─────────────────────────────────────────────────────────────────────────

const BACKEND_PORT = 8001;

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]", ""]);

/** Origine du backend depuis la variable d'env (sans le /api final), si définie. */
function envOrigin(): string | null {
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
  if (!raw) return null;
  return raw.replace(/\/api\/?$/, "").replace(/\/$/, "");
}

/** L'origine pointe-t-elle vers un backend local (localhost / 127.0.0.1 / ::1) ? */
function isLocalOrigin(origin: string): boolean {
  return /\/\/(localhost|127\.0\.0\.1|\[?::1\]?)(:|\/|$)/.test(origin);
}

/**
 * Origine absolue du backend (ex. "https://api.exemple.com" ou
 * "http://127.0.0.1:8001"), sans /api. Appelée au moment de l'usage pour
 * toujours refléter le contexte réel (navigateur vs SSR, dev vs prod).
 */
export function backendOrigin(): string {
  const env = envOrigin();

  // PRODUCTION : l'env pointe vers un vrai backend distant → priorité absolue.
  if (env && !isLocalOrigin(env)) {
    return env;
  }

  // DÉVELOPPEMENT local / LAN.
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (LOCAL_HOSTS.has(host)) {
      // Force IPv4 : le backend Herd n'écoute que sur 127.0.0.1.
      return `http://127.0.0.1:${BACKEND_PORT}`;
    }
    // Accès LAN : même hôte que la page, sur le port du backend.
    return `${window.location.protocol}//${host}:${BACKEND_PORT}`;
  }

  // SSR en local : env (localhost) normalisé en IPv4, sinon défaut.
  return (env || `http://127.0.0.1:${BACKEND_PORT}`).replace("//localhost:", "//127.0.0.1:");
}

/** Base de l'API (ex. "https://api.exemple.com/api"). */
export function apiBaseUrl(): string {
  return `${backendOrigin()}/api`;
}
