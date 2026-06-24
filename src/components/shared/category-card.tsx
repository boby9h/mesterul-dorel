import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { categoryIcon } from "@/lib/icons";
import { pluralRo } from "@/lib/utils";
import type { Categorie } from "@/types";

export function CategoryCard({ categorie }: { categorie: Categorie }) {
  const Icon = categoryIcon(categorie.icon);
  return (
    <Link href={`/meseriasi?categorie=${categorie.slug}`} className="group block">
      <Card className="relative h-full overflow-hidden p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <Icon className="h-6 w-6" />
        </span>
        <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-slate-300 transition-colors group-hover:text-primary" />
        <h3 className="mt-4 font-semibold text-secondary">{categorie.nume}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{categorie.descriere}</p>
        <p className="mt-3 text-xs font-medium text-muted-foreground">
          {categorie.numarMeseriasi} {pluralRo(categorie.numarMeseriasi, "meseriaș", "meseriași")}
        </p>
      </Card>
    </Link>
  );
}
