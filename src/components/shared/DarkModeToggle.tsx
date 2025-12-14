'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-white dark:bg-dark-bg-elevated border-2 border-gray-200 dark:border-dark-border rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-gray-700 group-hover:text-brand-teal transition-colors" />
      ) : (
        <Sun className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
      )}
    </button>
  )
}
