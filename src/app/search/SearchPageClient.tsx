'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import Fuse from 'fuse.js';
import type { PostMeta } from '@/types';

interface SearchPageClientProps {
  posts: PostMeta[];
}

export function SearchPageClient({ posts }: SearchPageClientProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostMeta[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const fuseRef = useRef<Fuse<PostMeta> | null>(null);

  // Initialize Fuse
  useEffect(() => {
    if (posts.length > 0) {
      fuseRef.current = new Fuse(posts, {
        keys: [
          { name: 'title', weight: 2 },
          { name: 'description', weight: 1 },
          { name: 'tags', weight: 1.5 },
        ],
        threshold: 0.4,
      });
    }
  }, [posts]);

  // Search on query change
  useEffect(() => {
    if (!query.trim() || !fuseRef.current) {
      setResults([]);
      return;
    }
    const r = fuseRef.current.search(query).map((r) => r.item);
    setResults(r);
  }, [query]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSelect = useCallback(
    (slug: string) => {
      router.push(`/posts/${slug}`);
    },
    [router]
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        搜索文章
      </h1>

      {/* Search input */}
      <div className="mb-8 flex items-center rounded-lg border border-zinc-300 bg-white px-4 dark:border-zinc-700 dark:bg-zinc-900">
        <Search size={20} className="text-zinc-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入关键词搜索文章..."
          className="flex-1 bg-transparent px-3 py-3 text-base outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="rounded-md p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X size={16} className="text-zinc-400" />
          </button>
        )}
      </div>

      {/* Results */}
      <div>
        {query.trim() ? (
          results.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-zinc-500">
                找到 {results.length} 篇相关文章
              </p>
              {results.map((post) => (
                <button
                  key={post.slug}
                  onClick={() => handleSelect(post.slug)}
                  className="w-full rounded-lg border border-zinc-200 p-4 text-left transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                >
                  <div className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                    {post.title}
                  </div>
                  {post.description && (
                    <div className="mt-1 text-sm text-zinc-500 line-clamp-2">
                      {post.description}
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-zinc-500">
              未找到与 &ldquo;{query}&rdquo; 相关的文章
            </p>
          )
        ) : (
          <p className="py-12 text-center text-zinc-400">
            输入关键词开始搜索，共 {posts.length} 篇文章
          </p>
        )}
      </div>
    </div>
  );
}
