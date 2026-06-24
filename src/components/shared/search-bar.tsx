"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ORASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [oras, setOras] = useState<string>("");

  function cauta() {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (oras) params.set("oras", oras);
    router.push(`/meseriasi?${params.toString()}`);
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border bg-white p-3 shadow-card sm:flex-row sm:items-center sm:p-2.5",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-2 sm:border-r sm:pr-2">
        <Search className="ml-1 h-5 w-5 shrink-0 text-muted-foreground" />
        <Input
          placeholder="Ce ai nevoie? (ex: instalator)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && cauta()}
          className="border-0 shadow-none focus-visible:ring-0"
          aria-label="Ce ai nevoie?"
        />
      </div>
      <div className="sm:w-44">
        <Select value={oras} onValueChange={setOras}>
          <SelectTrigger className="border-0 shadow-none focus:ring-0" aria-label="Oraș">
            <SelectValue placeholder="Oraș" />
          </SelectTrigger>
          <SelectContent>
            {ORASE.map((o) => (
              <SelectItem key={o} value={o}>{o}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button size="lg" onClick={cauta} className="sm:px-8">
        <Search className="h-4 w-4" /> Caută
      </Button>
    </div>
  );
}
