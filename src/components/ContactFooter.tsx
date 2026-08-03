import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Mail, Phone } from 'lucide-react'
import HlsVideo from './HlsVideo'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const MARQUEE_PHRASE = 'BUILDING THE FUTURE • '

/** 微信图标（lucide 无官方品牌图标，用内联 SVG 替代） */
function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.12c.73.18 1.5.29 2.29.31-.34-.68-.53-1.45-.53-2.26 0-2.9 2.9-5.25 6.5-5.25.61 0 1.2.07 1.76.19C16.1 5.95 13.08 4 9.5 4zM6.25 8.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm5.5 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
      <path d="M17.25 9.5c-3.04 0-5.5 1.9-5.5 4.25s2.46 4.25 5.5 4.25c.62 0 1.22-.08 1.78-.21L21.5 19l-.63-1.97C22.2 16.05 23 14.64 23 13c0-1.93-1.57-3.5-3.5-3.5h-2.25zM15.5 12.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm4 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
    </svg>
  )
}

/** GitHub 图标（当前 lucide-react 1.28.0 无此图标，用内联 SVG 替代） */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
    </svg>
  )
}

type ContactItem = {
  label: string
  value: string
  href?: string
  Icon: React.ComponentType<{ className?: string }>
}

const CONTACTS: ContactItem[] = [
  { label: '微信', value: '19163309757', Icon: WeChatIcon },
  { label: '电话', value: '19163309757', Icon: Phone },
  { label: 'GitHub', value: '3289004205', href: 'https://github.com/3289004205', Icon: GitHubIcon },
  { label: '邮箱', value: '3289004205@qq.com', href: 'mailto:3289004205@qq.com', Icon: Mail },
]

export default function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<ContactItem | null>(null)
  const [copied, setCopied] = useState(false)
  const [ctaCopied, setCtaCopied] = useState(false)

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

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  const handleCopyCta = async () => {
    try {
      await navigator.clipboard.writeText('19163309757')
      setCtaCopied(true)
      setTimeout(() => setCtaCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  const group = MARQUEE_PHRASE.repeat(10)

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pt-16 pb-8 md:pt-20 md:pb-12">
      {/* Background video (flipped vertically) */}
      <HlsVideo src={HLS_SRC} flip />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/40 to-black/60" />

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
        <button
          type="button"
          onClick={handleCopyCta}
          className="gradient-ring mt-8 inline-flex rounded-full bg-surface px-7 py-3.5 text-sm text-text-primary transition-transform hover:scale-105"
        >
          {ctaCopied ? '已复制' : '19163309757'} <span className="ml-2">{ctaCopied ? '✓' : '↗'}</span>
        </button>

        {/* Footer bar */}
        <div className="mt-16 flex w-full flex-col items-center justify-between gap-6 border-t border-stroke pt-8 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Available for projects
          </div>

          {/* 联系方式图标 */}
          <div className="flex items-center gap-4">
            {CONTACTS.map((c) => {
              const Icon = c.Icon
              return (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => {
                    setActive(c)
                    setCopied(false)
                  }}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-stroke bg-surface/60 text-muted transition-colors hover:border-text-primary/30 hover:bg-surface hover:text-text-primary"
                  aria-label={c.label}
                >
                  <Icon className="h-5 w-5" />
                </button>
              )
            })}
          </div>
        </div>

        <p className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} Xiulong Yang. All rights reserved.
        </p>
      </div>

      {/* 联系信息弹窗 */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-sm rounded-3xl border border-stroke bg-surface p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <active.Icon className="h-6 w-6 text-text-primary" />
                <span className="text-lg font-medium text-text-primary">{active.label}</span>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full p-1 text-muted transition-colors hover:bg-stroke hover:text-text-primary"
                aria-label="关闭"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-5 break-all rounded-2xl border border-stroke bg-bg px-4 py-3 text-center text-base text-text-primary">
              {active.value}
            </div>

            <div className="mt-5 flex gap-3">
              {active.href ? (
                <a
                  href={active.href}
                  target={active.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex-1 rounded-full bg-text-primary py-2.5 text-center text-sm font-medium text-bg transition-colors hover:bg-text-primary/90"
                >
                  打开
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCopy(active.value)}
                  className="flex-1 rounded-full bg-text-primary py-2.5 text-sm font-medium text-bg transition-colors hover:bg-text-primary/90"
                >
                  {copied ? '已复制' : '复制'}
                </button>
              )}
              <button
                type="button"
                onClick={() => setActive(null)}
                className="flex-1 rounded-full border border-stroke py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
