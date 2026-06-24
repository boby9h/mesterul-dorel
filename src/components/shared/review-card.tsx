import Image from "next/image";
import { Card } from "@/components/ui/card";
import { RatingStars } from "@/components/shared/rating-stars";
import { timpRelativ } from "@/lib/utils";
import type { Recenzie } from "@/types";

export function ReviewCard({ recenzie, meseriasNume }: { recenzie: Recenzie; meseriasNume?: string }) {
  return (
    <Card className="flex h-full flex-col p-5">
      <RatingStars value={recenzie.rating} />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">&ldquo;{recenzie.text}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3 border-t pt-4">
        <Image
          src={recenzie.avatar}
          alt={recenzie.autor}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-secondary">{recenzie.autor}</p>
          <p className="truncate text-xs text-muted-foreground">
            {recenzie.lucrare}
            {meseriasNume ? ` · ${meseriasNume}` : ""} · {timpRelativ(recenzie.data)}
          </p>
        </div>
      </div>
    </Card>
  );
}
