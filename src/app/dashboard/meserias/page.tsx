import type { Metadata } from "next";
import { MeseriasDashboard } from "@/components/dashboard/meserias-dashboard";

export const metadata: Metadata = {
  title: "Dashboard meseriaș",
  description: "Vezi cereri noi, gestionează ofertele trimise, calendarul, încasările și profilul tău.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className="bg-muted/30 min-h-[60vh]">
      <MeseriasDashboard />
    </div>
  );
}
