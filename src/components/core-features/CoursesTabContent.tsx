import { moduleCovers } from './assets'

const courses = [
  { title: 'AI Design Fundamentals', lessons: 12, min: 90 },
  { title: 'Prompt Engineering Masterclass', lessons: 8, min: 65 },
  { title: 'Generative Video Workflows', lessons: 10, min: 110 },
  { title: 'Brand Systems with AI', lessons: 6, min: 45 },
  { title: 'Motion Design Automation', lessons: 9, min: 80 },
  { title: 'Production Pipelines', lessons: 11, min: 95 },
]

export const CoursesTabContent = () => (
  <div className="grid h-full grid-cols-3 grid-rows-2 gap-3">
    {courses.map((c, i) => (
      <div
        key={c.title}
        className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
      >
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={moduleCovers[i % moduleCovers.length]}
            alt={c.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-2.5">
          <h4 className="text-[13px] font-medium leading-snug text-white">{c.title}</h4>
          <p className="text-[10px] text-white/50">
            {c.lessons} lessons · {c.min} min
          </p>
        </div>
      </div>
    ))}
  </div>
)
