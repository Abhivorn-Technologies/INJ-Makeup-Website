import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArticleCard } from "@/components/blog/ArticleCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { visibleArticles } from "@/lib/journal";

/** Hidden automatically until at least one article is published. */
export function BeautyJournal() {
  const list = visibleArticles().slice(0, 3);
  if (list.length === 0) return null;
  return (
    <section aria-labelledby="journal-heading" className="bg-cream py-20 md:py-28">
      <div className="container-luxe">
        <SectionHeading
          id="journal-heading"
          eyebrow="Beauty journal"
          title={
            <>
              Notes on beauty <span className="italic text-gold-deep">&amp; bridal style</span>
            </>
          }
        />
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {list.map((a, i) => (
            <li key={a.slug} data-reveal style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Link href="/blog" className="btn btn-outline">
            Read the Journal <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
