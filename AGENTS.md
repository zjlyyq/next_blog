# Repository Guidelines

## Project Overview

`next_web` is a personal blog built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Content is authored as local Markdown files. pnpm is the package manager; keep `pnpm-lock.yaml` in sync.

## Project Structure & Module Organization

- `src/app/` — App Router pages and API routes (e.g., `feed.xml/route.ts`, `search/`).
- `src/components/` — shared React components (`ui/` holds primitives).
- `src/content/posts/` — Markdown blog posts, organized by topic; post images live in the post's `assets/` folder.
- `src/content/pages/` — content for static pages (about, projects).
- `src/types/` — shared TypeScript types.
- `public/` — static assets served at the site root.

Import project code with the `@/*` alias, which maps to `src/*`.

## Build, Test, and Development Commands

- `pnpm dev` — start the dev server at http://localhost:3000.
- `pnpm build` — production build (Next.js type-checks during build).
- `pnpm start` — serve the production build.
- `pnpm lint` — run ESLint (`eslint-config-next` core-web-vitals and TypeScript presets).
- `pnpm docs:dev` / `docs:build` / `docs:preview` — develop, build, and preview the VitePress docs site.

## Coding Style & Naming Conventions

- TypeScript runs in `strict` mode; use the `@/*` path alias instead of relative imports.
- Name components with PascalCase (`SearchPageClient.tsx`); keep route folders kebab-case (`feed.xml/route.ts`).
- Prefer typed props, and add `"use client"` only to components that need browser APIs or state.
- Run `pnpm lint` before committing; fix warnings rather than suppressing them.

## Testing Guidelines

No test framework is configured yet, and there is no `test` script. Verify changes with `pnpm lint` and `pnpm build`. If you add tests, place them beside the code (e.g., `src/components/Pagination.test.tsx`) and add a corresponding `test` script.

## Commit & Pull Request Guidelines

- Keep commit messages short and descriptive, matching existing history: Chinese summaries (e.g., `sync`, `增加文档`) or Conventional Commit prefixes (`feat:`, `docs:`).
- Make one logical change per commit; small "sync" commits are fine for content-only updates.
- In pull requests, explain what and why, link related issues, include screenshots for UI changes, and confirm `pnpm lint` and `pnpm build` pass.

## Agent-Specific Instructions

- Read `AIPlan.md` before making architectural changes.
- Edit files with `apply_patch`; never modify `.env.local` or user-authored posts.
- Add new posts under `src/content/posts/<topic>/` and preserve existing content.
