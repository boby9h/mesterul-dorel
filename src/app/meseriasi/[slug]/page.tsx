import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, BadgeCheck, Briefcase, Clock, MapPin, Phone, Send, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingStars } from "@/components/shared/rating-stars";
import { ReviewCard } from "@/components/shared/review-card";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { SolicitaOfertaDialog } from "@/components/meseriasi/solicita-oferta-dialog";
import { getMeseriasBySlug } from "@/services/meseriasi-service";
import { getCategorie, MESERIASI } from "@/lib/data";
import { formatRON, pluralRo } from "@/lib/utils";

export async function generateStaticParams() {
  return MESERIASI.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = await getMeseriasBySlug(slug);
  if (!m) return { title: "Meseriaș negăsit" };
  return {
    title: `${m.nume} — ${m.specializari[0]} în ${m.oras}`,
    description: m.descriere,
    alternates: { canonical: `/meseriasi/${m.slug}` },
    openGraph: { title: `${m.nume} · Mesterul Dorel`, description: m.descriere, images: [m.avatar] },
  };
}

function Stat({ icon: Icon, value, label }: { icon: typeof Award; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-semibold leading-tight text-secondary">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default async function ProfilMeseriasPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = await getMeseriasBySlug(slug);
  if (!m) notFound();

  const distributie = [5, 4, 3, 2, 1].map((stele) => ({
    stele,
    n: m.recenzii.filter((r) => r.rating === stele).length,
  }));

  return (
    <div className="bg-muted/30 pb-16">
      {/* Cover */}
      <div className="relative h-40 w-full overflow-hidden bg-secondary sm:h-56">
        <Image src={m.acoperire} alt="" fill className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-secondary/30" />
      </div>

      <div className="container-page -mt-16 sm:-mt-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Coloana principala */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                  <Image
                    src={m.avatar}
                    alt={m.nume}
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-2xl object-cover ring-4 ring-white"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold text-secondary">{m.nume}</h1>
                      {m.verificat && (
                        <Badge className="gap-1"><BadgeCheck className="h-3.5 w-3.5" /> Verificat</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-muted-foreground">{m.specializari.join(" · ")}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <RatingStars value={m.rating} size={16} />
                        <span className="font-semibold text-secondary">{m.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({m.numarRecenzii} recenzii)</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" /> {m.oras}, {m.judet}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {m.raspunsRapid && <Badge variant="default" className="gap-1"><Zap className="h-3 w-3" /> Răspuns rapid</Badge>}
                  <AvailabilityBadge status={m.disponibilitate} />
                  {m.categorieSlugs.map((c) => {
                    const cat = getCategorie(c);
                    return cat ? (
                      <Link key={c} href={`/meseriasi?categorie=${c}`}>
                        <Badge variant="muted" className="hover:bg-accent hover:text-secondary">{cat.nume}</Badge>
                      </Link>
                    ) : null;
                  })}
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <Stat icon={Award} value={`${m.experientaAni} ani`} label="Experiență" />
                  <Stat icon={Briefcase} value={`${m.lucrariFinalizate}`} label="Lucrări finalizate" />
                  <Stat icon={Clock} value={m.raspunsRapid ? "< 2 ore" : "în aceeași zi"} label="Timp de răspuns" />
                </div>
              </CardContent>
            </Card>

            {/* Tabs: descriere / galerie / recenzii */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="despre">
                  <TabsList>
                    <TabsTrigger value="despre">Despre</TabsTrigger>
                    <TabsTrigger value="galerie">Lucrări ({m.galerie.length})</TabsTrigger>
                    <TabsTrigger value="recenzii">Recenzii ({m.recenzii.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="despre">
                    <h2 className="mb-2 font-semibold text-secondary">Descriere</h2>
                    <p className="leading-relaxed text-slate-700">{m.descriere}</p>
                    <h3 className="mb-2 mt-6 font-semibold text-secondary">Specializări</h3>
                    <div className="flex flex-wrap gap-2">
                      {m.specializari.map((s) => <Badge key={s} variant="muted">{s}</Badge>)}
                    </div>
                  </TabsContent>

                  <TabsContent value="galerie">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {m.galerie.map((g, i) => (
                        <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted">
                          <Image
                            src={g}
                            alt={`Lucrare ${i + 1} realizată de ${m.nume}`}
                            fill
                            sizes="(max-width: 768px) 50vw, 200px"
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="recenzii">
                    <div className="mb-6 flex flex-col gap-6 rounded-2xl bg-muted/50 p-5 sm:flex-row sm:items-center">
                      <div className="text-center sm:w-40">
                        <p className="text-4xl font-bold text-secondary">{m.rating.toFixed(1)}</p>
                        <RatingStars value={m.rating} className="mt-1 justify-center" />
                        <p className="mt-1 text-xs text-muted-foreground">{m.numarRecenzii} recenzii</p>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {distributie.map((d) => (
                          <div key={d.stele} className="flex items-center gap-2 text-xs">
                            <span className="w-3 text-muted-foreground">{d.stele}</span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                              <div className="h-full rounded-full bg-amber-400" style={{ width: `${(d.n / m.recenzii.length) * 100}%` }} />
                            </div>
                            <span className="w-6 text-right text-muted-foreground">{d.n}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {m.recenzii.map((r) => <ReviewCard key={r.id} recenzie={r} />)}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar oferta */}
          <aside className="lg:pt-20">
            <div className="lg:sticky lg:top-20">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Preț estimativ de la</p>
                  <p className="text-3xl font-bold text-secondary">
                    {formatRON(m.pretEstimativDeLa)}
                    <span className="text-base font-medium text-muted-foreground">{m.unitatePret}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Prețul final depinde de complexitatea lucrării.</p>

                  <Separator className="my-5" />

                  <SolicitaOfertaDialog
                    meseriasNume={m.nume}
                    trigger={<Button size="lg" className="w-full"><Send className="h-4 w-4" /> Solicită ofertă</Button>}
                  />
                  <Button size="lg" variant="outline" className="mt-3 w-full">
                    <Phone className="h-4 w-4" /> {m.telefon}
                  </Button>

                  <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary" /> Identitate verificată</p>
                    <p className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> {m.experientaAni} ani experiență</p>
                    <p className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" /> {m.lucrariFinalizate} {pluralRo(m.lucrariFinalizate, "lucrare", "lucrări")} finalizate</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
