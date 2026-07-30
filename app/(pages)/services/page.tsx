"use client";
import NewsletterForm from "@/components/NewsletterForm";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  FiArrowRight, FiZap, FiCode, FiDatabase, FiLayers, FiTarget,
  FiCheckCircle, FiPhone, FiMail, FiCalendar, FiBox,
  FiLayout, FiBriefcase, FiBarChart2, FiUsers, FiCpu,
  FiGlobe, FiTrendingUp, FiStar, FiAward, FiShield,
  FiMonitor, FiServer, FiPackage, FiSettings, FiActivity,
  FiMessageSquare, FiExternalLink, FiPlayCircle, FiSend
} from "react-icons/fi";
import {
  SiLaravel, SiNextdotjs, SiReact, SiTailwindcss,
  SiMysql, SiNodedotjs, SiDocker, SiTypescript,
  SiPython, SiGit, SiFigma, SiWordpress
} from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";
import { FiGithub, FiLinkedin, FiTwitter, FiMapPin } from "react-icons/fi";
import { useSiteData } from "@/lib/useSiteData";

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
  { label: "Développement Web", href: "/#services" },
  { label: "Data Engineering", href: "/#services" },
  { label: "UI/UX Design", href: "/#services" },
  { label: "DevOps", href: "/#services" },
  { label: "Formation", href: "/contact" },
];
const footerNewsletterTitle = "Newsletter";
const footerNewsletterDesc = "Des insights concrets sur le développement full-stack, les architectures modernes et l'IA appliquée au code.";
const footerNewsletterPlaceholder = "Votre email...";
const footerSocialIcons = [
  { icon: <FiGithub size={15} />, href: "https://github.com/morel156", label: "GitHub" },
  { icon: <FiLinkedin size={15} />, href: "https://www.linkedin.com/in/morel-guelly-a05a1b420?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { icon: <FiTwitter size={15} />, href: "https://twitter.com/guellymorel", label: "Twitter" },
  { icon: <FiMail size={15} />, href: "mailto:guellymorelhectoreramanou@gmail.com", label: "Email" },
];
const footerCopyright = `© ${new Date().getFullYear()} GUELLY Morel. Tous droits réservés.`;
const footerBuiltWith = "Conçu avec Next.js 14 · Laravel 11 · Tailwind CSS";
// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
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

// ─── DATA ────────────────────────────────────────────────────────────────────

const whatIBring = [
  {
    id: "vision-produit",
    icon: <FiTarget size={26} />,
    title: "Vision Produit",
    desc: "Je pense chaque projet comme un produit avec des utilisateurs réels, des contraintes business et une expérience à créer, pas juste du code à livrer.",
    color: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/20",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    id: "architecture-scalable",
    icon: <FiLayers size={26} />,
    title: "Architecture Scalable",
    desc: "Des structures pensées pour durer : modularité, performance, maintenabilité. Votre produit peut évoluer sans tout reconstruire.",
    color: "from-indigo-500/10 to-indigo-600/5",
    border: "border-indigo-500/20",
    glow: "group-hover:shadow-indigo-500/20",
    featured: true,
  },
  {
    id: "ux-moderne",
    icon: <FiMonitor size={26} />,
    title: "UX Moderne",
    desc: "Des interfaces fluides, rapides, pensées pour créer une sensation de qualité immédiate. L'UX est un avantage concurrentiel, pas une option.",
    color: "from-sky-500/10 to-sky-600/5",
    border: "border-sky-500/20",
    glow: "group-hover:shadow-sky-500/20",
  },
  {
    id: "performance-durabilite",
    icon: <FiActivity size={26} />,
    title: "Performance & Durabilité",
    desc: "Code propre, testé, documenté. Je livre quelque chose que vous pourrez maintenir, faire évoluer et être fiers de montrer à votre équipe.",
    color: "from-cyan-500/10 to-cyan-600/5",
    border: "border-cyan-500/20",
    glow: "group-hover:shadow-cyan-500/20",
  },
];

const mainServices = [
  {
    id: "developpement-full-stack",
    icon: <FiCode size={24} />,
    title: "Développement Full Stack",
    desc: "Conception et développement d'applications web complètes, de la base de données à l'interface utilisateur. Architecture solide, code propre, livraison rapide.",
    techs: ["Laravel 11", "Next.js 14", "React", "TypeScript", "MySQL"],
    gain: "Un produit fonctionnel, scalable et maintenable, prêt pour la production.",
    accent: "blue",
  },
  {
    id: "applications-laravel-react",
    icon: <SiLaravel size={22} />,
    title: "Applications Laravel + React",
    desc: "Développement d'applications SaaS, CRM, e-commerce et systèmes métier avec Laravel en backend et React/Next.js en frontend. L'alliance parfaite entre robustesse et modernité.",
    techs: ["Laravel", "Sanctum", "API REST", "React", "Tailwind"],
    gain: "Une application métier sur mesure, sécurisée, avec une UX moderne qui plaît à vos utilisateurs.",
    accent: "red",
  },
  {
    id: "dashboards-systemes-metiers",
    icon: <FiBarChart2 size={24} />,
    title: "Dashboards & Systèmes Métiers",
    desc: "Tableaux de bord analytiques, outils de gestion interne, interfaces d'administration complexes. Des systèmes pensés pour des équipes réelles avec des besoins réels.",
    techs: ["Next.js", "Charts", "Laravel", "MySQL", "TypeScript"],
    gain: "Des décisions plus rapides, une visibilité sur vos données, un outil que votre équipe utilise vraiment.",
    accent: "indigo",
  },
  {
    id: "apis-rest-backend-robuste",
    icon: <FiServer size={24} />,
    title: "APIs REST & Backend Robuste",
    desc: "Conception d'APIs RESTful performantes, sécurisées et documentées. Gestion d'authentification, permissions, webhooks et intégrations tierces.",
    techs: ["Laravel", "Node.js", "JWT", "Sanctum", "Docker"],
    gain: "Un backend fiable sur lequel votre frontend et vos partenaires peuvent compter à 100%.",
    accent: "sky",
  },
  {
    id: "wordpress-expert",
    icon: <SiWordpress size={22} />,
    title: "WordPress Expert",
    desc: "Sites vitrine, blogs premium et boutiques WooCommerce performants. Thèmes custom, plugins sur mesure, SEO technique et Core Web Vitals optimisés.",
    techs: ["WordPress", "WooCommerce", "PHP", "SEO", "Performance"],
    gain: "Un site WordPress rapide, bien référencé, avec une expérience premium, bien au-dessus du template générique.",
    accent: "cyan",
  },
  {
    id: "transition-data-automatisation",
    icon: <FiDatabase size={24} />,
    title: "Transition Data & Automatisation",
    desc: "Automatisation, scripts métiers et premiers workflows orientés data avec Python.",
    techs: ["Python", "SQL", "Pandas", "FastAPI", "AWS"],
    gain: "Des processus automatisés, des données exploitables, et un partenaire qui comprend l'enjeu business derrière.",
    accent: "emerald",
  },
];

const accentMap: Record<string, string> = {
  blue: "from-blue-500/15 to-blue-600/5 border-blue-500/25 hover:border-blue-500/50",
  red: "from-red-500/10 to-red-600/5 border-red-500/20 hover:border-red-500/40",
  indigo: "from-indigo-500/15 to-indigo-600/5 border-indigo-500/25 hover:border-indigo-500/50",
  sky: "from-sky-500/10 to-sky-600/5 border-sky-500/20 hover:border-sky-500/40",
  cyan: "from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 hover:border-cyan-500/40",
  emerald: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40",
};

const techBadgeAccent: Record<string, string> = {
  blue: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  red: "bg-red-500/15 text-red-300 border-red-500/20",
  indigo: "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
  sky: "bg-sky-500/15 text-sky-300 border-sky-500/20",
  cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
};

const workProcess = [
  {
    num: "01",
    title: "Compréhension du besoin",
    desc: "J'écoute d'abord. Je cherche à comprendre votre contexte, vos utilisateurs, vos contraintes business, avant d'écrire une seule ligne de code.",
    icon: <FiMessageSquare size={20} />,
  },
  {
    num: "02",
    title: "Réflexion produit & architecture",
    desc: "Choix de stack, découpage fonctionnel, wireframes si nécessaire. Je conçois une solution sur mesure, pensée pour évoluer.",
    icon: <FiBox size={20} />,
  },
  {
    num: "03",
    title: "Développement itératif",
    desc: "Livraisons régulières, points de synchronisation, retours intégrés rapidement. Vous voyez le produit prendre vie à chaque étape.",
    icon: <FiCode size={20} />,
  },
  {
    num: "04",
    title: "Optimisation & tests",
    desc: "Performance, sécurité, accessibilité. Rien n'est livré sans être testé. Votre produit est prêt à affronter la réalité.",
    icon: <FiActivity size={20} />,
  },
  {
    num: "05",
    title: "Livraison & suivi",
    desc: "Déploiement accompagné, documentation, transfert de compétences si besoin. Je ne disparais pas après la livraison.",
    icon: <FiAward size={20} />,
  },
];

const differentiators = [
  {
    icon: <FiTarget size={22} />,
    title: "Approche produit",
    desc: "Je ne code pas des features. Je construis des expériences. Chaque décision technique est prise en fonction de l'impact utilisateur et business.",
  },
  {
    icon: <FiShield size={22} />,
    title: "Obsession du détail",
    desc: "Un pixel mal aligné, une API trop lente, un message d'erreur flou, rien n'échappe à mon attention. Le soin se voit et se ressent.",
  },
  {
    icon: <FiTrendingUp size={22} />,
    title: "Vision long terme",
    desc: "En transition vers le Data Engineering, je comprends l'enjeu des données dès la conception. Je conçois des systèmes pensés pour évoluer avec vos besoins.",
  },
  {
    icon: <FiUsers size={22} />,
    title: "Communication fluide",
    desc: "Je parle à la fois aux développeurs et aux non-techniques. Pas de jargon inutile, des décisions expliquées clairement, une collaboration saine.",
  },
  {
    icon: <FiZap size={22} />,
    title: "Apprentissage rapide",
    desc: "Nouvelle technologie, nouveau domaine, je monte en compétence vite et efficacement. Vos projets ne sont pas freinés par mes lacunes.",
  },
  {
    icon: <FiStar size={22} />,
    title: "Humain & professionnel",
    desc: "Je travaille avec rigueur et engagement, mais sans rigidité. Chaque collaboration est unique, et je m'adapte à votre culture et vos méthodes.",
  },
];

const stackItems = [
  { name: "Laravel", icon: <SiLaravel size={20} />, cat: "Backend" },
  { name: "React", icon: <SiReact size={20} />, cat: "Frontend" },
  { name: "Next.js", icon: <SiNextdotjs size={20} />, cat: "Frontend" },
  { name: "TypeScript", icon: <SiTypescript size={20} />, cat: "Language" },
  { name: "Tailwind", icon: <SiTailwindcss size={20} />, cat: "Style" },
  { name: "WordPress", icon: <SiWordpress size={20} />, cat: "CMS" },
  { name: "MySQL", icon: <SiMysql size={20} />, cat: "Base de données" },
  { name: "Python", icon: <SiPython size={20} />, cat: "Data" },
  { name: "Docker", icon: <SiDocker size={20} />, cat: "DevOps" },
  { name: "Node.js", icon: <SiNodedotjs size={20} />, cat: "Backend" },
  { name: "Git", icon: <SiGit size={20} />, cat: "Outil" },
  { name: "Figma", icon: <SiFigma size={20} />, cat: "Design" },
];

const collabTypes = [
  { icon: <FiUsers size={20} />, label: "Freelance", desc: "Missions courtes ou moyennes durée, avec engagement total sur la qualité." },
  { icon: <FiZap size={20} />, label: "Startup", desc: "Je comprends les enjeux de rapidité et d'itération rapide. Je construis avec vous." },
  { icon: <FiTrendingUp size={20} />, label: "Long terme", desc: "Partenariat durable, connaissance approfondie de votre contexte et évolution continue." },
  { icon: <FiTarget size={20} />, label: "Produit ambitieux", desc: "Projets complexes, vision forte, standards élevés. C'est là que je donne le meilleur de moi-même." },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { services: apiServices, settings: s } = useSiteData();

  // ── Common shared elements driven by backend admin settings (with fallbacks) ──
  const f: any = s?.footer ?? {};
  const socialS: any = s?.social ?? {};
  const contactS: any = s?.contact ?? {};
  const SV: any = s?.sv ?? {}; // titres de sections de la page Services (éditables)
  const navBrandC = s?.navbar?.brand ?? navBrand;
  const fBrand = s?.navbar?.brand ?? f.brand ?? footerBrand;
  const fTagline = f.tagline ?? footerTagline;
  const fCopyright = f.copyright ? String(f.copyright).replace("{year}", String(new Date().getFullYear())) : footerCopyright;
  const fBuiltWith = f.builtWith ?? footerBuiltWith;
  const fLinks = Array.isArray(f.links) && f.links.length ? f.links : footerLinks;
  const fServices = Array.isArray(f.services) && f.services.length ? f.services : footerServices;
  const fNewsTitle = f.newsletterTitle ?? footerNewsletterTitle;
  const fNewsDesc = f.newsletterDesc ?? footerNewsletterDesc;
  const fNewsPlaceholder = f.newsletterPlaceholder ?? footerNewsletterPlaceholder;
  const fContact = footerContact.map((it: any, i: number) => {
    if (i === 0) return { ...it, val: contactS.phone ?? it.val, href: contactS.phoneHref ?? it.href };
    if (i === 1) return { ...it, val: contactS.email ?? it.val, href: contactS.email ? `mailto:${contactS.email}` : it.href };
    return { ...it, val: contactS.address ?? it.val };
  });
  const socialLinks = footerSocialIcons.map((it: any) => {
    const k = String(it.label).toLowerCase();
    const url = k === "github" ? socialS.github : k === "linkedin" ? socialS.linkedin : k === "twitter" ? socialS.twitter : null;
    return { ...it, href: url && String(url).trim() ? String(url).trim() : it.href };
  });

  // Drive the services grid from the API when available, else fall back to the
  // hardcoded const. Icon (component) and accent color aren't provided by the API,
  // so cycle them from the original defaults by index — never render undefined.
  const services = (apiServices ?? []).length
    ? (apiServices as any[]).map((s, i) => {
        const fallback = mainServices[i % mainServices.length];
        return {
          id: s.slug ?? fallback.id,
          icon: fallback.icon,
          title: s.title ?? fallback.title,
          desc: s.description ?? fallback.desc,
          techs: Array.isArray(s.technologies) && s.technologies.length ? s.technologies : fallback.techs,
          gain: s.gain ?? fallback.gain,
          accent: fallback.accent,
        };
      })
    : mainServices;

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-white font-['Inter',sans-serif] text-slate-800 overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navSolid ? "bg-[#0b1220]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.55)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-['Sora',sans-serif] font-extrabold text-white text-sm shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform">GM</span>
            <span className="font-['Sora',sans-serif] text-lg font-extrabold text-white group-hover:opacity-90 transition">{navBrandC}</span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}
                className={`relative text-sm font-medium transition-colors group ${item.href === "/services" ? "text-white" : "text-white/80 hover:text-white"}`}>
                {item.label}
                <span className={`absolute -bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full origin-left transition-transform duration-300 ${item.href === "/services" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
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
                className={`text-sm font-medium py-2 border-b border-white/5 last:border-0 transition-colors ${item.href === "/services" ? "text-white" : "text-white/80 hover:text-white"}`}>{item.label}</Link>
            ))}
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-full">Discutons <FiArrowRight size={15} /></a>
          </div>
        )}
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━ 1. HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#0F172A] min-h-[92vh] flex items-center overflow-hidden pt-32 pb-16">

        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/18 rounded-full blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-violet-600/18 rounded-full blur-[130px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[110px]" />
          <div className="absolute bottom-[5%] left-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-[130px]" />
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:60px_60px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Sora',sans-serif] font-extrabold text-white text-center leading-tight mb-6 text-[clamp(1.75rem,6vw,4rem)]"
          >
            {SV.hero_title ?? "Je construis des produits web"}<br className="hidden sm:block" />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300">
              {SV.hero_accent ?? "qui créent un impact réel."}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="text-white/65 text-center max-w-2xl mx-auto leading-relaxed mb-10 text-[clamp(0.95rem,2vw,1.125rem)]"
          >
            {SV.hero_subtitle ?? "Je construis des produits qui donnent une vraie sensation de qualité, des systèmes pensés avec soin, architecturés pour durer et conçus pour créer des expériences dont les utilisateurs se souviennent."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a href="/contact"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-blue-700/40 hover:shadow-blue-500/50 hover:-translate-y-0.5">
              <FiMail size={16} /> Discutons de votre projet
            </a>
            <a href="/projets"
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold px-8 py-4 rounded-xl text-sm transition-all">
              Voir mes réalisations <FiArrowRight size={15} />
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-12"
          >
            {[
              { n: "15+", l: "Projets réalisés" },
              { n: "5+", l: "Clients satisfaits" },
              { n: "1+", l: "An d'expérience" },
              { n: "6", l: "Services premium" },
            ].map(({ n, l }) => (
              <div key={l} className="text-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm px-5 py-3">
                <div className="font-['Sora',sans-serif] font-extrabold text-white text-2xl sm:text-3xl">{n}</div>
                <div className="text-white/40 text-xs mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 2. CE QUE J'APPORTE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 left-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-1/5 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <AnimateIn className="text-center mb-14">
            <Eyebrow text={SV.bring_eyebrow ?? "Ce que j'apporte"} />
            <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug text-[clamp(1.6rem,4vw,2.5rem)]">
              {SV.bring_title ?? "Bien plus qu'un développeur,"}<br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">{SV.bring_accent ?? "une vision complète du produit."}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {SV.bring_subtitle ?? "Chaque mission que j'accepte est abordée avec la même exigence : comprendre le contexte, maîtriser la technique, et créer quelque chose qui crée de la valeur réelle."}
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whatIBring.map(({ icon, title, desc, color, border, glow, featured }, i) => (
              <AnimateIn key={title} delay={i} className="h-full">
                <div className={`group relative h-full bg-gradient-to-br ${color} border ${border} rounded-2xl p-6 sm:p-7
                  transition-all duration-300 hover:shadow-xl ${glow} hover:-translate-y-1
                  ${featured ? "ring-1 ring-indigo-500/30 shadow-[0_30px_70px_-20px_rgba(37,99,235,0.4)]" : ""}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]} group-hover:scale-110 transition-transform`}>
                    {icon}
                  </div>
                  <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-base mb-3">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 3. SERVICES PRINCIPAUX ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-[#0F172A] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-[130px]" />
          <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-violet-600/20 blur-[130px]" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-amber-500/12 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <AnimateIn className="text-center mb-14">
            <Eyebrow text={SV.services_eyebrow ?? "Services"} light />
            <h2 className="font-['Sora',sans-serif] font-extrabold text-white leading-snug text-[clamp(1.6rem,4vw,2.5rem)]">
              {SV.services_title ?? "Des services pensés pour"}<br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">{SV.services_accent ?? "des projets qui ont de l'ambition."}</span>
            </h2>
            <p className="text-white/55 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {SV.services_subtitle ?? 'Chaque prestation est conçue pour créer un impact mesurable, pas juste livrer quelque chose qui "fonctionne", mais quelque chose dont vous serez fier.'}
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ id, icon, title, desc, techs, gain, accent }, i) => (
              <AnimateIn key={title} delay={i * 0.5} className="h-full">
                <div id={id} className={`group h-full bg-gradient-to-br ${accentMap[accent]} border rounded-2xl p-6 sm:p-7
                  transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-5
                    group-hover:bg-[#2563EB]/30 transition-colors">
                    {icon}
                  </div>
                  <h3 className="font-['Sora',sans-serif] font-extrabold text-white text-base mb-3">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{desc}</p>

                  <a href="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-[#2563EB] hover:text-blue-400 text-xs font-semibold transition-colors group/link">
                    Démarrer ce projet <FiArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 4. PROCESSUS DE TRAVAIL ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 left-1/5 w-80 h-80 rounded-full bg-violet-300/20 blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-amber-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <AnimateIn className="text-center mb-14">
            <Eyebrow text={SV.process_eyebrow ?? "Processus de travail"} />
            <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug text-[clamp(1.6rem,4vw,2.5rem)]">
              {SV.process_title ?? "Un bon produit ne se construit"}<br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">{SV.process_accent ?? "jamais au hasard."}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {SV.process_subtitle ?? "Derrière chaque livraison fluide, il y a un processus rigoureux, une communication claire et une attention portée à chaque étape."}
            </p>
          </AnimateIn>

          {/* Timeline desktop / cards mobile */}
          <div className="relative">
            {/* Connecting line desktop */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-200 to-transparent mx-16" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
              {workProcess.map(({ num, title, desc, icon }, i) => (
                <AnimateIn key={num} delay={i * 0.8} className="h-full">
                  <div className="relative h-full bg-white rounded-2xl p-6 border border-slate-100
                    hover:border-blue-200 hover:shadow-lg transition-all duration-300 text-center group">
                    {/* Number circle */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center
                      font-['Sora',sans-serif] font-extrabold text-sm mx-auto mb-4 shadow-md shadow-blue-300/30
                      group-hover:scale-110 transition-transform">
                      {num}
                    </div>
                    <div className="text-[#2563EB] flex justify-center mb-3 opacity-60">{icon}</div>
                    <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-sm mb-2 leading-snug">{title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>


        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 5. POURQUOI TRAVAILLER AVEC MOI ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 left-1/5 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <AnimateIn className="text-center mb-14">
            <Eyebrow text={SV.why_eyebrow ?? "Pourquoi moi ?"} />
            <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug text-[clamp(1.6rem,4vw,2.5rem)]">
              {SV.why_title ?? "Ce qui me différencie"}<br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">{SV.why_accent ?? "n'est pas que technique."}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {SV.why_subtitle ?? "Les bons développeurs sont nombreux. Ceux qui comprennent le produit, les utilisateurs, la vision business ET la technique, c'est plus rare."}
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map(({ icon, title, desc }, i) => (
              <AnimateIn key={title} delay={i * 0.5} className="h-full">
                <div className="group h-full bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-7
                  hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white mb-4 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]} group-hover:scale-110 transition-transform`}>
                    {icon}
                  </div>
                  <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-base mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Quote block */}
          <AnimateIn className="mt-12">
            <div className="relative bg-gradient-to-br from-[#1e3a8a] to-[#2563EB] rounded-2xl p-8 sm:p-10 text-center overflow-hidden shadow-[0_30px_70px_-20px_rgba(37,99,235,0.4)]">
              <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[length:30px_30px]" />
              <div className="relative z-10">
                <div className="text-4xl text-blue-300 font-serif mb-4">&ldquo;</div>
                <p className="font-['Sora',sans-serif] font-bold text-white text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-4">
                  Je cherche à livrer quelque chose de solide, durable et réellement utile.
                </p>
                <p className="text-blue-200 text-sm">GUELLY Morel H. R., Développeur Full Stack</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 6. STACK & OUTILS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-[#0F172A] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/4 w-[28rem] h-[28rem] rounded-full bg-violet-600/20 blur-[130px]" />
          <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-cyan-500/20 blur-[130px]" />
          <div className="absolute -bottom-20 right-1/3 w-80 h-80 rounded-full bg-amber-500/12 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <AnimateIn className="text-center mb-14">
            <Eyebrow text={SV.stack_eyebrow ?? "Stack & Outils"} light />
            <h2 className="font-['Sora',sans-serif] font-extrabold text-white leading-snug text-[clamp(1.6rem,4vw,2.5rem)]">
              {SV.stack_title ?? "Les technologies que je maîtrise"}<br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">{SV.stack_accent ?? "au service de vos projets."}</span>
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {stackItems.map(({ name, icon, cat }, i) => (
              <AnimateIn key={name} delay={i * 0.3}>
                <div className="group bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-center
                  hover:bg-white/10 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10
                  transition-all duration-300 cursor-default">
                  <div className="flex justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <p className="font-bold text-white text-xs sm:text-sm mb-1">{name}</p>
                  <p className="text-white/35 text-[10px] uppercase tracking-wider">{cat}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 7. COLLABORATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 left-1/5 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-300/20 blur-[120px]" />
          <div className="absolute top-1/2 right-1/5 w-72 h-72 rounded-full bg-amber-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <AnimateIn className="text-center mb-14">
            <Eyebrow text={SV.collab_eyebrow ?? "Collaboration"} />
            <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug text-[clamp(1.6rem,4vw,2.5rem)]">
              {SV.collab_title ?? "Je travaille avec des équipes"}<br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">{SV.collab_accent ?? "qui ont des projets qui comptent."}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {SV.collab_subtitle ?? "Peu importe le contexte, startup, entreprise, solopreneur, je m'adapte à votre rythme, votre culture et vos exigences."}
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {collabTypes.map(({ icon, label, desc }, i) => (
              <AnimateIn key={label} delay={i * 0.5} className="h-full">
                <div className="group h-full bg-slate-50 border border-slate-100 rounded-2xl p-6
                  hover:bg-[#EFF6FF] hover:border-blue-200 hover:shadow-md transition-all duration-300">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]} group-hover:scale-110 transition-transform`}>
                    {icon}
                  </div>
                  <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-sm mb-2">{label}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>


        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 8. CTA FINAL IMMERSIF ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 sm:py-32 bg-[#0F172A] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[130px]" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[130px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-500/10 rounded-full blur-[110px]" />
          <div className="absolute bottom-[10%] left-1/4 w-80 h-80 bg-amber-500/12 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:60px_60px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
          
          <AnimateIn delay={1}>
            <h2 className="font-['Sora',sans-serif] font-extrabold text-white leading-tight mb-6 text-[clamp(2rem,6vw,3.5rem)]">
              Les meilleurs produits ne se{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">contentent pas de fonctionner.</span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={2}>
            <p className="text-white/60 leading-relaxed mb-4 text-[clamp(0.95rem,2vw,1.1rem)]">
              Ils créent une expérience dont les utilisateurs se souviennent.
            </p>
            <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
              Que vous ayez une idée précise ou simplement une vision floue de ce que vous voulez construire,
              je suis là pour vous aider à transformer ça en quelque chose de réel, de solide et d'élégant.
            </p>
          </AnimateIn>

          <AnimateIn delay={3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="/contact"
                className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-sm
                transition-all shadow-lg shadow-blue-700/40 hover:shadow-blue-500/50 hover:-translate-y-0.5">
                <FiMail size={16} /> Démarrer la conversation
              </a>
              <a href="/projets"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold px-8 py-4 rounded-xl text-sm transition-all">
                <FiExternalLink size={15} /> Voir mes projets
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
  {fLinks.map((l: any) => (
    <li key={l.label}>
      <a href={l.href} className="text-slate-400 hover:text-blue-400 text-xs transition-colors">
        {l.label}
      </a>
    </li>
  ))}
</ul>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-4">Ce que je fais</p>
             <ul className="flex flex-col gap-2.5">
  {fServices.map((l: any) => (
    <li key={l.label}>
      <span className="text-slate-400 text-xs">{l.label}</span>
    </li>
  ))}
</ul>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-3">{fNewsTitle}</p>
              <p className="text-slate-400 text-xs mb-4">{fNewsDesc}</p>
              <NewsletterForm placeholder={fNewsPlaceholder} />
               <div className="flex gap-2">
    {socialLinks.map(({ icon, href, label }: any, i: number) => ( <a

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