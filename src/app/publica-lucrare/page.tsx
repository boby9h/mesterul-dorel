import type { Metadata } from "next";
import { BadgeCheck, Clock, Wallet } from "lucide-react";
import { FormularLucrare } from "@/components/lucrari/formular-lucrare";

export const metadata: Metadata = {
  title: "Publică o lucrare",
  description:
    "Descrie lucrarea ta și primește gratuit oferte de la meseriași verificați din zona ta. Compară prețuri și recenzii, apoi alege.",
  alternates: { canonical: "/publica-lucrare" },
};

const BENEFICII = [
  { icon: Wallet, titlu: "Gratuit", text: "Publicarea lucrării și primirea ofertelor sunt gratuite." },
  { icon: Clock, titlu: "Rapid", text: "Primești primele oferte de obicei în câteva minute." },
  { icon: BadgeCheck, titlu: "Verificat", text: "Toți meseriașii au identitatea verificată." },
];

export default function PublicaLucrarePage() {
  return (
    <div className="bg-muted/30">
      <div className="container-page py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-secondary">Publică o lucrare</h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Completează detaliile de mai jos. Meseriașii potriviți din zona ta îți vor trimite oferte personalizate.
            </p>
            <div className="mt-8">
              <FormularLucrare />
            </div>
          </div>

          <aside className="space-y-4 lg:pt-24">
            {BENEFICII.map((b) => (
              <div key={b.titlu} className="flex gap-3 rounded-2xl border bg-white p-4 shadow-card">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-primary">
                  <b.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-secondary">{b.titlu}</p>
                  <p className="text-sm text-muted-foreground">{b.text}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl bg-secondary p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Ai nevoie de ajutor?</p>
              <p className="mt-1">Echipa Mesterul Dorel te poate ajuta să formulezi cererea. Sună la 0721 000 000.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
