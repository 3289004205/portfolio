import { moduleCovers } from './assets'

const templates = [
  { title: 'Social Media Kit', premium: true },
  { title: 'Landing Page Pack', premium: true },
  { title: 'Pitch Deck System', premium: false },
  { title: 'Icon Library', premium: true },
  { title: 'Email Templates', premium: false },
  { title: 'Mobile UI Kit', premium: true },
]

export const TemplatesTabContent = () => (
  <div className="grid h-full grid-cols-3 grid-rows-2 gap-3">
    {templates.map((t, i) => (
      <div
        key={t.title}
        className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
      >
        <div className="aspect-video w-full overflow-hidden rounded-t-xl border-b border-white/10">
          <div className="flex items-center gap-1 bg-black/30 px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
          <img
            src={moduleCovers[(i + 2) % moduleCovers.length]}
            alt={t.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 items-center justify-between p-2.5">
          <h4 className="text-[12px] font-medium text-white">{t.title}</h4>
          {t.premium && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
              Premium
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
)
