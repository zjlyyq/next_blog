import type { Metadata } from "next";
import { getPageContent } from "@/lib/posts";
import { MarkdownRenderer } from "@/components/post/MarkdownRenderer";

export const metadata: Metadata = {
  title: "关于我",
  description: "关于我的个人介绍",
};

export default function AboutPage() {
  const page = getPageContent("about");

  if (!page) {
    return (
      <div>
        <h1 className="mb-8 text-3xl font-bold">关于我</h1>
        <p className="text-zinc-500">页面内容暂未添加。</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {page.meta.title}
      </h1>
      <MarkdownRenderer content={page.content} />
    </div>
  );
}
