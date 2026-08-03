import { useEffect, useRef, useState } from 'react'
import './StatsPanel.css'

type ColKey = 'efficiency' | 'bugs' | 'satisfaction' | 'completion' | 'usage'

type Dim = {
  key: ColKey
  label: string
  caption: string
  unit: string
  suffix?: string
  max: number
  /** 逆向指标：数值越低越好 */
  lowerIsBetter?: boolean
}

const DIMS: Dim[] = [
  { key: 'efficiency', label: '综合提效', caption: '引入 AI 后的效率提升幅度', unit: '% vs 人工基线', suffix: '%', max: 100 },
  { key: 'bugs', label: '页面 BUG 率', caption: '千次访问的前端缺陷数', unit: '缺陷 / 千次访问', max: 5, lowerIsBetter: true },
  { key: 'satisfaction', label: '用户满意度', caption: '模块满意度评分', unit: '分 / 5 分制', suffix: '分', max: 5 },
  { key: 'completion', label: '任务完成率', caption: '关键任务一次性通过率', unit: '% 一次通过', suffix: '%', max: 100 },
  { key: 'usage', label: '用户日均使用时长', caption: '活跃用户日均停留时长', unit: '小时 / 日', suffix: 'h', max: 10 },
]

type Row = {
  label: string
  sub?: string
  value: number
  range: [number, number]
  delta?: number
  trace: number[]
}

/** 按 appTitle 返回当前模块的五个维度数据 */
function getModuleData(appTitle: string): Row[] {
  const map: Record<string, Record<ColKey, Row>> = {
    '视觉 AI 整合网站': {
      efficiency: { label: '视觉素材产出', sub: '设计', value: 26, range: [18, 33], delta: 5.6, trace: [0.28, 0.36, 0.44, 0.52, 0.6, 0.68, 0.78, 0.9] },
      bugs:        { label: 'v2.5 当前版本', sub: '当前', value: 0.6, range: [0.4, 0.9], delta: -45.5, trace: [0.3, 0.27, 0.24, 0.21, 0.18, 0.16, 0.14, 0.12] },
      satisfaction:{ label: '视觉 AI 整合网站', value: 4.6, range: [4.2, 4.8], delta: 6.5, trace: [0.62, 0.66, 0.7, 0.72, 0.78, 0.82, 0.86, 0.92] },
      completion:  { label: '生图参数配置', value: 94, range: [88, 97], delta: 5.6, trace: [0.66, 0.7, 0.74, 0.78, 0.82, 0.86, 0.9, 0.94] },
      usage:       { label: '视觉 AI 整合网站', sub: '整合', value: 6.4, range: [5.2, 7.3], delta: 12.3, trace: [0.2, 0.24, 0.28, 0.34, 0.4, 0.48, 0.6, 0.74] },
    },
    '预设生成网站': {
      efficiency: { label: '预设配置流程', sub: '配置', value: 68, range: [55, 74], delta: 14.2, trace: [0.26, 0.32, 0.4, 0.46, 0.54, 0.62, 0.7, 0.82] },
      bugs:        { label: 'v2.3 版本', value: 1.1, range: [0.8, 1.5], delta: -31.3, trace: [0.44, 0.4, 0.36, 0.33, 0.3, 0.27, 0.25, 0.22] },
      satisfaction:{ label: '预设生成网站', value: 4.4, range: [4.0, 4.7], delta: 4.8, trace: [0.6, 0.63, 0.66, 0.7, 0.72, 0.76, 0.8, 0.86] },
      completion:  { label: '素材批量导出', value: 91, range: [84, 95], delta: 4.2, trace: [0.64, 0.68, 0.71, 0.75, 0.79, 0.83, 0.86, 0.9] },
      usage:       { label: '预设生成网站', sub: '生图', value: 0.6, range: [0.5, 0.68], delta: 9.1, trace: [0.22, 0.26, 0.3, 0.34, 0.38, 0.44, 0.52, 0.62] },
    },
    '知识库检索': {
      efficiency: { label: '文档与知识检索', sub: '知识库', value: 61, range: [48, 70], delta: 21.6, trace: [0.18, 0.24, 0.3, 0.4, 0.48, 0.56, 0.66, 0.78] },
      bugs:        { label: 'v2.0 版本', value: 1.6, range: [1.2, 2.1], delta: -33.3, trace: [0.56, 0.52, 0.48, 0.44, 0.4, 0.37, 0.35, 0.32] },
      satisfaction:{ label: '知识库检索', value: 4.3, range: [3.9, 4.6], delta: 7.5, trace: [0.5, 0.55, 0.6, 0.64, 0.68, 0.73, 0.78, 0.84] },
      completion:  { label: '知识库问答', value: 87, range: [79, 92], delta: 8.9, trace: [0.48, 0.54, 0.6, 0.65, 0.7, 0.76, 0.81, 0.87] },
      usage:       { label: '知识库检索', sub: '知识', value: 3.2, range: [2.6, 3.8], delta: 15.4, trace: [0.16, 0.2, 0.26, 0.32, 0.38, 0.46, 0.56, 0.68] },
    },
    '其他应用': {
      efficiency: { label: '方案与文案撰写', sub: '内容', value: 38, range: [28, 47], delta: 7.5, trace: [0.18, 0.22, 0.26, 0.3, 0.34, 0.38, 0.43, 0.5] },
      bugs:        { label: 'v1.5 版本', value: 2.4, range: [1.9, 2.9], delta: -22.6, trace: [0.7, 0.66, 0.62, 0.58, 0.55, 0.52, 0.5, 0.48] },
      satisfaction:{ label: '权限与协作', value: 3.6, range: [3.0, 4.1], delta: 1.1, trace: [0.5, 0.52, 0.51, 0.54, 0.55, 0.56, 0.57, 0.6] },
      completion:  { label: '跨模块跳转', value: 74, range: [64, 82], delta: -2.4, trace: [0.7, 0.68, 0.66, 0.65, 0.63, 0.62, 0.6, 0.58] },
      usage:       { label: '模板与提示词', sub: '模板', value: 0.3, range: [0.2, 0.4], delta: 4.2, trace: [0.18, 0.2, 0.22, 0.26, 0.3, 0.34, 0.4, 0.46] },
    },
  }

  // 默认 fallback（匹配不到时用第一个）
  const picked = map[appTitle] ?? Object.values(map)[0]
  return DIMS.map((d) => picked[d.key])
}

/* ---------- SVG 轨迹 ---------- */

function tracePoints(trace: number[]) {
  const n = trace.length
  return trace
    .map((t, i) => {
      const x = (i / (n - 1)) * 100
      const y = 34 - t * 28
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

function fmt(v: number) {
  return Number.isInteger(v) ? String(v) : v.toFixed(1)
}

function axisFmt(v: number) {
  return String(parseFloat(v.toFixed(2)))
}

/** 按 appTitle 返回统计元信息 */
function getMeta(appTitle: string) {
  const map: Record<string, { period: string; sample: string; updated: string }> = {
    '视觉 AI 整合网站': { period: '2025 Q3 – 2026 Q2', sample: '25 人', updated: '2026 Q2 · rev 4' },
    '预设生成网站':     { period: '2025 Q3 – 2026 Q2', sample: '56 人', updated: '2026 Q2 · rev 3' },
    '知识库检索':       { period: '2025 Q3 – 2026 Q2', sample: '128 人', updated: '2026 Q2 · rev 2' },
  }
  return map[appTitle] ?? { period: '2025 Q3 – 2026 Q2', sample: '128 人', updated: '2026 Q2 · rev 1' }
}

export default function StatsPanel({ appTitle }: { appTitle?: string }) {
  const [visible, setVisible] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)
  const appLabel = appTitle ?? '当前应用'
  const rows = getModuleData(appLabel)
  const meta = getMeta(appLabel)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={rootRef}
      className={`stats${visible ? ' is-visible' : ''}`}
      aria-label="项目效果数据面板"
    >
      {/* 两列表头 */}
      <div className="stats__header">
        <div>
          <span className="stats__eyebrow">Impact Index · 效果度量</span>
          <h2 className="stats__title">
            <em>效果展示</em>
          </h2>
        </div>
        <div>
          <p className="stats__lede">
            覆盖综合提效、页面 BUG 率、用户满意度、任务完成率与用户日均使用时长五个维度。
            区间指示器表示同口径下的波动范围，虚线为近八期趋势轨迹。
          </p>
          <div className="stats__meta">
            <div className="stats__meta-item">
              <span className="stats__meta-k">样本</span>
              <span className="stats__meta-v">{meta.sample}</span>
            </div>
            <div className="stats__meta-item">
              <span className="stats__meta-k">更新</span>
              <span className="stats__meta-v">{meta.updated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 柱状图：当前模块的五个维度 */}
      <div className="stats__chart">
        <div className="stats__chart-head">
          <div className="stats__legend">
            <span><i /> 当期值</span>
            <span><i className="is-range" /> 波动区间</span>
            <span><i className="is-trace" /> 趋势轨迹</span>
          </div>
        </div>

        <div className="stats__bars">
          {DIMS.map((dim, i) => {
            const row = rows[i]
            const w = `${Math.min(100, (row.value / dim.max) * 100)}%`
            const ticks = dim.max <= 5 ? dim.max : 4
            const axis = Array.from({ length: ticks + 1 }, (_, j) => (dim.max / ticks) * j)
            const goodDelta =
              typeof row.delta === 'number' && row.delta !== 0
                ? (dim.lowerIsBetter ? row.delta < 0 : row.delta > 0)
                : false

            return (
              <div key={dim.key} className="stats__dim-block" style={{ '--i': i } as React.CSSProperties}>
                <h3 className="stats__dim-title">{dim.label}</h3>
                <p className="stats__dim-cap">{dim.caption}</p>

                <div className="stats__bar-row" style={{ '--i': i,
                  '--r0': `${Math.max(0, (row.range[0] / dim.max) * 100)}%`,
                  '--r1': `${Math.min(100, (row.range[1] / dim.max) * 100)}%`,
                  '--w': w,
                } as React.CSSProperties}>
                  <div className="stats__label">
                    {row.label}
                    {row.sub && <b>{row.sub}</b>}
                  </div>

                  <div className="stats__track">
                    <span className="stats__range" />
                    <span className="stats__bar" />
                    <svg className="stats__trace" viewBox="0 0 100 36" preserveAspectRatio="none" style={{ width: w }} aria-hidden="true">
                      <polyline points={tracePoints(row.trace)} />
                    </svg>
                    <span className="stats__dot" />
                  </div>

                  <div className="stats__value">
                    {fmt(row.value)}
                    {dim.suffix && <em>{dim.suffix}</em>}
                    {typeof row.delta === 'number' && row.delta !== 0 && (
                      <span className={`stats__delta${goodDelta ? '' : ' is-muted'}`}>
                        {row.delta > 0 ? '+' : ''}
                        {row.delta.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* 坐标轴 */}
                <div className="stats__axis">
                  <span className="stats__axis-note">{dim.unit}</span>
                  <div className="stats__axis-scale">
                    {axis.map((v) => <span key={v}>{axisFmt(v)}</span>)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
