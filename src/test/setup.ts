import '@testing-library/jest-dom'
import { afterEach } from 'vitest'

// Clean localStorage between tests to prevent persist middleware bleed
afterEach(() => {
  localStorage.clear()
})
