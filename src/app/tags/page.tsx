import type { Metadata } from "next";
import { getAllTags } from "@/lib/posts";
import { TagCloud } from "@/components/tag/TagCloud";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览博客文章",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        标签
      </h1>
      <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
        按标签浏览文章，共 {tags.length} 个标签
      </p>
      <TagCloud tags={tags} />
    </div>
  );
}
