/**
 * Service layer for prompt data access.
 * All pages consume this interface — not the raw data import.
 * To migrate to Supabase: replace these implementations without touching pages.
 */

import { SAMPLE_PROMPTS } from '@/data/prompts'
import type { Prompt } from '@/types'

export interface PromptFilters {
  search?: string
  category?: string
}

/**
 * Returns prompts matching the active filters.
 * Search is always performed across BOTH languages so users can type
 * in either language regardless of the current UI language setting.
 */
export function filterPrompts(filters: PromptFilters = {}): Prompt[] {
  const q = (filters.search ?? '').toLowerCase().trim()
  const category = filters.category ?? 'all'

  return SAMPLE_PROMPTS.filter(p => {
    if (category !== 'all' && p.category !== category) return false
    if (!q) return true
    // Search across both language variants + tags (which are language-neutral)
    return (
      p.title.es.toLowerCase().includes(q)       ||
      p.title.en.toLowerCase().includes(q)       ||
      p.description.es.toLowerCase().includes(q) ||
      p.description.en.toLowerCase().includes(q) ||
      p.content.es.toLowerCase().includes(q)     ||
      p.content.en.toLowerCase().includes(q)     ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  })
}

/**
 * Returns saved prompts, optionally narrowed by search query.
 * Search is bilingual for consistency with filterPrompts.
 */
export function filterSavedPrompts(ids: Set<string>, search = ''): Prompt[] {
  const q = search.toLowerCase().trim()

  return SAMPLE_PROMPTS.filter(p => {
    if (!ids.has(p.id)) return false
    if (!q) return true
    return (
      p.title.es.toLowerCase().includes(q)       ||
      p.title.en.toLowerCase().includes(q)       ||
      p.description.es.toLowerCase().includes(q) ||
      p.description.en.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  })
}
