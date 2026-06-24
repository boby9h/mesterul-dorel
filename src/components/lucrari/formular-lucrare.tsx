"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORII } from "@/lib/data";
import { ORASE } from "@/lib/constants";
import { lucrareSchema, type LucrareInput } from "@/lib/validations";

export function FormularLucrare() {
  const [foto, setFoto] = useState<string[]>([]);
  const [succes, setSucces] = useState(false);

  const {
    register, handleSubmit, setValue, watch, formState: { errors, isSubmitting },
  } = useForm<LucrareInput>({
    resolver: zodResolver(lucrareSchema),
    defaultValues: { bugetDeLa: 100, bugetPanaLa: 500 },
  });

  const categorie = watch("categorie");
  const oras = watch("oras");

  function adaugaFoto() {
    const id = Math.random().toString(36).slice(2, 8);
    setFoto((prev) => {
      const next = [...prev, `https://picsum.photos/seed/${id}/200/200`].slice(0, 6);
      setValue("fotografii", next);
      return next;
    });
  }
  function stergeFoto(i: number) {
    setFoto((prev) => {
      const next = prev.filter((_, idx) => idx !== i);
      setValue("fotografii", next);
      return next;
    });
  }

  async function onSubmit(_data: LucrareInput) {
    await new Promise((r) => setTimeout(r, 800)); // mock POST
    setSucces(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (succes) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
          <h2 className="mt-4 text-2xl font-bold text-secondary">Lucrarea a fost publicată!</h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Meseriașii din zona ta vor putea vedea cererea și îți vor trimite oferte. Le poți urmări în contul tău.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild><Link href="/dashboard/client">Vezi ofertele primite</Link></Button>
            <Button variant="outline" onClick={() => setSucces(false)}>Publică altă lucrare</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="space-y-1.5">
            <Label htmlFor="titlu">Titlul lucrării</Label>
            <Input id="titlu" placeholder="ex: Montaj baterie la chiuveta din bucătărie" {...register("titlu")} />
            {errors.titlu && <p className="text-xs text-destructive">{errors.titlu.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Categorie</Label>
            <Select value={categorie} onValueChange={(v) => setValue("categorie", v, { shouldValidate: true })}>
              <SelectTrigger><SelectValue placeholder="Alege categoria" /></SelectTrigger>
              <SelectContent>
                {CATEGORII.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.nume}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.categorie && <p className="text-xs text-destructive">{errors.categorie.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="descriere">Descrierea lucrării</Label>
            <Textarea id="descriere" rows={5} placeholder="Descrie ce ai nevoie, materialele disponibile, termenul dorit..." {...register("descriere")} />
            {errors.descriere && <p className="text-xs text-destructive">{errors.descriere.message}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="bugetDeLa">Buget estimat (de la)</Label>
              <div className="relative">
                <Input id="bugetDeLa" type="number" className="pr-12" {...register("bugetDeLa")} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">RON</span>
              </div>
              {errors.bugetDeLa && <p className="text-xs text-destructive">{errors.bugetDeLa.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bugetPanaLa">Buget estimat (până la)</Label>
              <div className="relative">
                <Input id="bugetPanaLa" type="number" className="pr-12" {...register("bugetPanaLa")} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">RON</span>
              </div>
              {errors.bugetPanaLa && <p className="text-xs text-destructive">{errors.bugetPanaLa.message}</p>}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Oraș</Label>
              <Select value={oras} onValueChange={(v) => setValue("oras", v as LucrareInput["oras"], { shouldValidate: true })}>
                <SelectTrigger><SelectValue placeholder="Alege orașul" /></SelectTrigger>
                <SelectContent>
                  {ORASE.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.oras && <p className="text-xs text-destructive">{errors.oras.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="telefon">Telefon de contact</Label>
              <Input id="telefon" placeholder="07xx xxx xxx" {...register("telefon")} />
              {errors.telefon && <p className="text-xs text-destructive">{errors.telefon.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="adresa">Adresă / zonă</Label>
            <Input id="adresa" placeholder="ex: Sector 3, zona Titan" {...register("adresa")} />
            {errors.adresa && <p className="text-xs text-destructive">{errors.adresa.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Fotografii (opțional)</Label>
            <div className="flex flex-wrap gap-3">
              {foto.map((f, i) => (
                <div key={i} className="group relative h-20 w-20 overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f} alt="" className="h-full w-full object-cover" />
                  <button type="button" onClick={() => stergeFoto(i)} className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-secondary/80 text-white opacity-0 transition group-hover:opacity-100">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {foto.length < 6 && (
                <button type="button" onClick={adaugaFoto} className="grid h-20 w-20 place-items-center rounded-lg border border-dashed text-muted-foreground transition hover:border-primary hover:text-primary">
                  <ImagePlus className="h-5 w-5" />
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Adaugă până la 6 fotografii pentru a primi oferte mai exacte.</p>
          </div>

          <div className="flex items-center justify-end gap-3 border-t pt-6">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Se publică..." : "Publică lucrarea"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
