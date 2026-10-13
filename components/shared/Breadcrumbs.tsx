import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.16em] ${light ? "text-cream/75" : "text-muted"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={light ? "text-gold-light" : "text-gold-text"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:underline underline-offset-4">
                      {c.name}
                    </Link>
                    <ChevronRight size={12} aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
