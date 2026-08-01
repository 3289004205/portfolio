import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import RaysBackground from '../components/SideRays/RaysBackground'

const VIDEOS = [
  {
    title: '产品宣传短片',
    desc: '基于文本脚本一键生成品牌级产品视频，支持分镜与配乐自动匹配。',
  },
  {
    title: 'AI 角色动画',
    desc: '从口型同步到动作生成，为数字人与虚拟 IP 打造流畅表演。',
  },
  {
    title: '动态广告变体',
    desc: '批量生成多版本视频素材，快速覆盖不同渠道与受众。',
  },
]

export default function AiVideos() {
  const navigate = useNavigate()

  return (
    <>
      <RaysBackground />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto min-h-screen max-w-[1100px] bg-transparent px-6 py-24 md:px-10"
      >
      <button
        onClick={() => navigate('/')}
        className="mb-12 text-sm text-muted transition-colors hover:text-text-primary"
      >
        ← 返回首页
      </button>

      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-stroke" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted">AI Videos</span>
      </div>

      <h1 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
        AI 视频
      </h1>
      <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
        文生视频、图生视频与智能剪辑，把创意脚本快速转化为动态影像。
      </p>

      <div className="mt-16 flex flex-col gap-6">
        {VIDEOS.map((item, i) => (
          <div
            key={item.title}
            className="flex flex-col gap-4 rounded-3xl border border-stroke bg-surface p-6 md:flex-row md:items-center md:gap-8"
          >
            <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl border border-stroke bg-bg text-lg font-medium text-text-primary">
              0{i + 1}
            </div>
            <div>
              <h3 className="text-lg text-text-primary">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      </motion.main>
    </>
  )
}
