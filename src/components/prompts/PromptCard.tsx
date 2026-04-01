import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuthStore } from '@/stores/authStore'
import { useLibraryStore } from '@/stores/libraryStore'
import type { Prompt } from '@/types'
import { CATEGORIES } from '@/data/prompts'

const CATEGORY_ICONS: Record<string, string> = {
  coding: '💻',
  writing: '✍️',
  marketing: '📣',
  productivity: '⚡',
  business: '💼',
  creativity: '🎨',
  data: '📊',
  education: '🎓',
  design: '🖌️',
  other: '✨',
}

const LANGUAGE_LABELS: Record<string, { label: string; color: string }> = {
  es: { label: 'ES', color: 'bg-amber-500/15 text-amber-300 border-amber-500/20' },
  en: { label: 'EN', color: 'bg-blue-500/15 text-blue-300 border-blue-500/20' },
  both: { label: 'ES/EN', color: 'bg-green-500/15 text-green-300 border-green-500/20' },
}

interface PromptCardProps {
  prompt: Prompt
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { user, openLoginModal } = useAuthStore()
  const { toggleSaved, isSaved } = useLibraryStore()
  const saved = isSaved(prompt.id)

  const categoryLabel = CATEGORIES.find(c => c.value === prompt.category)?.label ?? prompt.category
  const langInfo = LANGUAGE_LABELS[prompt.language] ?? LANGUAGE_LABELS['en']

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    toast.success('¡Prompt copiado!', { description: 'Ya puedes pegarlo donde necesites.' })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    if (!user) {
      openLoginModal()
      return
    }
    toggleSaved(prompt.id)
    toast.success(saved ? 'Eliminado de tu librería' : 'Guardado en tu librería')
  }

  const previewContent = prompt.content.length > 120
    ? prompt.content.slice(0, 120) + '...'
    : prompt.content

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      layout
    >
      <Card className="group h-full flex flex-col hover:border-purple-500/40 hover:bg-zinc-900/80 transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl">{CATEGORY_ICONS[prompt.category] ?? '✨'}</span>
              <CardTitle className="text-sm leading-tight text-zinc-100 truncate">
                {prompt.title}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold border ${langInfo.color}`}>
                {langInfo.label}
              </span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                {categoryLabel}
              </Badge>
            </div>
          </div>
          <CardDescription className="text-xs mt-1">{prompt.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          <div className="relative bg-zinc-950 rounded-lg border border-zinc-800 p-3">
            <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">
              {expanded ? prompt.content : previewContent}
            </pre>
            {prompt.content.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-2 transition-colors cursor-pointer"
              >
                {expanded ? (
                  <><ChevronUp className="w-3 h-3" /> Ver menos</>
                ) : (
                  <><ChevronDown className="w-3 h-3" /> Ver completo</>
                )}
              </button>
            )}
          </div>

          {prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {prompt.tags.map(tag => (
                <span key={tag} className="text-[10px] text-zinc-500 bg-zinc-800/50 px-1.5 py-0.5 rounded border border-zinc-800">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleCopy}
                variant="default"
                size="sm"
                className="flex-1"
              >
                {copied ? (
                  <><Check className="w-3.5 h-3.5" /> Copiado</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copiar</>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copiar prompt al portapapeles</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleSave}
                variant={saved ? 'secondary' : 'outline'}
                size="icon"
                className={saved ? 'text-purple-400 border-purple-500/30' : ''}
              >
                {saved ? (
                  <BookmarkCheck className="w-4 h-4 text-purple-400" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{saved ? 'Quitar de librería' : 'Guardar en librería'}</TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
