import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({ currentPage, totalPages, basePath = '/page' }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? '/' : `${basePath}/${currentPage - 1}`}
          className="rounded-md border border-zinc-200 px-4 py-2 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          上一页
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const href = page === 1 ? '/' : `${basePath}/${page}`;
        return (
          <Link
            key={page}
            href={href}
            className={`rounded-md px-3 py-2 text-sm transition-colors ${
              page === currentPage
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800'
            }`}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          className="rounded-md border border-zinc-200 px-4 py-2 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          下一页
        </Link>
      )}
    </nav>
  );
}
