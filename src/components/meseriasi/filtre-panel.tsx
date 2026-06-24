"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RatingStars } from "@/components/shared/rating-stars";
import { ORASE } from "@/lib/constants";
import { CATEGORII } from "@/lib/data";
import { formatRON } from "@/lib/utils";
import type { FiltreMeseriasi } from "@/types";

const TOATE = "__toate__";

export function FiltrePanel({
  filtre,
  onChange,
  onReset,
}: {
  filtre: FiltreMeseriasi;
  onChange: (patch: Partial<FiltreMeseriasi>) => void;
  onReset: () => void;
}) {
  const pretMax = filtre.pretMax ?? 300;

  return (
    <div className="space-y-6 rounded-2xl border bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold text-secondary">
          <SlidersHorizontal className="h-4 w-4 text-primary" /> Filtre
        </h2>
        <button onClick={onReset} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary">
          <X className="h-3.5 w-3.5" /> Resetează
        </button>
      </div>

      <div className="space-y-2">
        <Label>Oraș</Label>
        <Select value={filtre.oras ?? TOATE} onValueChange={(v) => onChange({ oras: v === TOATE ? undefined : v })}>
          <SelectTrigger><SelectValue placeholder="Toate orașele" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={TOATE}>Toate orașele</SelectItem>
            {ORASE.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Categorie</Label>
        <Select value={filtre.categorie ?? TOATE} onValueChange={(v) => onChange({ categorie: v === TOATE ? undefined : v })}>
          <SelectTrigger><SelectValue placeholder="Toate categoriile" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={TOATE}>Toate categoriile</SelectItem>
            {CATEGORII.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.nume}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Preț maxim de pornire</Label>
          <span className="text-sm font-semibold text-secondary">{formatRON(pretMax)}</span>
        </div>
        <Slider
          value={[pretMax]}
          min={30}
          max={300}
          step={10}
          onValueChange={([v]) => onChange({ pretMax: v })}
        />
      </div>

      <div className="space-y-2">
        <Label>Rating minim</Label>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5].map((r) => {
            const active = (filtre.ratingMin ?? 0) === r;
            return (
              <button
                key={r}
                onClick={() => onChange({ ratingMin: r === 0 ? undefined : r })}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm transition-colors ${
                  active ? "border-primary bg-accent text-secondary" : "hover:bg-muted"
                }`}
              >
                {r === 0 ? "Oricare" : (<><RatingStars value={r} size={13} /> {r}+</>)}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5">
        <Checkbox
          checked={!!filtre.disponibil}
          onCheckedChange={(v) => onChange({ disponibil: v === true ? true : undefined })}
        />
        <span className="text-sm text-slate-700">Doar disponibili acum</span>
      </label>
    </div>
  );
}
