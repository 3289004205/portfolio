import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import HlsVideo from './HlsVideo'

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260411_104032_69319010-2458-492b-b04d-b40a5dfa4482.mp4'
const ROLES = ['Creative', 'Founder', 'AIGCer', 'Designer']

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const navigate = useNavigate()

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, delay: 0.3 },
        '<',
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Cycling role every 2s
  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Background HLS video */}
      <HlsVideo src={VIDEO_SRC} />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Centered content — padded bottom so CTA clears the scroll indicator */}
      <div className="relative z-10 flex flex-col items-center px-6 pb-24 text-center md:pb-32">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          2024–2026 Collection
        </p>

        <h1 className="name-reveal mb-6 font-display italic leading-[0.9] tracking-tight text-text-primary text-6xl md:text-8xl lg:text-9xl">
          Xiulong Yang
        </h1>

        <p className="blur-in mb-12 text-sm text-muted md:text-base">
          A{' '}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {ROLES[roleIndex]}
          </span>{' '}
          lives in Hangzhou.
        </p>

        <p className="blur-in mb-12 max-w-md text-sm text-muted md:text-base">
          AI application development and image/video generation pipelines, turning generative AI
          into efficient, reusable solutions.
        </p>

        <div className="blur-in inline-flex gap-4">
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative rounded-full p-[2px] text-sm transition-transform hover:scale-105"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative inline-flex items-center rounded-full bg-text-primary px-7 py-3.5 text-bg transition-colors group-hover:bg-bg group-hover:text-text-primary">
              作品总览
            </span>
          </button>

          <button
            onClick={() => navigate('/contact')}
            className="group relative rounded-full p-[2px] text-sm transition-transform hover:scale-105"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative inline-flex items-center rounded-full border-2 border-transparent bg-bg px-7 py-3.5 text-text-primary">
              关于我
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Scroll</span>
        <div className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="absolute left-0 top-0 h-4 w-px animate-scroll-down bg-text-primary" />
        </div>
      </div>
    </section>
  )
}
