'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import Fuse from 'fuse.js';
import type { PostMeta } from '@/types';

interface SearchDialogProps {
  posts: PostMeta[];
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ posts, open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostMeta[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fuseRef = useRef<Fuse<PostMeta> | null>(null);

  useEffect(() => {
    fuseRef.current = new Fuse(posts, {
      keys: ['title', 'description', 'tags'],
      threshold: 0.4,
    });
  }, [posts]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim() || !fuseRef.current) {
      setResults([]);
      return;
    }
    const r = fuseRef.current.search(query).map((r) => r.item);
    setResults(r);
  }, [query]);

  const handleSelect = useCallback(
    (slug: string) => {
      onClose();
      router.push(`/posts/${encodeURIComponent(slug)}`);
    },
    [onClose, router]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center border-b border-zinc-200 px-4 dark:border-zinc-700">
          <Search size={18} className="text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章..."
            className="flex-1 bg-transparent px-3 py-4 text-sm outline-none"
          />
          <button onClick={onClose} className="rounded-md p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <X size={16} className="text-zinc-400" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            results.map((post) => (
              <button
                key={post.slug}
                onClick={() => handleSelect(post.slug)}
                className="w-full px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {post.title}
                </div>
                {post.description && (
                  <div className="mt-0.5 text-xs text-zinc-500 line-clamp-1">
                    {post.description}
                  </div>
                )}
              </button>
            ))
          ) : query.trim() ? (
            <p className="px-4 py-8 text-center text-sm text-zinc-500">
              未找到相关文章
            </p>
          ) : (
            <p className="px-4 py-8 text-center text-sm text-zinc-400">
              输入关键词搜索文章
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
