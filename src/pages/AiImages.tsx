import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const IMAGES = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=600&auto=format&fit=crop',
]

export default function AiImages() {
  const navigate = useNavigate()

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto min-h-screen max-w-[1200px] bg-bg px-6 py-24 md:px-10"
    >
      <button
        onClick={() => navigate('/')}
        className="mb-12 text-sm text-muted transition-colors hover:text-text-primary"
      >
        ← 返回首页
      </button>

      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-stroke" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted">AI Images</span>
      </div>

      <h1 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
        AI 图像
      </h1>
      <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
        文生图、图生图、风格迁移与视觉合成——从概念到成品的图像生成工作流。
      </p>

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {IMAGES.map((src, i) => (
          <div
            key={i}
            className="group aspect-square overflow-hidden rounded-3xl border border-stroke bg-surface"
          >
            <img
              src={src}
              alt={`AI image ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </motion.main>
  )
}
