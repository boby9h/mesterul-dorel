import Link from "next/link";
import { Hammer } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        <Hammer className="h-5 w-5" />
      </span>
      {withText && (
        <span className="text-lg font-extrabold tracking-tight text-secondary">
          Mesterul<span className="text-primary">Dorel</span>
        </span>
      )}
      <span className="sr-only">{BRAND.name}</span>
    </Link>
  );
}
