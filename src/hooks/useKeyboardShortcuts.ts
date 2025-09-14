'use client'

import { useEffect, useCallback } from 'react'

export interface ShortcutConfig {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    shortcuts.forEach(shortcut => {
      const {
        key,
        ctrlKey = false,
        shiftKey = false,
        altKey = false,
        metaKey = false,
        action
      } = shortcut

      const isMatch = 
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrlKey &&
        event.shiftKey === shiftKey &&
        event.altKey === altKey &&
        event.metaKey === metaKey

      if (isMatch) {
        event.preventDefault()
        event.stopPropagation()
        action()
      }
    })
  }, [shortcuts])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}

// Predefined shortcuts for the application
export const appShortcuts: ShortcutConfig[] = [
  {
    key: 'n',
    ctrlKey: true,
    action: () => {
      // Navigate to new campaign creation
      console.log('New campaign shortcut triggered')
      // In a real app, this would navigate to the campaign creation page
    },
    description: 'Create new campaign'
  },
  {
    key: 'a',
    ctrlKey: true,
    action: () => {
      // Navigate to analytics
      console.log('Analytics shortcut triggered')
    },
    description: 'Go to analytics'
  },
  {
    key: 'c',
    ctrlKey: true,
    action: () => {
      // Navigate to campaigns
      console.log('Campaigns shortcut triggered')
    },
    description: 'Go to campaigns'
  },
  {
    key: 's',
    ctrlKey: true,
    action: () => {
      // Navigate to social platforms
      console.log('Social platforms shortcut triggered')
    },
    description: 'Go to social platforms'
  },
  {
    key: 'i',
    ctrlKey: true,
    action: () => {
      // Navigate to AI studio
      console.log('AI studio shortcut triggered')
    },
    description: 'Go to AI studio'
  },
  {
    key: '/',
    action: () => {
      // Focus search
      const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    },
    description: 'Focus search'
  },
  {
    key: 'k',
    action: () => {
      // Open keyboard shortcuts help
      console.log('Keyboard shortcuts help')
    },
    description: 'Show keyboard shortcuts'
  },
  {
    key: 'Escape',
    action: () => {
      // Close modals or dropdowns
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(escapeEvent)
    },
    description: 'Close modal/dropdown'
  }
]

// Hook for using app shortcuts
export function useAppShortcuts() {
  useKeyboardShortcuts(appShortcuts)
  return appShortcuts
}