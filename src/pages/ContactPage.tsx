import { motion } from 'framer-motion'
import ResumeSection from '../components/ResumeSection'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'

const CONTACTS = [
  { label: '微信', value: '19163309757', copy: true },
  { label: '电话', value: '19163309757', copy: true },
  { label: 'GitHub', value: '3289004205', href: 'https://github.com/3289004205' },
  { label: '邮箱', value: '3289004205@qq.com', href: 'mailto:3289004205@qq.com' },
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
      <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-24 md:px-10 lg:px-16" />

      {/* 联系方式 */}
      <section className="mx-auto max-w-[1200px] px-6 pb-4 pt-2 md:px-10 lg:px-16">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Contact · 联系方式</span>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CONTACTS.map((c) => {
            const inner = (
              <>
                <span className="text-sm font-medium text-text-primary">{c.label}</span>
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
