import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeUp } from './FadeUp'
import { SpotlightBorder } from './SpotlightBorder'
import { MIcon } from './MIcon'
import { TabDashboardMock } from './TabDashboardMock'
import { CoursesTabContent } from './CoursesTabContent'
import { TemplatesTabContent } from './TemplatesTabContent'
import { BackgroundsTabContent } from './BackgroundsTabContent'
import { ExclusiveTutorialTabContent } from './ExclusiveTutorialTabContent'
import { cn } from '../../lib/cn'

const tabs = [
  {
    label: 'Exclusive Tutorial',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260521_222821_06fd2e74-16a5-4e7f-90ed-14e6760e7edb.png&w=1280&q=85',
    caption: 'Step-by-step guides to master AI design tools.',
  },
  {
    label: 'Courses',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260521_222901_b133c5f0-191c-4285-a018-a68fd9c9f5ac.png&w=1280&q=85',
    caption: 'Structured learning paths to level up your skills.',
  },
  {
    label: 'Templates',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260521_225713_3226e3ad-3364-42b1-99bd-ed82005c0524.png&w=1280&q=85',
    caption: 'Production-ready designs you can customize instantly.',
  },
  {
    label: 'Animated Backgrounds',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260521_222832_223716d0-9b6c-4c48-98a6-a5e3c02e2962.png&w=1280&q=85',
    caption: 'Motion-ready visuals that bring your projects to life.',
  },
]

const mockMap: Record<
  string,
  { title: string; activeNav: string; content: React.ReactNode }
> = {
  'Exclusive Tutorial': {
    title: 'Exclusive Tutorials',
    activeNav: 'Tutorials',
    content: <ExclusiveTutorialTabContent />,
  },
  Courses: {
    title: 'Courses',
    activeNav: 'Courses',
    content: <CoursesTabContent />,
  },
  Templates: {
    title: 'Templates',
    activeNav: 'Templates',
    content: <TemplatesTabContent />,
  },
  'Animated Backgrounds': {
    title: 'Animated Backgrounds',
    activeNav: 'Backgrounds',
    content: <BackgroundsTabContent />,
  },
}

export const CoreFeaturesSection = () => {
  const [active, setActive] = useState(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % tabs.length)
      }
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const select = (i: number) => {
    pausedRef.current = true
    setActive(i)
  }

  const go = (dir: number) => {
    pausedRef.current = true
    setActive((prev) => (prev + dir + tabs.length) % tabs.length)
  }

  const current = tabs[active]

  return (
    <section className="relative w-full bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-landing-surface px-3 py-1 text-xs text-foreground/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
                Core Features
              </div>
            </FadeUp>
            <FadeUp delay={0.1} className="mt-4">
              <h2 className="text-3xl font-normal leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl">
                One platform to run your
                <br className="hidden sm:block" />
                <span className="text-foreground/55"> entire AI design journey.</span>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="max-w-sm md:pt-2">
            <p className="text-sm leading-relaxed text-foreground/65 sm:text-base">
              UI Rocket brings your lessons, templates, tools, and community into one space —
              so you stop switching between tabs and start shipping real AI-powered work.
            </p>
          </FadeUp>
        </div>

        {/* Tab pills */}
        <SpotlightBorder
          radius="rounded-full"
          size={360}
          intensity={0.5}
          className="mx-auto mb-6 hidden w-full p-1 sm:block"
        >
          <div className="grid grid-cols-2 gap-1 rounded-full p-1 sm:grid-cols-4">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => select(i)}
                className={cn(
                  'rounded-full px-4 py-2.5 text-sm transition-colors duration-300',
                  active === i
                    ? 'border border-white/15 bg-white/[0.06] text-foreground'
                    : 'border border-transparent text-foreground/55 hover:text-foreground/80',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </SpotlightBorder>

        {/* Image stage */}
        <SpotlightBorder
          radius="rounded-2xl"
          size={600}
          intensity={0.5}
          className="relative mx-auto w-full p-2 sm:p-3"
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10"
            style={{ backgroundColor: '#0e0e0e' }}
          >
            <div className="relative aspect-[16/10] w-full">
              {tabs.map((tab, i) => (
                <img
                  key={tab.label}
                  src={tab.image}
                  alt={tab.label}
                  loading="eager"
                  decoding="async"
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover transition-opacity duration-400',
                    active === i ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}

              {Object.entries(mockMap).map(([label, config], i) => (
                <div
                  key={label}
                  className={cn(
                    'absolute inset-1 flex items-center justify-center p-[3%] transition-opacity duration-300 sm:p-[4%]',
                    active === i ? 'opacity-100' : 'opacity-0 pointer-events-none',
                  )}
                >
                  <TabDashboardMock title={config.title} activeNav={config.activeNav}>
                    {config.content}
                  </TabDashboardMock>
                </div>
              ))}
            </div>
          </div>
        </SpotlightBorder>

        {/* Arrow / caption bar */}
        <SpotlightBorder
          radius="rounded-full"
          size={360}
          intensity={0.5}
          className="mx-auto mt-6 w-full p-1"
        >
          <div className="flex items-center justify-between gap-4 rounded-full px-3 py-2">
            <button
              onClick={() => go(-1)}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/80 transition-colors hover:bg-white/[0.08] hover:text-foreground"
              aria-label="Previous"
            >
              <MIcon name="arrow_back" size={16} />
            </button>

            <div className="min-h-[1.5rem] flex-1 overflow-hidden text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="px-2 text-sm text-foreground/75"
                >
                  <span className="font-medium text-foreground sm:hidden">
                    {current.label}
                  </span>
                  <span className="hidden sm:inline">{current.caption}</span>
                </motion.p>
              </AnimatePresence>
            </div>

            <button
              onClick={() => go(1)}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/80 transition-colors hover:bg-white/[0.08] hover:text-foreground"
              aria-label="Next"
            >
              <MIcon name="arrow_forward" size={16} />
            </button>
          </div>
        </SpotlightBorder>
      </div>
    </section>
  )
}
