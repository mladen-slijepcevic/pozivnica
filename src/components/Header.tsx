import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

export const Header = () => {
  const { t, locale, setLocale } = useTranslation()
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-screen flex items-center justify-center"
    >
      <div className="absolute top-4 right-4 space-x-2">
        <button 
          onClick={() => setLocale('sr')}
          className={locale === 'sr' ? 'active' : ''}
        >
          SR
        </button>
        <span>|</span>
        <button 
          onClick={() => setLocale('en')}
          className={locale === 'en' ? 'active' : ''}
        >
          EN
        </button>
      </div>
      
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-cormorant"
        >
          Jovanka & Mladen
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {t('date')}
        </motion.p>
      </div>
    </motion.header>
  )
}