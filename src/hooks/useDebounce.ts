import { useState, useEffect } from 'react'

/**
 * Delays updating the returned value until `delay` ms have passed
 * without the input changing. Prevents firing expensive operations
 * (filtering, API calls) on every keystroke.
 */
export function useDebounce<T>(value: T, delay = 180): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
