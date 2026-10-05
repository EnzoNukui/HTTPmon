import { useState } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'
import httpmonLogo from '../../assets/images/Logotipo_httpmon_transparente.png'
import { httpStatuses } from '../../services/httpStatuses'

export default function HomePage() {
  const [copied, setCopied] = useState(false)
  const groups = [
    { range: '1xx', title: 'Respostas informativas', label: 'Informational' },
    { range: '2xx', title: 'Respostas bem-sucedidas', label: 'Success' },
    { range: '3xx', title: 'Redirecionamentos', label: 'Redirection' },
    { range: '4xx', title: 'Erros do cliente', label: 'Client Error' },
    { range: '5xx', title: 'Erros do servidor', label: 'Server Error' },
  ]
    .map((group) => ({
      ...group,
      statuses: httpStatuses.filter((status) => status.categoryRange === group.range),
    }))
    .filter((group) => group.statuses.length > 0)
  const usageUrl = `${window.location.origin}/status/[code]`

  async function copyUsageUrl() {
    await navigator.clipboard.writeText(usageUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8fc] text-[#1c2b43]">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-7 sm:px-8 sm:pb-16 sm:pt-12">
        <header className="text-center">
          <img alt="HTTPmon" className="mx-auto h-auto w-64 sm:w-80" src={httpmonLogo} />
          <p className="mt-5 text-base font-medium text-slate-700 sm:text-lg">
            Códigos de status HTTP explicados com cenas de Pokémon.
          </p>
        </header>

        <section aria-labelledby="usage-title" className="mt-9 sm:mt-14">
          <h2 id="usage-title" className="mb-3 text-base font-semibold text-slate-600 sm:text-lg">
            Como usar: troque <code className="font-bold text-[#174f96]">[code]</code> por um código de status HTTP.
          </h2>
          <div className="flex min-w-0 items-center justify-between gap-2 rounded-xl bg-[#202b3b] px-3 py-3 text-white sm:gap-4 sm:px-6 sm:py-5">
            <code className="min-w-0 break-all font-mono text-xs sm:text-lg">{usageUrl}</code>
            <button
              aria-label={copied ? 'Endereço copiado' : 'Copiar endereço de exemplo'}
              className="shrink-0 rounded-lg p-2 text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:p-2"
              onClick={copyUsageUrl}
              type="button"
            >
              {copied ? <FiCheck aria-hidden="true" className="size-5" /> : <FiCopy aria-hidden="true" className="size-5" />}
            </button>
          </div>
          <p aria-live="polite" className="mt-2 min-h-6 text-xs leading-5 text-slate-500 sm:text-sm">
            {copied ? 'Endereço copiado.' : 'Exemplo: /status/100 abre a página do status 100.'}
          </p>
        </section>

        {groups.map((group) => (
          <section aria-labelledby={`${group.range}-title`} className="mt-9 scroll-mt-4 sm:mt-14" id={group.range} key={group.range}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1769b0] sm:text-sm sm:tracking-[0.18em]">
                  {group.range} · {group.label}
                </p>
                <h2 id={`${group.range}-title`} className="mt-1 text-xl font-black text-[#1d2b43] sm:text-3xl">
                  {group.title}
                </h2>
              </div>
              <p className="text-sm text-slate-500">{group.statuses.length} status</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.statuses.map((status) => <Cards key={status.code} status={status} />)}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
