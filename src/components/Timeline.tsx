'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const EVENTS = [
  {
    time: '14:15',
    title: 'Church Wedding',
    venue: 'Crkva svetog Kneza Lazara - Lazarica',
    location: { lat: 44.80268297107085, lng: 20.491818476815233 },
    mapsUrl: 'https://goo.gl/maps/YOUR_CHURCH_LINK'
  },
  {
    time: '16:00',
    title: 'Reception',
    venue: 'Restaurant Verde',
    location: { lat: 44.86473757107052, lng: 20.47429047711282 },
    mapsUrl: 'https://goo.gl/maps/YOUR_RESTAURANT_LINK'
  }
];

export function Timeline() {
  const { t } = useTranslation();
  const [selectedVenue, setSelectedVenue] = useState(EVENTS[0]);

  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center mb-8 font-serif">{t('agenda')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {EVENTS.map((event, index) => (
              <motion.div
                key={event.time}
                className="p-4 bg-white/80 rounded-lg cursor-pointer"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedVenue(event)}
              >
                <div className="text-xl font-bold">{event.time}</div>
                <div>{event.title}</div>
                <div className="text-sm">{event.venue}</div>
                <a 
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {t('openInMaps')}
                </a>
              </motion.div>
            ))}
          </div>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${selectedVenue.location.lat},${selectedVenue.location.lng}`}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
