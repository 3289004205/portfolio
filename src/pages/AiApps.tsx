import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import FeaturesChess from '../components/FeaturesChess/FeaturesChess'
import StatsPanel from '../components/StatsPanel/StatsPanel'

type GalleryImage = { src?: string; caption: string }
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
    tags: ['ComfyUI', 'Prompt', '一键生图'],
    sections: [
      {
        key: 'showcase',
        label: '页面展示',
        type: 'gallery',
        images: [
          { caption: '首页 · 预设模板选择' },
          { caption: '生图页 · 参数配置' },
          { caption: '结果页 · 成片预览' },
          { caption: '历史记录 · 参数复用' },
        ],
      },
      {
        key: 'flow',
        label: '产品流程图详解',
        type: 'flow',
        steps: [
          { title: '选择预设模板', desc: '按场景选取开箱即用的提示词与参数模板。' },
          { title: '配置参数', desc: '统一管理采样、模型、尺寸等生图配置。' },
          { title: '调用 ComfyUI', desc: '后端异步生图，无需本地部署环境。' },
          { title: '结果校验', desc: '预览成片，支持重生成与微调对比。' },
          { title: '归档复用', desc: '保存记录与可复用参数，沉淀团队资产。' },
        ],
      },
      {
        key: 'prototype',
        label: '原型图展示',
        type: 'gallery',
        images: [
          { caption: '原型 · 信息架构' },
          { caption: '原型 · 生图交互' },
          { caption: '原型 · 历史管理' },
        ],
      },
      {
        key: 'badcase',
        label: 'Badcase 优化',
        type: 'badcase',
        items: [
          {
            problem: '生成图像与提示词预期不符',
            fix: '优化预设模板的提示词结构，增加负向提示词与示例对照，提升可控性。',
          },
          {
            problem: '生图偶发失败 / 超时',
            fix: '引入任务队列与重试机制，超时自动回退并给出明确提示。',
          },
          {
            problem: '不同模型输出风格不一致',
            fix: '统一采样参数与 LoRA 权重，建立风格校准基线，保证成片一致性。',
          },
          {
            problem: '参数配置门槛偏高',
            fix: '暴露常用参数、收起高级项，提供「一键最佳」预设降低上手成本。',
          },
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
        key: 'build',
        label: '飞书各部门知识库搭建',
        type: 'gallery',
        images: [
          { caption: '飞书知识库 · 部门空间总览' },
          { caption: '知识库 · 文档管理与版本' },
        ],
      },
      {
        key: 'bot',
        label: '各部门知识库问答机器人',
        type: 'gallery',
        images: [
          { caption: '问答机器人 · 对话界面' },
          { caption: '问答机器人 · 知识检索结果' },
        ],
      },
      {
        key: 'badcase',
        label: 'Badcase 分析',
        type: 'badcase',
        items: [
          {
            problem: '问答机器人答非所问 / 出现幻觉',
            fix: '强化检索增强（RAG）约束，要求答案必须基于检索片段并标注来源，无依据时主动拒答。',
          },
          {
            problem: '知识库检索不准 / 漏检',
            fix: '优化文档切分与向量召回，增加同义词与重排策略，提升长尾问题的命中率。',
          },
          {
            problem: '知识更新滞后导致答案过时',
            fix: '建立增量入库与定期审查机制，过期内容自动标记并提示负责人复核。',
          },
          {
            problem: '权限配置不当引发信息泄露',
            fix: '细化角色权限，敏感知识单独隔离并加密，关键操作留痕审计。',
          },
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
          { caption: '提示词反推 · 结果界面' },
          { caption: '素材库 · 归档管理' },
        ],
      },
      {
        key: 'figma-batch',
        label: 'Figma 批量主图修改插件',
        type: 'gallery',
        images: [
          { caption: 'Figma 插件 · 批量替换面板' },
          { caption: 'Figma 插件 · 多尺寸导出' },
        ],
      },
      {
        key: 'comfy-cache',
        label: 'ComfyUI 缓存清理插件',
        type: 'gallery',
        images: [
          { caption: '缓存清理 · 扫描结果' },
          { caption: '缓存清理 · 清理完成' },
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
function FeatureTile({ caption }: { caption: string }) {
  return (
    <SpotlightCard className="liquid-glass overflow-hidden rounded-2xl">
      <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.06] px-3 text-center text-xs text-muted">
        待上传截图
        <span className="mt-1 block text-[10px] opacity-70">{caption}</span>
      </div>
    </SpotlightCard>
  )
}

export default function AiApps() {
  const [selected, setSelected] = useState(APPS[0].id)
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
            <FeaturesChess />
            <StatsPanel />
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
                          <FeatureTile key={img.caption} caption={img.caption} />
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
            {STATS_PAGES.includes(current.id) && <StatsPanel />}
          </motion.section>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  )
}
