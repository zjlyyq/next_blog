import { getAllPosts } from "@/lib/posts";
import { SearchPageClient } from "./SearchPageClient";

export const metadata = {
  title: "搜索",
  description: "搜索博客文章",
};

export default function SearchPage() {
  const posts = getAllPosts();
  return <SearchPageClient posts={posts} />;
}
