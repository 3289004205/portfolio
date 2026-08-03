import { motion } from 'framer-motion'

interface SectionHeaderProps {
  eyebrow: string
  titleLead?: string
  titleEm?: string
  titleTail?: string
  subtext?: string
  cta?: string
  onCta?: () => void
  className?: string
}

export default function SectionHeader({
  eyebrow,
  titleLead,
  titleEm,
  titleTail,
  subtext,
  cta,
  onCta,
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: '-100px' }}
      className={`mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between ${className}`}
    >
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</span>
        </div>
        <h2 className="text-4xl font-medium tracking-tight text-text-primary md:text-5xl lg:text-6xl">
          {titleLead}{' '}
          {titleEm && <span className="font-display italic">{titleEm}</span>}
          {titleTail}
        </h2>
        {subtext && (
          <p className="mt-4 max-w-md text-sm text-muted md:text-base">{subtext}</p>
        )}
      </div>

      {cta && (
        <button
          onClick={onCta}
          className="hidden md:inline-flex gradient-ring rounded-full bg-surface px-5 py-3 text-sm text-text-primary transition-transform hover:scale-105"
        >
          {cta} <span className="ml-2">↗</span>
        </button>
      )}
    </motion.div>
  )
}
