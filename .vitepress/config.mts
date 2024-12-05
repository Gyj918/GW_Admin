import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/gw.ico' }]],
  base: '/GW_Admin/',
  title: "GW_Admin",
  // titleTemplate: ':title - Custom Suffix',
  description: "GW",
  themeConfig: {
    logo: '/gw.png',
    // siteTitle: false,
    // 搜索
    search: {
      provider: 'local'
    },
    // 广告
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },
    nav: [
      { text: '首页', link: '/' },
      { text: '前端视野', link: '/front-end' },
      { text: '工作内容', link: '/work' },
      { text: '博客', link: 'https://blog.csdn.net/m0_46833693' },
      // {
      //   text: '加入我们',
      //   items: [
      //     { text: '人才招聘', link: 'https://blog.csdn.net/m0_46833693/article/details/140517776', target: '_self', rel: 'sponsored' },
      //     { text: '联系我们', link: '/markdown-examples' }
      //   ]
      // },
    ],
    sidebar: {
      '/front-end/': [
        {
          text: '前端',
          items: [
            { text: '必备技能', link: '/front-end/' },
            { text: '发展方向', link: '/front-end/life' },
            { text: '作者介绍', link: '/front-end/user' },
            {
              text: '技术栈',
              items: [
                { text: 'React', link: '...' },
                { text: 'Vue.js', link: '...' },
                { text: 'Angular', link: '...' },
                { text: 'jQuery', link: '...' },
                { text: 'Bootstrap', link: '...' },
                { text: 'Webpack', link: '...' },
                { text: 'Vite', link: '...' },
                { text: 'Zustand', link: '...' }
              ]
            },
          ]
        }
      ],
      '/work/': [
        {
          text: '工作内容',
          items: [
            { text: '现场工作', link: '/work/' },
            { text: '生活',
              items:[
                { text: '我的一天', link: '/work/scene' },
                { text: '刘卓的一天', link: '/work/lz' },
                { text: '陈财的一天', link: '/work/cc' },
              ]
             },
          ]
        }
      ]
    },
    // aside: 'left',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
      // 可以通过将 SVG 作为字符串传递来添加自定义图标
      {
        icon: {
          svg: '<?xmla version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8b0305" d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"  /></svg>'
        },
        link: 'https://gitee.com/gao_yunji',
        // 也可以为无障碍添加一个自定义标签 (可选但推荐):
        ariaLabel: 'cool link'
      }
    ],

    footer: {
      message: '本项目由 GYJ 开发，王倩蓉维护',
      copyright: 'Copyright © 2024-present GYJ'
    },

    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // },
    // 自定义出现在上一页和下一页链接上方的文本
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})
