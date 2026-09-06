---
  outline: [2,5]
---
<div style="display: flex; justify-content: center; align-items: center; text-align: center">
   <h1>Next.js</h1> <Badge type="warning" text="熟练" /> <img src='/nextjs.png' style="margin-left:10px;width:50px"/>
</div>

`“技术分享章节的所有内容，均源自作者个人的学习心得与整理。在此，诚挚地邀请各位读者审阅，若您发现其中有任何错误或不足之处，敬请不吝赐教，及时指出，以便不断修正和完善。”`

## 一、Next.js 概述

Next.js 是由 Vercel 团队开发的 React 框架，它提供了开箱即用的解决方案，包括服务端渲染(SSR)、静态站点生成(SSG)、API 路由、图像优化等强大功能。Next.js 已经成为构建现代 Web 应用的首选框架之一。

### 核心优势
- **混合渲染**：支持 SSR、SSG 和客户端渲染的灵活组合
- **零配置**：内置 Webpack、Babel、路由等，减少配置负担
- **性能优化**：自动代码分割、预渲染、图像优化等
- **全栈能力**：内置 API 路由，无需单独后端服务
- **TypeScript 支持**：原生支持 TypeScript

## 二、核心技术与特性

### 1. 预渲染策略

Next.js 提供两种预渲染方式：

**静态生成(SSG)**
```javascript
// 页面内容在构建时生成
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data }, // 将作为props传递给页面组件
    revalidate: 10, // 可选：启用增量静态再生(ISR)
  };
}
```

**服务端渲染(SSR)**
```javascript
// 每次请求时生成页面
export async function getServerSideProps(context) {
  const { params, req, res } = context;
  
  const userData = await getUserData(req.headers.cookie);
  
  return {
    props: { userData },
  };
}
```

### 2. 增量静态再生(ISR)

ISR 允许在构建后更新静态页面：
```javascript
export async function getStaticProps() {
  return {
    props: { /* ... */ },
    revalidate: 60, // 最多每60秒重新生成一次
  };
}
```

### 3. 图像优化

Next.js 提供了自动优化的 Image 组件：
```jsx
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Profile"
  width={500}
  height={500}
  priority // 预加载重要图像
  placeholder="blur" // 加载时显示模糊占位
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## 三、路由系统

Next.js 使用基于文件系统的路由，无需额外配置。

### 1. 基本路由

- `pages/index.js` → `/`
- `pages/about.js` → `/about`
- `pages/blog/first-post.js` → `/blog/first-post`

### 2. 动态路由

- `pages/blog/[slug].js` → `/blog/:slug` (如 `/blog/hello-world`)
- `pages/[username]/settings.js` → `/:username/settings` (如 `/john/settings`)
- `pages/post/[...all].js` → `/post/*` (捕获所有路由，如 `/post/2020/id/title`)

### 3. 路由API

```jsx
import { useRouter } from 'next/router';

function Component() {
  const router = useRouter();
  
  // 获取查询参数
  const { id } = router.query;
  
  // 编程式导航
  const handleClick = () => {
    router.push('/about?from=home', '/about'); // 第二个参数可选，用于美化URL
  };
  
  return <button onClick={handleClick}>Go to About</button>;
}
```

### 4. 路由预取

Next.js 自动预取视口内的链接：
```jsx
<Link href="/about" prefetch={false}> // 禁用预取
  About
</Link>
```

## 四、数据获取策略

Next.js 提供多种数据获取方法：

| 方法                | 执行时机           | 适用场景                     |
|---------------------|-------------------|----------------------------|
| getStaticProps      | 构建时            | 静态内容、CMS数据           |
| getStaticPaths      | 构建时            | 动态路由的静态生成          |
| getServerSideProps  | 每次请求时        | 个性化内容、敏感数据        |
| 客户端获取          | 客户端渲染时      | 用户特定数据、频繁更新内容  |

## 五、API 路由

Next.js 允许在 `pages/api` 目录下创建 API 端点：

```javascript
// pages/api/user.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ name: 'John Doe' });
  } else if (req.method === 'POST') {
    // 处理POST请求
    res.status(201).json({ success: true });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

## 六、高级特性

### 1. 中间件 (Middleware)

Next.js 12+ 引入了中间件，允许在请求完成前运行代码：

```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}
```

### 2. 按需增量静态再生(On-demand ISR)

```javascript
// 在API路由中触发重新验证
await res.revalidate('/path-to-revalidate');
```

### 3. 布局与嵌套路由 (Next.js 13+ App Router)

Next.js 13 引入了基于文件系统的布局：

```
app/
  layout.js        # 共享布局
  page.js         # 页面内容
  blog/
    layout.js     # 博客特定布局
    page.js       # 博客首页
    [slug]/
      page.js     # 单篇博客文章
```

## 七、性能优化

1. **代码分割**：自动按页面分割代码
2. **预加载**：自动预加载视口内的链接资源
3. **字体优化**：自动内联关键CSS并预加载字体
4. **脚本优化**：`next/script` 组件优化第三方脚本加载

```jsx
import Script from 'next/script';

<Script 
  src="https://example.com/script.js"
  strategy="lazyOnload" // 或 'afterInteractive' | 'beforeInteractive'
  onLoad={() => console.log('Script loaded')}
/>
```

## 八、部署与配置

### 1. 部署选项

- **Vercel**：一键部署，最佳体验
- **Node.js 服务器**：`next start`
- **静态导出**：`next export` (纯静态站点)
- **Docker**：容器化部署

### 2. 自定义配置

`next.config.js` 示例：

```javascript
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // 允许优化的图片域名
  },
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
};
```

## 九、最佳实践

1. **页面组织**：
   - 将页面放在 `pages` 目录
   - 通用组件放在 `components` 目录
   - 样式放在 `styles` 目录

2. **数据获取**：
   - 优先考虑静态生成
   - 对个性化内容使用服务端渲染
   - 对频繁更新内容使用客户端获取+SWR

3. **性能**：
   - 使用 `next/image` 优化图片
   - 使用动态导入懒加载组件
   - 使用 `next/dynamic` 按需加载重组件

```jsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('../components/HeavyComponent'),
  { 
    loading: () => <p>Loading...</p>,
    ssr: false // 禁用服务端渲染
  }
);
```

## 十、未来方向

Next.js 持续演进，值得关注的趋势：

1. **React Server Components**：更高效的服务端组件模型
2. **Turbopack**：基于 Rust 的极速打包工具
3. **Edge Functions**：边缘计算的无服务器函数
4. **Metadata API**：改进的SEO和元数据管理

## 结语

Next.js 通过简化开发流程和提供强大的开箱即用功能，极大地提高了 React 应用的开发效率和性能。无论是简单的静态网站还是复杂的全栈应用，Next.js 都能提供合适的解决方案。随着框架的不断演进，它正在重新定义现代 Web 开发的边界。