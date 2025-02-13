import { useState } from 'react'
import { motion } from 'framer-motion'
import { Map } from './Map'

interface Venue {
  location: { lat: number; lng: number }
  venue: string
}

export const Timeline = () => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)

  const events = [
    {
      time: '14:15',
      title: 'Crkveno venčanje',
      venue: 'Crkva svetog Kneza Lazara - Lazarica',
      location: { lat: 44.80268297107085, lng: 20.491818476815233 }
    },
    {
      time: '16:00',
      title: 'Skup svatova',
      venue: 'Restoran Verde',
      location: { lat: 44.86473757107052, lng: 20.47429047711282 }
    },
    {
      time: '17:30',
      title: 'Građansko venčanje',
      venue: 'Restoran Verde',
      location: { lat: 44.86473757107052, lng: 20.47429047711282 }
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        className="space-y-8"
      >
        {events.map((event, index) => (
          <div 
            key={index}
            className="timeline-event cursor-pointer"
            onClick={() => setSelectedVenue({
              location: event.location,
              venue: event.venue
            })}
          >
            <time>{event.time}</time>
            <h3>{event.title}</h3>
            <p>{event.venue}</p>
          </div>
        ))}
      </motion.div>
      
      <div className="sticky top-4 h-[400px]">
        <Map 
          selectedVenue={selectedVenue}
          events={events}
        />
      </div>
    </div>
  )
}
