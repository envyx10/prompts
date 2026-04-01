import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Compass } from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import VirtualPromptGrid from '@/components/prompts/VirtualPromptGrid'
import { useAuthStore, selectUser } from '@/stores/authStore'
import { useLibraryStore } from '@/stores/libraryStore'
import { useLangStore } from '@/stores/langStore'
import { filterSavedPrompts } from '@/services/prompts'

export default function Library() {
  const user      = useAuthStore(selectUser)
  const openLogin = useAuthStore((s) => s.openLoginModal)
  const { savedIds } = useLibraryStore()
  const lang = useLangStore((s) => s.lang)

  const savedPrompts = useMemo(
    () => filterSavedPrompts(savedIds),
    [savedIds]
  )

  const t = {
    loginTitle: lang === 'es' ? 'Tu librería personal'          : 'Your personal library',
    loginDesc:  lang === 'es'
      ? 'Inicia sesión para guardar prompts y acceder a ellos desde cualquier lugar.'
      : 'Sign in to save prompts and access them from anywhere.',
    loginBtn:   lang === 'es' ? 'Iniciar sesión'                : 'Sign in',
    title:      lang === 'es' ? 'Mi Librería'                   : 'My Library',
    saved:      (n: number) => lang === 'es'
      ? `${n} prompt${n !== 1 ? 's' : ''} guardado${n !== 1 ? 's' : ''}`
      : `${n} saved prompt${n !== 1 ? 's' : ''}`,
    explore:    lang === 'es' ? 'Explorar'                      : 'Explore',
    emptyTitle: lang === 'es' ? 'Aún no tienes prompts guardados' : 'No saved prompts yet',
    emptyDesc:  lang === 'es'
      ? 'Guarda prompts desde Explorar haciendo clic en el marcador de cada card.'
      : 'Save prompts from Explore by clicking the bookmark icon on any card.',
    goExplore:  lang === 'es' ? 'Ir a Explorar'                 : 'Go to Explore',
  }

  // ── Logged out ─────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-xs"
        >
          <div className="w-12 h-12 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">{t.loginTitle}</h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-6">{t.loginDesc}</p>
          <Button onClick={openLogin} className="w-full">{t.loginBtn}</Button>
        </motion.div>
      </div>
    )
  }

  // ── Logged in ──────────────────────────────────────────────────────────
  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header row */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100">{t.title}</h1>
            <p className="text-xs text-zinc-500 mt-1">{t.saved(savedIds.size)}</p>
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-zinc-500">
              <Compass className="w-3.5 h-3.5" strokeWidth={1.5} />
              {t.explore}
            </Button>
          </Link>
        </div>

        {/* Empty state */}
        {savedIds.size === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-12 h-12 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-medium text-zinc-300 mb-2">{t.emptyTitle}</h3>
            <p className="text-zinc-500 text-sm mb-6 max-w-xs">{t.emptyDesc}</p>
            <Link to="/">
              <Button variant="secondary" size="sm">
                <Compass className="w-3.5 h-3.5" strokeWidth={1.5} />
                {t.goExplore}
              </Button>
            </Link>
          </motion.div>
        ) : (
          <VirtualPromptGrid prompts={savedPrompts} />
        )}

      </div>
    </TooltipProvider>
  )
}
