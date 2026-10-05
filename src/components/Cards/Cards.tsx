import { Link } from 'react-router'
import type { HttpStatus } from '../../types/types'
import CardsPokemon from '../CardsPokemon/CardsPokemon'

type CardsProps = {
  status: HttpStatus
}

export default function Cards({ status }: CardsProps) {
  return (
    <Link
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(18,62,121,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#9fc7f3] hover:shadow-[0_16px_32px_rgba(18,62,121,0.13)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769b0]"
      to={`/status/${status.code}`}
    >
      <CardsPokemon alt={status.mediaDescription} layout="card" media={status.media} mediaType={status.mediaType} />
      <div className="min-w-0 p-4 sm:p-5">
        <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
          <span className="text-3xl font-black leading-none tracking-tight text-[#1769b0]">{status.code}</span>
          <span className="shrink-0 rounded-full bg-[#eaf3ff] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#174f96] sm:px-3 sm:text-xs">
            {status.categoryRange}
          </span>
        </div>
        <h3 className="mt-4 break-words text-base font-bold leading-snug text-[#1d2b43] group-hover:text-[#1769b0] sm:text-lg">{status.name}</h3>
        <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-slate-600 sm:line-clamp-2">{status.description}</p>
        <p className="mt-4 text-sm font-semibold text-[#1769b0]">Ver detalhes <span aria-hidden="true">→</span></p>
      </div>
    </Link>
  )
}
