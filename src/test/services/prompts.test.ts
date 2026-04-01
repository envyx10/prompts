import { describe, it, expect } from 'vitest'
import { filterPrompts, filterSavedPrompts } from '@/services/prompts'
import { SAMPLE_PROMPTS } from '@/data/prompts'

// ---------------------------------------------------------------------------
// filterPrompts
// ---------------------------------------------------------------------------
describe('filterPrompts', () => {
  it('returns all prompts with no filters', () => {
    expect(filterPrompts()).toHaveLength(SAMPLE_PROMPTS.length)
  })

  it('returns all prompts with empty filter values', () => {
    expect(filterPrompts({ search: '', category: 'all' }))
      .toHaveLength(SAMPLE_PROMPTS.length)
  })

  // --- search (bilingual) ---
  it('matches by Spanish title', () => {
    const result = filterPrompts({ search: 'revisión' })
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p =>
      expect(
        p.title.es.toLowerCase().includes('revisión') ||
        p.description.es.toLowerCase().includes('revisión') ||
        p.content.es.toLowerCase().includes('revisión')
      ).toBe(true)
    )
  })

  it('matches by English title', () => {
    const result = filterPrompts({ search: 'code review' })
    expect(result.length).toBeGreaterThan(0)
  })

  it('finds the same prompt regardless of search language', () => {
    const es = filterPrompts({ search: 'revisión de código' })
    const en = filterPrompts({ search: 'code review' })
    const esIds = new Set(es.map(p => p.id))
    const enIds = new Set(en.map(p => p.id))
    // At least one prompt in common (the code review prompt)
    const overlap = [...esIds].filter(id => enIds.has(id))
    expect(overlap.length).toBeGreaterThan(0)
  })

  it('matches by tag (language-neutral)', () => {
    const result = filterPrompts({ search: 'SQL' })
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => expect(p.tags.some(t => t.toLowerCase().includes('sql'))).toBe(true))
  })

  it('returns empty array when no matches exist', () => {
    expect(filterPrompts({ search: 'xyzzy_no_match_99999' })).toHaveLength(0)
  })

  // --- category ---
  it('filters by category — only matching prompts returned', () => {
    const result = filterPrompts({ category: 'coding' })
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => expect(p.category).toBe('coding'))
  })

  it('"all" category returns everything', () => {
    expect(filterPrompts({ category: 'all' })).toHaveLength(SAMPLE_PROMPTS.length)
  })

  it('unknown category returns empty array', () => {
    expect(filterPrompts({ category: 'does_not_exist' })).toHaveLength(0)
  })

  // --- combined ---
  it('applies search + category together', () => {
    const result = filterPrompts({ search: 'debug', category: 'coding' })
    result.forEach(p => {
      expect(p.category).toBe('coding')
      const q = 'debug'
      expect(
        p.title.es.toLowerCase().includes(q) ||
        p.title.en.toLowerCase().includes(q) ||
        p.content.es.toLowerCase().includes(q) ||
        p.content.en.toLowerCase().includes(q)
      ).toBe(true)
    })
  })

  // --- data shape ---
  it('all prompts have bilingual title, description, and content', () => {
    SAMPLE_PROMPTS.forEach(p => {
      expect(typeof p.title.es).toBe('string')
      expect(typeof p.title.en).toBe('string')
      expect(typeof p.description.es).toBe('string')
      expect(typeof p.description.en).toBe('string')
      expect(typeof p.content.es).toBe('string')
      expect(typeof p.content.en).toBe('string')
      expect(p.title.es.length).toBeGreaterThan(0)
      expect(p.title.en.length).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// filterSavedPrompts
// ---------------------------------------------------------------------------
describe('filterSavedPrompts', () => {
  it('returns empty array for empty Set', () => {
    expect(filterSavedPrompts(new Set())).toHaveLength(0)
  })

  it('returns only prompts whose ids are in the set', () => {
    const ids = new Set(['1', '2'])
    const result = filterSavedPrompts(ids)
    expect(result.length).toBe(2)
    result.forEach(p => expect(ids.has(p.id)).toBe(true))
  })

  it('ignores ids not present in SAMPLE_PROMPTS', () => {
    const result = filterSavedPrompts(new Set(['1', 'fake-9999']))
    expect(result.length).toBe(1)
    expect(result[0].id).toBe('1')
  })

  it('applies bilingual search within saved prompts', () => {
    const ids = new Set(SAMPLE_PROMPTS.map(p => p.id))
    const esResult = filterSavedPrompts(ids, 'email')
    const enResult = filterSavedPrompts(ids, 'email')
    expect(esResult.length).toBeGreaterThan(0)
    expect(enResult.length).toBeGreaterThan(0)
  })

  it('returns empty when search matches nothing in saved set', () => {
    expect(filterSavedPrompts(new Set(['1']), 'xyzzy_nomatch')).toHaveLength(0)
  })
})
