import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Page.vue",
  description: "Page.vue Development Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '文档', link: '/doc/page.vue/page' },
      { text: '使用示例', link: 'https://page-element2-example.glh.red' },
      { text: '变更日志', link: 'https://github.com/gonglihai/page-element2/blob/main/changelog.md' }
    ],
    sidebar: [
      {
        text: '起步',
        items: [
          { text: '安装', link: '/doc/起步/安装' },
          { text: '快速上手', link: '/doc/起步/快速上手' },
          { text: 'request 请求', link: '/doc/起步/request 请求' },
          { text: '全局配置', link: '/doc/起步/全局配置' }
        ]
      },
      {
        text: 'Page.vue',
        items: [
          { text: 'Page.vue', link: '/doc/page.vue/page' },
          { text: 'search 查询条件', link: '/doc/page.vue/search' },
          { text: 'button 操作按钮', link: '/doc/page.vue/button' },
          { text: 'table 数据表格', link: '/doc/page.vue/table' },
          { text: 'tree 左侧树', link: '/doc/page.vue/tree' },
        ]
      }
    ],
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    lastUpdated: {
      text: '上次更新',
    },
    outline: {
      level: [2, 3],
      label: '页面导航'
    },
    editLink: {
      pattern: 'https://github.com/gonglihai/page-element2-doc/tree/main/:path',
      text: '在 GitHub 上编辑此页'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/gonglihai/page-element2' }
    ],
    // 搜索
    search: {
      provider: 'local'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
  },
  markdown: {
    lineNumbers: true
  }
})
