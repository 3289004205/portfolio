import { ArrowUpRight, GitBranch, Play } from 'lucide-react'
import OptimizedImage from './OptimizedImage'
import { PROJECT_STORIES } from '../lib/project-stories'

export type CaseSection =
  | { key: string; label: string; type: 'gallery'; images: { src?: string; caption: string; aspect?: string; wide?: boolean }[]; columns?: 2 | 3 | 4; noteItems?: { title: string; desc: string; highlights?: string[] }[] }
  | { key: string; label: string; type: 'flow'; steps: { title: string; desc: string }[]; noteItems?: { title: string; desc: string }[] }
  | { key: string; label: string; type: 'badcase'; items: { problem: string; fix: string }[]; noteItems?: { title: string; desc: string }[] }
export type CaseProject = { id: string; title: string; tagline: string; desc: string; tags: string[]; links: { github: string | null; demo: string | null }; sections?: CaseSection[] }

const contexts: Record<string, { title: string; description: string }> = {
  visual: { title: '让工具与资源围绕创作任务衔接。', description: 'AI 工具、素材和学习资源分散时，寻找入口和切换工具也会占用创作时间。系统以统一入口组织不同模块，让任务执行和资源积累形成连续流程。' },
  preset: { title: '让每一次生图都有清晰的起点。', description: '重复输入提示词与配置参数，会增加制作成本。通过预设模板组织风格和生成要求，先确定方向，再输入产品与需求信息。' },
  kb: { title: '让已有文档成为可以提问的知识。', description: '部门资料分布在不同文档中，查找答案需要逐项翻阅。知识库将资料组织与问答检索衔接，用相关片段支持回答。' },
  'skill-hub': { title: '让技能从资源列表走向任务执行。', description: '面对不同创作任务，先找到适用技能，再明确输入素材与生成要求。分类入口、任务队列和结果详情将这三个阶段连接起来。' },
  'geo-materials': { title: '让素材、文案与交付保持对应。', description: '批量制作需要同时处理多张产品图、展示字段和版式要求。工作台集中组织这些输入，并通过进度、日志和交付文件呈现处理过程。' },
  others: { title: '从重复最多的操作开始改进。', description: '提示词整理、素材归档和活动主图修改都是设计中的高频工作。以专用工具处理这些步骤，让人工检查更集中在内容与质量上。' },
}
const imageNotes: Record<string, string[]> = {
  visual: ['用首页连接不同模块，减少查找工具入口的时间。', '通过无限画布组织素材与工作流，便于查看和复用。', '按需求组织资源导航，让工具选择更直接。', '集中浏览行业前沿资讯与设计趋势，补充创作参考。', '汇集图像资源，为后续创作提供素材入口。', '将图像生成流程放在统一界面中，串联输入与产出。'],
  'skill-hub': ['按场景、人像、渲染等任务分类选择技能。', '分别输入参考场景与产品素材，明确素材用途。', '用生成状态和任务队列呈现批量任务的过程。', '集中查看结果、提示词与参考图，方便检查与复用。'],
  kb: ['以部门空间组织知识，让资料归属与查找范围更清楚。', '通过问答入口检索文档内容，减少逐篇翻阅。'],
  'geo-materials': ['统一输入产品素材、文案和版式要求。', '通过任务进度与日志查看制作过程。', '集中查看成品、映射文件与质检报告。'],
}

function Eyebrow({ children }: { children: string }) {
  return <p className="text-[11px] font-medium tracking-[0.16em] text-[#a7bbde]">{children}</p>
}

function CaseImage({ src, caption, priority = false, sizes }: { src?: string; caption: string; priority?: boolean; sizes?: string }) {
  return <figure className="project-screenshot">{src && <OptimizedImage src={src} alt={caption} sizes={sizes} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} className="h-auto w-full cursor-zoom-in" />}</figure>
}


export function AppProjectHero({ app }: { app: CaseProject }) {
  const story = PROJECT_STORIES[app.id]
  const firstGallery = app.sections?.find(s => s.type === 'gallery')
  const image = firstGallery?.type === 'gallery' ? firstGallery.images[0] : undefined
  return <section aria-label={`${app.title}项目概览`}>
    <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <div>
        <Eyebrow>{`CASE STUDY / ${app.tagline}`}</Eyebrow>
        <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-text-primary md:text-5xl">{app.title}</h2>
        <p className="mt-5 max-w-md text-sm leading-7 text-[#b5b5bf]">{app.desc}</p>
        <div className="mt-16 flex flex-wrap gap-3">
          {app.links.demo && <a href={app.links.demo} target="_blank" rel="noopener noreferrer" className="project-action project-action--primary"><Play size={15} />在线体验<ArrowUpRight size={16} /></a>}
          {app.links.github && <a href={app.links.github} target="_blank" rel="noopener noreferrer" className="project-action"><GitBranch size={16} />GitHub 仓库</a>}
          {app.links.demo === '' && <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-[#b5b5bf]">Demo · 链接待添加</span>}
          {app.links.github === '' && <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-[#b5b5bf]">GitHub · 链接待添加</span>}
        </div>
      </div>
      {image && <div className="project-preview"><div className="mb-3 text-[10px] tracking-widest text-[#becbe1]"><span>PROJECT PREVIEW</span></div><CaseImage {...image} priority sizes="(max-width: 1023px) calc(100vw - 72px), 540px" /><p className="mt-3 text-xs leading-5 text-[#b5b5bf]">{image.caption}</p></div>}
    </div>
    <div className="mt-10 grid gap-6 border-y border-white/10 py-7 md:grid-cols-3 md:gap-8" aria-label="核心亮点">{story.highlights.map((item, i) => <div key={item.title} className="flex items-start gap-4"><span className="mt-1 text-xs text-[#91a9d0]">0{i + 1}</span><div><h3 className="text-base font-medium text-text-primary">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#b5b5bf]">{item.description}</p></div></div>)}</div>
  </section>
}

export function AppProjectDetails({ app }: { app: CaseProject }) {
  const context = contexts[app.id]
  return <div className="space-y-20 md:space-y-28">
    <section className="grid gap-6 md:grid-cols-[0.65fr_1.35fr] md:gap-12"><div><Eyebrow>01 / 项目出发点</Eyebrow><h3 className="mt-4 text-2xl font-medium leading-snug text-text-primary md:text-3xl">{context.title}</h3></div><div className="border-l border-[#91a9d0]/40 pl-6"><p className="text-base leading-8 text-[#c3c4ce]">{context.description}</p><div className="mt-5 flex flex-wrap gap-2">{app.tags.map(tag => <span key={tag} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-[#becbe1]">{tag}</span>)}</div></div></section>
    {app.sections?.map((section, sectionIndex) => <section key={section.key} aria-label={section.label}>
      <Eyebrow>{`${String(sectionIndex + 2).padStart(2, '0')} / ${section.type === 'flow' ? '制作路径' : '项目实践'}`}</Eyebrow>
      <h3 className="mt-4 text-3xl font-medium tracking-tight text-text-primary">{section.label}</h3>
      {section.type === 'gallery' && (app.id === 'visual' ?
        <div className="mt-9 space-y-12">{section.images.map((image, i) => <div key={image.caption} className={`grid items-center gap-7 lg:gap-14 ${i % 2 ? 'lg:grid-cols-[1fr_1.65fr]' : 'lg:grid-cols-[1.65fr_1fr]'}`}><div className={i % 2 ? 'lg:order-2' : ''}><CaseImage {...image} sizes="(max-width: 1023px) calc(100vw - 48px), 630px" /></div><div className={i % 2 ? 'lg:order-1' : ''}><p className="text-xs tracking-widest text-[#91a9d0]">MODULE / {String(i + 1).padStart(2, '0')}</p><h4 className="mt-3 text-xl font-medium text-text-primary">{image.caption.split(' · ')[0]}</h4><p className="mt-4 text-sm leading-7 text-[#b5b5bf]">{imageNotes.visual[i]}</p></div></div>)}</div>
        : <div className={`mt-9 grid grid-cols-1 gap-x-5 gap-y-9 ${section.columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : section.columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>{section.images.map((image, i) => <div key={image.caption} className={image.wide ? 'md:col-span-2' : ''}><CaseImage {...image} sizes={image.wide ? '(max-width: 767px) calc(100vw - 48px), 1020px' : section.columns === 4 ? '(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 50vw, 250px' : section.columns === 3 ? '(max-width: 767px) calc(100vw - 48px), 330px' : undefined} /><h4 className="mt-4 text-sm font-medium text-text-primary">{image.caption}</h4>{section.key === 'showcase' && imageNotes[app.id]?.[i] && <p className="mt-2 text-sm leading-6 text-[#b5b5bf]">{imageNotes[app.id][i]}</p>}</div>)}</div>)}
      {section.type === 'flow' && <ol className={`mt-9 grid gap-x-7 gap-y-9 md:grid-cols-2 ${section.steps.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>{section.steps.map((step, i) => <li key={step.title} className="relative border-t border-white/20 pt-6"><span className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-[#a7bbde]" /><span className="text-xs tracking-widest text-[#91a9d0]">{String(i + 1).padStart(2, '0')}</span><h4 className="mt-3 text-base font-medium text-text-primary">{step.title}</h4><p className="mt-2 text-sm leading-6 text-[#b5b5bf]">{step.desc}</p></li>)}</ol>}
      {section.type === 'badcase' && <div className="mt-8 space-y-6">{section.items.map(item => <div key={item.problem} className="border-l border-white/20 pl-6"><h4 className="font-medium text-text-primary">{item.problem}</h4><p className="mt-3 text-sm leading-7 text-[#b5b5bf]">{item.fix}</p></div>)}</div>}
      {section.noteItems && <div className="mt-8 grid gap-7 border-y border-white/10 py-7 md:grid-cols-2">{section.noteItems.map(item => <div key={item.title}><h4 className="text-lg font-medium text-text-primary">{item.title}</h4><p className="mt-3 text-sm leading-7 text-[#b5b5bf]">{item.desc}</p></div>)}</div>}
      {section.type === 'gallery' && section.images.length > 0 && <p className="mt-5 text-xs text-[#b5b5bf]">点击图片，可查看完整大图。</p>}
    </section>)}
  </div>
}
