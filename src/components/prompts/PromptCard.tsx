import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Copy, Check, Bookmark, BookmarkCheck,
  Code2, PenLine, Megaphone, Zap, Briefcase, Lightbulb,
  Database, GraduationCap, Palette, MoreHorizontal,
  type LucideIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuthStore, selectUser } from '@/stores/authStore'
import { useLibraryStore } from '@/stores/libraryStore'
import { useLangStore } from '@/stores/langStore'
import type { Prompt } from '@/types'
import { CATEGORIES } from '@/data/prompts'

// ── Thin Lucide icons, one per category ───────────────────────────────────
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  coding:       Code2,
  writing:      PenLine,
  marketing:    Megaphone,
  productivity: Zap,
  business:     Briefcase,
  creativity:   Lightbulb,
  data:         Database,
  education:    GraduationCap,
  design:       Palette,
  other:        MoreHorizontal,
}

const CATEGORY_LABEL_MAP = {
  es: Object.fromEntries(CATEGORIES.map(c => [c.value, c.label])),
  en: Object.fromEntries(CATEGORIES.map(c => [c.value, c.labelEn])),
}

interface PromptCardProps {
  prompt: Prompt
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const user        = useAuthStore(selectUser)
  const openLogin   = useAuthStore((s) => s.openLoginModal)
  const { toggleSaved, isSaved } = useLibraryStore()
  const lang        = useLangStore((s) => s.lang)
  const saved       = isSaved(prompt.id)

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const title         = prompt.title[lang]
  const description   = prompt.description[lang]
  const content       = prompt.content[lang]
  const categoryLabel = CATEGORY_LABEL_MAP[lang][prompt.category] ?? prompt.category
  const CategoryIcon  = CATEGORY_ICONS[prompt.category] ?? MoreHorizontal

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      toast.success(lang === 'es' ? 'Copiado al portapapeles' : 'Copied to clipboard')
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(lang === 'es' ? 'No se pudo copiar' : 'Could not copy')
    }
  }

  const handleSave = () => {
    if (!user) { openLogin(); return }
    toggleSaved(prompt.id)
    toast.success(
      saved
        ? (lang === 'es' ? 'Eliminado de tu librería' : 'Removed from library')
        : (lang === 'es' ? 'Guardado en tu librería'  : 'Saved to library')
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Card className="group h-full flex flex-col bg-zinc-950 border-zinc-800/60 hover:border-zinc-700 transition-colors duration-200">

        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-start justify-between gap-3">
            {/* Icon + title */}
            <div className="flex items-start gap-2.5 min-w-0">
              <CategoryIcon className="w-3.5 h-3.5 text-zinc-500 mt-0.5 shrink-0" strokeWidth={1.5} />
              <CardTitle className="text-sm font-medium text-zinc-200 leading-snug">
                {title}
              </CardTitle>
            </div>
            {/* Actions + badge */}
            <div className="flex items-center gap-1 shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleCopy} variant="ghost" size="icon" className="h-6 w-6">
                    {copied
                      ? <Check className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.5} />
                      : <Copy className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300" strokeWidth={1.5} />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  {lang === 'es' ? 'Copiar al portapapeles' : 'Copy to clipboard'}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleSave} variant="ghost" size="icon" className="h-6 w-6">
                    {saved
                      ? <BookmarkCheck className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.5} />
                      : <Bookmark className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  {saved
                    ? (lang === 'es' ? 'Quitar de librería' : 'Remove')
                    : (lang === 'es' ? 'Guardar'            : 'Save')
                  }
                </TooltipContent>
              </Tooltip>
              <Badge variant="outline" className="text-[10px] text-zinc-500 border-zinc-800">
                {categoryLabel}
              </Badge>
            </div>
          </div>
          <CardDescription className="text-xs text-zinc-500 mt-1.5 pl-6">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 px-4 pb-4">
          {/* Prompt preview */}
          <div className="bg-[#0d0d0f] border border-zinc-800/60 rounded-md p-3 overflow-hidden">
            <pre className="text-[11px] text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed line-clamp-4 sm:line-clamp-5 lg:line-clamp-6">
              {content}
            </pre>
          </div>

          {/* Tags */}
          {prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {prompt.tags.map(tag => (
                <span key={tag} className="text-[10px] text-zinc-600 px-1.5 py-0.5 rounded border border-zinc-800/60">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>

      </Card>
    </motion.div>
  )
}
