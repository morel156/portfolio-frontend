import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react/style-prop-object": "off",
      "@next/next/no-style-tag-with-link-tag": "off",
      "@next/next/no-html-link-for-pages": "off",
      "react/no-danger": "off",
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
      // Contenu en français : apostrophes/guillemets typographiques partout — règle stylistique non pertinente.
      "react/no-unescaped-entities": "off",
      // <img> volontaire pour les PNG détourés (masques CSS) — next/image non adapté ici.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
