const loaders = {
  '/': () => import('../pages/Home'),
  '/ai-apps': () => import('../pages/AiApps'),
  '/ai-images': () => import('../pages/AiImages'),
  '/ai-videos': () => import('../pages/AiVideos'),
  '/more': () => import('../pages/More'),
  '/contact': () => import('../pages/ContactPage'),
}

export type PagePath = keyof typeof loaders
const pending = new Map<PagePath, ReturnType<(typeof loaders)[PagePath]>>()

// Share each import between React.lazy and navigation prefetches.
export function loadPage(path: PagePath) {
  let request = pending.get(path)
  if (!request) {
    request = loaders[path]()
    pending.set(path, request)
    request.catch(() => pending.delete(path))
  }
  return request
}

export function prefetchPage(path: string) {
  if (path in loaders) void loadPage(path as PagePath).catch(() => {})
}

// Stagger code-only prefetches; don't compete with the current page's media.
export function schedulePagePrefetch(currentPath: string) {
  let cancelled = false
  let timer: ReturnType<typeof setTimeout>
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '')) return () => {}
  const queue = (['/more', '/ai-apps', '/ai-images', '/ai-videos', '/contact', '/'] as PagePath[]).filter((path) => path !== currentPath)
  const next = async () => {
    const path = queue.shift()
    if (cancelled || !path) return
    try { await loadPage(path) } catch { /* Navigation can retry. */ }
    if (!cancelled && queue.length) timer = setTimeout(next, 500)
  }
  timer = setTimeout(next, 1800)
  return () => { cancelled = true; clearTimeout(timer) }
}
