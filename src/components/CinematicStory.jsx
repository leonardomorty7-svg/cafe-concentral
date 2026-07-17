import React, { useEffect, useRef, useState } from 'react';

/**
 * CinematicStory — el bloque de apertura de la home, con scrub de scroll.
 *
 * Arranca en negro con la semilla dorada; cada tramo de scroll hace
 * florecer una fotografía real desde un círculo (clip-path) con una
 * sola frase encima. Tres beats y suelta el pin directo a la tienda.
 * Fusiona lo que antes eran Hero + "Quiénes somos" + "Nuestra tierra".
 */

const GOLD = '#C6A47E';

const BEATS = [
  {
    img: '/assets/images/finca-huila.jpg',
    alt: 'Finca cafetera de Coocentral entre las montañas del Huila',
    eyebrow: 'HUILA, COLOMBIA',
    title: 'Cada taza cuenta una historia',
    italic: 'que transforma vidas.',
  },
  {
    img: '/assets/images/empaque-cafe-especial.jpg',
    alt: 'Manos empacando una bolsa de Café Coocentral en la planta',
    eyebrow: 'QUIÉNES SOMOS',
    title: 'No nacimos para producir café.',
    italic: 'Nacimos para crear oportunidades.',
  },
  {
    img: '/assets/images/tostion-cafe.jpg',
    alt: 'Granos de café en la tostadora de Coocentral',
    eyebrow: 'NUESTRA TIERRA',
    title: 'En las montañas del Huila nacen historias',
    italic: 'que el mundo conoce en una taza.',
  },
];

const CIRCLE_ORIGIN = '50% 46%';

const BeanSVG = () => (
  <svg
    width="44"
    height="62"
    viewBox="0 0 60 84"
    fill="none"
    aria-hidden="true"
    style={{ filter: 'drop-shadow(0 0 14px rgba(198,164,126,0.4))' }}
  >
    <ellipse cx="30" cy="42" rx="24" ry="36" stroke={GOLD} strokeWidth="2.5" fill="rgba(198,164,126,0.08)" />
    <path d="M30 8 C 16 28, 16 56, 30 76" stroke={GOLD} strokeWidth="2.5" fill="none" />
  </svg>
);

const BeatText = ({ eyebrow, title, italic, Tag = 'h2', withCtas = false }) => (
  <div className="max-w-5xl mx-auto px-6 text-center">
    <p className="tracking-[0.3em] text-xs uppercase mb-6 text-[#C6A47E] font-bold">{eyebrow}</p>
    <Tag className="font-serif font-light text-white tracking-tight leading-[1.05] text-4xl md:text-6xl xl:text-7xl">
      {title} <span className="italic text-[#C6A47E] block mt-2">{italic}</span>
    </Tag>
    {withCtas && (
      <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
        <a
          href="/productos"
          className="inline-block border border-white/40 text-white px-8 py-3 uppercase tracking-wide bg-transparent hover:bg-white/10 transition-all duration-300"
        >
          Conocer nuestros cafés
        </a>
        <a
          href="/nosotros"
          className="inline-block border-b border-transparent text-white px-6 py-3 uppercase tracking-wide bg-transparent hover:border-white/40 transition-all duration-300"
        >
          Nuestra historia
        </a>
      </div>
    )}
  </div>
);

const CinematicStory = () => {
  const rootRef = useRef(null);
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
        // La semilla late por su cuenta; el scrub solo controla su salida.
        gsap.to('.cine-bean-inner', {
          scale: 1.12,
          duration: 1.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });

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

        const beats = gsap.utils.toArray('.cine-beat');
        const texts = gsap.utils.toArray('.cine-text');

        beats.forEach((beat, i) => {
          const at = i * 1.5 + (i === 0 ? 0.15 : 0.2);

          // La foto florece desde el círculo y asienta su escala.
          tl.fromTo(
            beat,
            { clipPath: `circle(0% at ${CIRCLE_ORIGIN})` },
            { clipPath: `circle(120% at ${CIRCLE_ORIGIN})`, duration: 0.8, ease: 'power1.in' },
            at
          );
          tl.fromTo(beat.querySelector('img'), { scale: 1.18 }, { scale: 1, duration: 1.1, ease: 'power1.out' }, at);

          // Su frase entra al completarse el círculo…
          tl.fromTo(
            texts[i],
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            at + 0.6
          );
          // …y sale antes del beat siguiente (el último se queda).
          if (i < beats.length - 1) {
            tl.to(texts[i], { autoAlpha: 0, y: -50, duration: 0.25, ease: 'power2.in' }, at + 1.25);
          }
        });

        // La semilla se disuelve cuando la primera foto la alcanza.
        tl.to('.cine-bean', { autoAlpha: 0, scale: 1.6, duration: 0.3, ease: 'power2.in' }, 0.35);

        // Cola para sostener el beat final antes de soltar el pin.
        tl.to({}, { duration: 0.5 });
      }, rootRef);
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  // Sin animaciones: el primer beat funciona como hero estático.
  if (reduced) {
    const b = BEATS[0];
    return (
      <section className="relative min-h-screen flex items-center bg-black" aria-label="Café Coocentral">
        <img src={b.img} alt={b.alt} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.65))' }} />
        <div className="relative z-10 w-full py-32">
          <BeatText {...b} Tag="h1" withCtas />
        </div>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="relative bg-black" style={{ height: '420vh' }} aria-label="Café Coocentral">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Fotos: florecen por círculo en orden, cada una tapa la anterior */}
        {BEATS.map((b) => (
          <div
            key={b.img}
            className="cine-beat absolute inset-0"
            style={{ clipPath: `circle(0% at ${CIRCLE_ORIGIN})` }}
          >
            <img src={b.img} alt={b.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.6))' }} />
          </div>
        ))}

        {/* La semilla, primer plano del arranque en negro */}
        <div className="cine-bean absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="cine-bean-inner">
            <BeanSVG />
          </div>
          <span className="mt-8 text-[10px] uppercase tracking-[0.35em] text-white/40 font-bold">SCROLL</span>
          <div className="mt-4 w-px h-10 bg-white/20" />
        </div>

        {/* Frases: una por beat; la primera es el h1 del sitio */}
        {BEATS.map((b, i) => (
          <div key={b.eyebrow} className="cine-text absolute inset-0 flex items-center opacity-0">
            <div className="w-full">
              <BeatText {...b} Tag={i === 0 ? 'h1' : 'h2'} withCtas={i === BEATS.length - 1} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CinematicStory;
