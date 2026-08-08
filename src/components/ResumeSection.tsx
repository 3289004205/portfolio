import { useState } from 'react'

const SUMMARY =
  '具备 AI 技术认知与产品化系统思维，主导搭建视觉部 AI 集成系统、知识库问答智能体、预设生图平台等项目，覆盖图像/视频生成、数字人、知识管理场景。精通 Prompt 工程、ComfyUI 工作流搭建，可将业务需求转化为落地 AI 方案，推动 AI 由单点工具升级为系统化产品，提升跨部门 AI 生产力。'

const SKILL_GROUPS: { title: string; items: string[] }[] = [
  {
    title: 'AI 产品能力',
    items: [
      'AI 需求可行性评估',
      '产品架构设计',
      'Prompt 工程',
      '数据驱动迭代',
      '跨团队协作',
      '项目管理',
      '系统思维',
      'MVP 规划',
    ],
  },
  {
    title: 'AI 技术能力',
    items: [
      'ComfyUI 工作流搭建与封装',
      'RAG',
      'Vibe Coding',
      'Midjourney',
      'LoRA 模型微调训练',
      'Fluxgym / SD-trainer',
      '数字人技术',
      'AI 视频生成与剪辑',
      '知识库搭建与问答机器人',
      '飞书平台应用开发',
    ],
  },
  {
    title: '设计与后期工具',
    items: [
      'Figma 产品原型',
      'C4D / OC 渲染',
      'Photoshop',
      'After Effects',
    ],
  },
]

const EXPERIENCE: {
  company: string
  role: string
  period: string
  points: string[]
}[] = [
  {
    company: '浙江麦瑞克科技有限公司',
    role: 'AIGC 专家',
    period: '2025.06 — 至今',
    points: [
      '主导视觉部 AI 集合化系统、预设生图平台、知识库问答机器人等 AI 产品从 0 到 1 搭建与落地，覆盖图像/视频生成、知识管理场景',
      '负责 ComfyUI 工作流本地化推广、AI 视频流程优化与多部门数字人技术落地，推动 AI 工具跨部门普及',
      '参与新版麦瑞克官网 UI 设计、Figma 原型与动态视频产出，支撑官网视觉升级',
      '主导多个 AI 产品落地，推动 AI 工具跨部门普及，显著提升团队 AI 生产力',
    ],
  },
  {
    company: '宁波睿特菲体育科技有限公司',
    role: 'AIGC 设计师',
    period: '2024.11 — 2025.06',
    points: [
      '搭建飞书需求流程系统，规范亚马逊运营与设计协作流程，实现需求线上化闭环',
      '使用 ComfyUI 生成图像、训练产品/人物 LoRA，产出亚马逊、Facebook 等平台投放物料，效率提升数倍、广告转化率平均 +10%',
      '实现运营-设计协作线上化，AI 物料产出效率提升数倍，广告转化率平均 +10%',
    ],
  },
]

const PROJECTS: {
  title: string
  role: string
  company: string
  period: string
  points: string[]
}[] = [
  {
    title: '视觉部 AI 集合化系统',
    role: '产品主导',
    company: '浙江麦瑞克科技有限公司',
    period: '2025.06 — 至今',
    points: [
      '从 0 到 1 主导搭建部门级 AI 生产力平台，定义网站导航、无限画布、知识库、图像视频资产库、提示词库、学习资源六大模块及协同数据流转',
      '推动系统在视觉部与多部门落地，统一 AI 工具入口，显著提升生图/视频产出效率与资产复用率',
    ],
  },
  {
    title: '知识库搭建与问答机器人',
    role: '产品主导',
    company: '浙江麦瑞克科技有限公司',
    period: '2025.06 — 至今',
    points: [
      '牵头搭建公司各部门知识库并开发对应问答机器人，整合业务文档、设计规范、AI 工具教程，构建「提问-回答-补充-优化」数据闭环',
      '实现知识统一沉淀与智能检索，降低新人学习成本与重复沟通成本',
    ],
  },
  {
    title: '预设生图平台',
    role: '产品主导',
    company: '浙江麦瑞克科技有限公司',
    period: '2025.06 — 至今',
    points: [
      '开发面向团队的生图网站，通过系统提示词预设模板化降低使用门槛，对接 ComfyUI 后端实现一键生图',
      '覆盖多场景生图需求，实现提示词模板化与参数配置自动化，提升整体产出效率',
    ],
  },
  {
    title: '图像生成工作流优化与 ComfyUI 本地化推广',
    role: '主导推进',
    company: '浙江麦瑞克科技有限公司',
    period: '2025.06 — 至今',
    points: [
      '搭建并封装 ComfyUI 工作流（文生图/图生图/扩图/产品背景生成），面向团队开展培训并编写使用文档',
      '推动 AI 生图流程标准化与跨部门普及，实现从需求到产出的可复制工作流',
    ],
  },
  {
    title: '飞书需求流程系统搭建',
    role: '主导推进',
    company: '宁波睿特菲体育科技有限公司',
    period: '2025.01 — 2025.06',
    points: [
      '基于飞书多维表格与自动化搭建需求管理系统，梳理亚马逊运营与设计协作全流程节点',
      '实现需求提报-审批-交付线上化闭环，降低跨部门沟通成本，提升协作效率',
    ],
  },
  {
    title: '新版麦瑞克官网（UI / 原型 / 动态视频）',
    role: '参与设计',
    company: '浙江麦瑞克科技有限公司',
    period: '2025.06 — 至今',
    points: [
      '参与官网视觉风格定义与 UI 设计，使用 Figma 完成交互原型，推动设计到开发高效交付',
      '结合 AI 视频工具产出动态视觉物料，支撑官网视觉升级与品牌展示',
    ],
  },
  {
    title: '详情页图片与视频 AI 素材规模化产出',
    role: '主导推进',
    company: '浙江麦瑞克科技有限公司',
    period: '2025.06 — 至今',
    points: [
      '详情页 AI 生图流程：制定详情页标准化 AI 生图工作流，批量产出产品场景图与营销物料，提升单品素材交付效率',
      '抖音信息流 AI 流程：搭建抖音信息流广告 AI 素材生产流程，适配多版本短视频投放，提升素材产出与迭代速度',
      '品牌 TVC 与首页视频：制定品牌 TVC AI 生产流程，完成首页宣传视频的 AI 生成与剪辑交付，支撑品牌视觉传播',
      '打通详情页、信息流、品牌 TVC 多场景 AI 素材生产链路，显著提升营销素材规模化产出与交付效率',
    ],
  },
]

const EDUCATION = {
  school: '天津中德应用技术大学',
  degree: '本科 · 工艺美术',
  period: '2020 — 2024',
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-8 bg-stroke" />
      <span className="text-xs uppercase tracking-[0.3em] text-muted">{children}</span>
    </div>
  )
}

/** 点击复制号码的联系按钮（微信 / 电话），复制后短暂显示「已复制」。 */
function CopyContactButton({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard?.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`点击复制${label}`}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-text-primary transition-colors hover:bg-surface/70"
    >
      <span className="text-sm">{label}</span>
      <span className={copied ? 'text-sm text-green-400' : 'text-sm text-muted'}>
        {copied ? '已复制 ✓' : value}
      </span>
    </button>
  )
}

export default function ResumeSection() {
  return (
    <section id="resume" className="w-full bg-transparent pb-20 pt-12 md:pb-28 md:pt-16 print:pb-6 print:pt-6">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <Eyebrow>Resume · 简历</Eyebrow>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
              杨秀龙
            </h2>
            <p className="mt-2 text-sm text-muted md:text-base">Xiulong Yang</p>
          </div>
          <div className="flex items-end gap-5">
            <div className="flex flex-col gap-1 text-sm text-muted md:items-end">
              <span>AIGC 产品经理 / AI 产品化落地</span>
              <span>男 · 23 岁 · 2 年工作经验</span>
              <a
                href="mailto:3289004205@qq.com"
                className="text-text-primary transition-colors hover:text-muted"
              >
                3289004205@qq.com
              </a>
              <div className="flex flex-wrap gap-1">
                <CopyContactButton label="微信" value="19163309757" />
                <CopyContactButton label="电话" value="19163309757" />
              </div>
            </div>
            <img
              src="/photo.jpg"
              alt="杨秀龙"
              className="aspect-[3/4] h-32 rounded-2xl border border-stroke bg-surface object-cover md:h-40"
            />
          </div>
        </div>

        {/* Summary */}
        <p className="mt-10 max-w-5xl text-base leading-relaxed text-muted md:text-lg print:mt-6">
          {SUMMARY}
        </p>

        {/* Skills */}
        <div className="mt-16 print:mt-8">
          <h3 className="text-2xl font-medium text-text-primary">核心技能</h3>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
            {SKILL_GROUPS.map((g) => (
              <div key={g.title}>
                <h4 className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">
                  {g.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-stroke bg-surface px-3 py-1.5 text-xs text-text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mt-16 print:mt-8">
          <h3 className="text-2xl font-medium text-text-primary">工作经历</h3>
          <div className="mt-6 flex flex-col gap-8 border-t border-stroke pt-8">
            {EXPERIENCE.map((e) => (
              <div
                key={e.company}
                className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"
              >
                <div className="max-w-2xl">
                  <h4 className="text-lg text-text-primary">{e.role}</h4>
                  <p className="text-sm text-muted">{e.company}</p>
                  <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm text-muted">
                    {e.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <span className="flex-shrink-0 text-sm text-muted md:text-right">
                  {e.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-16 print:mt-8">
          <h3 className="text-2xl font-medium text-text-primary">项目经历</h3>
          <div className="mt-6 flex flex-col gap-8 border-t border-stroke pt-8">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="text-lg text-text-primary">{p.title}</h4>
                    <span className="rounded-full border border-stroke bg-surface px-2.5 py-0.5 text-xs text-muted">
                      {p.role}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {p.company} · {p.period}
                  </p>
                  <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm text-muted">
                    {p.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-16 print:mt-8">
          <h3 className="text-2xl font-medium text-text-primary">教育经历</h3>
          <div className="mt-6 flex items-start justify-between border-t border-stroke pt-8">
            <div>
              <h4 className="text-lg text-text-primary">{EDUCATION.school}</h4>
              <p className="text-sm text-muted">{EDUCATION.degree}</p>
            </div>
            <span className="text-sm text-muted">{EDUCATION.period}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
