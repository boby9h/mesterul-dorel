import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { BRAND } from "@/lib/constants";
import { CATEGORII_POPULARE } from "@/lib/data";

const COLOANA_PLATFORMA = [
  { href: "/categorii", label: "Toate categoriile" },
  { href: "/meseriasi", label: "Caută meseriași" },
  { href: "/publica-lucrare", label: "Publică o lucrare" },
  { href: "/dashboard/meserias", label: "Devino meseriaș" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-secondary text-slate-300">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="[&_span]:text-white">
            <Logo />
          </div>
          <p className="max-w-xs text-sm text-slate-400">
            {BRAND.slogan} Conectăm clienții cu meseriași verificați din toată România.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {BRAND.telefon}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {BRAND.email}</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> București, România</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Platformă</h3>
          <ul className="space-y-2.5 text-sm">
            {COLOANA_PLATFORMA.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate-400 transition-colors hover:text-primary">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Servicii populare</h3>
          <ul className="space-y-2.5 text-sm">
            {CATEGORII_POPULARE.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/meseriasi?categorie=${c.slug}`} className="text-slate-400 transition-colors hover:text-primary">{c.nume}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Companie</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
  <Link href="/despre-noi" className="text-slate-400 hover:text-primary">
    Despre noi
  </Link>
</li>

<li>
  <Link href="/cum-functioneaza" className="text-slate-400 hover:text-primary">
    Cum funcționează
  </Link>
</li>

<li>
  <Link href="/termeni-si-conditii" className="text-slate-400 hover:text-primary">
    Termeni și condiții
  </Link>
</li>

<li>
  <Link href="/confidentialitate" className="text-slate-400 hover:text-primary">
    Confidențialitate
  </Link>
</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.name}. Toate drepturile rezervate.</p>
          <p>Construit pentru lansare MVP în România.</p>
        </div>
      </div>
    </footer>
  );
}
