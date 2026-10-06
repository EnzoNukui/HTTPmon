import { FiChevronRight, FiGitBranch, FiLink, FiSearch } from 'react-icons/fi'
import type { ResolutionStep } from '../../types/types'

type ResolutionGuideProps = {
  steps: ResolutionStep[]
}

const stepIcons = [FiLink, FiGitBranch, FiSearch]

export default function ResolutionGuide({ steps }: ResolutionGuideProps) {
  if (steps.length === 0) return null

  return (
    <section aria-labelledby="resolution-guide-title" className="relative isolate mt-8 overflow-hidden rounded-2xl bg-[#102f5d] p-5 text-white shadow-[0_14px_36px_rgba(18,62,121,0.16)] sm:mt-10 sm:p-7">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:repeating-linear-gradient(135deg,transparent_0,transparent_26px,rgba(255,255,255,0.08)_26px,rgba(255,255,255,0.08)_48px)]" />

      <div className="mb-5 flex items-center gap-3 sm:mb-6">
        <span aria-hidden="true" className="h-7 w-1 rounded-full bg-[#6ec6ff]" />
        <div>
          <h2 id="resolution-guide-title" className="text-sm font-extrabold uppercase tracking-[0.14em] text-white sm:text-base">Como resolver</h2>
          <p className="mt-1 text-sm text-[#c7def7]">Siga estes passos para investigar o problema.</p>
        </div>
      </div>

      <ol className="grid gap-6 md:grid-cols-3 md:gap-8">
        {steps.map((step, index) => {
          const StepIcon = stepIcons[index % stepIcons.length]

          return (
            <li className="relative min-w-0 list-none rounded-xl border border-white/15 bg-[#17477f] p-4 shadow-sm sm:p-5" key={`${step.title}-${index}`}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-[#0872c9] text-lg font-extrabold text-white ring-4 ring-white/10">{index + 1}</span>
                <StepIcon aria-hidden="true" className="size-6 text-[#a9dcff]" />
              </div>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#d4e7fa]">{step.description}</p>
              {index < steps.length - 1 && (
                <FiChevronRight aria-hidden="true" className="absolute -bottom-6 left-1/2 size-6 -translate-x-1/2 rotate-90 text-[#8bd0ff] md:-right-7 md:-bottom-auto md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:rotate-0" />
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
