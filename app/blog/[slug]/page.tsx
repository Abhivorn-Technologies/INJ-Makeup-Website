import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";

import { ArticleCard } from "@/components/blog/ArticleCard";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { Ornament } from "@/components/shared/Ornament";
import { formatDate, getArticle, visibleArticles } from "@/lib/journal";
import { photos } from "@/lib/photos";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const PLACEHOLDER = "__no-articles__";

export function generateStaticParams() {
  const list = visibleArticles();
  // Cache Components requires at least one param; the placeholder renders a 404.
  return list.length ? list.map((a) => ({ slug: a.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found", robots: { index: false } };
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    noIndex: article.status !== "published",
  });
}

export default function ArticlePage(props: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[70vh] bg-cream" aria-busy="true" />}>
      <ArticleContent params={props.params} />
    </Suspense>
  );
}

async function ArticleContent({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const photo = photos[article.photo];
  const url = absoluteUrl(`/blog/${article.slug}`);
  const related = visibleArticles()
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 3);

  return (
    <>
      {article.status === "published" && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.publishedAt,
            mainEntityOfPage: url,
            image: absoluteUrl(photo.src.src),
            author: { "@type": "Organization", name: site.name },
            publisher: { "@id": `${site.url}/#business` },
          }}
        />
      )}

      <article>
        <header className="bg-cream pb-12 pt-12 md:pt-16">
          <div className="container-luxe max-w-4xl">
            <Breadcrumbs
              items={[
                { name: "Beauty Journal", href: "/blog" },
                { name: article.title, href: `/blog/${article.slug}` },
              ]}
            />
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-text">
              <span>{article.category}</span>
              <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
              {article.status === "published" && article.publishedAt ? (
                <time dateTime={article.publishedAt} className="text-muted">
                  {formatDate(article.publishedAt)}
                </time>
              ) : (
                <span className="bg-ink px-2 py-0.5 text-cream">Draft · awaiting INJ review</span>
              )}
            </div>
            <h1 className="mt-4 text-[2.5rem] leading-[1.06] text-ink sm:text-[3.2rem] lg:text-[3.8rem]">{article.title}</h1>
            <Ornament className="mt-6" />
            <p className="mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-muted">{article.excerpt}</p>
          </div>
        </header>

        <div className="bg-cream">
          <div className="container-luxe max-w-5xl">
            <div className="frame-gold relative aspect-[16/9] overflow-hidden bg-beige">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
        </div>

        <div className="bg-ivory py-14 md:py-20">
          <div className="container-luxe max-w-3xl">
            <div className="prose-luxe text-[1.05rem]">
              {article.body.map((b, i) => {
                if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
                if (b.type === "ul")
                  return (
                    <ul key={i}>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  );
                return <p key={i}>{b.text}</p>;
              })}
            </div>
            <div className="mt-12 flex flex-col gap-6 border-t border-gold/30 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <ShareLinks url={url} title={article.title} image={absoluteUrl(photo.src.src)} />
              <Link href="/blog" className="link-gold">
                <ArrowLeft size={14} aria-hidden="true" /> All articles
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-articles" className="bg-cream py-16 md:py-20">
          <div className="container-luxe">
            <h2 id="related-articles" className="text-center text-[2.1rem] text-ink">
              Related articles
            </h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
