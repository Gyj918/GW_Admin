---
outline: [2,6]
---

# LangChain Agent 开发 <Badge type="warning" text="进阶" />

> 基于 LangChain 框架开发 Agent 应用，涵盖 Tool Calling、Memory、RAG 检索增强链与 Agent 架构模式，并对比 Coze / Dify 低代码方案。

## 1. LangChain 框架概述

LangChain 是一个用于构建大语言模型应用的开源框架，核心抽象包括：

| 组件 | 作用 |
| --- | --- |
| Model | 大语言模型封装（ChatOpenAI / ChatTongyi 等） |
| Prompt | 提示词模板与动态变量 |
| Chain | 多步骤调用链路编排 |
| Tool | 外部能力（搜索、数据库、API） |
| Agent | 自主决策调用哪些 Tool 的智能体 |
| Memory | 对话记忆与上下文管理 |
| Retriever | 知识库检索器 |

### 核心价值

- 统一封装多模型，避免厂商锁定
- 提供 RAG、Agent 等高级能力的现成实现
- 支持流式、异步、回调等工程化特性

## 2. Tool Calling 机制

Tool Calling（函数调用）让大模型具备调用外部工具的能力，是 Agent 的基础。

### 2.1 定义 Tool

```python
from langchain_core.tools import tool

@tool
def get_weather(city: str) -> str:
    """查询指定城市的实时天气"""
    return f"{city} 当前温度 25°C，晴"

@tool
def search_knowledge(query: str) -> str:
    """检索内部知识库"""
    return retriever.invoke(query)
```

### 2.2 绑定 Tool 到模型

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="deepseek-chat")
tools = [get_weather, search_knowledge]
llm_with_tools = llm.bind_tools(tools)
```

### 2.3 执行 Tool 调用

```python
from langchain_core.messages import HumanMessage

messages = [HumanMessage("北京今天天气怎么样？")]
response = llm_with_tools.invoke(messages)

# 模型返回 tool_calls，执行后将结果回传
for tool_call in response.tool_calls:
    tool = {t.name: t for t in tools}[tool_call["name"]]
    result = tool.invoke(tool_call["args"])
    messages.append(response)
    messages.append(ToolMessage(content=result, tool_call_id=tool_call["id"]))

final = llm_with_tools.invoke(messages)
```

## 3. Memory 对话记忆

对话记忆让 Agent 具备多轮上下文能力。

### 3.1 常用 Memory 类型

| 类型 | 说明 | 适用场景 |
| --- | --- | --- |
| ConversationBufferMemory | 完整保存历史 | 短对话 |
| ConversationSummaryMemory | 摘要压缩历史 | 长对话 |
| ConversationBufferWindowMemory | 保留最近 K 轮 | 平衡型 |

### 3.2 使用 Window Memory

```python
from langchain.memory import ConversationBufferWindowMemory

memory = ConversationBufferWindowMemory(k=5, return_messages=True)
memory.save_context({"input": "你好"}, {"output": "你好，我是 AI 助手"})
print(memory.load_memory_variables({}))
```

### 3.3 长对话优化

对于超长对话，采用"摘要 + 最近窗口"的混合策略：历史部分由 LLM 生成摘要，最近 K 轮保留原文，既控制 Token 又保留关键信息。

## 4. RAG 检索增强生成链

RAG（Retrieval-Augmented Generation）让大模型基于私有知识库回答，减少幻觉。

### 4.1 RAG 全流程

```
文档 → 分块 → 向量化 → 存入向量库
                          ↓
用户问题 → 向量化 → 相似度检索 → Top-K 文档
                          ↓
            Prompt（问题 + 检索结果）→ LLM → 回答
```

### 4.2 实现代码

```python
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

# 1. 加载并分块文档
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)

# 2. 向量化并存入 Chroma
embeddings = HuggingFaceEmbeddings(model_name="bge-small-zh")
vectorstore = Chroma.from_documents(chunks, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 3. 构建 RAG 链
prompt = ChatPromptTemplate.from_template("""
基于以下上下文回答问题，若无法回答请说"不知道"。
上下文：{context}
问题：{question}
""")

rag_chain = (
    {"context": retriever | (lambda docs: "\n\n".join(d.page_content for d in docs)),
     "question": RunnablePassthrough()}
    | prompt
    | llm
)

answer = rag_chain.invoke("RoleForge 支持哪些大模型？")
```

### 4.3 检索优化技巧

- **分块策略**：按语义分块（如标题层级），而非固定长度
- **重排序**：用 Cross-Encoder 对 Top-K 结果二次排序
- **查询改写**：用 LLM 将用户问题改写为更适合检索的关键词
- **混合检索**：向量检索 + 关键词检索（BM25）结合

## 5. Agent 架构模式

### 5.1 ReAct Agent（推理 + 行动）

ReAct 是最经典的 Agent 模式，模型交替进行"思考（Thought）"和"行动（Action）"：

```python
from langchain.agents import create_react_agent, AgentExecutor

agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
executor.invoke({"input": "帮我查一下北京天气，然后用中文总结"})
```

### 5.2 多 Agent 协作

复杂任务拆分为多个专业 Agent 协作：

- **Planner Agent**：拆解任务为子步骤
- **Researcher Agent**：检索知识库
- **Coder Agent**：生成代码
- **Reviewer Agent**：审查输出

通过 Supervisor Agent 调度，实现"专家会诊"。

### 5.3 自定义 Agent

继承 `BaseSingleActionAgent`，自定义 `plan` 方法实现专属决策逻辑。

## 6. 与 Coze / Dify 对比

| 维度 | LangChain | Coze | Dify |
| --- | --- | --- | --- |
| 灵活性 | 极高，完全自定义 | 低，平台约束 | 中，可视化编排 |
| 部署 | 自行部署 | 平台托管 | 支持自部署 |
| 适用场景 | 复杂定制化应用 | 快速搭建智能体 | 知识库 + 工作流 |
| 学习成本 | 高 | 低 | 低 |
| 可观测性 | 需自建 | 平台内置 | 平台内置 |

**选型建议**：
- 内部知识库问答、简单工作流 → Dify / Coze
- 复杂业务逻辑、深度定制 → LangChain
- 生产级 Agent 应用 → LangChain + LangSmith 可观测

## 7. 前端集成实践

LangChain 应用通常部署为后端服务，前端通过 API 调用：

```typescript
// 前端调用 Agent 接口（SSE 流式）
const res = await fetch('/api/agent/invoke', {
  method: 'POST',
  body: JSON.stringify({ input: userQuery })
})

const reader = res.body!.getReader()
const decoder = new TextDecoder()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  const chunk = decoder.decode(value)
  // 流式渲染到 UI
  appendToChat(chunk)
}
```

### LangChain.js 前端直连

简单场景可使用 `langchain` 的 JS 版本在前端直接调用，但需注意 API Key 安全问题。

## 8. 实战经验总结

- **从 Chain 到 Agent**：先用固定 Chain 跑通流程，再升级为 Agent 自主决策
- **Memory 是关键**：多轮对话体验取决于 Memory 策略，优先用 Window Memory
- **RAG 重检索**：RAG 效果 80% 取决于检索质量，投入精力优化分块与重排序
- **可观测性**：接入 LangSmith 或自建日志，追踪每一步 Tool 调用与 Token 消耗
- **成本控制**：设置 max_iterations 防止 Agent 死循环，缓存重复查询
