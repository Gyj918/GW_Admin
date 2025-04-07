---
# doc/home/page
layout: home

hero:
  name: "GW_Admin"
  text: "在心里种花，人生才不会荒芜"
  tagline: Ruoyi贡献者 | Code Pal作者 | 鸿蒙高级工程师
  image:
    src: /back.png
    alt: GW_Admin
  actions:
    - theme: brand
      text: 业务项目
      link: /front-end/
    - theme: alt
      text: 知识库
      link: /work

features:
  - icon: <img src="deepseek.svg" alt="AI"/>
    title: Code Pal-VSCode Extension
    details: 一只住在编辑器里的电子宠物，陪伴你的编程之旅，随着代码成长！
    link: /projects/Ai
    linkText: 查看更多
  - icon: <img src="Vue.svg" alt="Vue"/>
    title: Vue3 项目
    details: Vue3实战，打造个性化前端应用
    link: /projects/Vue
    linkText: 查看更多
  - icon: <img src="hm.svg" alt="鸿蒙"/>
    title: HarmonyOS 项目
    details: 华为鸿蒙系统应用，跨界融合新体验
    link: /projects/HarmonyOS
    linkText: 查看更多
  - icon: <img src="react.svg" alt="React"/>
    title: React 项目
    details: React实战，构建动态个人作品集
    link: /projects/React
    linkText: 查看更多
  - icon: <img src="Node.svg" alt="Node"/>
    title: Node.js 项目
    details: Node.js实战，构建强大的后端服务
    link: /projects/Node
    linkText: 查看更多
  - icon: <img src="uni-app.svg" alt="uni-app"/>
    title: uni-app 项目
    details: uni-app实战，个性化小程序应用
    link: /projects/uni-app
    linkText: 查看更多
  - icon: <img src="qianduan.svg" alt="web"/>
    title: 脚手架项目
    details: 前端脚手架，助力团队开发效率
    link: /projects/Scaffold
    linkText: 查看更多
  - icon: <img src="next.svg" alt="Next"/>
    title: Next.js项目
    details: Next.js实战，构建高性能的全栈应用
    link: /projects/Next
    linkText: 查看更多 
---
<div class="tech-container">
  <div class="video-container">
    <video 
      src="/jg.mp4" 
      autoplay 
      loop 
      muted 
      controls
      class="custom-video"
    ></video>
  </div>
</div>


<script setup>
import { VPTeamMembers } from 'vitepress/theme'
const gitee = '<?xmla version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8b0305" d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"  /></svg>'
const members = [
  {
    avatar: 'https://img1.baidu.com/it/u=2466518643,3126006331&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
    name: '高国强',
    title: 'Java工程师',
    links: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
      { icon: {svg: gitee}, link: 'https://gitee.com/Gyj918' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/102406694?v=4',
    name: '高云吉',
    title: '软件工程师',
    links: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
      { icon: {svg:gitee},link: 'https://gitee.com/gao_yunji' },
    ]
  },
  {
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0f191624-b88c-4c54-9b5c-139ce1cbe167%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1735117062&t=124e869bf1fc469d6f175fb62a86c554',
    name: '王倩蓉',
    title: 'UI设计师',
    links: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
    ]
  },
  {
    avatar: 'https://bpic.51yuansu.com/pic3/cover/00/80/05/58c79a361a861_610.jpg',
    name: '陈财',
    title: '测试工程师',
    links: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
    ]
  },
]
</script>

## 团队成员

专注实战，以高效协作打造优质软件解决方案

<VPTeamMembers size="small" :members="members" />




<style>
.tech-container {
  background: linear-gradient(145deg, #0a0a1a, #1a1a2e);
  padding: 40px 20px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
}

.tech-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 255, 204, 0.2),
    transparent
  );
  animation: slide 6s linear infinite;
}

.video-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 204, 0.3);
}

.video-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    transparent, #00ffcc, transparent 30%
  );
  animation: rotate 6s linear infinite;
}

.custom-video {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes slide {
  from {
    left: -100%;
  }
  to {
    left: 100%;
  }
}

.tech-container:hover::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 0, 204, 0.2),
    rgba(0, 255, 204, 0.2),
    transparent
  );
}
</style>