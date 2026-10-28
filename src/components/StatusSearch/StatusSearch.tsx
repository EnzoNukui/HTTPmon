import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { httpStatuses } from '../../services/httpStatuses'

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
}

export default function StatusSearch() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()
  const normalizedQuery = normalize(query.trim())
  const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean)
  const matches = normalizedQuery
    ? httpStatuses.filter((status) => (
      queryTerms.every((term) => normalize(
        `${status.code} ${status.name} ${status.categoryLabel} ${status.categoryRange}`,
      ).includes(term))
    )).slice(0, 6)
    : []

  function openStatus(code: number) {
    sessionStorage.setItem('httpmon-home-scroll-position', String(window.scrollY))
    setQuery('')
    setIsOpen(false)
    navigate(`/status/${code}`)
  }

  return (
    <div
      className="relative w-40 sm:w-48"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false)
      }}
    >
      <label className="sr-only" htmlFor="status-search">Buscar status por código ou nome</label>
      <div className="flex h-12 items-center rounded-full border border-[#cfe0f4] bg-white text-[#123e79] shadow-md transition focus-within:border-[#1769b0] focus-within:ring-2 focus-within:ring-[#1769b0]/20 dark:border-[#555555] dark:bg-[#343434] dark:text-[#eeeeee] dark:focus-within:border-[#b8d9ff] dark:focus-within:ring-[#b8d9ff]/20">
        <FiSearch aria-hidden="true" className="ml-4 size-4 shrink-0" />
        <input
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent px-2 text-sm text-[#1c2b43] outline-none placeholder:text-slate-500 dark:text-[#eeeeee] dark:placeholder:text-[#c0c0c0]"
          id="status-search"
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveIndex(0)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setIsOpen(false)
              return
            }

            if (event.key === 'ArrowDown' && matches.length > 0) {
              event.preventDefault()
              setIsOpen(true)
              setActiveIndex((index) => (index + 1) % matches.length)
            }

            if (event.key === 'ArrowUp' && matches.length > 0) {
              event.preventDefault()
              setIsOpen(true)
              setActiveIndex((index) => (index - 1 + matches.length) % matches.length)
            }

            if (event.key === 'Enter' && isOpen && matches.length > 0) {
              event.preventDefault()
              openStatus(matches[activeIndex]?.code ?? matches[0].code)
            }
          }}
          placeholder="Buscar status..."
          role="combobox"
          aria-expanded={isOpen && Boolean(normalizedQuery)}
          aria-controls="status-search-results"
          aria-autocomplete="list"
          aria-activedescendant={isOpen && normalizedQuery && matches.length > 0 ? `status-search-option-${matches[activeIndex]?.code}` : undefined}
          type="search"
          value={query}
        />
      </div>

      {isOpen && normalizedQuery && (
        <div
          className="absolute right-0 top-[calc(100%+0.5rem)] z-30 max-h-80 w-64 overflow-y-auto rounded-2xl border border-[#d7e4f3] bg-white p-2 shadow-xl dark:border-[#555555] dark:bg-[#303030] sm:w-72"
          id="status-search-results"
          role="listbox"
        >
          {matches.length > 0 ? matches.map((status, index) => (
            <Link
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[#eef5ff] focus-visible:bg-[#eef5ff] focus-visible:outline-none dark:hover:bg-[#444444] dark:focus-visible:bg-[#444444]"
              id={`status-search-option-${status.code}`}
              key={status.code}
              onClick={() => openStatus(status.code)}
              role="option"
              aria-selected={index === activeIndex}
              to={`/status/${status.code}`}
            >
              <span className="w-10 shrink-0 text-sm font-black text-[#1769b0] dark:text-[#b8d9ff]">{status.code}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[#1c2b43] dark:text-[#eeeeee]">{status.name}</span>
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-[#bdbdbd]">{status.categoryRange}</span>
            </Link>
          )) : (
            <p className="px-3 py-3 text-sm text-slate-600 dark:text-[#d0d0d0]">Nenhum status encontrado.</p>
          )}
        </div>
      )}
    </div>
  )
}
