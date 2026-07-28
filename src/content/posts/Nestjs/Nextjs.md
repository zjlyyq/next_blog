---
title: 'Next.js 原理以及使用方法'
date: '2026-07-24'
tags: ['Next.js', 'React', '前端']
description: '彻底搞懂 Next.js 的原理和用法。'
published: true
---

你好！我是老张，一个写了十年 React、从“刀耕火种”的 jQuery 时代走过来的前端老兵。

如果你是前端新手，或者只玩过 Create React App（CRA），第一次接触 Next.js 可能会觉得它“太重了”、“黑魔法太多”。但请相信我，**Next.js 不是来增加复杂度的，而是来救你的**。

为了让你快速理解，我们不讲枯燥的源码，直接用**“点菜”和“外卖”**的比喻，带你彻底搞懂 Next.js 的原理和用法。

---

### 1. 核心原理：Next.js 到底是什么？

**一句话定义**：Next.js 是一个基于 React 的**全栈框架**。它把 React 从“只能画界面的前端库”，升级成了“能独立处理后端接口、服务端渲染、文件路由的完整 Web 应用”。

**传统 React 应用（CRA）的痛点**：
你去餐厅点菜（请求页面），服务员（浏览器）要等后厨（React 代码）把所有菜全部做完（下载完整个 JS 包），才把一整车菜端上来。**缺点**：你盯着空桌子看了好几秒（白屏），而且菜里的关键词（SEO 文本）被包裹在 JS 逻辑里，百度爬虫根本看不懂，导致 SEO 极差。

**Next.js 的解决方案（SSR/服务端渲染）**：
Next.js 在服务器上就把菜做好（生成 HTML 字符串），直接端给客人。客人一坐下就能看到满桌菜（首屏极快），并且这个饭馆（Next.js）自带“筷子筒”（API Routes），你甚至可以自己加调料（后端逻辑）。

---

### 2. 两大“杀手锏”原理（初学者必须懂的）

想要用好 Next.js，你必须理解它的两大基石：

#### A. 混合渲染（Rendering Strategies）
Next.js 不强迫你用某一种模式，而是让你**按需选择**：

- **SSG（静态站点生成）**：适合博客、官网。在**构建时**就把页面生成为静态 HTML。速度最快，连服务器计算都省了。
- **SSR（服务端渲染）**：适合数据实时变化的仪表盘。**每次请求**都在服务器重新生成 HTML。
- **CSR（客户端渲染）**：和传统 React 一样，适合后台管理页（不需要 SEO）。
- **ISR（增量静态再生）**：SSG 的升级版，允许你在不重新构建整个网站的情况下，定期更新特定页面。

#### B. 服务端组件 vs 客户端组件（App Router 的核心）
这是 Next.js 13+ 最大的变革，也是新手最容易踩坑的地方：

- **服务端组件（默认）**：只在服务器上运行。代码不会打包到浏览器，所以体积小，可以直接操作数据库、读取文件。
- **客户端组件（`'use client'`）**：需要运行在浏览器中。才能使用 `useState`、`useEffect`、点击事件等交互逻辑。

**关键原则**：**尽可能多用服务端组件，只在需要交互的地方用客户端组件。**

---

### 3. 核心用法：三大“杀手级”功能

#### ① 文件即路由（App Router）
你不需要再手写 `react-router-dom` 的配置了。在 `app` 目录下创建文件夹，文件夹名就是 URL 路径。

- 新建 `app/about/page.tsx` -> 自动生成路由 `你的域名/about`
- 新建 `app/blog/[slug]/page.tsx` -> 动态路由，匹配 `/blog/hello-world`

#### ② 数据获取（Server Actions & Fetch）
在 Next.js 中，你可以在组件内部直接 `async/await` 取数据（不需要 `useEffect`！）。

```tsx
// app/page.tsx (这是一个服务端组件)
export default async function Home() {
  // 直接在后端取数据，并把结果返回给前端
  const data = await fetch('https://api.example.com/posts').then(res => res.json());
  return <div>{data.title}</div>;
}
```

#### ③ API Routes
你不需要单独搞一个 Express 或 Node 服务器。在 `app/api/` 目录下创建 `route.ts`，就能写后端接口。

```tsx
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: '我是 Next.js 写的后端接口！' });
}
```

---

### 4. 新手起步实操（3 分钟跑起来）

按照我的习惯，新手不要纠结繁琐配置，直接用官方脚手架：

```bash
# 1. 创建项目
npx create-next-app@latest my-blog --typescript --tailwind --eslint

# 2. 启动项目
cd my-blog
npm run dev
```

**你需要知道的几个关键文件**：

- `app/layout.tsx`：**根布局**。它包裹所有页面，在这里放全局导航栏、Footer 以及 `<html>` 标签。
- `app/page.tsx`：**首页**。
- `next.config.ts`：配置文件。比如配置图片域名、环境变量等。

---

### 5. 避坑指南（给新手的真心话）

1. **别滥用 `'use client'`**：能放在服务端渲染的就放在服务端，否则你的包体积会变大，失去 Next.js 的优势。
2. **图片优化用 `next/image`**：不要直接用 `<img>`。Next.js 内置了图片懒加载和尺寸优化，用自带组件能极大提升性能。
3. **环境变量分两种**：`NEXT_PUBLIC_XXX` 是给浏览器看的（前端），没有这个前缀的是给服务器看的（后端）。**千万不要把数据库密码放在带 `PUBLIC` 的变量里！**

---

### 6. 总结：它适合做什么？

- **极度推荐**：企业官网、博客、电商页面（需要 SEO）、Saas 后台（需要性能）。
- **不建议**：纯内部使用的后台管理系统（不需要 SEO，用 CRA 或 Vite 就够了）。

**最后送你一句话**：Next.js 把前端工程师的视野从“浏览器”拉升到了“整个 HTTP 请求链路”。当你能分清哪些代码跑在服务器，哪些跑在客户端时，你就已经超越了 80% 的 React 新手。

如果你准备好了，现在就按照上面的命令装一个试试，在 `app/page.tsx` 里随便改点文字，看看热更新有多快。遇到任何报错，随时把截图发我，我带你排坑！🚀