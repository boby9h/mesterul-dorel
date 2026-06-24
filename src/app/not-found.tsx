import Link from "next/link";
import { Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent text-primary">
          <Hammer className="h-8 w-8" />
        </span>
        <p className="mt-6 text-5xl font-extrabold text-secondary">404</p>
        <h1 className="mt-2 text-xl font-bold text-secondary">Pagina nu a fost găsită</h1>
        <p className="mt-2 text-muted-foreground">Se pare că lucrarea asta nu există. Hai să te ducem înapoi.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild><Link href="/">Acasă</Link></Button>
          <Button variant="outline" asChild><Link href="/meseriasi">Caută meseriași</Link></Button>
        </div>
      </div>
    </div>
  );
}
