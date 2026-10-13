"use client";

import Link from "next/link";

import { Ornament } from "@/components/shared/Ornament";
import { site } from "@/lib/site";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-luxe text-center">
        <h1 className="text-[2.4rem] text-ink md:text-[3rem]">Something went wrong</h1>
        <Ornament className="mx-auto mt-5" />
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
          Sorry — this page couldn’t be loaded. Please try again. If you were trying to reach us, you can also call{" "}
          <a href={`tel:${site.phones[0].tel}`} className="text-gold-text underline">
            {site.phones[0].display}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-gold">
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Go to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
