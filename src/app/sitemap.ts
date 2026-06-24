import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";
import { CATEGORII, MESERIASI } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.url.replace(/\/$/, "");
  const now = new Date();

  const statice = ["", "/categorii", "/meseriasi", "/publica-lucrare", "/autentificare"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const categorii = CATEGORII.map((c) => ({
    url: `${base}/meseriasi?categorie=${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const meseriasi = MESERIASI.map((m) => ({
    url: `${base}/meseriasi/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...statice, ...categorii, ...meseriasi];
}
