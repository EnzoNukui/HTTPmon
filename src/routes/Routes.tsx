import { useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import HomePage from '../pages/Home'
import StatusPage from '../pages/Status'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo(0, 0)
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
