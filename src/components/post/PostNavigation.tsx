import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PostMeta } from '@/types';

interface PostNavigationProps {
  prev: PostMeta | null;
  next: PostMeta | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  return (
    <nav className="mt-12 grid grid-cols-1 gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800">
      {prev ? (
        <Link
          href={`/posts/${encodeURIComponent(prev.slug)}`}
          className="group rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
        >
          <span className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
            <ChevronLeft size={14} /> 上一篇
          </span>
          <span className="mt-1 block font-medium text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/posts/${encodeURIComponent(next.slug)}`}
          className="group rounded-lg border border-zinc-200 p-4 text-right transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
        >
          <span className="flex items-center justify-end gap-1 text-sm text-zinc-500 dark:text-zinc-400">
            下一篇 <ChevronRight size={14} />
          </span>
          <span className="mt-1 block font-medium text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
