'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

interface GiscusProps {
  slug: string;
}

export function Giscus({ slug }: GiscusProps) {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'YOUR_GITHUB_USERNAME/YOUR_REPO');
    script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', slug);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    ref.current.innerHTML = '';
    ref.current.appendChild(script);

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, [slug, resolvedTheme]);

  return (
    <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <h2 className="mb-6 text-lg font-semibold">评论</h2>
      <div ref={ref} />
      <noscript>
        <p className="text-sm text-zinc-500">
          请启用 JavaScript 来查看评论。或者配置 Giscus：在 GitHub 仓库中启用 Discussions 并安装 Giscus App。
        </p>
      </noscript>
    </div>
  );
}
