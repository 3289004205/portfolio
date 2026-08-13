import { useEffect, useRef, useState } from 'react'
import './StatsPanel.css'

type ColKey = string

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

const DEF_DIMS: Dim[] = [
  { key: 'efficiency', label: '综合提效', caption: '引入 AI 后的效率提升幅度', unit: '% vs 人工基线', suffix: '%', max: 100 },
  { key: 'bugs', label: '页面 BUG 率', caption: '千次访问的前端缺陷数', unit: '缺陷 / 千次访问', max: 5, lowerIsBetter: true },
  { key: 'satisfaction', label: '用户满意度', caption: '模块满意度评分', unit: '分 / 5 分制', suffix: '分', max: 5 },
  { key: 'completion', label: '任务完成率', caption: '关键任务一次性通过率', unit: '% 一次通过', suffix: '%', max: 100 },
  { key: 'usage', label: '用户日均使用时长', caption: '活跃用户日均停留时长', unit: '小时 / 日', suffix: 'h', max: 10 },
]

/** 知识库专属：仅展示综合提效、回答准确率、问题覆盖率三项 */
const KB_DIMS: Dim[] = [
  { key: 'efficiency', label: '综合提效', caption: '引入 AI 后的效率提升幅度', unit: '% vs 人工基线', suffix: '%', max: 100 },
  { key: 'accuracy', label: '回答准确率', caption: '知识库问答的回答准确率', unit: '% 准确命中', suffix: '%', max: 100 },
  { key: 'coverage', label: '问题覆盖率', caption: '可覆盖的问题范围占比', unit: '% 已覆盖', suffix: '%', max: 100 },
]

/** 预设生成网站专属：仅展示综合提效、商品一致性、图片质量达标率、卖点表达清晰度四项 */
const PRESET_DIMS: Dim[] = [
  { key: 'efficiency', label: '综合提效', caption: '引入 AI 后的效率提升幅度', unit: '% vs 人工基线', suffix: '%', max: 100 },
  { key: 'consistency', label: '商品一致性', caption: '多图商品视觉与规格一致性', unit: '% 一致', suffix: '%', max: 100 },
  { key: 'quality', label: '图片质量达标率', caption: '产出图片达标占比', unit: '% 达标', suffix: '%', max: 100 },
  { key: 'clarity', label: '卖点表达清晰度', caption: '卖点信息表达清晰度', unit: '% 清晰', suffix: '%', max: 100 },
]

/** 详情页场景图专属：展示前期 / 中期 / 后期各环节提效与整体周期缩短 */
const DETAIL_DIMS: Dim[] = [
  { key: 'early', label: '前期提效', caption: '找参考与生成初稿环节效率提升', unit: '% vs 原流程', suffix: '%', max: 100 },
  { key: 'mid', label: '中期提效', caption: '产品渲染环节效率提升', unit: '% vs 原流程', suffix: '%', max: 100 },
  { key: 'late', label: '后期提效', caption: '精修环节效率提升', unit: '% vs 原流程', suffix: '%', max: 100 },
  { key: 'overall', label: '综合提效', caption: '整套详情页交付周期缩短', unit: '% vs 原流程', suffix: '%', max: 100 },
]

/** 视频流程专属：展示主图视频成本/周期、信息流素材替代与销售额环比增长 */
const VIDEO_DIMS: Dim[] = [
  { key: 'cost', label: '主图视频成本节约', caption: '拍摄人力与场地道具费用节约', unit: '% 成本节约', suffix: '%', max: 100 },
  { key: 'cycle', label: '主图视频周期提效', caption: '导拍剪周期 20 天+ → 两周以内', unit: '% 周期缩短', suffix: '%', max: 100 },
  { key: 'material', label: '信息流素材 AI 替代', caption: '抖音 / TikTok 素材 AI 替代占比', unit: '% 替代', suffix: '%', max: 100 },
  { key: 'sales', label: '销售额环比增长', caption: '信息流视频上线后销售额环比', unit: '% 环比增长', suffix: '%', max: 100 },
]

function getDims(appTitle: string): Dim[] {
  if (appTitle === '知识库') return KB_DIMS
  if (appTitle === '预设生成网站') return PRESET_DIMS
  if (appTitle === '详情页场景图') return DETAIL_DIMS
  if (appTitle === '视频流程') return VIDEO_DIMS
  return DEF_DIMS
}

type Row = {
  label: string
  sub?: string
  value: number
  range: [number, number]
  delta?: number
  trace: number[]
}

/** 按 appTitle 返回当前模块的维度数据 */
function getModuleData(appTitle: string): Row[] {
  const map: Record<string, Record<string, Row>> = {
    '视觉 AI 整合网站': {
      efficiency: { label: '视觉素材产出', sub: '设计', value: 26, range: [18, 33], delta: 5.6, trace: [0.28, 0.36, 0.44, 0.52, 0.6, 0.68, 0.78, 0.9] },
      bugs:        { label: 'v2.5 当前版本', sub: '当前', value: 0.6, range: [0.4, 0.9], delta: -45.5, trace: [0.3, 0.27, 0.24, 0.21, 0.18, 0.16, 0.14, 0.12] },
      satisfaction:{ label: '视觉 AI 整合网站', value: 4.6, range: [4.2, 4.8], delta: 6.5, trace: [0.62, 0.66, 0.7, 0.72, 0.78, 0.82, 0.86, 0.92] },
      completion:  { label: '生图参数配置', value: 94, range: [88, 97], delta: 5.6, trace: [0.66, 0.7, 0.74, 0.78, 0.82, 0.86, 0.9, 0.94] },
      usage:       { label: '视觉 AI 整合网站', sub: '整合', value: 6.4, range: [5.2, 7.3], delta: 12.3, trace: [0.2, 0.24, 0.28, 0.34, 0.4, 0.48, 0.6, 0.74] },
    },
    '预设生成网站': {
      efficiency:  { label: '预设配置流程', sub: '配置', value: 68, range: [55, 74], delta: 14.2, trace: [0.26, 0.32, 0.4, 0.46, 0.54, 0.62, 0.7, 0.82] },
      consistency: { label: '多图商品一致性', sub: '一致性', value: 90, range: [85, 93], delta: 11.2, trace: [0.55, 0.6, 0.66, 0.71, 0.76, 0.81, 0.86, 0.9] },
      quality:     { label: '产出图片达标', sub: '达标率', value: 94, range: [90, 96], delta: 9.8, trace: [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.94] },
      clarity:     { label: '卖点信息表达', sub: '清晰度', value: 96, range: [92, 98], delta: 13.5, trace: [0.62, 0.68, 0.74, 0.79, 0.84, 0.89, 0.93, 0.96] },
    },
    '知识库': {
      efficiency: { label: '文档与知识检索', sub: '知识库', value: 44, range: [36, 44], delta: 21.6, trace: [0.18, 0.24, 0.3, 0.4, 0.48, 0.56, 0.66, 0.78] },
      accuracy:   { label: '知识库问答', sub: '问答', value: 92, range: [88, 94], delta: 12.3, trace: [0.5, 0.56, 0.62, 0.68, 0.74, 0.8, 0.86, 0.92] },
      coverage:   { label: '问题覆盖范围', sub: '覆盖', value: 97, range: [93, 99], delta: 8.5, trace: [0.6, 0.66, 0.72, 0.78, 0.83, 0.88, 0.93, 0.97] },
    },
    '其他应用': {
      efficiency: { label: '方案与文案撰写', sub: '内容', value: 38, range: [28, 47], delta: 7.5, trace: [0.18, 0.22, 0.26, 0.3, 0.34, 0.38, 0.43, 0.5] },
      bugs:        { label: 'v1.5 版本', value: 2.4, range: [1.9, 2.9], delta: -22.6, trace: [0.7, 0.66, 0.62, 0.58, 0.55, 0.52, 0.5, 0.48] },
      satisfaction:{ label: '权限与协作', value: 3.6, range: [3.0, 4.1], delta: 1.1, trace: [0.5, 0.52, 0.51, 0.54, 0.55, 0.56, 0.57, 0.6] },
      completion:  { label: '跨模块跳转', value: 74, range: [64, 82], delta: -2.4, trace: [0.7, 0.68, 0.66, 0.65, 0.63, 0.62, 0.6, 0.58] },
      usage:       { label: '模板与提示词', sub: '模板', value: 0.3, range: [0.2, 0.4], delta: 4.2, trace: [0.18, 0.2, 0.22, 0.26, 0.3, 0.34, 0.4, 0.46] },
    },
    '详情页场景图': {
      early:   { label: '找参考与生成初稿', sub: '前期', value: 33, range: [25, 40], delta: 33, trace: [0.2, 0.26, 0.32, 0.4, 0.5, 0.6, 0.72, 0.9] },
      mid:     { label: '产品渲染', sub: '中期', value: 50, range: [40, 58], delta: 50, trace: [0.2, 0.26, 0.34, 0.44, 0.54, 0.64, 0.74, 0.9] },
      late:    { label: '精修', sub: '后期', value: 70, range: [60, 78], delta: 70, trace: [0.2, 0.3, 0.42, 0.54, 0.66, 0.76, 0.86, 0.96] },
      overall: { label: '整套详情页周期', sub: '综合', value: 33, range: [25, 40], delta: 33, trace: [0.2, 0.27, 0.35, 0.46, 0.58, 0.7, 0.82, 0.9] },
    },
    '视频流程': {
      cost:     { label: '拍摄与布景', sub: '主图视频', value: 80, range: [70, 85], delta: 80, trace: [0.2, 0.3, 0.45, 0.6, 0.72, 0.82, 0.9, 0.95] },
      cycle:    { label: '导拍剪周期', sub: '主图视频', value: 30, range: [25, 40], delta: 30, trace: [0.2, 0.28, 0.36, 0.45, 0.55, 0.68, 0.82, 0.9] },
      material: { label: '抖音 / TikTok', sub: '信息流', value: 40, range: [30, 50], delta: 40, trace: [0.2, 0.26, 0.32, 0.4, 0.5, 0.6, 0.72, 0.85] },
      sales:    { label: '销售额环比', sub: '信息流', value: 31, range: [20, 40], delta: 31, trace: [0.2, 0.25, 0.3, 0.38, 0.48, 0.6, 0.74, 0.88] },
    },
  }

  // 默认 fallback（匹配不到时用第一个）
  const picked = map[appTitle] ?? Object.values(map)[0]
  return getDims(appTitle).map((d) => picked[d.key]).filter(Boolean) as Row[]
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
    '知识库':       { period: '2025 Q3 – 2026 Q2', sample: '128 人', updated: '2026 Q2 · rev 2' },
    '详情页场景图':     { period: '2025 Q3 – 2026 Q2', sample: '视觉部', updated: '2026 Q2 · rev 1' },
    '视频流程':       { period: '2025 Q3 – 2026 Q2', sample: '视觉部', updated: '2026 Q2 · rev 1' },
  }
  return map[appTitle] ?? { period: '2025 Q3 – 2026 Q2', sample: '128 人', updated: '2026 Q2 · rev 1' }
}

export default function StatsPanel({ appTitle }: { appTitle?: string }) {
  const [visible, setVisible] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)
  const appLabel = appTitle ?? '当前应用'
  const dims = getDims(appLabel)
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
            覆盖{dims.map((d) => d.label).join('、')}维度。
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
          {dims.map((dim, i) => {
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
