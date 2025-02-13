'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    { id: 1, src: '/images/gallery/photo1.jpg', alt: 'Engagement Photo 1' },
    { id: 2, src: '/images/gallery/photo2.jpg', alt: 'Engagement Photo 2' },
    { id: 3, src: '/images/gallery/photo3.jpg', alt: 'Engagement Photo 3' },
    { id: 4, src: '/images/gallery/photo4.jpg', alt: 'Engagement Photo 4' },
    { id: 5, src: '/images/gallery/photo5.jpg', alt: 'Engagement Photo 5' },
    { id: 6, src: '/images/gallery/photo6.jpg', alt: 'Engagement Photo 6' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="aspect-square relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-4">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                quality={100}
                priority
              />
              <button
                className="absolute top-4 right-4 text-white text-4xl hover:opacity-75 transition-opacity"
                onClick={() => setSelectedImage(null)}
                aria-label="Close gallery"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
