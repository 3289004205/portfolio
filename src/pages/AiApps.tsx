import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

type GalleryImage = { src?: string; caption: string }
type FlowStep = { title: string; desc: string }
type Section =
  | { key: string; label: string; type: 'gallery'; images: GalleryImage[] }
  | { key: string; label: string; type: 'flow'; steps: FlowStep[] }

type App = {
  id: string
  title: string
  tagline: string
  desc: string
  features: string[]
  tags: string[]
  sections?: Section[]
}

const APPS: App[] = [
  {
    id: 'visual',
    title: '视觉 AI 整合网站',
    tagline: '视觉部 AI 集合化系统',
    desc: '从 0 到 1 主导搭建的视觉部 AI 集合化系统，整合六大模块，将分散的 AI 能力统一为可协同的团队生产力平台。',
    features: [
      '网站导航：聚合团队常用 AI 工具与内部系统入口',
      '无限画布：支持自由编排与可视化创作工作流',
      '知识库：沉淀视觉规范、品牌资产与最佳实践',
      '图像 / 视频资产库：统一管理生成与采购素材',
      '提示词库：沉淀可复用的高质量提示词模板',
      '学习资源：汇集教程与案例，推动团队 AI 普及',
    ],
    tags: ['ComfyUI', '知识库', '资产管理', '工作流'],
    sections: [
      {
        key: 'showcase',
        label: '页面展示',
        type: 'gallery',
        images: [
          { caption: '首页 · 模块导航总览' },
          { caption: '无限画布 · 工作流编排' },
          { caption: '图像 / 视频资产库' },
          { caption: '提示词库 · 模板管理' },
          { caption: '知识库 · 沉淀与检索' },
          { caption: '学习资源 · 教程中心' },
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
      {
        key: 'prototype',
        label: '原型图展示',
        type: 'gallery',
        images: [
          { caption: '原型 · 信息架构' },
          { caption: '原型 · 首页布局' },
          { caption: '原型 · 画布交互' },
        ],
      },
    ],
  },
  {
    id: 'preset',
    title: '预设生成网站',
    tagline: '提示词预设生图平台',
    desc: '系统提示词预设生图网站，对接 ComfyUI 后端实现一键生图，大幅降低 AI 生图的使用门槛。',
    features: [
      '预设提示词：封装常用生图场景为开箱即用模板',
      '一键生图：对接 ComfyUI 后端，无需本地环境',
      '参数托管：统一管理采样、模型与尺寸配置',
      '结果归档：自动保存生成记录与可复用参数',
    ],
    tags: ['ComfyUI', 'Prompt', '一键生图'],
  },
  {
    id: 'service',
    title: '客服问答系统',
    tagline: 'AI 智能客服',
    desc: 'AI 智能客服系统，实现意图识别、多轮对话与自动化服务，提升售前售后响应效率。',
    features: [
      '意图识别：精准理解用户诉求并自动分流',
      '多轮对话：支持上下文连贯的复杂问题应答',
      '知识库检索：实时检索企业知识给出可靠答案',
      '自动化服务：覆盖高频咨询，降低人工成本',
    ],
    tags: ['LLM', '意图识别', 'RAG'],
  },
  {
    id: 'kb',
    title: '知识库',
    tagline: '知识库问答机器人',
    desc: '牵头搭建各部门知识库及对应问答机器人，构建数据 — 知识 — 问答的运营闭环。',
    features: [
      '多部门覆盖：为不同业务线搭建专属知识空间',
      '问答机器人：基于知识库提供自然语言检索',
      '持续更新：支持文档增量入库与版本管理',
      '闭环运营：打通数据沉淀、知识构建与问答反馈',
    ],
    tags: ['知识管理', '问答机器人', 'RAG'],
  },
]

export default function AiApps() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(APPS[0].id)
  const current = APPS.find((a) => a.id === selected) ?? APPS[0]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto min-h-screen max-w-[1100px] bg-bg px-6 py-24 md:px-10"
    >
      <button
        onClick={() => navigate('/')}
        className="mb-12 text-sm text-muted transition-colors hover:text-text-primary"
      >
        ← 返回首页
      </button>

      {/* 顶部选择卡片 */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {APPS.map((app) => {
          const active = app.id === selected
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => setSelected(app.id)}
              className={`flex flex-col rounded-2xl border p-5 text-left transition-all ${
                active
                  ? 'border-text-primary bg-surface shadow-sm shadow-black/10'
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
            </button>
          )
        })}
      </div>

      {/* 选中模块详情 */}
      <AnimatePresence mode="wait">
        <motion.section
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-8 rounded-3xl border border-stroke bg-surface p-8"
        >
          <h2 className="text-2xl font-medium text-text-primary">{current.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {current.desc}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {current.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-stroke bg-bg px-3 py-1.5 text-xs text-text-primary"
              >
                {t}
              </span>
            ))}
          </div>

          {current.sections ? (
            <div className="mt-10 flex flex-col gap-10">
              {current.sections.map((sec) => (
                <div key={sec.key}>
                  <h3 className="mb-4 text-lg font-medium text-text-primary">
                    {sec.label}
                  </h3>

                  {sec.type === 'gallery' && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {sec.images.map((img) => (
                        <figure
                          key={img.caption}
                          className="relative overflow-hidden rounded-2xl border border-stroke bg-bg"
                        >
                          {img.src ? (
                            <img
                              src={img.src}
                              alt={img.caption}
                              className="aspect-video w-full object-cover"
                            />
                          ) : (
                            <div className="flex aspect-video w-full items-center justify-center bg-surface text-xs text-muted">
                              待上传{sec.label}截图
                            </div>
                          )}
                          <figcaption className="absolute inset-x-0 bottom-0 bg-black/50 px-3 py-2 text-xs text-text-primary">
                            {img.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}

                  {sec.type === 'flow' && (
                    <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                      {sec.steps.map((step, i) => (
                        <Fragment key={step.title}>
                          <div className="flex-1 rounded-2xl border border-stroke bg-bg p-4">
                            <div className="text-xs text-muted">步骤 {i + 1}</div>
                            <div className="mt-1 text-sm font-medium text-text-primary">
                              {step.title}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-muted">
                              {step.desc}
                            </p>
                          </div>
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
          ) : (
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {current.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-text-primary/60" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.section>
      </AnimatePresence>
    </motion.main>
  )
}
