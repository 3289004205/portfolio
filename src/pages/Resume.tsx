import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const EXPERIENCE = [
  {
    role: 'Founder & Creative Director',
    company: 'Studio North',
    period: '2020 — Present',
    detail: 'Leading a small team building digital products and brand systems for culture-forward clients.',
  },
  {
    role: 'Senior Product Designer',
    company: 'Lumen Labs',
    period: '2016 — 2020',
    detail: 'Owned end-to-end design for the core platform used by 2M+ monthly users.',
  },
  {
    role: 'Fullstack Engineer',
    company: 'Northwind',
    period: '2012 — 2016',
    detail: 'Shipped web apps across finance and media, from database to interface.',
  },
]

const SKILLS = ['Interaction Design', 'Design Systems', 'React / TypeScript', 'Motion', 'Brand', 'Prototyping']

export default function Resume() {
  const navigate = useNavigate()

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto min-h-screen max-w-[900px] px-6 py-24 md:px-10"
    >
      <button
        onClick={() => navigate('/')}
        className="mb-12 text-sm text-muted transition-colors hover:text-text-primary"
      >
        ← Back
      </button>

      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-stroke" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted">Resume</span>
      </div>

      <h1 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
        Michael Smith
      </h1>
      <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
        Creative, fullstack, founder, and scholar based in Chicago. Designing seamless
        digital interactions since 2012.
      </p>

      <h2 className="mt-16 text-2xl font-medium text-text-primary">Experience</h2>
      <div className="mt-6 flex flex-col gap-8 border-t border-stroke pt-8">
        {EXPERIENCE.map((e) => (
          <div key={e.company} className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <div>
              <h3 className="text-lg text-text-primary">{e.role}</h3>
              <p className="text-sm text-muted">{e.company}</p>
              <p className="mt-2 max-w-md text-sm text-muted">{e.detail}</p>
            </div>
            <span className="text-sm text-muted">{e.period}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-medium text-text-primary">Skills</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {SKILLS.map((s) => (
          <span
            key={s}
            className="rounded-full border border-stroke bg-surface px-4 py-2 text-sm text-text-primary"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.main>
  )
}
