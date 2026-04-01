import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp } from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import SearchBar from '@/components/prompts/SearchBar'
import CategoryFilter from '@/components/prompts/CategoryFilter'
import PromptCard from '@/components/prompts/PromptCard'
import { SAMPLE_PROMPTS } from '@/data/prompts'

export default function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [langFilter, setLangFilter] = useState<'all' | 'es' | 'en'>('all')

  const filtered = useMemo(() => {
    // Compute once per filter change — not once per prompt per field
    const q = search.toLowerCase()
    return SAMPLE_PROMPTS.filter(p => {
      const matchSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      const matchCategory = category === 'all' || p.category === category
      const matchLang = langFilter === 'all' || p.language === langFilter || p.language === 'both'
      return matchSearch && matchCategory && matchLang
    })
  }, [search, category, langFilter])

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-xs text-purple-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Prompts listos para usar
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-3 tracking-tight">
            Tu librería de{' '}
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              prompts
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Encuentra, copia y guarda los prompts que usas día a día. Sin rodeos.
          </p>
        </motion.div>

        {/* Search & filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 mb-8"
        >
          <div className="flex justify-center">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <CategoryFilter
            selected={category}
            onSelect={setCategory}
            langFilter={langFilter}
            onLangFilter={setLangFilter}
          />
        </motion.div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-4 h-4 text-zinc-500" />
          <span className="text-sm text-zinc-500">
            {filtered.length} prompt{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-zinc-400 text-lg font-medium">Sin resultados</p>
              <p className="text-zinc-600 text-sm mt-1">Prueba con otros términos o cambia los filtros</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}
