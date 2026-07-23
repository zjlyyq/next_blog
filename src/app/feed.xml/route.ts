import { Feed } from "feed";
import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: SITE.title,
    description: SITE.description,
    id: SITE.url,
    link: SITE.url,
    language: SITE.locale,
    updated: posts.length > 0 ? new Date(posts[0].date) : new Date(),
    generator: "Next.js Blog",
    copyright: `All rights reserved ${new Date().getFullYear()}, ${SITE.author}`,
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${SITE.url}/posts/${post.slug}`,
      link: `${SITE.url}/posts/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag, term: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
