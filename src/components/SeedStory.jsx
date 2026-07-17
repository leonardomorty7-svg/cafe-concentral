import React, { useEffect, useRef, useState } from 'react';

/**
 * SeedStory — scrollytelling de la historia de la cooperativa.
 *
 * Un grano de café desciende por un hilo mientras el scroll (scrub)
 * narra 4 capítulos; al llegar al final del hilo, el grano germina
 * junto al concepto madre de la marca. La pantalla queda fija
 * (position: sticky) durante todo el recorrido.
 */

const CHAPTERS = [
  {
    eyebrow: 'EL ORIGEN',
    title: 'Todo empieza con una semilla.',
    text: 'En las montañas del Huila, entre niebla y tierra fértil, nace el fruto que une a nuestra cooperativa.',
  },
  {
    eyebrow: 'NUESTRAS FAMILIAS',
    title: 'Miles de manos la cultivan.',
    text: 'Más de 3.500 familias caficultoras la siembran y la cuidan con el conocimiento que heredaron de sus padres.',
  },
  {
    eyebrow: 'NUESTRAS MUJERES',
    title: 'Mujeres que transforman la tierra.',
    text: 'Mujeres cafeteras del Huila seleccionan y transforman cada fruto. Su trabajo tiene nombre propio en nuestra taza.',
  },
  {
    eyebrow: 'NUESTRO PROPÓSITO',
    title: 'El valor regresa al campo.',
    text: 'Cuando eliges nuestro café, el valor del grano vuelve a quienes lo sembraron: a la familia, a la vereda, al territorio.',
  },
];

const GOLD = '#C6A47E';

const BeanSVG = () => (
  <svg
    width="40"
    height="56"
    viewBox="0 0 60 84"
    fill="none"
    aria-hidden="true"
    style={{ filter: 'drop-shadow(0 0 12px rgba(198,164,126,0.35))' }}
  >
    <ellipse cx="30" cy="42" rx="24" ry="36" stroke={GOLD} strokeWidth="2.5" fill="rgba(198,164,126,0.08)" />
    <path d="M30 8 C 16 28, 16 56, 30 76" stroke={GOLD} strokeWidth="2.5" fill="none" />
  </svg>
);

const SproutSVG = () => (
  <svg
    width="56"
    height="72"
    viewBox="0 0 80 100"
    fill="none"
    aria-hidden="true"
    style={{ filter: 'drop-shadow(0 0 12px rgba(198,164,126,0.3))' }}
  >
    <path pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} d="M40 96 C 40 70, 40 52, 40 34" stroke={GOLD} strokeWidth="2.5" fill="none" />
    <path pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} d="M40 44 C 24 40, 14 28, 12 14 C 28 16, 38 28, 40 44 Z" stroke={GOLD} strokeWidth="2.5" fill="none" />
    <path pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} d="M40 36 C 56 32, 66 20, 68 6 C 52 8, 42 20, 40 36 Z" stroke={GOLD} strokeWidth="2.5" fill="none" />
  </svg>
);

const Chapter = ({ eyebrow, title, text }) => (
  <div className="max-w-2xl">
    <p className="text-[11px] tracking-[0.35em] uppercase text-[#C6A47E] font-bold mb-6">{eyebrow}</p>
    <h3 className="font-serif text-white text-4xl md:text-6xl leading-[1.08] mb-6">{title}</h3>
    <p className="text-white/60 font-light text-base md:text-xl leading-relaxed">{text}</p>
  </div>
);

const Finale = () => (
  <div className="max-w-3xl">
    <h3 className="font-serif text-4xl md:text-7xl leading-[1.05] text-white">
      Cada taza cuenta una historia <span className="italic text-[#C6A47E]">que transforma vidas.</span>
    </h3>
    <p className="mt-8 text-[11px] tracking-[0.35em] uppercase text-white/40 font-bold">
      Café Coocentral — Huila, Colombia
    </p>
  </div>
);

const SeedStory = () => {
  const rootRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }

    let ctx;
    let cancelled = false;

    // gsap y ScrollTrigger son CJS: importarlos estáticos rompe el SSR de Astro
    // (este componente es client:load, así que sí pasa por el servidor).
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapMod, stMod]) => {
      if (cancelled) return;
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Capítulos: entra → sostiene → sale, un tramo de timeline por capítulo.
      gsap.utils.toArray('.seed-chapter').forEach((cap, i) => {
        tl.fromTo(cap, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power2.out' }, i + 0.12);
        tl.to(cap, { autoAlpha: 0, y: -60, duration: 0.3, ease: 'power2.in' }, i + 0.78);
      });

      // El grano desciende por el hilo durante los 4 capítulos.
      tl.fromTo('.seed-bean', { y: 0 }, { y: () => window.innerHeight * 0.57, rotation: 160, duration: 4.1 }, 0);
      tl.fromTo('.seed-line', { scaleY: 0 }, { scaleY: 1, duration: 4.1 }, 0);

      // Germinación: el grano se funde en la tierra y brota la planta.
      tl.to('.seed-bean', { autoAlpha: 0, scale: 0.55, duration: 0.25, ease: 'power2.in' }, 4.12);
      tl.fromTo(
        '.seed-sprout path',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.5, stagger: 0.12, ease: 'power1.inOut' },
        4.2
      );
      tl.fromTo('.seed-finale', { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 4.3);

        // Cola muerta para sostener el remate antes de soltar el pin.
        tl.to({}, { duration: 0.35 });
      }, rootRef);
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  // Con prefers-reduced-motion la historia se lee como columna estática.
  if (reduced) {
    return (
      <section className="bg-[#0B0B0B] py-28 px-8" aria-label="La historia de nuestro café">
        <div className="max-w-3xl mx-auto space-y-24">
          {CHAPTERS.map((c) => (
            <Chapter key={c.eyebrow} {...c} />
          ))}
          <Finale />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className="relative bg-[#0B0B0B]"
      style={{ height: '460vh' }}
      aria-label="La historia de nuestro café"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Resplandor ambiente */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(166,138,100,0.10), transparent 60%)' }}
        />

        {/* Hilo guía y su progreso */}
        <div className="seed-rail absolute left-[10%] md:left-[16%] w-px bg-white/10" style={{ top: '11vh', height: '57vh' }} />
        <div
          className="seed-line absolute left-[10%] md:left-[16%] w-px bg-[#C6A47E]/60"
          style={{ top: '11vh', height: '57vh', transform: 'scaleY(0)', transformOrigin: 'top' }}
        />

        {/* La semilla */}
        <div className="seed-bean absolute left-[10%] md:left-[16%]" style={{ top: '9vh', marginLeft: '-20px' }}>
          <BeanSVG />
        </div>

        {/* El brote, al final del hilo */}
        <div className="seed-sprout absolute left-[10%] md:left-[16%]" style={{ top: '62vh', marginLeft: '-28px' }}>
          <SproutSVG />
        </div>

        {/* Capítulos */}
        {CHAPTERS.map((c) => (
          <div
            key={c.eyebrow}
            className="seed-chapter absolute inset-0 flex items-center opacity-0 pl-[22%] md:pl-[30%] pr-8 md:pr-[12%]"
          >
            <Chapter {...c} />
          </div>
        ))}

        {/* Remate: el concepto madre */}
        <div className="seed-finale absolute inset-0 flex items-center opacity-0 pl-[22%] md:pl-[30%] pr-8 md:pr-[12%]">
          <Finale />
        </div>
      </div>
    </section>
  );
};

export default SeedStory;
