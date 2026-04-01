import { useRef, useMemo, useState, useEffect } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { motion, AnimatePresence } from 'framer-motion'
import PromptCard from './PromptCard'
import type { Prompt } from '@/types'

/**
 * Below this count, render a regular animated grid.
 * Above it, switch to windowed rendering to keep the DOM lean.
 */
const VIRTUALIZATION_THRESHOLD = 30

/** Estimated card height + gap — virtualizer refines this with measureElement */
const ROW_HEIGHT_ESTIMATE = 220
const GAP = 16 // gap-4

// --- Responsive column count ------------------------------------------

function getColumnCount(): number {
  if (typeof window === 'undefined') return 1
  if (window.matchMedia('(min-width: 1024px)').matches) return 3
  if (window.matchMedia('(min-width: 640px)').matches) return 2
  return 1
}

function useColumnCount(): number {
  const [count, setCount] = useState(getColumnCount)

  useEffect(() => {
    const mq1 = window.matchMedia('(min-width: 1024px)')
    const mq2 = window.matchMedia('(min-width: 640px)')
    const update = () => setCount(getColumnCount())
    mq1.addEventListener('change', update)
    mq2.addEventListener('change', update)
    return () => {
      mq1.removeEventListener('change', update)
      mq2.removeEventListener('change', update)
    }
  }, [])

  return count
}

// --- Component --------------------------------------------------------

interface Props {
  prompts: Prompt[]
}

export default function VirtualPromptGrid({ prompts }: Props) {
  const columnCount = useColumnCount()
  const listRef = useRef<HTMLDivElement>(null)

  // Group flat prompt list into rows based on current column count
  const rows = useMemo<Prompt[][]>(() => {
    const result: Prompt[][] = []
    for (let i = 0; i < prompts.length; i += columnCount) {
      result.push(prompts.slice(i, i + columnCount))
    }
    return result
  }, [prompts, columnCount])

  const rowVirtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => ROW_HEIGHT_ESTIMATE + GAP,
    overscan: 3,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  })

  // --- Regular grid for small datasets (keeps Framer Motion animations)
  if (prompts.length <= VIRTUALIZATION_THRESHOLD) {
    return (
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {prompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </motion.div>
      </AnimatePresence>
    )
  }

  // --- Windowed grid for large datasets
  const virtualItems = rowVirtualizer.getVirtualItems()

  return (
    <div ref={listRef}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualItems.map(virtualRow => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
              paddingBottom: `${GAP}px`,
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rows[virtualRow.index].map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
