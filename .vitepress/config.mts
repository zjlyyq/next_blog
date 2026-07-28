import { defineConfig } from 'vitepress'
import { generateNav, generateSidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src/content/posts",
  base: "/next_blog",
  title: "Bun is better",
  description: "Just playing around.",

  // 自动生成侧边栏
  themeConfig: {
    nav: generateNav(),
    sidebar: generateSidebar(),

    lastUpdated: {
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short'
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zjlyyq/next_blog' }
    ]
  }
})
