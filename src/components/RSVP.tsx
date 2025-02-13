import { useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { useTranslation } from '@/hooks/useTranslation'

const rsvpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  attending: z.boolean(),
  guests: z.number().min(0).max(4),
})

export const RSVP = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: null,
    guests: 0,
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const validated = rsvpSchema.parse(formData)
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        body: JSON.stringify(validated),
      })
      
      if (!response.ok) throw new Error('Failed to submit')
      
      // Show success message
      setShowSuccess(true)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <h2 className="text-3xl text-center mb-10">{t('rsvp.title')}</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        {/* Form fields */}
      </form>
    </motion.section>
  )
}