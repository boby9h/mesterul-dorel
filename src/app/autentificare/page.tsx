import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/shared/logo";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Autentificare",
  description: "Conectează-te sau creează un cont de client ori meseriaș pe Mesterul Dorel.",
  robots: { index: false },
};

export default function AutentificarePage() {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Panou stânga (brand) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-secondary p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <Logo className="[&_span]:text-white" />
        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight">Găsești rapid meseriașul potrivit.</h2>
          <p className="mt-3 max-w-sm text-slate-300">
            Alătură-te platformei care conectează clienții cu meseriași verificați din toată România.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-primary" /> Conturi verificate · Date protejate
          </div>
        </div>
        <p className="relative text-xs text-slate-400">© {new Date().getFullYear()} Mesterul Dorel</p>
      </div>

      {/* Formular */}
      <div className="flex items-center justify-center bg-muted/30 p-6">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center lg:hidden">
            <Logo className="justify-center" />
          </div>
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-secondary">Bun venit!</h1>
                <p className="mt-1 text-sm text-muted-foreground">Conectează-te sau creează un cont nou</p>
              </div>
              <AuthForm />
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Continuând, ești de acord cu Termenii și Politica de confidențialitate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
