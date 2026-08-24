"use client";
import NewsletterForm from "@/components/NewsletterForm";
import Lines from "@/components/Lines";
import { useState, useEffect, useRef, type ReactNode, type CSSProperties, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import "./responsive.css";
import { useSiteData } from "@/lib/useSiteData";
import { apiBaseUrl } from "@/lib/backend";
import { mediaUrl } from "@/lib/media";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward, FiShield, FiClock, FiLayout, FiBriefcase, FiBarChart2,
  FiUsers, FiPhone, FiMail, FiMapPin,
  FiChevronDown, FiSend, FiArrowRight, FiGithub, FiLinkedin, FiTwitter,
  FiCalendar, FiDatabase, FiStar, FiCheckCircle,
  FiZap, FiCode, FiBox, FiCpu, FiLayers, FiTarget, FiExternalLink,
  FiChevronLeft, FiChevronRight, FiUser, FiX
} from "react-icons/fi";
import {
  SiLaravel, SiNextdotjs, SiPython, SiReact, SiTailwindcss,
  SiMysql, SiNodedotjs, SiDocker, SiTypescript, SiPandas,
  SiHtml5, SiJavascript
} from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";

// ─────────────────────────────────────────────────────────────────────────────
// ██████████████████████████  DONNÉES ÉDITABLES  ██████████████████████████████
// ─────────────────────────────────────────────────────────────────────────────

// ── NAVBAR ────────────────────────────────────────────────────────────────────
const navBrand = "GUELLY Morel";
const navLogoInitials = "GM";
const navPhone = "+229 0150387702";
const navPhoneHref = "tel:+2290150387702";
const navCTA = { label: "Discutons", href: "contact" };
const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  
  { label: "Projets", href: "/projets" },
  
];

// ── HERO ──────────────────────────────────────────────────────────────────────
const heroHeadlineLine1 = "Je conçois des";
const heroHeadlineLine2 = "produits web";
const heroHeadlineAccent = "qui durent.";
const heroSubtitle =
  "Je suis développeur Full Stack, spécialisé en applications web modernes et en évolution vers la Data Engineering et les systèmes intelligents.";
const heroSubtitleDesktop =
  "Je suis développeur Full Stack, spécialisé en applications web modernes et en évolution vers la Data Engineering et les systèmes intelligents.";
const heroCTAPrimary = { label: "Explorer mes projets", href: "#projets" };
const heroCTASecondary = { label: "Discutons de votre projet", href: "contact" };
const heroStats = [
  { n: "1+", l: "Ans d'exp." },
  { n: "3", l: "Projet" },
  { n: "5+", l: "Clients" },
];
const heroBadgeTop = { number: "1+", label: "Ans d'exp." };
const heroBadgeBottom = { number: "3", label: "Projet" };

// ── TRUST BADGES ─────────────────────────────────────────────────────────────
const trustItems = [
  { icon: <FiAward size={22} />, title: "Expert Certifié", sub: "Laravel & React", grad: "from-blue-500 to-indigo-600" },
  { icon: <FiShield size={22} />, title: "Qualité Garantie", sub: "Code propre & testé", grad: "from-emerald-500 to-teal-600" },
  { icon: <FiStar size={22} />, title: "Certifications", sub: "Web", grad: "from-amber-500 to-orange-600" },
  { icon: <FiClock size={22} />, title: "Livraison Rapide", sub: "Respect des délais", grad: "from-violet-500 to-purple-600" },
];

// ── CE QUI ME DÉFINIT ─────────────────────────────────────────────────────────
const definitionEyebrow = "Ce qui me définit";
const definitionHeadline = "Plus qu'un développeur,";
const definitionHeadlineAccent = "une approche produit.";
const definitionCards = [
  {
    icon: <FiLayers size={26} />,
    title: "Expérience",
    desc: "Des interfaces fluides, claires et pensées pour être utilisées naturellement.",
    accent: "from-blue-50 to-blue-100/50",
    border: "border-blue-200/60",
    grad: "from-sky-500 to-blue-600",
  },
  {
    icon: <FiBox size={26} />,
    title: "Architecture",
    desc: "Des architectures robustes, pensées pour évoluer sans sacrifier la performance.",
    accent: "from-indigo-50 to-indigo-100/50",
    border: "border-indigo-200/60",
    featured: true,
    grad: "from-indigo-500 to-violet-600",
  },
  {
    icon: <FiTarget size={26} />,
    title: "Vision",
    desc: "Une approche tournée vers la data, l'automatisation et les systèmes intelligents.",
    accent: "from-sky-50 to-sky-100/50",
    border: "border-sky-200/60",
    grad: "from-amber-500 to-orange-600",
  },
];

// ── ABOUT ─────────────────────────────────────────────────────────────────────
const aboutEyebrow = "À Propos";
const aboutHeadline = "Le détail change \ncomplètement l'expérience.";
const aboutBody = (
  <>
    Je suis <strong className="text-slate-700">GUELLY Morel Hectore Ramanou</strong>,
    développeur full stack basé à Cotonou.

    Je conçois des applications modernes où
    l'interface, l'architecture et l'expérience
    travaillent ensemble.

    Mon approche combine développement produit,
    systèmes scalables et attention portée aux détails,
    avec une évolution progressive vers la Data
    et les systèmes intelligents.
  </>
);
const aboutCTALabel = "En savoir plus";
const aboutCTAHref = "about";
const aboutPhone = "+229 0150387702";
const aboutPhoneLabel = "Appelez-moi";
const aboutBadgeNumber = "1+";
const aboutBadgeLabel = "Ans d'expérience";

// ── SERVICES ─────────────────────────────────────────────────────────────────
const servicesEyebrow = "Capabilities";
const servicesHeadline = "Je construis des systèmes web\npensés pour durer";
const servicesSubtitle =
  "Du développement full stack à l'architecture de systèmes complexes, chaque solution est conçue avec une logique produit et une vision long terme.";
const services = [
  {
    icon: <FiLayout size={22} />,
    title: "Full Stack Engineering",
    desc: "Conception et développement d'applications web scalables avec Laravel, Next.js et APIs robustes orientées production.",
    grad: "from-blue-500 to-indigo-600",
  },
  {
    icon: <FiBriefcase size={22} />,
    title: "Architecture & Conseil",
    desc: "Conception d'architectures logicielles, choix de stack, optimisation des performances et revue de code orientée scalabilité.",
    grad: "from-violet-500 to-purple-600",
  },
  {
    icon: <FiBarChart2 size={22} />,
    title: "Data Systems (bientôt)",
    desc: "Construction de pipelines de données, dashboards analytiques et systèmes de traitement avec Python et SQL.",
    grad: "from-amber-500 to-orange-600",
  },
  {
    icon: <FiUsers size={22} />,
    title: "Mentoring & Formation",
    desc: "Accompagnement technique en Laravel, React et bases de données pour développeurs ou équipes produit.",
    grad: "from-cyan-500 to-sky-600",
  },
];

// ── PROJETS ───────────────────────────────────────────────────────────────────
const projectsEyebrow = "Projets en Vedette";
const projectsHeadline = "Chaque projet,\nune startup réelle.";
const projectsSubtitle =
  "Chaque projet est conçu comme un vrai produit avec une logique, une expérience, une architecture et une vision claire.";
const projectsCTA = { label: "Voir tous les projets", href: "/projets" };
// Par défaut (API endormie ou injoignable) : les projets réels codés en dur.
// Ils sont remplacés par ceux du dashboard admin dès que l'API est réveillée.
const projects = [
  {
    icon: <SiLaravel size={20} className="text-[#2563EB]" />,
    cat: "SaaS / IA",
    title: "StabilIT",
    domain: "stabilit.onrender.com",
    problem: "Les équipes lancent des projets numériques sans évaluer leur faisabilité réelle — complexité sous-estimée, délais explosés, budgets dépassés.",
    impact: "Diagnostic automatique en quelques minutes : complexité, charge, pression temporelle et maturité organisationnelle analysées avec des recommandations ciblées.",
    tags: ["Laravel", "IA", "SaaS"],
    image: "/Accueil_partie1.png",
    live: "https://stabilit.onrender.com/",
    repo: "https://github.com/morel156/stabilit",
  },
  {
    icon: <SiHtml5 size={20} className="text-[#2563EB]" />,
    cat: "Santé",
    title: "Cabinet Dentaire Theewite",
    domain: "cabinet-dentaire-theewite.vercel.app",
    problem: "Les cabinets médicaux doivent rassurer vite, présenter clairement soins et tarifs, et rendre la prise de contact évidente — l'enjeu était de transformer une simple présence en ligne en véritable point d'entrée vers le cabinet.",
    impact: "Landing page mobile-first orientée conversion : parcours pensé autour du rendez-vous, accès direct WhatsApp et téléphone, tarifs lisibles et base SEO complète (Open Graph, sitemap, JSON-LD).",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: "/theewite.png",
    live: "https://cabinet-dentaire-theewite.vercel.app/",
    repo: "https://github.com/morel156/cabinet-dentaire-theewite",
  },
  {
    icon: <SiJavascript size={20} className="text-[#2563EB]" />,
    cat: "Institut de beauté",
    title: "Clara Beauty",
    domain: "clarabeautysite.vercel.app",
    problem: "Un institut de beauté doit présenter son univers, ses prestations et ses tarifs tout en donnant envie de réserver, et valoriser ses produits dans un parcours simple entre découverte, confiance, réservation et achat.",
    impact: "Vitrine premium réunissant institut et boutique : soins visage et corps, massages, ongles, épilation, espace hommes, rituels signature et catalogue produits, avec réservation par créneau envoyée via WhatsApp ou e-mail.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: "/clara-beauty.png",
    live: "https://clarabeautysite.vercel.app/",
    repo: "https://github.com/morel156/Clara",
  },
];

// ── PROCESSUS ─────────────────────────────────────────────────────────────────
const processEyebrow = "Mon Processus";
const processHeadline = "Un bon produit ne se \nconstruit jamais au hasard.";
const processSubtitle =
  "Derrière chaque interface fluide, il y a des dizaines de décisions invisibles.";
const steps = [
  { num: "01", title: "Comprendre avant de construire", desc: "Objectifs, utilisateurs, problèmes. Je plonge dans votre contexte avant d'écrire une seule ligne.", grad: "from-blue-500 to-indigo-600" },
  { num: "02", title: "Transformer une idée en système cohérent", desc: "Architecture, expérience, direction visuelle. Chaque décision est justifiée.", grad: "from-violet-500 to-purple-600" },
  { num: "03", title: "Développer avec précision et logique", desc: "Performance, maintenabilité, qualité. Du code propre qui évolue dans le temps.", grad: "from-amber-500 to-orange-600" },
  { num: "04", title: "Créer quelque chose capable d'évoluer", desc: "Optimisation, données, scalabilité. Votre produit grandit avec vos ambitions.", grad: "from-cyan-500 to-sky-600" },
];

// ── STACK ─────────────────────────────────────────────────────────────────────
const stackEyebrow = "Stack & Technologies";
const stackHeadline = "Des technologies modernes";
const stackHeadlineAccent = "au service d'expériences solides.";
const stackCategories = [
  {
    label: "Frontend",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-400/30",
    items: [
      { name: "Next.js", icon: <SiNextdotjs size={16} />, level: 100, grad: "from-slate-300 to-slate-500" },
      { name: "React", icon: <SiReact size={16} />, level: 100, grad: "from-cyan-400 to-blue-500" },
      { name: "Tailwind", icon: <SiTailwindcss size={16} />, level: 100, grad: "from-teal-400 to-cyan-500" },
      { name: "TypeScript", icon: <SiTypescript size={16} />, level: 100, grad: "from-blue-500 to-blue-700" },
    ],
  },
  {
    label: "Backend",
    color: "from-indigo-500/20 to-indigo-600/10",
    border: "border-indigo-400/30",
    items: [
      { name: "Laravel", icon: <SiLaravel size={16} />, level: 100, grad: "from-orange-400 to-rose-500" },
      { name: "Node.js", icon: <SiNodedotjs size={16} />, level: 100, grad: "from-green-400 to-emerald-600" },
      { name: "MySQL", icon: <SiMysql size={16} />, level: 100, grad: "from-sky-500 to-indigo-600" },
      { name: "Docker", icon: <SiDocker size={16} />, level: 100, grad: "from-cyan-500 to-blue-600" },
    ],
  },
  {
    label: "Data Journey ( à venir )",
    color: "from-sky-500/20 to-sky-600/10",
    border: "border-sky-400/30",
    items: [
      { name: "Python", icon: <SiPython size={16} />, level: 100, grad: "from-amber-400 to-yellow-500" },
      { name: "Pandas", icon: <SiPandas size={16} />, level: 100, grad: "from-violet-500 to-purple-600" },
      { name: "SQL", icon: <FiDatabase size={16} />, level: 100, grad: "from-teal-400 to-cyan-600" },
      { name: "ML", icon: <FiCpu size={16} />, level: 100, grad: "from-fuchsia-500 to-pink-600" },
    ],
  },
];

// ── EXPERTISE ÉLARGIE ─────────────────────────────────────────────────────────
const expertiseEyebrow = "Expertise élargie";
const expertiseHeadline = "Au-delà du code classique,";
const expertiseHeadlineAccent = "trois superpowers.";
const expertiseSubtitle =
  "Des compétences complémentaires qui permettent d'adresser différents types de projets.";
const expertiseCards = [
  {
    type: "wordpress",
    status: "Maîtrisé",
    title: "WordPress Expert",
    desc: "Création de sites vitrine, blogs et e-commerces (WooCommerce) performants. Thèmes custom, plugins, SEO technique et vitesse.",
    icon: FiBox,
    variant: "default",
    avatarGradient: "from-orange-400 via-pink-500 to-purple-600",
    items: [
      "Thèmes & plugins custom",
      "WooCommerce avancé",
      "SEO technique & Core Web Vitals",
      "Migration & maintenance",
    ],
  },
  {
    type: "vibe",
    status: "En pratique active",
    badgeLabel: "Le plus utilisé",
    title: "Vibe Coding",
    desc: "Workflows IA (Cursor, Copilot, Claude) pour livrer plus vite sans sacrifier la qualité. Je pilote l'IA — pas l'inverse.",
    icon: FiCpu,
    variant: "highlight",
    avatarGradient: "from-blue-400 via-indigo-500 to-purple-600",
    items: [
      "Cursor AI & GitHub Copilot",
      "Prompting avancé",
      "Revue du code IA",
      "Productivité x3",
    ],
  },
  {
    type: "agentic",
    status: "En montée en puissance",
    title: "Développeur Agentique",
    desc: "Agents IA autonomes, LangChain, OpenAI API, workflows multi-agents et automatisation métier.",
    icon: RiRobot2Line,
    variant: "default",
    avatarGradient: "from-slate-400 via-slate-500 to-slate-700",
    items: [
      "LangChain / LangGraph",
      "OpenAI & Anthropic API",
      "Automatisation métier",
      "RAG & vector DB",
    ],
  },
];

// ── ROADMAP ───────────────────────────────────────────────────────────────────
const roadmapEyebrow = "Vision & Roadmap";
const roadmapHeadline = "Je ne veux pas seulement suivre l'évolution du web.";
const roadmapHeadlineAccent = "Je veux construire avec elle.";
const roadmapItems = [
  {
    period: "Aujourd'hui",
    icon: <FiCode size={16} />,
    grad: "from-cyan-400 to-blue-600",
    title: "Créer des expériences web premium",
    desc: "Full Stack Laravel + React/Next.js. APIs robustes, UX premium, code maintenable.",
    tags: ["Laravel", "React", "Next.js"],
    active: true,
    activeLabel: "En cours",
  },
  {
    period: "Demain",
    icon: <FiDatabase size={16} />,
    grad: "from-emerald-400 to-teal-600",
    title: "Construire des systèmes pilotés par la donnée",
    desc: "Pipelines ETL, dashboards analytiques, AWS, infrastructure scalable.",
    tags: ["Python", "AWS", "SQL"],
    active: false,
    activeLabel: "",
  },
  {
    period: "Ensuite",
    icon: <RiRobot2Line size={16} />,
    grad: "from-fuchsia-500 to-purple-600",
    title: "Explorer l'intelligence artificielle appliquée aux produits",
    desc: "Machine Learning appliqué, automatisation avancée, LLMs et agents.",
    tags: ["ML", "LLMs", "Agents"],
    active: false,
    activeLabel: "",
  },
];

// ── TÉMOIGNAGES ─────────────────────────────────────────────────────────────
const testimonialsEyebrow = "Témoignages";
const testimonialsHeadline = "Ils m'ont confié";
const testimonialsHeadlineAccent = "leurs projets.";
const testimonialsSubtitle =
  "Ce que disent les personnes avec qui j'ai collaboré.";
const testimonials = [
  {
    quote:
      "Morel a livré notre plateforme dans les délais, avec un code propre et une vraie réflexion produit. Un partenaire fiable du début à la fin.",
    name: "Ulrich Dossou",
    role: "CEO · Nexio Digital",
    initials: "UD",
    grad: "from-blue-500 to-indigo-600",
    photo: "",
  },
  {
    quote:
      "Il ne se contente pas d'exécuter : il propose, il questionne, il améliore. Notre application est bien plus solide grâce à lui.",
    name: "Yannick Agbodjan",
    role: "CTO · SantiPay",
    initials: "YA",
    grad: "from-amber-500 to-orange-600",
    photo: "",
  },
  {
    quote:
      "Communication claire, respect des engagements et résultat au rendez-vous. Je le recommande sans la moindre hésitation.",
    name: "Estelle Zinsou",
    role: "Fondatrice · Agence Wéma",
    initials: "EZ",
    grad: "from-violet-500 to-purple-600",
    photo: "",
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqEyebrow = "FAQ";
const faqHeadline = "Questions Fréquemment\nPosées";
const faqs = [
  { q: "Quelles technologies maîtrisez-vous ?", a: "Laravel, React, Next.js, TypeScript, Python, SQL — et je monte en compétences sur AWS et Docker." },
  { q: "Êtes-vous disponible en freelance ?", a: "Oui, disponible pour missions freelance court/moyen terme. Contactez-moi pour discuter de votre projet." },
  { q: "Quel est votre processus de travail ?", a: "Brief → Architecture → Développement agile → Tests → Livraison → Suivi post-livraison." },
  { q: "Proposez-vous de la maintenance ?", a: "Oui, forfaits mensuels : mises à jour, corrections de bugs et petites évolutions inclus." },
];

// ── CONTACT FORM ──────────────────────────────────────────────────────────────
const contactFormTitle = "Avez-Vous Une Question ?";
const contactFormFields = {
  name: "Nom",
  email: "Email",
  phone: "Téléphone",
  message: "Votre message...",
  submit: "Envoyer le message",
};

// ── SECTION FINALE ────────────────────────────────────────────────────────────
const finalHeadlinePart1 = "Vous avez une idée,\nun système ou un produit";
const finalHeadlineAccent = "à construire ?";
const finalCTAs = [
  { label: "Me contacter", href: "contact", icon: <FiMail size={16} />, style: "primary" },
  { label: "Planifier un échange", href: "contact", icon: <FiCalendar size={16} />, style: "secondary" },
];

// ── BLOG (section accueil) ────────────────────────────────────────────────────
// AUCUN article de démo : la section n'apparaît que si de vrais articles
// publiés remontent du dashboard admin.
const blogEyebrow = "Articles";
const blogHeadline = "Mon Blog Récent";
const blogCTA = { label: "Voir tous", href: "/blog" };
type HomeBlogPost = {
  image: string; icon: ReactNode; tag: string; title: string; date: string;
  read: string; slug: string; excerpt: string; content: string; tags: string[];
  category: string; author: { name: string }; images: string[]; video: string; videoUrl: string;
};

// ── FOOTER ────────────────────────────────────────────────────────────────────
const footerBrand = "GUELLY Morel";
const footerTagline =
  "Développeur Full Stack en transition vers le Data Engineering. Code propre, livraison rapide, impact mesurable.";
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
const footerNewsletterDesc =
  "Des insights concrets sur le développement full-stack, les architectures modernes et l'IA appliquée au code.";
const footerNewsletterPlaceholder = "Votre email...";
const footerSocialIcons = [
  { icon: <FiGithub size={15} />, href: "https://github.com/morel156", label: "GitHub" },
  { icon: <FiLinkedin size={15} />, href: "https://www.linkedin.com/in/morel-guelly-a05a1b420", label: "LinkedIn" },
  { icon: <FiTwitter size={15} />, href: "https://twitter.com/guellymorel", label: "Twitter" },
  { icon: <FiMail size={15} />, href: "mailto:guellymorelhectoreramanou@gmail.com", label: "Email" },
];
const footerCopyright = `© ${new Date().getFullYear()} GUELLY Morel. Tous droits réservés.`;
const footerBuiltWith = "Conçu avec Next.js 14 · Laravel 11 · Tailwind CSS";

// ─────────────────────────────────────────────────────────────────────────────
// ████████████████████████  FIN DES DONNÉES ÉDITABLES  ████████████████████████
// ─────────────────────────────────────────────────────────────────────────────

// ─── Section Eyebrow ──────────────────────────────────────────────────────────
function Eyebrow({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <p className={`text-xs font-bold tracking-[3px] uppercase mb-2 ${light ? "text-white/60" : "text-[#2563EB]"}`}>
      {text}
    </p>
  );
}

// ─── ConnectorLine ────────────────────────────────────────────────────────────
function ConnectorLine() {
  return <div className="hidden md:block absolute top-9 left-[calc(50%+20px)] w-[calc(100%-40px)] h-[2px] bg-blue-100 z-0" />;
}

// ─── ProgressBar ──────────────────────────────────────────────────────────────
function ProgressBar({ level }: { level: number }) {
  return (
    <div className={`h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 ${level >= 100 ? "w-full" : level >= 90 ? "w-[90%]" : "w-[80%]"}`} />
  );
}

// ─── ExpertiseCard ────────────────────────────────────────────────────────────
const ExpertiseCard = ({ card }: { card: (typeof expertiseCards)[number] }) => {
  const Icon = card.icon;
  const isHighlight = card.variant === "highlight";
  return (
    <div
      className={`group relative rounded-3xl p-6 sm:p-7 transition-all duration-300 border flex flex-col ${isHighlight
        ? "bg-gradient-to-b from-[#1b2a4a] to-[#0f1830] border-blue-400/40 lg:-translate-y-5 lg:scale-[1.04] z-10 shadow-[0_30px_70px_-15px_rgba(37,99,235,0.5),0_10px_25px_-10px_rgba(0,0,0,0.4)]"
        : "bg-gradient-to-b from-[#161e30] to-[#0f1626] border-white/10 hover:border-white/20 hover:-translate-y-1 shadow-[0_20px_45px_-15px_rgba(15,23,42,0.35)]"
      }`}
    >
      {card.badgeLabel && (
        <span className="absolute -top-3 right-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-orange-900/40 tracking-wide">
          {card.badgeLabel}
        </span>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${card.avatarGradient} flex items-center justify-center shadow-lg ring-1 ring-white/10`}>
          <Icon size={20} className="text-white" />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
          isHighlight ? "bg-blue-400/15 text-blue-300 border border-blue-400/30" : "bg-white/5 text-white/40 border border-white/10"
        }`}>
          {card.status}
        </span>
      </div>

      <h3 className="font-['Sora',sans-serif] font-extrabold text-white text-xl mb-2.5">
        {card.title}
      </h3>
      <p className="text-white/45 text-xs leading-relaxed mb-6">
        {card.desc}
      </p>

      <div className="flex items-baseline gap-1.5 mb-6">
        <span className={`font-['Sora',sans-serif] font-extrabold ${isHighlight ? "text-2xl text-white" : "text-lg text-white/70"}`}>
          {card.items.length} compétences clés
        </span>
      </div>

      <div className="h-px bg-white/10 mb-5" />

      <div className="flex flex-col gap-3 mt-auto">
        {card.items.map((item: string) => (
          <div key={item} className="flex items-center gap-2.5 text-white/65 text-xs">
            <FiCheckCircle size={14} className={`flex-shrink-0 ${isHighlight ? "text-blue-400" : "text-white/30"}`} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── ProjectsCarousel ─────────────────────────────────────────────────────────
function ProjectsCarousel({ items }: { items: typeof projects }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  const project = items[current];

  return (
    <div className="w-full">
      <div className="relative bg-white/10 border border-white/20 rounded-3xl overflow-hidden">

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
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-[#1e3a8a]/85 to-[#0f172a]/95" />
          <div
            className="absolute inset-0 mix-blend-multiply opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.35),transparent_60%)]"
          />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-0">

          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="text-white/90 text-xs font-bold uppercase tracking-wider">{project.cat}</span>
            </div>

            <h3 className="font-['Sora',sans-serif] font-extrabold text-white text-2xl sm:text-3xl mb-6 leading-tight drop-shadow-sm">
              {project.title}
            </h3>

            <div className="flex flex-col gap-4 mb-8">
              <div>
                <p className="text-white/55 font-bold text-[10px] uppercase tracking-[2px] mb-1.5">Problème</p>
                <p className="text-white/85 text-sm leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <p className="text-white/55 font-bold text-[10px] uppercase tracking-[2px] mb-1.5">Impact</p>
                <p className="text-white/90 text-sm leading-relaxed font-semibold">{project.impact}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((t) => (
                <span key={t} className="bg-white/15 text-white/90 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.live || "/projets"}
                target={project.live ? "_blank" : undefined}
                rel={project.live ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-blue-50 hover:shadow-lg hover:shadow-white/10 transition-all"
              >
                <FiExternalLink size={15} /> Voir le live
              </a>
              <a
                href={project.repo || "/projets"}
                target={project.repo ? "_blank" : undefined}
                rel={project.repo ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 border border-white/25 text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all"
              >
                <FiGithub size={15} /> Code
              </a>
              <a href="/projets" className="group inline-flex items-center gap-1.5 text-white/70 font-semibold text-sm hover:text-white transition-colors ml-1">
                Étude de cas <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center relative p-6">
            <div className="group w-full rounded-xl overflow-hidden shadow-[0_25px_60px_-20px_rgba(0,0,0,0.7)] border border-white/10 bg-[#0b1220] transition-transform duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1920}
                    height={900}
                    sizes="50vw"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                    quality={100}
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="aspect-video flex flex-col items-center justify-center gap-3 bg-white/5">
                    <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center border border-white/15">{project.icon}</div>
                    <p className="text-white/30 text-sm font-semibold">{project.title}</p>
                  </div>
                )}
              </div>
            </div>
            <span className="absolute -bottom-2 right-8 font-['Sora',sans-serif] font-extrabold text-white/10 text-[80px] leading-none select-none z-10">
              {String(current + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {items.length > 1 && (
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Projet ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-all"
            aria-label="Projet précédent"
          >
            <FiChevronLeft size={18} />
          </button>
          <span className="text-white/40 text-xs font-semibold tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-all"
            aria-label="Projet suivant"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
      )}
    </div>
  );
}

// ─── TechBackdrop ──────────────────────────────────────────────────────────────
function TechBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(96,165,250,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.5)_1px,transparent_1px)] bg-[length:34px_34px] [mask-image:radial-gradient(ellipse_at_50%_40%,#000_55%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_50%_40%,#000_55%,transparent_100%)]"
      />
      <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
        <g stroke="rgba(125,211,252,0.35)" strokeWidth="1.2">
          <path d="M20 60 H120 V140 H210" />
          <path d="M40 340 V240 H150 V180" />
          <path d="M380 90 H300 V200 H240" />
          <path d="M360 320 H280 V250" />
          <path d="M120 20 V90" />
        </g>
        {[
          [120, 140, "#38bdf8"], [210, 140, "#f59e0b"], [150, 240, "#38bdf8"],
          [150, 180, "#a78bfa"], [300, 200, "#38bdf8"], [240, 200, "#fb923c"],
          [280, 250, "#38bdf8"], [120, 90, "#38bdf8"], [280, 320, "#f59e0b"],
        ].map(([cx, cy, c], i) => (
          <g key={i}>
            <circle cx={cx as number} cy={cy as number} r="7" fill={c as string} opacity="0.16" />
            <circle cx={cx as number} cy={cy as number} r="3" fill={c as string} opacity="0.9" />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(37,99,235,0.35),transparent_65%)]" />
    </div>
  );
}

// ─── FloatingChip ──────────────────────────────────────────────────────────────
function FloatingChip({
  icon, label, grad, className,
}: {
  icon: React.ReactNode; label: string; grad: string; className?: string;
}) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white rounded-2xl pl-2 pr-3.5 py-2 shadow-[0_18px_40px_-12px_rgba(15,23,42,0.45)] animate-float ${className ?? ""}`}
    >
      <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white shadow-md`}>
        {icon}
      </span>
      <span className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-xs leading-tight">{label}</span>
    </div>
  );
}

// ─── AboutVisual ────────────────────────────────────────────────────────────────
function AboutVisual() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 z-0">
        <div className="absolute top-2 left-2 w-52 h-52 rounded-full bg-blue-500/25 blur-[70px]" />
        <div className="absolute bottom-6 right-4 w-56 h-56 rounded-full bg-amber-400/25 blur-[75px]" />
        <div className="absolute top-1/3 right-12 w-40 h-40 rounded-full bg-fuchsia-500/15 blur-[60px]" />
      </div>

      <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/70 shadow-[0_35px_90px_-25px_rgba(30,58,138,0.55)] h-72 sm:h-96 lg:h-[460px] bg-[linear-gradient(135deg,#0a1020_0%,#12203f_45%,#1e3a8a_100%)]">
        <TechBackdrop />
        <img src="/5.png" alt="À propos" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1020]/70 via-transparent to-transparent" />
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />

        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 bg-[#2563EB] text-white rounded-2xl px-4 py-3 text-center shadow-[0_15px_35px_-10px_rgba(37,99,235,0.8)] border border-white/20">
          <div className="font-['Sora',sans-serif] text-2xl font-extrabold leading-none">{aboutBadgeNumber}</div>
          <div className="text-[11px] text-white/85 mt-1">{aboutBadgeLabel}</div>
        </div>
      </div>

      <FloatingChip icon={<SiReact size={17} />} label="React" grad="from-cyan-400 to-blue-500"
        className="-top-5 left-4 sm:-left-5 rotate-[-5deg] [animation-delay:0s]" />
      <FloatingChip icon={<SiLaravel size={17} />} label="Laravel" grad="from-orange-400 to-rose-500"
        className="top-1/2 -right-3 sm:-right-6 rotate-[4deg] [animation-delay:1.4s]" />
      <FloatingChip icon={<SiPython size={17} />} label="Python" grad="from-amber-400 to-yellow-500"
        className="-bottom-5 left-6 sm:left-10 rotate-[3deg] [animation-delay:0.7s]" />
    </div>
  );
}

// ─── Reveal ──────────────────────────────────────────────────────────────────
function Reveal({
  children, delay = 0, y = 28, className = "",
}: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${visible ? "opacity-100 translate-y-0" : `opacity-0 translate-y-[${y}px]`}`}
    >
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
/**
 * Carte en orbite autour du centre du conteneur parent.
 * - `radius`   : distance au centre en px (rayon de l'orbite)
 * - `angle`    : position de départ sur le cercle, en degrés (0 = haut)
 * - `duration` : durée d'un tour complet en secondes
 * - `dir`      : sens de rotation ("cw" horaire, "ccw" anti-horaire)
 * La carte reste toujours droite et lisible (contre-rotation), et l'orbite
 * se met en pause au survol de la zone (classe `.hero-orbit-stage`).
 */
function OrbitCard({
  radius,
  angle,
  duration,
  dir,
  children,
}: {
  radius: number;
  angle: number;
  duration: number;
  dir: "cw" | "ccw";
  children: ReactNode;
}) {
  const spin = dir === "cw" ? "hero-spin-cw" : "hero-spin-ccw";
  const counter = dir === "cw" ? "hero-spin-ccw" : "hero-spin-cw";
  const dur = { "--od": `${duration}s` } as CSSProperties;

  return (
    // Couche d'orbite : tourne autour du centre du conteneur.
    // z-0 → les cartes passent DERRIÈRE la photo (z-10) : elles s'occultent
    // en passant sur la personne (effet de profondeur), visibles ailleurs.
    <div className={`pointer-events-none absolute inset-0 z-0 ${spin}`} style={dur}>
      {/* Centre l'origine du bras au centre du conteneur */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Bras : incline vers l'angle voulu puis pousse la carte sur le cercle */}
        <div style={{ transform: `rotate(${angle}deg) translateY(-${radius}px)` }}>
          {/* Contre-rotation : garde la carte droite pendant qu'elle gravite */}
          <div className={counter} style={dur}>
            {/* Redresse l'inclinaison de départ du bras */}
            <div style={{ transform: `rotate(${-angle}deg)` }}>
              <div className="pointer-events-auto">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  // ── Formulaire de contact de l'accueil (branché sur POST /api/contact) ──
  const [homeForm, setHomeForm] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [homeStatus, setHomeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [homeSlow, setHomeSlow] = useState(false);

  async function handleHomeSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (homeStatus === "loading") return;
    setHomeStatus("loading");
    setHomeSlow(false);
    // Hébergement gratuit : si le backend se réveille, on rassure le visiteur.
    const slowTimer = setTimeout(() => setHomeSlow(true), 4000);
    try {
      const res = await fetch(`${apiBaseUrl()}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(homeForm),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setHomeStatus("success");
      setHomeForm({ name: "", email: "", phone: "", message: "", website: "" });
    } catch {
      setHomeStatus("error");
    } finally {
      clearTimeout(slowTimer);
      setHomeSlow(false);
    }
  }

  const site = useSiteData();
  const s = site.settings;
  const brand = s?.navbar?.brand ?? navBrand;
  const logoInitials = s?.navbar?.logoInitials ?? navLogoInitials;
  const phone = s?.navbar?.phone ?? navPhone;
  const phoneHref = s?.navbar?.phoneHref ?? navPhoneHref;
  const hHead1 = s?.hero?.headlineLine1 ?? heroHeadlineLine1;
  const hHead2 = s?.hero?.headlineLine2 ?? heroHeadlineLine2;
  const hAccent = s?.hero?.headlineAccent ?? heroHeadlineAccent;
  const hSub = s?.hero?.subtitle ?? heroSubtitle;

  // ── SECTION « À PROPOS » (accueil) pilotée depuis l'admin ──
  const ab: any = s?.about ?? {};
  const aEyebrow = ab.eyebrow ?? aboutEyebrow;
  const aHeadline = ab.headline ?? aboutHeadline;
  const aBody = ab.body && String(ab.body).trim() ? String(ab.body) : null;
  const aCTALabel = ab.ctaLabel ?? aboutCTALabel;
  const aCTAHref = ab.ctaHref ?? aboutCTAHref;
  const aPhone = ab.phone ?? aboutPhone;
  const aPhoneLabel = ab.phoneLabel ?? aboutPhoneLabel;

  // ── TITRES DE SECTIONS (accueil) pilotés depuis l'admin (groupe "home") ──
  const HT: any = s?.home ?? {};
  const tx = {
    servicesEyebrow: HT.services_eyebrow ?? servicesEyebrow,
    servicesHeadline: HT.services_headline ?? servicesHeadline,
    servicesSubtitle: HT.services_subtitle ?? servicesSubtitle,
    projectsEyebrow: HT.projects_eyebrow ?? projectsEyebrow,
    projectsHeadline: HT.projects_headline ?? projectsHeadline,
    projectsSubtitle: HT.projects_subtitle ?? projectsSubtitle,
    processEyebrow: HT.process_eyebrow ?? processEyebrow,
    processHeadline: HT.process_headline ?? processHeadline,
    processSubtitle: HT.process_subtitle ?? processSubtitle,
    stackEyebrow: HT.stack_eyebrow ?? stackEyebrow,
    stackHeadline: HT.stack_headline ?? stackHeadline,
    stackHeadlineAccent: HT.stack_accent ?? stackHeadlineAccent,
    expertiseEyebrow: HT.expertise_eyebrow ?? expertiseEyebrow,
    expertiseHeadline: HT.expertise_headline ?? expertiseHeadline,
    expertiseHeadlineAccent: HT.expertise_accent ?? expertiseHeadlineAccent,
    expertiseSubtitle: HT.expertise_subtitle ?? expertiseSubtitle,
    roadmapEyebrow: HT.roadmap_eyebrow ?? roadmapEyebrow,
    roadmapHeadline: HT.roadmap_headline ?? roadmapHeadline,
    roadmapHeadlineAccent: HT.roadmap_accent ?? roadmapHeadlineAccent,
    testimonialsEyebrow: HT.testimonials_eyebrow ?? testimonialsEyebrow,
    testimonialsHeadline: HT.testimonials_headline ?? testimonialsHeadline,
    testimonialsHeadlineAccent: HT.testimonials_accent ?? testimonialsHeadlineAccent,
    testimonialsSubtitle: HT.testimonials_subtitle ?? testimonialsSubtitle,
    faqEyebrow: HT.faq_eyebrow ?? faqEyebrow,
    faqHeadline: HT.faq_headline ?? faqHeadline,
    contactFormTitle: HT.contactform_title ?? contactFormTitle,
    finalHeadlinePart1: HT.final_headline ?? finalHeadlinePart1,
    finalHeadlineAccent: HT.final_accent ?? finalHeadlineAccent,
    blogEyebrow: HT.blog_eyebrow ?? blogEyebrow,
    blogHeadline: HT.blog_headline ?? blogHeadline,
  };
  const stepsData = Array.isArray(HT.process_steps) && HT.process_steps.length ? HT.process_steps : steps;
  const stepGrads = ["from-blue-500 to-indigo-600", "from-violet-500 to-purple-600", "from-amber-500 to-orange-600", "from-cyan-500 to-sky-600"];
  const faqsData = Array.isArray(HT.faqs) && HT.faqs.length ? HT.faqs : faqs;

  // ── ÉLÉMENTS COMMUNS (footer + réseaux) pilotés depuis l'admin ──
  // Édités une seule fois dans « Réglages du site » → appliqués partout.
  const f: any = s?.footer ?? {};
  const socialS: any = s?.social ?? {};
  const contactS: any = s?.contact ?? {};
  const fBrand = s?.navbar?.brand ?? f.brand ?? footerBrand;
  const fTagline = f.tagline ?? footerTagline;
  const fCopyright = f.copyright
    ? String(f.copyright).replace("{year}", String(new Date().getFullYear()))
    : footerCopyright;
  const fBuiltWith = f.builtWith ?? footerBuiltWith;
  const fLinks = Array.isArray(f.links) && f.links.length ? f.links : footerLinks;
  const fServices = Array.isArray(f.services) && f.services.length ? f.services : footerServices;
  const fNewsTitle = f.newsletterTitle ?? footerNewsletterTitle;
  const fNewsDesc = f.newsletterDesc ?? footerNewsletterDesc;
  const fNewsPlaceholder = f.newsletterPlaceholder ?? footerNewsletterPlaceholder;
  const socialLinks = footerSocialIcons.map((it) => {
    const k = it.label.toLowerCase();
    const url = k === "github" ? socialS.github : k === "linkedin" ? socialS.linkedin : k === "twitter" ? socialS.twitter : null;
    return { ...it, href: url && String(url).trim() ? String(url).trim() : it.href };
  });
  const fContact = [
    { ...footerContact[0], val: contactS.phone ?? footerContact[0].val, href: contactS.phoneHref ?? footerContact[0].href },
    { ...footerContact[1], val: contactS.email ?? footerContact[1].val, href: contactS.email ? `mailto:${contactS.email}` : footerContact[1].href },
    { ...footerContact[2], val: contactS.address ?? footerContact[2].val, href: footerContact[2].href },
  ];

  // ── PROJETS : source API avec repli sur les projets par défaut ──
  const projectsData: typeof projects =
    site.projects && site.projects.length
      ? site.projects.map((p: any, i: number) => {
          const base = projects[i % projects.length];
          const img = mediaUrl(p.featured_image);
          return {
            icon: base.icon,
            cat: p.category ?? base.cat,
            title: p.title ?? base.title,
            domain: p.demo_url
              ? p.demo_url.replace(/^https?:\/\//, "").replace(/\/$/, "")
              : base.domain,
            problem: p.problem ?? p.description ?? base.problem,
            impact: p.impact ?? p.solution ?? base.impact,
            tags:
              Array.isArray(p.technologies) && p.technologies.length
                ? p.technologies
                : base.tags,
            image: img || base.image,
            live: p.demo_url ?? "",
            repo: p.github_url ?? "",
          };
        })
      : projects;

  // ── SERVICES : source API avec repli sur les services par défaut ──
  const servicesData: typeof services =
    site.services && site.services.length
      ? site.services.slice(0, 4).map((sv: any, i: number) => {
          const base = services[i % services.length];
          return {
            icon: base.icon,
            title: sv.title ?? base.title,
            desc: sv.description ?? base.desc,
            grad: base.grad,
          };
        })
      : services;

  // ── TÉMOIGNAGES : source API avec repli sur les témoignages par défaut ──
  const testimonialsData: typeof testimonials =
    site.testimonials && site.testimonials.length
      ? site.testimonials.map((t: any, i: number) => {
          const base = testimonials[i % testimonials.length];
          return {
            quote: t.content ?? base.quote,
            name: t.author_name ?? base.name,
            role: t.author_role ?? base.role,
            initials: t.author_name
              ? t.author_name
                  .split(" ")
                  .map((w: string) => w[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()
              : base.initials,
            grad: base.grad,
            photo: base.photo,
          };
        })
      : testimonials;

  // ── BLOG (accueil) : les 3 derniers articles "à la une" depuis le backend ──
  // Si un article est ajouté/modifié/mis en avant dans le dashboard admin,
  // il remonte ici automatiquement (via useSiteData). Aucun repli de démo.
  const blogPostsData: HomeBlogPost[] =
    site.blog && site.blog.length
      ? (() => {
          const featured = site.blog.filter((a: any) => a.featured);
          const source = featured.length ? featured : site.blog;

          const sorted = [...source].sort((a: any, b: any) => {
            const da = new Date(a.published_at ?? a.date ?? 0).getTime();
            const db = new Date(b.published_at ?? b.date ?? 0).getTime();
            return db - da;
          });

          return sorted.slice(0, 3).map((a: any): HomeBlogPost => ({
            image: a.featured_image
              ? mediaUrl(a.featured_image)
              : Array.isArray(a.images) && a.images.length
              ? mediaUrl(a.images[0])
              : "",
            icon: <FiDatabase size={36} className="text-[#2563EB]" />,
            tag: a.category ?? "Article",
            title: a.title ?? "",
            date: a.published_at ?? a.date ?? "",
            read: a.reading_time ? `${a.reading_time} min` : "",
            slug: a.slug ?? "",
            excerpt: a.excerpt ?? "",
            content: a.content ?? "",
            tags: Array.isArray(a.tags) ? a.tags : [],
            category: a.category ?? "",
            author: { name: a.author ?? "Morel GUELLY" },
            images: Array.isArray(a.images) ? a.images.map((p: string) => mediaUrl(p)) : [],
            video: a.video ? mediaUrl(a.video) : "",
            videoUrl: a.video_url ?? "",
          }));
        })()
      : [];

  // Section blog de l'accueil : visible UNIQUEMENT s'il y a de vrais articles.
  const showBlogSection = blogPostsData.length > 0;

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
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

  return (
    <main className="bg-white font-['Inter',sans-serif] text-slate-800 overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navSolid ? "bg-[#0b1220]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.55)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-['Sora',sans-serif] font-extrabold text-white text-sm shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform">{logoInitials}</span>
            <span className="font-['Sora',sans-serif] text-lg font-extrabold text-white group-hover:opacity-90 transition">{brand}</span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}
                className="relative text-white/80 hover:text-white text-sm font-medium transition-colors group">
                {item.label}
                <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={phoneHref} title={phone} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
              <FiPhone size={15} />
            </a>
            <a href={navCTA.href} className="inline-flex items-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-white/10 transition-all">
              {navCTA.label} <FiArrowRight size={15} />
            </a>
          </div>
          <div className="flex md:hidden items-center gap-3">
            <a href={navPhoneHref} className="text-white" title="Appelez-nous"><FiPhone size={18} /></a>
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
                className="text-white/85 hover:text-white text-sm font-medium py-2 border-b border-white/5 last:border-0 transition-colors">{item.label}</Link>
            ))}
            <a href={navCTA.href} onClick={() => setMobileMenuOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-full">
              {navCTA.label} <FiArrowRight size={15} />
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-28 lg:pt-32 relative bg-gradient-to-br from-[#1e3a8a] via-[#2563EB] to-[#3b82f6] min-h-[80vh] lg:min-h-[100vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0f172a]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f172a]/50 to-transparent" />
          <div className="absolute top-1/4 -left-24 w-[28rem] h-[28rem] rounded-full bg-cyan-400/20 blur-[130px]" />
          <div className="absolute bottom-1/4 -right-16 w-[26rem] h-[26rem] rounded-full bg-violet-500/20 blur-[130px]" />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-amber-400/12 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 w-full">

          <div className="flex flex-col items-center text-center lg:hidden gap-4">
            <h1
              className="responsive-heading-hero-sm font-['Sora',sans-serif] font-extrabold text-white leading-tight"
            >
              {hHead1}<br />{hHead2}<br />
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent">{hAccent}</span>
            </h1>

            {/* my-6 : zone tampon verticale pour que les cartes en orbite ne
                 recouvrent ni le titre au-dessus ni le texte en dessous. */}
            <div className="hero-orbit-stage relative w-64 sm:w-72 mx-auto my-6">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-sky-400/45 via-blue-400/25 to-transparent blur-[65px]" />
                <div className="absolute w-40 h-40 rounded-full bg-amber-400/25 blur-[55px] translate-x-14 translate-y-16" />
                {/* Anneaux pointillés qui tournent (sens opposés) */}
                <div className="absolute w-56 h-56 rounded-full border-2 border-dashed border-cyan-300/25 hero-ring-spin-cw" style={{ "--rd": "60s" } as CSSProperties} />
                <div className="absolute w-64 h-64 rounded-full border border-dashed border-violet-300/18 hero-ring-spin-ccw" style={{ "--rd": "80s" } as CSSProperties} />
              </div>
              <Image
                src="/111.png"
                alt="Portfolio"
                width={600}
                height={900}
                sizes="(max-width: 640px) 256px, 288px"
                className="relative z-10 object-contain w-full h-56"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, #000 56%, transparent 90%)",
                  maskImage: "linear-gradient(to bottom, #000 56%, transparent 90%)",
                }}
                quality={100}
                priority
              />

              {/* ── Cartes en orbite (mobile) : rayons réduits pour rester dans
                   la zone tampon, sans déborder sur les textes ── */}
              <OrbitCard radius={96} angle={52} duration={21} dir="cw">
                <div className="bg-white/95 backdrop-blur-md rounded-full pl-2 pr-3 py-1.5 flex items-center gap-2 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.5)] border border-white whitespace-nowrap">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-bold text-slate-700">Disponible</span>
                </div>
              </OrbitCard>

              <OrbitCard radius={96} angle={232} duration={21} dir="cw">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl px-3 py-2 text-center shadow-[0_15px_35px_-10px_rgba(15,23,42,0.5)] border border-white">
                  <div className="font-['Sora',sans-serif] text-lg font-extrabold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">{heroBadgeTop.number}</div>
                  <div className="text-[10px] font-semibold text-slate-500">{heroBadgeTop.label}</div>
                </div>
              </OrbitCard>

              <OrbitCard radius={110} angle={145} duration={26} dir="ccw">
                <div className="bg-white/90 backdrop-blur-md rounded-xl px-2.5 py-2 shadow-[0_18px_40px_-12px_rgba(15,23,42,0.55)] border border-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white"><SiReact size={13} /></span>
                    <span className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white"><SiLaravel size={13} /></span>
                    <span className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white"><SiPython size={13} /></span>
                  </div>
                </div>
              </OrbitCard>

              <OrbitCard radius={110} angle={310} duration={26} dir="ccw">
                <div className="bg-[#0f172a]/90 backdrop-blur-md border border-white/15 text-white rounded-2xl px-3 py-2 text-center shadow-2xl">
                  <div className="font-['Sora',sans-serif] text-lg font-extrabold bg-gradient-to-br from-cyan-300 to-blue-300 bg-clip-text text-transparent">{heroBadgeBottom.number}</div>
                  <div className="text-[10px] text-white/60">{heroBadgeBottom.label}</div>
                </div>
              </OrbitCard>
            </div>

            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              {hSub}
            </p>

            <div className="flex items-center w-full max-w-xs">
              {heroStats.map(({ n, l }, i) => (
                <div key={l} className={`text-center flex-1 ${i < heroStats.length - 1 ? "border-r border-white/20" : ""}`}>
                  <div className="font-['Sora',sans-serif] text-xl font-extrabold text-white">{n}</div>
                  <div className="text-white/60 text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col w-full max-w-xs gap-3">
              <a href={heroCTAPrimary.href} className="inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] font-bold px-7 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm shadow-lg shadow-black/20">
                <FiBriefcase size={16} /> {heroCTAPrimary.label}
              </a>
              <a href={heroCTASecondary.href} className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm">
                {heroCTASecondary.label}
              </a>
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                className="responsive-heading-hero-lg font-['Sora',sans-serif] font-extrabold text-white leading-tight mb-5"
              >
                {hHead1}<br />{hHead2}<br />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent">{hAccent}</span>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-8 max-w-lg">
                {heroSubtitleDesktop}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href={heroCTAPrimary.href} className="inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] font-bold px-7 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm shadow-lg shadow-black/20">
                  <FiBriefcase size={16} /> {heroCTAPrimary.label}
                </a>
                <a href={heroCTASecondary.href} className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  {heroCTASecondary.label}
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="hero-orbit-stage relative w-full max-w-2xl -mt-8">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="w-[440px] h-[440px] rounded-full bg-gradient-to-tr from-sky-400/40 via-blue-400/25 to-transparent blur-[95px]" />
                  <div className="absolute w-[260px] h-[260px] rounded-full bg-amber-400/25 blur-[85px] translate-x-32 translate-y-24" />
                  {/* Anneaux pointillés qui tournent lentement (sens opposés) */}
                  <div className="absolute w-[430px] h-[430px] rounded-full border-2 border-dashed border-cyan-300/25 hero-ring-spin-cw" style={{ "--rd": "72s" } as CSSProperties} />
                  <div className="absolute w-[510px] h-[510px] rounded-full border border-dashed border-violet-300/18 hero-ring-spin-ccw" style={{ "--rd": "96s" } as CSSProperties} />
                </div>
                <Image
                  src="/111.png"
                  alt="Portfolio"
                  width={1111}
                  height={1415}
                  sizes="(min-width: 1024px) 760px, 90vw"
                  className="relative z-10 object-contain w-full"
                  style={{
                    height: "515px",
                    WebkitMaskImage: "linear-gradient(to bottom, #000 56%, transparent 90%)",
                    maskImage: "linear-gradient(to bottom, #000 56%, transparent 90%)",
                  }}
                  quality={100}
                  priority
                />

                {/* ── Cartes en orbite (anneau 1 : horaire, anneau 2 : anti-horaire) ── */}
                <OrbitCard radius={215} angle={45} duration={24} dir="cw">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 text-center shadow-[0_18px_40px_-12px_rgba(15,23,42,0.5)] border border-white">
                    <div className="font-['Sora',sans-serif] text-xl font-extrabold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">{heroBadgeTop.number}</div>
                    <div className="text-[11px] font-semibold text-slate-500">{heroBadgeTop.label}</div>
                  </div>
                </OrbitCard>

                <OrbitCard radius={215} angle={212} duration={24} dir="cw">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-[0_22px_50px_-15px_rgba(15,23,42,0.55)] border border-white">
                    <div className="flex items-center gap-0.5 mb-1">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <FiStar key={s} size={13} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500">Qualité &amp; rigueur</div>
                  </div>
                </OrbitCard>

                <OrbitCard radius={255} angle={135} duration={30} dir="ccw">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-[0_22px_50px_-15px_rgba(15,23,42,0.55)] border border-white">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[2px] mb-2">Ma stack</div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-sm"><SiReact size={15} /></span>
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white shadow-sm"><SiLaravel size={15} /></span>
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-sm"><SiPython size={15} /></span>
                    </div>
                  </div>
                </OrbitCard>

                <OrbitCard radius={255} angle={318} duration={30} dir="ccw">
                  <div className="bg-[#0f172a]/90 backdrop-blur-md border border-white/15 text-white rounded-2xl px-4 py-2.5 text-center shadow-2xl">
                    <div className="font-['Sora',sans-serif] text-xl font-extrabold bg-gradient-to-br from-cyan-300 to-blue-300 bg-clip-text text-transparent">{heroBadgeBottom.number}</div>
                    <div className="text-[11px] text-white/60">{heroBadgeBottom.label}</div>
                  </div>
                </OrbitCard>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── TRUST BADGES ───────────────────────────────────────────────────── */}
      <section className="bg-white py-5 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4">
          {trustItems.map(({ icon, title, sub, grad }, i) => (
            <Reveal key={title} delay={i * 0.08} className="sm:flex-1 sm:min-w-[160px]">
              <div className="group flex items-center gap-3 bg-[#EFF6FF] rounded-xl px-4 sm:px-5 py-3 sm:py-4 h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${grad} text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-slate-900/10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>{icon}</div>
                <div>
                  <p className="font-bold text-slate-800 text-xs sm:text-sm">{title}</p>
                  <p className="text-slate-500 text-xs">{sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CE QUI ME DÉFINIT ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <Eyebrow text={definitionEyebrow} />
            <h2
              className="responsive-heading-xl font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug"
            >
              {definitionHeadline}<br className="hidden sm:block" />{" "}
              <span className="text-[#2563EB]">{definitionHeadlineAccent}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {definitionCards.map(({ icon, title, desc, accent, border, featured, grad }, i) => (
              <Reveal key={title} delay={i * 0.12}>
                <div
                  className={`group relative bg-gradient-to-br ${accent} border ${border} rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${featured ? "shadow-lg sm:scale-[1.03]" : ""}`}
                >
                  {featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider whitespace-nowrap">
                      Au cœur de tout
                    </div>
                  )}
                  <div className={`w-14 h-14 bg-gradient-to-br ${grad} rounded-xl flex items-center justify-center text-white mb-5 shadow-lg shadow-slate-900/10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                    {icon}
                  </div>
                  <h3
                    className="responsive-heading-definition font-['Sora',sans-serif] font-extrabold text-slate-800 mb-3"
                  >
                    {title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section id="propos" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AboutVisual />
          {/* Mobile : section centrée ; à partir de lg (2 colonnes), à gauche. */}
          <div className="text-center lg:text-left">
            <Eyebrow text={aEyebrow} />
            <h2
              className="responsive-heading-lg font-['Sora',sans-serif] font-extrabold text-slate-800 mb-5 leading-snug"
            >
              <Lines text={aHeadline} />
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 whitespace-pre-line">
              {aBody ?? aboutBody}
            </p>
            {/* Bouton et rappel téléphonique côte à côte (libellé sous le
                 numéro), centrés sur mobile. */}
            <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <a href={aCTAHref} className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-lg text-sm transition-colors">
                {aCTALabel}
              </a>
              <div className="flex items-center gap-3 text-sm text-left">
                <FiPhone size={18} className="text-[#2563EB]" />
                <div>
                  <a href={`tel:${aPhone}`} className="block font-bold text-slate-800 leading-tight">
                    {aPhone}
                  </a>
                  <div className="text-slate-500 text-xs mt-0.5">{aPhoneLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <Eyebrow text={tx.servicesEyebrow} />
          <h2
            className="responsive-heading-lg font-['Sora',sans-serif] font-extrabold text-slate-800 mb-3"
          >
            <Lines text={tx.servicesHeadline} />
          </h2>
          <p className="text-slate-500 text-sm mb-10 max-w-xl mx-auto">
            {tx.servicesSubtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {servicesData.map(({ icon, title, desc, grad }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div
                  className="group bg-slate-50 rounded-xl p-6 text-left border border-slate-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1.5 transition-all duration-300 h-full"
                >
                  <div className={`w-11 h-11 bg-gradient-to-br ${grad} rounded-lg flex items-center justify-center text-white mb-4 shadow-md shadow-slate-900/10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                    {icon}
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-2">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETS EN VEDETTE ─────────────────────────────────────────────── */}
      <section id="projets" className="py-16 sm:py-20 bg-[#0f172a] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-12">
            <div className="text-left lg:max-w-xl">
              <p className="text-blue-400 text-xs font-bold tracking-[3px] uppercase mb-3">{tx.projectsEyebrow}</p>
              <h2
                className="responsive-heading-lg font-['Sora',sans-serif] font-extrabold text-white mb-4"
              >
                <Lines text={tx.projectsHeadline} />
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {tx.projectsSubtitle}
              </p>
            </div>
            <a href={projectsCTA.href} className="inline-flex items-center gap-2 border-2 border-white/25 text-white font-bold px-7 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors flex-shrink-0 self-start lg:self-end">
              {projectsCTA.label} <FiArrowRight size={15} />
            </a>
          </div>

          <Reveal>
            <ProjectsCarousel items={projectsData} />
          </Reveal>
        </div>
      </section>

      {/* ── PROCESSUS ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <Eyebrow text={tx.processEyebrow} />
            <h2
              className="responsive-heading-lg font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug"
            >
              <Lines text={tx.processHeadline} />
            </h2>
            <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto">
              {tx.processSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
            {stepsData.map(({ num, title, desc, grad }: any, i: number) => (
              <Reveal key={num} delay={i * 0.12} className="relative">
                {i < stepsData.length - 1 && (
                  <ConnectorLine />
                )}
                <div className="group relative z-10 bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1.5 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${grad ?? stepGrads[i % stepGrads.length]} text-white rounded-full flex items-center justify-center font-['Sora',sans-serif] font-extrabold text-sm mb-5 shadow-lg shadow-slate-900/15 transition-transform duration-300 group-hover:scale-110`}>
                    {num}
                  </div>
                  <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-base mb-2">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK & TECHNOLOGIES ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#0f172a] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-blue-400 text-xs font-bold tracking-[3px] uppercase mb-2">{tx.stackEyebrow}</p>
            <h2
              className="responsive-heading-lg font-['Sora',sans-serif] font-extrabold text-white leading-snug"
            >
              {tx.stackHeadline}<br className="hidden sm:block" />{" "}
              <span className="text-blue-400">{tx.stackHeadlineAccent}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {stackCategories.map(({ label, color, border, items }, i) => (
              <Reveal key={label} delay={i * 0.12} className="h-full">
              <div className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-6 backdrop-blur-sm h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/50`}>
                <h3 className="text-white font-['Sora',sans-serif] font-extrabold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> {label}
                </h3>
                <div className="flex flex-col gap-4">
                  {items.map(({ name, icon, level, grad }) => (
                    <div key={name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5 text-white/90 text-sm font-semibold">
                          <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center text-white shadow-md shadow-black/20`}>{icon}</span>
                          {name}
                        </div>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <ProgressBar level={level} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ÉLARGIE ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16 sm:mb-24">
            <Eyebrow text={tx.expertiseEyebrow} />
            <h2 className="responsive-heading-xl font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug">
              {tx.expertiseHeadline}<br className="hidden sm:block" />{" "}
              <span className="text-[#2563EB]">{tx.expertiseHeadlineAccent}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto">
              {tx.expertiseSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 md:items-center">
            {expertiseCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12}>
                <ExpertiseCard card={card} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION / ROADMAP ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563EB] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-cyan-400/20 blur-[110px]" />
          <div className="absolute top-1/3 right-10 w-72 h-72 rounded-full bg-fuchsia-500/15 blur-[110px]" />
          <div className="absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-amber-400/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-white/60 text-xs font-bold tracking-[3px] uppercase mb-2">{tx.roadmapEyebrow}</p>
            <h2
              className="responsive-heading-md font-['Sora',sans-serif] font-extrabold text-white leading-snug"
            >
              {tx.roadmapHeadline}<br className="hidden sm:block" />{" "}
              <span className="text-blue-200">{tx.roadmapHeadlineAccent}</span>
            </h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-white/15 hidden md:block" />
            <div className="flex flex-col gap-5 sm:gap-6">
              {roadmapItems.map(({ period, icon, grad, title, desc, tags, active, activeLabel }, i) => (
                <Reveal key={period} delay={i * 0.12}>
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="relative flex-shrink-0 hidden md:flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 border-white/40 mt-2 bg-gradient-to-br ${grad} ${active ? "shadow-[0_0_18px_rgba(56,189,248,0.7)]" : "shadow-[0_0_10px_rgba(255,255,255,0.25)]"}`} />
                  </div>
                  <div className={`flex-1 rounded-2xl p-5 sm:p-6 border transition-all ${active
                    ? "bg-white/20 border-white/30 shadow-lg"
                    : "bg-white/8 border-white/10"
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center text-white shadow-md shadow-black/20`}>{icon}</span>
                        <span className={`text-xs font-bold uppercase tracking-widest ${active ? "text-white" : "text-white/60"}`}>
                          {period}
                        </span>
                      </div>
                      {active && (
                        <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {activeLabel}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`responsive-heading-roadmap font-['Sora',sans-serif] font-extrabold mb-2 ${active ? "text-white" : "text-white/60"}`}
                    >
                      {title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 ${active ? "text-white/80" : "text-white/40"}`}>{desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span key={t} className={`px-3 py-1 rounded-full text-xs font-semibold ${active
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-white/40"
                        }`}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── TÉMOIGNAGES ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-200/30 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <Eyebrow text={tx.testimonialsEyebrow} />
            <h2 className="responsive-heading-lg font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug">
              {tx.testimonialsHeadline}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{tx.testimonialsHeadlineAccent}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto">{tx.testimonialsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {testimonialsData.map((t, i) => (
              <Reveal key={i} delay={i * 0.12} className="h-full">
                <div className="group h-full flex flex-col bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <div className="flex items-center gap-0.5 mb-4">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <FiStar key={s} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-['Sora',sans-serif] text-5xl leading-none text-blue-200 mb-1 select-none">"</span>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{t.quote}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm" />
                    ) : (
                      <span className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.grad} flex items-center justify-center text-white font-['Sora',sans-serif] font-extrabold text-sm shadow-md`}>
                        {t.initials}
                      </span>
                    )}
                    <div>
                      <p className="font-bold text-slate-800 text-sm leading-tight">{t.name}</p>
                      <p className="text-slate-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT + FAQ ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 lg:gap-12">
          <div>
            <Eyebrow text={tx.faqEyebrow} />
            <h2
              className="responsive-heading-faq font-['Sora',sans-serif] font-extrabold text-slate-800 mb-6"
            >
              <Lines text={tx.faqHeadline} />
            </h2>
            <div className="flex flex-col gap-3">
              {faqsData.map(({ q, a }: any, i: number) => (
                <div key={i} className={`rounded-xl border overflow-hidden transition-all ${faqOpen === i ? "bg-white border-blue-200 shadow-md shadow-blue-100" : "bg-slate-50 border-slate-100"}`}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-bold text-slate-800 hover:bg-slate-100/60 transition-colors"
                  >
                    <span className="pr-3">{q}</span>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${faqOpen === i ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rotate-180" : "bg-blue-50 text-[#2563EB]"}`}>
                      <FiChevronDown size={16} />
                    </span>
                  </button>
                  {faqOpen === i && (
                    <div className="px-5 pb-4 text-slate-500 text-xs leading-relaxed border-t border-slate-100 pt-3">{a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-5 z-0">
              <div className="absolute top-0 right-2 w-44 h-44 rounded-full bg-blue-500/25 blur-[65px]" />
              <div className="absolute bottom-0 left-2 w-44 h-44 rounded-full bg-violet-500/20 blur-[65px]" />
              <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-amber-400/15 blur-[55px]" />
            </div>
            <div className="relative z-10 bg-[#0f172a] rounded-2xl p-6 sm:p-8 text-white border border-white/10 overflow-hidden shadow-[0_30px_70px_-25px_rgba(37,99,235,0.5)]">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
              <h3
                className="responsive-heading-sm font-['Sora',sans-serif] font-extrabold mb-6"
              >
                {tx.contactFormTitle}
              </h3>
              <form onSubmit={handleHomeSubmit} noValidate={false}>
                {/* Honeypot anti-bot (invisible) */}
                <input
                  type="text"
                  name="website"
                  value={homeForm.website}
                  onChange={(e) => setHomeForm({ ...homeForm, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input id="contact-name" name="name" type="text" required value={homeForm.name} onChange={(e) => setHomeForm({ ...homeForm, name: e.target.value })} placeholder={contactFormFields.name} className="bg-white/8 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:bg-white/12 focus:border-blue-400/40 transition-colors" />
                  <input id="contact-email" name="email" type="email" required value={homeForm.email} onChange={(e) => setHomeForm({ ...homeForm, email: e.target.value })} placeholder={contactFormFields.email} className="bg-white/8 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:bg-white/12 focus:border-blue-400/40 transition-colors" />
                </div>
                <input id="contact-phone" name="phone" type="text" value={homeForm.phone} onChange={(e) => setHomeForm({ ...homeForm, phone: e.target.value })} placeholder={contactFormFields.phone} className="w-full bg-white/8 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:bg-white/12 focus:border-blue-400/40 transition-colors mb-3" />
                <textarea id="contact-message" name="message" rows={4} required value={homeForm.message} onChange={(e) => setHomeForm({ ...homeForm, message: e.target.value })} placeholder={contactFormFields.message} className="w-full bg-white/8 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:bg-white/12 focus:border-blue-400/40 transition-colors resize-none mb-4" />
                <button
                  type="submit"
                  disabled={homeStatus === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 rounded-lg transition-all text-sm shadow-lg shadow-indigo-700/40 disabled:opacity-70 disabled:cursor-wait"
                >
                  {homeStatus === "loading" ? (
                    <><FiZap size={16} className="animate-pulse" /> Envoi en cours…</>
                  ) : homeStatus === "success" ? (
                    <><FiCheckCircle size={16} /> Message envoyé !</>
                  ) : (
                    <><FiSend size={16} /> {contactFormFields.submit}</>
                  )}
                </button>
                {homeStatus === "loading" && homeSlow && (
                  <p className="mt-3 text-xs text-blue-200/90" role="status">
                    Le serveur se réveille, l'envoi peut prendre quelques secondes de plus. Merci de patienter…
                  </p>
                )}
                {homeStatus === "success" && (
                  <p className="mt-3 text-xs text-emerald-300" role="status">
                    Merci ! Votre message a bien été envoyé — je vous réponds très vite.
                  </p>
                )}
                {homeStatus === "error" && (
                  <p className="mt-3 text-xs text-red-300" role="status">
                    L'envoi a échoué. Réessayez, ou écrivez-moi directement par email.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION FINALE CONVERSION ──────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#0f172a] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-600/20 blur-[100px]" />
          <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-violet-600/18 blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-400/12 blur-[90px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-cyan-500/8 blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <h2
            className="responsive-heading-hero-xl font-['Sora',sans-serif] font-extrabold text-white leading-tight mb-6"
          >
            <Lines text={tx.finalHeadlinePart1} /><br className="hidden sm:block" />{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">{tx.finalHeadlineAccent}</span>
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-12">
            {finalCTAs.map(({ label, href, icon, style }) => (
              <a key={label} href={href} className={`inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl text-sm transition-colors ${
                style === "primary"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-700/50"
                  : "border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40"
              }`}>
                {icon} {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG (dynamique : 3 derniers articles à la une depuis le backend) ──
           Masquée s'il n'y a aucun article (sauf API injoignable → repli démo). */}
      {showBlogSection && (
      <section id="blog" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <Eyebrow text={tx.blogEyebrow} />
              <h2
                className="responsive-heading-lg font-['Sora',sans-serif] font-extrabold text-slate-800 mt-1"
              >
                {tx.blogHeadline}
              </h2>
            </div>
            <a href={blogCTA.href} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/30">
              {blogCTA.label} <FiArrowRight size={15} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {blogPostsData.map((item, i) => (
              <Reveal key={item.slug || item.title} delay={i * 0.12}>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(item)}
                  className="text-left w-full rounded-xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 block group bg-white h-full"
                >
                  <div className="h-48 sm:h-56 overflow-hidden relative">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#EFF6FF] flex items-center justify-center">
                        {item.icon}
                      </div>
                    )}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#2563EB] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ring-1 ring-black/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 text-sm mb-3 leading-snug group-hover:text-[#2563EB] transition-colors">{item.title}</h3>
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-4">
                      <FiCalendar size={12} /> {item.date}
                      <span>·</span>
                      <FiClock size={12} /> {item.read}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[#2563EB] text-xs font-bold group-hover:gap-2.5 transition-all">
                      Lire l'article <FiArrowRight size={14} />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1e293b] pt-12 sm:pt-14 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 via-violet-500 to-amber-400" />
        <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10">
            <div className="sm:col-span-2 md:col-span-1">
              <p className="font-['Sora',sans-serif] text-xl font-extrabold mb-3 bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent w-fit">{fBrand}</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">
                {fTagline}
              </p>
              <div className="flex flex-col gap-2.5">
                {fContact.map(({ icon, val, href }, i) => (
                  <a key={val} href={href} className="flex items-center gap-2.5 text-slate-400 text-xs hover:text-white transition-colors">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br ${["from-cyan-400 to-blue-500", "from-violet-500 to-purple-600", "from-amber-500 to-orange-600"][i]}`}>{icon}</span> {val}
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
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Fermer"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md ring-1 ring-black/5 transition-colors"
              >
                <FiX size={18} />
              </button>

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
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
                  {selectedArticle.category && (
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#2563EB] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                      {selectedArticle.category}
                    </span>
                  )}
                  {selectedArticle.date && (
                    <span className="inline-flex items-center gap-1"><FiCalendar size={12} /> {selectedArticle.date}</span>
                  )}
                  {selectedArticle.read && (
                    <span className="inline-flex items-center gap-1"><FiClock size={12} /> {selectedArticle.read}</span>
                  )}
                  {selectedArticle.author?.name && (
                    <span className="inline-flex items-center gap-1"><FiUser size={12} /> {selectedArticle.author.name}</span>
                  )}
                </div>

                <h2 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-2xl sm:text-3xl leading-tight mb-4">
                  {selectedArticle.title}
                </h2>

                {selectedArticle.excerpt && (
                  <p className="text-slate-500 text-base leading-relaxed mb-6 border-l-4 border-blue-200 pl-4">
                    {selectedArticle.excerpt}
                  </p>
                )}

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

                <div
                  className="prose prose-slate max-w-none text-slate-700 text-[15px] leading-relaxed [&_h2]:font-bold [&_h2]:text-slate-800 [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-[#2563EB]"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content || "<p>Contenu à venir.</p>" }}
                />

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
