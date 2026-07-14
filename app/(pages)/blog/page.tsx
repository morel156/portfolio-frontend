"use client";
import NewsletterForm from "@/components/NewsletterForm";
import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiSearch, FiPhone, FiMail, FiMapPin, FiArrowRight, FiX,
  FiClock, FiUser, FiTag, FiCalendar, FiGithub, FiLinkedin,
  FiTwitter, FiSend, FiTrendingUp, FiFilter, FiChevronRight,
  FiBookOpen, FiZap, FiCode
} from "react-icons/fi";
import { useSiteData } from "@/lib/useSiteData";
import { mediaUrl } from "@/lib/media";

// ─────────────────────────────────────────────────────────────────────────────
// ██████████████████████████  DONNÉES ÉDITABLES  ██████████████████████████████
// ─────────────────────────────────────────────────────────────────────────────

// ── NAVBAR ────────────────────────────────────────────────────────────────────
const navBrand = "GUELLY Morel";
const navPhone = "+229 0150387702";
const navPhoneHref = "tel:+2290150387702";
const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Projets", href: "/projets" },
];

// ── BLOG PAGE DATA ───────────────────────────────────────────────────────────
const blogPageTitle = "Partage de connaissances & insights.";
const blogPageSubtitle = "Articles, tutoriels et réflexions sur le développement full stack, l'architecture web et l'évolution vers le Data Engineering.";

const categories = [
  { id: "all", label: "Tous les articles", count: 12 },
  { id: "full-stack", label: "Full Stack", count: 3 },
  { id: "laravel", label: "Laravel", count: 4 },
  { id: "react", label: "React", count: 3 },
  { id: "data", label: "Data Engineering", count: 2 },
  { id: "devops", label: "DevOps", count: 2 },
  { id: "ui-ux", label: "UI/UX", count: 3 },
];

const allArticles = [
  {
    id: 1,
    title: "Les bases des pipelines ETL avec Python et Pandas",
    slug: "pipelines-etl-python-pandas",
    excerpt: "Découvrez comment construire des pipelines ETL robustes et scalables avec Python. Guide complet du Extract au Load.",
    content: "Lorem ipsum dolor sit amet...",
    category: "data",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "15 Jan 2025",
    readTime: "8 min",
    featured: true,
    image: "/18.jpg",
    tags: ["Python", "Pandas", "Data Engineering", "ETL"],
    views: 1240,
  },
  {
    id: 2,
    title: "API REST robuste avec Laravel 11 et Sanctum",
    slug: "api-rest-laravel-11-sanctum",
    excerpt: "Construisez une API REST production-ready avec Laravel 11. Authentification sécurisée, validation et gestion des erreurs.",
    content: "Lorem ipsum dolor sit amet...",
    category: "laravel",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "3 Jan 2025",
    readTime: "12 min",
    featured: true,
    image: "/19.jpg",
    tags: ["Laravel", "API", "PHP", "Sanctum"],
    views: 2156,
  },
  {
    id: 3,
    title: "App Router Next.js 14 : migration et bonnes pratiques",
    slug: "nextjs-14-app-router-migration",
    excerpt: "Migrez votre projet Next.js vers l'App Router avec confiance. Bonnes pratiques et patterns modernes expliqués.",
    content: "Lorem ipsum dolor sit amet...",
    category: "react",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "20 Déc 2024",
    readTime: "10 min",
    featured: true,
    image: "/13.jpg",
    tags: ["Next.js", "React", "JavaScript", "App Router"],
    views: 1890,
  },
  {
    id: 4,
    title: "Optimisation SEO technique pour les Core Web Vitals",
    slug: "seo-technique-core-web-vitals",
    excerpt: "Comment optimiser vos Core Web Vitals et améliorer votre SEO technique. Métriques, outils et stratégies.",
    content: "Lorem ipsum dolor sit amet...",
    category: "full-stack",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "15 Déc 2024",
    readTime: "11 min",
    featured: false,
    image: "/14.jpg",
    tags: ["SEO", "Performance", "Web Vitals", "Optimisation"],
    views: 1450,
  },
  {
    id: 5,
    title: "Docker pour développeurs : du développement à la production",
    slug: "docker-developpeurs-production",
    excerpt: "Guide pratique Docker. Containers, images, compose et déploiement en production expliqués simplement.",
    content: "Lorem ipsum dolor sit amet...",
    category: "devops",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "8 Déc 2024",
    readTime: "15 min",
    featured: false,
    image: "/15.jpg",
    tags: ["Docker", "DevOps", "Containers", "Production"],
    views: 2001,
  },
  {
    id: 6,
    title: "React Hooks avancés : useContext et useReducer",
    slug: "react-hooks-usecontext-usereducer",
    excerpt: "Maîtrisez les hooks avancés de React. Gestion d'état globale et patterns réutilisables avec useContext et useReducer.",
    content: "Lorem ipsum dolor sit amet...",
    category: "react",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "1 Déc 2024",
    readTime: "9 min",
    featured: false,
    image: "/16.jpg",
    tags: ["React", "Hooks", "State Management", "JavaScript"],
    views: 1678,
  },
  {
    id: 7,
    title: "Design Patterns Laravel : Repository et Service Locator",
    slug: "design-patterns-laravel",
    excerpt: "Apprenez les design patterns essentiels en Laravel. Repository pattern, Service Locator et architecture propre.",
    content: "Lorem ipsum dolor sit amet...",
    category: "laravel",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "25 Nov 2024",
    readTime: "13 min",
    featured: false,
    image: "/17.jpg",
    tags: ["Laravel", "Design Patterns", "Architecture", "PHP"],
    views: 1234,
  },
  {
    id: 8,
    title: "Machine Learning avec Scikit-learn : premiers pas",
    slug: "machine-learning-scikit-learn",
    excerpt: "Introduction au Machine Learning avec Python et Scikit-learn. Classification, régression et évaluation de modèles.",
    content: "Lorem ipsum dolor sit amet...",
    category: "data",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "18 Nov 2024",
    readTime: "14 min",
    featured: false,
    image: "/10.png",
    tags: ["Python", "Scikit-learn", "Machine Learning", "Data Science"],
    views: 1567,
  },
  {
    id: 9,
    title: "Tailwind CSS : du utility-first à la architecture CSS propre",
    slug: "tailwind-css-utility-first",
    excerpt: "Maîtrisez Tailwind CSS. De la syntaxe utility-first à l'organisation d'une architecture CSS maintenable et scalable.",
    content: "Lorem ipsum dolor sit amet...",
    category: "ui-ux",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "10 Nov 2024",
    readTime: "7 min",
    featured: false,
    image: "/11.png",
    tags: ["Tailwind", "CSS", "UI Design", "Frontend"],
    views: 2345,
  },
  {
    id: 10,
    title: "Database Optimization : indexation et requêtes SQL efficaces",
    slug: "database-optimization-sql",
    excerpt: "Optimisez vos bases de données. Indexation, EXPLAIN, query optimization et best practices pour la performance.",
    content: "Lorem ipsum dolor sit amet...",
    category: "devops",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "3 Nov 2024",
    readTime: "12 min",
    featured: false,
    image: "/12.png",
    tags: ["SQL", "Database", "Performance", "Optimization"],
    views: 1890,
  },
  {
    id: 11,
    title: "Composants React réutilisables : patterns et bonnes pratiques",
    slug: "react-composants-reutilisables",
    excerpt: "Créez des composants React vraiment réutilisables. Props, composition et patterns pour une architecture scalable.",
    content: "Lorem ipsum dolor sit amet...",
    category: "react",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "27 Oct 2024",
    readTime: "10 min",
    featured: false,
    image: "/16.jpg",
    tags: ["React", "Components", "Architecture", "JavaScript"],
    views: 1456,
  },
  {
    id: 12,
    title: "UX Design Principles : psychologie de l'interaction utilisateur",
    slug: "ux-design-principles-psychologie",
    excerpt: "Comprendre la psychologie de l'utilisateur. Principes de UX design appliqués pour créer des expériences mémorables.",
    content: "Lorem ipsum dolor sit amet...",
    category: "ui-ux",
    author: { name: "Morel GUELLY", image: "/avatar.jpg" },
    date: "20 Oct 2024",
    readTime: "9 min",
    featured: false,
    image: "/18.jpg",
    tags: ["UX Design", "Psychology", "User Experience", "Design"],
    views: 1123,
  },
];

// ── FOOTER ────────────────────────────────────────────────────────────────────
const footerBrand = "GUELLY Morel";
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
const footerNewsletterTitle = "Newsletter";
const footerNewsletterDesc = "Des insights concrets sur le développement full-stack, les architectures modernes et l'IA appliquée au code.";
const footerNewsletterPlaceholder = "Votre email...";
const footerSocialIcons = [
  { icon: <FiGithub size={15} />, href: "https://github.com/morel156", label: "GitHub" },
  { icon: <FiLinkedin size={15} />, href: "https://www.linkedin.com/in/morel-guelly-a05a1b420?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { icon: <FiTwitter size={15} />, href: "https://twitter.com/morel156", label: "Twitter" },
  { icon: <FiMail size={15} />, href: "mailto:guellymorelhectoreramanou@gmail.com", label: "Email" },
];
const footerCopyright = `© ${new Date().getFullYear()} GUELLY Morel. Tous droits réservés.`;
const footerBuiltWith = "Conçu avec Next.js 14 · Laravel 11 · Tailwind CSS";

// ─ Animation helpers ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 }
  }),
};

function AnimateIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? "show" : "hidden"} custom={delay} className={className}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <p className={`text-xs font-bold tracking-[3px] uppercase mb-2 ${light ? "text-blue-300" : "text-[#2563EB]"}`}>
      {text}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ████████████████████████  MAIN COMPONENT  ████████████████████████████████████
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const site = useSiteData();

  const s = site.settings;
  const f: any = s?.footer ?? {};
  const socialS: any = s?.social ?? {};
  const contactS: any = s?.contact ?? {};
  const BL: any = s?.bl ?? {}; // titres de la page Blog (éditables)
  const fBrand = s?.navbar?.brand ?? f.brand ?? footerBrand;
  const fTagline = f.tagline ?? footerTagline;
  const fCopyright = f.copyright ? String(f.copyright).replace("{year}", String(new Date().getFullYear())) : footerCopyright;
  const fBuiltWith = f.builtWith ?? footerBuiltWith;
  const fLinks = Array.isArray(f.links) && f.links.length ? f.links : footerLinks;
  const fServices = Array.isArray(f.services) && f.services.length ? f.services : footerServices;
  const fNewsTitle = f.newsletterTitle ?? footerNewsletterTitle;
  const fNewsDesc = f.newsletterDesc ?? footerNewsletterDesc;
  const fNewsPlaceholder = f.newsletterPlaceholder ?? footerNewsletterPlaceholder;
  const socialLinks = footerSocialIcons.map((it: any) => {
    const k = String(it.label).toLowerCase();
    const url = k === "github" ? socialS.github : k === "linkedin" ? socialS.linkedin : k === "twitter" ? socialS.twitter : null;
    return { ...it, href: url && String(url).trim() ? String(url).trim() : it.href };
  });
  const fContact = footerContact.map((it: any, i: number) => {
    if (i === 0) return { ...it, val: contactS.phone ?? it.val, href: contactS.phoneHref ?? it.href };
    if (i === 1) return { ...it, val: contactS.email ?? it.val, href: contactS.email ? `mailto:${contactS.email}` : it.href };
    return { ...it, val: contactS.address ?? it.val };
  });

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermeture du modal de lecture avec la touche Échap + blocage du scroll de fond
  useEffect(() => {
    if (!selectedArticle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedArticle(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedArticle]);

  // useMemo : on ne remappe les données brutes (site.blog) que si elles changent réellement,
  // pas à chaque render du composant.
  const articles = useMemo(() => {
    // API injoignable (null après chargement) → repli sur les articles de démo.
    // API OK mais 0 article ([]) ou en cours de chargement → liste vide (état vide).
    if (!(site.blog && site.blog.length)) {
      return site.loaded && site.blog === null ? allArticles : [];
    }
    return site.blog && site.blog.length
      ? site.blog.map((a: any, i: number) => ({
          id: a.id ?? a.slug ?? i,
          title: a.title ?? "",
          slug: a.slug ?? "",
          excerpt: a.excerpt ?? "",
          content: a.content ?? "",
          category: a.category ?? "",
          author: { name: a.author ?? "Morel GUELLY", image: "/avatar.jpg" },
          date: a.published_at ?? a.date ?? "",
          readTime: a.reading_time ? `${a.reading_time} min` : "",
          featured: !!a.featured,
          image: a.featured_image
            ? mediaUrl(a.featured_image)
            : (Array.isArray(a.images) && a.images.length
                ? mediaUrl(a.images[0])
                : (allArticles[i]?.image ?? "")),
          images: (Array.isArray(a.images) ? a.images.map((p: string) => mediaUrl(p)) : []) as string[],
          video: a.video ? mediaUrl(a.video) : "",
          videoUrl: a.video_url ?? "",
          tags: (Array.isArray(a.tags) ? a.tags : []) as string[],
          views: a.views ?? 0,
        }))
      : allArticles;
  }, [site.blog, site.loaded]);

  // useMemo : le filtrage ne doit se refaire que si les articles, la catégorie
  // ou la recherche changent — pas à chaque re-render (ex: ouverture du modal).
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some(tag => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticles = useMemo(
    () => filteredArticles.filter(a => a.featured).slice(0, 3),
    [filteredArticles]
  );
  const regularArticles = useMemo(
    () => filteredArticles.filter(a => !a.featured),
    [filteredArticles]
  );

  return (
    <main className="bg-white font-['Inter',sans-serif] text-slate-800 overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navSolid ? "bg-[#0b1220]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.55)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-['Sora',sans-serif] font-extrabold text-white text-sm shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform">GM</span>
            <span className="font-['Sora',sans-serif] text-lg font-extrabold text-white group-hover:opacity-90 transition">{fBrand}</span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}
                className={`relative text-sm font-medium transition-colors group ${item.href === "/blog" ? "text-white" : "text-white/80 hover:text-white"}`}>
                {item.label}
                <span className={`absolute -bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full origin-left transition-transform duration-300 ${item.href === "/blog" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={navPhoneHref} title={navPhone} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
              <FiPhone size={15} />
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-white/10 transition-all">
              Discutons <FiArrowRight size={15} />
            </a>
          </div>
          <div className="flex md:hidden items-center gap-3">
            <a href={navPhoneHref} className="text-white" title={navPhone} aria-label={navPhone}><FiPhone size={18} /></a>
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
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 border-b border-white/5 last:border-0 transition-colors ${item.href === "/blog" ? "text-white" : "text-white/80 hover:text-white"}`}>{item.label}</Link>
            ))}
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-full">Discutons <FiArrowRight size={15} /></a>
          </div>
        )}
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━ 1. HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1e3a8a] to-[#2563EB] min-h-[75vh] flex items-center overflow-hidden pt-32 pb-16">
        {/* Un seul blob flou par section, blur réduit (64px au lieu de 130px) pour alléger le paint */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[34rem] h-[34rem] rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute top-1/4 -right-16 w-[28rem] h-[28rem] rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:60px_60px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Sora',sans-serif] font-extrabold leading-tight mb-6 bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent text-[clamp(2.5rem,7vw,4.5rem)]"
          >
            {BL.hero_title ?? blogPageTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="text-white/65 max-w-2xl mx-auto leading-relaxed mb-10 text-[clamp(0.95rem,2.5vw,1.125rem)]"
          >
            {BL.hero_subtitle ?? blogPageSubtitle}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm hover:bg-white/10 transition-colors shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)]">
              <FiSearch size={20} className="text-white/60" />
              <input
                type="text"
                placeholder="Chercher un article, un tag, une technologie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-white/60 hover:text-white transition-colors"
                  title="Effacer la recherche"
                  aria-label="Effacer la recherche"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
            <p className="text-white/40 text-xs mt-3">
              {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""} trouvé{filteredArticles.length > 1 ? "s" : ""}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 2. CATÉGORIES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 left-1/5 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-2">
              <FiFilter size={18} className="text-[#2563EB]" />
              <p className="font-semibold text-slate-700">Filtrer par catégorie</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 items-center">
            {categories.map(({ id, label, count }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedCategory(id)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  selectedCategory === id
                    ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/40"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                <span>{label}</span>
                <span className={`text-xs font-bold ${selectedCategory === id ? "bg-white/20" : "bg-slate-300/40"} px-2 py-0.5 rounded`}>
                  {count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 3. ARTICLES EN VEDETTE ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {featuredArticles.length > 0 && (
        <section className="relative overflow-hidden py-20 sm:py-28 bg-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 left-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-3xl" />
            <div className="absolute bottom-0 right-1/5 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
            <AnimateIn className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <FiTrendingUp size={20} className="text-[#2563EB]" />
                <Eyebrow text={BL.featured_eyebrow ?? "Populaire cette semaine"} />
              </div>
              <h2 className="font-['Sora',sans-serif] font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent w-fit">
                {BL.featured_title ?? "Articles en vedette"}
              </h2>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredArticles.map((article, i) => (
                <motion.button
                  key={article.id}
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="group relative text-left w-full bg-gradient-to-br from-[#EFF6FF] to-white border-2 border-blue-100 rounded-2xl overflow-hidden shadow-[0_25px_60px_-25px_rgba(15,23,42,0.45)] hover:shadow-2xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden border-b-2 border-blue-100">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        priority={i === 0}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
                        <div className="text-6xl opacity-20">📝</div>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#2563EB] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ring-1 ring-black/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      {article.category}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    {/* Header */}
                    <div className="flex items-center justify-end mb-3">
                      <span className="text-slate-400 text-xs font-semibold bg-slate-100 px-2.5 py-1 rounded">
                        ⭐ Vedette
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-lg leading-snug mb-3 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-slate-400 text-xs mb-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-1">
                        <FiCalendar size={12} /> {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock size={12} /> {article.readTime}
                      </div>
                      <div className="flex items-center gap-1 ml-auto">
                        <FiTrendingUp size={12} /> {article.views}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-blue-50 text-[#2563EB] px-2.5 py-1 rounded text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 2 && (
                        <span className="text-slate-500 text-xs py-1">+{article.tags.length - 2}</span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1.5 text-[#2563EB] text-xs font-bold group-hover:gap-2.5 transition-all">
                        Lire l'article <FiArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━ 4. TOUS LES ARTICLES ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-slate-50">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/5 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <AnimateIn className="mb-12">
            <h2 className="font-['Sora',sans-serif] font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent w-fit">
              Tous les articles
            </h2>
          </AnimateIn>

          {regularArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {regularArticles.map((article, i) => (
                <motion.button
                  key={article.id}
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group text-left w-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative w-full h-70 overflow-hidden border-b border-slate-100">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
                        <div className="text-5xl opacity-20">📚</div>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#2563EB] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ring-1 ring-black/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    {/* Meta Top */}
                    <div className="flex items-center justify-end gap-3 mb-3 pb-3 border-b border-slate-100">
                      <span className="text-slate-400 text-xs font-semibold">{article.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-base leading-snug mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Meta Footer */}
                    <div className="flex items-center gap-4 text-slate-400 text-xs mb-4">
                      <div className="flex items-center gap-1">
                        <FiClock size={12} /> {article.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <FiUser size={12} /> {article.author.name}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {article.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 2 && (
                        <span className="text-slate-500 text-xs">+{article.tags.length - 2}</span>
                      )}
                    </div>

                    {/* CTA */}
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[#2563EB] text-xs font-bold group-hover:gap-2.5 transition-all">
                        Lire <FiArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              {!site.loaded ? (
                // Chargement en cours → pas d'état vide prématuré (évite le flash).
                <p className="text-slate-400 font-medium">Chargement des articles…</p>
              ) : articles.length === 0 ? (
                // Aucun article publié dans le dashboard → état vide propre.
                <>
                  <FiBookOpen size={48} className="text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 font-bold text-lg">Articles bientôt disponibles</p>
                  <p className="text-slate-400 text-sm mt-1.5">De nouveaux articles arrivent très prochainement. Reviens bientôt !</p>
                </>
              ) : (
                // Des articles existent mais la recherche/catégorie ne renvoie rien.
                <>
                  <FiSearch size={48} className="text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-semibold">Aucun article trouvé pour cette recherche ou catégorie.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className="mt-4 inline-flex items-center gap-2 text-[#2563EB] font-bold hover:underline">
                    Réinitialiser les filtres <FiArrowRight size={16} />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 5. NEWSLETTER CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#1e3a8a] to-[#2563EB] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 text-center">
          <AnimateIn delay={1}>
            <h2 className="font-['Sora',sans-serif] font-extrabold leading-tight mb-4 bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent text-[clamp(1.8rem,5vw,3rem)]">
              Restez informé des derniers articles
            </h2>
          </AnimateIn>

          <AnimateIn delay={2}>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
              Recevez les nouveaux articles directement dans votre inbox. Pas de spam, juste du contenu de qualité.
            </p>
          </AnimateIn>

          <AnimateIn delay={3}>
            <NewsletterForm variant="hero" />
          </AnimateIn>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden bg-[#1e293b] pt-12 sm:pt-14 pb-6">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 via-violet-500 to-amber-400" />
        <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10">
            <div className="sm:col-span-2 md:col-span-1">
              <p className="font-['Sora',sans-serif] text-xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent w-fit mb-3">{fBrand}</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">
                {fTagline}
              </p>
              <div className="flex flex-col gap-2.5">
                {fContact.map(({ icon, val, href }, i) => (
                  <a key={val} href={href} className="flex items-center gap-2 text-slate-400 text-xs hover:text-white transition-colors">
                    <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${["from-cyan-400 to-blue-500","from-violet-500 to-purple-600","from-amber-500 to-orange-600"][i]} flex items-center justify-center text-white flex-shrink-0`}>{icon}</span> {val}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-4">Liens Utiles</p>
              <ul className="flex flex-col gap-2.5">
                {fLinks.map((link) => (
                  <li key={link.label}><a href={link.href} className="text-slate-400 hover:text-blue-400 text-xs transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-4">Ce que je fais</p>
              <ul className="flex flex-col gap-2.5">
                {fServices.map((link) => (
                  <li key={link.label}><a href={link.href} className="text-slate-400 text-xs hover:text-blue-400 transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-3">{fNewsTitle}</p>
              <p className="text-slate-400 text-xs mb-4">{fNewsDesc}</p>
              <NewsletterForm placeholder={fNewsPlaceholder} />
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

      {/* ━━━━━━━━━━━━━━━━━━ MODAL DE LECTURE D'ARTICLE ━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-0 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              className="relative bg-white w-full sm:max-w-3xl sm:rounded-2xl shadow-2xl my-0 sm:my-8 overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Fermer"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md ring-1 ring-black/5 transition-colors"
              >
                <FiX size={18} />
              </button>

              {/* Image de couverture */}
              {selectedArticle.image ? (
                <div className="relative w-full h-56 sm:h-64">
                  <Image
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                  <div className="text-6xl opacity-20">📝</div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Catégorie + méta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
                  {selectedArticle.category && (
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#2563EB] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                      {selectedArticle.category}
                    </span>
                  )}
                  {selectedArticle.date && (
                    <span className="inline-flex items-center gap-1"><FiCalendar size={12} /> {selectedArticle.date}</span>
                  )}
                  {selectedArticle.readTime && (
                    <span className="inline-flex items-center gap-1"><FiClock size={12} /> {selectedArticle.readTime}</span>
                  )}
                  {selectedArticle.author?.name && (
                    <span className="inline-flex items-center gap-1"><FiUser size={12} /> {selectedArticle.author.name}</span>
                  )}
                </div>

                {/* Titre */}
                <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-2xl sm:text-3xl leading-tight mb-4">
                  {selectedArticle.title}
                </h2>

                {/* Extrait en chapô */}
                {selectedArticle.excerpt && (
                  <p className="text-slate-500 text-base leading-relaxed mb-6 border-l-4 border-blue-200 pl-4">
                    {selectedArticle.excerpt}
                  </p>
                )}

                {/* Vidéo */}
                {selectedArticle.video && (
                  <video controls className="w-full rounded-xl mb-6 bg-black" src={selectedArticle.video} />
                )}
                {!selectedArticle.video && selectedArticle.videoUrl && (
                  <a
                    href={selectedArticle.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mb-6 bg-[#2563EB] text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiZap size={15} /> Voir la vidéo
                  </a>
                )}

                {/* Contenu de l'article */}
                <div
                  className="prose prose-slate max-w-none text-slate-700 text-[15px] leading-relaxed [&_h2]:font-bold [&_h2]:text-slate-800 [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-[#2563EB]"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content || "<p>Contenu à venir.</p>" }}
                />

                {/* Galerie de photos */}
                {Array.isArray(selectedArticle.images) && selectedArticle.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                    {selectedArticle.images.map((src: string, idx: number) => (
                      <div key={idx} className="relative w-full h-28 rounded-lg border border-slate-100 overflow-hidden">
                        <Image
                          src={src}
                          alt={`${selectedArticle.title} — photo ${idx + 1}`}
                          fill
                          sizes="33vw"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                {Array.isArray(selectedArticle.tags) && selectedArticle.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-slate-100">
                    {selectedArticle.tags.map((tag: string) => (
                      <span key={tag} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}