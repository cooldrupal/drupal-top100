// components/LoadingOverlay.tsx

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [searchParams])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-lg">Updating...</span>
        </div>
      </div>
    </div>
  )
}
