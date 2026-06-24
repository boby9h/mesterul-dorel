import { Badge } from "@/components/ui/badge";
import type { Disponibilitate } from "@/types";

const MAP: Record<Disponibilitate, { label: string; variant: "success" | "default" | "muted"; dot: string }> = {
  disponibil: { label: "Disponibil acum", variant: "success", dot: "bg-emerald-500" },
  ocupat: { label: "Ocupat", variant: "default", dot: "bg-amber-500" },
  indisponibil: { label: "Indisponibil", variant: "muted", dot: "bg-slate-400" },
};

export function AvailabilityBadge({ status }: { status: Disponibilitate }) {
  const s = MAP[status];
  return (
    <Badge variant={s.variant} className="gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </Badge>
  );
}
