import React, { useEffect, useRef, useState } from 'react';
import { startDust, GRAIN } from '../scripts/atmosphere.js';

/**
 * CinematicStory — el bloque de apertura de la home, con scrub de scroll.
 *
 * Arranca en negro con la semilla dorada; cada tramo de scroll hace
 * florecer una fotografía real desde un círculo (clip-path) con una
 * sola frase encima. Tres beats y suelta el pin directo a la tienda.
 *
 * La atmósfera (polvo dorado, grano de película) viene del módulo
 * compartido atmosphere.js; acá se suman la onda de luz por revelado,
 * la viñeta y los puntos de progreso por beat.
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

// Viñeta de cine: centro más luminoso, bordes hundidos.
const VIGNETTE =
  'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 95%), linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.45))';

const BeatText = ({ eyebrow, title, italic, Tag = 'h2', withCtas = false }) => (
  <div className="max-w-5xl mx-auto px-6 text-center">
    <p className="cine-eyebrow tracking-[0.3em] text-xs uppercase mb-6 text-[#C6A47E] font-bold">{eyebrow}</p>
    <Tag className="font-serif font-light text-white tracking-tight leading-[1.05] text-4xl md:text-6xl xl:text-7xl">
      <span className="cine-title-main block">{title}</span>{' '}
      <span className="cine-title-italic italic text-[#C6A47E] block mt-2">{italic}</span>
    </Tag>
    {withCtas && (
      <div className="cine-ctas mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
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
    const stopDust = startDust(rootRef.current.querySelector('.cine-dust'));

    // gsap y ScrollTrigger son CJS: importarlos estáticos rompe el SSR de Astro.
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

        const beats = gsap.utils.toArray('.cine-beat');
        const texts = gsap.utils.toArray('.cine-text');
        const rings = gsap.utils.toArray('.cine-ring');
        const dots = gsap.utils.toArray('.cine-dot');

        // El puente (logo del intro) se disuelve al arrancar, mientras la
        // primera foto florece detrás de él.
        tl.to('.cine-bridge', { autoAlpha: 0, duration: 0.55, ease: 'power1.inOut' }, 0.1);

        beats.forEach((beat, i) => {
          // El primer beat florece desde el arranque, detrás del puente.
          const at = i * 1.5 + (i === 0 ? 0 : 0.2);

          // La foto florece desde el círculo y asienta su escala…
          tl.fromTo(
            beat,
            { clipPath: `circle(0% at ${CIRCLE_ORIGIN})` },
            { clipPath: `circle(120% at ${CIRCLE_ORIGIN})`, duration: 0.8, ease: 'power1.in' },
            at
          );
          tl.fromTo(beat.querySelector('img'), { scale: 1.18 }, { scale: 1, duration: 1.1, ease: 'power1.out' }, at);

          // …escoltada por una onda de luz dorada que se disuelve al expandirse.
          tl.fromTo(
            rings[i],
            { scale: 0, autoAlpha: 0.9 },
            { scale: 1, autoAlpha: 0, duration: 0.85, ease: 'power1.in' },
            at
          );

          // La frase entra coreografiada: eyebrow comprimiendo su tracking,
          // luego la línea principal y por último la itálica.
          const text = texts[i];
          tl.fromTo(text, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, at + 0.55);
          tl.fromTo(
            text.querySelector('.cine-eyebrow'),
            { letterSpacing: '0.7em', autoAlpha: 0, y: 20 },
            { letterSpacing: '0.3em', autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
            at + 0.55
          );
          tl.fromTo(
            text.querySelector('.cine-title-main'),
            { y: 50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
            at + 0.62
          );
          tl.fromTo(
            text.querySelector('.cine-title-italic'),
            { y: 60, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
            at + 0.7
          );
          if (i === beats.length - 1) {
            tl.fromTo(
              '.cine-ctas',
              { y: 30, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.25, ease: 'power2.out' },
              at + 0.85
            );
          } else {
            tl.to(text, { autoAlpha: 0, y: -50, duration: 0.25, ease: 'power2.in' }, at + 1.25);
          }

          // Punto de progreso del beat activo.
          tl.to(dots[i], { backgroundColor: GOLD, scale: 1.7, duration: 0.12 }, at + 0.55);
          if (i > 0) {
            tl.to(dots[i - 1], { backgroundColor: 'rgba(255,255,255,0.25)', scale: 1, duration: 0.12 }, at + 0.55);
          }
        });

        // El polvo brilla pleno sobre el negro y baja a acento sobre las fotos.
        tl.to('.cine-dust', { opacity: 0.35, duration: 0.5 }, 0.35);

        // Los puntos aparecen al empezar el viaje.
        tl.to('.cine-dots', { autoAlpha: 1, duration: 0.2 }, 0.4);

        // Cola para sostener el beat final antes de soltar el pin.
        tl.to({}, { duration: 0.5 });
      }, rootRef);
    });

    return () => {
      cancelled = true;
      stopDust();
      if (ctx) ctx.revert();
    };
  }, []);

  // Sin animaciones: el primer beat funciona como hero estático.
  if (reduced) {
    const b = BEATS[0];
    return (
      <section className="relative min-h-screen flex items-center bg-black" aria-label="Café Coocentral">
        <img src={b.img} alt={b.alt} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: VIGNETTE }} />
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
            <div className="absolute inset-0" style={{ background: VIGNETTE }} />
          </div>
        ))}

        {/* Ondas de luz que escoltan cada revelado */}
        {BEATS.map((b) => (
          <div
            key={`ring-${b.img}`}
            className="cine-ring absolute rounded-full pointer-events-none z-[4]"
            style={{
              width: '165vmax',
              height: '165vmax',
              left: '50%',
              top: '46%',
              transform: 'translate(-50%, -50%) scale(0)',
              opacity: 0,
              border: '1.5px solid rgba(198,164,126,0.8)',
              boxShadow: '0 0 60px rgba(198,164,126,0.35), inset 0 0 60px rgba(198,164,126,0.2)',
            }}
          />
        ))}

        {/* Polvo dorado */}
        <canvas className="cine-dust absolute inset-0 w-full h-full pointer-events-none z-[5]" style={{ mixBlendMode: 'screen' }} />

        {/* Grano de película */}
        <div
          className="absolute inset-0 pointer-events-none z-[6]"
          style={{ backgroundImage: GRAIN, opacity: 0.055, mixBlendMode: 'overlay' }}
        />

        {/* Puente: el logo con que termina el intro persiste aquí y se
            disuelve mientras la primera foto florece detrás — sin costura. */}
        <div className="cine-bridge absolute inset-0 z-[7] pointer-events-none">
          <img src="/assets/intro/beans/f_076.webp" alt="" className="w-full h-full object-cover" />
        </div>

        {/* Frases: una por beat; la primera es el h1 del sitio */}
        {BEATS.map((b, i) => (
          <div key={b.eyebrow} className="cine-text absolute inset-0 flex items-center opacity-0 z-10">
            <div className="w-full">
              <BeatText {...b} Tag={i === 0 ? 'h1' : 'h2'} withCtas={i === BEATS.length - 1} />
            </div>
          </div>
        ))}

        {/* Puntos de progreso por beat */}
        <div className="cine-dots absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-0 z-20">
          {BEATS.map((b) => (
            <span key={`dot-${b.eyebrow}`} className="cine-dot w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicStory;
