import { CATEGORIES } from '@/data/prompts'
import { useLangStore } from '@/stores/langStore'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const lang = useLangStore((s) => s.lang)

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {CATEGORIES.map(cat => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={cn(
            'px-3 py-1.5 rounded-md text-xs font-medium transition-colors border cursor-pointer',
            selected === cat.value
              ? 'bg-zinc-100 text-zinc-900 border-transparent'
              : 'bg-transparent text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700'
          )}
        >
          {lang === 'es' ? cat.label : cat.labelEn}
        </button>
      ))}
    </div>
  )
}
