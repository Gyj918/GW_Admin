// https://vitepress.dev/guide/custom-theme
import { h, onMounted, ref } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// 神经网络连线 SVG 模板（静态节点 + 连线，营造 AI 科技感）
const NeuralLines = {
  name: 'NeuralLines',
  setup() {
    // 仅在客户端 hydration 后生成随机连线，避免 SSG 不一致
    const lines = ref<string[]>([])
    const dots = ref<string[]>([])

    onMounted(() => {
      const W = 1200
      const H = 800
      const nodeCount = 24
      const nodes: { x: number; y: number }[] = []
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H
        })
      }
      const lineArr: string[] = []
      // 每个节点连接最近的 2 个节点
      nodes.forEach((n, i) => {
        const dists = nodes
          .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
          .filter((o) => o.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
        dists.forEach((o) => {
          lineArr.push(
            `<line x1="${n.x}" y1="${n.y}" x2="${nodes[o.j].x}" y2="${nodes[o.j].y}" stroke="url(#lineGrad)" stroke-width="1" opacity="0.5"/>`
          )
        })
      })
      lines.value = lineArr
      dots.value = nodes.map(
        (n) => `<circle cx="${n.x}" cy="${n.y}" r="2.5" fill="#06b6d4" opacity="0.8"/>`
      )
    })

    return () =>
      h('div', { class: 'neural-lines' }, [
        h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 1200 800', preserveAspectRatio: 'xMidYMid slice', style: 'width:100%;height:100%' }, [
          h('defs', null, [
            h('linearGradient', { id: 'lineGrad', x1: '0%', y1: '0%', x2: '100%', y2: '100%' }, [
              h('stop', { offset: '0%', 'stop-color': '#06b6d4' }),
              h('stop', { offset: '100%', 'stop-color': '#8b5cf6' })
            ])
          ]),
          ...lines.value.map((d) =>
            h('g', { innerHTML: d })
          ),
          ...dots.value.map((d) =>
            h('g', { innerHTML: d })
          )
        ])
      ])
  }
}

// 全局 3D 背景层
const AiBgLayer = {
  name: 'AiBgLayer',
  setup() {
    return () => h('div', { class: 'ai-bg-layer' }, [h(NeuralLines)])
  }
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 通过 layout-top 注入全局 3D 背景层
      'layout-top': () => h(AiBgLayer)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
