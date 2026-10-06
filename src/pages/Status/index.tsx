import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { FiArrowLeft, FiArrowRight, FiExternalLink } from 'react-icons/fi'
import CardsPokemon from '../../components/CardsPokemon/CardsPokemon'
import Footer from '../../components/Footer/Footer'
import ResolutionGuide from '../../components/ResolutionGuide/ResolutionGuide'
import { getHttpStatus, httpStatuses } from '../../services/httpStatuses'

type TypePalette = { color: string; background: string; border: string; foreground?: string }

const typePalettes = {
  psychic: { color: '#8855b8', background: '#f1e6fb', border: '#dfc8f2' },
  grass: { color: '#39854c', background: '#e4f4e5', border: '#c6e6ca' },
  water: { color: '#176eac', background: '#dff1ff', border: '#c0e2fa' },
  fire: { color: '#c63832', background: '#f65b4e', border: '#ed463d', foreground: '#ffffff' },
  dark: { color: '#48515f', background: '#e8ebf0', border: '#d3d9e1' },
  electric: { color: '#785b00', background: '#f2c94c', border: '#e6b52f', foreground: '#273044' },
  ice: { color: '#087e9f', background: '#4bc8df', border: '#36b9d1', foreground: '#123247' },
  fairy: { color: '#934d80', background: '#f4e1ef', border: '#e8c9df' },
}

const categoryTypePalette = {
  '1': typePalettes.psychic,
  '2': typePalettes.grass,
  '3': typePalettes.water,
  '4': typePalettes.fire,
  '5': typePalettes.dark,
}

function getCausePalette(cause: string, index: number): TypePalette {
  const text = cause.toLocaleLowerCase('pt-BR')

  if (/servidor aceitou|aceitou a mudança|mudança indicada|recurso criado|operação concluída/.test(text)) return typePalettes.grass
  if (/cliente|expect|solicita/.test(text)) return typePalettes.fairy
  if (/criad|concluíd|disponível|recurso/.test(text)) return typePalettes.grass
  if (/redirecion|localização|endereço/.test(text)) return typePalettes.water
  if (/timeout|conexão|rede|interrompid/.test(text)) return typePalettes.electric
  if (/permiss|autentica|proib|segurança|credencial/.test(text)) return typePalettes.dark
  if (/cache|condicional|cópia|temporár/.test(text)) return typePalettes.ice
  if (/erro|falha|inválid|incorret|recus|limite/.test(text)) return typePalettes.fire
  if (/process|operaç|aguard|demor|ainda/.test(text)) return typePalettes.psychic

  const palettes = Object.values(typePalettes)
  return palettes[(index + text.length) % palettes.length]
}

const rfc9110Statuses = new Set([
  100, 101, 103, 200, 201, 202, 203, 204, 205, 206, 300, 301, 302, 303, 304, 305, 307, 308,
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417,
  418, 421, 422, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
])

function SectionHeading({ id, children, accent = true }: { id?: string; children: ReactNode; accent?: boolean }) {
  return (
    <h2 id={id} className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-[#123e79]">
      {accent && <span aria-hidden="true" className="h-6 w-1 shrink-0 rounded-full bg-[#ed4b59]" />}
      {children}
    </h2>
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
          <p className="mt-4 max-w-xl text-base leading-7 text-black">Ainda não temos esse código por aqui.</p>
          <Link className="mt-8 rounded-full bg-[#1769b0] px-6 py-3 font-semibold text-white transition hover:bg-[#12548f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769b0]" to="/">
            Voltar ao início
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const currentIndex = httpStatuses.findIndex((item) => item.code === status.code)
  const previousStatus = httpStatuses[currentIndex - 1]
  const nextStatus = httpStatuses[currentIndex + 1]
  const statusPalette = categoryTypePalette[String(status.code).charAt(0) as keyof typeof categoryTypePalette] ?? typePalettes.water
  const isRfcStatus = rfc9110Statuses.has(status.code) || [102, 207, 208, 226, 423, 424].includes(status.code)
  const specificationUrl = !isRfcStatus
    ? 'https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml'
    : status.code === 208
      ? 'https://www.rfc-editor.org/rfc/rfc5842'
      : status.code === 226
        ? 'https://www.rfc-editor.org/rfc/rfc3229'
        : [102, 207, 423, 424].includes(status.code)
          ? 'https://www.rfc-editor.org/rfc/rfc4918'
          : `https://www.rfc-editor.org/rfc/rfc9110#status.${status.code}`
  const sourceUrl = isRfcStatus
    ? `https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/${status.code}`
    : 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status'

  return (
    <div className="min-h-screen bg-[repeating-linear-gradient(135deg,#f5f7fa_0px,#f5f7fa_18px,#ffffff_18px,#ffffff_36px)] text-[#17263b]">
      <nav aria-label="Navegação entre status" className="bg-[#123e79] text-white">
        <div className="mx-auto grid min-h-24 max-w-6xl grid-cols-2">
          {previousStatus ? (
            <Link className="group flex min-w-0 items-center gap-3 border-r border-white/60 px-3 py-3 transition hover:bg-white/10 sm:px-8" to={`/status/${previousStatus.code}`}>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#123e79] transition group-hover:bg-[#eaf3ff]"><FiArrowLeft aria-hidden="true" className="size-4" /></span>
              <span className="min-w-0"><span className="block text-[10px] text-white/75 sm:text-xs">Status anterior</span><span className="block truncate text-xs font-semibold sm:text-sm"><b className="mr-1">{previousStatus.code}</b>{previousStatus.name}</span></span>
            </Link>
          ) : <span aria-hidden="true" className="border-r border-white/60" />}
          {nextStatus ? (
            <Link className="group flex min-w-0 items-center justify-end gap-3 px-3 py-3 text-right transition hover:bg-white/10 sm:px-8" to={`/status/${nextStatus.code}`}>
              <span className="min-w-0"><span className="block text-[10px] text-white/75 sm:text-xs">Próximo status</span><span className="block truncate text-xs font-semibold sm:text-sm"><b className="mr-1">{nextStatus.code}</b>{nextStatus.name}</span></span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#123e79] transition group-hover:bg-[#eaf3ff]"><FiArrowRight aria-hidden="true" className="size-4" /></span>
            </Link>
          ) : <span aria-hidden="true" />}
        </div>
      </nav>

      <main className="relative z-10 mx-auto -mt-5 max-w-6xl rounded-t-3xl bg-white shadow-[0_16px_60px_rgba(18,62,121,0.08)]">

        <header className="px-4 pb-4 pt-4 sm:px-8 lg:relative lg:h-28">
          <Link className="relative z-20 inline-flex items-center gap-1.5 justify-self-start text-xs font-semibold text-[#123e79] transition hover:text-[#0b63b6]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/">
            <FiArrowLeft aria-hidden="true" className="size-4 text-[#123e79]" />
            Voltar para todos os status
          </Link>
          <h1 className={`mt-1 flex flex-wrap items-baseline justify-center gap-x-3 break-words text-center text-3xl font-semibold tracking-tight text-[#17263b] lg:absolute lg:inset-x-0 lg:top-5 lg:mt-0 lg:px-32 ${status.name.length > 22 ? 'lg:text-4xl' : 'lg:text-5xl'}`}>
            <span>{status.name}</span><span className="text-slate-500">Nº <span style={{ color: statusPalette.color }}>{status.code}</span></span>
          </h1>
        </header>

        <div className="px-4 pb-10 sm:px-8 sm:pb-14">
          <section aria-label={`${status.code} ${status.name}`} className="grid min-w-0 items-start gap-6 md:grid-cols-2 md:gap-8">
            <figure className="w-full min-w-0 rounded-3xl border border-[#dce6f3] bg-white p-3 shadow-[0_14px_36px_rgba(18,62,121,0.10)] sm:p-4">
              <CardsPokemon key={status.code} alt={status.mediaDescription} media={status.media} mediaType={status.mediaType} />
              <figcaption className="px-1 pt-2 text-sm text-[#55708f]">{status.mediaDescription}</figcaption>
            </figure>

            <div className="min-w-0 pt-1">
              <p className="mb-3 text-base font-medium" style={{ color: statusPalette.color }}>{status.categoryRange} · {status.categoryLabel}</p>
              <p className="break-words text-lg leading-8 text-black sm:text-xl">{status.description}</p>

              <section aria-labelledby="meaning-title" className="mt-10 rounded-md bg-[#0872c9] p-5 text-white shadow-[0_12px_30px_rgba(18,62,121,0.16)] sm:mt-14 sm:p-6">
                <SectionHeading accent={false} id="meaning-title"><span className="text-white">Significado</span></SectionHeading>
                <p className="text-base leading-7 text-white sm:text-lg">{status.meaning}</p>
                <div className="mt-5 border-t border-white/40 pt-4">
                  <SectionHeading accent={false}><span className="text-white">Status relacionados</span></SectionHeading>
                  <ul className="grid gap-2 sm:grid-cols-3">
                    {status.relatedStatuses.map((related) => {
                      const relatedPalette = categoryTypePalette[String(related.code).charAt(0) as keyof typeof categoryTypePalette] ?? typePalettes.water
                      return (
                        <li key={related.code}>
                          <Link className="group flex min-h-16 items-center justify-between gap-2 rounded-md border border-white/70 bg-white px-3 py-2.5 text-[#123e79] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f0f7ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" to={`/status/${related.code}`}>
                            <span className="min-w-0"><span className="block text-lg font-extrabold leading-5" style={{ color: relatedPalette.color }}>{related.code}</span><span className="block truncate text-xs font-medium text-[#123e79]">{related.name}</span></span>
                            <FiArrowRight aria-hidden="true" className="size-4 shrink-0 text-[#123e79] transition group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </section>

              <section aria-labelledby="causes-title" className="mt-6">
                <SectionHeading id="causes-title">Causas comuns</SectionHeading>
                <ul className="flex flex-wrap gap-2">
                  {status.commonCauses.map((cause, index) => {
                    const causePalette = getCausePalette(cause, index)
                    return (
                      <li className="rounded-[3px] px-3 py-2 text-sm font-medium leading-5 shadow-sm" key={cause} style={{ backgroundColor: causePalette.background, border: `1px solid ${causePalette.border}`, color: causePalette.foreground ?? causePalette.color }}>
                        {cause}
                      </li>
                    )
                  })}
                </ul>
              </section>
            </div>
          </section>

          <section aria-label="Detalhes do status" className="mt-8 grid min-w-0 gap-5 border-t border-[#b8d7f7] pt-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 sm:pt-5">
            <section className="min-w-0 sm:border-r sm:border-[#b8d7f7] sm:pr-6">
              <SectionHeading>Por que esse GIF?</SectionHeading>
              <p className="rounded-md bg-[#eef5ff] px-4 py-3 leading-7 text-black">{status.mediaReason}</p>
            </section>

            <section className="min-w-0">
              <SectionHeading>Exemplo</SectionHeading>
              <pre className="max-w-full overflow-x-auto rounded-md bg-[#17263b] px-4 py-5 text-sm leading-6 text-[#f4f8ff] sm:text-base"><code>{status.example}</code></pre>
            </section>
          </section>

          {status.resolutionSteps && <ResolutionGuide steps={status.resolutionSteps} />}

          <section aria-labelledby="references-title" className="mt-4 border-t border-[#b8d7f7] pt-6 sm:mt-5 sm:pt-7">
            <SectionHeading id="references-title">Consulte também</SectionHeading>
            <ul className="space-y-1.5">
              <li>
                <a className="group flex items-center gap-3 rounded-md bg-[#f2f7fd] px-3 py-2.5 text-[#123e79] transition hover:bg-[#e6f1fc]" href={specificationUrl} rel="noreferrer" target="_blank">
                  <FiExternalLink aria-hidden="true" className="size-5 shrink-0 text-[#123e79]" />
                  <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#123e79]">{isRfcStatus ? `RFC ${status.code === 102 || [207, 423, 424].includes(status.code) ? '4918' : status.code === 208 ? '5842' : status.code === 226 ? '3229' : '9110'}` : 'Registro de códigos HTTP · IANA'}</span><span className="block text-xs leading-5 text-black">{isRfcStatus ? `Especificação do status ${status.code} ${status.name}.` : 'Registro oficial dos códigos HTTP.'}</span></span>
                  <FiArrowRight aria-hidden="true" className="size-4 shrink-0 text-[#123e79] transition group-hover:translate-x-0.5" />
                </a>
              </li>
              {status.code === 100 && (
                <li>
                  <a className="group flex items-center gap-3 rounded-md bg-[#f2f7fd] px-3 py-2.5 text-[#123e79] transition hover:bg-[#e6f1fc]" href="https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Expect" rel="noreferrer" target="_blank">
                    <FiExternalLink aria-hidden="true" className="size-5 shrink-0 text-[#123e79]" />
                    <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#123e79]">Cabeçalho Expect</span><span className="block text-xs leading-5 text-black">Usado para aguardar 100 Continue antes de enviar o corpo.</span></span>
                    <FiArrowRight aria-hidden="true" className="size-4 shrink-0 text-[#123e79] transition group-hover:translate-x-0.5" />
                  </a>
                </li>
              )}
              <li>
                <a className="group flex items-center gap-3 rounded-md bg-[#f2f7fd] px-3 py-2.5 text-[#123e79] transition hover:bg-[#e6f1fc]" href={sourceUrl} rel="noreferrer" target="_blank">
                  <FiExternalLink aria-hidden="true" className="size-5 shrink-0 text-[#123e79]" />
                  <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#123e79]">{isRfcStatus ? `MDN · HTTP ${status.code} ${status.name}` : 'MDN · Códigos de status HTTP'}</span><span className="block text-xs leading-5 text-black">Documentação e exemplos práticos.</span></span>
                  <FiArrowRight aria-hidden="true" className="size-4 shrink-0 text-[#123e79] transition group-hover:translate-x-0.5" />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
