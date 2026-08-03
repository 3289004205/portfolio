import { useEffect, useMemo, useRef, useState } from 'react'
import './StatsPanel.css'

type Row = {
  label: string
  sub?: string
  value: number
  /** 区间指示器 [下界, 上界]，与 value 同量纲 */
  range: [number, number]
  /** 同比变化，正为增长 */
  delta?: number
  /** 火花轨迹，0–1 归一化序列 */
  trace: number[]
}

type Dataset = {
  key: string
  tab: string
  caption: string
  unit: string
  max: number
  note: string
  /** 数值后缀，如 % / 分 */
  suffix?: string
  /** 逆向指标：数值越低越好（如缺陷率） */
  lowerIsBetter?: boolean
}

const DATASETS: (Dataset & { rows: Row[] })[] = [
  {
    key: 'efficiency',
    tab: '综合提效',
    caption: '各环节引入 AI 能力后的效率提升幅度',
    unit: '% vs 人工基线',
    suffix: '%',
    max: 100,
    note: '2026 Q2',
    rows: [
      { label: '视觉素材产出', sub: '设计', value: 76, range: [62, 84], delta: 18.4, trace: [0.28, 0.36, 0.44, 0.52, 0.6, 0.68, 0.78, 0.9] },
      { label: '预设配置流程', sub: '配置', value: 68, range: [55, 74], delta: 14.2, trace: [0.26, 0.32, 0.4, 0.46, 0.54, 0.62, 0.7, 0.82] },
      { label: '文档与知识检索', sub: '知识库', value: 61, range: [48, 70], delta: 21.6, trace: [0.18, 0.24, 0.3, 0.4, 0.48, 0.56, 0.66, 0.78] },
      { label: '需求评审准备', sub: '产品', value: 43, range: [32, 52], delta: 9.3, trace: [0.2, 0.24, 0.28, 0.34, 0.38, 0.44, 0.5, 0.56] },
      { label: '方案与文案撰写', sub: '内容', value: 38, range: [28, 47], delta: 7.5, trace: [0.18, 0.22, 0.26, 0.3, 0.34, 0.38, 0.43, 0.5] },
      { label: '数据整理归档', sub: '运营', value: 32, range: [22, 40], delta: 5.1, trace: [0.16, 0.18, 0.22, 0.25, 0.28, 0.32, 0.36, 0.42] },
    ],
  },
  {
    key: 'bugs',
    tab: '页面 BUG 率',
    caption: '各版本上线后千次访问的前端缺陷数',
    unit: '缺陷数 / 千次访问',
    max: 5,
    note: '近 6 个版本',
    lowerIsBetter: true,
    rows: [
      { label: 'v1.0', sub: '首发', value: 4.2, range: [3.6, 4.8], trace: [0.9, 0.88, 0.86, 0.87, 0.85, 0.86, 0.84, 0.85] },
      { label: 'v1.2', value: 3.1, range: [2.6, 3.6], delta: -26.2, trace: [0.84, 0.8, 0.76, 0.72, 0.7, 0.67, 0.65, 0.63] },
      { label: 'v1.5', value: 2.4, range: [1.9, 2.9], delta: -22.6, trace: [0.7, 0.66, 0.62, 0.58, 0.55, 0.52, 0.5, 0.48] },
      { label: 'v2.0', value: 1.6, range: [1.2, 2.1], delta: -33.3, trace: [0.56, 0.52, 0.48, 0.44, 0.4, 0.37, 0.35, 0.32] },
      { label: 'v2.3', value: 1.1, range: [0.8, 1.5], delta: -31.3, trace: [0.44, 0.4, 0.36, 0.33, 0.3, 0.27, 0.25, 0.22] },
      { label: 'v2.5', sub: '当前', value: 0.6, range: [0.4, 0.9], delta: -45.5, trace: [0.3, 0.27, 0.24, 0.21, 0.18, 0.16, 0.14, 0.12] },
    ],
  },
  {
    key: 'satisfaction',
    tab: '用户满意度',
    caption: '各产品模块的用户满意度评分',
    unit: '分 / 5 分制',
    suffix: '分',
    max: 5,
    note: 'n = 128',
    rows: [
      { label: '视觉 AI 整合网站', value: 4.6, range: [4.2, 4.8], delta: 6.5, trace: [0.62, 0.66, 0.7, 0.72, 0.78, 0.82, 0.86, 0.92] },
      { label: '预设生成网站', value: 4.4, range: [4.0, 4.7], delta: 4.8, trace: [0.6, 0.63, 0.66, 0.7, 0.72, 0.76, 0.8, 0.86] },
      { label: '知识库检索', value: 4.3, range: [3.9, 4.6], delta: 7.5, trace: [0.5, 0.55, 0.6, 0.64, 0.68, 0.73, 0.78, 0.84] },
      { label: '批量出图', value: 4.1, range: [3.6, 4.5], delta: 2.5, trace: [0.58, 0.6, 0.62, 0.63, 0.66, 0.68, 0.7, 0.74] },
      { label: '移动端体验', value: 3.8, range: [3.2, 4.2], delta: -1.3, trace: [0.68, 0.66, 0.64, 0.62, 0.63, 0.6, 0.59, 0.58] },
      { label: '权限与协作', value: 3.6, range: [3.0, 4.1], delta: 1.1, trace: [0.5, 0.52, 0.51, 0.54, 0.55, 0.56, 0.57, 0.6] },
    ],
  },
  {
    key: 'completion',
    tab: '任务完成率',
    caption: '关键用户任务的一次性完成率',
    unit: '% 一次通过',
    suffix: '%',
    max: 100,
    note: '关键路径',
    rows: [
      { label: '生图参数配置', value: 94, range: [88, 97], delta: 5.6, trace: [0.66, 0.7, 0.74, 0.78, 0.82, 0.86, 0.9, 0.94] },
      { label: '素材批量导出', value: 91, range: [84, 95], delta: 4.2, trace: [0.64, 0.68, 0.71, 0.75, 0.79, 0.83, 0.86, 0.9] },
      { label: '知识库问答', value: 87, range: [79, 92], delta: 8.9, trace: [0.48, 0.54, 0.6, 0.65, 0.7, 0.76, 0.81, 0.87] },
      { label: '预设复用', value: 83, range: [74, 89], delta: 6.1, trace: [0.5, 0.55, 0.6, 0.64, 0.68, 0.72, 0.77, 0.82] },
      { label: '跨模块跳转', value: 74, range: [64, 82], delta: -2.4, trace: [0.7, 0.68, 0.66, 0.65, 0.63, 0.62, 0.6, 0.58] },
      { label: '首次上手引导', value: 68, range: [58, 77], delta: 3.8, trace: [0.44, 0.46, 0.5, 0.52, 0.55, 0.58, 0.62, 0.66] },
    ],
  },
]

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

/** 坐标轴刻度：去掉尾随零 */
function axisFmt(v: number) {
  return String(parseFloat(v.toFixed(2)))
}

export default function StatsPanel() {
  const [activeKey, setActiveKey] = useState(DATASETS[0].key)
  const [visible, setVisible] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)
  const timerRef = useRef<number | null>(null)

  const data = useMemo(
    () => DATASETS.find((d) => d.key === activeKey) ?? DATASETS[0],
    [activeKey],
  )

  // 首次进入视口播放
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
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  // 切换标签：先复位 → 140ms 后换数据 → rAF 重新触发动画
  const handleTab = (key: string) => {
    if (key === activeKey) return
    setVisible(false)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setActiveKey(key)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
    }, 140)
  }

  // 小量纲（如 5 分制）用整数刻度，避免出现 1.25 这类读数
  const ticks = data.max <= 5 ? data.max : 4
  const axis = Array.from(
    { length: ticks + 1 },
    (_, i) => (data.max / ticks) * i,
  )

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
            AI 能力落地后的
            <br />
            <em>关键指标表现</em>
          </h2>
        </div>
        <div>
          <p className="stats__lede">
            覆盖综合提效、页面 BUG 率、用户满意度与任务完成率四条主线。区间指示器表示同口径下的
            波动范围，虚线为近八期趋势轨迹。
          </p>
          <div className="stats__meta">
            <div className="stats__meta-item">
              <span className="stats__meta-k">统计周期</span>
              <span className="stats__meta-v">2025 Q3 – 2026 Q2</span>
            </div>
            <div className="stats__meta-item">
              <span className="stats__meta-k">样本</span>
              <span className="stats__meta-v">6 团队 / 128 人</span>
            </div>
            <div className="stats__meta-item">
              <span className="stats__meta-k">更新</span>
              <span className="stats__meta-v">2026 Q2 · rev 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* 标签切换 */}
      <div className="stats__tabs" role="tablist">
        {DATASETS.map((d, i) => (
          <button
            key={d.key}
            type="button"
            role="tab"
            aria-selected={d.key === activeKey}
            className={`stats__tab${d.key === activeKey ? ' is-active' : ''}`}
            onClick={() => handleTab(d.key)}
          >
            {d.tab}
            <span className="stats__tab-count">0{i + 1}</span>
          </button>
        ))}
      </div>

      {/* 图表 */}
      <div className="stats__chart">
        <div className="stats__chart-head">
          <span className="stats__unit">
            {data.caption} — {data.unit}
          </span>
          <div className="stats__legend">
            <span>
              <i /> 当期值
            </span>
            <span>
              <i className="is-range" /> 波动区间
            </span>
            <span>
              <i className="is-trace" /> 趋势轨迹
            </span>
          </div>
        </div>

        <div className="stats__bars">
          {data.rows.map((row, i) => {
            const w = `${Math.min(100, (row.value / data.max) * 100)}%`
            const r0 = `${Math.max(0, (row.range[0] / data.max) * 100)}%`
            const r1 = `${Math.min(100, (row.range[1] / data.max) * 100)}%`
            return (
              <div
                key={row.label}
                className="stats__bar-row"
                style={
                  {
                    '--i': i,
                    '--w': w,
                    '--r0': r0,
                    '--r1': r1,
                  } as React.CSSProperties
                }
              >
                <div className="stats__label">
                  {row.label}
                  {row.sub && <b>{row.sub}</b>}
                </div>

                <div className="stats__track">
                  <span className="stats__range" />
                  <span className="stats__bar" />
                  <svg
                    className="stats__trace"
                    viewBox="0 0 100 36"
                    preserveAspectRatio="none"
                    style={{ width: w }}
                    aria-hidden="true"
                  >
                    <polyline points={tracePoints(row.trace)} />
                  </svg>
                  <span className="stats__dot" />
                </div>

                <div className="stats__value">
                  {fmt(row.value)}
                  {data.suffix && <em>{data.suffix}</em>}
                  {typeof row.delta === 'number' && row.delta !== 0 && (
                    <span
                      className={`stats__delta${
                        (data.lowerIsBetter ? row.delta < 0 : row.delta > 0)
                          ? ''
                          : ' is-muted'
                      }`}
                    >
                      {row.delta > 0 ? '+' : ''}
                      {row.delta.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* 坐标轴 */}
        <div className="stats__axis">
          <span className="stats__axis-note">{data.note}</span>
          <div className="stats__axis-scale">
            {axis.map((v) => (
              <span key={v}>{axisFmt(v)}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
