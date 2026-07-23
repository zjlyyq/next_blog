import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPaginatedPosts } from "@/lib/posts";
import { PostCard } from "@/components/post/PostCard";
import { Pagination } from "@/components/ui/Pagination";

interface PageProps {
  params: Promise<{ num: string }>;
}

export async function generateStaticParams() {
  const { getPaginatedPosts } = await import("@/lib/posts");
  const { totalPages } = getPaginatedPosts(1);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    num: String(i + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { num } = await params;
  return {
    title: `第 ${num} 页`,
    description: `博客文章列表 - 第 ${num} 页`,
  };
}

export default async function PagePage({ params }: PageProps) {
  const { num } = await params;
  const pageNum = parseInt(num, 10);

  if (isNaN(pageNum) || pageNum < 2) {
    notFound();
  }

  const { posts, totalPages, currentPage } = getPaginatedPosts(pageNum);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        第 {pageNum} 页
      </h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
