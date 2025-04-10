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
    link: /projects/AI
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

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
const gitee = '<?xmla version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8b0305" d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"  /></svg>'
const members = [
  {
    avatar: '/GW_Admin/member/x.jpeg',
    name: '许东泰',
    title: '售前工程师',
    links: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
    ]
  },
  {
    avatar: '/GW_Admin/member/l.jpeg',
    name: '李昌辉',
    title: '产品策划',
    links: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
    ]
  },
  {
    avatar: '/GW_Admin/member/w.jpg',
    name: '王倩蓉',
    title: 'UI/UX设计师',
    links: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
    ]
  },
  {
    avatar: 'https://img1.baidu.com/it/u=2466518643,3126006331&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
    name: '高国强',
    title: 'Java高级工程师',
    links: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
      { icon: {svg: gitee}, link: 'https://gitee.com/Gyj918' }
    ]
  },
  {
    avatar: '/GW_Admin/member/g.jpg',
    name: '高云吉',
    title: '全栈工程师',
    links: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
      { icon: {svg:gitee},link: 'https://gitee.com/gao_yunji' },
    ]
  },
  {
    avatar: '/GW_Admin/member/c.jpg',
    name: '陈财',
    title: '测试工程师',
    links: [
      { icon: 'github', link: 'https://github.com/Gyj918' },
    ]
  },
  
]
</script>



## <i class="icon-title icon-timeline"></i> 发展历程

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2025.04</div>
    <div class="timeline-card">
      <h3>Code Pal 发布</h3>
      <p>成功发布VSCode扩展Code Pal，一只住在编辑器里的电子宠物，陪伴你的编程之旅，随着代码成长！</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-date">2024.12</div>
    <div class="timeline-card">
      <h3>鸿蒙应用上线</h3>
      <p>首个HarmonyOS应用在华为应用市场发布，拓展Ruoyi生态，成功入选Ruoyi生态库</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-date">2024.11</div>
    <div class="timeline-card">
      <h3>开源贡献</h3>
      <p>成为Ruoyi框架核心贡献者，参与了多个核心模块的开发和优化</p>
    </div>
  </div>
</div>
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

## <i class="icon-title icon-team"></i> 团队成员

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
.timeline {
  position: relative;
  padding: 40px 0; /* 减少上下padding */
  margin: 1.5rem 0; /* 减少外边距 */
}

.timeline-item {
  position: relative;
  width: 46%;
  padding: 20px; /* 减少内边距 */
  margin-bottom: 20px; /* 减少卡片间距 */
  background: linear-gradient(145deg, rgba(30, 30, 50, 0.8), rgba(20, 20, 40, 0.9));
  border-radius: 12px; /* 调整圆角 */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateY(-5px); /* 减少位移 */
  box-shadow: 0 8px 24px rgba(100, 255, 218, 0.15); /* 调整阴影 */
  overflow: hidden;
}

.timeline-card h3 {
  font-size: 18px; /* 减小标题字体 */
  margin-bottom: 12px;
}

.timeline-card p {
  line-height: 1.6;
  font-size: 14px; /* 减小正文字体 */
}

.timeline-item:hover {
  background: linear-gradient(145deg, rgba(40, 40, 60, 0.9), rgba(30, 30, 50, 0.95));
  box-shadow: 0 15px 35px rgba(100, 255, 218, 0.25);
}

.timeline-card h3 {
  font-size: 22px;
  margin-bottom: 16px;
  position: relative;
  color: #00ffcc;
  text-shadow: 0 0 8px rgba(0, 255, 204, 0.5);
}

.timeline-card p {
  line-height: 1.8;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #00ffcc, #ff00cc);
  transform: translateX(-50%);
  border-radius: 2px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  top: 24px;
  width: 16px;
  height: 16px;
  background: #00ffcc;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 255, 204, 0.2);
}

.timeline-item:nth-child(odd) {
  left: 0;
}

.timeline-item:nth-child(odd)::before {
  right: -38px;
}

.timeline-item:nth-child(even) {
  left: 54%;
}

.timeline-item:nth-child(even)::before {
  left: -38px;
}

.timeline-date {
  font-size: 16px;
  font-weight: 600;
  color: #00ffcc;
  margin-bottom: 12px;
  padding: 6px 12px;
  background: rgba(0, 255, 204, 0.1);
  border-radius: 20px;
  display: inline-block;
}

.timeline-card h3 {
  font-size: 20px;
  margin-bottom: 16px;
  position: relative;
}

.timeline-card h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(to right, #00ffcc, #ff00cc);
}

.timeline-card p {
  line-height: 1.7;
  font-size: 15px;
}

@media (max-width: 768px) {
  .timeline-item {
    width: 100%;
    left: 0 !important;
    margin-bottom: 30px;
  }
  
  .timeline-item::before {
    display: none;
  }
}
/* 新增图标样式 */
.icon-title {
  display: inline-block;
  margin-right: 12px;
  vertical-align: middle;
}

.icon-timeline {
  width: 24px;
  height: 24px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%2300ffcc" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm1 1v6h5v2h-5v2h-2v-2H6v-2h5V5h2z"/></svg>');
}

.icon-team {
  width: 24px;
  height: 24px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%2300ffcc" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 3c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 7c2.21 0 4 1.79 4 4v1H8v-1c0-2.21 1.79-4 4-4z"/></svg>');
}

/* 修改h2标题颜色 */
h2 {
  display: flex;
  align-items: center;
  font-size: 28px;
  background: linear-gradient(120deg, #bd34fe 20%, #41d1ff 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 2rem 0 1.5rem;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 255, 204, 0.2);
}

h2::after {
  content: '';
  flex: 1;
  margin-left: 16px;
  height: 2px;
  background: linear-gradient(to right, rgba(0, 255, 204, 0.2), transparent);
}
</style>

