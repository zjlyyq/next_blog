import Link from 'next/link';
import type { TagWithCount } from '@/types';

interface TagCloudProps {
  tags: TagWithCount[];
}

export function TagCloud({ tags }: TagCloudProps) {
  if (tags.length === 0) {
    return <p className="text-zinc-500">暂无标签</p>;
  }

  const maxCount = Math.max(...tags.map((t) => t.count));

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map(({ tag, count }) => {
        // Scale font size based on count relative to max
        const scale = count / maxCount;
        const size = 0.75 + scale * 0.5; // 0.75rem to 1.25rem
        return (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="rounded-full bg-zinc-100 px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            style={{ fontSize: `${size}rem` }}
          >
            {tag}
            <span className="ml-1 text-xs text-zinc-400">({count})</span>
          </Link>
        );
      })}
    </div>
  );
}
