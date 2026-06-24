"use client";

import { useState } from "react";
import { Search, SearchX, SlidersHorizontal } from "lucide-react";
import { MeseriasCard } from "@/components/meseriasi/meserias-card";
import { FiltrePanel } from "@/components/meseriasi/filtre-panel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFiltreMeseriasi, type SortareMeseriasi } from "@/hooks/use-filtre-meseriasi";
import { pluralRo } from "@/lib/utils";
import type { FiltreMeseriasi, Meserias } from "@/types";

const ETICHETE_SORTARE: Record<SortareMeseriasi, string> = {
  relevanta: "Relevanță",
  rating: "Rating (mare → mic)",
  pret_asc: "Preț (mic → mare)",
  pret_desc: "Preț (mare → mic)",
};

export function ExplorareMeseriasi({
  toate,
  initiale,
}: {
  toate: Meserias[];
  initiale: FiltreMeseriasi;
}) {
  const { filtre, sortare, setSortare, actualizeaza, reseteaza, rezultate } = useFiltreMeseriasi(toate, initiale);
  const [cautare, setCautare] = useState(initiale.q ?? "");
  const [filtreMobile, setFiltreMobile] = useState(false);

  function aplicaCautarea(v: string) {
    setCautare(v);
    actualizeaza({ q: v || undefined });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      {/* Sidebar filtre */}
      <aside className={`${filtreMobile ? "block" : "hidden"} lg:block`}>
        <div className="lg:sticky lg:top-20">
          <FiltrePanel filtre={filtre} onChange={actualizeaza} onReset={reseteaza} />
        </div>
      </aside>

      <div>
        {/* Bara cautare + sortare */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={cautare}
              onChange={(e) => aplicaCautarea(e.target.value)}
              placeholder="Caută după nume, specializare sau serviciu..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="sm:hidden" onClick={() => setFiltreMobile((v) => !v)}>
            <SlidersHorizontal className="h-4 w-4" /> Filtre
          </Button>
          <div className="w-full sm:w-56">
            <Select value={sortare} onValueChange={(v) => setSortare(v as SortareMeseriasi)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(Object.keys(ETICHETE_SORTARE) as SortareMeseriasi[]).map((k) => (
                  <SelectItem key={k} value={k}>{ETICHETE_SORTARE[k]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="mb-5 text-sm text-muted-foreground">
          <span className="font-semibold text-secondary">{rezultate.length}</span>{" "}
          {pluralRo(rezultate.length, "meseriaș găsit", "meseriași găsiți")}
        </p>

        {rezultate.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {rezultate.map((m) => (
              <MeseriasCard key={m.id} meserias={m} />
            ))}
          </div>
        ) : (
          <div className="grid place-items-center rounded-2xl border border-dashed bg-white py-20 text-center">
            <SearchX className="h-10 w-10 text-slate-300" />
            <p className="mt-4 font-semibold text-secondary">Niciun meseriaș găsit</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Încearcă să ajustezi filtrele sau să cauți după alt termen.
            </p>
            <Button variant="outline" className="mt-5" onClick={() => { reseteaza(); setCautare(""); }}>
              Resetează filtrele
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
