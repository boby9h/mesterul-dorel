import type { Metadata } from "next";
import { ExplorareMeseriasi } from "@/components/meseriasi/explorare-meseriasi";
import { MESERIASI, getCategorie } from "@/lib/data";
import { ORASE } from "@/lib/constants";
import type { FiltreMeseriasi } from "@/types";

export const metadata: Metadata = {
  title: "Caută meseriași verificați",
  description:
    "Caută și compară meseriași verificați din România. Filtrează după oraș, categorie, preț, rating și disponibilitate.",
  alternates: { canonical: "/meseriasi" },
};

type SP = { [key: string]: string | string[] | undefined };

export default async function MeseriasiPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const get = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);

  const orasParam = get("oras");
  const categorieParam = get("categorie");
  const initiale: FiltreMeseriasi = {
    q: get("q"),
    oras: orasParam && (ORASE as readonly string[]).includes(orasParam) ? orasParam : undefined,
    categorie: categorieParam && getCategorie(categorieParam) ? categorieParam : undefined,
  };

  const titluCategorie = initiale.categorie ? getCategorie(initiale.categorie)?.nume : undefined;

  return (
    <div className="bg-muted/30">
      <div className="container-page py-10 sm:py-14">
        <header className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-secondary">
            {titluCategorie ? `Meseriași: ${titluCategorie}` : "Caută meseriași"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Compară profesioniști verificați după preț, rating și disponibilitate, apoi solicită o ofertă.
          </p>
        </header>

        <ExplorareMeseriasi toate={MESERIASI} initiale={initiale} />
      </div>
    </div>
  );
}
