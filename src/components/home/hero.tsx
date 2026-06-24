import Link from "next/link";
import { BadgeCheck, Search, Star, Users } from "lucide-react";
import { SearchBar } from "@/components/shared/search-bar";
import { CATEGORII_POPULARE } from "@/lib/data";

const TRUST = [
  { icon: Users, label: "1.200+ meseriași" },
  { icon: BadgeCheck, label: "100% verificați" },
  { icon: Star, label: "4.8 rating mediu" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-accent/60 via-white to-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1E293B 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Peste 13 categorii de servicii
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-secondary sm:text-5xl lg:text-[3.4rem]">
            Meseriași verificați pentru{" "}
            <span className="relative whitespace-nowrap text-primary">
              orice lucrare
              <svg className="absolute -bottom-1 left-0 h-2.5 w-full text-primary/30" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0 6 Q 25 0 50 4 T 100 3" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Găsește rapid instalatori, electricieni și alți profesioniști din zona ta. Primește
            oferte, compară prețuri și recenzii și alege cu încredere.
          </p>

          <div className="mt-8">
            <SearchBar />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span>Caută rapid:</span>
            {CATEGORII_POPULARE.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                href={`/meseriasi?categorie=${c.slug}`}
                className="inline-flex items-center gap-1 font-medium text-secondary underline-offset-4 hover:text-primary hover:underline"
              >
                <Search className="h-3.5 w-3.5" /> {c.nume}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-6">
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <t.icon className="h-5 w-5 text-primary" /> {t.label}
              </div>
            ))}
          </div>
        </div>

        {/* Vizual lateral */}
        <div className="relative hidden lg:block">
          <div className="absolute right-0 top-6 w-72 animate-fade-up rounded-2xl border bg-white p-5 shadow-card" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-accent" />
              <div>
                <div className="h-3 w-28 rounded bg-slate-200" />
                <div className="mt-2 h-2.5 w-20 rounded bg-slate-100" />
              </div>
              <BadgeCheck className="ml-auto h-6 w-6 text-primary" />
            </div>
            <div className="mt-4 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-2.5 w-full rounded bg-slate-100" />
              <div className="h-2.5 w-4/5 rounded bg-slate-100" />
            </div>
          </div>

          <div className="absolute bottom-4 left-2 w-64 animate-fade-up rounded-2xl border bg-secondary p-5 text-white shadow-card-hover" style={{ animationDelay: "0.25s" }}>
            <p className="text-xs text-slate-300">Ofertă nouă</p>
            <p className="mt-1 text-2xl font-bold">200 <span className="text-base font-medium text-slate-300">RON</span></p>
            <p className="mt-1 text-sm text-slate-300">Montaj baterie · azi</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold">
              Acceptă oferta
            </div>
          </div>

          <div className="mx-auto h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-primary/15 to-accent blur-2xl" />
        </div>
      </div>
    </section>
  );
}
