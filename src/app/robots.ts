import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const base = BRAND.url.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dashboard/", "/autentificare"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
