import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '@/components/layout/Header'
import Home from '@/pages/Home'
import Library from '@/pages/Library'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabase'

export default function App() {
  const { setUser, setSession } = useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setSession])

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </main>
    </div>
  )
}
