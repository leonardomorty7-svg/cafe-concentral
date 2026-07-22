import React, { useRef, useState, useEffect, useCallback } from 'react';

// ─── CARD ─────────────────────────────────────────────────────────────────────
// Exact same markup and classes as FeaturedProducts.ProductCard.
// Do NOT alter styles — only data wiring is different.

const ProductCard = ({ id, name, tastingNotes, price, image, tag, category = 'Origen' }) => (
  <a
    href={`/products/${id}`}
    className="group block flex flex-col transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] bg-white rounded-sm overflow-hidden p-4 reveal"
  >
    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-[#F5F1EB] mb-8">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {tag && (
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm font-bold text-[#1A1A1A] z-10">
          {tag}
        </span>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
    </div>

    <div className="flex flex-col flex-grow px-2 pb-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
        {category}
      </p>

      <h3 className="font-serif text-xl text-[#1A1A1A] mb-2 group-hover:text-[#CCA678] transition-colors duration-300">
        {name}
      </h3>

      <p className="text-sm text-gray-500 font-light mb-4">
        Notas: {tastingNotes}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
        <p className="text-lg font-medium text-[#CCA678]">
          {price}
        </p>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-transparent group-hover:border-[#CCA678] transition-all duration-300 py-1 flex items-center gap-1">
          Descubrir origen <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </div>
  </a>
);

// ─── ARROW BUTTON ─────────────────────────────────────────────────────────────

const ArrowButton = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
    className={[
      'flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300',
      'border-[#1A1A1A]/15 bg-white/80 backdrop-blur-sm',
      'hover:bg-[#1A1A1A] hover:border-[#1A1A1A] hover:text-white',
      disabled
        ? 'opacity-30 cursor-not-allowed'
        : 'cursor-pointer text-[#1A1A1A]',
    ].join(' ')}
  >
    {direction === 'left' ? (
      // Left chevron
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      // Right chevron
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
);

// ─── SLIDER ───────────────────────────────────────────────────────────────────

const AUTOPLAY_DELAY = 5500; // ms between auto-advances

const ProductSlider = ({
  products = [],
  title = 'NUESTRAS EDICIONES',
  subtitle = 'Cafés con nombre',
  subtitleItalic = 'y con historia.',
  description = 'Cada edición nació de una historia real: una celebración, una comunidad, una cosecha que valía la pena contar aparte.',
}) => {
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  if (!products || products.length === 0) return null;

  // ── Scroll helpers ────────────────────────────────────────────────────────

  /** Returns the width of a single card including its gap. */
  const getCardWidth = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const firstCard = track.firstElementChild;
    if (!firstCard) return 0;
    const gap = parseInt(getComputedStyle(track).gap) || 40;
    return firstCard.offsetWidth + gap;
  };

  const scrollBy = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * getCardWidth(), behavior: 'smooth' });
  }, []);

  const scrollLeft = useCallback(() => {
    setIsPaused(true); // user took control
    scrollBy(-1);
  }, [scrollBy]);

  const scrollRight = useCallback(() => {
    setIsPaused(true); // user took control
    scrollBy(1);
  }, [scrollBy]);

  // ── Arrow state sync ──────────────────────────────────────────────────────

  const syncArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 4);
    setCanScrollRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncArrows();
    track.addEventListener('scroll', syncArrows, { passive: true });
    const ro = new ResizeObserver(syncArrows);
    ro.observe(track);
    return () => {
      track.removeEventListener('scroll', syncArrows);
      ro.disconnect();
    };
  }, [syncArrows]);

  // ── Autoplay ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (isPaused) return;

    autoplayRef.current = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      if (atEnd) {
        // Loop back to start
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
      }
    }, AUTOPLAY_DELAY);

    return () => clearInterval(autoplayRef.current);
  }, [isPaused]);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section
      className="py-40 md:py-56 bg-[#F5F1EB]"
      id="coleccion"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mx-auto max-w-[720px] mb-16 px-6 text-center" data-fx="header">
          <span className="block text-[11px] tracking-[0.4em] uppercase mb-3 text-[#CCA678] font-bold" data-fx-eyebrow>
            {title}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] leading-tight">
            {subtitle}{' '}
            <span className="italic text-[#CCA678]">{subtitleItalic}</span>
          </h2>
          {description && (
            <p className="text-[#6B6B6B] max-w-[560px] mx-auto font-light text-base leading-[1.7] mt-6">
              {description}
            </p>
          )}
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-end gap-3 px-6 mb-8">
          <ArrowButton direction="left" onClick={scrollLeft} disabled={!canScrollLeft} />
          <ArrowButton direction="right" onClick={scrollRight} disabled={!canScrollRight} />
        </div>

        {/* Scrollable track
            Responsive card widths via CSS custom properties:
              mobile  → ~85vw  (1.2 cards visible)
              tablet  → ~45vw  (2 cards visible)
              desktop → ~30vw capped at ~380px (3 cards visible)
        */}
        <div
          ref={trackRef}
          data-slider-track
          className="flex gap-10 overflow-x-auto scroll-smooth px-6"
          style={{
            scrollbarWidth: 'none',      /* Firefox */
            msOverflowStyle: 'none',     /* IE/Edge */
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {products.map((product, idx) => {
            const delayClass = `delay-${((idx % 3) * 100) + 100}`;
            return (
              <div
                key={product.id}
                // Intrinsic width: shrink-0 prevents flex shrink; width is responsive
                className={`shrink-0 w-[82vw] sm:w-[46vw] lg:w-[calc((100%-80px)/3)] ${delayClass} reveal`}
                style={{ maxWidth: '400px' }}
              >
                <ProductCard {...product} />
              </div>
            );
          })}

          {/* Trailing spacer so last card doesn't flush against viewport edge */}
          <div className="shrink-0 w-4" aria-hidden="true" />
        </div>

        {/* CTA */}
        <div className="mt-16 text-center px-6">
          <a
            href="/productos"
            className="inline-block px-12 py-5 border border-[#1A1A1A]/10 text-[#1A1A1A] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500 rounded-sm"
          >
            Ver Toda la Colección
          </a>
        </div>
      </div>

      {/* Hide WebKit scrollbar — scoped to this slider's track */}
      <style>{`
        [data-slider-track]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default ProductSlider;
