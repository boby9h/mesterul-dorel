"use client";

import { useMemo, useState } from "react";
import type { FiltreMeseriasi, Meserias } from "@/types";
import { filtreazaMeseriasi } from "@/services/meseriasi-service";

export type SortareMeseriasi = "relevanta" | "rating" | "pret_asc" | "pret_desc";

const SORTERS: Record<SortareMeseriasi, (a: Meserias, b: Meserias) => number> = {
  relevanta: (a, b) => b.rating - a.rating || b.numarRecenzii - a.numarRecenzii,
  rating: (a, b) => b.rating - a.rating,
  pret_asc: (a, b) => a.pretEstimativDeLa - b.pretEstimativDeLa,
  pret_desc: (a, b) => b.pretEstimativDeLa - a.pretEstimativDeLa,
};

/** Gestioneaza starea filtrelor + sortarii pentru pagina de listare. */
export function useFiltreMeseriasi(toate: Meserias[], initiale: FiltreMeseriasi = {}) {
  const [filtre, setFiltre] = useState<FiltreMeseriasi>(initiale);
  const [sortare, setSortare] = useState<SortareMeseriasi>("relevanta");

  const rezultate = useMemo(() => {
    return filtreazaMeseriasi(toate, filtre).sort(SORTERS[sortare]);
  }, [toate, filtre, sortare]);

  function actualizeaza(patch: Partial<FiltreMeseriasi>) {
    setFiltre((prev) => ({ ...prev, ...patch }));
  }

  function reseteaza() {
    setFiltre({});
    setSortare("relevanta");
  }

  return { filtre, sortare, setSortare, actualizeaza, reseteaza, rezultate };
}
