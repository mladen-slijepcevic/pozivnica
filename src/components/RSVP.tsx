'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { submitRSVP } from '@/lib/api';

export function RSVP() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: true,
    guests: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await submitRSVP(formData);
      setMessage({ type: 'success', text: t('rsvpSuccess') });
      setFormData({ name: '', email: '', attending: true, guests: 0 });
    } catch (error) {
      setMessage({ type: 'error', text: t('rsvpError') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white/80">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl text-center mb-8 font-serif"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('rsvpTitle')}
        </motion.h2>
        <motion.form 
          className="max-w-md mx-auto space-y-6"
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <label className="block mb-2" htmlFor="name">{t('nameLabel')}</label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 rounded border"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block mb-2" htmlFor="email">{t('emailLabel')}</label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 rounded border"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <label className="block mb-2">{t('attendingLabel')}</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attending"
                  checked={formData.attending}
                  onChange={() => setFormData(prev => ({ ...prev, attending: true }))}
                  className="mr-2"
                />
                {t('yes')}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attending"
                  checked={!formData.attending}
                  onChange={() => setFormData(prev => ({ ...prev, attending: false }))}
                  className="mr-2"
                />
                {t('no')}
              </label>
            </div>
          </div>

          {formData.attending && (
            <div>
              <label className="block mb-2" htmlFor="guests">{t('guestsLabel')}</label>
              <input
                type="number"
                id="guests"
                min="0"
                max="4"
                className="w-full px-4 py-2 rounded border"
                value={formData.guests}
                onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
              />
            </div>
          )}

          {message && (
            <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? '...' : t('submit')}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
