import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-primary">
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-2xl font-bold leading-none text-secondary">{value}</p>
          <p className="mt-1 truncate text-sm text-muted-foreground">{label}</p>
          {hint && <p className="text-xs text-emerald-600">{hint}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
