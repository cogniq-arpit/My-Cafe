/**
 * Gallery.jsx — Masonry gallery with lightbox and category filter
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { galleryImages, galleryCategories } from '../data/galleryData';

export default function Gallery() {
  const [active,    setActive]    = useState('all');
  const [lightbox,  setLightbox]  = useState(null);

  const filtered = active === 'all' ? galleryImages : galleryImages.filter(i => i.category === active);

  return (
    <div className="page-wrapper pt-20">
      {/* Header */}
      <div className="bg-gradient-warm py-16 text-center px-4">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">Visual Stories</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">Our Gallery</h1>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            A glimpse into the sights, flavors, and moments at MY Cafe.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filter tabs */}
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          {galleryCategories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                active === cat
                  ? 'bg-cafe-brown text-white shadow-warm-sm'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-cafe-brown hover:text-cafe-brown'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div key={img.id}
                layout
                initial={{ opacity:0, scale:0.9 }}
                animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:0.9 }}
                transition={{ duration:0.3, delay: i * 0.04 }}
                className="masonry-item group relative cursor-pointer overflow-hidden rounded-2xl shadow-warm-sm hover:shadow-warm-lg"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    img.height === 'tall' ? 'h-72' : 'h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-xs font-medium capitalize">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10">
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale:0.85, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.85, opacity:0 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <p className="absolute bottom-6 text-white/70 text-sm capitalize">{lightbox.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
