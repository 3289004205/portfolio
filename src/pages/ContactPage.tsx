import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ResumeSection from '../components/ResumeSection'

export default function ContactPage() {
  const navigate = useNavigate()

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full bg-bg"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 lg:px-16">
        <button
          onClick={() => navigate('/')}
          className="mb-12 text-sm text-muted transition-colors hover:text-text-primary"
        >
          ← 返回首页
        </button>

        {/* 联系信息 */}
        <div className="mb-24">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Contact</span>
          </div>

          <h1 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
            联系我
          </h1>
          <p className="mt-4 text-sm text-muted md:text-base">
            如果你有兴趣探讨 AI 应用、图像/视频生成或自动化工作流，欢迎随时联系。
          </p>

          <a
            href="mailto:3289004205@qq.com"
            className="gradient-ring mt-10 inline-flex w-fit rounded-full bg-surface px-7 py-3.5 text-sm text-text-primary transition-transform hover:scale-105"
          >
            3289004205@qq.com <span className="ml-2">↗</span>
          </a>

          <div className="mt-12 flex gap-6 text-sm text-muted">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-text-primary">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-text-primary">LinkedIn</a>
            <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="hover:text-text-primary">Dribbble</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-text-primary">GitHub</a>
          </div>
        </div>
      </div>

      {/* 简历 */}
      <ResumeSection />
    </motion.main>
  )
}
