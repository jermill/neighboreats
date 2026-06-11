'use client'

import { createContext, useContext, useEffect } from 'react'

// NeighborEats is light-only ("Daylight" theme). The provider keeps the old
// API surface so existing imports work, but the theme can no longer change.
interface ThemeContextType {
  theme: 'light'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('theme')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
