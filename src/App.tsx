import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '@/components/layout/Header'
import Home from '@/pages/Home'
import Library from '@/pages/Library'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabase'

export default function App() {
  const setSession = useAuthStore((s) => s.setSession)

  useEffect(() => {
    // onAuthStateChange fires INITIAL_SESSION on mount — no need for getSession().
    // A separate getSession() call races against it and causes double renders.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [setSession])

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          {/* Catch-all: unknown routes redirect home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
