"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ofertaSchema, type OfertaInput } from "@/lib/validations";

export function SolicitaOfertaDialog({ meseriasNume, trigger }: { meseriasNume: string; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [trimis, setTrimis] = useState(false);

  const {
    register, handleSubmit, reset, formState: { errors, isSubmitting },
  } = useForm<OfertaInput>({ resolver: zodResolver(ofertaSchema) });

  async function onSubmit(_data: OfertaInput) {
    // Mock: simuleaza trimiterea cererii (va fi conectat la API/Supabase)
    await new Promise((r) => setTimeout(r, 700));
    setTrimis(true);
  }

  function inchide(v: boolean) {
    setOpen(v);
    if (!v) setTimeout(() => { setTrimis(false); reset(); }, 200);
  }

  return (
    <Dialog open={open} onOpenChange={inchide}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        {trimis ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h3 className="mt-4 text-lg font-semibold text-secondary">Cerere trimisă!</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {meseriasNume} a primit solicitarea ta și îți va răspunde în cel mai scurt timp.
            </p>
            <Button className="mt-6" onClick={() => inchide(false)}>Închide</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Solicită o ofertă</DialogTitle>
              <DialogDescription>
                Trimite o cerere către <span className="font-medium text-secondary">{meseriasNume}</span>. Răspunde de obicei în câteva ore.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nume">Numele tău</Label>
                <Input id="nume" placeholder="ex: Andrei Popescu" {...register("nume")} />
                {errors.nume && <p className="text-xs text-destructive">{errors.nume.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="telefon">Telefon</Label>
                <Input id="telefon" placeholder="07xx xxx xxx" {...register("telefon")} />
                {errors.telefon && <p className="text-xs text-destructive">{errors.telefon.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="detalii">Detalii despre lucrare</Label>
                <Textarea id="detalii" placeholder="Descrie pe scurt ce ai nevoie..." {...register("detalii")} />
                {errors.detalii && <p className="text-xs text-destructive">{errors.detalii.message}</p>}
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="submit" disabled={isSubmitting}>
                <Send className="h-4 w-4" /> {isSubmitting ? "Se trimite..." : "Trimite cererea"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
