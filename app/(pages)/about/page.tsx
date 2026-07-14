"use client";
import NewsletterForm from "@/components/NewsletterForm";
import { useState, useEffect, useRef } from "react";
import {
  FiPhone, FiMail, FiMapPin, FiArrowRight, FiGithub, FiLinkedin, FiTwitter,
  FiSend, FiLayers, FiAward,
  FiCheckCircle, FiCalendar, FiBookOpen, FiZap, FiTarget, FiUsers,
  FiDownload, FiCode, FiHeart,
  FiTrendingUp, FiMessageCircle, FiStar,
} from "react-icons/fi";
import { SiLaravel, SiReact } from "react-icons/si";
import Link from "next/link";
import { useSiteData } from "@/lib/useSiteData";
import { mediaUrl } from "@/lib/media";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string; }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[28px]"}`}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DONNÉES ÉDITABLES
// ─────────────────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Projets", href: "/projets" },
];

const heroTitle1 = "Je suis Morel.";
const heroTitle2 = "Développeur, penseur,";
const heroTitle3 = "constructeur.";
const heroSubtitle =
  "Je ne suis pas entré dans le développement par hasard. J'y suis entré parce que j'ai réalisé qu'on pouvait construire des choses qui comptent avec une machine, une connexion, et assez d'obstination.";
const heroQuote = "Le code, c'est ma façon de rendre les idées réelles.";
const heroLocation = "Cotonou, Bénin";
const heroCVHref = "/cv.pdf";

const storyEyebrow = "Mon histoire";
const storyHeadline = "Tout a commencé\npar une curiosité simple.";
const storyParagraphs = [
  "En 2023, j'ai ouvert mon premier éditeur de code avec une seule question en tête : comment est-ce qu'on construit des choses sur internet ? Cette curiosité m'a amené à passer des nuits sur des tutoriels, des forums, des erreurs incompréhensibles et à ne jamais vraiment vouloir m'arrêter.",
  "Je suis autodidacte dans l'âme. Pas parce que je n'avais pas accès à la formation mais parce que j'ai compris très vite que la vraie compréhension vient quand on construit quelque chose de réel. Alors j'ai construit. Des projets cassés, des projets qui tenaient debout, puis des projets dont je suis fier.",
  "Aujourd'hui, avec plus d'un an d'expérience active en développement full stack, je travaille sur des applications modernes avec Laravel et React. Et je prépare ma prochaine grande étape : le Data Engineering et les systèmes intelligents.",
];
const storyHighlight = {
  quote: "La différence entre un bon développeur et un excellent développeur, c'est que l'excellent ne cesse jamais d'apprendre  même quand ça ne fait pas partie du brief.",
  author: "GUELLY Morel H. R.",
};

const philosophyEyebrow = "Ma philosophie";
const philosophyHeadline = "Je ne construis pas\ndes interfaces. Je construis des expériences.";
const philosophySubtitle =
  "Il y a une différence entre du code qui fonctionne et du code qui dure. Entre une interface qui affiche et une interface qui communique. C'est cette différence qui m'obsède.";
const philosophyPoints = [
  {
    icon: <FiTarget size={20} />,
    title: "Chaque ligne a un rôle",
    desc: "Je n'écris pas de code pour remplir un fichier. Chaque décision technique répond à un besoin réel de l'utilisateur, du système, ou de l'équipe qui maintiendra le projet.",
  },
  {
    icon: <FiLayers size={20} />,
    title: "Penser système, pas fonctionnalité",
    desc: "Avant d'écrire une ligne, je pense à comment cette fonctionnalité s'intègre dans l'ensemble. Un bon produit est cohérent, pas juste fonctionnel.",
  },
  {
    icon: <FiUsers size={20} />,
    title: "L'utilisateur d'abord, toujours",
    desc: "La meilleure architecture du monde ne vaut rien si l'expérience utilisateur est confuse. Je conçois pour les humains, pas pour les machines.",
  },
  {
    icon: <FiCode size={20} />,
    title: "Le code propre est un acte de respect",
    desc: "Respect pour moi-même, pour les autres développeurs, pour le projet. Un code lisible est un code maintenable et un code maintenable, c'est un projet qui vit.",
  },
];

const dataEyebrow = "Pourquoi la Data ?";
const dataHeadline = "Parce que le code qui ne comprend pas\nla donnée est un outil à moitié aveugle.";
const dataBody = [
  "En travaillant sur des projets full stack, j'ai réalisé quelque chose : les meilleures décisions produit ne viennent pas de l'intuition, elles viennent des données. Et les développeurs qui comprennent à la fois le code et la donnée ont un avantage considérable.",
  "C'est pour ça que je suis en transition active vers le Data Engineering. Pas pour quitter le développement web, mais pour l'enrichir. Je veux être capable de construire un système de bout en bout : de l'interface utilisateur au pipeline de données, en passant par les insights.",
  "Python, Pandas, SQL avancé, pipelines ETL, infrastructure cloud, ce sont mes prochains terrains de jeu. Avec le même niveau d'obsession que quand j'ai appris à faire du développement full stack.",
];
const dataRoadmap = [
  { done: true, label: "Python (bases solides)" },
  { done: false, label: "Pandas & manipulation de données" },
  { done: false, label: "SQL avancé & optimisation" },
  { done: false, label: "AWS Cloud Practitioner" },
  { done: false, label: "Pipelines ETL & Airflow" },
  { done: false, label: "Machine Learning appliqué" },
];

const personalityEyebrow = "En dehors du code";
const personalityHeadline = "Un développeur, c'est aussi\nun être humain avec des idées.";
const personalityCards = [
  {
    icon: <FiBookOpen size={20} />,
    title: "Je lis pour penser mieux",
    desc: "Articles techniques, essais sur les systèmes, livres sur la product strategy. Je crois que les meilleurs développeurs sont aussi des personnes curieuses du monde.",
  },
  {
    icon: <FiMessageCircle size={20} />,
    title: "Je communique, pas juste je code",
    desc: "Un projet bien livré commence par une relation claire. J'aime expliquer mes choix, écouter les contraintes, et trouver des solutions ensemble, pas juste exécuter.",
  },
  {
    icon: <FiZap size={20} />,
    title: "L'obsession des détails",
    desc: "Un padding mal aligné, une animation trop lente, un message d'erreur flou. Ces détails me dérangent. Parce que ce sont eux que l'utilisateur ressent, même sans le savoir.",
  },
  {
    icon: <FiHeart size={20} />,
    title: "Fier de venir de Cotonou",
    desc: "Construire des produits tech depuis Cotonou, Bénin, avec les mêmes standards que n'importe où dans le monde, c'est ma façon de prouver que l'origine ne détermine pas le niveau.",
  },
];

const expEyebrow = "Parcours professionnel";
const expHeadline = "L'histoire derrière\nchaque ligne de code.";
const experiences = [
  {
    period: "2026 — Présent",
    role: "Développeur Full Stack",
    company: "Stagiaires / Ekla Solutions",
    location: "Cotonou, Bénin",
    active: true,
    desc: "Conception et développement d'applications web complètes pour des clients locaux et internationaux. Architecture Laravel + React/Next.js, APIs REST robustes, déploiement Vercel et Railway. Accompagnement des clients de la définition du besoin jusqu'à la mise en production.",
    tags: ["Laravel", "React", "Next.js", "MySQL", "REST API","Wordpress"],
  },
  {
    period: "2023 — 2026",
    role: "Développeur Web, Projets personnels",
    company: "Autoformation en ligne",
    location: "Cotonou, Bénin",
    active: false,
    desc: "Développement de projets personnels ambitieux pour solidifier les compétences : e-commerce multi-vendor avec panel admin Filament, CRM immobilier complet, dashboard analytics. Plusieurs centaines d'heures de pratique réelle sur des cas concrets.",
    tags: ["PHP", "Laravel", "React", "API REST", "MySQL"],
  },
  {
    period: "2023 — 2026",
    role: "Étudiant en formation informatique",
    company: "ESCAE-Bénin",
    location: "Bénin",
    active: false,
    desc: "Point de départ : HTML, CSS, JavaScript. Découverte de PHP puis de Laravel. Premiers projets fonctionnels, premières erreurs incompréhensibles, première fois que quelque chose marchait et que j'ai compris pourquoi. C'est ici que tout a commencé.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
  },
];

const formationsEyebrow = "Formations";
const formationsHeadline = "Apprendre en permanence,\nconstruire sans cesse.";
const formationsSubtitle =
  "Ma formation combine un cursus académique et une discipline d'auto-apprentissage intensive. Je crois que les meilleurs développeurs ne s'arrêtent jamais d'apprendre.";
const formations = [
  {
    icon: <FiBookOpen size={20} />,
    degree: "Licence en Informatique",
    school: "ESCAE-Bénin",
    year: "2026",
    desc: "Formation académique en informatique. Fondations solides en algorithmique, structures de données, génie logiciel et réseaux.",
    badge: "Terminé",
    badgeColor: "bg-green-500/15 text-green-400 border-green-500/25",
  },
  {
    icon: <FiAward size={20} />,
    degree: "Certification Laravel & PHP",
    school: "Autoformation en ligne",
    year: "Été 2025",
    desc: "Maîtrise approfondie du framework Laravel : API REST, authentification Sanctum, Filament admin, architecture MVC avancée, tests.",
    badge: "Certifié",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  },
  {
    icon: <FiTrendingUp size={20} />,
    degree: "Data Engineering — Python & SQL",
    school: "à venir",
    year: "2027",
    desc: "Pipelines ETL, manipulation de données avec Pandas, visualisation, bases de Machine Learning appliqué. Formation continue en parallèle des projets clients.",
    badge: "à venir",
    badgeColor: "bg-sky-500/15 text-sky-400 border-sky-500/25",
  },
];

const watchEyebrow = "Ma veille & mes ressources";
const watchHeadline = "Je reste en mouvement\npour rester pertinent.";
const watchItems = [
  { icon: <FiBookOpen size={16} />, label: "Blogs techniques", val: "Laravel News, Vercel Blog, Towards Data Science" },
  { icon: <FiZap size={16} />, label: "Podcasts", val: "Developer Tea, Syntax.fm, DataFramed" },
  { icon: <FiAward size={16} />, label: "Livres en cours", val: "Clean Code — R. Martin · The Pragmatic Programmer" },
  { icon: <FiCode size={16} />, label: "Outils explorés", val: "Cursor AI, LangChain, n8n, Supabase" },
  { icon: <FiUsers size={16} />, label: "Communautés", val: "GitHub, Dev.to, Discord Laravel France" },
];

const ctaEmail = "guellymorelhectoreramanou@gmail.com";
const ctaPhone = "+229 0150387702";
const ctaPhoneHref = "tel:+2290150387702";

const footerTagline = "Développeur Full Stack en transition vers le Data Engineering. Code propre, livraison rapide, impact mesurable.";
const footerContact = [
  { icon: <FiPhone size={13} />, val: "+229 0150387702", href: "tel:+2290150387702" },
  { icon: <FiMail size={13} />, val: "guellymorelhectoreramanou@gmail.com", href: "mailto:guellymorelhectoreramanou@gmail.com" },
  { icon: <FiMapPin size={13} />, val: "Cotonou, Bénin", href: "https://www.google.com/maps/search/?api=1&query=Cotonou%2C+B%C3%A9nin" },
];
const footerLinks = [
  { label: "Accueil", href: "/" },
  { label: "À Propos", href: "/about" },
  { label: "Projets", href: "/projets" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
const footerServices = [
  { label: "Développement Web", href: "/services#developpement-full-stack" },
  { label: "Data Engineering", href: "/services#transition-data-automatisation" },
  { label: "UI/UX Design", href: "/services#ux-moderne" },
  { label: "DevOps", href: "/services#performance-durabilite" },
  { label: "Formation", href: "/contact" },
];

// ─────────────────────────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Eyebrow({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <span className={`inline-block text-[11px] font-bold tracking-[3px] uppercase mb-3 ${light ? "text-blue-300" : "text-[#2563EB]"}`}>
      {text}
    </span>
  );
}

export default function AboutPage() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const site = useSiteData();
  const about = site.settings?.about ?? {};

  // ── Shared (settings-driven) footer / social / brand ──
  const s: any = site.settings;
  const f: any = s?.footer ?? {};
  const socialS: any = s?.social ?? {};
  const contactS: any = s?.contact ?? {};
  const fBrand = s?.navbar?.brand ?? f.brand ?? "GUELLY Morel";
  const fLogoInitials = s?.navbar?.logoInitials ?? "GM";
  const fTagline = f.tagline ?? footerTagline;
  const fCopyright = f.copyright
    ? String(f.copyright).replace("{year}", String(new Date().getFullYear()))
    : `© ${new Date().getFullYear()} GUELLY Morel. Tous droits réservés.`;
  const fBuiltWith = f.builtWith ?? "Conçu avec Next.js 14 · Laravel 11 · Tailwind CSS";
  const fLinks = Array.isArray(f.links) && f.links.length ? f.links : footerLinks;
  const fServices = Array.isArray(f.services) && f.services.length ? f.services : footerServices;
  const fNewsTitle = f.newsletterTitle ?? "Newsletter";
  const fNewsDesc = f.newsletterDesc ?? "Recevez mes derniers articles et projets directement.";
  const fContact = footerContact.map((it: any, i: number) => {
    if (i === 0) return { ...it, val: contactS.phone ?? it.val, href: contactS.phoneHref ?? it.href };
    if (i === 1) return { ...it, val: contactS.email ?? it.val, href: contactS.email ? `mailto:${contactS.email}` : it.href };
    return { ...it, val: contactS.address ?? it.val };
  });
  const footerSocialIcons = [
    { icon: <FiGithub key="gh" size={14} />, href: "https://github.com/morel156", label: "GitHub" },
    { icon: <FiLinkedin key="li" size={14} />, href: "https://www.linkedin.com/in/morel-guelly-a05a1b420?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
    { icon: <FiTwitter key="tw" size={14} />, href: "https://twitter.com/guellymorel", label: "Twitter" },
    { icon: <FiMail key="ml" size={14} />, href: "mailto:guellymorelhectoreramanou@gmail.com", label: "Email" },
  ];
  const socialLinks = footerSocialIcons.map((it: any) => {
    const k = String(it.label).toLowerCase();
    const url = k === "github" ? socialS.github : k === "linkedin" ? socialS.linkedin : k === "twitter" ? socialS.twitter : null;
    return { ...it, href: url && String(url).trim() ? String(url).trim() : it.href };
  });

  // Icon fallback pools (API returns icon NAME strings, not components).
  const philosophyIcons = philosophyPoints.map((p) => p.icon);
  const personalityIcons = personalityCards.map((c) => c.icon);
  const formationIcons = formations.map((f) => f.icon);
  const watchIconPool = watchItems.map((w) => w.icon);
  const formationBadgeColors = formations.map((f) => f.badgeColor);

  // ── Hero ──
  const heroTitle1V = about.heroTitle1 ?? heroTitle1;
  const heroTitle2V = about.heroTitle2 ?? heroTitle2;
  const heroTitle3V = about.heroTitle3 ?? heroTitle3;
  const heroSubtitleV = about.heroSubtitle ?? heroSubtitle;
  const heroQuoteV = about.heroQuote ?? heroQuote;
  const heroLocationV = about.location ?? heroLocation;
  // Lien du CV : fichier uploadé depuis l'admin (about.cvFile) → sinon URL
  // externe saisie (about.cvHref) → sinon le défaut du code (/cv.pdf).
  // cvFile peut arriver en string "cv/x.pdf" ou en tableau ["cv/x.pdf"].
  const cvFileRaw: string = Array.isArray(about.cvFile)
    ? String(about.cvFile[0] ?? "")
    : String(about.cvFile ?? "");
  const cvHrefV = cvFileRaw.trim()
    ? mediaUrl(cvFileRaw)
    : about.cvHref && String(about.cvHref).trim()
      ? String(about.cvHref)
      : heroCVHref;

  // ── Story ──
  const storyEyebrowV: string = about.eyebrow ?? storyEyebrow;
  const storyHeadlineV: string = about.storyHeadline ?? storyHeadline;
  const storyParagraphsV =
    Array.isArray(about.storyParagraphs) && about.storyParagraphs.length
      ? (about.storyParagraphs as any[]).map((p) => (typeof p === "string" ? p : p?.text ?? "")).filter(Boolean)
      : storyParagraphs;
  const storyHighlightV = {
    quote: about.storyHighlightQuote ?? storyHighlight.quote,
    author: about.storyHighlightAuthor ?? storyHighlight.author,
  };

  // ── Timeline (En bref) ──
  const timelineV =
    Array.isArray(about.timeline) && about.timeline.length
      ? (about.timeline as { year: string; event: string; done?: boolean; current?: boolean }[])
      : [
          { year: "2023", event: 'Premier éditeur de code. Premier "Hello World".', done: true },
          { year: "2025", event: "Premiers projets Laravel. Premières APIs. Premiers clients.", done: true },
          { year: "2026", event: "Full stack autonome. Freelance. Transition Data amorcée.", done: true, current: true },
          { year: "2027+", event: "Data Engineering, cloud, systèmes intelligents.", done: false },
        ];

  // ── Stats ──
  const statsV =
    Array.isArray(about.stats) && about.stats.length
      ? (about.stats as { n: number; s: string; l: string }[])
      : [
          { n: 1, s: "+", l: "An d'exp. active" },
          { n: 15, s: "+", l: "Projets construits" },
          { n: 5, s: "+", l: "Clients accompagnés" },
          { n: 1000, s: "+", l: "heures de pratique" },
        ];
  const statsIcons = [
    <FiCalendar size={18} key="s0" />,
    <FiCode size={18} key="s1" />,
    <FiUsers size={18} key="s2" />,
    <FiZap size={18} key="s3" />,
  ];

  // ── Philosophy ──
  const philosophyHeadlineV: string = about.philosophyHeadline ?? philosophyHeadline;
  const philosophySubtitleV: string = about.philosophySubtitle ?? philosophySubtitle;
  const philosophyPointsV =
    Array.isArray(about.philosophyPoints) && about.philosophyPoints.length
      ? (about.philosophyPoints as { title: string; desc: string }[]).map((p, i) => ({
          icon: philosophyIcons[i % philosophyIcons.length],
          title: p.title,
          desc: p.desc,
        }))
      : philosophyPoints;

  // ── Data section ──
  const dataHeadlineV: string = about.dataHeadline ?? dataHeadline;
  const dataBodyV =
    Array.isArray(about.dataBody) && about.dataBody.length
      ? (about.dataBody as any[]).map((p) => (typeof p === "string" ? p : p?.text ?? "")).filter(Boolean)
      : dataBody;
  const dataRoadmapV =
    Array.isArray(about.dataRoadmap) && about.dataRoadmap.length
      ? (about.dataRoadmap as { done: boolean; label: string }[])
      : dataRoadmap;

  // ── Personality ──
  const personalityHeadlineV: string = about.personalityHeadline ?? personalityHeadline;
  const personalityCardsV =
    Array.isArray(about.personalityCards) && about.personalityCards.length
      ? (about.personalityCards as { title: string; desc: string }[]).map((c, i) => ({
          icon: personalityIcons[i % personalityIcons.length],
          title: c.title,
          desc: c.desc,
        }))
      : personalityCards;

  // ── Watch items ──
  const watchItemsV =
    Array.isArray(about.watchItems) && about.watchItems.length
      ? (about.watchItems as { label: string; val: string }[]).map((w, i) => ({
          icon: watchIconPool[i % watchIconPool.length],
          label: w.label,
          val: w.val,
        }))
      : watchItems;

  // ── Experiences (from dedicated endpoint) ──
  const experiencesV =
    site.experiences && site.experiences.length
      ? site.experiences.map((e: any) => ({
          period: e.period ?? "",
          role: e.position ?? "",
          company: e.company ?? "",
          location: e.location ?? "",
          active: !!e.current,
          desc: e.description ?? "",
          tags: (Array.isArray(e.tags) ? e.tags : []) as string[],
        }))
      : experiences;

  // ── Formations (from dedicated endpoint) ──
  const formationsV =
    site.formations && site.formations.length
      ? site.formations.map((f: any, i: number) => ({
          icon: formationIcons[i % formationIcons.length],
          degree: f.title ?? "",
          school: f.institution ?? f.field_of_study ?? "",
          year: f.year ?? "",
          desc: f.description ?? "",
          badge: f.badge ?? "",
          badgeColor: formationBadgeColors[i % formationBadgeColors.length],
        }))
      : formations;

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-white font-['Inter',sans-serif] text-slate-800 overflow-x-hidden">

      {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navSolid ? "bg-[#0b1220]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.55)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-['Sora',sans-serif] font-extrabold text-white text-sm shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform">{fLogoInitials}</span>
            <span className="font-['Sora',sans-serif] text-lg font-extrabold text-white group-hover:opacity-90 transition">{fBrand}</span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}
                className={`relative text-sm font-medium transition-colors group ${item.href === "/about" ? "text-white" : "text-white/80 hover:text-white"}`}>
                {item.label}
                <span className={`absolute -bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full origin-left transition-transform duration-300 ${item.href === "/about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={ctaPhoneHref} title={ctaPhone} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
              <FiPhone size={15} />
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-white/10 transition-all">
              Discutons <FiArrowRight size={15} />
            </a>
          </div>
          <div className="flex md:hidden items-center gap-3">
            <a href={ctaPhoneHref} className="text-white" title={ctaPhone} aria-label={ctaPhone}><FiPhone size={18} /></a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-1" aria-label="Menu">
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-0.5 bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block h-0.5 bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0b1220]/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 border-b border-white/5 last:border-0 transition-colors ${item.href === "/about" ? "text-white" : "text-white/80 hover:text-white"}`}>{item.label}</Link>
            ))}
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-full">Discutons <FiArrowRight size={15} /></a>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="pt-16 relative bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563EB] min-h-[520px] flex items-center overflow-hidden">
        {/* Décos */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-cyan-500/15 blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-violet-600/15 blur-[130px]" />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-amber-400/10 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
          

          <div className="grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-16 items-center">
            {/* Left */}
            <div className="max-w-2xl">
              

              <h1 className="font-['Sora',sans-serif] font-extrabold text-white leading-tight mb-5 text-[clamp(2rem,6vw,3.5rem)]">
                {heroTitle1V}<br />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent">{heroTitle2V}</span><br />
                <span className="text-white/40">{heroTitle3V}</span>
              </h1>

              <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                {heroSubtitleV}
              </p>

              {/* Quote bar */}
              <div className="flex items-start gap-3 border-l-[3px] border-blue-400 pl-4 mb-8">
                <p className="text-white/75 text-sm italic leading-relaxed">"{heroQuoteV}"</p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-lg shadow-black/20">
                  <FiMail size={15} /> Me contacter
                </Link>
                <a href={cvHrefV} download target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
                  <FiDownload size={15} /> Télécharger CV
                </a>
              </div>
            </div>

            {/* Right — identity card (desktop only) */}
            {/* Right — photo (desktop only) */}
<div className="hidden lg:block">
  <div className="relative w-64 xl:w-72">
    {/* Anneaux décoratifs derrière la carte */}
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] aspect-square rounded-full border border-cyan-300/20" />
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[112%] aspect-square rounded-full border border-violet-300/15" />
    {/* Carte photo */}
    <div className="relative rounded-[32px] overflow-hidden w-full aspect-[3/4] shadow-2xl shadow-black/40 border-2 border-white/20">
      <img
        src="/6.png"
        alt="GUELLY Morel H. R."
        className="absolute inset-0 w-full h-full object-cover object-[78%_top]"
      />
      {/* Overlay dégradé bas */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      {/* Nom sur la photo */}
      <div className="absolute bottom-0 inset-x-0 px-5 pb-5">
        <p className="font-['Sora',sans-serif] text-white font-extrabold text-sm leading-tight">GUELLY Morel H. R.</p>
        <p className="text-white/60 text-xs mt-0.5">Full Stack Developer</p>
      </div>
    </div>

    {/* Badge localisation */}
    <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-2.5 shadow-lg shadow-black/20 flex items-center gap-2">
      <FiMapPin size={13} className="text-[#2563EB] flex-shrink-0" />
      <span className="text-slate-700 text-xs font-semibold">{heroLocationV}</span>
    </div>

    {/* Chip flottante — stack technique */}
    <div className="absolute z-20 -left-10 top-1/3 bg-white/90 backdrop-blur-md rounded-2xl px-3 py-2 shadow-[0_18px_40px_-12px_rgba(15,23,42,0.45)] border border-white flex items-center gap-2 animate-float [animation-delay:0.4s]">
      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white flex-shrink-0"><SiLaravel size={14} /></span>
      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white flex-shrink-0"><SiReact size={14} /></span>
    </div>

    {/* Chip flottante — qualité */}
    <div className="absolute z-20 -right-8 bottom-8 bg-white/90 backdrop-blur-md rounded-2xl px-3 py-2 shadow-[0_18px_40px_-12px_rgba(15,23,42,0.45)] border border-white animate-float [animation-delay:1.1s]">
      <div className="flex items-center gap-0.5 mb-0.5">
        {[0, 1, 2, 3, 4].map((s) => (
          <FiStar key={s} size={11} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-slate-700 text-[10px] font-bold leading-none">Qualité</p>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* ── STATS RAPIDES ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100 shadow-sm">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 left-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-1/5 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100">
            {statsV.map(({ n, s, l }, i) => (
              <div key={l} className="group bg-white px-5 py-5 sm:py-6 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]}`}>
                  {statsIcons[i % statsIcons.length]}
                </div>
                <div>
                  <div className="font-['Sora',sans-serif] text-xl sm:text-2xl font-extrabold text-[#2563EB] leading-none">
                    <AnimatedCounter target={n} suffix={s} />
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5 leading-tight">{l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTOIRE ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20 bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 left-1/5 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/2 right-1/5 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            {/* Left — text */}
            <Reveal>
            <div>
              <Eyebrow text={storyEyebrowV} />
              <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 mb-6 leading-snug text-[clamp(1.5rem,4vw,2.25rem)]">
                {storyHeadlineV.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <div className="space-y-4">
                {storyParagraphsV.map((p, i) => (
                  <p key={i} className="text-slate-500 text-sm sm:text-base leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
            </Reveal>

            {/* Right — quote + timeline */}
            <div className="space-y-5">
              {/* Quote card */}
              <div className="relative bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-2xl p-6 sm:p-7 border border-blue-100">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-lg shadow-blue-300/40">
                  <span className="text-white font-['Sora',sans-serif] font-extrabold text-3xl leading-none mt-1">"</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-3 mt-1">
                  {storyHighlightV.quote}
                </p>
                <p className="text-[#2563EB] font-bold text-xs">{storyHighlightV.author}</p>
              </div>

              {/* Timeline */}
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[3px] mb-5">En bref</p>
                <div className="relative">
                  <div className="absolute left-[39px] top-3 bottom-3 w-px bg-blue-100" />
                  <div className="space-y-5">
                    {timelineV.map(({ year, event, done, current }) => (
                      <div key={year} className="flex gap-4 items-start">
                        <span className={`font-['Sora',sans-serif] text-xs font-extrabold w-[38px] text-right flex-shrink-0 mt-0.5 ${current ? "text-[#2563EB]" : done ? "text-slate-400" : "text-blue-300"}`}>
                          {year}
                        </span>
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 z-10 border-2 ${
                          current ? "bg-[#2563EB] border-[#2563EB]" : done ? "bg-white border-blue-300" : "bg-white border-blue-200"
                        }`} />
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHIE ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20 bg-slate-50">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 left-1/5 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <Reveal>
          <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
            <Eyebrow text={philosophyEyebrow} />
            <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug mb-4 text-[clamp(1.5rem,4vw,2rem)]">
              {philosophyHeadlineV.split("\n").map((line, i) => (
                <span key={i} className={i === 1 ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent" : ""}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">{philosophySubtitleV}</p>
          </div>
          </Reveal>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {philosophyPointsV.map(({ icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.1} className="h-full">
              <div
                className={`h-full rounded-2xl p-6 sm:p-8 border transition-all duration-200 hover:shadow-lg hover:border-blue-200 group ${
                  i % 2 === 0 ? "bg-white border-slate-100" : "bg-[#EFF6FF] border-blue-100"
                }`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white mb-5 shadow-md shadow-blue-400/20 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]}`}>
                  {icon}
                </div>
                <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-base mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI LA DATA ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563EB] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-[130px]" />
          <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-violet-600/20 blur-[130px]" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-amber-500/12 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left — text */}
            <Reveal>
            <div>
              <Eyebrow text={dataEyebrow} light />
              <h2 className="font-['Sora',sans-serif] font-extrabold text-white leading-snug mb-6 text-[clamp(1.4rem,3.5vw,1.875rem)]">
                {dataHeadlineV.split("\n").map((line, i) => (
                  <span key={i} className={i === 1 ? "bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent" : ""}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <div className="space-y-4">
                {dataBodyV.map((p, i) => (
                  <p key={i} className="text-white/70 text-sm leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
            </Reveal>

            {/* Right — roadmap */}
            <div className="bg-white/10 border border-white/15 rounded-2xl p-6 sm:p-7">
              <p className="text-white/50 text-[11px] font-bold uppercase tracking-[3px] mb-6">Ma roadmap Data</p>
              <div className="space-y-4">
                {dataRoadmapV.map(({ done, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      done ? "bg-green-500/20" : "bg-white/10"
                    }`}>
                      <FiCheckCircle size={13} className={done ? "text-green-400" : "text-white/20"} />
                    </div>
                    <span className={`text-sm flex-1 ${done ? "text-white" : "text-white/35"}`}>{label}</span>
                    {!done && (
                      <span className="text-[11px] font-semibold text-blue-300 bg-blue-500/20 border border-blue-400/20 px-2 py-0.5 rounded-md flex-shrink-0">
                        À venir
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSONNALITÉ ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20 bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 left-1/3 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/2 left-1/5 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
          <div className="text-center mb-10 sm:mb-12">
            <Eyebrow text={personalityEyebrow} />
            <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug text-[clamp(1.5rem,4vw,2rem)]">
              {personalityHeadlineV.split("\n").map((line, i) => (
                <span key={i} className={i === 1 ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent" : ""}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
          </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {personalityCardsV.map(({ icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.1} className="h-full">
              <div
                className="group h-full bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-200">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]}`}>
                  {icon}
                </div>
                <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-sm mb-2">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPÉRIENCES ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20 bg-slate-50">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-1/5 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <Eyebrow text={expEyebrow} />
            <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug text-[clamp(1.5rem,4vw,2rem)]">
              {expHeadline.split("\n").map((line, i) => (
                <span key={i} className={i === 1 ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent" : ""}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
          </div>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-blue-200 hidden sm:block" />

              <div className="space-y-5">
                {experiencesV.map(({ period, role, company, location, active, desc, tags }, i) => (
                  <Reveal key={`${role}-${i}`} delay={i * 0.1} className="flex gap-4 sm:gap-6 items-start">
                    {/* Dot — hidden on mobile, shown on sm+ */}
                    <div className="hidden sm:flex flex-col items-center flex-shrink-0 pt-5">
                      <div className={`w-3 h-3 rounded-full border-2 z-10 ${
                        active
                          ? "bg-[#2563EB] border-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                          : "bg-white border-blue-300"
                      }`} />
                    </div>

                    {/* Card */}
                    <div className={`flex-1 rounded-2xl border transition-all duration-200 ${
                      active
                        ? "bg-white border-blue-200 shadow-md shadow-blue-100/40"
                        : "bg-white border-slate-100 hover:shadow-sm"
                    }`}>
                      {/* Card header */}
                      <div className="p-4 sm:p-6 pb-4">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-base leading-tight">{role}</h3>
                              {active && (
                                <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-green-200 flex-shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Actuel
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 text-slate-500 text-xs">
                              <span className="font-semibold text-[#2563EB]">{company}</span>
                              <span className="text-slate-300">·</span>
                              <FiMapPin size={11} className="text-slate-400" />
                              <span>{location}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#2563EB] text-xs font-bold bg-blue-50 border border-blue-100 px-2.5 py-1.5 rounded-lg flex-shrink-0">
                            <FiCalendar size={11} /> {period}
                          </div>
                        </div>

                        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                      </div>

                      {/* Tags */}
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-wrap gap-2">
                        {tags.map((t) => (
                          <span key={t} className="bg-[#EFF6FF] text-[#2563EB] text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-blue-100">{t}</span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMATIONS ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20 bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 left-1/5 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/2 right-1/5 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left */}
            <Reveal>
            <div>
              <Eyebrow text={formationsEyebrow} />
              <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 mb-4 leading-snug text-[clamp(1.5rem,4vw,2rem)]">
                {formationsHeadline.split("\n").map((line, i) => (
                  <span key={i} className={i === 1 ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent" : ""}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{formationsSubtitle}</p>

              {/* Quote */}
              <div className="relative bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-2xl p-6 border border-blue-100">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-['Sora',sans-serif] font-extrabold text-2xl leading-none mt-0.5">"</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic mt-1">
                  Le meilleur code que j'ai écrit n'était pas le plus complexe,
                  c'était celui que n'importe qui d'autre pouvait comprendre et faire évoluer.
                </p>
                <p className="text-[#2563EB] font-bold text-xs mt-3">— GUELLY Morel H. R.</p>
              </div>
            </div>
            </Reveal>

            {/* Right — formation cards */}
            <div className="space-y-4">
              {formationsV.map(({ icon, degree, school, year, desc, badge, badgeColor }, i) => (
                <Reveal key={`${degree}-${i}`} delay={i * 0.1}>
                <div
                  className="group bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-200">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]}`}>
                        {icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-sm leading-tight mb-0.5">{degree}</h3>
                        <p className="text-[#2563EB] text-xs font-semibold">{school}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${badgeColor}`}>{badge}</span>
                      <span className="text-slate-400 text-xs">{year}</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VEILLE & RESSOURCES ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#0f172a] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-[130px]" />
          <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-violet-600/20 blur-[130px]" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-amber-500/12 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
          <div className="text-center mb-10 sm:mb-12">
            <Eyebrow text={watchEyebrow} light />
            <h2 className="font-['Sora',sans-serif] font-extrabold text-white leading-snug text-[clamp(1.5rem,4vw,2rem)]">
              {watchHeadline.split("\n").map((line, i) => (
                <span key={i} className={i === 1 ? "bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent" : ""}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
          </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {watchItemsV.map(({ icon, label, val }, i) => (
              <Reveal key={`${label}-${i}`} delay={i * 0.1} className="h-full">
              <div
                className="group h-full bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-blue-400/25 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]}`}>
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/45 text-[11px] font-bold uppercase tracking-[2px] mb-1">{label}</p>
                    <p className="text-white/75 text-sm leading-relaxed">{val}</p>
                  </div>
                </div>
              </div>
              </Reveal>
            ))}

            {/* CTA card */}
            <Link href="/blog"
              className="group bg-[#2563EB]/20 border border-blue-400/30 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-[#2563EB]/30 transition-all duration-200 min-h-[80px]">
              <p className="text-blue-300 font-bold text-sm mb-1 group-hover:text-white transition-colors">Lire mes articles</p>
              <p className="text-white/40 text-xs mb-3">J'écris sur ce que j'apprends</p>
              <FiArrowRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 left-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-tight mb-4 text-[clamp(1.7rem,5vw,2.75rem)]">
            Vous avez un projet ambitieux ?<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Parlons-en.</span>
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
            Freelance, CDI, conseil, je suis ouvert aux échanges. Si votre projet mérite mieux qu'une interface ordinaire, contactez-moi.
          </p>

          {/* Contact buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
            <a href={`mailto:${ctaEmail}`}
              className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl text-sm transition-colors shadow-lg shadow-blue-200">
              <FiMail size={16} className="flex-shrink-0" />
              <span className="break-all sm:break-normal">{ctaEmail}</span>
            </a>
            <a href={ctaPhoneHref}
              className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 font-bold px-6 py-4 rounded-xl text-sm hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
              <FiPhone size={16} className="flex-shrink-0" /> {ctaPhone}
            </a>
          </div>

          
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1e293b] pt-12 sm:pt-14 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 via-violet-500 to-amber-400" />
        <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10">
            <div className="sm:col-span-2 md:col-span-1">
              <p className="font-['Sora',sans-serif] text-xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent w-fit mb-3">{fBrand}</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">{fTagline}</p>
              <div className="space-y-2.5">
                {fContact.map(({ icon, val, href }, i) => (
                  <a key={val} href={href} className="flex items-center gap-2 text-slate-400 text-xs hover:text-white transition-colors">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br ${["from-cyan-400 to-blue-500","from-violet-500 to-purple-600","from-amber-500 to-orange-600"][i]}`}>{icon}</span>
                    <span className="break-all sm:break-normal">{val}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white font-bold text-sm mb-4">Liens Utiles</p>
              <ul className="space-y-2.5">
                {fLinks.map((link) => (
                  <li key={link.label}><a href={link.href} className="text-slate-400 hover:text-blue-400 text-xs transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white font-bold text-sm mb-4">Ce que je fais</p>
              <ul className="space-y-2.5">
                {fServices.map((link) => (
                  <li key={link.label}><a href={link.href} className="text-slate-400 text-xs hover:text-blue-400 transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white font-bold text-sm mb-3">{fNewsTitle}</p>
              <p className="text-slate-400 text-xs mb-4">{fNewsDesc}</p>
              <NewsletterForm />
             <div className="flex gap-2">
                {socialLinks.map(({ icon, href, label }, i) => ( <a

                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    title={label}
                    className={`w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer hover:scale-110 ${["hover:bg-gradient-to-br hover:from-slate-500 hover:to-slate-700","hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-600","hover:bg-gradient-to-br hover:from-cyan-400 hover:to-blue-500","hover:bg-gradient-to-br hover:from-amber-500 hover:to-orange-600"][i]}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500 text-xs text-center">
            <p>{fCopyright}</p>
            <p>{fBuiltWith}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}