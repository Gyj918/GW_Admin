---
  outline: [2,5]
---
<div style="display: flex; justify-content: center; align-items: center; text-align: center">
   <h1>Electron</h1> <Badge type="warning" text="熟练" /> <img src='/electron.png'/>
</div>

## 一、Electron 概述

Electron 是由 GitHub 开发的开源框架，用于使用 Web 技术（HTML、CSS 和 JavaScript）构建跨平台的桌面应用程序。它将 Chromium 渲染引擎和 Node.js 运行时结合在一起，使开发者能够用前端技术构建原生体验的桌面应用。

### 核心优势
- **跨平台**：一次开发，可打包为 Windows、macOS 和 Linux 应用
- **技术栈复用**：使用熟悉的 Web 技术开发桌面应用
- **原生能力**：通过 Node.js 集成访问操作系统原生功能
- **成熟生态**：大量开源工具和插件支持
- **热更新**：支持应用在线更新机制

## 二、核心架构

Electron 应用由两个主要进程组成：

### 1. 主进程 (Main Process)
- 应用的入口点，运行在 Node.js 环境中
- 负责创建和管理应用窗口（BrowserWindow）
- 控制应用生命周期（ready、window-all-closed 等事件）
- 与操作系统原生 API 交互
- 使用 IPC 与渲染进程通信

### 2. 渲染进程 (Renderer Process)
- 每个窗口都是一个独立的渲染进程
- 运行在 Chromium 环境中，展示 Web 页面
- 默认情况下不能直接访问 Node.js API（出于安全考虑）
- 通过预加载脚本或 IPC 与主进程通信

## 三、基础应用结构

### 典型项目结构
```
your-electron-app/
├── package.json
├── main.js          # 主进程入口文件
├── preload.js       # 预加载脚本
├── src/
│   ├── renderer/    # 渲染进程代码
│   │   ├── main.js  # 渲染进程入口
│   │   └── index.html
│   └── assets/      # 静态资源
└── build/           # 构建输出目录
```

### 最小 Electron 应用示例

**main.js (主进程)**
```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('src/renderer/index.html')
  
  // 开发模式下打开开发者工具
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
```

**preload.js (预加载脚本)**
```javascript
const { contextBridge, ipcRenderer } = require('electron')

// 安全地暴露API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.send('message', message),
  onReply: (callback) => ipcRenderer.on('reply', callback)
})
```

**renderer/index.html (渲染进程)**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Electron App</title>
</head>
<body>
  <h1>Hello Electron!</h1>
  <button id="btn">Send Message</button>
  
  <script src="main.js"></script>
</body>
</html>
```

**renderer/main.js (渲染进程逻辑)**
```javascript
document.getElementById('btn').addEventListener('click', () => {
  window.electronAPI.sendMessage('Hello from renderer!')
})

window.electronAPI.onReply((event, arg) => {
  console.log('Received reply:', arg)
})
```

## 四、核心技术与特性

### 1. 进程间通信 (IPC)

Electron 提供了几种进程间通信方式：

**主进程到渲染进程**
```javascript
// 主进程
const { ipcMain, BrowserWindow } = require('electron')

ipcMain.on('message', (event, arg) => {
  console.log(arg) // 打印 "Hello from renderer!"
  
  // 获取发送消息的窗口
  const win = BrowserWindow.fromWebContents(event.sender)
  
  // 回复消息
  event.reply('reply', 'Hello from main process!')
})
```

**渲染进程到主进程**
```javascript
// 通过预加载脚本暴露的API
window.electronAPI.sendMessage('Hello from renderer!')
window.electronAPI.onReply((event, arg) => {
  console.log(arg) // 打印 "Hello from main process!"
})
```

### 2. 原生API访问

**文件系统操作示例**
```javascript
const { dialog } = require('electron')
const fs = require('fs')

// 打开文件对话框
dialog.showOpenDialog({
  properties: ['openFile']
}).then(result => {
  if (!result.canceled) {
    const filePath = result.filePaths[0]
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) throw err
      console.log(data)
    })
  }
})
```

### 3. 应用菜单

```javascript
const { Menu } = require('electron')

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: () => { /* 处理打开操作 */ }
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### 4. 系统托盘

```javascript
const { Tray, Menu } = require('electron')
const path = require('path')

let tray = null

app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, 'icon.png'))
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() }
  ])
  
  tray.setToolTip('My Electron App')
  tray.setContextMenu(contextMenu)
})
```

## 五、安全最佳实践

1. **启用上下文隔离**
```javascript
new BrowserWindow({
  webPreferences: {
    contextIsolation: true, // 默认启用
    sandbox: true,         // 增强安全性
    nodeIntegration: false // 不建议启用
  }
})
```

2. **验证IPC消息**
```javascript
ipcMain.on('delete-file', (event, filePath) => {
  // 验证文件路径是否在允许的目录下
  if (!isPathAllowed(filePath)) {
    return
  }
  
  // 安全地执行操作
  fs.unlink(filePath, (err) => {
    if (err) throw err
  })
})
```

3. **内容安全策略(CSP)**
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
">
```

## 六、性能优化

1. **使用Web Workers处理CPU密集型任务**
```javascript
// 主进程
const { Worker } = require('worker_threads')

const worker = new Worker('./heavy-task.js')
worker.postMessage({ data: largeData })
worker.on('message', (result) => {
  // 处理结果
})
```

2. **延迟加载非关键模块**
```javascript
// 渲染进程
const heavyModule = import('./heavy-module.js')
heavyModule.then(module => {
  module.doHeavyWork()
})
```

3. **禁用不需要的功能**
```javascript
new BrowserWindow({
  webPreferences: {
    webgl: false,      // 如果不使用WebGL
    plugins: false     // 如果不使用插件
  }
})
```

## 七、打包与分发

### 1. 使用electron-builder

```json
// package.json 配置示例
{
  "build": {
    "appId": "com.example.myapp",
    "productName": "MyApp",
    "directories": {
      "output": "dist"
    },
    "files": ["**/*", "!src/renderer/node_modules/**"],
    "mac": {
      "category": "public.app-category.developer-tools",
      "target": "dmg"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}
```

### 2. 常用命令
```bash
# 开发模式
electron .

# 打包应用
electron-builder --win --x64
electron-builder --mac --universal
electron-builder --linux

# 生成免安装版本
electron-builder --dir
```

## 八、调试与测试

### 1. 调试主进程
```bash
# 使用VSCode调试
# 在launch.json中添加配置
{
  "type": "node",
  "request": "launch",
  "name": "Electron Main",
  "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
  "program": "${workspaceFolder}/main.js",
  "outputCapture": "std"
}
```

### 2. 测试策略
- **单元测试**：Jest/Mocha测试业务逻辑
- **E2E测试**：Spectron或Playwright测试完整应用
- **集成测试**：测试原生模块集成

## 九、高级特性

### 1. 原生模块集成
```javascript
const { exec } = require('child_process')

exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
})
```

### 2. 协议处理
```javascript
// 注册自定义协议
app.setAsDefaultProtocolClient('myapp')

// 处理协议URL
app.on('open-url', (event, url) => {
  event.preventDefault()
  handleDeepLink(url)
})
```

### 3. 自动更新
```javascript
const { autoUpdater } = require('electron-updater')

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available')
})

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded')
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall()
})
```

## 十、Electron 生态

1. **流行框架集成**
   - React: `create-react-app` + Electron
   - Vue: `vue-cli-plugin-electron-builder`
   - Angular: `ngx-electron`

2. **常用工具库**
   - `electron-store`: 简单的数据持久化
   - `electron-log`: 跨平台日志记录
   - `electron-debug`: 增强调试功能
   - `electron-positioner`: 窗口定位工具

3. **UI组件库**
   - Photon Kit: 专为Electron设计的UI组件
   - Electron-React-Boilerplate: 包含完整UI解决方案

## 十一、最佳实践

1. **项目组织**
   - 分离主进程和渲染进程代码
   - 使用TypeScript提高代码质量
   - 实现自动化构建和部署流程

2. **错误处理**
```javascript
// 全局错误处理
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  // 可以记录日志或显示错误对话框
})

// 渲染进程错误处理
window.addEventListener('error', (event) => {
  console.error('Renderer Error:', event.error)
  ipcRenderer.send('renderer-error', event.error.stack)
})
```

3. **多窗口管理**
```javascript
const windows = new Set()

function createNewWindow() {
  let newWindow = new BrowserWindow({ /* 配置 */ })
  windows.add(newWindow)
  
  newWindow.on('closed', () => {
    windows.delete(newWindow)
  })
  
  return newWindow
}
```

## 十二、未来方向

1. **Web Components集成**：更好的组件复用
2. **WASM支持**：高性能计算能力
3. **更轻量级打包**：减小应用体积
4. **更好的沙箱安全模型**：增强应用安全性
5. **Electron Forge**：官方推荐的构建工具链

## 结语

Electron 通过将 Web 技术的灵活性与桌面应用的能力完美结合，彻底改变了桌面应用开发的范式。虽然它存在应用体积较大等挑战，但其开发效率、跨平台能力和丰富的生态系统使其成为构建现代桌面应用的首选方案。随着技术的不断演进，Electron 将继续在性能优化、安全增强和开发者体验方面带来更多创新。