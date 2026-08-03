const SUMMARY =
  '具备从 AI 视觉设计师到 AIGC 产品化落地的完整成长路径，兼具 AI 技术深度理解与产品化系统思维。主导搭建视觉部 AI 集合化系统、AI 客服系统、知识库问答机器人、提示词预设生图平台等多个 AI 产品项目，覆盖 AI 图像生成、视频生成、数字人、智能客服、知识管理等核心场景。精通 Prompt 工程与 ComfyUI 工作流搭建，能够将模糊业务需求翻译为可落地的 AI 技术方案，推动 AI 从单点工具走向系统化产品，实现跨部门 AI 生产力提升。'

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
      'Stable Diffusion',
      'Midjourney',
      'LoRA 模型微调训练',
      'Fluxgym / SD-trainer',
      '数字人技术',
      'AI 视频生成与剪辑',
      'AI 客服系统搭建',
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
      'Premiere Pro',
      'Illustrator',
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
    role: 'AIGC 专员',
    period: '2025.06 — 至今',
    points: [
      '从 0 到 1 主导搭建视觉部 AI 集合化系统，整合网站导航、无限画布、知识库、图像视频资产库、提示词库、学习资源六大模块',
      '负责 AI 智能客服系统的产品设计与落地，实现意图识别、多轮对话与自动化服务',
      '开发系统提示词预设生图网站，对接 ComfyUI 后端实现一键生图，降低 AI 生图使用门槛',
      '牵头搭建公司各部门知识库及对应问答机器人，构建数据-知识-问答闭环',
      '参与新版麦瑞克官网的 UI 设计、Figma 原型设计与动态视频产出',
      '完成 ComfyUI 工作流本地化搭建与封装，面向团队培训推广，推动 AI 生图工具跨部门普及',
    ],
  },
  {
    company: '宁波睿特菲体育科技有限公司',
    role: 'AIGC 设计师',
    period: '2024.11 — 2025.06',
    points: [
      '搭建飞书需求流程系统，规范亚马逊运营与设计协作流程，实现需求提报、审批、进度跟踪线上化',
      '使用 ComfyUI 生成图像、训练产品/人物类 LoRA 模型，产出亚马逊、Facebook 等投放物料，效率提升数倍、广告转化率平均 +10%',
      '对生成图像进行质量评估与后期编辑优化，确保准确性、商业性与美观性',
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

export default function ResumeSection() {
  return (
    <section id="resume" className="w-full bg-transparent pb-20 pt-12 md:pb-28 md:pt-16">
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
            </div>
            <img
              src="/photo.jpg"
              alt="杨秀龙"
              className="aspect-[3/4] h-32 rounded-2xl border border-stroke bg-surface object-cover md:h-40"
            />
          </div>
        </div>

        {/* Summary */}
        <p className="mt-10 max-w-5xl text-base leading-relaxed text-muted md:text-lg">
          {SUMMARY}
        </p>

        {/* Skills */}
        <div className="mt-16">
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
        <div className="mt-16">
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

        {/* Education */}
        <div className="mt-16">
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
