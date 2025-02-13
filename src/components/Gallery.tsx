import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  
  const images = [
    { id: 1, src: '/images/gallery/1.jpg', alt: 'Jovanka and Mladen' },
    // ... more images
  ]

  return (
    <>
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
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="object-cover cursor-pointer"
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
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="max-h-[90vh] w-auto"
              quality={100}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}