import { useTranslation } from '@/hooks/useTranslation'

export const CalendarButtons = () => {
  const { t } = useTranslation()
  
  const eventDetails = {
    title: 'Jovanka & Mladen Wedding',
    description: 'Wedding celebration',
    location: 'Verde Restaurant, Belgrade',
    startDate: '2025-05-31T14:15:00',
    endDate: '2025-05-31T23:00:00',
  }

  const addToGoogleCalendar = () => {
    const url = new URL('https://calendar.google.com/calendar/render')
    url.searchParams.append('action', 'TEMPLATE')
    url.searchParams.append('text', eventDetails.title)
    url.searchParams.append('dates', 
      eventDetails.startDate.replace(/[-:]/g, '') + '/' + 
      eventDetails.endDate.replace(/[-:]/g, '')
    )
    url.searchParams.append('details', eventDetails.description)
    url.searchParams.append('location', eventDetails.location)
    
    window.open(url.toString(), '_blank')
  }

  const addToAppleCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDetails.startDate}
DTEND:${eventDetails.endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'wedding.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex gap-4 justify-center">
      <button
        onClick={addToGoogleCalendar}
        className="calendar-btn"
      >
        {t('calendar.google')}
      </button>
      <button
        onClick={addToAppleCalendar}
        className="calendar-btn"
      >
        {t('calendar.apple')}
      </button>
    </div>
  )
}