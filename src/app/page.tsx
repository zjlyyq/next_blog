import { getAllPosts, getPaginatedPosts } from "@/lib/posts";
import { POSTS_PER_PAGE, SITE } from "@/lib/constants";
import { PostCard } from "@/components/post/PostCard";
import { Pagination } from "@/components/ui/Pagination";

export default function Home() {
  const { posts, totalPages } = getPaginatedPosts(1);

  return (
    <div>
      {/* Hero section */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          {SITE.title}
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          {SITE.description}
        </p>
      </section>

      {/* Post list */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            最新文章
          </h2>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            共 {getAllPosts().length} 篇
          </span>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <Pagination currentPage={1} totalPages={totalPages} />
      </section>
    </div>
  );
}
