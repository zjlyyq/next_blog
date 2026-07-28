---
title: 'TypeScript 高级类型技巧'
date: '2026-07-18'
tags: ['TypeScript', '前端']
description: '分享一些实用的 TypeScript 高级类型技巧和模式。'
published: true
---

# TypeScript 高级类型技巧

## 条件类型

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<'hello'>; // true
type B = IsString<42>;       // false
```

## 映射类型

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## 模板字面量类型

```typescript
type EventName = `on${Capitalize<string>}`;
// 'onChange' | 'onClick' | ...
```

## infer 关键字

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = (x: number) => string;
type R = ReturnType<Fn>; // string
```
