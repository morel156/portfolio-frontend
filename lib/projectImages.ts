// ─────────────────────────────────────────────────────────────────────────
// Captures réelles des projets, codées en dur.
//
// Les projets remontés par l'admin transportent un `featured_image` servi par
// le backend. Dès que celui-ci est éteint (Render s'endort), cette URL ne
// répond plus — et un `featured_image` mal renseigné côté admin affichait la
// capture de StabilIT sur tous les projets. Le site doit rester juste sans le
// backend : pour les projets connus, la capture locale fait donc autorité,
// quoi que dise l'API.
//
// Un projet ajouté plus tard depuis l'admin n'est pas listé ici : il garde
// naturellement l'image envoyée par l'API.
// ─────────────────────────────────────────────────────────────────────────

/** Capture locale de chaque projet, indexée par domaine de démo. */
const IMAGE_BY_DOMAIN: Record<string, string> = {
  "stabilit.onrender.com": "/Accueil_partie1.png",
  "cabinet-dentaire-theewite.vercel.app": "/theewite.png",
  "clarabeautysite.vercel.app": "/clara-beauty.png",
};

/**
 * Repli quand l'URL de démo manque ou change : on reconnaît le projet à son
 * titre ou à son slug.
 */
const IMAGE_BY_NAME: Array<[RegExp, string]> = [
  [/stabilit/i, "/Accueil_partie1.png"],
  [/theewite|treewhite|dentaire/i, "/theewite.png"],
  [/clara/i, "/clara-beauty.png"],
];

/** Domaine nu d'une URL ("https://exemple.com/page" → "exemple.com"). */
function domainOf(url?: string | null): string {
  if (!url) return "";
  return url
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[/?#].*$/, "")
    .toLowerCase();
}

type ProjectLike = {
  demo_url?: string | null;
  title?: string | null;
  slug?: string | null;
};

/**
 * Capture codée en dur d'un projet, ou "" s'il n'en fait pas partie.
 * À utiliser en priorité sur l'image renvoyée par l'API.
 */
export function hardcodedProjectImage(project: ProjectLike): string {
  const byDomain = IMAGE_BY_DOMAIN[domainOf(project.demo_url)];
  if (byDomain) return byDomain;

  const haystack = `${project.title ?? ""} ${project.slug ?? ""}`;
  for (const [pattern, image] of IMAGE_BY_NAME) {
    if (pattern.test(haystack)) return image;
  }
  return "";
}
