import { useEffect, useRef, useState } from 'react'
import type { StatusMedia } from '../../types/types'
import MediaLoader from '../MediaLoader/MediaLoader'

type CardsPokemonProps = {
  media: StatusMedia
  alt: string
  mediaType: 'gif' | 'video'
  layout?: 'card' | 'detail'
  loadOrder?: number
}

const PREFETCH_BATCH_SIZE = 10
const PREFETCH_BATCH_START = 6
const cardMediaLoaders = new Map<number, () => void>()
const requestedBatches = new Set<number>()

function prefetchNextBatch(afterOrder: number) {
  if (afterOrder % PREFETCH_BATCH_SIZE < PREFETCH_BATCH_START) return

  const nextBatch = Math.floor(afterOrder / PREFETCH_BATCH_SIZE) + 1
  if (requestedBatches.has(nextBatch)) return
  requestedBatches.add(nextBatch)

  const firstOrder = nextBatch * PREFETCH_BATCH_SIZE
  for (let order = firstOrder; order < firstOrder + PREFETCH_BATCH_SIZE; order += 1) {
    cardMediaLoaders.get(order)?.()
  }
}

export default function CardsPokemon({ media, alt, mediaType, layout = 'detail', loadOrder }: CardsPokemonProps) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(
    layout === 'detail' || (layout === 'card' && loadOrder !== undefined && loadOrder < PREFETCH_BATCH_SIZE),
  )
  const [hasLoaded, setHasLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const aspectClass = layout === 'card' ? 'aspect-[16/10]' : 'aspect-[4/3]'
  const src = layout === 'card' ? (shouldLoad ? media.preview : undefined) : media.full

  useEffect(() => {
    if (layout !== 'card' || loadOrder === undefined) return

    cardMediaLoaders.set(loadOrder, () => setShouldLoad(true))
    return () => {
      cardMediaLoaders.delete(loadOrder)
      if (cardMediaLoaders.size === 0) requestedBatches.clear()
    }
  }, [layout, loadOrder])

  useEffect(() => {
    if (layout !== 'card' || !media.preview || !mediaRef.current) return

    const requestNearbyMedia = () => {
      setShouldLoad(true)
      if (loadOrder !== undefined) prefetchNextBatch(loadOrder)
    }

    if (!('IntersectionObserver' in window)) {
      requestNearbyMedia()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestNearbyMedia()
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )

    observer.observe(mediaRef.current)
    return () => observer.disconnect()
  }, [layout, loadOrder, media.preview])

  const placeholderText = hasError
    ? 'Não foi possível carregar a animação'
    : src
      ? 'Carregando animação'
      : 'Animação em preparação'

  return (
    <div
      className={`relative flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#3a3a3a]`}
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
          loading="eager"
          onError={() => setHasError(true)}
          onLoad={() => setHasLoaded(true)}
          src={src}
        />
      )}
      {(!src || !hasLoaded || hasError) && (
        <MediaLoader message={placeholderText} isLoading={Boolean(src) && !hasError} />
      )}
    </div>
  )
}
