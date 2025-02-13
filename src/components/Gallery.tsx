import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryImage {
  id: number
  src: string
  alt: string
}

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  
  const images: GalleryImage[] = [
    { id: 1, src: '/images/gallery/photo1.jpg', alt: 'Sala' },
    { id: 2, src: '/images/gallery/photo2.jpg', alt: 'Sala' },
    { id: 3, src: '/images/gallery/photo3.jpg', alt: 'Sala' },
    { id: 4, src: '/images/gallery/photo4.jpg', alt: 'Sala' },
    { id: 5, src: '/images/gallery/photo5.jpg', alt: 'Sala' },
    { id: 6, src: '/images/gallery/photo6.jpg', alt: 'Sala' },
  ]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === 'Escape') setSelectedImage(null)
      if (e.key === 'ArrowRight') {
        const nextIndex = (images.findIndex(img => img.id === selectedImage.id) + 1) % images.length
        setSelectedImage(images[nextIndex])
      }
      if (e.key === 'ArrowLeft') {
        const prevIndex = (images.findIndex(img => img.id === selectedImage.id) - 1 + images.length) % images.length
        setSelectedImage(images[prevIndex])
      }
    }
  }

  return (
    <section className="py-12" onKeyDown={handleKeyDown} tabIndex={0}>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {images.map((image) => (
          <motion.div
            key={image.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(image)}
            className="aspect-square"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="object-cover cursor-pointer rounded-lg h-full w-full"
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white text-xl p-2"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              aria-label="Close gallery"
            >
              ✕
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl p-4"
              onClick={(e) => {
                e.stopPropagation()
                const prevIndex = (images.findIndex(img => img.id === selectedImage.id) - 1 + images.length) % images.length
                setSelectedImage(images[prevIndex])
              }}
              aria-label="Previous image"
            >
              ←
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto object-contain"
              quality={100}
              priority
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl p-4"
              onClick={(e) => {
                e.stopPropagation()
                const nextIndex = (images.findIndex(img => img.id === selectedImage.id) + 1) % images.length
                setSelectedImage(images[nextIndex])
              }}
              aria-label="Next image"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
