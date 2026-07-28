import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src/content/posts",
  base: "/next_blog",
  title: "Bun is better",
  description: "Just playing around.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Typescript', link: '/typescript-tips' },
      { text: 'Devops', link: '/gittea-vs-gitlab' },
      { text: 'Bun', link: '/What\'s Bun' }
    ],
    lastUpdated: {
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short'
      }
    },
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
