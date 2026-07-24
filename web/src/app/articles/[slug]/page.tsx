import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, Clock, User } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { BlogCard } from "@/components/articles/blog-card";
import { ArticleNavLinks } from "@/components/articles/blog-pagination";
import { CTASection } from "@/components/articles/cta-section";
import { Button } from "@/components/ui/button";
import { HOME_URL } from "@/lib/site";
import {
  ARTICLES,
  formatArticleDate,
  getAdjacentArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "บทความ" };

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [{ url: article.ogImage }],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const { prev, next } = getAdjacentArticles(slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    image: [article.ogImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "D&G Holiday Thailand",
      logo: {
        "@type": "ImageObject",
        url: "/images/dg-holiday-logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/articles/${article.slug}`,
    },
    articleSection: article.category,
    keywords: article.tags.join(", "),
    wordCount: article.content.join(" ").split(/\s+/).length,
    timeRequired: `PT${article.readingTime}M`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: HOME_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "บทความ",
        item: "/articles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `/articles/${article.slug}`,
      },
    ],
  };

  return (
    <>
      <SiteHeader active="articles" />
      <main className="bg-[#F7F9FC]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <section className="relative -mt-[108px] overflow-hidden pt-[108px] text-white">
          <div className="relative min-h-[320px] md:min-h-[380px]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#0B2E59]/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E59]/90 via-transparent to-[#0B2E59]/30" />
            <div className="relative z-10 mx-auto flex min-h-[320px] max-w-7xl flex-col justify-end px-5 pb-10 pt-20 md:min-h-[380px] lg:px-8">
              <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/75">
                <a href={HOME_URL} className="hover:text-white">
                  หน้าแรก
                </a>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href="/articles" className="hover:text-white">
                  บทความ
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="line-clamp-1 text-white">{article.title}</span>
              </nav>
              <span className="w-fit rounded-full bg-[#FF6B21] px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                {article.category}
              </span>
              <h1 className="font-display mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
                {article.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {formatArticleDate(article.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {article.readingTime} นาที
                </span>
              </div>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
          <p className="text-lg leading-relaxed text-[#52667A]">{article.excerpt}</p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#102A43]">
            {article.content.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/articles?q=${encodeURIComponent(tag)}`}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0B2E59] shadow-sm ring-1 ring-[#E5EAF0]"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-[16px] border border-[#E5EAF0] bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#FF7A1A]">Author</p>
            <p className="mt-2 text-base font-bold text-[#0B2E59]">{article.author}</p>
            <p className="text-sm text-[#52667A]">{article.authorRole}</p>
            <p className="mt-2 text-xs text-[#8A9AAB]">
              อัปเดตล่าสุด {formatArticleDate(article.updatedAt)}
            </p>
          </div>

          <ArticleNavLinks
            prev={prev ? { slug: prev.slug, title: prev.title } : null}
            next={next ? { slug: next.slug, title: next.title } : null}
          />

          <div className="mt-8 flex justify-center">
            <Button asChild variant="soft" className="rounded-[14px]">
              <Link href="/articles">กลับไปบทความทั้งหมด</Link>
            </Button>
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t border-[#E5EAF0] bg-white py-16">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <h2 className="font-display text-2xl font-semibold text-[#0B2E59] md:text-3xl">
                Related Posts
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item, index) => (
                  <BlogCard key={item.id} article={item} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </main>
    </>
  );
}
