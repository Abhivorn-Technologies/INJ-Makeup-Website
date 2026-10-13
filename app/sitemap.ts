import type { MetadataRoute } from "next";

import { services } from "@/lib/content";
import { publishedArticles } from "@/lib/journal";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/makeup", priority: 0.9, changeFrequency: "monthly" },
    ...services.map((s) => ({ path: `/makeup/${s.slug}`, priority: 0.9, changeFrequency: "monthly" as const })),
    { path: "/hair-styling", priority: 0.8, changeFrequency: "monthly" },
    { path: "/saree-draping", priority: 0.7, changeFrequency: "monthly" },
    { path: "/academy", priority: 0.8, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.8, changeFrequency: "weekly" },
    { path: "/our-story", priority: 0.6, changeFrequency: "yearly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/book-appointment", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: p.changeFrequency, priority: p.priority })),
    ...publishedArticles().map((a) => ({
      url: absoluteUrl(`/blog/${a.slug}`),
      lastModified: a.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
