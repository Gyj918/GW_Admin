---
outline: [2,6]
---

# RoleForge AI 角色创作助手 <Badge type="tip" text="开源" />

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![通义千问](https://img.shields.io/badge/通义千问-Qwen-06b6d4)
![DeepSeek](https://img.shields.io/badge/DeepSeek-V3-4D6BFE)
![通义万相](https://img.shields.io/badge/通义万相-WanX-8b5cf6)

### "基于大模型的 AI 角色创作助手 — 让每一个角色都有灵魂"

RoleForge 是一款基于大语言模型的 AI 角色创作应用，旨在帮助创作者快速生成、对话和可视化角色形象。通过通义千问 / DeepSeek 的流式对话能力，结合通义万相文生图 API，实现从角色描述到形象生成的一站式创作体验。

> 项目地址：[gitee.com/gao_yunji/role-forge](https://gitee.com/gao_yunji/role-forge)

## 1. 项目概述

- **定位**：面向小说作者、游戏策划、剧本创作者的 AI 角色创作工具
- **核心能力**：LLM 流式对话 + 文生图形象生成 + 角色档案管理
- **技术栈**：React 19 + Vite + TypeScript + Zustand + React Router v6
- **独立开发**：2025.03 – 2025.04

## 2. 核心功能

### 2.1 LLM 流式对话

基于 EventSource / fetch SSE 实现通义千问与 DeepSeek 的流式响应，前端做了完整的流式渲染体验：

- **Markdown 渐进渲染**：边接收边解析，避免长文本等待
- **打字机效果**：逐字输出，增强对话沉浸感
- **中断控制**：支持中途取消生成，释放请求资源
- **多模型切换**：通义千问 / DeepSeek 一键切换

### 2.2 文生图能力

接入通义万相 API，支持角色描述 → 图像生成：

- **多图轮播**：单次生成多张图片，横向滑动预览
- **生成队列**：批量提交，队列调度，避免并发超限
- **失败重试**：网络异常自动重试，提升生成成功率

## 3. 技术架构

```
RoleForge/
├── src/
│   ├── api/
│   │   ├── llm.ts          # 大模型 SSE 请求封装
│   │   └── image.ts        # 通义万相文生图接口
│   ├── store/
│   │   ├── chat.ts         # Zustand 对话状态
│   │   └── role.ts         # 角色档案状态
│   ├── components/
│   │   ├── ChatStream/     # 流式对话组件
│   │   └── ImageGallery/   # 多图轮播组件
│   ├── hooks/
│   │   ├── useSSE.ts       # SSE 流式 Hook
│   │   └── useTypewriter.ts # 打字机效果 Hook
│   └── App.tsx
└── package.json
```

## 4. 工程化落地

- **Axios 拦截器封装 SSE**：统一处理流式请求的鉴权、错误与中断
- **React Router v6 数据 API**：基于 loader/action 的数据加载模式
- **Zustand 状态管理**：轻量级全局状态，替代冗余 props 透传
- **ESLint + Husky**：代码规范与提交信息校验，保障协作质量

## 5. 关键实现

### SSE 流式请求封装

```typescript
// 基于 fetch + ReadableStream 实现 SSE，支持中断
async function streamChat(params: ChatParams, onMessage: (chunk: string) => void) {
  const controller = new AbortController()
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify(params),
    signal: controller.signal
  })
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const text = decoder.decode(value)
    text.split('\n').forEach((line) => {
      if (line.startsWith('data:')) onMessage(line.slice(5))
    })
  }
  return { abort: () => controller.abort() }
}
```

### 文生图队列

```typescript
// 简单的生成队列，控制并发 + 失败重试
class ImageQueue {
  private pending: Promise<void> = Promise.resolve()
  add(task: () => Promise<void>) {
    this.pending = this.pending
      .then(task)
      .catch(() => this.retry(task, 2))
  }
  private async retry(task: () => Promise<void>, times: number) {
    for (let i = 0; i < times; i++) {
      try { return await task() } catch { /* 继续重试 */ }
    }
  }
}
```

## 6. 项目亮点

- **流式体验完整**：从 SSE 接收到 Markdown 渐进渲染 + 打字机效果全链路实现
- **工程化规范**：ESLint + Husky + Zustand + Router v6，具备生产级项目结构
- **AI 能力闭环**：对话生成 + 文生图，覆盖角色创作的核心场景
- **性能优化**：长文本虚拟列表、生成队列调度，保障流畅体验
