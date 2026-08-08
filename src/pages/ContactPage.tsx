import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import ResumeSection from '../components/ResumeSection'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'

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

const CONTACTS = [
  { label: '微信', value: '19163309757', copy: true, Icon: WeChatIcon },
  { label: '电话', value: '19163309757', copy: true, Icon: Phone },
  { label: 'GitHub', value: '3289004205', href: 'https://github.com/3289004205', Icon: GitHubIcon },
  { label: '邮箱', value: '3289004205@qq.com', href: 'mailto:3289004205@qq.com', Icon: Mail },
]

export default function ContactPage() {
  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text)
  }

  return (
    <>
      <Navbar />
      <RaysBackground />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto w-full bg-transparent"
      >
      <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-24 md:px-10 lg:px-16 print:pt-12" />

      {/* 联系方式 */}
      <section className="mx-auto max-w-[1200px] px-6 pb-4 pt-2 md:px-10 lg:px-16">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Contact · 联系方式</span>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CONTACTS.map((c) => {
            const Icon = c.Icon
            const inner = (
              <>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-text-primary" />
                  <span className="text-sm font-medium text-text-primary">{c.label}</span>
                </div>
                <span className="mt-1 text-xs text-muted">{c.value}</span>
              </>
            )
            const className =
              'flex flex-col rounded-2xl border border-stroke bg-surface px-5 py-4 text-left transition-colors hover:bg-surface/70'
            if (c.href) {
              const external = c.href.startsWith('http')
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={external ? '_blank' : undefined}
                  rel="noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              )
            }
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => handleCopy(c.value)}
                className={className}
              >
                {inner}
              </button>
            )
          })}
        </div>
      </section>

      <ResumeSection />
      </motion.main>
    </>
  )
}
