export const SITE = {
  title: "我的博客",
  description: "个人技术博客，分享前端开发经验",
  url: "https://your-domain.com",
  author: "Your Name",
  locale: "zh-CN",
} as const;

export const POSTS_PER_PAGE = 10;

export const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/tags", label: "标签" },
  { href: "/about", label: "关于" },
  { href: "/projects", label: "作品集" },
] as const;
