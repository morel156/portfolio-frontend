"use client";
import NewsletterForm from "@/components/NewsletterForm";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSiteData } from "@/lib/useSiteData";
import { mediaUrl } from "@/lib/media";
import {
  FiGithub, FiExternalLink, FiArrowRight, FiPhone, FiMail, FiMapPin,
  FiFilter, FiX, FiStar, FiTrendingUp, FiZap, FiCode, FiDatabase,
  FiServer, FiLayout, FiCpu, FiLinkedin, FiTwitter, FiSend, FiGlobe
} from "react-icons/fi";
import {
  SiLaravel, SiNextdotjs, SiReact, SiTailwindcss,
  SiMysql, SiNodedotjs, SiDocker, SiTypescript, SiPython
} from "react-icons/si";

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

// ── PROJETS PAGE DATA ────────────────────────────────────────────────────────
const projectsPageTitle = "Chaque projet est une startup réelle.";
const projectsPageSubtitle = "Pas de templates, pas de lorem ipsum. Voici les produits que j'ai construits pour transformer des idées ambitieuses en réalités palpables.";

const technologies = [
  { id: "all", label: "Tous les projets", icon: "🎯" },
  { id: "react", label: "React", icon: <SiReact size={16} /> },
  { id: "laravel", label: "Laravel", icon: <SiLaravel size={16} /> },
  { id: "nextjs", label: "Next.js", icon: <SiNextdotjs size={16} /> },
  { id: "python", label: "Python", icon: <SiPython size={16} /> },
  { id: "nodejs", label: "Node.js", icon: <SiNodedotjs size={16} /> },
  { id: "data", label: "Data Engineering", icon: <FiDatabase size={16} /> },
];

// Par défaut (API endormie ou injoignable) : UN seul vrai projet — StabilIT.
// Les autres projets remontent depuis le dashboard admin une fois l'API réveillée.
const allProjects = [
  {
    id: 1,
    title: "StabilIT — Évaluation de Stabilité Digitale",
    slug: "stabilit-evaluation-stabilite",
    category: "Full Stack / IA",
    problem: "Les projets digitaux échouent faute de visibilité sur leur stabilité future. Il fallait une plateforme pour évaluer les risques et proposer des solutions.",
    solution: "Plateforme SaaS complète avec système de scoring bidimensionnel, API AI (Groq LLaMA), recommandations automatisées et dashboard analytique.",
    impact: "Thèse défendue avec succès. Utilisée pour auditer 15+ projets en phase pilote.",
    shortDesc: "Plateforme d'évaluation des risques digitaux avec IA et scoring automatisé.",
    image: "/Accueil_partie1.png",
    technologies: ["laravel", "react", "mysql", "python"],
    stack: ["Laravel 11", "React", "MySQL", "Groq API", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
    year: 2024,
    featured: true,
    stats: { risks: "87%", accuracy: "92%", users: "15+" }
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

export default function ProjectsPage() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState("all");

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { projects: apiProjects, settings: s } = useSiteData();

  // ── Common shared elements (footer / social / navbar brand) driven by admin
  // settings, with the existing hardcoded constants kept as fallbacks. ──────────
  const f: any = s?.footer ?? {};
  const socialS: any = s?.social ?? {};
  const contactS: any = s?.contact ?? {};
  const PJ: any = s?.pj ?? {}; // titres de la page Projets (éditables)
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
  const fNavBrand = s?.navbar?.brand ?? navBrand;

  // Drive the list from the API when available, else fall back to the hardcoded const.
  // Map API fields → the shape the JSX expects, keeping design-only fields (technologies
  // filter-ids) derived from the display stack so filtering keeps working.
  const projects = (apiProjects ?? []).length
    ? (apiProjects as any[]).map((p, i) => {
        const stack: string[] = Array.isArray(p.technologies) ? p.technologies : [];
        // Derive filter ids from the display stack names so the tech filter still works.
        const filterIds = Array.from(
          new Set(
            stack
              .map((t) => {
                const s = String(t).toLowerCase();
                if (s.includes("next")) return "nextjs";
                if (s.includes("react")) return "react";
                if (s.includes("laravel")) return "laravel";
                if (s.includes("python") || s.includes("pandas") || s.includes("scikit") || s.includes("xgboost")) return "python";
                if (s.includes("node")) return "nodejs";
                if (s.includes("wordpress") || s.includes("woo")) return "wordpress";
                if (s.includes("sql") || s.includes("postgres") || s.includes("etl") || s.includes("data")) return "data";
                return "";
              })
              .filter(Boolean)
          )
        );
        return {
          id: p.slug ?? p.id ?? i,
          title: p.title ?? "",
          slug: p.slug ?? `project-${i}`,
          category: p.category ?? "",
          problem: p.problem ?? "",
          solution: p.solution ?? "",
          impact: p.impact ?? "",
          shortDesc: p.description ?? "",
          image: p.featured_image ? mediaUrl(p.featured_image) : "",
          technologies: filterIds,
          stack,
          demoUrl: p.demo_url || "#",
          githubUrl: p.github_url || "#",
          year: p.year ?? "",
          featured: !!p.featured,
          stats: (p.stats && typeof p.stats === "object" ? p.stats : {}) as Record<string, string>,
        };
      })
    : allProjects;

  const filteredProjects = selectedTech === "all"
    ? projects
    : projects.filter(p => (p.technologies as string[]).includes(selectedTech));

  const getTechIcon = (tech: string) => {
    const icons: Record<string, React.ReactNode> = {
      "react": <SiReact size={16} />,
      "laravel": <SiLaravel size={16} />,
      "nextjs": <SiNextdotjs size={16} />,
      "python": <SiPython size={16} />,
      "nodejs": <SiNodedotjs size={16} />,
      "mysql": <SiMysql size={16} />,
      "typescript": <SiTypescript size={16} />,
    };
    return icons[tech] || <FiCode size={16} />;
  };

  return (
    <main className="bg-white font-['Inter',sans-serif] text-slate-800 overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navSolid ? "bg-[#0b1220]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.55)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-['Sora',sans-serif] font-extrabold text-white text-sm shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform">GM</span>
            <span className="font-['Sora',sans-serif] text-lg font-extrabold text-white group-hover:opacity-90 transition">{fNavBrand}</span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}
                className={`relative text-sm font-medium transition-colors group ${item.href === "/projets" ? "text-white" : "text-white/80 hover:text-white"}`}>
                {item.label}
                <span className={`absolute -bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full origin-left transition-transform duration-300 ${item.href === "/projets" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
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
                className={`text-sm font-medium py-2 border-b border-white/5 last:border-0 transition-colors ${item.href === "/projets" ? "text-white" : "text-white/80 hover:text-white"}`}>{item.label}</Link>
            ))}
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-full">Discutons <FiArrowRight size={15} /></a>
          </div>
        )}
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━ 1. HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1e3a8a] to-[#2563EB] min-h-[80vh] flex items-center overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-[130px]" />
          <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-violet-600/20 blur-[130px]" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-amber-500/12 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:60px_60px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Sora',sans-serif] font-extrabold bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent leading-tight mb-6 text-[clamp(2.5rem,7vw,5rem)]"
          >
            {PJ.hero_title ?? projectsPageTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="text-white/65 max-w-2xl mx-auto leading-relaxed text-[clamp(0.95rem,2.5vw,1.125rem)]"
          >
            {PJ.hero_subtitle ?? projectsPageSubtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="inline-flex items-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm px-5 py-3 text-white/70 text-sm mt-6"
          >
            {filteredProjects.length} projet{filteredProjects.length > 1 ? "s" : ""} à découvrir
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 2. FILTRES TECHNOLOGIES ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 left-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-1/5 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <div>
              <Eyebrow text={PJ.filter_eyebrow ?? "Filtrer par technologie"} />
              <h2 className="font-['Sora',sans-serif] font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent text-xl">
                {PJ.filter_title ?? "Explorez par stack"}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 items-center">
            {technologies.map(({ id, label, icon }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedTech(id)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  selectedTech === id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/40"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:-translate-y-0.5 border border-slate-200"
                }`}
              >
                {typeof icon === "string" ? icon : icon}
                <span>{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 3. GRILLE DE PROJETS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-1/4 left-1/5 w-80 h-80 rounded-full bg-violet-300/18 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-amber-300/15 blur-[110px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <AnimateIn className="mb-16">
            <div className="grid gap-6 sm:gap-8">
              {/* Projets en vedette */}
              {filteredProjects.filter(p => p.featured).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="group relative bg-gradient-to-br from-[#EFF6FF] to-white border border-blue-100 rounded-3xl overflow-hidden shadow-[0_25px_60px_-25px_rgba(15,23,42,0.5)] hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* ── Image en background pour mobile/tablette uniquement ── */}
                  <div className="absolute inset-0 lg:hidden z-0">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="90vw"
                        className="object-cover"
                        quality={100}
                        priority
                        unoptimized
                      />
                    ) : null}
                    {/* Voile "vintage" sombre pour garder le texte lisible */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/85 via-[#1e3a8a]/88 to-[#0f172a]/95" />
                    <div className="absolute inset-0 mix-blend-multiply opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.35),transparent_60%)]" />
                  </div>

                  <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 sm:p-12">
                    {/* Contenu */}
                    <div className="flex flex-col justify-center">
                      <div className="inline-flex w-fit items-center gap-2 bg-white lg:bg-white border border-blue-200 lg:border-blue-200 rounded-full px-4 py-1.5 mb-6 lg:bg-white bg-white/15 lg:border lg:border-blue-200 border border-white/25 backdrop-blur-sm lg:backdrop-blur-none">
                        <FiStar size={14} className="text-[#2563EB] lg:text-[#2563EB] text-white" />
                        <span className="text-xs font-bold text-[#2563EB] lg:text-[#2563EB] text-white">{project.category}</span>
                      </div>
                      
                      <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 lg:text-slate-800 text-white text-3xl sm:text-4xl mb-4 leading-tight">
                        {project.title}
                      </h3>

                      <div className="space-y-5 mb-8">
                        <div>
                          <p className="text-[#2563EB] lg:text-[#2563EB] text-blue-200 font-bold text-xs uppercase tracking-wider mb-2">Problème</p>
                          <p className="text-slate-600 lg:text-slate-600 text-white/85 text-sm leading-relaxed">{project.problem}</p>
                        </div>
                        <div>
                          <p className="text-[#2563EB] lg:text-[#2563EB] text-blue-200 font-bold text-xs uppercase tracking-wider mb-2">Solution</p>
                          <p className="text-slate-600 lg:text-slate-600 text-white/85 text-sm leading-relaxed">{project.solution}</p>
                        </div>
                        <div>
                          <p className="text-[#2563EB] lg:text-[#2563EB] text-blue-200 font-bold text-xs uppercase tracking-wider mb-2">Impact</p>
                          <p className="text-slate-600 lg:text-slate-600 text-white/90 text-sm leading-relaxed font-semibold">{project.impact}</p>
                        </div>
                      </div>

                      {/* Stack */}
                      <div className="mb-8">
                        <p className="text-slate-500 lg:text-slate-500 text-white/60 font-semibold text-xs uppercase tracking-wider mb-3">Stack utilisée</p>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span key={tech} className="bg-white lg:bg-white bg-white/15 border border-slate-200 lg:border-slate-200 border-white/20 text-slate-700 lg:text-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm lg:backdrop-blur-none">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        {project.demoUrl !== "#" && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-700/40 text-white font-bold px-6 py-3 rounded-lg text-sm transition-all">
                            <FiExternalLink size={16} /> Voir la démo
                          </a>
                        )}
                        {project.githubUrl !== "#" && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border-2 border-slate-300 lg:border-slate-300 border-white/40 text-slate-700 lg:text-slate-700 text-white hover:bg-slate-50 lg:hover:bg-slate-50 hover:bg-white/10 font-bold px-6 py-3 rounded-lg text-sm transition-all">
                            <FiGithub size={16} /> Code source
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Capture (mockup navigateur) + stats (desktop uniquement) */}
                    <div className="relative hidden lg:flex flex-col justify-center gap-5">
                      {/* Cadre navigateur */}
                      <div className="rounded-xl overflow-hidden border border-slate-200 shadow-[0_25px_60px_-20px_rgba(15,23,42,0.4)] bg-white">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200">
                          <span className="w-3 h-3 rounded-full bg-red-400/80" />
                          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                          <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                          <div className="ml-3 flex-1 h-6 rounded-md bg-white border border-slate-200 flex items-center gap-1.5 px-2.5">
                            <FiGlobe size={11} className="text-slate-400 flex-shrink-0" />
                            <span className="text-slate-400 text-[11px] truncate">
                              {project.demoUrl && project.demoUrl !== "#"
                                ? project.demoUrl.replace(/^https?:\/\//, "")
                                : `${project.slug}.app`}
                            </span>
                          </div>
                        </div>
                        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                              <FiCode size={64} className="text-[#2563EB] opacity-20" />
                              <p className="text-slate-400 font-semibold text-sm">{project.title}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stats — rangée propre, chiffres en dégradé */}
                      <div className="grid grid-cols-3 gap-3">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                            <p className="font-['Sora',sans-serif] font-extrabold text-lg leading-none bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">{value}</p>
                            <p className="text-slate-400 text-[10px] capitalize mt-1 leading-tight">{key}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Autres projets en grille */}
              {filteredProjects.filter(p => !p.featured).length > 0 && (
                <>
                  <div className="my-12 border-t border-slate-200" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.filter(p => !p.featured).map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_25px_60px_-25px_rgba(15,23,42,0.5)] hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300"
                      >
                        {/* Image placeholder */}
                        <div className="w-full h-48 overflow-hidden border-b border-slate-200">
  {project.image ? (
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
      <FiCode size={60} className="text-slate-300 group-hover:text-blue-300 transition-colors" />
    </div>
  )}
</div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-wider">{project.category}</span>
                            <span className="text-slate-400 text-xs font-semibold">{project.year}</span>
                          </div>

                          <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-lg mb-2 group-hover:text-[#2563EB] transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-slate-500 text-sm leading-relaxed mb-4">
                            {project.shortDesc}
                          </p>

                          {/* Stack */}
                          <div className="mb-5">
                            <div className="flex flex-wrap gap-1.5">
                              {project.stack.slice(0, 3).map((tech) => (
                                <span key={tech} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-semibold">
                                  {tech}
                                </span>
                              ))}
                              {project.stack.length > 3 && (
                                <span className="text-slate-500 text-xs py-1">+{project.stack.length - 3}</span>
                              )}
                            </div>
                          </div>

                          {/* Impact */}
                          <div className="flex items-center gap-2 text-sm text-slate-600 mb-5 pb-5 border-b border-slate-100">
                            <FiTrendingUp size={16} className="text-[#2563EB]" />
                            <span className="font-semibold">{project.impact}</span>
                          </div>

                          {/* CTAs */}
                          <div className="flex gap-2">
                            {project.demoUrl !== "#" && (
                              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-3 py-2 rounded-lg text-xs transition-all">
                                <FiExternalLink size={14} /> Démo
                              </a>
                            )}
                            {project.githubUrl !== "#" && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-3 py-2 rounded-lg text-xs transition-all">
                                <FiGithub size={14} /> Code
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </AnimateIn>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <FiFilter size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-semibold">Aucun projet trouvé pour cette technologie.</p>
              <button
                onClick={() => setSelectedTech("all")}
                className="mt-4 inline-flex items-center gap-2 text-[#2563EB] font-bold hover:underline">
                Voir tous les projets <FiArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 4. CTA FINAL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-[#1e3a8a] to-[#2563EB] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-[130px]" />
          <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-violet-600/20 blur-[130px]" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-amber-500/12 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <AnimateIn delay={1}>
            <h2 className="font-['Sora',sans-serif] font-extrabold bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent leading-tight mb-6 text-[clamp(1.8rem,5vw,3rem)]">
              {PJ.cta_title ?? "Vous avez un projet semblable ?"}
            </h2>
          </AnimateIn>

          <AnimateIn delay={2}>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto">
              {PJ.cta_subtitle ?? "Je suis disponible pour transformer vos idées en produits exceptionnels. Discutons de votre vision."}
            </p>
          </AnimateIn>

          <AnimateIn delay={3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-[#2563EB] font-bold px-8 py-4 rounded-xl text-sm
                transition-all shadow-lg shadow-black/20 hover:shadow-black/30 hover:-translate-y-0.5">
                <FiMail size={16} /> Démarrer un projet
              </Link>
              <a href="tel:+2290150387702"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl text-sm transition-all">
                <FiPhone size={16} /> Appel rapide
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1e293b] pt-12 sm:pt-14 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 via-violet-500 to-amber-400" />
        <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10">
            <div className="sm:col-span-2 md:col-span-1">
              <p className="font-['Sora',sans-serif] text-xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent w-fit mb-3">{fBrand}</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">
                {fTagline}
              </p>
              <div className="flex flex-col gap-2.5">
  {fContact.map(({ icon, val, href }, i) => (
    <a key={val} href={href} className="flex items-center gap-2 text-slate-400 text-xs hover:text-white transition-colors">
      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br ${["from-cyan-400 to-blue-500","from-violet-500 to-purple-600","from-amber-500 to-orange-600"][i]}`}>{icon}</span> {val}
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
                {socialLinks.map(({ icon, href, label }, i) => (
                  <a
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