'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check localStorage, cookies, or your auth state
    const token = localStorage.getItem('token')
    // Or: const token = document.cookie.includes('auth-token')

    if (token) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <p>Redirecting...</p>
    </div>
  )
}