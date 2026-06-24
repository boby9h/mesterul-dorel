"use client";

import { useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONVERSATII } from "@/lib/data";
import type { Mesaj } from "@/types";

export function ChatMock() {
  const [activId, setActivId] = useState(CONVERSATII[0].id);
  const [mesajeExtra, setMesajeExtra] = useState<Record<string, Mesaj[]>>({});
  const [text, setText] = useState("");

  const activa = CONVERSATII.find((c) => c.id === activId)!;
  const mesaje = [...activa.mesaje, ...(mesajeExtra[activId] ?? [])];

  function trimite() {
    if (!text.trim()) return;
    const m: Mesaj = {
      id: `tmp-${Date.now()}`,
      conversatieId: activId,
      expeditor: "client",
      text: text.trim(),
      ora: new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
    };
    setMesajeExtra((prev) => ({ ...prev, [activId]: [...(prev[activId] ?? []), m] }));
    setText("");
  }

  return (
    <div className="grid h-[560px] grid-cols-1 overflow-hidden rounded-2xl border bg-white shadow-card sm:grid-cols-[280px_1fr]">
      {/* Lista conversatii */}
      <div className="hidden border-r sm:block">
        <div className="border-b p-4">
          <h3 className="font-semibold text-secondary">Mesaje</h3>
        </div>
        <div className="divide-y overflow-y-auto">
          {CONVERSATII.map((c) => (
            <button
              key={c.id}
              onClick={() => setActivId(c.id)}
              className={cn("flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted", activId === c.id && "bg-accent/60")}
            >
              <div className="relative">
                <Image src={c.participantAvatar} alt={c.participantNume} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                {c.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-semibold text-secondary">{c.participantNume}</p>
                  <span className="text-[11px] text-muted-foreground">{c.ora}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{c.ultimMesaj}</p>
              </div>
              {c.necitite > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">{c.necitite}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Fir conversatie */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3 border-b p-4">
          <Image src={activa.participantAvatar} alt={activa.participantNume} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-secondary">{activa.participantNume}</p>
            <p className="text-xs text-muted-foreground">{activa.online ? "Online acum" : "Activ recent"}</p>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
          {mesaje.map((m) => (
            <div key={m.id} className={cn("flex", m.expeditor === "client" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[78%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                  m.expeditor === "client" ? "rounded-br-sm bg-primary text-white" : "rounded-bl-sm bg-white text-slate-700",
                )}
              >
                <p>{m.text}</p>
                <p className={cn("mt-1 text-[10px]", m.expeditor === "client" ? "text-white/70" : "text-muted-foreground")}>{m.ora}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t p-3">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && trimite()}
            placeholder="Scrie un mesaj..."
          />
          <Button size="icon" onClick={trimite} aria-label="Trimite">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
