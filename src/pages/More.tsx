import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'

type SubPart = {
  id: string
  title: string
  desc: string
}

type Category = {
  id: string
  title: string
  tagline: string
  desc: string
  subs: SubPart[]
}

const CATEGORIES: Category[] = [
  {
    id: 'digital-human',
    title: '数字人应用',
    tagline: '数字人视频 / 流程与培训',
    desc: '基于数字人技术落地视频生产与培训场景，覆盖内容生成到流程化交付。',
    subs: [
      { id: 'video', title: '数字人视频', desc: '基于数字人形象生成口播、讲解类视频，降低真人出镜与拍摄成本。' },
      { id: 'training', title: '流程与培训', desc: '将数字人能力封装为标准化流程，用于员工培训与业务宣贯。' },
    ],
  },
  {
    id: 'lora',
    title: 'LoRA 训练',
    tagline: '产品类 / 人物类',
    desc: '针对产品与人物分别训练专属 LoRA 模型，沉淀可复用的风格与特征资产。',
    subs: [
      { id: 'product', title: '产品类', desc: '训练产品专属 LoRA，保证电商与物料生图风格、细节一致。' },
      { id: 'character', title: '人物类', desc: '训练人物专属 LoRA，固化形象特征用于多场景复用。' },
    ],
  },
  {
    id: '3d',
    title: '3D 渲染',
    tagline: '图片 / 视频',
    desc: '结合 AI 与 3D 管线，输出高质量静帧与动态渲染内容。',
    subs: [
      { id: 'image', title: '图片', desc: '输出高质量 3D 静帧与产品渲染图。' },
      { id: 'video', title: '视频', desc: '生成 3D 动态渲染视频，用于宣传与演示。' },
    ],
  },
  {
    id: 'prototype',
    title: '原型设计',
    tagline: '官网页面设计 / 交互设计',
    desc: '从官网页面到交互细节，快速验证产品形态与用户体验。',
    subs: [
      { id: 'web', title: '官网页面设计', desc: '面向品牌官网的页面视觉与版式设计。' },
      { id: 'interaction', title: '交互设计', desc: '梳理信息架构与交互流程，输出可交付原型。' },
    ],
  },
  {
    id: 'rpa',
    title: 'RPA 应用',
    tagline: '自动素材搜集 / AI 日报信息收集',
    desc: '用自动化流程替代重复人工，覆盖素材搜集与每日信息整理。',
    subs: [
      { id: 'collect', title: '自动素材搜集', desc: '自动化采集与归档设计、营销素材，减少重复人工。' },
      { id: 'digest', title: 'AI 日报信息收集', desc: '定时聚合行业与竞品信息，生成每日 AI 简报。' },
    ],
  },
  {
    id: 'process',
    title: '流程化应用',
    tagline: '多维表格项目需求表搭建',
    desc: '将分散的 AI 能力与业务动作编排为标准化、可复用的流程化应用。',
    subs: [
      {
        id: 'table',
        title: '多维表格项目需求表搭建',
        desc: '用多维表格搭建项目需求管理表，统一需求流转与跟踪。',
      },
    ],
  },
]

export default function More() {
  const [selected, setSelected] = useState(CATEGORIES[0].id)
  const [selectedSub, setSelectedSub] = useState(CATEGORIES[0].subs[0].id)

  const current = CATEGORIES.find((c) => c.id === selected) ?? CATEGORIES[0]
  const activeSub =
    current.subs.find((s) => s.id === selectedSub) ?? current.subs[0]

  const handleSelect = (id: string) => {
    const cat = CATEGORIES.find((c) => c.id === id)
    if (!cat) return
    setSelected(id)
    setSelectedSub(cat.subs[0].id)
  }

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
        {/* 分类选项（与 AI 应用页一致的卡片样式） */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => {
            const active = cat.id === selected
            return (
              <SpotlightCard
                key={cat.id}
                as="button"
                type="button"
                onClick={() => handleSelect(cat.id)}
                spotlightColor={
                  active ? 'rgba(137, 170, 204, 0.45)' : 'rgba(255, 255, 255, 0.18)'
                }
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
                  {cat.title}
                </span>
                <span className="mt-1 text-xs text-muted">{cat.tagline}</span>
              </SpotlightCard>
            )
          })}
        </div>

        {/* 子项选项 */}
        <div className="mt-8 flex flex-wrap gap-3">
          {current.subs.map((sub) => {
            const active = sub.id === selectedSub
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSub(sub.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  active
                    ? 'border-text-primary bg-surface text-text-primary'
                    : 'border-stroke bg-surface/40 text-muted hover:bg-surface/70'
                }`}
              >
                {sub.title}
              </button>
            )
          })}
        </div>

        {/* 详情 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-${activeSub.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-3xl border border-stroke bg-surface p-8"
          >
            <h2 className="text-2xl font-medium text-text-primary">
              {activeSub.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {activeSub.desc}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-stroke bg-bg"
                >
                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface text-xs text-muted">
                    待上传{activeSub.title}截图
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </>
  )
}
