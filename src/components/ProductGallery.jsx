import React, { useState } from 'react';

/**
 * ProductGallery
 * Hydrated React component used in [slug].astro for interactive image switching.
 *
 * Props:
 *  - images: string[]   – ordered list of image URLs
 *  - name:  string      – product name (used for alt text)
 *  - badge: string|null – optional badge label
 */
const ProductGallery = ({ images = [], name = '', badge = null }) => {
  const [activeImage, setActiveImage] = useState(images[0] ?? '');
  const [fading, setFading] = useState(false);

  const handleSelect = (src) => {
    if (src === activeImage) return;
    // Trigger fade-out, swap image, fade-in
    setFading(true);
    setTimeout(() => {
      setActiveImage(src);
      setFading(false);
    }, 180);
  };

  return (
    <div className="relative">
      {/* Badge */}
      {badge && (
        <span className="absolute top-5 left-5 z-10 text-[10px] uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm font-bold text-[#1A1A1A]">
          {badge}
        </span>
      )}

      {/* Primary image — la bolsa FLOTA (object-contain con aire), sin recorte */}
      <div
        className="aspect-[4/5] rounded-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04]"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F6F1E9 100%)' }}
      >
        <img
          src={activeImage}
          alt={name}
          loading="eager"
          className={`w-full h-full object-contain p-8 md:p-12 transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>

      {/* Thumbnail strip — only shown if multiple images exist */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((src, i) => {
            const isActive = src === activeImage;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(src)}
                aria-label={`Ver imagen ${i + 1} de ${name}`}
                className={`flex-1 aspect-square rounded-sm overflow-hidden bg-white border-2 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1AA49] ${
                  isActive
                    ? 'border-[#D1AA49] scale-[1.03] shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-90 hover:border-[#D1AA49]/40'
                }`}
              >
                <img
                  src={src}
                  alt={`${name} — vista ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-contain p-2"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Preload hidden images to avoid flicker on first click */}
      <div className="hidden" aria-hidden="true">
        {images.slice(1).map((src, i) => (
          <img key={i} src={src} alt="" loading="eager" />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
