---
title: 'Tailwind CSS v4 新特性'
date: '2026-07-20'
tags: ['CSS', 'Tailwind', '前端']
description: 'Tailwind CSS v4 带来了全新的引擎和 API，本文介绍主要变化。'
published: true
---

# Tailwind CSS v4 新特性

Tailwind CSS v4 是一次重大的版本更新，带来了全新的 CSS-first 配置方式。

## CSS-first 配置

在 v4 中，不再需要 `tailwind.config.js`，而是直接在 CSS 中配置：

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
}
```

## 新的变体语法

```css
@custom-variant dark (&:where(.dark, .dark *));
```

## 性能提升

v4 使用了新的引擎，构建速度提升了数倍。不再需要 PostCSS 插件，直接使用 Lightning CSS。

## 迁移要点

1. 移除 `tailwind.config.js`
2. 使用 `@import "tailwindcss"` 替代 `@tailwind` 指令
3. 用 `@theme` 定义主题变量
4. 用 `@custom-variant` 定义自定义变体
