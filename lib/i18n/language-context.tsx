"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, defaultLanguage, getTranslation } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  availableLanguages: { code: Language; name: string; flag: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const availableLanguages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  { code: 'kk' as Language, name: 'Қазақша', flag: '🇰🇿' }
]

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  useEffect(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return getTranslation(language, key)
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    availableLanguages
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
