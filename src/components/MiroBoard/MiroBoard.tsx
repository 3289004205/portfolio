/**
 * MiroBoard —— 「画板」式嵌入卡片。
 * 用于把 Miro 协作画板嵌进作品集，呈现类似飞书云文档画板的展示效果。
 *
 * 权限说明：编辑/查看权限完全由 Miro 侧控制。
 * - 在 Miro 里把画板分享设为「任何获得链接的人可查看（只读）」，嵌入后即他人只读；
 * - 你自己保留编辑权限，直接在 Miro 里增删图片/文本，作品集实时同步。
 *
 * 用法：复制 Miro「分享 → 嵌入」给出的 <iframe src="...">，把整段 src 填到数据的 `src` 字段。
 */
type MiroBoardProps = {
  /** Miro 嵌入链接（iframe 的 src） */
  src?: string
  /** 画板标题（展示在顶部栏） */
  title?: string
  /** 在 Miro 中打开的链接（与嵌入同源的同 board 链接，选填） */
  openUrl?: string
  /** 画板比例，默认 16/9 */
  ratio?: string
}

export default function MiroBoard({
  src,
  title,
  openUrl,
  ratio = '16 / 9',
}: MiroBoardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stroke bg-surface shadow-xl shadow-black/20">
      {(title || openUrl) && (
        <div className="flex items-center justify-between gap-3 border-b border-stroke bg-white/[0.04] px-4 py-3">
          {title ? (
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              {title}
            </span>
          ) : (
            <span />
          )}
          {openUrl && (
            <a
              href={openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-text-primary"
            >
              在 Miro 中打开
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          )}
        </div>
      )}
      <div className="relative w-full bg-white" style={{ aspectRatio: ratio }}>
        {src ? (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 h-full w-full"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-white/[0.06] px-4 text-center text-xs text-muted">
            <span>待粘贴 Miro 嵌入链接</span>
            <span className="text-[10px] opacity-70">
              在 Miro 分享 → 嵌入，复制 iframe 的 src 填入数据即可
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
