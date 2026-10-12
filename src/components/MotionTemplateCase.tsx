import OptimizedImage from './OptimizedImage'
import { AppProjectHero, CaseFlow } from './AppProjectCase'

const courseImage = '/explorations/motion-templates/01-course-carousel.png'
const dynamicImage = '/explorations/motion-templates/02-dynamic-cards.png'
const steps = [
  { title: '选择模板', desc: '按内容选择课程轮播或动态人物。' },
  { title: '替换内容', desc: '上传素材，调整文案和卡片顺序。' },
  { title: '预览检查', desc: '检查素材比例、文字与切换节奏。' },
  { title: '保存与导出', desc: '保存配置，导出视频用于交付。' },
]

export function MotionTemplateHero() {
  return <AppProjectHero app={{
    id: 'motion-templates', title: '动效批量替换', tagline: '', desc: '', tags: [],
    links: { github: 'https://github.com/3289004205/video-template-studio', demo: 'https://course-carousel-studio-m1971.gzzy666666.chatgpt.site/' },
    sections: [{ key: 'showcase', label: '页面展示', type: 'gallery', images: [{ src: courseImage, caption: '动效批量替换工作台全貌' }] }],
  }} />
}

export function MotionTemplateDetails() {
  return <div className="space-y-24 md:space-y-36">
    <section aria-label="页面展示">
      <h3 className="text-2xl font-medium text-text-primary md:text-[28px]">两种模板场景</h3>
      <div className="mt-12 grid items-center gap-8 md:mt-16 lg:grid-cols-[1.65fr_1fr] lg:gap-20">
        <figure className="overflow-hidden rounded-xl ring-1 ring-white/10"><OptimizedImage src={courseImage} alt="课程卡片轮播完整界面" sizes="(max-width: 1023px) calc(100vw - 48px), 600px" className="h-auto w-full cursor-zoom-in" /></figure>
        <div><h4 className="text-xl font-medium text-text-primary">课程卡片轮播</h4><p className="mt-4 max-w-xs text-sm leading-7 text-[#a9a9b5]">集中替换素材、标题与顺序，在时间轴中检查轮播效果。</p></div>
      </div>
      <div className="mt-20 grid items-center gap-8 md:mt-28 lg:grid-cols-[1fr_1.65fr] lg:gap-20">
        <figure className="overflow-hidden rounded-xl ring-1 ring-white/10 lg:order-2"><OptimizedImage src={dynamicImage} alt="智能互联动态人物完整界面" sizes="(max-width: 1023px) calc(100vw - 48px), 600px" className="h-auto w-full cursor-zoom-in" /></figure>
        <div className="lg:order-1"><h4 className="text-xl font-medium text-text-primary">智能互联动态人物</h4><p className="mt-4 max-w-xs text-sm leading-7 text-[#a9a9b5]">替换图片或视频，沿用卡片的缩放与切换动画。</p></div>
      </div>
    </section>
    <section aria-label="制作流程">
      <h3 className="text-2xl font-medium text-text-primary md:text-[28px]">从素材到成品</h3>
      <CaseFlow steps={steps} />
      <p className="mt-8 max-w-lg text-xs leading-6 text-[#9999a6]">适合重复制作同类视频；更复杂的动画变化仍需调整模板。</p>
    </section>
  </div>
}
