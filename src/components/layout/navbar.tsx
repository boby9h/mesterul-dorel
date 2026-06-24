"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Plus, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/categorii", label: "Categorii" },
  { href: "/meseriasi", label: "Meseriași" },
  { href: "/dashboard/client", label: "Cont client" },
  { href: "/dashboard/meserias", label: "Cont meseriaș" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-muted hover:text-secondary",
                  active && "text-secondary",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/autentificare">Autentificare</Link>
          </Button>
          <Button asChild>
            <Link href="/publica-lucrare">
              <Plus className="h-4 w-4" /> Publică o lucrare
            </Link>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Meniu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" asChild onClick={() => setOpen(false)}>
                <Link href="/autentificare">Autentificare</Link>
              </Button>
              <Button asChild onClick={() => setOpen(false)}>
                <Link href="/publica-lucrare">
                  <Plus className="h-4 w-4" /> Publică o lucrare
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
