import { useState, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import StatsPanel from '../components/StatsPanel/StatsPanel'
import BackToTop from '../components/BackToTop'

type GalleryImage = { src?: string; caption: string; aspect?: string; wide?: boolean }
type FlowStep = { title: string; desc: string }
type BadcaseItem = { problem: string; fix: string }
type Section =
  | { key: string; label: string; type: 'gallery'; images: GalleryImage[] }
  | { key: string; label: string; type: 'flow'; steps: FlowStep[] }
  | { key: string; label: string; type: 'badcase'; items: BadcaseItem[] }

type App = {
  id: string
  title: string
  tagline: string
  desc: string
  tags: string[]
  sections?: Section[]
}

/** 需要在详情区最下方展示数据面板的子页面 */
const STATS_PAGES = ['visual', 'preset', 'kb']

const APPS: App[] = [
  {
    id: 'visual',
    title: '视觉 AI 整合网站',
    tagline: '视觉部 AI 集合化系统',
    desc: '从 0 到 1 主导搭建的视觉部 AI 集合化系统，整合六大模块，将分散的 AI 能力统一为可协同的团队生产力平台。',
    tags: ['ComfyUI', '知识库', '资产管理', '工作流'],
    sections: [
      {
        key: 'showcase',
        label: '页面展示',
        type: 'gallery',
        images: [
          { src: '/explorations/visual-showcase/03-homepage.jpg', caption: '首页 · Visual Department Platform' },
          { src: '/explorations/visual-showcase/01-test-cases.jpg', caption: '测试案例 · 工作流画板' },
          { src: '/explorations/visual-showcase/02-resource-nav.jpg', caption: '资源导航 · 按需直达' },
          { src: '/explorations/visual-showcase/04-ai-news.jpg', caption: 'AI 新闻 · 设计趋势' },
          { src: '/explorations/visual-showcase/05-material-library.jpg', caption: '素材库 · Pinterest 图像资源' },
          { src: '/explorations/visual-showcase/06-smart-workflow.jpg', caption: '智能图像工作流 · 一键出图' },
        ],
      },
      {
        key: 'flow',
        label: '产品流程图详解',
        type: 'flow',
        steps: [
          { title: '统一入口登录', desc: '成员通过整合网站单点进入，按角色与权限分发可用模块。' },
          { title: '模块选择', desc: '导航 / 画布 / 知识库 / 资产库 / 提示词库 / 学习资源。' },
          { title: 'AI 能力调用', desc: '对接 ComfyUI 生图、问答机器人、检索等底层 AI 能力。' },
          { title: '结果沉淀', desc: '生成物自动归档至资产库，知识回流至知识库持续积累。' },
          { title: '复用与协作', desc: '团队共享模板与资产，持续迭代优化生产流。' },
        ],
      },
    ],
  },
  {
    id: 'preset',
    title: '预设生成网站',
    tagline: '提示词预设生图平台',
    desc: '系统提示词预设生图网站，对接 ComfyUI 后端实现一键生图，大幅降低 AI 生图的使用门槛。',
    tags: ['Prompt', '一键生图'],
    sections: [
      {
        key: 'showcase',
        label: '页面展示',
        type: 'gallery',
        images: [
          { src: '/explorations/preset/01.webp', caption: '首页 · 预设模板选择', wide: true },
        ],
      },
      {
        key: 'direct',
        label: '直出效果展示',
        type: 'gallery',
        images: [
          { src: '/explorations/preset/02.png', caption: '黑金商务风' },
          { src: '/explorations/preset/03.png', caption: '简约白科技风' },
          { src: '/explorations/preset/04.png', caption: '深绿质感风' },
          { src: '/explorations/preset/05.png', caption: '暗黑科技风' },
        ],
      },
      {
        key: 'flow',
        label: '产品流程图详解',
        type: 'flow',
        steps: [
          { title: '用户输入信息', desc: '用户输入产品与需求信息，作为生成流程的起点。' },
          { title: '意图识别与重写', desc: '解析用户意图，将输入重写为可执行的生成指令。' },
          { title: '素材库检索', desc: '从素材库匹配参考图、模板与风格素材。' },
          { title: '大模型改写文案信息', desc: '大模型基于素材与需求改写文案，提炼卖点与画面描述。' },
          { title: 'GPT Image 2图生图', desc: 'GPT Image 2 结合文案与参考图进行图生图，输出成片。' },
        ],
      },
    ],
  },
  {
    id: 'kb',
    title: '知识库',
    tagline: '知识库问答机器人',
    desc: '牵头搭建各部门知识库及对应问答机器人，构建数据 — 知识 — 问答的运营闭环。',
    tags: ['知识管理', '问答机器人', 'RAG'],
    sections: [
      {
        key: 'showcase',
        label: '各部门知识库及机器人展示',
        type: 'gallery',
        images: [
          { src: '/explorations/kb-showcase/01-knowledge-base.png', caption: '飞书知识库 · 各部门空间总览', aspect: 'aspect-[3/2]' },
          { src: '/explorations/kb-showcase/02-qa-bot.png', caption: '问答机器人 · 视觉部知识库答疑小助手', aspect: 'aspect-[3/2]' },
        ],
      },
      {
        key: 'flow',
        label: '产品流程图详解',
        type: 'flow',
        steps: [
          { title: '用户输入信息', desc: '用户提交问题，作为问答流程的起点。' },
          { title: '向量化', desc: '将用户问题转换为向量表示，便于语义匹配。' },
          { title: '知识库检索', desc: '在知识库中检索与问题语义最相近的内容。' },
          { title: '召回片段', desc: '召回相关文档片段，作为上下文候选。' },
          { title: '重排序', desc: '对召回结果重排序，筛选最相关的片段。' },
          { title: '大模型输出', desc: '大模型基于精选上下文生成回答。' },
        ],
      },
    ],
  },
  {
    id: 'others',
    title: '其他应用',
    tagline: '效率工具与插件',
    desc: '围绕 AI 生图与设计工作流打磨的一系列效率插件，覆盖提示词反推、批量出图与缓存治理等高频痛点。',
    tags: ['插件', 'Figma', 'ComfyUI', '效率工具'],
    sections: [
      {
        key: 'prompt-reverse',
        label: '提示词反推与素材库插件',
        type: 'gallery',
        images: [
          { src: '/explorations/others/01-prompt-reverse.jpg', caption: '提示词反推 · 结果界面', aspect: 'aspect-[16/10]' },
          { src: '/explorations/others/02-material-library.jpg', caption: '素材库 · 归档管理', aspect: 'aspect-[16/10]' },
        ],
      },
      {
        key: 'figma-batch',
        label: 'Figma 批量主图修改插件',
        type: 'gallery',
        images: [
          { src: '/explorations/others/03-figma-batch.jpg', caption: 'Figma 插件 · 批量替换面板' },
        ],
      },
    ],
  },
]

/** 项目介绍框：显示当前选中项目的标题 / 简介 / 标签 */
function ProjectIntro({ app }: { app: App }) {
  return (
    <SpotlightCard className="liquid-glass rounded-2xl px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display italic text-3xl leading-[0.9] tracking-tight text-text-primary md:text-5xl">
            {app.title}
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-muted">{app.desc}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {app.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-stroke bg-white/[0.06] px-3 py-1 font-body text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}

/** 与 FeaturesChess 一致的毛玻璃图片占位（视觉 AI 整合网站形式） */
function FeatureTile({ caption, src, aspect, className }: { caption: string; src?: string; aspect?: string; className?: string }) {
  return (
    <SpotlightCard className={`liquid-glass overflow-hidden rounded-2xl ${className || ''}`}>
      {src ? (
        aspect ? (
          <div className={`w-full overflow-hidden ${aspect}`}>
            <img src={src} alt={caption} className="h-full w-full object-cover" loading="lazy" />
          </div>
        ) : (
          <img src={src} alt={caption} className="h-auto w-full" loading="lazy" />
        )
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.06] px-3 text-center text-xs text-muted">
          待上传截图
          <span className="mt-1 block text-[10px] opacity-70">{caption}</span>
        </div>
      )}
    </SpotlightCard>
  )
}

export default function AiApps() {
  const location = useLocation()
  const [selected, setSelected] = useState<string>(() => {
    const app = (location.state as { app?: string } | null)?.app
    return app && APPS.some((a) => a.id === app) ? app : APPS[0].id
  })
  const current = APPS.find((a) => a.id === selected) ?? APPS[0]

  return (
    <>
      <Navbar />
      <RaysBackground />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto min-h-screen max-w-[1100px] bg-transparent px-6 py-24 md:px-10"
      >
      {/* 顶部选择卡片 */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {APPS.map((app) => {
          const active = app.id === selected
          return (
            <SpotlightCard
              key={app.id}
              as="button"
              type="button"
              onClick={() => setSelected(app.id)}
              spotlightColor={
                active ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.18)'
              }
              className={`flex flex-col rounded-2xl border p-5 text-left transition-all ${
                active
                  ? 'border-stroke shadow-[0_0_28px_-6px_rgba(137,170,204,0.55)]'
                  : 'border-stroke bg-surface/40 hover:bg-surface/70'
              }`}
            >
              <span
                className={`text-base font-medium ${
                  active ? 'text-text-primary' : 'text-text-primary/80'
                }`}
              >
                {app.title}
              </span>
              <span className="mt-1 text-xs text-muted">{app.tagline}</span>
            </SpotlightCard>
          )
        })}
      </div>

      {/* 项目介绍框（跟随选中项目切换） */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-9"
        >
          <ProjectIntro app={current} />
        </motion.div>
      </AnimatePresence>

      {/* 选中模块详情 */}
      <AnimatePresence mode="wait">
        {current.id === 'visual' ? (
          <motion.div
            key="visual"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {current.sections && (
              <div className="mt-16 flex flex-col">
                {current.sections.map((sec, si) => (
                  <div
                    key={sec.key}
                    className={si < current.sections!.length - 1 ? 'mb-24' : ''}
                  >
                    <div className="mb-10 max-w-2xl space-y-5">
                      <h3 className="text-3xl font-display italic leading-[0.9] tracking-tight text-text-primary md:text-4xl">
                        {sec.label}
                      </h3>
                    </div>

                    {sec.type === 'gallery' && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {sec.images.map((img) => (
                          <FeatureTile
                            key={img.caption}
                            caption={img.caption}
                            src={img.src}
                            aspect={img.aspect}
                            className={img.wide ? 'md:col-span-2' : ''}
                          />
                        ))}
                      </div>
                    )}

                    {sec.type === 'flow' && (
                      <div className="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-5">
                        {sec.steps.map((step, i) => (
                          <Fragment key={step.title}>
                            <SpotlightCard className="flex-1 liquid-glass rounded-2xl p-6">
                              <div className="font-body text-xs text-muted">步骤 {i + 1}</div>
                              <div className="mt-1 font-body text-sm font-medium text-text-primary">
                                {step.title}
                              </div>
                              <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                                {step.desc}
                              </p>
                            </SpotlightCard>
                            {i < sec.steps.length - 1 && (
                              <div className="hidden items-center justify-center text-muted md:flex">
                                →
                              </div>
                            )}
                          </Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <StatsPanel appTitle={current.title} />
            <BackToTop />
          </motion.div>
        ) : (
          <motion.section
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-8 py-16"
          >
            {current.sections && (
              <div className="flex flex-col">
                {current.sections.map((sec, si) => (
                  <div
                    key={sec.key}
                    className={si < current.sections!.length - 1 ? 'mb-24' : ''}
                  >
                    <div className="mb-10 max-w-2xl space-y-5">
                      <h3 className="text-3xl font-display italic leading-[0.9] tracking-tight text-text-primary md:text-4xl">
                        {sec.label}
                      </h3>
                    </div>

                    {sec.type === 'gallery' && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {sec.images.map((img) => (
                          <FeatureTile
                            key={img.caption}
                            caption={img.caption}
                            src={img.src}
                            aspect={img.aspect}
                            className={img.wide ? 'md:col-span-2' : ''}
                          />
                        ))}
                      </div>
                    )}

                    {sec.type === 'flow' && (
                      <div className="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-5">
                        {sec.steps.map((step, i) => (
                          <Fragment key={step.title}>
                            <SpotlightCard className="flex-1 liquid-glass rounded-2xl p-6">
                              <div className="font-body text-xs text-muted">步骤 {i + 1}</div>
                              <div className="mt-1 font-body text-sm font-medium text-text-primary">
                                {step.title}
                              </div>
                              <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                                {step.desc}
                              </p>
                            </SpotlightCard>
                            {i < sec.steps.length - 1 && (
                              <div className="hidden items-center justify-center text-muted md:flex">
                                →
                              </div>
                            )}
                          </Fragment>
                        ))}
                      </div>
                    )}

                    {sec.type === 'badcase' && (
                      <div className="flex flex-col gap-4">
                        {sec.items.map((item, i) => (
                          <SpotlightCard
                            key={i}
                            className="liquid-glass rounded-2xl p-5"
                          >
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface text-xs text-text-primary">
                                !
                              </span>
                              <div>
                                <div className="font-body text-sm font-medium text-text-primary">
                                  {item.problem}
                                </div>
                                <div className="mt-1 font-body text-xs leading-relaxed text-muted">
                                  <span className="text-text-primary/80">优化：</span>
                                  {item.fix}
                                </div>
                              </div>
                            </div>
                          </SpotlightCard>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 数据面板（仅视觉 AI 整合网站 / 预设生成网站 / 知识库） */}
            {STATS_PAGES.includes(current.id) && (
              <StatsPanel appTitle={current.title} />
            )}
            <BackToTop />
          </motion.section>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  )
}
