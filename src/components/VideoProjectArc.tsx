import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import type { StackingProject } from './StackingCards/StackingCards'
import './VideoProjectArc.css'

export type VideoProject = StackingProject & { clips?: { src: string; title: string; bvid?: string; video?: string }[]; pending?: boolean; workflowTarget?: string }
type Clip = { src: string; alt: string; bvid?: string; video?: string }

/** Independently implemented arc navigation; no React Bits Pro source or package is used. */
export default function VideoProjectArc({ projects, onViewWorkflow }: {
  projects: VideoProject[]
  onViewWorkflow: (id: string) => void
}) {
  const [activeGroup, setActiveGroup] = useState(0)
  const [activeClip, setActiveClip] = useState(0)
  const [selected, setSelected] = useState<Clip | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([])
  const clipsByGroup = useMemo<Clip[][]>(() => projects.map(project => {
    if (project.clips?.length) return project.clips.map(item => ({ ...item, alt: item.title }))
    return project.previews?.map((preview, index) => ({
      src: `/videos/spiral-covers/${preview.src.split('/').pop()?.replace(/\.(mp4|gif)$/, '.webp')}`,
      alt: `${project.name} · ${String(index + 1).padStart(2, '0')}`, bvid: preview.bvid, video: preview.src,
    })) ?? []
  }), [projects])
  const project = projects[activeGroup]
  const workflowTarget = project.workflowTarget ?? 'video-workflow'
  const clips = clipsByGroup[activeGroup] ?? []
  const preview = clips[activeClip]
  const clip = selected
  const selectGroup = (index: number) => { setActiveGroup(index); setActiveClip(0) }
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % projects.length
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + projects.length) % projects.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = projects.length - 1
    else return
    event.preventDefault(); selectGroup(next); categoryRefs.current[next]?.focus()
  }
  useEffect(() => {
    if (!selected) return
    const focus = document.activeElement as HTMLElement | null
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') {
        const elements = Array.from(document.querySelectorAll<HTMLElement>('.video-gallery-modal button, .video-gallery-modal a, .video-gallery-modal video, .video-gallery-modal iframe'))
        const first = elements[0], last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', handleKey); focus?.focus() }
  }, [selected])

  return <>
    <section data-no-zoom className="video-project-arc" aria-label="视频项目展示">
      <header className="video-project-arc__header"><span>SELECTED MOTION</span><p>从品牌叙事，到产品表达。</p></header>
      <div className="video-project-arc__layout">
        <div className="video-project-arc__navigation">
          <div className="video-project-arc__list" role="tablist" aria-label="视频项目分类" aria-orientation="vertical">
            {projects.map((item, index) => {
              const midpoint = (projects.length - 1) / 2
              const degrees = (index - midpoint) * (156 / Math.max(projects.length - 1, 1))
                + (midpoint - activeGroup) * 5
              const radians = degrees * Math.PI / 180
              const position = {
                '--arc-x': 1 - Math.cos(radians),
                '--arc-y': Math.sin(radians),
                '--turn': String(degrees * 0.1) + 'deg',
                '--opacity': Math.max(.62, 1 - Math.abs(index - activeGroup) * .14),
              } as CSSProperties
              return <button key={item.name} ref={node => { categoryRefs.current[index] = node }} id={`video-category-${index}`} type="button" role="tab" aria-selected={activeGroup === index} aria-controls="video-project-panel" tabIndex={activeGroup === index ? 0 : -1} onClick={() => selectGroup(index)} onKeyDown={event => navigate(event, index)} className="video-project-arc__title" style={position}>
                <span className="video-project-arc__number">{item.number}</span><span>{item.name}</span><span className="video-project-arc__arrow" aria-hidden="true">↗</span>
              </button>
            })}
          </div>
        </div>
        <div className="video-project-arc__controls">
          <button type="button" aria-label="上一个视频类目" onClick={() => selectGroup((activeGroup - 1 + projects.length) % projects.length)}>↑</button>
          <span>{project.number} / {String(projects.length).padStart(2, '0')}</span>
          <button type="button" aria-label="下一个视频类目" onClick={() => selectGroup((activeGroup + 1) % projects.length)}>↓</button>
        </div>
        <div id="video-project-panel" role="tabpanel" aria-labelledby={`video-category-${activeGroup}`} className="video-project-arc__panel">
          <div className="video-project-arc__frame">
            {preview ? (
              <button key={preview.src} type="button" className="video-project-arc__preview" onClick={() => setSelected(preview)} aria-label={`播放：${preview.alt}`}>
                <img src={preview.src} alt={preview.alt} draggable={false} />
                <span className="video-project-arc__play" aria-hidden="true" />
              </button>
            ) : <div className="video-project-arc__empty"><span>COMING SOON</span><h3>{project.name}</h3><p>视频待上传</p></div>}
          </div>
          {preview && (
            <div className="video-project-arc__caption">
              <h3>{preview.alt}</h3>
              <span aria-label="当前视频序号">{activeClip + 1} / {clips.length}</span>
            </div>
          )}
          {preview && (
            <div className="video-project-arc__thumbnails" aria-label={`${project.name}视频列表`}>
              {clips.map((item, index) => <button key={item.src} type="button" aria-label={`预览：${item.alt}`} aria-pressed={index === activeClip} onClick={() => setActiveClip(index)}><img src={item.src} alt="" loading="lazy" draggable={false} /></button>)}
            </div>
          )}
          <div className="video-project-arc__detail">
            <p>{project.intro}</p>
            {project.roles?.length ? <span>{project.roles.join(' · ')}</span> : null}
            <button type="button" className="project-action mt-4" onClick={() => onViewWorkflow(workflowTarget)}>
              查看制作流程 <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    {clip && createPortal(<div className="video-gallery-modal" onClick={event => { if (event.target === event.currentTarget) setSelected(null) }}>
      <div className="video-gallery-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="video-gallery-title">
        <header><h3 id="video-gallery-title">{clip.alt}</h3><button ref={closeRef} type="button" onClick={() => setSelected(null)} aria-label="关闭视频">关闭 ×</button></header>
        {clip.video ? <video key={clip.video} src={clip.video} controls autoPlay playsInline poster={clip.src} /> : <iframe title={clip.alt} src={`https://player.bilibili.com/player.html?bvid=${clip.bvid}&autoplay=0&danmaku=0`} allowFullScreen allow="fullscreen" />}
        {clip.bvid && <a href={`https://www.bilibili.com/video/${clip.bvid}`} target="_blank" rel="noopener noreferrer">在哔哩哔哩查看完整视频 ↗</a>}
      </div>
    </div>, document.body)}
  </>
}
