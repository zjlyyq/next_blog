import Link from 'next/link';
import type { PostMeta } from '@/types';
import { formatDate } from '@/lib/utils';
import { TagBadge } from '@/components/tag/TagBadge';

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-lg border border-zinc-200 p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700">
      <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <h2 className="mb-2 text-xl font-semibold">
        <Link
          href={`/posts/${encodeURIComponent(post.slug)}`}
          className="text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      {post.description && (
        <p className="mb-4 line-clamp-2 text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </article>
  );
}
