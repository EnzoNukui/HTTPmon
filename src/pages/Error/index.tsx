import { Link } from 'react-router'
import Footer from '../../components/Footer/Footer'

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8fc] text-[#1c2b43]">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#e84855]">Página não encontrada</p>
        <h1 className="text-4xl font-black tracking-tight text-[#123e79] sm:text-5xl">404 · Not Found</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          Esse endereço não existe no HTTPmon.
        </p>
        <Link className="mt-8 rounded-full bg-[#1769b0] px-6 py-3 font-semibold text-white transition hover:bg-[#12548f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769b0]" to="/">
          Voltar ao início
        </Link>
      </main>
      <Footer />
    </div>
  )
}
