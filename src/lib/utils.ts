import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formateaza o suma in RON, fara zecimale. */
export function formatRON(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Formateaza o data ISO intr-un format prietenos (ex: 12 mar. 2026). */
export function formatData(iso: string): string {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/** Timp relativ aproximativ in limba romana (ex: "acum 3 zile"). */
export function timpRelativ(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const zile = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (zile <= 0) return "azi";
  if (zile === 1) return "ieri";
  if (zile < 30) return `acum ${zile} zile`;
  const luni = Math.floor(zile / 30);
  if (luni === 1) return "acum o luna";
  if (luni < 12) return `acum ${luni} luni`;
  const ani = Math.floor(luni / 12);
  return ani === 1 ? "acum un an" : `acum ${ani} ani`;
}

export function pluralRo(n: number, singular: string, plural: string): string {
  return n === 1 ? singular : plural;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
