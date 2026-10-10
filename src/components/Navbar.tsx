import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import GlassSurface from './GlassSurface/GlassSurface'
import { prefetchPage } from '../lib/route-modules'

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
    prefetchPage(href)
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    navigate(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-4 px-3 print:hidden">
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
        className="max-w-full overflow-x-auto no-scrollbar transition-[background-color,box-shadow] duration-300"
        style={{
          background: scrolled ? 'rgba(15, 15, 18, 0.94)' : 'rgba(15, 15, 18, 0.88)',
          backdropFilter: 'blur(18px) saturate(0.8)',
          WebkitBackdropFilter: 'blur(18px) saturate(0.8)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: scrolled
            ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 28px rgba(0,0,0,0.35)'
            : 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.2)',
        }}
      >
        <div className="inline-flex max-w-full items-center gap-0.5 px-1.5 py-1.5">
          {/* Logo */}
          <button
            aria-label="首页"
            onClick={() => handleNav('/')}
            className="group relative mr-0.5 grid h-7 w-7 flex-none place-items-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-b from-white/[0.10] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-px hover:border-white/35 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_12px_rgba(255,255,255,0.08)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transform-none"
          >
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_65%)] opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative font-display italic text-[12px] leading-none tracking-[-0.08em] text-white/85 transition-colors duration-300 group-hover:text-white">XL</span>
          </button>

          <span className="mx-0.5 hidden w-px h-4 bg-stroke sm:block" />

          {/* Nav links */}
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onPointerEnter={() => prefetchPage(href)}
              onFocus={() => prefetchPage(href)}
              onClick={() => handleNav(href)}
              aria-current={active === label ? 'page' : undefined}
              className={`flex-none rounded-full px-2 py-1 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:px-3 sm:py-1.5 sm:text-xs ${
                active === label
                  ? 'text-white bg-white/[0.14] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                  : 'text-[#d4d4da] hover:text-white hover:bg-white/[0.08]'
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
