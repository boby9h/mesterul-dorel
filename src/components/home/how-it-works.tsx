import { ClipboardList, MapPin, MessageSquareQuote, Search, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const PASI = [
  { icon: ClipboardList, titlu: "Descrii lucrarea", text: "Spui ce ai nevoie și adaugi câteva detalii sau fotografii." },
  { icon: MapPin, titlu: "Alegi locația", text: "Selectezi orașul și zona unde trebuie făcută lucrarea." },
  { icon: Search, titlu: "Primești oferte", text: "Meseriașii din zonă îți trimit oferte personalizate." },
  { icon: Star, titlu: "Compari și alegi", text: "Compari prețuri, recenzii și disponibilitate, apoi alegi." },
  { icon: MessageSquareQuote, titlu: "Lași o recenzie", text: "După finalizare, evaluezi meseriașul și ajuți comunitatea." },
];

export function HowItWorks() {
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading
        align="center"
        eyebrow="Simplu și rapid"
        title="Cum funcționează Mesterul Dorel"
        description="De la descrierea lucrării până la recenzia finală, în doar câțiva pași."
      />

      <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
        {PASI.map((p, i) => (
          <div key={p.titlu} className="relative text-center">
            <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl border bg-white shadow-card">
              <p.icon className="h-6 w-6 text-primary" />
              <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-secondary text-xs font-bold text-white">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-4 font-semibold text-secondary">{p.titlu}</h3>
            <p className="mx-auto mt-1.5 max-w-[14rem] text-sm text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
