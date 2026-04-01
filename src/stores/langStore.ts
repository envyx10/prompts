import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Lang } from '@/types'

interface LangState {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: 'es',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'promptly-lang' }
  )
)
