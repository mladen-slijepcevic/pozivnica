'use client'

interface MapProps {
  selectedVenue: {
    location: { lat: number; lng: number }
    venue: string
  } | null;
  events: Array<{
    location: { lat: number; lng: number }
    venue: string
  }>;
}

export function Map({ selectedVenue, events }: MapProps) {
  // Generate embed URL that shows all locations with markers
  const getEmbedUrl = () => {
    if (selectedVenue) {
      // When a venue is selected, show that specific location
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.9266743407698!2d${selectedVenue.location.lng}!3d${selectedVenue.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(selectedVenue.venue)}!5e0!3m2!1sen!2s!4v1738076281078!5m2!1sen!2s`;
    }
    
    // Default view showing Verde restaurant
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2827.8800049479723!2d20.47429047711282!3d44.86473757107052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a65be5ced9659%3A0xec9882b149f6f797!2sVerde%20ven%C4%8Danja%20na%20otvorenom!5e0!3m2!1ssr!2srs!4v1738003591612!5m2!1ssr!2srs";
  };

  return (
    <iframe
      src={getEmbedUrl()}
      width="100%"
      height="100%"
      style={{ border: 0, borderRadius: '0.5rem' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Location map"
    />
  );
}
