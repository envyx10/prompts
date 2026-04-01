import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import CategoryFilter from '@/components/prompts/CategoryFilter'
import VirtualPromptGrid from '@/components/prompts/VirtualPromptGrid'
import { useLangStore } from '@/stores/langStore'
import { useAuthStore, selectUser } from '@/stores/authStore'
import { filterPrompts } from '@/services/prompts'
import { Button } from '@/components/ui/button'
import { SAMPLE_PROMPTS } from '@/data/prompts'

// ── Static stats derived from data ────────────────────────────────────────
const TOTAL_PROMPTS    = SAMPLE_PROMPTS.length
const TOTAL_CATEGORIES = new Set(SAMPLE_PROMPTS.map(p => p.category)).size

const heroVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.09 } },
}
const itemVariants = {
  hidden:   { opacity: 0, y: 14 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function Home() {
  const [category, setCategory] = useState('all')
  const lang    = useLangStore((s) => s.lang)
  const user    = useAuthStore(selectUser)
  const openLogin = useAuthStore((s) => s.openLoginModal)

  const filtered = useMemo(
    () => filterPrompts({ category }),
    [category]
  )

  const t = {
    h1a:       lang === 'es' ? 'La librería de prompts'         : 'The prompt library',
    h1b:       lang === 'es' ? 'que necesitas.'                 : 'you actually need.',
    sub:       lang === 'es'
      ? 'Prompts organizados por categoría, listos para copiar en cualquier idioma. Guarda los que usas y tenlos siempre a mano.'
      : 'Prompts organized by category, ready to copy in any language. Save the ones you use and have them always at hand.',
    cta:       lang === 'es' ? 'Crear mi librería'              : 'Create my library',
    browse:    lang === 'es' ? 'Ver prompts'                    : 'Browse prompts',
    statA:     lang === 'es' ? 'Prompts'                        : 'Prompts',
    statB:     lang === 'es' ? 'Idiomas'                        : 'Languages',
    statC:     lang === 'es' ? 'Categorías'                     : 'Categories',
    results:   (n: number) => lang === 'es'
      ? `${n} prompt${n !== 1 ? 's' : ''}`
      : `${n} prompt${n !== 1 ? 's' : ''}`,
    noResults: lang === 'es' ? 'Sin resultados'                 : 'No results',
    noResultsSub: lang === 'es'
      ? 'Selecciona otra categoría'
      : 'Select a different category',
  }

  const scrollToPrompts = () =>
    document.getElementById('prompts')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <TooltipProvider>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative border-b border-zinc-800/50 overflow-hidden" style={{ minHeight: 'calc(100vh - 56px)' }}>

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #3f3f46 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
            opacity: 0.35,
          }}
        />

        {/* Top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />

        {/* Radial glow behind headline */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 65%)' }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
          <motion.div variants={heroVariants} initial="hidden" animate="visible">

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.06] mb-8"
            >
              <span className="text-zinc-100">{t.h1a}</span>
              <br />
              <span className="bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700 bg-clip-text text-transparent">
                {t.h1b}
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={itemVariants} className="text-zinc-500 text-base leading-relaxed max-w-lg mx-auto mb-12">
              {t.sub}
            </motion.p>

            {/* CTA — only visible when logged out */}
            {!user && (
              <motion.div variants={itemVariants} className="flex items-center justify-center gap-5 mb-16">
                <Button onClick={openLogin} size="lg" className="text-sm h-10 px-6">
                  {t.cta}
                </Button>
                <button
                  onClick={scrollToPrompts}
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {t.browse} →
                </button>
              </motion.div>
            )}

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-10">
              <div className="text-center">
                <p className="text-3xl font-bold text-zinc-100 tabular-nums">{TOTAL_PROMPTS}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{t.statA}</p>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div className="text-center">
                <p className="text-3xl font-bold text-zinc-100">2</p>
                <p className="text-xs text-zinc-600 mt-0.5">{t.statB}</p>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div className="text-center">
                <p className="text-3xl font-bold text-zinc-100 tabular-nums">{TOTAL_CATEGORIES}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{t.statC}</p>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToPrompts}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
        >
          <span className="text-[10px] tracking-widest uppercase">
            {lang === 'es' ? 'Ver prompts' : 'Browse'}
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
          </motion.div>
        </motion.button>

        {/* Bottom glow line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" />
      </section>

      {/* ── Prompts grid ─────────────────────────────────────────────── */}
      <div id="prompts" className="max-w-7xl mx-auto px-6 py-10">

        {/* Category filter + count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <CategoryFilter selected={category} onSelect={setCategory} />
          <span className="text-xs text-zinc-600 tabular-nums shrink-0">
            {t.results(filtered.length)}
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <VirtualPromptGrid prompts={filtered} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-zinc-400 font-medium">{t.noResults}</p>
            <p className="text-zinc-600 text-sm mt-1">{t.noResultsSub}</p>
          </motion.div>
        )}
      </div>

    </TooltipProvider>
  )
}
