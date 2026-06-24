/**
 * Service layer pentru meseriasi, categorii, recenzii si lucrari.
 *
 * In aceasta versiune MVP datele provin din fisiere mock (`src/lib/data`).
 * Functiile sunt `async` intentionat, astfel incat trecerea ulterioara la
 * PostgreSQL + Prisma (sau Supabase) sa nu necesite schimbari in componente —
 * doar implementarea de aici.
 */
import type {
  Categorie,
  FiltreMeseriasi,
  Lucrare,
  Meserias,
  MeseriasCuRecenzii,
  Recenzie,
} from "@/types";
import {
  CATEGORII,
  getCategorie,
  LUCRARI,
  MESERIASI,
  getMeserias,
  recenziiPentru,
} from "@/lib/data";

export async function listeazaCategorii(): Promise<Categorie[]> {
  return CATEGORII;
}

export async function getCategorieBySlug(slug: string): Promise<Categorie | undefined> {
  return getCategorie(slug);
}

export async function listeazaMeseriasi(filtre: FiltreMeseriasi = {}): Promise<Meserias[]> {
  return filtreazaMeseriasi(MESERIASI, filtre);
}

/** Logica de filtrare pura, reutilizabila si pe client. */
export function filtreazaMeseriasi(lista: Meserias[], filtre: FiltreMeseriasi): Meserias[] {
  const q = filtre.q?.trim().toLowerCase();
  return lista.filter((m) => {
    if (q) {
      const haystack = [m.nume, m.descriere, ...m.specializari, ...m.categorieSlugs]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filtre.oras && m.oras !== filtre.oras) return false;
    if (filtre.categorie && !m.categorieSlugs.includes(filtre.categorie)) return false;
    if (filtre.pretMax && m.pretEstimativDeLa > filtre.pretMax) return false;
    if (filtre.ratingMin && m.rating < filtre.ratingMin) return false;
    if (filtre.disponibil && m.disponibilitate !== "disponibil") return false;
    return true;
  });
}

export async function getMeseriasBySlug(slug: string): Promise<MeseriasCuRecenzii | undefined> {
  const m = getMeserias(slug);
  if (!m) return undefined;
  return { ...m, recenzii: recenziiPentru(m.id) };
}

export async function meseriasiRecomandati(limit = 6): Promise<Meserias[]> {
  return [...MESERIASI]
    .sort((a, b) => b.rating - a.rating || b.numarRecenzii - a.numarRecenzii)
    .slice(0, limit);
}

export async function meseriasiDinCategorie(categorieSlug: string, limit?: number): Promise<Meserias[]> {
  const rezultat = MESERIASI.filter((m) => m.categorieSlugs.includes(categorieSlug));
  return limit ? rezultat.slice(0, limit) : rezultat;
}

export async function recenziiRecente(limit = 6): Promise<Recenzie[]> {
  const { RECENZII } = await import("@/lib/data");
  return [...RECENZII]
    .filter((r) => r.rating === 5)
    .sort((a, b) => +new Date(b.data) - +new Date(a.data))
    .slice(0, limit);
}

export async function listeazaLucrari(): Promise<Lucrare[]> {
  return LUCRARI;
}
