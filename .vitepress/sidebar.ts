import { readdirSync, statSync } from 'node:fs'
import { join, basename, extname } from 'node:path'

const CONTENT_DIR = join(process.cwd(), 'src/content/posts')

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

/**
 * 将文件名转换为可读的标题, 保留引号等特殊字符
 * e.g. "What's Bun"   -> "What's Bun"
 *      "typescript-tips"  -> "Typescript Tips"
 *      "nextjs-app-router" -> "Nextjs App Router"
 *      "gittea-vs-gitlab"  -> "Gittea vs Gitlab"
 */
function filenameToTitle(filename: string): string {
  const name = basename(filename, extname(filename))

  // 处理 index.md: 返回 "Overview"
  if (name === 'index') return 'Overview'

  // 将连字符/下划线替换为空格
  let title = name.replace(/[-_]/g, ' ')

  // 每个"单词"首字母大写, 但保留已有的大写字母和引号
  // 用 Unicode 感知的方式: 匹配字母序列(含 '), 首字母大写
  title = title.replace(/(^|\s)(\p{L})/gu, (_, space, letter) => space + letter.toUpperCase())

  return title
}

/**
 * 将分类名转换为可读标题
 */
function categoryToTitle(dirname: string): string {
  return dirname
    .replace(/[-_]/g, ' ')
    .replace(/(^|\s)(\p{L})/gu, (_, space, letter) => space + letter.toUpperCase())
}

/**
 * 递归扫描目录, 生成 sidebar 结构
 */
function scanDirectory(dir: string, basePath: string = ''): SidebarItem[] {
  let entries = readdirSync(dir, { withFileTypes: true })
    // 排序: 目录优先, 然后按名称
    .sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1
      return a.name.localeCompare(b.name)
    })

  const items: SidebarItem[] = []
  
  for (const entry of entries) {
    // 跳过首页和特殊文件
    if (entry.name === 'index.md' && basePath === '') continue
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue

    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      const subItems = scanDirectory(fullPath, `${basePath}/${entry.name}`)
      if (subItems.length > 0) {
        items.push({
          text: categoryToTitle(entry.name),
          collapsed: true,
          items: subItems,
        })
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // index.md 不在顶层时, 显示为 "Overview" 并链接到目录
      const isIndex = entry.name === 'index.md'
      const relativePath = `${basePath}/${basename(entry.name, '.md')}`
      const link = isIndex ? `${basePath}/` : relativePath

      items.push({
        text: isIndex ? 'Overview' : filenameToTitle(entry.name),
        link,
      })
    }
  }

  return items
}

/**
 * 生成导航栏配置
 */
export function generateNav() {
  const entries = readdirSync(CONTENT_DIR, { withFileTypes: true })
    .sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1
      return a.name.localeCompare(b.name)
    })

  const nav: { text: string; link: string }[] = [
    { text: 'Home', link: '/' },
  ]

  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue

    if (entry.isDirectory()) {
      // 子目录 -> 链接到该目录的 index.md, 或第一篇 md
      const indexPath = join(CONTENT_DIR, entry.name, 'index.md')
      try {
        statSync(indexPath)
        nav.push({ text: categoryToTitle(entry.name), link: `/${entry.name}/` })
      } catch {
        const subEntries = readdirSync(join(CONTENT_DIR, entry.name), { withFileTypes: true })
        const firstMd = subEntries.find((e) => e.isFile() && e.name.endsWith('.md'))
        if (firstMd) {
          nav.push({
            text: categoryToTitle(entry.name),
            link: `/${entry.name}/${basename(firstMd.name, '.md')}`,
          })
        }
      }
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
      nav.push({
        text: filenameToTitle(entry.name),
        link: `/${basename(entry.name, '.md')}`,
      })
    }
  }

  return nav
}

/**
 * 生成侧边栏配置
 */
export function generateSidebar() {
  return scanDirectory(CONTENT_DIR)
}
