"use client";

import { useEffect, useState } from "react";
import { apiBaseUrl } from "./backend";

export interface SiteSettings {
  navbar?: Record<string, any>;
  hero?: Record<string, any>;
  about?: Record<string, any>;
  contact?: Record<string, any>;
  footer?: Record<string, any>;
  social?: Record<string, any>;
  seo?: Record<string, any>;
  trust?: any[];
  // Groupes de textes de sections éditables (accueil + pages)
  home?: Record<string, any>;
  sv?: Record<string, any>;
  pj?: Record<string, any>;
  bl?: Record<string, any>;
  ct?: Record<string, any>;
}

export interface SiteData {
  settings: SiteSettings | null;
  projects: any[] | null;
  services: any[] | null;
  testimonials: any[] | null;
  skills: Record<string, any[]> | null;
  experiences: any[] | null;
  formations: any[] | null;
  blog: any[] | null;
  loaded: boolean;
}

const EMPTY: SiteData = {
  settings: null,
  projects: null,
  services: null,
  testimonials: null,
  skills: null,
  experiences: null,
  formations: null,
  blog: null,
  loaded: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// Cache navigateur (stale-while-revalidate).
//
// L'hébergement gratuit (Render) endort le backend : au réveil, les données
// mettent 30-60s à arriver. Pour qu'un visiteur qui REVIENT ne voie jamais
// les données par défaut : on affiche immédiatement la dernière version
// connue (localStorage), puis on rafraîchit en arrière-plan dès que l'API
// répond. Seule la toute première visite affiche les valeurs par défaut.
// ─────────────────────────────────────────────────────────────────────────────
const CACHE_KEY = "site_data_cache_v1";

function readCache(): SiteData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return { ...EMPTY, ...parsed, loaded: true };
  } catch {
    return null;
  }
}

function writeCache(data: SiteData) {
  try {
    const { loaded: _loaded, ...rest } = data;
    localStorage.setItem(CACHE_KEY, JSON.stringify(rest));
  } catch {
    /* stockage plein ou bloqué : le cache est un bonus, jamais bloquant */
  }
}

/**
 * Client hook that pulls editable content from the Laravel backend.
 * Everything is nullable so components fall back to their built-in defaults,
 * keeping the site fully functional even if the API is unreachable.
 */
export function useSiteData(): SiteData {
  const [data, setData] = useState<SiteData>(EMPTY);

  useEffect(() => {
    let active = true;

    // 1) Affichage instantané de la dernière version connue (si elle existe).
    const cached = readCache();
    if (cached) setData(cached);

    // 2) Rafraîchissement depuis l'API (le fetch attend le réveil du serveur).
    const API_BASE_URL = apiBaseUrl();
    const get = (path: string) =>
      fetch(`${API_BASE_URL}${path}`, {
        headers: { Accept: "application/json" },
        // Toujours récupérer la version fraîche : les modifs de l'admin
        // apparaissent immédiatement sur le site, sans cache navigateur.
        cache: "no-store",
      })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);

    Promise.all([
      get("/settings"),
      get("/projects"),
      get("/services"),
      get("/testimonials"),
      get("/skills"),
      get("/experiences"),
      get("/formations"),
      get("/blog"),
    ]).then(
      ([settings, projects, services, testimonials, skills, experiences, formations, blog]) => {
        if (!active) return;
        const arr = (v: any) => (Array.isArray(v) && v.length ? v : null);
        // Pour le blog on distingue 3 cas (pour ne PAS afficher de faux
        // articles de démo quand l'admin a volontairement 0 article) :
        //   null  = API injoignable (fetch échoué)  → repli cache/défauts
        //   []    = API OK mais aucun article        → état vide
        //   [...] = articles réels
        const rawBlog = blog?.data ?? blog;
        const blogData =
          blog == null ? null : Array.isArray(rawBlog) ? rawBlog : [];

        const apiFailed =
          settings == null && projects == null && services == null &&
          testimonials == null && skills == null && experiences == null &&
          formations == null && blog == null;

        if (apiFailed) {
          // API totalement injoignable : on garde le cache s'il existe,
          // sinon on signale simplement « chargé » (défauts codés en dur).
          setData((prev) => ({ ...prev, loaded: true }));
          return;
        }

        const fresh: SiteData = {
          settings: settings ?? null,
          projects: arr(projects),
          services: arr(services),
          testimonials: arr(testimonials),
          skills: skills && typeof skills === "object" && Object.keys(skills).length ? skills : null,
          experiences: arr(experiences),
          formations: arr(formations),
          blog: blogData,
          loaded: true,
        };
        setData(fresh);
        writeCache(fresh);
      }
    );

    return () => {
      active = false;
    };
  }, []);

  return data;
}
