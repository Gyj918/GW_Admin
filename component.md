---
editLink: false
outline: [2,6]
---
## 基于ES6类封装

### 函数声明
> WebSocket对象的创建
> WebSocket对象的关闭
 启用心跳机制，避免断连
消息推送，接收到消息后进行业务逻辑处理
重连机制，如果断连后尝试一定次数的重连，超过最大次数后仍然失败则关闭连接
调用案例如下：<br/>
const socketManager = new WebSocketManager('ws://example.com/socket', receiveMessage)
socketManager.start()


```javascript
export default class WebSocketManager {
	constructor(url = null, receiveMessageCallback = null) {
		this.socket = null // WebSocket 对象
		this.pingTimeout = null // 心跳计时器
		this.reconnectTimeout = 5000 // 重连间隔，单位：毫秒
		this.maxReconnectAttempts = 10 // 最大重连尝试次数
		this.reconnectAttempts = 0; // 当前重连尝试次数
		this.url = url // WebSocket 连接地址
		this.receiveMessageCallback = receiveMessageCallback // 接收消息回调函数
	}
	/**
		 * 初始化
		 */
	async start() {
		if (this.url) {
			// 连接WebSocket
			this.connectWebSocket()
		} else {
			console.error('WebSocketManager erros: 请传入连接地址')
		}
	}
	/**
		 * 创建WebSocket连接
		 */
	connectWebSocket() {
		// 创建 WebSocket 对象
		this.socket = new WebSocket(this.url)

		// 处理连接打开事件
		this.socket.addEventListener('open', event => {
			// 心跳机制
			this.startHeartbeat()
		})

		// 处理接收到消息事件
		this.socket.addEventListener('message', event => {
			this.receiveMessage(event)
		})

		// 处理连接关闭事件
		this.socket.addEventListener('close', event => {
			// 清除定时器
			clearTimeout(this.pingTimeout)
			clearTimeout(this.reconnectTimeout)
			// 尝试重连
			if (this.reconnectAttempts < this.maxReconnectAttempts) {
				this.reconnectAttempts++
				this.reconnectTimeout = setTimeout(() => {
					this.connectWebSocket()
				}, this.reconnectTimeout)
			} else {
				// 重置重连次数
				this.reconnectAttempts = 0
				console.error('已达到最大重新连接尝试次数。无法重新连接。')
			}
		})

		// 处理 WebSocket 错误事件
		this.socket.addEventListener('error', event => {
			console.error('WebSocketManager error:', event)
		})
	}
	/**
		 * 启动心跳机制
		 */
	startHeartbeat() {
		this.pingTimeout = setInterval(() => {
			// 发送心跳消息
			this.sendMessage('ping')
		}, 10000) // 每隔 10 秒发送一次心跳
	}

	/**
	 * 发送消息
	 * @param {String} message 消息内容
	 */
	sendMessage(message) {
		if (this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(message);
		} else {
			console.error('WebSocketManager error: WebSocket连接未打开,无法发送消息。')
		}
	}
	/**
		 * 接收到消息
		 */
	receiveMessage(event) {
		// 根据业务自行处理
		console.log('receiveMessage:', event.data)
		// 传入回调函数自行处理
		this.receiveMessageCallback && receiveMessageCallback(event.data)
	}
	/**
		 * 关闭连接
		 */
	closeWebSocket() {
		this.socket.close()
		// 清除定时器 重置重连次数
		clearTimeout(this.pingTimeout)
		clearTimeout(this.reconnectTimeout)
		this.reconnectAttempts = 0
	}
}
```
