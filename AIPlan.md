# 个人博客网站搭建计划

基于 **Next.js 16.2.11** (App Router) + **TypeScript** + **Tailwind CSS v4** 搭建个人博客网站。项目已有基础脚手架，需要从零构建完整的博客功能。

---

## 需求回顾

- **内容来源**：本地 Markdown 文件
- **功能**：标签/分类系统、评论功能 (Giscus)、站内搜索、暗色模式
- **页面**：博客文章 + 关于我 + 作品集等
- **其他**：SEO 优化

---

## 1. 技术选型

| 用途 | 库 | 说明 |
|------|----|------|
| Markdown 解析 | remark + remark-html 或 react-markdown | 解析 MD 为 HTML/React |
| 代码高亮 | rehype-pretty-code 或 rehype-highlight | 代码块语法高亮 |
| Frontmatter | gray-matter | 解析 Markdown 头部元数据 |
| 全文搜索 | fuse.js | 轻量前端模糊搜索，无需后端 |
| 日期处理 | 原生 Intl / dayjs | 格式化文章日期 |
| RSS 生成 | feed | 生成 RSS/Atom 订阅 |
| 评论 | Giscus (GitHub Discussions) | 无需自建后端 |
| 图标 | lucide-react | 轻量图标库 |

### 安装命令

```bash
pnpm add react-markdown remark-gfm rehype-pretty-code rehype-slug gray-matter fuse.js feed lucide-react
pnpm add -D @types/gray-matter
```

---

## 2. 目录结构

```
web/src/
├── app/
│   ├── layout.tsx            # 根布局（主题、字体、全局样式）
│   ├── page.tsx              # 首页（文章列表 + 分页）
│   ├── page/[num]/page.tsx   # 分页
│   ├── posts/
│   │   └── [slug]/page.tsx   # 文章详情页
│   ├── tags/
│   │   ├── page.tsx          # 所有标签
│   │   └── [tag]/page.tsx    # 标签筛选
│   ├── about/page.tsx        # 关于我
│   ├── projects/page.tsx     # 作品集
│   ├── search/page.tsx       # 搜索结果页
│   ├── feed.xml/route.ts     # RSS 订阅
│   └── globals.css
├── components/
│   ├── Header.tsx            # 顶部导航（含主题切换）
│   ├── Footer.tsx            # 页脚
│   ├── PostCard.tsx          # 文章卡片
│   ├── PostList.tsx          # 文章列表容器
│   ├── TagBadge.tsx          # 标签徽章
│   ├── TagCloud.tsx          # 标签云
│   ├── SearchDialog.tsx      # 搜索弹窗
│   ├── ThemeToggle.tsx       # 主题切换按钮
│   ├── Pagination.tsx        # 分页组件
│   ├── Giscus.tsx            # Giscus 评论组件
│   ├── MarkdownRenderer.tsx  # Markdown 渲染器
│   └── MobileNav.tsx         # 移动端导航
├── lib/
│   ├── posts.ts              # 文章读取 & 工具函数
│   ├── constants.ts          # 常量（站点信息、导航配置）
│   └── utils.ts              # 通用工具函数
└── content/
    ├── posts/                # 博客文章 (.md)
    │   ├── hello-world.md
    │   └── ...
    └── pages/                # 独立页面 (.md)
        ├── about.md
        └── projects.md
```

---

## 3. 路由设计

| 路由 | 类型 | 说明 |
|------|------|------|
| `/` | 静态/动态 | 首页，最新文章列表，每页 N 篇 |
| `/page/[num]` | 动态 | 分页 |
| `/posts/[slug]` | 动态 (SSG) | 文章详情，生成静态路径 |
| `/tags` | 静态 | 所有标签及文章数 |
| `/tags/[tag]` | 动态 (SSG) | 按标签筛选文章 |
| `/about` | 静态 | 关于我页面 |
| `/projects` | 静态 | 作品集页面 |
| `/search` | 客户端 | 搜索页面，使用 Fuse.js |
| `/feed.xml` | 动态路由 | RSS/Atom 订阅 |

---

## 4. 数据流设计

### Markdown 文件读取

```typescript
// lib/posts.ts

// 文章 Frontmatter 类型
interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  published: boolean;
}

// 读取所有文章元数据
function getAllPosts(): PostMeta[] {
  // 读取 content/posts/ 下所有 .md 文件
  // 用 gray-matter 解析 frontmatter
  // 按日期排序，过滤未发布的
}

// 读取单篇文章（含内容）
function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  // 读取 content/posts/{slug}.md
  // 返回 frontmatter + 原始 Markdown 内容
}

// 获取所有标签及计数
function getAllTags(): { name: string; count: number }[] {
  // 遍历所有文章，聚合标签
}

// 分页
function getPostsByPage(page: number, pageSize: number): {
  posts: PostMeta[];
  total: number;
  totalPages: number;
}
```

### 构建策略

- **文章列表页**：`generateStaticParams` 预生成所有分页
- **文章详情页**：`generateStaticParams` 预生成所有文章，`generateMetadata` 动态生成 SEO meta
- **标签页**：`generateStaticParams` 预生成所有标签页面
- **搜索页**：客户端渲染，构建时生成搜索索引 JSON

---

## 5. 核心组件设计

### Layout 组件树

```
RootLayout
├── ThemeProvider (客户端组件，管理主题状态)
│   ├── Header
│   │   ├── Logo / Site Name
│   │   ├── Nav Links (首页 / 标签 / 关于 / 作品集)
│   │   ├── SearchButton → 打开 SearchDialog
│   │   └── ThemeToggle
│   ├── Main Content (children)
│   └── Footer
```

### 首页组件树

```
HomePage
├── Hero / 欢迎区域
├── PostList
│   ├── PostCard (×N)
│   │   ├── 标题
│   │   ├── 日期
│   │   ├── 描述摘要
│   │   └── TagBadge (×N)
│   └── Pagination
```

### 文章详情页

```
PostPage
├── 文章标题
├── 发布日期
├── TagBadge (×N)
├── MarkdownRenderer (react-markdown + rehype-pretty-code)
├── Giscus (评论)
└── 上一篇 / 下一篇导航
```

---

## 6. 暗色模式

### 实现方案

使用 Tailwind CSS v4 的 `dark` class 策略 + `next-themes` 库：

```bash
pnpm add next-themes
```

1. `ThemeProvider` 包裹在 `<html>` 内，使用 `attribute="class"` 策略
2. 主题切换：`useTheme()` hook 的 `setTheme('dark'|'light'|'system')`
3. 避免闪烁：`next-themes` 内置 script 注入，在 React 加载前读取 `localStorage`
4. 持久化：自动保存到 `localStorage`

### CSS 变量

```css
/* globals.css */
:root {
  --bg: #ffffff;
  --fg: #171717;
  /* ... */
}

.dark {
  --bg: #0a0a0a;
  --fg: #ededed;
  /* ... */
}
```

---

## 7. 搜索实现

1. **构建时**：生成 `search-index.json`，包含所有文章的标题、描述、标签、内容摘要
2. **搜索页**：客户端加载索引，使用 `fuse.js` 进行模糊搜索
3. **搜索弹窗**：`SearchDialog` 组件，支持 `Cmd+K` 快捷键唤起

---

## 8. 评论功能 (Giscus)

1. 用户需在 GitHub 仓库开启 Discussions
2. 安装 Giscus App (https://github.com/apps/giscus)
3. 配置 `data-repo`、`data-repo-id`、`data-category`、`data-category-id`
4. 在 `Giscus.tsx` 组件中通过 `<script>` 或 React 方式加载

---

## 9. 实施步骤

### Step 1: 项目配置与依赖

- 安装所有依赖包
- 更新 `next.config.ts`（配置图片域名等）
- 更新 `globals.css`（主题变量）
- 创建 `lib/constants.ts`（站点配置）

### Step 2: 核心数据层

- 创建 `lib/posts.ts`（文章读取、解析、工具函数）
- 创建 `lib/utils.ts`
- 添加示例 Markdown 文章到 `content/posts/`

### Step 3: 布局与导航

- 创建 `components/Header.tsx`（导航 + 搜索按钮 + 主题切换）
- 创建 `components/Footer.tsx`
- 创建 `components/MobileNav.tsx`
- 创建 `components/ThemeToggle.tsx`
- 更新 `app/layout.tsx`（集成 ThemeProvider、Header、Footer）

### Step 4: 首页与文章列表

- 创建 `components/PostCard.tsx`
- 创建 `components/PostList.tsx`
- 创建 `components/Pagination.tsx`
- 创建 `components/TagBadge.tsx`
- 更新 `app/page.tsx`（首页文章列表）
- 创建 `app/page/[num]/page.tsx`（分页）

### Step 5: 文章详情页

- 创建 `components/MarkdownRenderer.tsx`
- 创建 `app/posts/[slug]/page.tsx`（含 `generateStaticParams`、`generateMetadata`）

### Step 6: 标签系统

- 创建 `components/TagCloud.tsx`
- 创建 `app/tags/page.tsx`
- 创建 `app/tags/[tag]/page.tsx`

### Step 7: 独立页面

- 创建 `content/pages/about.md`
- 创建 `content/pages/projects.md`
- 创建 `app/about/page.tsx`
- 创建 `app/projects/page.tsx`

### Step 8: 搜索功能

- 创建搜索索引生成脚本
- 创建 `components/SearchDialog.tsx`
- 创建 `app/search/page.tsx`

### Step 9: 评论功能

- 创建 `components/Giscus.tsx`
- 集成到文章详情页

### Step 10: RSS & SEO

- 创建 `app/feed.xml/route.ts`
- 完善各个页面的 metadata
- 添加 sitemap 生成

---

## 10. 验证方式

1. `pnpm run dev` 启动开发服务器
2. 访问首页查看文章列表
3. 点击文章进入详情页
4. 测试标签筛选功能
5. 测试搜索功能
6. 测试暗色模式切换
7. `pnpm run build` 确认构建成功
8. 检查 RSS `/feed.xml` 可访问
