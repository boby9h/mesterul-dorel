"use client";

import Image from "next/image";
import { CalendarDays, CircleDollarSign, Inbox, Send, Star, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatCard } from "@/components/dashboard/stat-card";
import { NotificariLista } from "@/components/dashboard/notificari-lista";
import { RatingStars } from "@/components/shared/rating-stars";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { LUCRARI, MESERIASI } from "@/lib/data";
import { formatRON, formatData, timpRelativ } from "@/lib/utils";

const EU = MESERIASI[0]; // meseriasul demo conectat

const INCASARI = [
  { luna: "Ianuarie", suma: 4200 },
  { luna: "Februarie", suma: 5100 },
  { luna: "Martie", suma: 6850 },
];

const OFERTE_TRIMISE = [
  { lucrare: "Montaj baterie și sifon", pret: 200, status: "în așteptare", data: 1 },
  { lucrare: "Reparație țeavă baie", pret: 350, status: "acceptată", data: 3 },
  { lucrare: "Montaj boiler electric", pret: 480, status: "respinsă", data: 6 },
];

const ZILE = ["L", "Ma", "Mi", "J", "V", "S", "D"];
const PROGRAM: Record<number, string> = { 2: "Montaj baterie · 10:00", 4: "Reparație centrală · 14:00", 9: "Renovare baie · toată ziua", 16: "Montaj AC · 09:00", 23: "Verificare instalație · 11:00" };

export function MeseriasDashboard() {
  const cereriNoi = LUCRARI.filter((l) => l.status === "deschisa" && EU.categorieSlugs.includes(l.categorieSlug)).slice(0, 5);

  return (
    <div className="container-page py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src={EU.avatar} alt={EU.nume} width={52} height={52} className="h-[52px] w-[52px] rounded-xl object-cover" />
          <div>
            <p className="text-sm font-medium text-primary">Cont meseriaș</p>
            <h1 className="text-2xl font-bold text-secondary">{EU.nume}</h1>
          </div>
        </div>
        <AvailabilityBadge status={EU.disponibilitate} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Inbox} label="Cereri noi" value={String(cereriNoi.length)} hint="în zona ta" />
        <StatCard icon={Send} label="Oferte trimise" value={String(OFERTE_TRIMISE.length)} />
        <StatCard icon={CircleDollarSign} label="Încasări luna asta" value={formatRON(6850)} hint="+34% vs. luna trecută" />
        <StatCard icon={Star} label="Rating" value={EU.rating.toFixed(1)} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <Tabs defaultValue="cereri">
          <TabsList className="flex w-full flex-wrap">
            <TabsTrigger value="cereri">Cereri noi</TabsTrigger>
            <TabsTrigger value="oferte">Oferte trimise</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="incasari">Încasări</TabsTrigger>
            <TabsTrigger value="profil">Profil</TabsTrigger>
          </TabsList>

          <TabsContent value="cereri" className="space-y-3">
            {cereriNoi.map((l) => (
              <Card key={l.id}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-secondary">{l.titlu}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {l.oras} · buget {formatRON(l.bugetDeLa)}–{formatRON(l.bugetPanaLa)} · {timpRelativ(l.data)}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="sm">Detalii</Button>
                    <Button size="sm">Trimite ofertă</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="oferte" className="space-y-3">
            {OFERTE_TRIMISE.map((o, i) => (
              <Card key={i}>
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="font-semibold text-secondary">{o.lucrare}</p>
                    <p className="text-sm text-muted-foreground">Ofertă trimisă acum {o.data} zile</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-secondary">{formatRON(o.pret)}</span>
                    <Badge variant={o.status === "acceptată" ? "success" : o.status === "respinsă" ? "muted" : "default"}>{o.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold text-secondary"><CalendarDays className="h-4 w-4 text-primary" /> Martie 2026</h3>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                  {ZILE.map((z) => <div key={z} className="py-1 font-semibold text-muted-foreground">{z}</div>)}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const zi = i + 1;
                    const ocupat = PROGRAM[zi];
                    return (
                      <div key={zi} className={`relative aspect-square rounded-lg border p-1 ${ocupat ? "border-primary/40 bg-accent" : "bg-white"}`}>
                        <span className={`text-[11px] ${ocupat ? "font-semibold text-secondary" : "text-muted-foreground"}`}>{zi}</span>
                        {ocupat && <span className="absolute bottom-1 left-1 right-1 truncate text-[9px] leading-tight text-primary">{ocupat.split(" · ")[0]}</span>}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 space-y-2 border-t pt-4">
                  <p className="text-sm font-semibold text-secondary">Programări apropiate</p>
                  {Object.entries(PROGRAM).slice(0, 3).map(([zi, t]) => (
                    <div key={zi} className="flex items-center gap-3 text-sm">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-xs font-bold text-white">{zi}</span>
                      <span className="text-slate-700">{t}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incasari">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-secondary">Încasări 2026</h3>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600"><TrendingUp className="h-4 w-4" /> +34%</span>
                </div>
                <p className="mt-1 text-3xl font-bold text-secondary">{formatRON(16150)}</p>
                <p className="text-sm text-muted-foreground">Total pe ultimele 3 luni</p>
                <div className="mt-6 flex items-end gap-4">
                  {INCASARI.map((m) => (
                    <div key={m.luna} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex h-40 w-full items-end">
                        <div className="w-full rounded-t-lg bg-primary/90 transition-all" style={{ height: `${(m.suma / 7000) * 100}%` }} />
                      </div>
                      <span className="text-xs font-medium text-secondary">{formatRON(m.suma)}</span>
                      <span className="text-xs text-muted-foreground">{m.luna}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                  💡 Plățile vor fi procesate prin Stripe la integrarea modulului de plăți.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profil">
            <Card>
              <CardContent className="space-y-4 p-6">
                <h3 className="font-semibold text-secondary">Editează profilul</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5"><Label>Nume complet</Label><Input defaultValue={EU.nume} /></div>
                  <div className="space-y-1.5"><Label>Oraș</Label><Input defaultValue={EU.oras} /></div>
                  <div className="space-y-1.5"><Label>Preț de pornire (RON)</Label><Input type="number" defaultValue={EU.pretEstimativDeLa} /></div>
                  <div className="space-y-1.5"><Label>Telefon</Label><Input defaultValue={EU.telefon} /></div>
                </div>
                <div className="space-y-1.5"><Label>Descriere</Label><Textarea rows={4} defaultValue={EU.descriere} /></div>
                <div className="flex justify-end"><Button>Salvează modificările</Button></div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-secondary">Performanța ta</p>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Rating</span><span className="inline-flex items-center gap-1 font-semibold text-secondary"><RatingStars value={EU.rating} size={14} /> {EU.rating.toFixed(1)}</span></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Lucrări finalizate</span><span className="font-semibold text-secondary">{EU.lucrariFinalizate}</span></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Membru din</span><span className="font-semibold text-secondary">{formatData(new Date(Date.now() - EU.experientaAni * 365 * 864e5).toISOString())}</span></div>
              </div>
            </CardContent>
          </Card>
          <NotificariLista />
        </div>
      </div>
    </div>
  );
}
