"use client";

import Link from "next/link";
import Image from "next/image";
import { Briefcase, Inbox, MessageSquare, Plus, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChatMock } from "@/components/dashboard/chat-mock";
import { NotificariLista } from "@/components/dashboard/notificari-lista";
import { RatingStars } from "@/components/shared/rating-stars";
import { LUCRARI, OFERTE } from "@/lib/data";
import { formatRON, formatData } from "@/lib/utils";
import type { StatusLucrare } from "@/types";

const STATUS_LABEL: Record<StatusLucrare, { label: string; variant: "default" | "success" | "muted" }> = {
  deschisa: { label: "Deschisă", variant: "default" },
  in_desfasurare: { label: "În desfășurare", variant: "default" },
  finalizata: { label: "Finalizată", variant: "success" },
  anulata: { label: "Anulată", variant: "muted" },
};

export function ClientDashboard() {
  const active = LUCRARI.filter((l) => l.status === "deschisa" || l.status === "in_desfasurare").slice(0, 5);

  return (
    <div className="container-page py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Cont client</p>
          <h1 className="text-2xl font-bold text-secondary">Bună, Andrei 👋</h1>
        </div>
        <Button asChild><Link href="/publica-lucrare"><Plus className="h-4 w-4" /> Publică o lucrare</Link></Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Briefcase} label="Lucrări active" value={String(active.length)} />
        <StatCard icon={Inbox} label="Oferte primite" value={String(OFERTE.length)} hint="2 noi azi" />
        <StatCard icon={MessageSquare} label="Mesaje necitite" value="2" />
        <StatCard icon={Star} label="Recenzii lăsate" value="8" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <Tabs defaultValue="lucrari">
          <TabsList className="flex w-full flex-wrap">
            <TabsTrigger value="lucrari">Lucrări active</TabsTrigger>
            <TabsTrigger value="oferte">Oferte primite</TabsTrigger>
            <TabsTrigger value="mesaje">Mesaje</TabsTrigger>
            <TabsTrigger value="recenzii">Recenzii</TabsTrigger>
          </TabsList>

          <TabsContent value="lucrari" className="space-y-3">
            {active.map((l) => {
              const st = STATUS_LABEL[l.status];
              return (
                <Card key={l.id}>
                  <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-secondary">{l.titlu}</h3>
                        <Badge variant={st.variant}>{st.label}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {l.oras} · {formatRON(l.bugetDeLa)}–{formatRON(l.bugetPanaLa)} · publicată {formatData(l.data)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-sm font-medium text-primary">{l.numarOferte} oferte</span>
                      <Button variant="outline" size="sm">Vezi oferte</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="oferte" className="space-y-3">
            {OFERTE.map((o) => (
              <Card key={o.id}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={o.meseriasAvatar} alt={o.meseriasNume} width={48} height={48} className="h-12 w-12 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <p className="font-semibold text-secondary">{o.meseriasNume}</p>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <RatingStars value={o.rating} size={13} /> {o.rating.toFixed(1)} · pentru „{o.lucrareTitlu}”
                      </p>
                      <p className="mt-1 line-clamp-1 text-sm text-slate-600">{o.mesaj}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-lg font-bold text-secondary">{formatRON(o.pret)}</span>
                    {o.status === "acceptata"
                      ? <Badge variant="success">Acceptată</Badge>
                      : <Button size="sm">Acceptă</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="mesaje">
            <ChatMock />
          </TabsContent>

          <TabsContent value="recenzii" className="space-y-3">
            {[{ n: "Dorel Ionescu", t: "Lucrare impecabilă, recomand!", r: 5 }, { n: "Elena Radu", t: "Curățenie excelentă, totul lună.", r: 5 }].map((rev, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-secondary">{rev.n}</p>
                    <RatingStars value={rev.r} />
                  </div>
                  <p className="mt-2 text-sm text-slate-600">&ldquo;{rev.t}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="space-y-6">
          <NotificariLista />
        </div>
      </div>
    </div>
  );
}
