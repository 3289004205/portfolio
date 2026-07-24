const ITEMS = [
  {
    title: '数字人应用',
    tag: 'Digital Human',
    desc: '跨部门落地的数字人方案，从形象生成到口型驱动与场景化应用，探索 AI 数字身份的完整链路。',
    image:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'LoRA / 模型微调',
    tag: 'Model Fine-tuning',
    desc: '基于产品/人物数据训练专属 LoRA 模型，将通用生成能力适配为稳定、可复用的商业级风格输出。',
    image:
      'https://images.unsplash.com/photo-1620641788427-7a7124f42dc4?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: '3D 渲染',
    tag: '3D Rendering',
    desc: 'C4D + OC 渲染的产品概念与视觉实验，把传统工艺和 AI 视觉语言结合，输出高完成度的空间表达。',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: '原型设计',
    tag: 'Prototype',
    desc: '基于 Figma 的产品原型与交互设计，把模糊需求转化为可点击、可验证的界面与流程。',
    image:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop',
  },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-8 bg-stroke" />
      <span className="text-xs uppercase tracking-[0.3em] text-muted">{children}</span>
    </div>
  )
}

export default function MoreExplorationsSection() {
  return (
    <section id="more-explorations" className="w-full bg-bg pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <Eyebrow>More Explorations · 其他探索</Eyebrow>

        <h2 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
          AI <span className="font-display italic">Beyond</span>
        </h2>
        <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
          图像与视频之外，围绕数字人、模型训练与 3D 渲染的持续实验。
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-3xl border border-stroke bg-surface transition-colors hover:bg-surface/70"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">{item.tag}</span>
                <h3 className="mt-2 text-xl text-text-primary">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
