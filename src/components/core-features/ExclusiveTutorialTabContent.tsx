import { playIcon, tutorialThumbnails } from './assets'

const rows = [
  { title: 'Advanced Compositing with AI', meta: '8 min · Pro' },
  { title: 'Character Consistency Workflows', meta: '10 min · Pro' },
  { title: 'Lighting & Mood Control', meta: '6 min · Pro' },
]

export const ExclusiveTutorialTabContent = () => (
  <div className="flex h-full gap-3">
    {/* Featured */}
    <div className="relative flex w-[60%] flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
      <div className="relative aspect-video w-full flex-1 overflow-hidden">
        <img
          src={tutorialThumbnails[0]}
          alt="Exclusive tutorial"
          className="h-full w-full object-cover"
        />
        <img
          src={playIcon}
          alt="play"
          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="p-3">
        <h4 className="text-[13px] font-medium text-white">
          Mastering AI-Assisted Visual Storytelling
        </h4>
        <p className="mt-1 text-[11px] text-white/50">12 min · Pro</p>
      </div>
    </div>

    {/* Rows */}
    <div className="flex w-[40%] flex-col gap-3">
      {rows.map((r, i) => (
        <div
          key={r.title}
          className="flex flex-1 items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-2"
        >
          <div className="h-10 w-16 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={tutorialThumbnails[(i + 1) % tutorialThumbnails.length]}
              alt={r.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h5 className="truncate text-[12px] font-medium leading-snug text-white">
              {r.title}
            </h5>
            <p className="mt-0.5 text-[10px] text-white/50">{r.meta}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)
