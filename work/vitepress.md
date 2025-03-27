# VitePress 全面指南：现代化文档工具与 GitHub Pages 部署

## 一、VitePress 概述

VitePress 是基于 Vite 和 Vue 3 的静态网站生成器，专为文档场景优化。作为 VuePress 的轻量级替代品，它结合了 Vite 的极速开发体验和 Vue 3 的强大功能，GW_Admin网站就是基于VitePress构建。

### 核心优势：
- **闪电般快速**：基于 Vite 的即时热更新
- **Markdown 增强**：支持 Vue 组件和自定义扩展
- **主题定制**：灵活的主题系统和默认响应式设计
- **SSG 优化**：预渲染静态页面，超快加载速度
- **简单部署**：轻松发布到 GitHub Pages 等平台

## 二、项目初始化与配置

### 1. 创建项目

```bash
# 创建项目目录
mkdir vitepress-docs && cd vitepress-docs

# 初始化 package.json
npm init -y

# 安装 VitePress
npm install -D vitepress vue

# 初始化文档结构
npx vitepress init
```
初始化过程会提示配置：
- 项目名称
- 描述
- 主题选择
- 是否使用 TypeScript
- 是否添加 GitHub Actions 部署工作流

### 2. 目录结构

```
.
├── docs                    # 文档根目录
│   ├── .vitepress          # 配置目录
│   │   ├── config.js       # 主配置文件
│   │   ├── theme           # 自定义主题
│   │   └── index.js        # 主题入口文件
│   ├── public              # 静态资源
│   ├── index.md            # 首页
│   └── guide               # 文档章节
│       └── getting-started.md
├── package.json
└── node_modules
```

### 3. 基础配置

```js
// .vitepress/config.js
export default {
  title: 'My Awesome Project', // 网站标题
  description: 'A VitePress Site', // 网站描述
  base: '/my-repo/', // GitHub Pages 部署需要（仓库名）
  
  themeConfig: {
    nav: [ // 导航栏
      { text: 'Guide', link: '/guide/' },
      { text: 'Config', link: '/config/' },
      { text: 'GitHub', link: 'https://github.com/your/repo' }
    ],
    
    sidebar: [ // 侧边栏
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Configuration', link: '/guide/configuration' }
        ]
      }
    ],
    
    footer: { // 页脚
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Your Name'
    }
  }
}
```

## 三、Markdown 扩展功能

### 1. 内置增强

````markdown
<!-- 代码块高亮 -->
```js
console.log('Hello VitePress!')
```

<!-- 自定义容器 -->
::: tip
This is a tip
:::

::: warning
This is a warning
:::

<!-- 表格支持 -->
| Feature | Description |
|---------|-------------|
| Hot Reload | Instant updates |
| SSR | Server-side rendering |

<!-- 表情符号 -->
:rocket: :tada:
````

### 2. Vue 组件集成

```markdown
<!-- 直接在 Markdown 中使用 Vue 组件 -->
<Counter :initial="10" />

<script setup>
import Counter from '../components/Counter.vue'
</script>
```

### 3. 自定义扩展

```js
// .vitepress/config.js
import markdownItCustom from 'markdown-it-custom-plugin'

export default {
  markdown: {
    config: (md) => {
      md.use(markdownItCustom)
    }
  }
}
```

## 四、主题定制

### 1. 修改默认主题

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('MyGlobalComponent', /* ... */)
  }
}
```

```css
/* .vitepress/theme/custom.css */
:root {
  --vp-c-brand: #646cff;
  --vp-c-brand-light: #747bff;
  --vp-c-brand-dark: #535bf2;
  
  --vp-button-brand-border: var(--vp-c-brand-light);
  --vp-button-brand-hover-border: var(--vp-c-brand-light);
}

.dark {
  --vp-c-brand: #a5b4fc;
  --vp-c-brand-light: #818cf8;
}
```

### 2. 自定义布局

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #sidebar-nav-before>
      <div class="custom-nav">
        Custom sidebar content
      </div>
    </template>
    
    <template #doc-footer-before>
      <div class="custom-footer">
        <a href="/edit">Edit this page</a>
      </div>
    </template>
  </Layout>
</template>

<style>
.custom-nav {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
</style>
```

## 五、GitHub Pages 部署

### 1. 本地构建测试

```bash
# 开发模式
npm run docs:dev

# 生产构建
npm run docs:build

# 预览构建结果
npm run docs:preview
```

### 2. 自动部署配置

#### 方法一：使用 GitHub Actions（推荐）
WorkFlow file具体配置如下：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [master]

# 设置tokenn访问权限
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - name: Setup pnpm
        uses: pnpm/action-setup@v4 # 安装pnpm并添加到环境变量
        with:
          version: 8.6.12 # 指定需要的 pnpm 版本
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm # 设置缓存
      - name: Setup Pages
        uses: actions/configure-pages@v4  # 在工作流程自动配置GithubPages
      - name: Install dependencies
        run: pnpm install # 安装依赖
      - name: Build with VitePress
        run: |
          pnpm run docs:build # 启动项目
          touch .nojekyll  # 通知githubpages不要使用Jekyll处理这个站点，不知道为啥不生效，就手动搞了
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3  # 上传构建产物
        with:
          path: .vitepress/dist # 指定上传的路径，当前是根目录，如果是docs需要加docs/的前缀

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }} # 从后续的输出中获取部署后的页面URL
    needs: build    # 在build后面完成
    runs-on: ubuntu-latest  # 运行在最新版本的ubuntu系统上
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment  # 指定id
        uses: actions/deploy-pages@v4 # 将之前的构建产物部署到github pages中

```

#### 方法二：手动部署

1. 构建项目：
   ```bash
   npm run docs:build
   ```

2. 进入构建目录：
   ```bash
   cd docs/.vitepress/dist
   ```

3. 初始化 Git 并提交：
   ```bash
   git init
   git add -A
   git commit -m "deploy"
   ```

4. 推送到 gh-pages 分支：
   ```bash
   git push -f git@github.com:yourname/yourrepo.git main:gh-pages
   ```

### 3. 配置 GitHub Pages

1. 进入仓库的 **Settings** > **Pages**
2. 选择 **Source** 为 **GitHub Actions**（自动部署）或 **gh-pages** 分支（手动部署）
3. 如果配置了自定义域名，在 `docs/.vitepress/config.js` 中设置 `base: ''`

## 六、进阶功能

### 1. 多语言支持

```js
// .vitepress/config.js
export default {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'My Project',
      description: 'English description'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '我的项目',
      description: '中文描述'
    }
  },
  
  themeConfig: {
    locales: {
      '/': {
        nav: [
          { text: 'Guide', link: '/guide/' }
        ],
        sidebar: {
          '/guide/': [
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        }
      },
      '/zh/': {
        nav: [
          { text: '指南', link: '/zh/guide/' }
        ],
        sidebar: {
          '/zh/guide/': [
            { text: '快速开始', link: '/zh/guide/getting-started' }
          ]
        }
      }
    }
  }
}
```

### 2. 搜索功能

```bash
npm install -D @vitepress/plugin-search
```

```js
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import { SearchPlugin } from '@vitepress/plugin-search'

export default defineConfig({
  vite: {
    plugins: [
      SearchPlugin({
        placeholder: 'Search docs...',
        // 支持中文搜索
        tokenize: 'full'
      })
    ]
  }
})
```

### 3. 自定义 404 页面

```markdown
<!-- docs/404.md -->
---
layout: home
---

# 404

The page you're looking for doesn't exist.

<HomeLink />
```

## 七、性能优化

### 1. 异步加载组件

```vue
<!-- 在主题组件中 -->
<script setup>
import { defineAsyncComponent } from 'vue'

const HeavyComponent = defineAsyncComponent(() =>
  import('../components/HeavyComponent.vue')
)
</script>

<template>
  <HeavyComponent />
</template>
```

### 2. 图片优化

```markdown
<!-- 使用 Vite 的图片处理 -->
![Alt text](/image.png){width=600 height=400}
```

```js
// .vitepress/config.js
export default {
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // 拆分大依赖
            'vue': ['vue'],
            'markdown': ['markdown-it']
          }
        }
      }
    }
  }
}
```

## 八、常见问题解决

### 1. GitHub Pages 部署后样式丢失

确保 `config.js` 中正确设置了 `base`：
```js
export default {
  base: process.env.NODE_ENV === 'production' ? '/repository-name/' : '/'
}
```

### 2. 自定义域名配置

1. 在仓库 Settings > Pages 中设置 Custom domain
2. 在项目根目录添加 `CNAME` 文件：
   ```
   example.com
   ```
3. 更新 VitePress 配置：
   ```js
   export default {
     base: '/', // 设置为根路径
     head: [
       ['link', { rel: 'icon', href: '/favicon.ico' }]
     ]
   }
   ```

### 3. 构建时内存不足

修改构建脚本：
```json
{
  "scripts": {
    "docs:build": "node --max_old_space_size=4096 ./node_modules/vitepress/bin/vitepress.js build docs"
  }
}
```

## 九、VitePress 生态

### 1. 官方插件
- `@vitepress/plugin-search` - 本地搜索
- `@vitepress/plugin-mermaid` - 图表支持
- `@vitepress/plugin-pwa` - PWA 支持

### 2. 社区主题
- `vitepress-theme-demoblock` - 组件演示区块
- `vitepress-demo-preview` - 交互式演示
- `vitepress-blog-theme` - 博客主题

## 十、学习资源

1. **官方文档**：
   - [VitePress 官网](https://vitepress.dev/)
   - [GitHub 仓库](https://github.com/vuejs/vitepress)

2. **部署参考**：
   - [GitHub Pages 文档](https://docs.github.com/en/pages)
   - [VitePress 部署指南](https://vitepress.dev/guide/deploy)

3. **示例项目**：
   - [Vue.js 官方文档](https://github.com/vuejs/docs)
   - [Vite 官方文档](https://github.com/vitejs/vite/tree/main/docs)

VitePress 结合了现代前端工具链的最佳实践，为技术文档提供了极佳的开发体验。通过 GitHub Pages 的自动化部署，您可以轻松地将文档发布到互联网上，实现高效的文档编写-发布工作流。无论是个人项目还是企业文档，VitePress 都能提供专业级的解决方案。