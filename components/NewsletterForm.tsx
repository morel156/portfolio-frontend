"use client";

import { useState, type FormEvent } from "react";
import { FiSend, FiCheck, FiLoader } from "react-icons/fi";
import { apiBaseUrl } from "@/lib/backend";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Formulaire d'inscription à la newsletter, branché sur POST /api/newsletter.
 * - variant="footer" : version compacte pour les pieds de page (fond sombre).
 * - variant="hero"   : version large (bouton blanc) pour la section blog.
 */
export default function NewsletterForm({
  variant = "footer",
  placeholder = "Votre email...",
}: {
  variant?: "footer" | "hero";
  placeholder?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch(`${apiBaseUrl()}/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Merci ! Vous êtes bien inscrit.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(
          data.error || data.errors?.email?.[0] || "Adresse email invalide."
        );
      }
    } catch {
      setStatus("error");
      setMessage("Connexion impossible. Réessayez plus tard.");
    }
  }

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={handleSubmit}
      className={isHero ? "max-w-lg mx-auto" : "mb-5"}
      noValidate
    >
      {/* Honeypot anti-bot (invisible) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        onChange={() => {}}
      />

      <div className={isHero ? "flex flex-col sm:flex-row gap-3" : "flex gap-2"}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isHero ? "votre@email.com" : placeholder}
          disabled={status === "loading"}
          className={
            isHero
              ? "flex-1 bg-white/15 border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/50 outline-none focus:bg-white/20 focus:border-white/40 transition-all text-sm disabled:opacity-60"
              : "flex-1 min-w-0 bg-slate-700 border-none rounded-lg px-3 py-2.5 text-white placeholder-slate-500 text-xs outline-none disabled:opacity-60"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          title="S'abonner à la newsletter"
          aria-label="S'abonner à la newsletter"
          className={
            isHero
              ? "inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-[#2563EB] font-bold px-6 py-4 rounded-lg transition-all whitespace-nowrap text-sm disabled:opacity-70"
              : "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-md shadow-indigo-900/40 text-white px-3 py-2.5 rounded-lg transition-colors flex-shrink-0 disabled:opacity-70"
          }
        >
          {status === "loading" ? (
            <FiLoader className="animate-spin" size={isHero ? 16 : 14} />
          ) : status === "success" ? (
            <FiCheck size={isHero ? 16 : 14} />
          ) : (
            <FiSend size={isHero ? 16 : 14} />
          )}
          {isHero && <span>{status === "success" ? "Inscrit !" : "S'abonner"}</span>}
        </button>
      </div>

      {message && (
        <p
          className={`mt-2 text-xs ${
            status === "success"
              ? isHero
                ? "text-emerald-200"
                : "text-emerald-400"
              : isHero
              ? "text-red-200"
              : "text-red-400"
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
