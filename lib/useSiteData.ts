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

/**
 * Client hook that pulls editable content from the Laravel backend.
 * Everything is nullable so components fall back to their built-in defaults,
 * keeping the site fully functional even if the API is unreachable.
 */
export function useSiteData(): SiteData {
  const [data, setData] = useState<SiteData>(EMPTY);

  useEffect(() => {
    let active = true;
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
        //   null  = API injoignable (fetch échoué)  → repli démo autorisé
        //   []    = API OK mais aucun article        → état vide
        //   [...] = articles réels
        const rawBlog = blog?.data ?? blog;
        const blogData =
          blog == null ? null : Array.isArray(rawBlog) ? rawBlog : [];
        setData({
          settings: settings ?? null,
          projects: arr(projects),
          services: arr(services),
          testimonials: arr(testimonials),
          skills: skills && typeof skills === "object" && Object.keys(skills).length ? skills : null,
          experiences: arr(experiences),
          formations: arr(formations),
          blog: blogData,
          loaded: true,
        });
      }
    );

    return () => {
      active = false;
    };
  }, []);

  return data;
}
