import { SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} {SITE.author}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/feed.xml"
              className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
