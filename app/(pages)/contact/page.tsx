"use client";
import NewsletterForm from "@/components/NewsletterForm";
import { useSiteData } from "@/lib/useSiteData";
import { apiBaseUrl } from "@/lib/backend";
import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  FiPhone, FiMail, FiMapPin, FiArrowRight, FiClock, FiCheck,
  FiMessageSquare, FiCalendar, FiSend, FiChevronRight, FiGithub,
  FiLinkedin, FiTwitter, FiZap, FiHeadphones, FiBarChart2, FiLayout
} from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

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

// ── CONTACT PAGE DATA ─────────────────────────────────────────────────────────
const contactHeroTitle = "Parlons de votre idée.";
const contactHeroSubtitle = "Je suis disponible pour discuter de vos projets ambitieux, vos défis techniques ou simplement explorer comment nous pouvons créer quelque chose d'exceptionnel ensemble.";

const contactMethods = [
  {
    icon: <FiMail size={24} />,
    title: "Email",
    value: "guellymorelhectoreramanou@gmail.com",
    action: "mailto:guellymorelhectoreramanou@gmail.com",
    actionType: "link",
    time: "Réponse en 24h",
    desc: "Pour les demandes détaillées et les projets précis.",
    color: "from-blue-500/15 to-blue-600/5 border-blue-500/25",
  },
  {
    icon: <FiPhone size={24} />,
    title: "Téléphone / WhatsApp",
    value: "+229 0150387702",
    action: "tel:+2290150387702",
    actionType: "link",
    time: "Appel immédiat",
    desc: "Pour discuter rapidement et vous présenter mon approche.",
    color: "from-green-500/15 to-green-600/5 border-green-500/25",
  },
  {
    icon: <FiMessageSquare size={24} />,
    title: "Message",
    value: "Formulaire ci-dessous",
    action: "contact-form",
    actionType: "scroll",
    time: "Réponse en 12-24h",
    desc: "Parfait pour expliquer votre projet en détail.",
    color: "from-indigo-500/15 to-indigo-600/5 border-indigo-500/25",
  },
];

const whyReachOut = [
  {
    icon: <FiLayout size={22} />,
    title: "Clarification de votre vision",
    desc: "Vous avez une idée floue ? Je peux vous aider à la structurer et à trouver la meilleure approche technique.",
  },
  {
    icon: <FiBarChart2 size={22} />,
    title: "Audit technique ou conseil",
    desc: "Votre application traîne ? Je peux auditer votre code, identifier les goulots et proposer des solutions.",
  },
  {
    icon: <FiHeadphones size={22} />,
    title: "Mentoring & formation",
    desc: "Vous voulez monter en compétence sur Laravel, React ou Next.js ? Je peux vous guider.",
  },
  {
    icon: <RiRobot2Line size={22} />,
    title: "Automatisation & IA",
    desc: "Vous sentez que vos processus sont trop manuels ? Parlons d'automatisation et d'agents IA.",
  },
  {
    icon: <FiArrowRight size={22} />,
    title: "Partenariat long terme",
    desc: "Cherchez un développeur qui comprend votre business ? Je peux être votre CTO virtuel.",
  },
  {
    icon: <FiZap size={22} />,
    title: "Quick wins & prototypes",
    desc: "Besoin de valider une idée vite ? Je construis des prototypes fonctionnels en quelques jours.",
  },
];

const faqContact = [
  {
    q: "Quel est votre tarif moyen pour un projet ?",
    a: "Cela dépend de la complexité et de la durée. Pour une consultation initiale gratuite de 30 min, je peux vous donner une estimation précise après avoir compris votre besoin.",
  },
  {
    q: "Êtes-vous disponible pour un projet immédiat ?",
    a: "Oui, je peux commencer les missions freestyle rapidement. Pour les projets long terme, je vous propose généralement un délai de démarrage d'une semaine.",
  },
  {
    q: "Proposez-vous une période d'essai ?",
    a: "Oui, je peux commencer par une mission test ou un milestone initial pour que nous nous comprenions bien avant d'engager une collaboration plus longue.",
  },
  {
    q: "Travaillez-vous avec un contrat ?",
    a: "Bien sûr. Un contrat clair protège les deux parties. Je m'assure que les délais, les livrables et les conditions sont bien définis.",
  },
  {
    q: "Quelle est votre charge de travail actuelle ?",
    a: "Je gère généralement 2-3 projets en parallèle pour maintenir une qualité premium. Contactez-moi pour vérifier ma disponibilité.",
  },
  {
    q: "Fournissez-vous du support post-livraison ?",
    a: "Oui, je propose des forfaits de maintenance qui incluent les mises à jour, les corrections de bugs et les petites évolutions.",
  },
];

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
  { icon: <FiLinkedin size={15} />, href: "https://www.linkedin.com/in/morel-guelly-a05a1b420?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { icon: <FiTwitter size={15} />, href: "https://twitter.com/morel156", label: "Twitter" },
  { icon: <FiMail size={15} />, href: "mailto:guellymorelhectoreramanou@gmail.com", label: "Email" },
];
const footerCopyright = `© ${new Date().getFullYear()} GUELLY Morel. Tous droits réservés.`;
const footerBuiltWith = "Conçu avec Next.js 14 · Laravel 11 · Tailwind CSS";

// ─ Animation helpers ──────────────────────────────────────────────────────────
function AnimateIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay }}
    >
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

export default function ContactPage() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formSlow, setFormSlow] = useState(false);

  const site = useSiteData();
  const s = site.settings;
  const f: any = s?.footer ?? {};
  const socialS: any = s?.social ?? {};
  const contactS: any = s?.contact ?? {};
  const CT: any = s?.ct ?? {}; // titres des sections de la page Contact (éditables)
  const fBrand = s?.navbar?.brand ?? f.brand ?? footerBrand;
  const fLogo = s?.navbar?.logoInitials ?? "GM";
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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormSlow(false);
    // Hébergement gratuit : si le backend doit se réveiller, on prévient le visiteur.
    const slowTimer = setTimeout(() => setFormSlow(true), 4000);
    const API = apiBaseUrl();
    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
      setTimeout(() => setFormStatus("idle"), 6000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 6000);
    } finally {
      clearTimeout(slowTimer);
      setFormSlow(false);
    }
  };

  const scrollToForm = () => {
    const element = document.getElementById("contact-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-white font-['Inter',sans-serif] text-slate-800 overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navSolid ? "bg-[#0b1220]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.55)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-['Sora',sans-serif] font-extrabold text-white text-sm shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform">{fLogo}</span>
            <span className="font-['Sora',sans-serif] text-lg font-extrabold text-white group-hover:opacity-90 transition">{fBrand}</span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}
                className={`relative text-sm font-medium transition-colors group ${item.href === "/contact" ? "text-white" : "text-white/80 hover:text-white"}`}>
                {item.label}
                <span className={`absolute -bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full origin-left transition-transform duration-300 ${item.href === "/contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={navPhoneHref} className="inline-flex items-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-white/10 transition-all">
              Appelez-moi <FiArrowRight size={15} />
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
                className={`text-sm font-medium py-2 border-b border-white/5 last:border-0 transition-colors ${item.href === "/contact" ? "text-white" : "text-white/80 hover:text-white"}`}>{item.label}</Link>
            ))}
            <a href={navPhoneHref} onClick={() => setMobileMenuOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 bg-white text-[#0b1220] font-bold text-sm px-5 py-2.5 rounded-full">Appelez-moi <FiArrowRight size={15} /></a>
          </div>
        )}
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━ 1. HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1e3a8a] to-[#2563EB] min-h-[85vh] flex items-center overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[34rem] h-[34rem] rounded-full bg-cyan-500/25 blur-[130px]" />
          <div className="absolute top-1/3 -right-16 w-[26rem] h-[26rem] rounded-full bg-violet-600/25 blur-[130px]" />
          <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-amber-500/15 blur-[130px]" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:60px_60px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Sora',sans-serif] font-extrabold text-white leading-tight mb-6 text-[clamp(2.2rem,7vw,4.5rem)]"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">{contactS.heroTitle ?? contactHeroTitle}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="text-white/65 max-w-2xl mx-auto leading-relaxed text-[clamp(0.95rem,2.5vw,1.125rem)]"
          >
            {contactS.heroSubtitle ?? contactHeroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-indigo-700/40 hover:-translate-y-0.5 cursor-pointer">
              <FiArrowRight size={16} /> Commençons
            </button>
            <a href="tel:+2290150387702"
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold px-8 py-4 rounded-xl text-sm transition-all">
              <FiPhone size={16} /> Appel rapide
            </a>
          </motion.div>

          {/* Réassurance conversion */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/55 text-xs"
          >
            {["Consultation gratuite", "Réponse sous 24h", "Sans engagement"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <FiCheck size={13} className="text-emerald-400 flex-shrink-0" /> {t}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 2. MÉTHODES DE CONTACT ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 left-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-1/5 w-80 h-80 rounded-full bg-amber-300/20 blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-violet-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <AnimateIn className="text-center mb-14">
            <Eyebrow text={CT.join_eyebrow ?? "Comment me joindre"} />
            <h2
              className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug text-[clamp(1.6rem,4vw,2.5rem)]"
            >
              {CT.join_title ?? "Plusieurs façons de"}<br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">{CT.join_accent ?? "démarrer la conversation."}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {CT.join_subtitle ?? "Choisissez la méthode qui vous convient. Je réponds rapidement et je suis là pour vous écouter."}
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-12">
            {contactMethods.map(({ icon, title, value, action, actionType, time, desc, color }, i) => (
              <AnimateIn key={title} delay={i * 0.5} className="h-full">
                {actionType === "scroll" ? (
                  <button
                    onClick={scrollToForm}
                    className={`group w-full h-full text-left bg-gradient-to-br ${color} border rounded-2xl p-6 sm:p-7 backdrop-blur-sm
                    transition-all duration-300 hover:shadow-[0_24px_60px_-24px_rgba(37,99,235,0.4)] hover:border-blue-400/40 hover:-translate-y-1.5 flex flex-col cursor-pointer`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]} group-hover:scale-110 transition-transform`}>
                      {icon}
                    </div>
                    <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-base mb-1">{title}</h3>
                    <p className="text-slate-600 font-semibold text-sm mb-3">{value}</p>
                    <p className="text-slate-500 text-xs mb-4 flex-grow">{desc}</p>
                    <div className="flex items-center gap-2 text-[#2563EB] text-xs font-semibold">
                      <FiClock size={12} /> {time}
                    </div>
                  </button>
                ) : (
                  <a
                    href={action}
                    className={`group h-full bg-gradient-to-br ${color} border rounded-2xl p-6 sm:p-7 backdrop-blur-sm
                    transition-all duration-300 hover:shadow-[0_24px_60px_-24px_rgba(37,99,235,0.4)] hover:border-blue-400/40 hover:-translate-y-1.5 flex flex-col`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]} group-hover:scale-110 transition-transform`}>
                      {icon}
                    </div>
                    <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-base mb-1">{title}</h3>
                    <p className="text-slate-600 font-semibold text-sm mb-3">{value}</p>
                    <p className="text-slate-500 text-xs mb-4 flex-grow">{desc}</p>
                    <div className="flex items-center gap-2 text-[#2563EB] text-xs font-semibold">
                      <FiClock size={12} /> {time}
                    </div>
                  </a>
                )}
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 3. FORMULAIRE DE CONTACT ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="contact-form" className="py-20 sm:py-28 bg-[#0F172A] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-[130px]" />
          <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-violet-600/20 blur-[130px]" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-amber-500/12 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8">
          <AnimateIn className="text-center mb-14">
            <Eyebrow text={CT.form_eyebrow ?? "Formulaire de contact"} light />
            <h2
              className="font-['Sora',sans-serif] font-extrabold text-white leading-snug text-[clamp(1.6rem,4vw,2.5rem)]"
            >
              {CT.form_title ?? "Parlez-moi de votre"}<br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent">{CT.form_accent ?? "projet en détail."}</span>
            </h2>
            <p className="text-white/55 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
              {CT.form_subtitle ?? "Plus vous me donnez de détails, mieux je pourrai comprendre votre vision et vous proposer une approche adaptée."}
            </p>
          </AnimateIn>

          <AnimateIn delay={2}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-5 z-0">
                <div className="absolute top-0 left-0 w-56 h-56 bg-blue-600/20 rounded-full blur-[65px]" />
                <div className="absolute bottom-0 right-0 w-56 h-56 bg-violet-600/20 rounded-full blur-[65px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-[65px]" />
              </div>
              <form onSubmit={handleFormSubmit} className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 backdrop-blur-sm overflow-hidden shadow-[0_30px_70px_-20px_rgba(37,99,235,0.35)]">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
              {/* Honeypot anti-spam : caché aux humains, rempli par les bots */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleFormChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] w-px h-px opacity-0"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-white text-sm font-semibold mb-3">Votre nom</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Votre nom complet"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:bg-white/15 focus:border-blue-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-semibold mb-3">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="votre@email.com"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:bg-white/15 focus:border-blue-400 transition-all"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-white text-sm font-semibold mb-3">Téléphone (optionnel)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+229 XXXXXXXX"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:bg-white/15 focus:border-blue-400 transition-all"
                />
              </div>

              <div className="mb-5">
                <label className="block text-white text-sm font-semibold mb-3">Sujet de votre demande</label>
                <select
  name="subject"
  value={formData.subject}
  onChange={handleFormChange}
  required
  title="Sujet de votre demande"
  aria-label="Sujet de votre demande"
  className="w-full [color-scheme:dark] bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:bg-white/15 focus:border-blue-400 transition-all"
>
  <option value="">Sélectionner un sujet</option>
  <option value="new-project">Nouveau projet</option>
  <option value="consultation">Consultation/Conseil</option>
  <option value="audit">Audit technique</option>
  <option value="mentoring">Mentoring</option>
  <option value="other">Autre</option>
</select>
              </div>

              <div className="mb-7">
                <label className="block text-white text-sm font-semibold mb-3">Votre message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Décrivez votre projet, vos enjeux, vos objectifs... N'hésitez pas à être détaillé."
                  required
                  rows={6}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:bg-white/15 focus:border-blue-400 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className={`w-full inline-flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-sm transition-all ${
                  formStatus === "success"
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-700/40 hover:-translate-y-0.5"
                }`}
              >
                {formStatus === "loading" ? (
                  <>
                    <FiZap size={16} className="animate-pulse" /> Envoi en cours...
                  </>
                ) : formStatus === "success" ? (
                  <>
                    <FiCheck size={16} /> Message envoyé avec succès !
                  </>
                ) : (
                  <>
                    <FiSend size={16} /> Envoyer le message
                  </>
                )}
              </button>

              {formStatus === "loading" && formSlow && (
                <p className="text-blue-200/90 text-xs mt-4 text-center" role="status">
                  Le serveur se réveille, l'envoi peut prendre quelques secondes de plus. Merci de patienter…
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-red-300 text-xs mt-4 text-center" role="status">
                  L'envoi a échoué. Réessayez, ou écrivez-moi directement par email.
                </p>
              )}

              <p className="text-white/35 text-xs mt-4 text-center">
                Je traite chaque demande avec sérieux. Je vous répondrai dans les 24h.
              </p>
              </form>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 4. POURQUOI ME CONTACTER ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-1/4 w-[26rem] h-[26rem] rounded-full bg-violet-300/25 blur-[130px]" />
          <div className="absolute bottom-0 left-1/5 w-80 h-80 rounded-full bg-blue-300/20 blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-amber-300/15 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <AnimateIn className="text-center mb-14">
            <Eyebrow text={CT.why_eyebrow ?? "Pourquoi me contacter"} />
            <h2
              className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug text-[clamp(1.6rem,4vw,2.5rem)]"
            >
              {CT.why_title ?? "Je ne suis pas un simple"}<br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">{CT.why_accent ?? "prestataire technique."}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {CT.why_subtitle ?? "Voici ce qui se passe quand vous travaillez avec moi:"}
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {whyReachOut.map(({ icon, title, desc }, i) => (
              <AnimateIn key={title} delay={i * 0.5} className="h-full">
                <div className="group h-full bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-7
                  hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 bg-gradient-to-br ${["from-blue-500 to-indigo-600","from-violet-500 to-purple-600","from-amber-500 to-orange-600","from-cyan-500 to-sky-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600"][i % 6]} group-hover:scale-110 transition-transform`}>
                    {icon}
                  </div>
                  <h3 className="font-['Sora',sans-serif] font-extrabold text-slate-800 text-base mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 5. FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-slate-50">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 left-1/5 w-[26rem] h-[26rem] rounded-full bg-blue-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-300/20 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-amber-300/12 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8">
          <AnimateIn className="text-center mb-14">
            <Eyebrow text={CT.faq_eyebrow ?? "Questions fréquentes"} />
            <h2
              className="font-['Sora',sans-serif] font-extrabold text-slate-800 leading-snug text-[clamp(1.6rem,4vw,2.5rem)]"
            >
              {CT.faq_title ?? "Vos questions sur"}<br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">{CT.faq_accent ?? "comment j'opère."}</span>
            </h2>
          </AnimateIn>

          <div className="space-y-3">
            {faqContact.map(({ q, a }, i) => (
              <AnimateIn key={i} delay={i * 0.3}>
                <div className={`rounded-xl border overflow-hidden transition-all ${faqOpen === i ? "bg-white border-blue-200 shadow-md shadow-blue-100" : "bg-white border-slate-200 hover:border-blue-200"}`}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-slate-800 hover:bg-blue-50/50 transition-colors gap-4"
                  >
                    <span>{q}</span>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${faqOpen === i ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rotate-90" : "bg-blue-50 text-[#2563EB]"}`}>
                      <FiChevronRight size={16} />
                    </span>
                  </button>
                  {faqOpen === i && (
                    <div className="px-6 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">{a}</div>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 6. CALENDRIER CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-[#1e3a8a] to-[#2563EB] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[30rem] h-[30rem] rounded-full bg-cyan-400/20 blur-[130px]" />
          <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-violet-500/20 blur-[130px]" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-amber-400/15 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <AnimateIn delay={1}>
            <h2
              className="font-['Sora',sans-serif] font-extrabold text-white leading-tight mb-6 text-[clamp(1.8rem,5vw,3rem)]"
            >
              Pas d'engagement.<br />
              Juste une conversation.
            </h2>
          </AnimateIn>

          <AnimateIn delay={2}>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto">
              Réservez 30 minutes pour discuter de votre projet, sans engagement. Je vous expliquerai mon approche et nous verrons si nous sommes faits pour travailler ensemble.
            </p>
          </AnimateIn>

          <AnimateIn delay={3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-[#2563EB] font-bold px-8 py-4 rounded-xl text-sm
                transition-all shadow-lg shadow-black/20 hover:shadow-black/30 hover:-translate-y-0.5 cursor-pointer">
                <FiCalendar size={16} /> Planifier un appel
              </button>
              <a href="mailto:guellymorelhectoreramanou@gmail.com"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl text-sm transition-all">
                <FiMail size={16} /> Envoyer un email
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden bg-[#1e293b] pt-12 sm:pt-14 pb-6">
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
                  <a key={val} href={href} className="flex items-center gap-2 text-slate-400 text-xs hover:text-white transition-colors">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br ${["from-cyan-400 to-blue-500","from-violet-500 to-purple-600","from-amber-500 to-orange-600"][i]}`}>{icon}</span> {val}
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

    </main>
  );
}