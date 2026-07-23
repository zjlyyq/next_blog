---
title: 'Next.js App Router 深入理解'
date: '2026-07-22'
tags: ['Next.js', 'React', '前端']
description: '深入探讨 Next.js 15 的 App Router 架构、服务端组件和路由模式。'
published: true
---

# Next.js App Router 深入理解

Next.js 15 的 App Router 带来了全新的路由模式和渲染策略。

## 服务端组件

App Router 默认使用服务端组件（RSC），这意味着组件在服务端渲染，减少客户端 JavaScript。

```tsx
// 这是一个服务端组件
async function PostList() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## 客户端组件

当需要交互时，使用 `"use client"` 指令：

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## 布局系统

App Router 的布局可以嵌套，并且跨路由保持状态：

- `layout.tsx` - 共享布局
- `template.tsx` - 每次导航重新挂载
- `loading.tsx` - 加载状态
- `error.tsx` - 错误边界
