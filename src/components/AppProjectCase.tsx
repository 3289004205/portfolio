import { ArrowUpRight } from 'lucide-react'
import OptimizedImage from './OptimizedImage'

export type CaseSection =
  | { key: string; label: string; type: 'gallery'; images: { src?: string; caption: string; aspect?: string; wide?: boolean }[]; columns?: 2 | 3; noteItems?: { title: string; desc: string; highlights?: string[] }[] }
  | { key: string; label: string; type: 'flow'; steps: { title: string; desc: string }[]; noteItems?: { title: string; desc: string }[] }
  | { key: string; label: string; type: 'badcase'; items: { problem: string; fix: string }[]; noteItems?: { title: string; desc: string }[] }
export type CaseProject = { id: string; title: string; tagline: string; desc: string; tags: string[]; links: { github: string | null; demo: string | null }; sections?: CaseSection[] }

const intros: Record<string, { summary: string; highlights: string[] }> = {
  visual: { summary: '把工具、工作流与素材，连接成一个创作入口。', highlights: ['统一入口', '工作流协同', '资产沉淀'] },
  preset: { summary: '从预设开始，让产品生图更简单。', highlights: ['提示词预设', '一键生图', '风格复用'] },
  kb: { summary: '把部门文档，变成可以提问的知识。', highlights: ['知识归集', '语义检索', '问答衔接'] },
  'motion-templates': { summary: '更换内容，让动效继续复用。', highlights: ['素材替换', '动效复用', '即时预览'] },
  'skill-hub': { summary: '按任务选择技能，从素材输入走向批量产出。', highlights: ['技能分类', '批量任务', '结果管理'] },
  'geo-materials': { summary: '连接素材、文案与版式，完成批量制作。', highlights: ['内容匹配', '批量制作', '交付检查'] },
  others: { summary: '用专用工具，缩短设计中的重复操作。', highlights: ['提示词反推', '素材管理', '主图批改'] },
}
const imageNotes: Record<string, string[]> = {
  visual: ['连接六大模块，集中创作入口。', '通过无限画布组织素材与工作流。', '按需求查找工具与资源。', '浏览行业前沿资讯与设计趋势。', '汇集图像资源，积累创作素材。', '在统一界面中完成图像生成。'],
}

function CaseImage({ src, caption, priority = false, sizes }: { src?: string; caption: string; priority?: boolean; sizes?: string }) {
  return <figure className="min-w-0 overflow-hidden rounded-xl bg-white/[0.025] ring-1 ring-white/10">{src && <OptimizedImage src={src} alt={caption} sizes={sizes} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} className="h-auto w-full cursor-zoom-in" />}</figure>
}

export function AppProjectHero({ app }: { app: CaseProject }) {
  const intro = intros[app.id]
  const firstGallery = app.sections?.find(s => s.type === 'gallery')
  const image = firstGallery?.type === 'gallery' ? firstGallery.images[0] : undefined
  return <section aria-label={`${app.title}项目概览`}>
    <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div className="max-w-md">
        <h2 className="text-4xl font-medium leading-[1.2] tracking-tight text-text-primary md:text-5xl">{app.title}</h2>
        <p className="mt-6 max-w-sm text-base leading-8 text-[#c3c3cd] md:text-lg">{intro.summary}</p>
        {(app.links.demo || app.links.github) && <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm">
          {app.links.demo && <a href={app.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-1 text-text-primary underline decoration-white/25 underline-offset-8 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">在线体验<ArrowUpRight size={15} /></a>}
          {app.links.github && <a href={app.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-1 text-[#b9bac6] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">GitHub<ArrowUpRight size={15} /></a>}
        </div>}
        {app.id === 'visual' && <p className="mt-5 text-xs leading-6 text-[#9797a3]">演示包含系统与 Define 画布界面；AI 生成和服务器存储暂未接入。</p>}
      </div>
      {image && <CaseImage {...image} priority sizes="(max-width: 1023px) calc(100vw - 48px), 520px" />}
    </div>
    <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs tracking-wide text-[#a9a9b5] md:mt-16 md:gap-x-12" aria-label="核心亮点">{intro.highlights.map(text => <li key={text}>{text}</li>)}</ul>
  </section>
}

export function CaseFlow({ steps }: { steps: { title: string; desc: string }[] }) {
  return <div className="mt-10 md:mt-12">
    <ol className={`grid gap-x-8 gap-y-8 sm:grid-cols-2 ${steps.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
      {steps.map((step, i) => <li key={step.title} className="flex items-baseline gap-4"><span className="text-xs tabular-nums text-[#82828e]">{String(i + 1).padStart(2, '0')}</span><h4 className="text-sm font-medium leading-6 text-text-primary">{step.title}</h4></li>)}
    </ol>
    <details className="group mt-9 max-w-2xl text-sm">
      <summary className="w-fit cursor-pointer list-none py-2 text-[#9999a6] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">流程说明 <span className="ml-2 inline-block transition-transform group-open:rotate-45" aria-hidden="true">＋</span></summary>
      <ol className="mt-5 space-y-5 border-l border-white/10 pl-5">{steps.map(step => <li key={step.title}><span className="text-[#dedee3]">{step.title}</span><p className="mt-1 leading-7 text-[#aaaab5]">{step.desc}</p></li>)}</ol>
    </details>
  </div>
}

export function AppProjectDetails({ app }: { app: CaseProject }) {
  return <div className="space-y-24 md:space-y-36">
    {app.sections?.map(section => <section key={section.key} aria-label={section.label}>
      <h3 className="text-2xl font-medium tracking-tight text-text-primary md:text-[28px]">{section.label}</h3>
      {section.type === 'gallery' && (app.id === 'visual' ?
        <div className="mt-12 space-y-20 md:mt-16 md:space-y-28">{section.images.map((image, i) => <div key={image.caption} className={`grid items-center gap-8 lg:gap-20 ${i % 2 ? 'lg:grid-cols-[1fr_1.65fr]' : 'lg:grid-cols-[1.65fr_1fr]'}`}><div className={i % 2 ? 'lg:order-2' : ''}><CaseImage {...image} sizes="(max-width: 1023px) calc(100vw - 48px), 600px" /></div><div className={i % 2 ? 'lg:order-1' : ''}><h4 className="text-xl font-medium text-text-primary">{image.caption.split(' · ')[0]}</h4><p className="mt-4 max-w-xs text-sm leading-7 text-[#a9a9b5]">{imageNotes.visual[i]}</p></div></div>)}</div>
        : <div className={`mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-16 ${section.columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>{section.images.map(image => <div key={image.caption} className={image.wide ? 'md:col-span-2' : ''}><CaseImage {...image} sizes={image.wide ? '(max-width: 767px) calc(100vw - 48px), 1020px' : section.columns === 3 ? '(max-width: 767px) calc(100vw - 48px), 330px' : undefined} /><h4 className="mt-5 text-xs leading-6 text-[#a9a9b5]">{image.caption.startsWith(app.title + ' · ') ? image.caption.slice(app.title.length + 3) : image.caption}</h4></div>)}</div>)}
      {section.type === 'flow' && <CaseFlow steps={section.steps} />}
      {section.type === 'badcase' && <div className="mt-12 space-y-8">{section.items.map(item => <div key={item.problem}><h4 className="font-medium text-text-primary">{item.problem}</h4><p className="mt-3 max-w-2xl text-sm leading-7 text-[#b9bac6]">{item.fix}</p></div>)}</div>}
      {section.noteItems && <div className="mt-10 max-w-2xl space-y-8">{section.noteItems.map(item => <div key={item.title}><h4 className="text-sm font-medium text-text-primary">{item.title}</h4><p className="mt-3 text-sm leading-7 text-[#a9a9b5]">{item.desc}</p></div>)}</div>}
    </section>)}
  </div>
}
