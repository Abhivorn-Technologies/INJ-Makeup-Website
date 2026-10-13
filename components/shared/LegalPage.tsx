import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Ornament } from "@/components/shared/Ornament";

export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-ivory pb-24 pt-12 md:pt-16">
      <div className="container-luxe max-w-3xl">
        <Breadcrumbs items={[{ name: title, href: path }]} />
        <h1 className="mt-8 text-[2.6rem] leading-tight text-ink sm:text-[3.2rem]">{title}</h1>
        <Ornament className="mt-5" />
        <p className="mt-5 text-sm text-muted">Last updated: {updated}</p>
        <div className="prose-luxe mt-10">{children}</div>
      </div>
    </section>
  );
}
