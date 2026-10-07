import { useState } from 'react'
import { FiCheck, FiCopy, FiMoon, FiSun } from 'react-icons/fi'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'
import httpmonLogo from '../../assets/images/Logotipo_httpmon_transparente.png'
import { httpStatuses } from '../../services/httpStatuses'

export default function HomePage() {
  const [copied, setCopied] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => window.localStorage.getItem('httpmon-theme') === 'dark')
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

  function toggleTheme() {
    const next = !isDarkMode
    setIsDarkMode(next)
    window.localStorage.setItem('httpmon-theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8fc] text-[#1c2b43] transition-colors duration-200 dark:bg-[#202020] dark:text-[#eeeeee]">
      <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-7 sm:px-8 sm:pb-16 sm:pt-12">
        <button
          aria-label={isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
          aria-pressed={isDarkMode}
          className="absolute right-4 top-5 z-10 grid size-12 place-items-center rounded-full border border-[#cfe0f4] bg-white text-[#123e79] shadow-md transition hover:bg-[#eaf3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769b0] dark:border-[#555555] dark:bg-[#343434] dark:text-[#eeeeee] dark:hover:bg-[#454545] sm:flex sm:h-12 sm:w-auto sm:justify-center sm:gap-2 sm:px-4 sm:right-8 sm:top-8"
          onClick={toggleTheme}
          title={isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
          type="button"
        >
          {isDarkMode ? <FiSun aria-hidden="true" className="size-6" /> : <FiMoon aria-hidden="true" className="size-6" />}
          <span className="hidden text-sm font-semibold sm:inline">{isDarkMode ? 'Tema claro' : 'Tema escuro'}</span>
        </button>
        <header className="text-center">
          <img alt="HTTPmon" className="mx-auto h-auto w-64 sm:w-80" src={httpmonLogo} />
          <p className="mt-5 text-base font-medium text-slate-700 dark:text-[#d0d0d0] sm:text-lg">
            Códigos de status HTTP explicados com cenas de Pokémon.
          </p>
        </header>

        <section aria-labelledby="usage-title" className="mt-9 sm:mt-14">
          <h2 id="usage-title" className="mb-3 text-base font-semibold text-slate-600 dark:text-[#d0d0d0] sm:text-lg">
            Como usar: troque <code className="font-bold text-[#174f96] dark:text-[#dedede]">[code]</code> por um código de status HTTP.
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
          <p aria-live="polite" className="mt-2 min-h-6 text-xs leading-5 text-slate-500 dark:text-[#bdbdbd] sm:text-sm">
            {copied ? 'Endereço copiado.' : 'Exemplo: /status/100 abre a página do status 100.'}
          </p>
        </section>

        {groups.map((group) => (
          <section aria-labelledby={`${group.range}-title`} className="mt-9 scroll-mt-4 sm:mt-14" id={group.range} key={group.range}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-4 dark:border-[#4a4a4a]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1769b0] dark:text-[#d5d5d5] sm:text-sm sm:tracking-[0.18em]">
                  {group.range} · {group.label}
                </p>
                <h2 id={`${group.range}-title`} className="mt-1 text-xl font-black text-[#1d2b43] dark:text-[#f1f1f1] sm:text-3xl">
                  {group.title}
                </h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-[#bdbdbd]">{group.statuses.length} status</p>
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
