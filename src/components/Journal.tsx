import SectionHeader from './SectionHeader'

interface JournalEntry {
  title: string
  image: string
  readTime: string
  date: string
}

const ENTRIES: JournalEntry[] = [
  {
    title: 'Designing for Stillness in Motion UI',
    image:
      'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=400&auto=format&fit=crop',
    readTime: '6 min read',
    date: 'Jul 2026',
  },
  {
    title: 'Notes on Building a Component System',
    image:
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=400&auto=format&fit=crop',
    readTime: '4 min read',
    date: 'Jun 2026',
  },
  {
    title: 'The Quiet Power of Negative Space',
    image:
      'https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=400&auto=format&fit=crop',
    readTime: '8 min read',
    date: 'May 2026',
  },
  {
    title: 'Translating Brand into Interaction',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop',
    readTime: '5 min read',
    date: 'Apr 2026',
  },
]

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          titleLead="Recent"
          titleEm="thoughts"
          subtext="Essays and field notes on design, code, and the space between."
          cta="View all"
        />

        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry) => (
            <a
              key={entry.title}
              href="#"
              className="group flex items-center gap-6 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors hover:bg-surface sm:rounded-full"
            >
              <img
                src={entry.image}
                alt={entry.title}
                loading="lazy"
                className="h-16 w-16 flex-none rounded-full object-cover sm:h-20 sm:w-20"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-medium text-text-primary md:text-lg">
                  {entry.title}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                  <span>{entry.readTime}</span>
                  <span className="h-1 w-1 rounded-full bg-muted" />
                  <span>{entry.date}</span>
                </div>
              </div>
              <span className="hidden flex-none pr-2 text-muted transition-colors group-hover:text-text-primary sm:block">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
