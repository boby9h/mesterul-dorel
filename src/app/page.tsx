import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { SectionHeading } from "@/components/shared/section-heading";
import { CategoryCard } from "@/components/shared/category-card";
import { MeseriasCard } from "@/components/meseriasi/meserias-card";
import { ReviewCard } from "@/components/shared/review-card";
import { Button } from "@/components/ui/button";
import { CATEGORII_POPULARE, MESERIASI } from "@/lib/data";
import { meseriasiRecomandati, recenziiRecente } from "@/services/meseriasi-service";

export default async function HomePage() {
  const recomandati = await meseriasiRecomandati(6);
  const recenzii = await recenziiRecente(3);
  const meseriasById = new Map(MESERIASI.map((m) => [m.id, m.nume]));

  return (
    <>
      <Hero />

      {/* Categorii populare */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Servicii" title="Categorii populare" />
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/categorii">Toate categoriile <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORII_POPULARE.slice(0, 8).map((c) => (
            <CategoryCard key={c.slug} categorie={c} />
          ))}
        </div>
      </section>

      {/* Meseriași recomandați */}
      <section className="border-y bg-muted/40 py-16 sm:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Top profesioniști" title="Meseriași recomandați" />
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/meseriasi">Vezi toți <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recomandati.map((m) => (
              <MeseriasCard key={m.id} meserias={m} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Recenzii */}
      <section className="border-t bg-muted/40 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Ce spun clienții"
            title="Mii de lucrări finalizate cu succes"
            description="Recenzii reale de la clienți care și-au găsit meseriașul potrivit."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {recenzii.map((r) => (
              <ReviewCard key={r.id} recenzie={r} meseriasNume={meseriasById.get(r.meseriasId)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="container-page py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Ai o lucrare? Găsește meseriașul potrivit azi.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-slate-300">
            Publică gratuit lucrarea ta și primește oferte de la meseriași verificați în câteva minute.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/publica-lucrare">Publică o lucrare gratuit</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href="/dashboard/meserias">Devino meseriaș</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
