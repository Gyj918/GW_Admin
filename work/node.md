---
  outline: [2, 5]
---
# Node.js <Badge type="warning" text="熟练" />

`“技术分享章节的所有内容，均源自作者个人的学习心得与整理。在此，诚挚地邀请各位读者审阅，若您发现其中有任何错误或不足之处，敬请不吝赐教，及时指出，以便不断修正和完善。”`

# Node.js 深度解析：JavaScript 的后端运行时

## 一、Node.js 概述

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，于 2009 年由 Ryan Dahl 创建。它采用事件驱动、非阻塞 I/O 模型，使其轻量且高效，特别适合数据密集型实时应用。

### 核心特点：
- **单线程事件循环**：高效处理高并发
- **非阻塞 I/O**：优化吞吐量和性能
- **跨平台**：支持 Windows、Linux、macOS
- **npm 生态**：全球最大的开源库生态系统
- **统一语言**：前后端使用相同语言 (JavaScript/TypeScript)

## 二、核心架构与原理

### 1. 事件循环机制

```javascript
// 事件循环示例
const fs = require('fs');

// 阶段1: Timers (定时器阶段)
setTimeout(() => console.log('Timeout 1'), 0);
setImmediate(() => console.log('Immediate 1'));

// 阶段2: I/O 回调
fs.readFile(__filename, () => {
  console.log('I/O callback');
  
  // 在I/O回调中，setImmediate先于setTimeout
  setTimeout(() => console.log('Timeout in I/O'), 0);
  setImmediate(() => console.log('Immediate in I/O'));
});

// 阶段3: Idle/Prepare (内部使用)
// 阶段4: Poll (轮询阶段)
// 阶段5: Check (setImmediate)
// 阶段6: Close callbacks

process.nextTick(() => console.log('Next Tick')); // 微任务

console.log('Main thread'); // 同步代码
```

### 2. 模块系统

```javascript
// CommonJS 模块示例 (node_modules/math-utils.js)
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  add,
  multiply,
  PI: 3.14159
};

// ES 模块示例 (node_modules/geometry.mjs)
export class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
}

// 混合导入 (app.js)
const { add } = require('./math-utils');
import { Circle } from './geometry.mjs';

console.log(add(2, 3));
const circle = new Circle(5);
console.log(circle.area());
```

## 三、核心模块实战

### 1. 文件系统操作

```javascript
const fs = require('fs').promises;
const path = require('path');

// 递归目录遍历
async function walkDir(dir, fileList = []) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const stat = await fs.stat(path.join(dir, file));
    
    if (stat.isDirectory()) {
      await walkDir(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  }
  
  return fileList;
}

// 文件监视
async function watchFileChanges() {
  const watcher = fs.watch(__dirname, { recursive: true });
  
  for await (const event of watcher) {
    console.log(`File ${event.filename} changed (${event.eventType})`);
  }
}

// 高性能文件操作
async function processLargeFile() {
  const readStream = fs.createReadStream('input.txt', { highWaterMark: 64 * 1024 });
  const writeStream = fs.createWriteStream('output.txt');
  
  // 管道传输
  await pipeline(
    readStream,
    new Transform({
      transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
      }
    }),
    writeStream
  );
}
```

### 2. 网络编程

```javascript
const http = require('http');
const https = require('https');
const net = require('net');
const { WebSocketServer } = require('ws');

// HTTP服务器
const httpServer = http.createServer((req, res) => {
  // 路由处理
  const { method, url } = req;
  
  if (method === 'GET' && url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data: Date.now() }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// WebSocket服务器
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    // 广播消息
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

// TCP服务器
const tcpServer = net.createServer(socket => {
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

// 启动服务器
httpServer.listen(3000, () => {
  console.log('HTTP server on port 3000');
  tcpServer.listen(3001, () => {
    console.log('TCP server on port 3001');
  });
});
```

## 四、异步编程模式

### 1. 现代异步控制流

```javascript
// Promise 链式调用
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error; // 继续传递错误
    });
}

// Async/Await 模式
async function processUserData(userId) {
  try {
    const user = await User.findById(userId);
    const orders = await Order.findByUser(userId);
    const analytics = await Analytics.calculate(user, orders);
    
    return { user, orders, analytics };
  } catch (error) {
    console.error('Processing failed:', error);
    throw new ProcessingError('Failed to process user data', { cause: error });
  }
}

// 并行执行
async function parallelTasks() {
  const [users, products, stats] = await Promise.all([
    User.fetchAll(),
    Product.fetchAll(),
    Analytics.getStats()
  ]);
  
  return { users, products, stats };
}

// 高级模式：取消令牌
function createCancellableFetch(url, { signal }) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const internalSignal = controller.signal;
    
    // 外部信号监听
    if (signal) {
      signal.addEventListener('abort', () => {
        controller.abort();
        reject(new DOMException('Aborted', 'AbortError'));
      });
    }
    
    fetch(url, { signal: internalSignal })
      .then(resolve)
      .catch(reject);
  });
}
```

### 2. Worker Threads

```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// 主线程
if (isMainThread) {
  function runService(workerData) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }
  
  async function run() {
    const result = await runService('heavy-task-data');
    console.log(result);
  }
  
  run().catch(console.error);
} 
// 工作线程
else {
  const heavyTask = (data) => {
    // CPU密集型计算
    let result = 0;
    for (let i = 0; i < 1e9; i++) {
      result += Math.sqrt(i);
    }
    return result;
  };
  
  const result = heavyTask(workerData);
  parentPort.postMessage(result);
}
```

## 五、性能优化

### 1. 内存管理

```javascript
// 内存泄漏检测
const { heapUsed } = process.memoryUsage();
setInterval(() => {
  console.log(`Memory usage: ${(heapUsed() / 1024 / 1024).toFixed(2)} MB`);
}, 1000);

// 流处理避免内存溢出
function processLargeFile() {
  const readStream = fs.createReadStream('large.txt');
  const writeStream = fs.createWriteStream('output.txt');
  
  readStream.on('data', chunk => {
    // 处理数据块
    const processed = transformChunk(chunk);
    
    // 背压处理
    if (!writeStream.write(processed)) {
      readStream.pause();
      writeStream.once('drain', () => readStream.resume());
    }
  });
}

// 缓冲区重用
const bufferPool = [];
const BUFFER_SIZE = 1024 * 1024; // 1MB

function getBuffer() {
  return bufferPool.pop() || Buffer.alloc(BUFFER_SIZE);
}

function releaseBuffer(buffer) {
  bufferPool.push(buffer);
}
```

### 2. 集群模式

```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // 进程管理
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    if (!worker.exitedAfterDisconnect) {
      console.log('Forking a new worker');
      cluster.fork();
    }
  });
  
  // 零停机重启
  process.on('SIGUSR2', () => {
    const workers = Object.values(cluster.workers);
    
    function restartWorker(i) {
      if (i >= workers.length) return;
      
      const worker = workers[i];
      console.log(`Restarting worker ${worker.process.pid}`);
      
      worker.disconnect();
      worker.on('exit', () => {
        const newWorker = cluster.fork();
        newWorker.on('listening', () => restartWorker(i + 1));
      });
    }
    
    restartWorker(0);
  });
} else {
  require('./server'); // 启动应用
  console.log(`Worker ${process.pid} started`);
}
```

## 六、现代 Node.js 开发

### 1. TypeScript 集成

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

// src/server.ts
import express from 'express';
import { Request, Response } from 'express';

const app = express();
const port = 3000;

interface User {
  id: number;
  name: string;
}

app.get('/users/:id', (req: Request, res: Response<User>) => {
  const user: User = {
    id: parseInt(req.params.id),
    name: 'John Doe'
  };
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### 2. 测试框架

```javascript
// 使用Jest测试
const { sum, fetchData } = require('./utils');

describe('Utility functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  test('fetchData returns expected data', async () => {
    const mockResponse = { data: 'test' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );
    
    const data = await fetchData('https://api.example.com');
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

// 集成测试示例
const request = require('supertest');
const app = require('../app');

describe('GET /api/users', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String)
      })
    ]));
  });
});
```

## 七、安全最佳实践

### 1. 安全中间件

```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const { expressjwt: jwt } = require('express-jwt');

// 安全配置
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.example.com'],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:', 'cdn.example.com']
  }
}));

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 每个IP限制100个请求
});
app.use('/api/', limiter);

// CSRF保护
app.use(csrf({ cookie: true }));
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

// JWT认证
app.use(jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  getToken: req => req.cookies.token
}).unless({
  path: ['/api/auth/login', '/api/auth/register']
}));
```

### 2. 输入验证

```javascript
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

// 验证规则
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().email().required(),
  birthYear: Joi.number().integer().min(1900).max(2023)
});

// 路由验证
app.post('/api/users', 
  validator.body(userSchema), 
  (req, res) => {
    // 安全处理已验证数据
    const newUser = sanitizeUserInput(req.body);
    User.create(newUser)
      .then(user => res.status(201).json(user))
      .catch(next);
  }
);

// SQL注入防护
async function getUserSafe(id) {
  // 使用参数化查询
  return db.query('SELECT * FROM users WHERE id = ?', [id]);
}

// XSS防护
function sanitizeUserInput(input) {
  return {
    ...input,
    username: escapeHtml(input.username),
    bio: sanitizeHtml(input.bio, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: {
        a: ['href']
      }
    })
  };
}
```

## 八、部署与监控

### 1. Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: pass
      POSTGRES_USER: user
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### 2. 监控与日志

```javascript
// Winston日志配置
const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new ElasticsearchTransport({
      level: 'info',
      clientOpts: { node: 'http://localhost:9200' }
    })
  ]
});

// Prometheus监控
const prometheus = require('prom-client');
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000]
});

// 添加监控中间件
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ 
      method: req.method, 
      route: req.route?.path || req.path, 
      code: res.statusCode 
    });
  });
  next();
});

// 暴露指标端点
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});
```

## 九、Node.js 18+ 新特性

### 1. 内置测试运行器

```javascript
// test/my-test.js
const { test, describe, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');

describe('File System Tests', () => {
  let testFile;
  
  before(async () => {
    testFile = await fs.open('test.txt', 'w');
    await testFile.write('Hello World');
  });
  
  test('read file content', async () => {
    const content = await fs.readFile('test.txt', 'utf-8');
    assert.equal(content, 'Hello World');
  });
  
  test('file exists', async () => {
    await assert.doesNotReject(
      fs.access('test.txt', fs.constants.F_OK)
    );
  });
});

// 运行测试: node --test
```

### 2. Web Streams API

```javascript
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// 创建可读流
const readable = new Readable({
  read(size) {
    this.push('Some data');
    this.push('More data');
    this.push(null); // 结束流
  }
});

// 创建转换流
const transform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// 使用管道处理
await pipeline(
  readable,
  transform,
  process.stdout
);

// 获取网络流
async function fetchStream(url) {
  const response = await fetch(url);
  return response.body;
}
```

## 十、学习资源与社区

1. **官方资源**：
   - [Node.js 官方文档](https://nodejs.org/docs/latest/api/)
   - [Node.js 最佳实践](https://github.com/goldbergyoni/nodebestpractices)

2. **推荐书籍**：
   - 《Node.js 设计模式》 Mario Casciaro
   - 《深入浅出 Node.js》 朴灵

3. **进阶学习**：
   - Node.js 源码阅读
   - libuv 事件循环研究
   - V8 引擎优化

4. **社区**：
   - Node.js 官方 GitHub
   - Stack Overflow Node.js 标签
   - Node.js 中文网

Node.js 通过其独特的非阻塞 I/O 模型和强大的 JavaScript 生态系统，彻底改变了后端开发的格局。无论是构建高性能 API、实时应用还是微服务架构，Node.js 都提供了理想的解决方案。随着现代 JavaScript 特性的不断加入和性能的持续优化，Node.js 正在成为全栈开发的首选技术。掌握 Node.js 不仅意味着学习一个运行时环境，更是理解现代 Web 开发的核心模式和架构思想。

### 十一、express框架、koa框架
在使用node实现API服务端时，通常会使用一些框架来简化开发过程。以下是两个常用的Node.js框架：Express和Koa。
1. **Express框架**：
   - Express是一个灵活的Node.js Web应用框架，提供了一系列强大的中间件和路由功能。
   - 它易于上手，适合快速构建Web应用和API服务。
   - Express支持路由、模板引擎、静态文件服务、中间件等功能。

2. **Koa框架**：
   - Koa是由Express的原班人马打造的一个新的Web应用框架，旨在提供更小、更灵活的解决方案。
   - Koa使用async/await语法，使得异步代码更加简洁和易读。

### 十二、推荐视频教程

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=807488433&bvid=BV1a34y167AZ&cid=1597727728&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 450px; max-width: 100%;"></iframe>
<br/>
<br/>

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=335281193&bvid=BV13A411w79h&cid=403043148&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 450px; max-width: 100%;"></iframe>