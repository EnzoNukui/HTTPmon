type MediaLoaderProps = {
  message: string
  isLoading?: boolean
}

export default function MediaLoader({ message, isLoading = true }: MediaLoaderProps) {
  return (
    <div
      aria-live="polite"
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#123e79] px-4 text-center text-white dark:bg-[#303030]"
      role="status"
    >
      {isLoading ? (
        <span aria-hidden="true" className="relative size-12 animate-spin overflow-hidden rounded-full border-[3px] border-white shadow-[0_0_0_4px_rgba(184,217,255,0.2)] motion-reduce:animate-none">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-[#ed4b59]" />
          <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-[#123e79]" />
          <span className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#123e79] bg-white" />
        </span>
      ) : (
        <span aria-hidden="true" className="text-3xl font-black tracking-tight text-[#b8d9ff]">HTTP</span>
      )}
      <span className="text-sm font-medium text-white/90">{message}</span>
      {isLoading && (
        <span aria-hidden="true" className="flex gap-1">
          <span className="size-1.5 animate-bounce rounded-full bg-white [animation-delay:-0.2s] motion-reduce:animate-none" />
          <span className="size-1.5 animate-bounce rounded-full bg-white [animation-delay:-0.1s] motion-reduce:animate-none" />
          <span className="size-1.5 animate-bounce rounded-full bg-white motion-reduce:animate-none" />
        </span>
      )}
    </div>
  )
}
