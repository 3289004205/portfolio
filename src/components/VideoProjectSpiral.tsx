import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import InfiniteSpiral from './InfiniteSpiral/InfiniteSpiral'
import type { StackingProject } from './StackingCards/StackingCards'
import './VideoProjectSpiral.css'

export type VideoProject = StackingProject & { clips?: { src: string; title: string; bvid?: string; video?: string }[]; pending?: boolean }

type Clip = { src: string; alt: string; label: string; group: number; bvid?: string; video?: string }
export default function VideoProjectSpiral({ projects }: { projects: VideoProject[] }) {
  const [emptyGroup, setEmptyGroup] = useState<number | null>(null)
  const [focusWithin, setFocusWithin] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const clips = useMemo<Clip[]>(() => projects.flatMap<Clip>((project, group) => {
    if (project.clips?.length) return project.clips.map(item => ({ ...item, alt: item.title, label: item.title, group }))
    if (project.previews?.length) return project.previews.map((preview, index) => ({
      src: `/videos/spiral-covers/${preview.src.split('/').pop()?.replace(/\.(mp4|gif)$/, '.webp')}`,
      alt: `${project.name} · ${String(index + 1).padStart(2, '0')}`, label: `${project.name} / ${String(index + 1).padStart(2, '0')}`, group, bvid: preview.bvid, video: preview.src,
    }))
    return []
  }), [projects])
  const activeGroup = emptyGroup ?? clips[activeIndex]?.group ?? 0
  const project = projects[activeGroup]
  const clip = selected === null ? null : clips[selected]
  useEffect(() => {
    if (selected === null) return
    const focus = document.activeElement as HTMLElement | null
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') {
        const elements = Array.from(document.querySelectorAll<HTMLElement>('.video-spiral-modal button, .video-spiral-modal a, .video-spiral-modal video, .video-spiral-modal iframe'))
        const first = elements[0], last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', handleKey); focus?.focus() }
  }, [selected])
  return <>
    <section className="video-project-spiral" aria-label="视频项目螺旋画廊" onFocusCapture={() => setFocusWithin(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false) }}>
      <div className="video-project-spiral__copy">
        <p className="video-project-spiral__eyebrow">SELECTED MOTION / {String(activeGroup + 1).padStart(2, '0')}</p>
        <h2>让创意<br /><em>流动起来。</em></h2>
        <nav aria-label="视频项目分类" className="video-project-spiral__nav">
          {projects.map((item, index) => <button key={item.name} type="button" aria-pressed={activeGroup === index} onClick={() => { const first = clips.findIndex(c => c.group === index); if (first < 0) { setEmptyGroup(index); return } setEmptyGroup(null); setFocusIndex(previous => first + (Math.floor(previous / clips.length) + 1) * clips.length); setActiveIndex(first) }}><span>{item.number}</span>{item.name}<span aria-hidden="true">↗</span></button>)}
        </nav>
        <div className="video-project-spiral__detail"><p>{project.intro}</p><p className="video-project-spiral__roles">{project.roles?.join(' · ')}</p></div>
        <p className="video-project-spiral__hint">{emptyGroup === null ? '上下拖动探索 · 悬停暂停 · 点击播放' : '更多作品即将展示'}</p>
      </div>
      <div className="video-project-spiral__gallery">
        {emptyGroup !== null ? <div className="video-project-spiral__empty"><span>COMING SOON / 04</span><h3>AI主图视频</h3><p>视频待上传</p></div> : <><InfiniteSpiral items={clips} focusIndex={focusIndex} onActiveChange={setActiveIndex} onSelect={setSelected} animationMode={selected === null && !focusWithin ? 'all' : 'drag'} speed={0.3} radius={210} cardWidth={260} cardHeight={165} verticalSpacing={92} cardsPerTurn={7} centerScale={1.16} edgeBlur={2} edgeFade={0.35} pauseOnHover />
        <div className="video-project-spiral__counter">{String(activeIndex + 1).padStart(2, '0')} <span>/ {clips.length} FILMS</span></div></>}
      </div>
    </section>
    {clip && createPortal(<div className="video-spiral-modal" onClick={event => { if (event.target === event.currentTarget) setSelected(null) }}>
      <div className="video-spiral-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="video-spiral-title">
        <header><h3 id="video-spiral-title">{clip.alt}</h3><button ref={closeRef} type="button" onClick={() => setSelected(null)} aria-label="关闭视频">关闭 ×</button></header>
        {clip.video ? <video key={clip.video} src={clip.video} controls autoPlay playsInline poster={clip.src} /> : <iframe title={clip.alt} src={`https://player.bilibili.com/player.html?bvid=${clip.bvid}&autoplay=0&danmaku=0`} allowFullScreen allow="fullscreen" />}
        {clip.bvid && <a href={`https://www.bilibili.com/video/${clip.bvid}`} target="_blank" rel="noopener noreferrer">在哔哩哔哩查看完整视频 ↗</a>}
      </div>
    </div>, document.body)}
  </>
}
