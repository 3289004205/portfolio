import { ArrowUpRight, GitBranch, Play } from 'lucide-react'
import OptimizedImage from './OptimizedImage'

const courseImage = '/explorations/motion-templates/01-course-carousel.png'
const dynamicImage = '/explorations/motion-templates/02-dynamic-cards.png'

const highlights = [
  { title: '内容可替换', desc: '图片、视频、标题与顺序，集中在同一个操作面板。' },
  { title: '动效可复用', desc: '沿用卡片缩放与切换关系，让已有模板持续使用。' },
  { title: '结果可预览', desc: '通过画面与时间轴检查效果，再保存配置与导出。' },
]
const steps = [
  { title: '选择模板', desc: '按内容选择课程轮播或动态人物。' },
  { title: '替换内容', desc: '上传素材，调整文案和卡片顺序。' },
  { title: '预览检查', desc: '检查素材比例、文字与切换节奏。' },
  { title: '保存与导出', desc: '保存配置，导出视频用于交付。' },
]

function Eyebrow({ children }: { children: string }) {
  return <p className="text-[11px] font-medium tracking-[0.16em] text-[#a7bbde]">{children}</p>
}

export function MotionTemplateHero() {
  return (
    <section aria-label="动效批量替换项目概览">
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div>
          <Eyebrow>CASE STUDY / 模板化视频制作</Eyebrow>
          <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-text-primary md:text-5xl">动效批量替换</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#aeb0bd]">把反复修改的素材、文案与顺序变成可替换项，将课程卡片与动态人物的制作集中到一个工作台。</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="https://course-carousel-studio-m1971.gzzy666666.chatgpt.site/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#b8c9e8] px-5 py-3 text-sm font-medium text-[#141822] transition-colors hover:bg-[#d3dff3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><Play size={15} />在线体验<ArrowUpRight size={16} /></a>
            <a href="https://github.com/3289004205/video-template-studio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-text-primary transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><GitBranch size={16} />GitHub 仓库</a>
          </div>
          <p className="mt-7 text-xs leading-6 text-[#aeb0bd]">项目方向 / 模板复用 · 素材替换 · 动效预览</p>
        </div>
        <figure className="relative min-w-0 rounded-2xl border border-white/15 bg-gradient-to-br from-[#a5b8de]/15 to-white/[0.02] p-3 md:p-5">
          <div className="mb-3 flex items-center justify-between text-[10px] tracking-widest text-[#becbe1]"><span>MOTION TEMPLATE STUDIO</span><span>课程卡片轮播</span></div>
          <OptimizedImage src={courseImage} alt="动效批量替换工作台全貌" loading="eager" fetchPriority="high" sizes="(max-width: 1023px) calc(100vw - 72px), 540px" className="h-auto w-full cursor-zoom-in rounded-lg" />
          <figcaption className="mt-3 text-xs leading-5 text-[#aeb0bd]">左侧预览与时间轴，右侧素材编辑。</figcaption>
        </figure>
      </div>
      <div className="mt-10 grid gap-6 border-y border-white/10 py-7 md:grid-cols-3 md:gap-8" aria-label="核心亮点">
        {highlights.map((item, i) => <div key={item.title} className="flex items-start gap-4"><span className="mt-1 text-xs text-[#91a9d0]">0{i + 1}</span><div><h3 className="text-base font-medium text-text-primary">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#aeb0bd]">{item.desc}</p></div></div>)}
      </div>
    </section>
  )
}

export function MotionTemplateDetails() {
  return (
    <div className="space-y-20 md:space-y-24">
      <section className="grid gap-6 md:grid-cols-[0.65fr_1.35fr] md:gap-12">
        <div><Eyebrow>01 / 制作问题</Eyebrow><h3 className="mt-4 text-2xl font-medium leading-snug text-text-primary md:text-3xl">同一种动效，<br />不必随内容反复重做。</h3></div>
        <div className="border-l border-[#91a9d0]/40 pl-6"><p className="text-base leading-8 text-[#c3c4ce]">同类视频更新时，变化最多的是素材、标题和展示顺序。将这些内容独立出来，可以让动画结构被重复使用，让制作过程更集中。</p><div className="mt-5 flex flex-wrap gap-2">{['素材更换', '文案修改', '顺序调整'].map(text => <span key={text} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-[#becbe1]">{text}</span>)}</div></div>
      </section>

      <section aria-label="页面展示">
        <Eyebrow>02 / 两种模板场景</Eyebrow>
        <h3 className="mt-4 text-3xl font-medium tracking-tight text-text-primary">把操作和结果放在一起。</h3>
        <div className="mt-9 grid items-center gap-7 lg:grid-cols-[1.65fr_1fr] lg:gap-10">
          <figure className="overflow-hidden rounded-xl border border-white/15"><OptimizedImage src={courseImage} alt="课程卡片轮播完整界面" sizes="(max-width: 1023px) calc(100vw - 48px), 630px" className="h-auto w-full cursor-zoom-in" /></figure>
          <div><p className="text-xs tracking-widest text-[#91a9d0]">A / COURSE CAROUSEL</p><h4 className="mt-3 text-2xl font-medium text-text-primary">课程卡片轮播</h4><p className="mt-4 text-sm leading-7 text-[#b9bac6]">右侧集中管理课程素材和分类标题，左侧同步查看构图与时间轴，减少内容修改与预览之间的切换。</p><ul className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm text-[#d1d2db]"><li>批量替换卡片素材</li><li>调整分类标题与卡片顺序</li><li>通过时间轴检查切换效果</li></ul></div>
        </div>
        <div className="mt-12 grid items-center gap-7 lg:grid-cols-[1fr_1.65fr] lg:gap-10">
          <figure className="overflow-hidden rounded-xl border border-white/15 lg:order-2"><OptimizedImage src={dynamicImage} alt="智能互联动态人物完整界面" sizes="(max-width: 1023px) calc(100vw - 48px), 630px" className="h-auto w-full cursor-zoom-in" /></figure>
          <div className="lg:order-1"><p className="text-xs tracking-widest text-[#91a9d0]">B / DYNAMIC CARDS</p><h4 className="mt-3 text-2xl font-medium text-text-primary">智能互联动态人物</h4><p className="mt-4 text-sm leading-7 text-[#b9bac6]">卡片可以换成图片或视频，保留原有的缩放与切换关系。内容更新后，依然沿用模板的展示节奏。</p><ul className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm text-[#d1d2db]"><li>替换图片或视频素材</li><li>独立替换文案 PNG</li><li>保留卡片运动与切换动画</li></ul></div>
        </div>
        <p className="mt-5 text-xs text-[#aeb0bd]">点击界面图片，可查看完整大图。</p>
      </section>

      <section>
        <Eyebrow>03 / 制作路径</Eyebrow><h3 className="mt-4 text-3xl font-medium text-text-primary">从素材到成品，四步完成。</h3>
        <ol className="mt-9 grid gap-7 md:grid-cols-4 md:gap-0">{steps.map((step, i) => <li key={step.title} className="relative border-t border-white/20 pt-6 md:pr-6"><span className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-[#a7bbde]" /><span className="text-xs tracking-widest text-[#91a9d0]">0{i + 1}</span><h4 className="mt-3 text-base font-medium text-text-primary">{step.title}</h4><p className="mt-2 text-sm leading-6 text-[#b9bac6]">{step.desc}</p></li>)}</ol>
      </section>

      <section className="grid gap-7 border-y border-white/10 py-8 md:grid-cols-2 md:gap-12">
        <div><Eyebrow>设计取舍</Eyebrow><h3 className="mt-3 text-xl font-medium text-text-primary">固定动效，开放内容。</h3><p className="mt-3 text-sm leading-7 text-[#b9bac6]">适合重复制作同类视频。模板保留运动关系，面板提供高频修改入口；更复杂的动画变化仍需要调整模板。</p></div>
        <div><Eyebrow>价值验证</Eyebrow><h3 className="mt-3 text-xl font-medium text-text-primary">用制作记录检验提效。</h3><p className="mt-3 text-sm leading-7 text-[#b9bac6]">对同一组素材，比较手工制作与模板替换的耗时、操作次数和返工次数。下方效果展示保留示例数据，待真实记录确认后更新。</p></div>
      </section>
    </div>
  )
}
