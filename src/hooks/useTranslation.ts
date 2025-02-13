import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { i18n } from '@/i18n/config'

export function useTranslation() {
  const router = useRouter()
  const locale = typeof window !== 'undefined' 
    ? localStorage.getItem('locale') || i18n.defaultLocale 
    : i18n.defaultLocale

  const t = useCallback((key: string) => {
    const keys = key.split('.')
    let value = i18n.translations[locale]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }, [locale])

  const setLocale = useCallback((newLocale: string) => {
    if (i18n.locales.includes(newLocale)) {
      localStorage.setItem('locale', newLocale)
      router.refresh()
    }
  }, [router])

  return { t, locale, setLocale }
}