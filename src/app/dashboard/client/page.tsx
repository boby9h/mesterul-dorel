import type { Metadata } from "next";
import { ClientDashboard } from "@/components/dashboard/client-dashboard";

export const metadata: Metadata = {
  title: "Dashboard client",
  description: "Gestionează lucrările active, ofertele primite, mesajele și recenziile tale.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className="bg-muted/30 min-h-[60vh]">
      <ClientDashboard />
    </div>
  );
}
