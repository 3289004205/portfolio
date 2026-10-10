import { MotionTemplateHero, MotionTemplateDetails } from '../components/MotionTemplateCase'
import { AppProjectHero, AppProjectDetails, type CaseProject } from '../components/AppProjectCase'
import { useLocation, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import StatsPanel from '../components/StatsPanel/StatsPanel'
import BackToTop from '../components/BackToTop'

type App = CaseProject
/** 需要在详情区最下方展示数据面板的子页面 */
const STATS_PAGES = ['visual', 'preset', 'kb', 'motion-templates', 'skill-hub']

const APPS: App[] = [
  {
    id: 'visual',
    links: { github: 'https://github.com/3289004205/ContentFlow', demo: 'https://contentflow-demo.gzzy666666.chatgpt.site' },
    title: '视觉 AI 整合系统',
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
    links: { github: 'https://github.com/3289004205/Poster-Workflow', demo: '' },
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
    links: { github: null, demo: null },
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
    id: 'motion-templates',
    links: { github: 'https://github.com/3289004205/video-template-studio', demo: 'https://course-carousel-studio-m1971.gzzy666666.chatgpt.site/' },
    title: '动效批量替换',
    tagline: '动效模板与效果预览',
    desc: '集中展示与管理动效模板，按场景查找、预览效果并复用，为页面与视频制作提供统一的动效资源入口。',
    tags: ['动效模板', '效果预览', '资源复用'],
    sections: [
      {
        key: 'showcase',
        label: '页面展示',
        type: 'gallery',
        images: [
          { src: '/explorations/motion-templates/01-course-carousel.png', caption: '动效批量替换 · 课程卡片轮播', wide: true },
          { src: '/explorations/motion-templates/02-dynamic-cards.png', caption: '动效批量替换 · 智能互联动态人物', wide: true },
        ],
        noteItems: [
          { title: '课程卡片轮播：把修改集中在内容层', desc: '课程素材与分类标题放在右侧面板，预览和时间轴放在左侧。替换素材后，可以检查卡片顺序、文字和动态构图，减少内容修改与动效调整之间的反复切换。' },
          { title: '动态人物：沿用模板的运动关系', desc: '动态卡片支持替换图片或视频，并保留卡片缩放与切换动画。内容更换与动画结构分开组织，让同一种展示方式可以用于不同素材。' },
        ],
      },
      {
        key: 'case-flow',
        label: '从素材到成品',
        type: 'flow',
        steps: [
          { title: '选择模板', desc: '按展示内容选择课程卡片轮播或动态人物模板。' },
          { title: '替换内容', desc: '放入新的图片或视频，调整对应文案与卡片顺序。' },
          { title: '预览检查', desc: '通过时间轴检查切换效果，确认素材比例与文字展示。' },
          { title: '保存与导出', desc: '保存模板配置，导出视频用于交付。' },
        ],
      },
      {
        key: 'case-decisions',
        label: '问题与设计取舍',
        type: 'gallery',
        images: [],
        noteItems: [
          { title: '重复制作的问题', desc: '同一类视频更新内容时，素材、标题与顺序都会变化。项目将这些经常修改的内容组织成可替换项，让已有动画结构继续复用。' },
          { title: '固定动效，开放内容', desc: '模板保留卡片的运动与切换关系，面板集中提供素材和内容修改入口。适合重复制作同类视频；需要改变动画结构时，仍需要调整模板。' },
          { title: '如何验证价值', desc: '可用同一组素材分别记录手工制作与模板替换的耗时、操作次数和返工次数。下方效果图表目前为示例数据，真实制作记录确认后再替换。' },
        ],
      },
    ],
  },
  {
    id: 'skill-hub',
    links: { github: null, demo: 'https://vibex.runninghub.cn/p/app-6525f3761dba4670a50db49150ca40d7/?inviteCode=ridtgiqo' },
    title: 'SKILL整合系统',
    tagline: 'AI 技能与工作流资源整合',
    desc: '集中整理面向不同任务的 SKILL，统一展示用途、使用说明与相关资源，方便查找、理解和复用 AI 工作流。',
    tags: ['SKILL', '技能管理', '工作流复用'],
    sections: [
      {
        key: 'showcase',
        label: '页面展示',
        type: 'gallery',
        images: [
          { src: '/explorations/skill-hub/01.png', caption: 'SKILL整合系统 · 技能分类' },
          { src: '/explorations/skill-hub/02.png', caption: 'SKILL整合系统 · 场景与产品素材输入' },
          { src: '/explorations/skill-hub/03.png', caption: 'SKILL整合系统 · 任务生成与进度' },
          { src: '/explorations/skill-hub/04.png', caption: 'SKILL整合系统 · 生成结果与详情' },
        ],
      },
    ],
  },
  {
    id: 'geo-materials',
    links: { github: 'https://github.com/3289004205/geo-automation-workbench', demo: 'https://geo-workbench-demo.gzzy666666.chatgpt.site/' },
    title: 'GEO素材自动化',
    tagline: '素材批量制作与管理',
    desc: '围绕 GEO 素材制作流程，集中组织产品素材、文案与版式模板，减少重复整理与制作工作，方便批量产出和复用。',
    tags: ['GEO', '素材自动化', '批量制作', '模板复用'],
    sections: [
      {
        key: 'showcase',
        label: '页面展示',
        type: 'gallery',
        images: [
          { src: '/explorations/geo-materials/01.webp', caption: 'GEO素材自动化 · 素材、文案与作品设置' },
          { src: '/explorations/geo-materials/02.webp', caption: 'GEO素材自动化 · 任务进度与执行日志' },
          { src: '/explorations/geo-materials/03.webp', caption: 'GEO素材自动化 · 成品素材与交付文件' },
        ],
        columns: 3,
      },
      {
        key: 'results',
        label: '效果图展示',
        type: 'gallery',
        images: [
          { src: '/explorations/geo-results/01.webp', caption: '六款跑步机核心对比' },
          { src: '/explorations/geo-results/02.webp', caption: '新手怎么选爬坡跑步机' },
          { src: '/explorations/geo-results/03.webp', caption: '四款新手推荐详解' },
          { src: '/explorations/geo-results/04.webp', caption: '六项之王' },
        ],
      },
      {
        key: 'flow',
        label: '素材制作流程',
        type: 'flow',
        steps: [
          { title: '整理素材', desc: '汇集产品图片与制作需求，准备本次任务的素材。' },
          { title: '配置内容', desc: '整理文案与展示字段，选择对应的版式模板。' },
          { title: '批量制作', desc: '按素材与模板完成批量制作，统一展示效果。' },
          { title: '检查与交付', desc: '检查图片和文案，整理成品用于交付与后续复用。' },
        ],
      },
    ],
  },
  {
    id: 'others',
    links: { github: null, demo: null },
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
        noteItems: [
          {
            title: '综合提效成果',
            desc: '整合图像素材库、提示词库、反推提示词功能，减少多应用流转，日均使用时长 4.8h、效率提升每天 1.2h。',
            highlights: ['4.8h', '1.2h'],
          },
        ],
      },
      {
        key: 'figma-batch',
        label: 'Figma 批量主图修改插件',
        type: 'gallery',
        images: [
          { src: '/explorations/others/03-figma-batch.jpg', caption: 'Figma 插件 · 批量替换面板' },
        ],
        noteItems: [
          {
            title: '综合提效成果',
            desc: '按单次活动主图套图的口径，人力 / 工时投入下降约 90%（原来每次活动 4 名设计师专职改图，现在变成「运营改表 + 设计师检查」），产能提升到原来的约 10 倍。',
            highlights: ['90%', '4 名设计师', '10 倍'],
          },
        ],
      },
    ],
  },
]

export default function AiApps() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('project') ?? (location.state as { app?: string } | null)?.app
  const selected = requested && APPS.some((app) => app.id === requested) ? requested : APPS[0].id
  const current = APPS.find((a) => a.id === selected) ?? APPS[0]

  return (
    <>
      <motion.main
        initial={false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto min-h-screen max-w-[1100px] bg-transparent px-6 py-24 md:px-10"
      >
      {/* 顶部选择卡片 */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-3" aria-label="选择项目">
        {APPS.map((app) => {
          const active = app.id === selected
          return (
            <SpotlightCard
              key={app.id}
              as="button"
              type="button"
              onClick={() => setSearchParams({ project: app.id }, { replace: true })}
              spotlightColor={
                active ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.18)'
              }
              className={`flex shrink-0 flex-col rounded-xl border px-4 py-3 text-left transition-all ${
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
            </SpotlightCard>
          )
        })}
      </div>

      {/* 项目介绍框（跟随选中项目切换） */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-9"
        >
          {current.id === 'motion-templates' ? <MotionTemplateHero /> : <AppProjectHero app={current} />}
        </motion.div>
      </AnimatePresence>

      {/* 选中模块详情 */}
      <AnimatePresence initial={false} mode="wait">
        {current.id === 'motion-templates' ? (
          <section key={current.id} className="mt-16">
            <MotionTemplateDetails />
            <StatsPanel appTitle={current.title} />
            <BackToTop />
          </section>
        ) : (
          <section key={current.id} className="mt-16">
            <AppProjectDetails app={current} />
            {STATS_PAGES.includes(current.id) && <StatsPanel appTitle={current.title} />}
            <BackToTop />
          </section>
        )}
        </AnimatePresence>
      </motion.main>
    </>
  )
}
