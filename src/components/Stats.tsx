import { motion } from 'framer-motion'

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '95+', label: 'Projects Done' },
  { value: '200%', label: 'Satisfied Clients' },
]

export default function Stats() {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 border-y border-stroke py-12 md:grid-cols-3 md:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="flex flex-col items-center text-center md:border-r md:border-stroke md:last:border-r-0"
            >
              <span className="font-display text-6xl italic text-text-primary md:text-7xl">
                {s.value}
              </span>
              <span className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
