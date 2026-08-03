import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MIcon } from './MIcon'
import { cn } from '../../lib/cn'

const navItems = [
  { label: 'Dashboard', icon: 'grid_view' },
  { label: 'Courses', icon: 'school' },
  { label: 'Templates', icon: 'dashboard' },
  { label: 'Tutorials', icon: 'play_circle' },
  { label: 'Backgrounds', icon: 'auto_awesome' },
  { label: 'Pricing', icon: 'sell' },
]

export const TabDashboardMock = ({
  title,
  activeNav,
  children,
}: {
  title: string
  activeNav: string
  children: ReactNode
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setScale(Math.min(width / 900, height / 562))
      }
    })
    ro.observe(wrapper)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div
        className="flex overflow-hidden rounded-2xl bg-white/[0.04] shadow-2xl backdrop-blur-xl"
        style={{
          width: 900,
          height: 562,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        {/* Sidebar */}
        <div className="flex w-[210px] flex-col gap-1 p-3">
          <div className="mb-3 flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(158,103,250), rgb(254,106,187) 50%, rgb(255,156,101))',
                }}
              >
                <MIcon name="rocket_launch" size={14} className="text-white" />
              </div>
              <span className="text-[13px] font-semibold text-white">UI Rocket</span>
            </div>
            <MIcon name="search" size={14} className="text-white/40" />
          </div>

          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] transition-colors',
                  item.label === activeNav
                    ? 'bg-white/[0.08] text-white'
                    : 'text-white/55 hover:text-white/80',
                )}
              >
                <MIcon name={item.icon} size={14} />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col p-3">
          <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-black/20">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[rgb(59,130,246)] text-white">
                  <MIcon name="add" size={16} className="text-white" />
                </div>
                <span className="text-base font-semibold text-white">{title}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MIcon name="notifications" size={16} className="text-white/60" />
                <span className="rounded-full bg-[rgb(59,130,246)] px-2.5 py-1 text-[11px] font-medium text-white">
                  Invite
                </span>
                <div
                  className="h-7 w-7 rounded-full bg-cover bg-center ring-1 ring-white/10"
                  style={{
                    backgroundImage:
                      'url(https://i.pravatar.cc/64?img=12)',
                  }}
                />
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden px-4 pb-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
