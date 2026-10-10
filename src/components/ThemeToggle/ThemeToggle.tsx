import { useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => window.localStorage.getItem('httpmon-theme') === 'dark')
  const label = isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro'

  function toggleTheme() {
    const next = !isDarkMode
    setIsDarkMode(next)
    window.localStorage.setItem('httpmon-theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button
      aria-label={label}
      aria-pressed={isDarkMode}
      className="grid size-12 shrink-0 place-items-center rounded-full border border-[#cfe0f4] bg-white text-[#123e79] shadow-md transition hover:bg-[#eaf3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769b0] dark:border-[#555555] dark:bg-[#343434] dark:text-[#eeeeee] dark:hover:bg-[#454545] sm:flex sm:w-auto sm:justify-center sm:gap-2 sm:px-4"
      onClick={toggleTheme}
      title={label}
      type="button"
    >
      {isDarkMode ? <FiSun aria-hidden="true" className="size-6" /> : <FiMoon aria-hidden="true" className="size-6" />}
      <span className="hidden text-sm font-semibold sm:inline">{isDarkMode ? 'Tema claro' : 'Tema escuro'}</span>
    </button>
  )
}
