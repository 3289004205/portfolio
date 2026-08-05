export type SubPart = {
  id: string
  title: string
  desc: string
  /** B 站视频 BV 号，优先用嵌入播放器 */
  bilibili?: string
  /** 多个 B 站视频 BV 号，渲染为嵌入播放器网格 */
  bilibiliVideos?: string[]
  /** 单个视频直链（对象存储 / CDN） */
  video?: string
  /** 多个视频直链，渲染为视频画廊 */
  videos?: string[]
  /** 展示截图，按顺序渲染为 2×2 图集 */
  images?: string[]
  /** 多图是否等高等宽并排展示（默认按原比例瀑布流） */
  equalHeightImages?: boolean
  /** 外部详情链接 */
  link?: string
}

export type Category = {
  id: string
  title: string
  tagline: string
  desc: string
  subs: SubPart[]
}

/**
 * 「其他探索」内容清单（数据驱动）。
 * 新增视频：在对应子项加 `video` / `videos` 直链即可，无需改动组件。
 * 视频源统一走对象存储 / CDN 的公开直链。
 */
export const CATEGORIES: Category[] = [
  {
    id: 'digital-human',
    title: '数字人应用',
    tagline: '数字人视频 / 流程与培训',
    desc: '基于数字人技术落地视频生产与培训场景，覆盖内容生成到流程化交付。',
    subs: [
      {
        id: 'video',
        title: '数字人视频',
        desc: '基于数字人形象自动生成口播与讲解视频，核心是降低人工重复性讲解动作，把员工从反复出镜与拍摄中解放出来。',
        bilibili: 'BV1kUGg6YELU',
      },
      {
        id: 'training',
        title: '流程与培训',
        desc: '将数字人能力封装为标准化流程，用于员工培训与业务宣贯。',
        bilibili: 'BV1pyMB6KEhH',
        images: ['/explorations/digital-human/training.webp'],
      },
    ],
  },
  {
    id: 'lora',
    title: 'LoRA 训练',
    tagline: '产品类 / 人物类',
    desc: '针对产品与人物分别训练专属 LoRA 模型，沉淀可复用的风格与特征资产。',
    subs: [
      {
        id: 'product',
        title: '产品类',
        desc: '训练产品专属 LoRA，保证电商与物料生图风格、细节一致。',
        images: [
          '/explorations/lora/product/01.png',
          '/explorations/lora/product/02.png',
          '/explorations/lora/product/03.png',
          '/explorations/lora/product/04.png',
          '/explorations/lora/product/05.png',
          '/explorations/lora/product/06.png',
          '/explorations/lora/product/07.png',
          '/explorations/lora/product/08.png',
        ],
      },
      {
        id: 'rongtu',
        title: '溶图类',
        desc: '将多张图融合到统一画面中的 LoRA 应用，保持主体一致性的同时完成自然合成。',
        images: [
          '/explorations/lora/rongtu/01.webp',
          '/explorations/lora/rongtu/02.webp',
        ],
      },
    ],
  },
  {
    id: '3d',
    title: '3D 渲染',
    tagline: '图片 / 视频',
    desc: '结合 AI 与 3D 管线，输出高质量静帧与动态渲染内容。',
    subs: [
      {
        id: 'image',
        title: '图片',
        desc: '输出高质量 3D 静帧与产品渲染图。',
        images: [
          '/explorations/3d/01.png',
          '/explorations/3d/02.png',
          '/explorations/3d/03.png',
          '/explorations/3d/04.png',
          '/explorations/3d/05.png',
          '/explorations/3d/06.png',
          '/explorations/3d/07.png',
          '/explorations/3d/08.png',
          '/explorations/3d/09.png',
          '/explorations/3d/10.png',
          '/explorations/3d/11.png',
          '/explorations/3d/12.png',
          '/explorations/3d/13.png',
          '/explorations/3d/14.png',
          '/explorations/3d/15.png',
          '/explorations/3d/16.png',
          '/explorations/3d/17.png',
          '/explorations/3d/18.png',
          '/explorations/3d/19.png',
          '/explorations/3d/20.png',
          '/explorations/3d/21.png',
          '/explorations/3d/22.png',
          '/explorations/3d/23.png',
          '/explorations/3d/24.png',
          '/explorations/3d/25.png',
          '/explorations/3d/26.png',
        ],
      },
      {
        id: 'video',
        title: '视频',
        desc: '生成 3D 动态渲染视频，用于宣传与演示。',
        bilibiliVideos: [
          'BV1X8uA6QEKq',
          'BV1a8uA6QEkE',
          'BV1a8uA6QEk5',
        ],
      },
    ],
  },
  {
    id: 'prototype',
    title: '原型设计',
    tagline: '官网页面设计',
    desc: '从官网页面到交互细节，快速验证产品形态与用户体验。',
    subs: [
      {
        id: 'web',
        title: '官网页面设计',
        desc: '面向品牌官网的页面视觉与版式设计。',
        link: 'https://www.merach.com/',
        equalHeightImages: true,
        images: [
          '/explorations/prototype/web-01.webp',
          '/explorations/prototype/web-02.webp',
        ],
      },
    ],
  },
  {
    id: 'rpa',
    title: 'RPA 应用',
    tagline: '自动素材搜集 / AI 日报信息收集',
    desc: '用自动化流程替代重复人工，覆盖素材搜集与每日信息整理。',
    subs: [
      { id: 'collect', title: '自动素材搜集', desc: '自动化采集与归档设计、营销素材，减少重复人工。', images: [
          '/explorations/rpa/collect-01-flow.jpg',
          '/explorations/rpa/collect-02-result.jpg',
        ] },
      {
        id: 'digest',
        title: 'AI 日报信息收集',
        desc: '定时聚合行业与竞品信息，生成每日 AI 简报。RPA 自动抓取热点、汇总链接并推送至飞书群，减少人工浏览与复制粘贴。',
        equalHeightImages: true,
        images: [
          '/explorations/rpa/digest-01-card.jpg',
          '/explorations/rpa/digest-02-flow.jpg',
        ],
      },
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
        desc: '用多维表格搭建项目需求管理表，统一需求流转与跟踪。通过产品信息表、总仪表、需求总表与自动化通知，实现从录入、看数到分配的全链路闭环。',
        equalHeightImages: true,
        images: [
          '/explorations/process/01-table.jpg',
          '/explorations/process/02-dashboard.jpg',
          '/explorations/process/03-notify.jpg',
          '/explorations/process/04-overview.jpg',
        ],
      },
    ],
  },
]
