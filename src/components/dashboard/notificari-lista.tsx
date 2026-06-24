"use client";

import { useState } from "react";
import { Bell, FileText, MessageSquare, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOTIFICARI } from "@/lib/data";
import type { Notificare, TipNotificare } from "@/types";

const ICONS: Record<TipNotificare, typeof Bell> = {
  cerere_noua: FileText,
  oferta_noua: Sparkles,
  mesaj_nou: MessageSquare,
  recenzie_noua: Star,
};

export function NotificariLista() {
  const [items, setItems] = useState<Notificare[]>(NOTIFICARI);
  const necitite = items.filter((n) => !n.citita).length;

  function citesteTot() {
    setItems((prev) => prev.map((n) => ({ ...n, citita: true })));
  }

  return (
    <div className="rounded-2xl border bg-white shadow-card">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="flex items-center gap-2 font-semibold text-secondary">
          <Bell className="h-4 w-4 text-primary" /> Notificări
          {necitite > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">{necitite}</span>
          )}
        </h3>
        <button onClick={citesteTot} className="text-xs font-medium text-muted-foreground hover:text-primary">
          Marchează toate ca citite
        </button>
      </div>
      <ul className="divide-y">
        {items.map((n) => {
          const Icon = ICONS[n.tip];
          return (
            <li
              key={n.id}
              className={cn("flex gap-3 p-4 transition-colors", !n.citita && "bg-accent/40")}
              onClick={() => setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, citita: true } : x)))}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-secondary">{n.titlu}</p>
                <p className="text-sm text-muted-foreground">{n.descriere}</p>
                <p className="mt-1 text-xs text-slate-400">{n.ora}</p>
              </div>
              {!n.citita && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
