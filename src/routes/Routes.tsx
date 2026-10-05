import { useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import ErrorPage from '../pages/Error'
import HomePage from '../pages/Home'
import StatusPage from '../pages/Status'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/status/:code" element={<StatusPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}
