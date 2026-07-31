# portfolio-frontend

Site portfolio personnel de **GUELLY Morel Hectore Ramanou**, développeur Full Stack basé à Cotonou (Bénin). Construit avec Next.js (App Router) et TypeScript, ce site présente son parcours, ses services et ses projets, avec un contenu piloté dynamiquement depuis un backend Laravel (`portfolio-backend`).

## Ce que présente le site

Le site est structuré en plusieurs pages (`app/(pages)/...`) :

- **Accueil** (`app/page.tsx`) — page principale avec navbar, hero, badges de confiance, section « Ce qui me définit », présentation courte, services proposés, carrousel de projets vedettes, processus de travail en 4 étapes, stack technique, expertise élargie (WordPress, Vibe Coding, développement agentique), roadmap (aujourd'hui / demain / ensuite), témoignages clients, FAQ, formulaire de contact, aperçu du blog et footer avec newsletter.
- **À propos** (`about/`) — présentation détaillée du profil.
- **Projets** (`projets/`) — liste complète des projets réalisés (ex. StabilIT, plateforme SaaS/IA de diagnostic de faisabilité de projets numériques).
- **Services** (`services/`) — détail des prestations : développement Full Stack (Laravel, Next.js, APIs), architecture & conseil, data systems (à venir), mentoring/formation.
- **Blog** (`blog/`) — articles publiés, alimentés depuis le backend.
- **Contact** (`contact/`) — formulaire de contact connecté à l'API (`POST /api/contact`).

Le contenu (textes, projets, articles, réglages de la navbar/footer) est éditable depuis un dashboard admin côté backend et remonte via l'API ; des valeurs par défaut codées en dur servent de repli si l'API est indisponible (voir `lib/useSiteData.ts` et `lib/site.ts`).

## Stack technique

- **Framework** : Next.js 16 (App Router) + React 19, en TypeScript
- **Style** : Tailwind CSS 4
- **Animations** : Framer Motion, GSAP
- **3D** : Three.js via `@react-three/fiber` et `@react-three/drei`
- **Icônes** : react-icons
- **Requêtes HTTP** : axios / fetch natif
- **Lint** : ESLint (config Next.js)

## Lancer le projet en local

Prérequis : Node.js et npm.

```bash
npm install
npm run dev
```

Le site est alors accessible sur [http://localhost:3000](http://localhost:3000).

Autres scripts disponibles :

```bash
npm run build   # build de production
npm run start   # démarrage en mode production (après build)
npm run lint    # vérification ESLint
```

## Connexion au backend (portfolio-backend)

Le frontend consomme une API Laravel pour le contenu dynamique (projets, articles de blog, réglages du site, formulaire de contact, newsletter). La résolution de l'URL du backend (`lib/backend.ts`) gère trois contextes :

- **Production** : via la variable d'environnement `NEXT_PUBLIC_BACKEND_URL` (ou `NEXT_PUBLIC_API_URL`), pointant vers le backend déployé (ex. Railway).
- **Local (Herd/Windows)** : force l'IPv4 (`http://127.0.0.1:8001`), le backend Laravel local n'écoutant que sur `127.0.0.1`.
- **Accès LAN** (test depuis un téléphone ou un autre poste) : réutilise l'hôte de la page courante sur le port du backend.

Pour pointer vers un backend local ou distant, définir dans `.env.local` :

```
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8001
```

(ou l'URL du backend déployé en production).
