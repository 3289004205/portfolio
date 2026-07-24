import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import HlsVideo from './HlsVideo'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const MARQUEE_PHRASE = 'BUILDING THE FUTURE • '
const SOCIALS = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'GitHub', href: 'https://github.com' },
]

export default function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })
    }, marqueeRef)
    return () => ctx.revert()
  }, [])

  const group = MARQUEE_PHRASE.repeat(10)

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pt-16 pb-8 md:pt-20 md:pb-12">
      {/* Background video (flipped vertically) */}
      <HlsVideo src={HLS_SRC} flip />
      <div className="absolute inset-0 bg-black/60" />

      {/* Marquee */}
      <div className="relative z-10 flex overflow-hidden py-10">
        <div ref={marqueeRef} className="flex flex-none whitespace-nowrap">
          <span className="font-display text-6xl italic text-text-primary/30 md:text-8xl">
            {group}
          </span>
          <span className="font-display text-6xl italic text-text-primary/30 md:text-8xl">
            {group}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center md:px-10">
        <h2 className="text-4xl font-medium tracking-tight text-text-primary md:text-6xl">
          Let&rsquo;s build something
        </h2>
        <a
          href="mailto:3289004205@qq.com"
          className="gradient-ring mt-8 inline-flex rounded-full bg-surface px-7 py-3.5 text-sm text-text-primary transition-transform hover:scale-105"
        >
          3289004205@qq.com <span className="ml-2">↗</span>
        </a>

        {/* Footer bar */}
        <div className="mt-16 flex w-full flex-col items-center justify-between gap-6 border-t border-stroke pt-8 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Available for projects
          </div>

          <div className="flex items-center gap-6 text-sm text-muted">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-text-primary"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} Xiulong Yang. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
