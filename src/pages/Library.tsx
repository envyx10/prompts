import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Compass } from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import PromptCard from '@/components/prompts/PromptCard'
import SearchBar from '@/components/prompts/SearchBar'
import { useAuthStore } from '@/stores/authStore'
import { useLibraryStore } from '@/stores/libraryStore'
import { SAMPLE_PROMPTS } from '@/data/prompts'

export default function Library() {
  const { user, openLoginModal } = useAuthStore()
  const { savedIds } = useLibraryStore()
  const [search, setSearch] = useState('')

  const savedPrompts = useMemo(() => {
    return SAMPLE_PROMPTS.filter(p => savedIds.has(p.id)).filter(p => {
      if (!search) return true
      return (
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      )
    })
  }, [savedIds, search])

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm"
        >
          <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-zinc-600" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Tu librería personal</h2>
          <p className="text-zinc-400 mb-6">
            Inicia sesión para guardar tus prompts favoritos y acceder a ellos desde cualquier lugar.
          </p>
          <Button onClick={openLoginModal} className="w-full">
            Iniciar sesión para continuar
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-purple-400" />
              Mi Librería
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              {savedIds.size} prompt{savedIds.size !== 1 ? 's' : ''} guardado{savedIds.size !== 1 ? 's' : ''}
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Compass className="w-4 h-4" />
              Explorar más
            </Button>
          </Link>
        </div>

        {savedIds.size === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <p className="text-5xl mb-4">📚</p>
            <h3 className="text-xl font-semibold text-zinc-300 mb-2">Tu librería está vacía</h3>
            <p className="text-zinc-500 mb-6 max-w-xs">
              Guarda prompts desde la sección Explorar haciendo clic en el ícono de marcador.
            </p>
            <Link to="/">
              <Button>
                <Compass className="w-4 h-4" />
                Ir a Explorar
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6">
            <SearchBar value={search} onChange={setSearch} placeholder="Buscar en mi librería..." />
            {savedPrompts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedPrompts.map(prompt => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-500">No hay resultados para "{search}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
