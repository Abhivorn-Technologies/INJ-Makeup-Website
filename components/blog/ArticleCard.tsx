import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { formatDate, type Article } from "@/lib/journal";
import { photos } from "@/lib/photos";

export function ArticleCard({ article }: { article: Article }) {
  const photo = photos[article.photo];
  return (
    <article className="group card-hover-lift flex h-full flex-col">
      <Link href={`/blog/${article.slug}`} tabIndex={-1} aria-hidden="true" className="frame-gold img-zoom relative block aspect-[4/3] overflow-hidden bg-beige">
        <Image
          src={photo.src}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 30vw, 92vw"
          className="object-cover object-[50%_30%]"
        />
      </Link>
      <div className="mt-5 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-text">
        <span>{article.category}</span>
        <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
        {article.status === "published" && article.publishedAt ? (
          <time dateTime={article.publishedAt} className="text-muted">
            {formatDate(article.publishedAt)}
          </time>
        ) : (
          <span className="bg-ink px-2 py-0.5 text-cream">Draft · awaiting review</span>
        )}
      </div>
      <h3 className="mt-3 text-[1.6rem] leading-tight text-ink">
        <Link href={`/blog/${article.slug}`} className="hover:text-gold-text">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{article.excerpt}</p>
      <Link href={`/blog/${article.slug}`} className="link-gold mt-5 self-start">
        Read article<span className="sr-only">: {article.title}</span> <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </article>
  );
}
