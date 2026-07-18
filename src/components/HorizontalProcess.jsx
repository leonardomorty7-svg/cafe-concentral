import React, { useEffect, useRef, useState } from 'react';

/**
 * HorizontalProcess — "Un proceso guiado por la cooperación" como viaje
 * horizontal: el scroll vertical mueve una cinta de paneles de derecha a
 * izquierda (la banda transportadora del proceso). Cuatro paneles: el
 * título y los tres momentos, cada uno con su fotografía real, número
 * fantasma de fondo, contador arriba y riel de progreso dorado abajo.
 */

const STEPS = [
  {
    num: '01',
    title: 'Nuestras manos',
    text: 'Más de 3.500 familias del Huila cultivan cada grano con el conocimiento que heredaron de sus padres y el cuidado de quien trabaja su propia tierra.',
    img: '/assets/images/empaque-cafe-especial.jpg',
    alt: 'Manos empacando una bolsa de Café Coocentral en la planta',
  },
  {
    num: '02',
    title: 'Nuestro cuidado',
    text: 'Seleccionamos, secamos y tostamos cada lote con el mismo rigor con el que fue cultivado. Cuidar el grano es cuidar el trabajo que hay detrás.',
    img: '/assets/images/tostion-cafe.jpg',
    alt: 'Granos de café en la tostadora de Coocentral',
  },
  {
    num: '03',
    title: 'Nuestro propósito',
    text: 'Llevamos el café del Huila al mundo para que el valor regrese a quienes lo cultivan. El café viaja, el bienestar vuelve.',
    img: '/assets/images/cafes-premium-costales.jpg',
    alt: 'Cafés Coocentral sobre costales de exportación',
  },
];

const StepPanel = ({ num, title, text, img, alt, flip }) => (
  <div className="hp-panel relative w-screen h-full shrink-0 flex items-center px-8 md:px-24 pt-28 pb-24 md:py-0">
    {/* Número fantasma de fondo */}
    <span
      aria-hidden="true"
      className={`absolute top-1/2 -translate-y-1/2 font-serif italic leading-none select-none pointer-events-none text-white/[0.04] text-[42vw] md:text-[26vw] ${flip ? 'left-[4%]' : 'right-[4%]'}`}
    >
      {num}
    </span>

    <div className={`relative grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 w-full max-w-6xl mx-auto ${flip ? 'md:[direction:rtl]' : ''}`}>
      <div className="[direction:ltr] relative overflow-hidden rounded-sm w-full aspect-[4/3] md:aspect-[4/5] max-h-[38vh] md:max-h-[62vh]">
        <img src={img} alt={alt} className="hp-img w-full h-full object-cover" style={{ transform: 'scale(1.12)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.22))' }} />
      </div>

      <div className="[direction:ltr]">
        <span className="font-serif italic text-4xl md:text-6xl text-[#C6A47E]">{num}</span>
        <h3 className="font-serif text-3xl md:text-5xl text-white leading-[1.1] mt-4">{title}</h3>
        <div className="w-12 h-px bg-[#A68A64] my-7 md:my-9" />
        <p className="text-white/60 font-light text-base md:text-lg leading-[1.8] max-w-md">{text}</p>
      </div>
    </div>
  </div>
);

const HorizontalProcess = () => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const counterRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }

    let ctx;
    let cancelled = false;

    // gsap y ScrollTrigger son CJS: importarlos estáticos rompe el SSR de Astro.
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapMod, stMod]) => {
      if (cancelled) return;
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const track = trackRef.current;

        const st = {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        };

        // La cinta: scroll vertical → viaje horizontal derecha a izquierda.
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            ...st,
            onUpdate: (self) => {
              // Contador del paso visible (el panel 0 es el título).
              const current = Math.min(STEPS.length, Math.max(1, Math.round(self.progress * STEPS.length)));
              if (counterRef.current) counterRef.current.textContent = String(current).padStart(2, '0');
            },
          },
        });

        // Deriva sutil de las fotos en sentido contrario: profundidad de capa.
        gsap.fromTo('.hp-img', { xPercent: -5 }, { xPercent: 5, ease: 'none', scrollTrigger: { ...st } });

        // El riel dorado se llena con el viaje.
        gsap.fromTo('.hp-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { ...st } });
      }, rootRef);
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  // Sin animaciones: los pasos se leen en columna, sin pin ni cinta.
  if (reduced) {
    return (
      <section className="bg-[#0B0B0B] py-28 px-8" aria-label="Nuestro modelo">
        <div className="max-w-3xl mx-auto space-y-20">
          <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1]">
            Un proceso guiado por la <span className="italic text-[#C6A47E]">cooperación.</span>
          </h2>
          {STEPS.map((s) => (
            <div key={s.num}>
              <span className="font-serif italic text-4xl text-[#C6A47E]">{s.num}</span>
              <h3 className="font-serif text-3xl text-white mt-3">{s.title}</h3>
              <p className="text-white/60 font-light mt-5 leading-[1.8]">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className="relative bg-[#0B0B0B]"
      style={{ height: 'calc(100vh + 300vw)' }}
      aria-label="Nuestro modelo"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Barra superior: sección y contador */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-24 pt-24 md:pt-28 pointer-events-none">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#C6A47E] font-bold">Nuestro modelo</span>
          <span className="text-[11px] tracking-[0.3em] text-white/50 font-bold">
            <span ref={counterRef} className="text-[#C6A47E]">01</span> / {String(STEPS.length).padStart(2, '0')}
          </span>
        </div>

        {/* La cinta */}
        <div ref={trackRef} className="flex h-full will-change-transform">
          {/* Panel 0 — el título invita al viaje */}
          <div className="hp-panel w-screen h-full shrink-0 flex items-center px-8 md:px-24">
            <div className="max-w-3xl">
              <h2 className="font-serif font-light text-4xl md:text-6xl xl:text-7xl text-white leading-[1.08]">
                Un proceso guiado por la <span className="italic text-[#C6A47E]">cooperación.</span>
              </h2>
              <p className="mt-10 text-white/50 font-light text-base md:text-lg flex items-center gap-4">
                Tres momentos entre la tierra y tu taza. Sigue bajando: el proceso avanza contigo.
                <span aria-hidden="true" className="inline-block text-[#C6A47E] text-2xl leading-none">→</span>
              </p>
            </div>
          </div>

          {STEPS.map((s, i) => (
            <StepPanel key={s.num} {...s} flip={i % 2 === 1} />
          ))}
        </div>

        {/* Riel de progreso */}
        <div className="absolute bottom-10 left-8 right-8 md:left-24 md:right-24 h-px bg-white/10 z-20">
          <div className="hp-progress h-full bg-[#C6A47E] origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  );
};

export default HorizontalProcess;
