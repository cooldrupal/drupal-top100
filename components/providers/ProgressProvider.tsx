'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Конфигурация NProgress
NProgress.configure({ showSpinner: false })

function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Завершаем прогресс при изменении маршрута
    NProgress.done()
  }, [pathname, searchParams])

  useEffect(() => {
    // Перехватываем клики по ссылкам для запуска прогресса
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      if (link && link.href && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:')) {
        const url = new URL(link.href)
        const currentUrl = new URL(window.location.href)

        // Запускаем прогресс только для внутренних ссылок
        if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
          NProgress.start()
        }
      }
    }

    document.addEventListener('click', handleLinkClick)

    return () => {
      document.removeEventListener('click', handleLinkClick)
    }
  }, [])

  return null
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavigationProgress />
    </>
  )
}
