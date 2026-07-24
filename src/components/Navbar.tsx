import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassSurface from './GlassSurface/GlassSurface'

const NAV_LINKS = [
  { label: '首页', target: 'home', href: '/' },
  { label: 'AI应用', target: 'ai-apps', href: '/ai-apps' },
  { label: 'AI图像', target: 'ai-images', href: '/ai-images' },
  { label: 'AI视频', target: 'ai-videos', href: '/ai-videos' },
  { label: '其他探索', target: 'more', href: '/more' },
  { label: '联系我', target: 'contact', href: '/contact' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('首页')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (label: string, href: string) => {
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate(href)
    }
    setActive(label)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <GlassSurface
        width="auto"
        height="auto"
        borderRadius={9999}
        backgroundOpacity={0.12}
        saturation={1.2}
        displace={0.5}
        className={`max-w-full overflow-x-auto no-scrollbar transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        <div className="inline-flex max-w-full items-center gap-1 px-2 py-2">
          {/* Logo */}
          <button
            aria-label="首页"
            onClick={() => handleNav('首页', '/')}
            className="group relative mr-1 grid h-9 w-9 flex-none place-items-center rounded-full p-[1.5px] accent-gradient transition-transform duration-300 hover:scale-110 hover:[background:linear-gradient(90deg,#4e85bf,#89aacc)]"
          >
            <span className="grid h-[33px] w-[33px] place-items-center rounded-full bg-bg">
              <span className="font-display italic text-[13px] text-text-primary">XL</span>
            </span>
          </button>

          <span className="mx-1 hidden w-px h-5 bg-stroke sm:block" />

          {/* Nav links */}
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNav(label, href)}
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
