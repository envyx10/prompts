/**
 * Service layer for prompt data access.
 *
 * All pages consume this interface — not the raw data import.
 * To migrate from local data to Supabase, replace the implementations
 * here without touching any page or component.
 */

import { SAMPLE_PROMPTS } from '@/data/prompts'
import type { Prompt } from '@/types'

export interface PromptFilters {
  search?: string
  category?: string
  language?: 'all' | 'es' | 'en'
}

/**
 * Returns prompts matching all active filters.
 * All string comparisons are case-insensitive.
 */
export function filterPrompts(filters: PromptFilters = {}): Prompt[] {
  const q = (filters.search ?? '').toLowerCase().trim()
  const category = filters.category ?? 'all'
  const language = filters.language ?? 'all'

  return SAMPLE_PROMPTS.filter(p => {
    if (category !== 'all' && p.category !== category) return false
    if (language !== 'all' && p.language !== language && p.language !== 'both') return false
    if (!q) return true
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  })
}

/**
 * Returns only the prompts whose IDs are in the provided set,
 * optionally narrowed by a search query.
 */
export function filterSavedPrompts(ids: Set<string>, search = ''): Prompt[] {
  const q = search.toLowerCase().trim()

  return SAMPLE_PROMPTS.filter(p => {
    if (!ids.has(p.id)) return false
    if (!q) return true
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  })
}
