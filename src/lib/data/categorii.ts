import type { Categorie } from "@/types";

/**
 * Categoriile de servicii disponibile pe platforma.
 * `icon` corespunde unui nume de icon din lucide-react.
 */
export const CATEGORII: Categorie[] = [
  { slug: "instalator", nume: "Instalator", descriere: "Instalații sanitare, termice și depanări de urgență.", icon: "Wrench", numarMeseriasi: 86, popular: true },
  { slug: "electrician", nume: "Electrician", descriere: "Instalații electrice, tablouri, prize și avarii.", icon: "Zap", numarMeseriasi: 74, popular: true },
  { slug: "zugrav", nume: "Zugrav", descriere: "Zugrăveli, glet, vopsitorii și finisaje interioare.", icon: "PaintRoller", numarMeseriasi: 63, popular: true },
  { slug: "gresie-faianta", nume: "Gresie și faianță", descriere: "Montaj gresie, faianță și plăci ceramice.", icon: "Grid3x3", numarMeseriasi: 51, popular: true },
  { slug: "montaj-mobila", nume: "Montaj mobilă", descriere: "Asamblare și montaj mobilier de orice fel.", icon: "Hammer", numarMeseriasi: 58, popular: true },
  { slug: "montaj-chiuveta", nume: "Montaj chiuvetă", descriere: "Montaj chiuvete, baterii și obiecte sanitare.", icon: "ShowerHead", numarMeseriasi: 34 },
  { slug: "reparatii-electrocasnice", nume: "Reparații electrocasnice", descriere: "Mașini de spălat, frigidere, cuptoare și altele.", icon: "WashingMachine", numarMeseriasi: 42 },
  { slug: "aer-conditionat", nume: "Aer condiționat", descriere: "Montaj, igienizare și reparații AC.", icon: "AirVent", numarMeseriasi: 39, popular: true },
  { slug: "tamplar", nume: "Tâmplar", descriere: "Tâmplărie lemn și PVC, uși, ferestre, mobilier.", icon: "Ruler", numarMeseriasi: 45 },
  { slug: "acoperisuri", nume: "Acoperișuri", descriere: "Montaj, reparații și hidroizolații acoperișuri.", icon: "Home", numarMeseriasi: 28, popular: true },
  { slug: "curatenie", nume: "Curățenie", descriere: "Curățenie generală, după constructor și periodică.", icon: "Sparkles", numarMeseriasi: 67, popular: true },
  { slug: "gradinarit", nume: "Grădinărit", descriere: "Întreținere spații verzi, gazon, toaletări.", icon: "Trees", numarMeseriasi: 31, popular: true },
  { slug: "amenajari-interioare", nume: "Amenajări interioare", descriere: "Renovări complete și amenajări la cheie.", icon: "LayoutPanelTop", numarMeseriasi: 49 },
];

export const CATEGORII_BY_SLUG: Record<string, Categorie> = Object.fromEntries(
  CATEGORII.map((c) => [c.slug, c]),
);

export function getCategorie(slug: string): Categorie | undefined {
  return CATEGORII_BY_SLUG[slug];
}

/** Categoriile populare afișate pe pagina Home / Categorii. */
export const CATEGORII_POPULARE = CATEGORII.filter((c) => c.popular);
