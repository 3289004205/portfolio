import { useState, type ImgHTMLAttributes } from 'react'
import { getImageAsset } from '../lib/images'

export default function OptimizedImage({ src, sizes = '(max-width: 767px) calc(100vw - 48px), 520px', loading = 'lazy', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false)
  const asset = failed ? undefined : getImageAsset(src)
  return <img
    {...props}
    src={asset?.src ?? src}
    srcSet={asset?.srcSet}
    sizes={asset ? sizes : undefined}
    width={props.width ?? asset?.width}
    height={props.height ?? asset?.height}
    loading={loading}
    decoding="async"
    data-full-src={asset?.full ?? src}
    onError={(event) => {
      if (asset) setFailed(true)
      props.onError?.(event)
    }}
  />
}
