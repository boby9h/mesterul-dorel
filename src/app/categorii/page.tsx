import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { CategoryCard } from "@/components/shared/category-card";
import { CATEGORII } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categorii de servicii",
  description:
    "Explorează toate categoriile de servicii la domiciliu: instalator, electrician, zugrav, montaj mobilă, aer condiționat, curățenie, grădinărit și multe altele.",
  alternates: { canonical: "/categorii" },
};

export default function CategoriiPage() {
  return (
    <div className="bg-muted/30">
      <div className="container-page py-12 sm:py-16">
        <SectionHeading
          eyebrow="Servicii"
          title="Toate categoriile de servicii"
          description="Alege categoria de care ai nevoie și vezi meseriașii verificați disponibili în zona ta."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORII.map((c) => (
            <CategoryCard key={c.slug} categorie={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
