import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostMeta, TagWithCount } from "@/types";
import { POSTS_PER_PAGE } from "./constants";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function readAllPostFiles(): { slug: string; raw: string }[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    return { slug, raw };
  });
}

function parseMeta(slug: string, raw: string): PostMeta {
  const { data } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    date: data.date ? String(data.date) : "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    description: data.description || data.excerpt || "",
    published: data.published !== false,
  };
}

export function getAllPosts(): PostMeta[] {
  const files = readAllPostFiles();
  const posts = files
    .map(({ slug, raw }) => parseMeta(slug, raw))
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    date: data.date ? String(data.date) : "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    description: data.description || data.excerpt || "",
    published: data.published !== false,
    content,
  };
}

export function getAllTags(): TagWithCount[] {
  const posts = getAllPosts();
  const countMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      countMap.set(tag, (countMap.get(tag) || 0) + 1);
    }
  }
  return Array.from(countMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getPaginatedPosts(page: number): {
  posts: PostMeta[];
  totalPages: number;
  currentPage: number;
} {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: allPosts.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    currentPage: page,
  };
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const allPosts = getAllPosts();
  const index = allPosts.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? allPosts[index - 1] : null,
    next: index < allPosts.length - 1 ? allPosts[index + 1] : null,
  };
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

const PAGES_DIR = path.join(process.cwd(), "src", "content", "pages");

export function getPageContent(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(PAGES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date) : "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      description: data.description || "",
      published: data.published !== false,
    },
    content,
  };
}
