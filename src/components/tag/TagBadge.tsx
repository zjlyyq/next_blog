import Link from 'next/link';

interface TagBadgeProps {
  tag: string;
  count?: number;
  linkable?: boolean;
}

export function TagBadge({ tag, count, linkable = true }: TagBadgeProps) {
  const content = (
    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">
      {tag}
      {count !== undefined && (
        <span className="text-zinc-400 dark:text-zinc-500">({count})</span>
      )}
    </span>
  );

  if (linkable) {
    return <Link href={`/tags/${encodeURIComponent(tag)}`}>{content}</Link>;
  }

  return content;
}
