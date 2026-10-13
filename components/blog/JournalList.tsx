"use client";

import { useMemo, useState } from "react";

import { ArticleCard } from "@/components/blog/ArticleCard";
import type { Article } from "@/lib/journal";

const PAGE_SIZE = 6;

export function JournalList({ articles, categories }: { articles: Article[]; categories: readonly string[] }) {
  const [category, setCategory] = useState<string>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (category === "All" ? articles : articles.filter((a) => a.category === category)),
    [articles, category],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const tabs = ["All", ...categories.filter((c) => articles.some((a) => a.category === c))];

  return (
    <div>
      <div role="group" aria-label="Filter articles by category" className="flex flex-wrap justify-center gap-2">
        {tabs.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setPage(1);
            }}
            className={`min-h-11 border px-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
              category === c ? "border-ink bg-ink text-cream" : "border-gold/50 text-brown hover:border-ink hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {current.length} of {filtered.length} articles
      </p>

      <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {current.map((a) => (
          <li key={a.slug}>
            <ArticleCard article={a} />
          </li>
        ))}
      </ul>

      {pages > 1 && (
        <nav aria-label="Journal pages" className="mt-14 flex items-center justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setPage(n);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-current={page === n ? "page" : undefined}
              aria-label={`Page ${n}`}
              className={`grid h-11 w-11 place-items-center border text-sm ${
                page === n ? "border-ink bg-ink text-cream" : "border-gold/50 text-brown hover:border-ink"
              }`}
            >
              {n}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
