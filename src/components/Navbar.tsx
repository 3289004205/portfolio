import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import GlassSurface from './GlassSurface/GlassSurface'

const NAV_LINKS = [
  { label: '首页', target: 'home', href: '/' },
  { label: 'AI应用', target: 'ai-apps', href: '/ai-apps' },
  { label: 'AI图像', target: 'ai-images', href: '/ai-images' },
  { label: 'AI视频', target: 'ai-videos', href: '/ai-videos' },
  { label: '其他探索', target: 'more', href: '/more' },
  { label: '我的简历', target: 'contact', href: '/contact' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const active = useMemo(() => {
    const match = NAV_LINKS.find((link) => link.href === location.pathname)
    return match?.label ?? '首页'
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    navigate(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 print:hidden">
      <GlassSurface
        width="auto"
        height="auto"
        borderRadius={9999}
        borderWidth={0.22}
        backgroundOpacity={0.42}
        saturation={0.9}
        displace={3}
        distortionScale={-160}
        brightness={30}
        opacity={0.75}
        blur={14}
        redOffset={4}
        greenOffset={10}
        blueOffset={18}
        xChannel="R"
        yChannel="B"
        className={`max-w-full overflow-x-auto no-scrollbar transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        <div className="inline-flex max-w-full items-center gap-1 px-2 py-2">
          {/* Logo */}
          <button
            aria-label="首页"
            onClick={() => handleNav('/')}
            className="group relative mr-1 grid h-9 w-9 flex-none place-items-center rounded-full transition-transform duration-300 hover:scale-110"
          >
            {/* 旋转的开口圆环：复刻 X 视频样式（暖白弧段 + 缺口，缓慢自转，悬停加速） */}
            <span className="absolute inset-0 animate-[spin_6s_linear_infinite] group-hover:[animation-duration:2.5s]">
              <svg viewBox="0 0 36 36" className="h-full w-full overflow-visible">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#d5d3b8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="56 44.5"
                  transform="rotate(-90 18 18)"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(213,211,184,0.5))' }}
                />
              </svg>
            </span>
            <span className="grid h-[33px] w-[33px] place-items-center rounded-full bg-bg">
              <span className="font-display italic text-[13px] text-text-primary">XL</span>
            </span>
          </button>

          <span className="mx-1 hidden w-px h-5 bg-stroke sm:block" />

          {/* Nav links */}
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNav(href)}
              className={`flex-none rounded-full px-2.5 py-1.5 text-xs transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                active === label
                  ? 'text-text-primary bg-stroke/50'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </GlassSurface>
    </nav>
  )
}
