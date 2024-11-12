---
# doc/home/page
layout: home

hero:
  name: "GW_Admin"
  text: "引领未来，共筑开源新篇章"
  tagline: GW_Admin项目名是一款开源项目，旨在解决指定场景问题。为行业带来了前所未有的体验和价值
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
    avatar: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0830%2Fa17a6600j00sj0z7700tzd000o000t6p.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
    name: '刘卓',
    title: '电气工程师',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  {
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2FO1CN01OUZsfZ1bi8P2PQJWA_%21%212218067803498-0-cib.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729398570&t=585b8bee47482cb8e1f677762946c682',
    name: '高云吉',
    title: '软件工程师',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  {
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2FO1CN01OUZsfZ1bi8P2PQJWA_%21%212218067803498-0-cib.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729398570&t=585b8bee47482cb8e1f677762946c682',
    name: '王倩蓉',
    title: '赞助商',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  {
    avatar: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0830%2Fa17a6600j00sj0z7700tzd000o000t6p.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
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
