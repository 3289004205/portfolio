import manifest from './image-manifest.json'

type ImageAsset = { width: number; height: number; src: string; srcSet: string; full: string }
const assets: Record<string, ImageAsset> = manifest

export const getImageAsset = (src?: string) => src ? assets[src] : undefined
export const getFullImage = (src: string) => assets[src]?.full ?? src
