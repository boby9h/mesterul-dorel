import type { Recenzie } from "@/types";
import { MESERIASI } from "./meseriasi";

const AUTORI = [
  "Andreea M.", "George P.", "Mihaela D.", "Cristina V.", "Radu I.",
  "Laura S.", "Ovidiu T.", "Diana C.", "Bogdan R.", "Simona L.",
  "Alexandru N.", "Roxana B.", "Florin A.", "Gabriela E.", "Vlad H.",
];

const LUCRARI_REVIEW = [
  "Montaj instalație baie", "Reparație urgentă", "Renovare apartament", "Montaj mobilier bucătărie",
  "Zugrăvit living", "Montaj aer condiționat", "Reparație mașină de spălat", "Curățenie după constructor",
  "Montaj gresie hol", "Înlocuire tablou electric", "Reparație acoperiș", "Întreținere grădină",
];

const TEXTE_5 = [
  "Profesionist desăvârșit, a venit la timp și a lucrat impecabil. Recomand cu încredere!",
  "Foarte mulțumit de rezultat. Comunicare excelentă și preț corect.",
  "Lucrare de calitate, curat și ordonat. Cu siguranță voi apela din nou.",
  "Promptitudine și seriozitate. A explicat tot ce a făcut și a oferit garanție.",
  "Cel mai bun meseriaș cu care am lucrat. Atent la detalii și respectuos.",
];
const TEXTE_4 = [
  "Treabă bună în general, a întârziat puțin dar a rezolvat tot.",
  "Mulțumit de rezultat, raport calitate-preț foarte ok.",
  "Lucrare corectă, comunicare bună. Recomand.",
  "S-a descurcat bine, mici ajustări pe parcurs dar finalul a fost ok.",
];
const TEXTE_3 = [
  "Lucrarea e ok, dar a durat mai mult decât estimat.",
  "Rezultat acceptabil pentru prețul plătit.",
];

function pickText(rating: number, i: number): string {
  if (rating >= 5) return TEXTE_5[i % TEXTE_5.length];
  if (rating === 4) return TEXTE_4[i % TEXTE_4.length];
  return TEXTE_3[i % TEXTE_3.length];
}

/** Genereaza 10 recenzii deterministe pentru fiecare meserias. */
function genereaza(): Recenzie[] {
  const out: Recenzie[] = [];
  MESERIASI.forEach((m, mi) => {
    for (let i = 0; i < 10; i++) {
      // distributie spre 5 stele, ocazional 4 sau 3
      const r = i % 7 === 0 ? 4 : i % 11 === 0 ? 3 : 5;
      const zile = 3 + i * 9 + mi * 2;
      out.push({
        id: `r-${m.id}-${i}`,
        meseriasId: m.id,
        autor: AUTORI[(mi + i) % AUTORI.length],
        avatar: `https://i.pravatar.cc/100?img=${((mi * 3 + i * 5) % 70) + 1}`,
        rating: r,
        text: pickText(r, i + mi),
        data: new Date(Date.now() - zile * 24 * 60 * 60 * 1000).toISOString(),
        lucrare: LUCRARI_REVIEW[(mi + i) % LUCRARI_REVIEW.length],
      });
    }
  });
  return out;
}

export const RECENZII: Recenzie[] = genereaza();

export function recenziiPentru(meseriasId: string): Recenzie[] {
  return RECENZII.filter((r) => r.meseriasId === meseriasId);
}
