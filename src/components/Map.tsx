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
  // Updated embed URL with modern styling
  const getEmbedUrl = () => {
    if (selectedVenue) {
      return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
        &q=${selectedVenue.location.lat},${selectedVenue.location.lng}
        &zoom=15
        &language=sr
        &maptype=roadmap
        &style=feature:all|element:labels|visibility:on
        &style=feature:all|element:labels.text.fill|color:0x000000
        &style=feature:all|element:labels.text.stroke|color:0xffffff
        &style=feature:poi|element:all|visibility:off`;
    }
    
    // Default view showing Verde restaurant with modern styling
    return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
      &q=Verde+venčanja+na+otvorenom,Belgrade
      &zoom=15
      &language=sr
      &maptype=roadmap
      &style=feature:all|element:labels|visibility:on
      &style=feature:all|element:labels.text.fill|color:0x000000
      &style=feature:all|element:labels.text.stroke|color:0xffffff
      &style=feature:poi|element:all|visibility:off`;
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={getEmbedUrl()}
        width="100%"
        height="100%"
        className="border-0 rounded-lg"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location map"
      />
    </div>
  );
}
