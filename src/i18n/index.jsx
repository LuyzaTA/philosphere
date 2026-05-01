import { createContext, useContext, useState } from 'react'
import translations from './translations.js'

export const LanguageContext = createContext({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useT() {
  const { lang } = useContext(LanguageContext)
  return (key) => translations[lang]?.[key] ?? translations.en[key] ?? key
}

export function useLang() {
  return useContext(LanguageContext)
}
