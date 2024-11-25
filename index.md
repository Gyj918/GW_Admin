---
# doc/home/page
layout: home

hero:
  name: "GW_Admin"
  text: "在心里种花，人生才不会荒芜"
  tagline: 那就让我们相约，在不久的将来，能够再次相见
  image:
    src: /background.png
    alt: GW_Admin
  actions:
    - theme: brand
      text: 个人简历
      link: /front-end
    - theme: alt
      text: 快速开始
      link: /work

features:
  - icon: 🛠️
    title: 核心功能
    details: 每一项都经过精心设计，以满足多样化的需求
    # link: /api-examples
    # linkText: 查看更多
  - icon: 🧑‍💻
    title: 技术亮点
    details: 采用React+TypeScript，确保高效、稳定、可扩展
    # link: /api-examples
    # linkText: 查看更多
  - icon: 🚀
    title: 用户体验
    details: 简洁直观的操作界面，让每个人都能轻松上手
    # link: /api-examples
    # linkText: 查看更多

---


<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://img1.baidu.com/it/u=221734957,3053911785&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
    name: '刘卓',
    title: '电气工程师',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  {
    avatar: 'https://img1.baidu.com/it/u=211684657,169996888&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800',
    name: '高云吉',
    title: '软件工程师',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  {
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0f191624-b88c-4c54-9b5c-139ce1cbe167%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1735117062&t=124e869bf1fc469d6f175fb62a86c554',
    name: '王倩蓉',
    title: '赞助商',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  {
    avatar: 'https://iknow-pic.cdn.bcebos.com/a71ea8d3fd1f4134d3166ee0371f95cad1c85e0e',
    name: '陈财',
    title: '消防工程师',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
]
</script>

## 团队成员

三百六十行，行行干破防

<VPTeamMembers size="small" :members="members" />
