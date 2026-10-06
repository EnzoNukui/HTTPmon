import { useLayoutEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import HomePage from '../pages/Home'
import StatusPage from '../pages/Status'

const HOME_SCROLL_STORAGE_KEY = 'httpmon-home-scroll-position'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef(pathname)

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        previousPathname.current = pathname
        return
      }
    }

    let restoreFrame = 0
    if (pathname === '/' && previousPathname.current.startsWith('/status/')) {
      const savedPosition = Number(sessionStorage.getItem(HOME_SCROLL_STORAGE_KEY))
      restoreFrame = window.requestAnimationFrame(() => {
        window.scrollTo(0, Number.isFinite(savedPosition) ? savedPosition : 0)
      })
    } else {
      window.scrollTo(0, 0)
    }

    previousPathname.current = pathname

    return () => window.cancelAnimationFrame(restoreFrame)
  }, [pathname, hash])

  return null
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/status/:code" element={<StatusPage />} />
        <Route path="*" element={<Navigate to="/status/404" replace />} />
      </Routes>
    </>
  )
}
