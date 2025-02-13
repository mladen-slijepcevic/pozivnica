'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

const EVENT_DETAILS = {
  title: 'Jovanka & Mladen Wedding',
  description: 'Join us in celebrating our special day!',
  location: 'Restaurant Verde, Belgrade',
  startDate: '2025-05-31T14:15:00',
  endDate: '2025-05-31T23:00:00'
};

export function CalendarButtons() {
  const { t } = useTranslation();

  const addToGoogleCalendar = () => {
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', EVENT_DETAILS.title);
    url.searchParams.append('dates', 
      EVENT_DETAILS.startDate.replace(/[-:]/g, '') + '/' + 
      EVENT_DETAILS.endDate.replace(/[-:]/g, '')
    );
    url.searchParams.append('details', EVENT_DETAILS.description);
    url.searchParams.append('location', EVENT_DETAILS.location);
    
    window.open(url.toString(), '_blank');
  };

  const addToAppleCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${EVENT_DETAILS.startDate.replace(/[-:]/g, '')}
DTEND:${EVENT_DETAILS.endDate.replace(/[-:]/g, '')}
SUMMARY:${EVENT_DETAILS.title}
DESCRIPTION:${EVENT_DETAILS.description}
LOCATION:${EVENT_DETAILS.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <button
        onClick={addToGoogleCalendar}
        className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/80"
      >
        {t('addToGoogle')}
      </button>
      <button
        onClick={addToAppleCalendar}
        className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/80"
      >
        {t('addToApple')}
      </button>
    </motion.div>
  );
}
