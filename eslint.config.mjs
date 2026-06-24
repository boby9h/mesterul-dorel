import next from "eslint-config-next/core-web-vitals";

/**
 * Flat ESLint config (Next.js 16).
 *
 * eslint-config-next 16 include plugin-ul react-hooks v6 (reguli React Compiler)
 * care nu existau in Next 15. Le pastram dezactivate pentru a mentine acelasi
 * comportament de lint ca in configuratia initiala, fara a modifica codul aplicatiei.
 */
const eslintConfig = [
  ...next,
  { ignores: [".next/**", "node_modules/**"] },
  {
    rules: {
      "react-hooks/static-components": "off",
      "react-hooks/purity": "off",
      "react-hooks/incompatible-library": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default eslintConfig;
