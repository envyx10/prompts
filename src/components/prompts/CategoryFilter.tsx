import { motion } from 'framer-motion'
import { CATEGORIES } from '@/data/prompts'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
  langFilter: 'all' | 'es' | 'en'
  onLangFilter: (lang: 'all' | 'es' | 'en') => void
}

const LANG_OPTIONS: Array<{ value: 'all' | 'es' | 'en'; label: string }> = [
  { value: 'all', label: 'Todos los idiomas' },
  { value: 'es', label: '🇪🇸 Español' },
  { value: 'en', label: '🇺🇸 English' },
]

export default function CategoryFilter({ selected, onSelect, langFilter, onLangFilter }: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Language filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {LANG_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onLangFilter(opt.value)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer',
              langFilter === opt.value
                ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            whileTap={{ scale: 0.96 }}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer',
              selected === cat.value
                ? 'bg-zinc-100 text-zinc-900 border-zinc-100 shadow-md'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
            )}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
