import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FiArrowUp } from 'react-icons/fi'
import { Link } from 'react-router'
import httpmonLogo from '../../assets/images/Logotipo_httpmon_transparente.png'

const statusRanges = [
  { range: '1xx', label: 'Informativos' },
  { range: '2xx', label: 'Sucesso' },
  { range: '3xx', label: 'Redirecionamentos' },
  { range: '4xx', label: 'Erros do cliente' },
  { range: '5xx', label: 'Erros do servidor' },
]

const socialItems = [
  { name: 'GitHub', href: 'https://github.com/EnzoNukui', Icon: FaGithub },
  { name: 'Instagram', href: 'https://www.instagram.com/enzo.nks/', Icon: FaInstagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/enzo-nukui/', Icon: FaLinkedinIn },
]

export default function Footer() {
  return (
    <footer className="bg-[#123e79] text-white">
      <div className="relative mx-auto flex max-w-6xl justify-center px-6 pt-8">
        <div aria-hidden="true" className="absolute inset-x-6 top-12 border-t border-white/35" />
        <button
          className="relative z-10 inline-flex items-center gap-2 rounded-full bg-[#123e79] px-5 py-2 text-sm font-semibold text-white transition hover:text-[#b8d9ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          type="button"
        >
          <FiArrowUp aria-hidden="true" className="size-5" />
          Voltar ao início
        </button>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 pb-8 pt-7 sm:grid-cols-2 sm:gap-8 sm:px-8 sm:pb-9 lg:grid-cols-3 lg:items-center lg:gap-0">
        <div className="flex min-w-0 flex-col items-center text-center">
          <img
            alt="HTTPmon"
            className="w-36 object-contain"
            height="52"
            src={httpmonLogo}
            width="144"
          />
          <p className="mt-3 max-w-xs text-center text-sm leading-6 text-white/75">
            Consulte significados, exemplos e causas comuns dos códigos de status HTTP.
          </p>
        </div>

        <nav aria-label="Categorias de status HTTP" className="min-w-0 border-t border-white/20 pt-6 text-center sm:border-t-0 sm:pt-0 lg:border-l lg:border-white/20 lg:px-6 lg:py-2">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            Explore por categoria
          </p>
          <ul className="mx-auto grid w-fit grid-cols-2 gap-x-5 gap-y-2 text-left text-sm font-medium">
            {statusRanges.map(({ range, label }) => (
              <li key={range}>
                <Link
                  className="inline-flex max-w-full flex-wrap items-baseline gap-x-2 text-white/90 transition hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  to={`/#${range}`}
                >
                  <span className="font-bold">{range}</span>
                  <span className="text-xs text-white/70">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-col items-center gap-3 border-t border-white/20 pt-6 text-center sm:col-span-2 sm:justify-self-center lg:col-span-1 lg:justify-self-stretch lg:border-l lg:border-t-0 lg:px-6 lg:py-2 lg:pt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Acompanhe o HTTPmon</p>
          <ul aria-label="Redes sociais do HTTPmon" className="flex flex-wrap justify-center gap-2 sm:justify-end">
            {socialItems.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  aria-label={`Abrir perfil de ${name} em nova aba`}
                  className="group/social flex min-w-[4.5rem] flex-col items-center gap-2 rounded-xl px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                  title={name}
                >
                  <span className="flex size-10 items-center justify-center rounded-full border border-white/35 transition group-hover/social:border-white/80 group-hover/social:bg-white/10">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-xs">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 px-6 py-4 text-center text-xs text-white/70">
        HTTPmon · Material educativo sobre códigos de status HTTP
      </div>
    </footer>
  )
}
