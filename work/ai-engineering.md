---
outline: [2,6]
---

# AI 应用工程化 <Badge type="warning" text="实战" />

> 4 年前端经验，2024 年起系统投入 AI 应用工程化。本文沉淀大模型 API 接入、流式 UI 渲染、Prompt 工程、低代码平台与 AI 辅助编程的实战经验。

## 1. AI 应用工程化概览

AI 应用工程化是将大语言模型（LLM）能力落地为可交付产品的工程实践，核心涵盖：

- **模型接入层**：通义千问 / DeepSeek 等大模型 API 的流式调用
- **UI 渲染层**：Markdown 渐进渲染、打字机效果、长文本虚拟列表
- **应用编排层**：Prompt 工程、Coze / Dify 低代码工作流
- **效率工具层**：Cursor / Claude Code / Trae / CodeBuddy 辅助编程

### 核心价值

| 方向 | 价值 |
| --- | --- |
| LLM 流式 UI | 毫秒级首字响应，对话体验接近 ChatGPT |
| RAG 检索增强 | 让大模型基于私有知识库回答，减少幻觉 |
| AI 辅助编程 | CRUD 类页面开发效率提升 50%+ |
| 低代码平台 | 非工程场景快速搭建知识库问答与工作流 |

## 2. 大模型 API 接入

### 2.1 SSE 流式调用

主流大模型 API（通义千问、DeepSeek、OpenAI）均支持 SSE（Server-Sent Events）流式返回。

```typescript
// fetch + ReadableStream 实现 SSE，兼容浏览器原生
async function streamChat(params: ChatParams, onChunk: (text: string) => void) {
  const controller = new AbortController()
  const res = await fetch('/api/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ ...params, stream: true }),
    signal: controller.signal
  })
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') return
        try {
          const json = JSON.parse(data)
          onChunk(json.choices?.[0]?.delta?.content ?? '')
        } catch { /* 忽略解析错误 */ }
      }
    }
  }
  return { abort: () => controller.abort() }
}
```

### 2.2 中断控制

使用 `AbortController` 实现用户主动取消：

```typescript
const ctrlRef = useRef<AbortController | null>(null)

const handleSend = async () => {
  ctrlRef.current?.abort() // 取消上一次请求
  const ctrl = new AbortController()
  ctrlRef.current = ctrl
  await streamChat(params, onChunk, ctrl.signal)
}
```

### 2.3 Axios 拦截器封装 SSE

统一处理鉴权、错误码与流式解析，避免每个接口重复样板代码。

## 3. Markdown 渐进渲染

流式返回的文本需要边接收边渲染，避免等待完整响应。推荐使用 `marked` + `DOMPurify`：

```typescript
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// 增量渲染：每次收到 chunk 后重新解析已累积文本
const renderMarkdown = (raw: string) => {
  const html = marked.parse(raw) as string
  return DOMPurify.sanitize(html)
}
```

**性能优化**：使用 `requestAnimationFrame` 节流，避免高频 reflow。

### 打字机效果

在 Markdown 渲染之上叠加逐字输出，增强对话沉浸感：

```typescript
function useTypewriter(fullText: string, speed = 20) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplay(fullText.slice(0, i))
      if (i >= fullText.length) clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [fullText])
  return display
}
```

## 4. 长文本虚拟列表

大模型返回的长文本（如代码生成、长文创作）可能包含数千行，直接渲染会卡顿。使用 `react-window` / `vue-virtual-scroller` 实现虚拟滚动：

```tsx
// react-window 示例
import { FixedSizeList } from 'react-window'

const CodeBlock = ({ code }: { code: string }) => {
  const lines = code.split('\n')
  return (
    <FixedSizeList height={400} itemCount={lines.length} itemSize={24}>
      {({ index, style }) => (
        <div style={style}>{lines[index]}</div>
      )}
    </FixedSizeList>
  )
}
```

## 5. Prompt 工程实践

### 5.1 结构化 Prompt

使用角色设定 + 任务描述 + 输出格式的三段式结构：

```
你是一名资深小说角色设计师。

请根据以下描述生成角色档案：
- 姓名
- 外貌
- 性格
- 背景故事

输出格式：JSON
```

### 5.2 Few-Shot 示例

在 Prompt 中提供 1-3 个示例，显著提升输出质量与格式一致性。

### 5.3 温度与 Top-P 调参

- **创意类任务**（角色生成、文案）：temperature 0.7-0.9
- **事实类任务**（问答、摘要）：temperature 0.1-0.3

## 6. Coze / Dify 低代码平台

对于非工程化场景（如内部知识库问答、简单工作流），优先使用低代码平台快速落地：

| 平台 | 适用场景 | 优势 |
| --- | --- | --- |
| Coze（扣子） | 智能体搭建、插件生态 | 字节生态，插件丰富 |
| Dify | 知识库 + 工作流编排 | 开源可自部署，可视化编排 |

### 知识库问答搭建流程

1. 上传文档（PDF / Markdown / Word）
2. 平台自动分块 + 向量化
3. 配置检索参数（Top-K、相似度阈值）
4. 绑定大模型 + 设定 Prompt
5. 发布为 API 或嵌入页面

## 7. AI 辅助编程工具链

日常开发深度使用以下工具，将重复 CRUD 类页面开发效率提升 50%+：

| 工具 | 用途 |
| --- | --- |
| Cursor | AI 原生编辑器，Tab 补全 + Chat |
| Claude Code | 终端 AI 编程助手，适合重构 |
| Trae | 全栈 AI IDE，多模型切换 |
| CodeBuddy | 代码审查与生成 |

### Spec 驱动开发 + Agent 任务编排

采用"先写规格说明（Spec），再由 Agent 逐步实现"的开发模式：

1. **编写 Spec**：明确需求、验收标准、技术约束
2. **任务拆解**：将 Spec 拆分为可独立执行的子任务
3. **Agent 执行**：由 AI Agent 按任务顺序生成代码
4. **人工 Review**：对关键逻辑进行审查与调整

这种模式在中后台 CRUD 页面、接口对接等重复性工作中效果显著。

## 8. 实战经验总结

- **流式优先**：所有 LLM 调用都应走 SSE，首字响应 < 500ms
- **降级方案**：网络异常时降级为非流式请求，保证功能可用
- **安全第一**：API Key 绝不暴露前端，通过后端代理转发
- **成本控制**：对长文本做截断，缓存高频重复请求
- **体验闭环**：从输入 → 流式输出 → Markdown 渲染 → 交互，全链路打磨
