import { useEffect, useRef, useState } from 'react'
import type { StatusMedia } from '../../types/types'

type CardsPokemonProps = {
  media: StatusMedia
  alt: string
  mediaType: 'gif' | 'video'
  layout?: 'card' | 'detail'
}

export default function CardsPokemon({ media, alt, mediaType, layout = 'detail' }: CardsPokemonProps) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(layout === 'detail')
  const [hasLoaded, setHasLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const aspectClass = layout === 'card' ? 'aspect-[16/10]' : 'aspect-[4/3]'
  const src = layout === 'card' ? (shouldLoad ? media.preview : undefined) : media.full

  useEffect(() => {
    if (layout !== 'card' || !media.preview || !mediaRef.current) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )

    observer.observe(mediaRef.current)
    return () => observer.disconnect()
  }, [layout, media.preview])

  const placeholderText = hasError
    ? 'Não foi possível carregar a animação'
    : src
      ? 'Carregando animação'
      : 'Animação em preparação'

  return (
    <div
      className={`relative flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100`}
      ref={mediaRef}
    >
      {src && mediaType === 'video' && (
        <video
          aria-label={alt}
          autoPlay
          className={`h-full w-full object-cover ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}
          loop
          muted
          onError={() => setHasError(true)}
          onLoadedData={() => setHasLoaded(true)}
          playsInline
          preload="none"
          src={src}
        />
      )}
      {src && mediaType === 'gif' && (
        <img
          alt={alt}
          className={`h-full w-full object-cover ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}
          decoding="async"
          loading={layout === 'card' ? 'lazy' : 'eager'}
          onError={() => setHasError(true)}
          onLoad={() => setHasLoaded(true)}
          src={src}
        />
      )}
      {(!src || !hasLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#123e79] px-4 text-center text-white">
          <span aria-hidden="true" className="text-4xl font-black tracking-tight text-[#b8d9ff]">HTTP</span>
          <span className="text-sm font-medium text-white/80">{placeholderText}</span>
        </div>
      )}
    </div>
  )
}
