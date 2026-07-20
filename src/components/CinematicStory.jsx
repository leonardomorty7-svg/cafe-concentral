import React, { useEffect, useRef, useState } from 'react';
import { startDust, GRAIN } from '../scripts/atmosphere.js';

/**
 * CinematicStory — la apertura del sitio como UNA sola animación continua,
 * dentro de un único pin y un único timeline con scrub de scroll:
 *
 *   granos (secuencia del cliente) → logo → la finca florece detrás del
 *   logo → oportunidades → la tierra → (suelta el pin hacia la tienda)
 *
 * Los granos son 76 fotogramas WebP (render de After Effects del cliente,
 * 1080p) dibujados en canvas con object-cover y scrubbed por el scroll;
 * al llegar al logo, el canvas se disuelve mientras la primera foto ya
 * está floreciendo debajo. Nada se siente como "otra sección".
 */

const GOLD = '#C6A47E';

const FRAME_COUNT = 76;
const framePath = (i) => `/assets/intro/beans/f_${String(i).padStart(3, '0')}.webp`;
const LAST_FRAME = framePath(FRAME_COUNT);

// Cuánto del timeline ocupan los granos antes de que empiecen las fotos.
const BEANS_DUR = 3;

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
  const beansRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }

    let ctx;
    let cancelled = false;
    const stopDust = startDust(rootRef.current.querySelector('.cine-dust'));

    // ── Secuencia de granos en canvas (object-cover) ──────────────────
    const canvas = beansRef.current;
    const bx = canvas.getContext('2d');
    const images = new Array(FRAME_COUNT);
    const beans = { frame: 0 };

    const drawBeans = () => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(beans.frame)));
      const img = images[idx];
      if (!img || !img.complete || !img.naturalWidth) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      bx.clearRect(0, 0, cw, ch);
      bx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const resizeBeans = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawBeans();
    };

    // Precarga: primer y último frame primero (estados de reposo).
    const order = [0, FRAME_COUNT - 1, ...Array.from({ length: FRAME_COUNT }, (_, i) => i)];
    order.forEach((i) => {
      if (images[i]) return;
      const im = new Image();
      im.decoding = 'async';
      im.src = framePath(i + 1);
      im.onload = drawBeans;
      images[i] = im;
    });

    window.addEventListener('resize', resizeBeans);
    resizeBeans();

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

        // ── Fase 1: los granos se scrubbean hasta el logo ──────────────
        tl.to(beans, { frame: FRAME_COUNT - 1, duration: BEANS_DUR, onUpdate: drawBeans }, 0);
        tl.to('.cine-hint', { autoAlpha: 0, duration: 0.5 }, 0.15);

        // El canvas de granos (con el logo) se disuelve para revelar las
        // fotos que ya están floreciendo debajo.
        tl.to('.cine-beans', { autoAlpha: 0, duration: 0.6, ease: 'power1.inOut' }, BEANS_DUR);

        // ── Fase 2: las fotos florecen, una tras otra ──────────────────
        beats.forEach((beat, i) => {
          const at = BEANS_DUR + i * 1.5 + (i === 0 ? 0 : 0.2);

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

        // El polvo brilla pleno sobre los granos y baja a acento sobre las fotos.
        tl.to('.cine-dust', { opacity: 0.35, duration: 0.5 }, BEANS_DUR);

        // Los puntos aparecen cuando empiezan las fotos.
        tl.to('.cine-dots', { autoAlpha: 1, duration: 0.2 }, BEANS_DUR + 0.1);

        // Cola para sostener el beat final antes de soltar el pin.
        tl.to({}, { duration: 0.5 });
      }, rootRef);
    });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resizeBeans);
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
    <section ref={rootRef} className="relative bg-black" style={{ height: '520vh' }} aria-label="Café Coocentral">
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

        {/* Los granos del cliente: primer plano que se scrubbea hasta el
            logo y se disuelve para revelar las fotos. Fallback sin JS: el
            último frame (el logo) como poster. */}
        <canvas ref={beansRef} className="cine-beans absolute inset-0 w-full h-full z-[7]">
          <img src={LAST_FRAME} alt="Café Coocentral" />
        </canvas>

        {/* Aviso de scroll, sobre los granos al arrancar */}
        <div className="cine-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-[8]">
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-bold">SCROLL</span>
          <div className="mt-4 w-px h-10 bg-white/25" />
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
