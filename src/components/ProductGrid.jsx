import React, { useEffect, useRef } from 'react';
import { addItem, formatPrice, openCart } from '../lib/cart.js';

/** Catmull-Rom → polyline suave que pasa por todos los puntos ancla. */
function smoothPath(points) {
  if (points.length < 2) return '';
  const p = [points[0], ...points, points[points.length - 1]];
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} `;
  const SEG = 26;
  for (let i = 1; i < p.length - 2; i++) {
    const p0 = p[i - 1], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2];
    for (let t = 1; t <= SEG; t++) {
      const s = t / SEG, s2 = s * s, s3 = s2 * s;
      const x = 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * s + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * s2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * s3);
      const y = 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * s + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * s2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * s3);
      d += `L${x.toFixed(1)} ${y.toFixed(1)} `;
    }
  }
  return d;
}

const ProductCard = ({ id, name, tag, description, category, image, variants = [] }) => {
  const defaultVariant = variants[0] || { size: null, price: null };
  const lowestPrice = variants.reduce(
    (lowest, variant) => Math.min(lowest, variant.price),
    defaultVariant.price ?? Infinity,
  );
  const handleAdd = (e) => {
    // El enlace envolvente es un "stretched link"; el botón vive por encima y
    // no debe navegar al añadir.
    e.preventDefault();
    e.stopPropagation();
    // El café entra con una molienda por defecto (cambiable en la ficha).
    addItem(
      { id, name, image, size: defaultVariant.size, price: defaultVariant.price },
      1,
      category === 'cafe' ? 'En grano' : null,
    );
    openCart();
  };

  return (
    <div className="group relative transition-transform duration-500 ease-out hover:-translate-y-2">
      {/* Enlace estirado: toda la tarjeta navega al producto, salvo el botón. */}
      <a href={`/products/${id}`} className="absolute inset-0 z-[1]" aria-label={`Ver ${name}`} />

      {/* Packshot: la bolsa FLOTA (object-contain con aire) sobre un blanco
          limpio y consistente — como los mockups del cliente. Card más alta. */}
      <div
        className="relative aspect-[3/4] rounded-sm overflow-hidden mb-6"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F6F1E9 100%)' }}
      >
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain p-5 md:p-7 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />

        {/* Añadir rápido — aparece al pasar el mouse, por encima del enlace */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Añadir ${name} al carrito`}
          className="absolute bottom-4 right-4 z-[3] inline-flex items-center gap-1.5 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-[0.18em] px-4 py-2.5 rounded-sm shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#D1AA49] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1AA49] focus-visible:opacity-100 focus-visible:translate-y-0"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Añadir
        </button>
      </div>

      <div className="flex items-baseline justify-between gap-3 px-1">
        <h3 className="font-serif text-xl md:text-2xl text-[#1A1A1A] leading-tight group-hover:text-[#D1AA49] transition-colors duration-300">
          {name}
        </h3>
        {Number.isFinite(lowestPrice) && (
          <span className="font-serif text-base md:text-lg text-[#1A1A1A]/70 shrink-0 whitespace-nowrap tabular-nums">
            {variants.length > 1 && (
              <span className="font-sans text-[10px] uppercase tracking-wide text-[#9A9488] mr-1">desde</span>
            )}
            {formatPrice(lowestPrice)}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * El encabezado es opcional: en la home la grilla llega después del recorrido
 * (tierra → familias → modelo) y puede apoyarse en él. En /productos la página
 * ya trae su propio h1, así que se omite para no duplicarlo.
 *
 * En la home (`centered`) el HILO CONDUCTOR baja del hero, entra por arriba,
 * pasa por DETRÁS del título y se oculta tras las cards: el relevo de la
 * narrativa (mismo hilo del proceso).
 */
const ProductGrid = ({ products = [], limit = 0, eyebrow, heading, headingItalic, description, centered = false }) => {
  const rootRef = useRef(null);

  // limit=0 means show all; any positive number caps the list
  const displayedProducts = limit > 0 ? products.slice(0, limit) : products;

  useEffect(() => {
    if (!centered || !rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx, cancelled = false;
    const root = rootRef.current;
    const svg = root.querySelector('.pg-thread');
    const track = root.querySelector('.pg-thread-track');
    const line = root.querySelector('.pg-thread-line');
    const seed = root.querySelector('.pg-thread-seed');
    const maskBg = root.querySelector('.pg-mask-bg');
    const headHole = root.querySelector('.pg-hole-head');
    const cardHoles = Array.from(root.querySelectorAll('.pg-hole-card'));
    let len = 0, lastP = 0;

    const build = () => {
      if (!svg || !line || !track) return;
      const r = root.getBoundingClientRect();
      const W = r.width, H = root.offsetHeight;
      if (!W || !H) return;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      if (maskBg) { maskBg.setAttribute('width', String(W)); maskBg.setAttribute('height', String(H)); }
      const toLocal = (el) => {
        const b = el.getBoundingClientRect();
        return { cx: b.left + b.width / 2 - r.left, cy: b.top + b.height / 2 - r.top, w: b.width, h: b.height,
                 x: b.left - r.left, y: b.top - r.top };
      };
      const headEl = root.querySelector('.pg-head');
      const cards = Array.from(root.querySelectorAll('.pg-card'));
      const head = headEl ? toLocal(headEl) : { cx: W / 2, cy: H * 0.16 };
      const midCard = cards.length ? toLocal(cards[Math.floor(cards.length / 2)]) : { cx: W / 2, cy: H * 0.7, y: H * 0.5 };

      // Anclas: entra arriba-centro (relevo del hero) → detrás del título →
      // baja y se hunde tras la card central.
      const anchors = [
        { x: W / 2, y: 0 },
        { x: W / 2, y: Math.max(6, head.cy - head.h * 0.7) },
        { x: head.cx, y: head.cy },
        { x: W / 2, y: (head.cy + midCard.y) / 2 },
        { x: midCard.cx, y: midCard.y + midCard.h * 0.42 },
      ];
      const d = smoothPath(anchors);
      track.setAttribute('d', d);
      line.setAttribute('d', d);
      len = line.getTotalLength();
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);

      // Huecos de la máscara: el título y cada card (el hilo se oculta detrás).
      if (headEl && headHole) {
        headHole.setAttribute('x', (head.x - 8).toFixed(1));
        headHole.setAttribute('y', (head.y - 2).toFixed(1));
        headHole.setAttribute('width', (head.w + 16).toFixed(1));
        headHole.setAttribute('height', (head.h + 4).toFixed(1));
      }
      cards.forEach((el, i) => {
        const h = cardHoles[i]; if (!h) return;
        const c = toLocal(el);
        h.setAttribute('x', (c.x - 4).toFixed(1));
        h.setAttribute('y', (c.y - 4).toFixed(1));
        h.setAttribute('width', (c.w + 8).toFixed(1));
        h.setAttribute('height', (c.h + 8).toFixed(1));
      });
      update(lastP);
    };

    const update = (p) => {
      lastP = p;
      if (!len || !line) return;
      const cl = Math.max(0, Math.min(1, p));
      line.style.strokeDashoffset = String(len * (1 - cl));
      const pt = line.getPointAtLength(len * cl);
      if (seed) seed.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    };

    const onResize = () => { build(); };
    window.addEventListener('resize', onResize);

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapMod, stMod]) => {
      if (cancelled) return;
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        build();
        ScrollTrigger.create({
          trigger: root,
          start: 'top 82%',
          end: 'center 58%',
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: () => build(),
          onUpdate: (self) => update(self.progress),
        });
        gsap.to('.pg-thread-bean', { scale: 1.14, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: 'center' });
      }, root);
    });

    return () => { cancelled = true; window.removeEventListener('resize', onResize); if (ctx) ctx.revert(); };
  }, [centered]);

  if (!products || products.length === 0) return null;

  return (
    <section ref={rootRef} className="relative py-32 md:py-48 px-6 bg-[#F5F1EB]" id="productos">
      {/* Hilo conductor (solo home): relevo del hero, por detrás del título y las cards */}
      {centered && (
        <svg className="pg-thread absolute inset-0 w-full h-full z-[5] pointer-events-none" aria-hidden="true" preserveAspectRatio="none">
          <defs>
            <mask id="pgThreadMask" maskUnits="userSpaceOnUse">
              <rect className="pg-mask-bg" x="0" y="0" width="100%" height="100%" fill="white" />
              <rect className="pg-hole-head" x="-9999" y="-9999" width="0" height="0" fill="black" />
              {displayedProducts.map((p) => (
                <rect key={`h-${p.id}`} className="pg-hole-card" x="-9999" y="-9999" width="0" height="0" rx="6" fill="black" />
              ))}
            </mask>
          </defs>
          <g mask="url(#pgThreadMask)">
            <path className="pg-thread-track" fill="none" stroke="rgba(209,170,73,0.14)" strokeWidth="1.5" />
            <path className="pg-thread-line" fill="none" stroke="#D1AA49" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 6px rgba(209,170,73,0.5))' }} />
            <g className="pg-thread-seed">
              <g className="pg-thread-bean">
                <circle r="12" fill="rgba(209,170,73,0.24)" />
                <ellipse rx="6" ry="9" fill="rgba(209,170,73,0.14)" stroke="#D1AA49" strokeWidth="1.6" />
                <path d="M0 -7.5 C -4.5 -2.5, -4.5 2.5, 0 7.5" fill="none" stroke="#D1AA49" strokeWidth="1.6" />
              </g>
            </g>
          </g>
        </svg>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {heading && (
          centered ? (
            // Encabezado centrado: título en un solo renglón (desde md) y el
            // apoyo, pequeño, centrado debajo — cierra el recorrido del hero.
            <div className="mb-24 text-center" data-fx="header">
              {eyebrow && (
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#D1AA49] font-bold mb-6 block" data-fx-eyebrow>{eyebrow}</span>
              )}
              <h2 className="pg-head inline-block text-4xl md:text-5xl xl:text-6xl font-serif text-[#1A1A1A] leading-tight md:whitespace-nowrap">
                {heading}{' '}
                {headingItalic && <span className="italic text-[#D1AA49]">{headingItalic}</span>}
              </h2>
              {description && (
                <p className="mt-6 text-[#6B6B6B] font-light text-base md:text-lg leading-[1.7] md:whitespace-nowrap">
                  {description}
                </p>
              )}
            </div>
          ) : (
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10" data-fx="header">
              <div className="max-w-2xl">
                {eyebrow && (
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#D1AA49] font-bold mb-6 block" data-fx-eyebrow>{eyebrow}</span>
                )}
                <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] leading-tight">
                  {heading}{' '}
                  {headingItalic && <span className="italic text-[#D1AA49]">{headingItalic}</span>}
                </h2>
              </div>
              {description && (
                <p className="text-[#6B6B6B] max-w-sm font-light text-lg leading-[1.7]">
                  {description}
                </p>
              )}
            </div>
          )
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10" data-fx="stagger">
          {displayedProducts.map((product) => (
            <div key={product.id} className="pg-card">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {limit > 0 && (
          <div className="mt-20 flex justify-center" data-fx="rise">
            <a
              href="/productos"
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-1.5 hover:border-[#D1AA49] hover:text-[#D1AA49] transition-all duration-300 flex items-center gap-2 group"
            >
              Ver toda la colección <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
