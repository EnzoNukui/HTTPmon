import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { FiArrowLeft, FiFilm } from 'react-icons/fi'
import CardsPokemon from '../../components/CardsPokemon/CardsPokemon'
import Footer from '../../components/Footer/Footer'
import { getHttpStatus } from '../../services/httpStatuses'

function InfoPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(18,62,121,0.05)] sm:p-6">
      <h2 className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-[#174f96]">
        <span aria-hidden="true" className="h-5 w-1 rounded-full bg-[#e84855]" />
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function StatusPage() {
  const { code } = useParams<{ code: string }>()
  const numericCode = Number(code)
  const status = Number.isInteger(numericCode) ? getHttpStatus(numericCode) : undefined

  if (!status) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f5f8fc] text-[#1c2b43]">
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#e84855]">Status não cadastrado</p>
          <h1 className="text-4xl font-black tracking-tight text-[#123e79] sm:text-5xl">Não encontramos esse código</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Ainda não temos esse código por aqui.
          </p>
          <Link className="mt-8 rounded-full bg-[#1769b0] px-6 py-3 font-semibold text-white transition hover:bg-[#12548f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769b0]" to="/">
            Voltar ao início
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#1c2b43]">
        <main className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-12">
        <Link
          className="mb-7 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#1769b0] transition hover:bg-[#eaf3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769b0]"
          to="/"
        >
          <FiArrowLeft aria-hidden="true" className="size-4" />
          Voltar para todos os status
        </Link>
        <header className="mb-9 text-center sm:mb-12">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1769b0]">HTTP status</p>
          <h1 className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 break-words text-2xl font-bold tracking-tight text-[#1d2b43] sm:gap-x-3 sm:text-5xl">
            <span className="font-black text-[#1769b0]">{status.code}</span>
            <span>{status.name}</span>
          </h1>
        </header>

        <section aria-label={`${status.code} ${status.name}`} className="grid min-w-0 items-center gap-6 sm:gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <figure className="mx-auto w-full min-w-0 max-w-md rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(18,62,121,0.09)] sm:p-4">
            <CardsPokemon alt={status.mediaDescription} media={status.media} mediaType={status.mediaType} />
            <figcaption className="px-2 pb-1 pt-3 text-sm text-slate-500">{status.mediaDescription}</figcaption>
          </figure>

          <div className="min-w-0 rounded-[1.75rem] bg-white p-5 shadow-[0_16px_40px_rgba(18,62,121,0.07)] sm:p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#eaf3ff] px-4 py-2 text-sm font-semibold text-[#174f96]">
              <span aria-hidden="true" className="size-2 rounded-full bg-[#e84855]" />
              {status.categoryRange} · {status.categoryLabel}
            </div>
            <p className="break-words text-base leading-7 text-slate-700 sm:text-xl sm:leading-9">{status.description}</p>
          </div>
        </section>

        <section aria-labelledby="media-reason-title" className="mt-7 rounded-[1.75rem] bg-[#123e79] px-5 py-5 text-white shadow-[0_16px_40px_rgba(18,62,121,0.13)] sm:mt-10 sm:flex sm:items-start sm:gap-5 sm:px-8 sm:py-7">
          <FiFilm aria-hidden="true" className="mb-4 size-6 shrink-0 text-[#ff7079] sm:mb-0 sm:mt-1" />
          <div>
            <h2 id="media-reason-title" className="text-sm font-bold uppercase tracking-[0.14em] text-[#cfe2ff]">
              Por que esse GIF?
            </h2>
            <p className="mt-2 max-w-4xl break-words text-sm leading-6 text-white/90 sm:text-base sm:leading-7">{status.mediaReason}</p>
          </div>
        </section>

        <section aria-label="Detalhes do status" className="mt-7 grid min-w-0 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
          <InfoPanel title="Significado">
            <p className="leading-7 text-slate-600">{status.meaning}</p>
          </InfoPanel>

          <InfoPanel title="Exemplo">
            <p className="mb-3 text-sm leading-6 text-slate-500">
              Primeiro aparece a solicitação. Depois da linha em branco, vem a resposta do servidor. Os endereços e dados são de exemplo.
            </p>
            <pre className="max-w-full overflow-x-auto rounded-xl bg-[#17263b] px-4 py-5 text-sm leading-6 text-[#f4f8ff] sm:text-base">
              <code>{status.example}</code>
            </pre>
          </InfoPanel>

          <InfoPanel title="Causas comuns">
            <ul className="space-y-3 text-slate-600">
              {status.commonCauses.map((cause) => (
                <li className="flex gap-3 leading-6" key={cause}>
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#e84855]" />
                  {cause}
                </li>
              ))}
            </ul>
          </InfoPanel>

          <InfoPanel title="Status relacionados">
            <ul className="flex flex-wrap gap-2">
              {status.relatedStatuses.map((related) => (
                <li className="rounded-xl border border-[#d8e8fa] bg-[#f6faff] px-3 py-2 text-sm" key={related.code}>
                  <span className="font-bold text-[#1769b0]">{related.code}</span>
                  <span className="ml-2 text-slate-600">{related.name}</span>
                </li>
              ))}
            </ul>
          </InfoPanel>
        </section>
      </main>

      <Footer />
    </div>
  )
}
