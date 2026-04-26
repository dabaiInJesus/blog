import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'blog',
  description: '分享技术、工具与折腾',
  srcDir: 'src',
  lang: 'zh-CN',
  themeConfig: {
    logo: '/avatar.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '工具', link: '/tools/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dabaiInJesus' }
    ],
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'MIT Licensed | © 2026 大白'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }]
  ]
})
