import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: '/GW_Admin/favicon.ico' }]
  ],
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
    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '业务项目', link: '/front-end' },
      { text: '学习分享', link: '/work' },
      { text: '博客', link: 'https://blog.csdn.net/m0_46833693' },
      { text: '联系作者', 
        items: [
          {
            text: '作者邮箱-17789424151@163.com',
            link: 'https://mail.163.com/',  // 修改为网易邮箱的URL
            target: '_blank',  // 通常建议在新标签页中打开外部链接
            rel: 'noopener noreferrer'  // 提高安全性，防止新页面通过opener属性访问原始页面
          }
        ]
       },
    ],
    sidebar: {
      '/front-end/': [
        {
          text: '工业自动化与信息化集成项目',
          items: [
            { text: '奎屯中区污水厂智慧水务项目', link: '/front-end/'  },
            { text: '企业官网项目', link: '/front-end/website'  },
            { text: '低压配电室智能运维系统', link: '/front-end/power' },
            { text: '中粮番茄生产管理平台', link: '/front-end/tomato' },
            { text: '东方驼铃食品自动控料系统', link: '/front-end/food' },  
            { text: 'M-inDH数据采集网关', link: '/front-end/gateway' },  
          ]
        },
        {
          text: '信息化系统项目',
          items: [
            { text: '踢球吧管理系统', link: '/front-end/kick' },
            { text: '好麦司机端小程序', link: '/front-end/hmc' },
          ]
        }
      ],
      '/work/': [
        {
          text: '学习分享',
          items: [
            { text: '前端发展史', link: '/work/' },
          ]
        },
        { text: '技术分享',
          items:[
            { text: '1. 前端必备技能', link: '/work/hcj' },
            { text: '2. TypeScript', link: '/work/ts' },
            { text: '3. Three.js', link: '/work/threejs' },
            { text: '4. Vue', link: '/work/v3' },
            { text: '5. HarmonyOS', link: '/work/hm' },
            { text: '6. React', link: '/work/react' },
            { text: '7. CI/CD（Jenkins/Docker）', link: '/work/cicd' },
            { text: '8. 小程序', link: '/work/applet' },
            { text: '9. Next.js', link: '/work/next' },
            { text: '10. Electron', link: '/work/electron' },
            { text: '11. Node.js', link: '/work/node' },
            { text: '12. 若依入门（Springboot版）', link: '/work/ry' },
            { text: '13. 前端工程化', link: '/work/buildTool' },
            { text: '14. VitePress', link: '/work/vitepress'  },
          ]
         },
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
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2023-2025 高云吉'
    },
    
    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // },
    // 自定义出现在上一页和下一页链接上方的文本
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
})
