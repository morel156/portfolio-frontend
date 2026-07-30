import { Fragment } from "react";

/**
 * Rend un texte multi-lignes (séparé par "\n") avec des retours à la ligne
 * appliqués UNIQUEMENT à partir de sm (≥640px).
 *
 * Sur mobile, les retours forcés — pensés pour la largeur desktop — coupaient
 * les titres au mauvais endroit (mots orphelins, 4 lignes déséquilibrées).
 * Ici le <br> est masqué sur mobile et remplacé par une espace : le texte
 * s'enroule naturellement, et `text-wrap: balance` (globals.css) équilibre
 * les lignes.
 */
export default function Lines({ text }: { text: string }) {
  const lines = String(text ?? "").split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && (
            <>
              <br className="hidden sm:block" />{" "}
            </>
          )}
        </Fragment>
      ))}
    </>
  );
}
