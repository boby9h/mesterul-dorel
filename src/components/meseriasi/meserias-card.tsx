import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/shared/rating-stars";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { formatRON } from "@/lib/utils";
import type { Meserias } from "@/types";

export function MeseriasCard({ meserias: m }: { meserias: Meserias }) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="flex items-start gap-4 p-5">
        <div className="relative">
          <Image
            src={m.avatar}
            alt={m.nume}
            width={64}
            height={64}
            className="h-16 w-16 rounded-xl object-cover ring-1 ring-border"
          />
          {m.verificat && (
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-white">
              <BadgeCheck className="h-5 w-5 text-primary" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-base font-semibold text-secondary">{m.nume}</h3>
          </div>
          <p className="truncate text-sm text-muted-foreground">{m.specializari.slice(0, 2).join(" · ")}</p>
          <div className="mt-1.5 flex items-center gap-2 text-sm">
            <RatingStars value={m.rating} size={15} />
            <span className="font-semibold text-secondary">{m.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({m.numarRecenzii})</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-5">
        <Badge variant="muted" className="gap-1">
          <MapPin className="h-3 w-3" /> {m.oras}
        </Badge>
        {m.raspunsRapid && (
          <Badge variant="default" className="gap-1">
            <Zap className="h-3 w-3" /> Răspuns rapid
          </Badge>
        )}
        <AvailabilityBadge status={m.disponibilitate} />
      </div>

      <p className="mt-3 line-clamp-2 px-5 text-sm text-muted-foreground">{m.descriere}</p>

      <div className="mt-auto flex items-center justify-between gap-3 p-5 pt-4">
        <div>
          <p className="text-xs text-muted-foreground">de la</p>
          <p className="text-lg font-bold text-secondary">
            {formatRON(m.pretEstimativDeLa)}
            <span className="text-sm font-medium text-muted-foreground">{m.unitatePret}</span>
          </p>
        </div>
        <Button asChild>
          <Link href={`/meseriasi/${m.slug}`}>Vezi profil</Link>
        </Button>
      </div>
    </Card>
  );
}
