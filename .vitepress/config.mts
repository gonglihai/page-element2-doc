import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Page.vue",
  description: "Page.vue Development Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '起步', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '起步',
        items: [
          { text: '安装', link: '/markdown-examples' },
          { text: '默认配置', link: '/api-examples' },
          { text: '引入', link: '/api-examples' }
        ]
      },
      {
        text: 'Page.vue',
        items: [
          { text: '可以做什么', link: '/doc/可以做什么' },
          { text: 'Search 查询条件', link: '/doc/search' },
          { text: 'Table 数据表格', link: '/doc/table' },
          { text: 'Button 操作按钮', link: '/doc/button' },
          { text: 'Tree 左侧树', link: '/doc/tree' },
          { text: 'Form 表单', link: '/doc/form' },
          { text: '例子', link: '/doc/example' },
          { text: '全局配置', link: '/doc/全局配置' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    // 搜索
    search: {
      provider: 'local'
    }
  }
})
