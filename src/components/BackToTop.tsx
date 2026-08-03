import { motion } from 'framer-motion'

/**
 * 回到顶部按钮：居中显示，点击平滑滚动到页面顶部。
 * 用于 AI 应用 / AI 图像 / AI 视频 / 其他探索 各子页面底部。
 */
export default function BackToTop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-12 flex justify-center"
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="回到顶部"
        className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-sm text-text-primary transition-colors hover:bg-surface/70"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        回到顶部
      </button>
    </motion.div>
  )
}
