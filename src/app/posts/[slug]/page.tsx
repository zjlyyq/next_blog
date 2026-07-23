import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllSlugs, getAdjacentPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/post/MarkdownRenderer";
import { TagBadge } from "@/components/tag/TagBadge";
import { PostNavigation } from "@/components/post/PostNavigation";
import { Giscus } from "@/components/comment/Giscus";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <article>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
        {post.description && (
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {post.description}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <MarkdownRenderer content={post.content} />
      </div>

      {/* Post navigation */}
      <PostNavigation prev={prev} next={next} />

      {/* Comments */}
      <Giscus slug={slug} />
    </article>
  );
}
