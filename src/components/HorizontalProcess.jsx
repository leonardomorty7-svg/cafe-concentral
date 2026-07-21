import React, { useEffect, useRef, useState } from 'react';
import { startDust, GRAIN } from '../scripts/atmosphere.js';
import BeanIcon from './BeanIcon.jsx';

/**
 * HorizontalProcess — "Un proceso guiado por la cooperación" como viaje
 * horizontal: el scroll vertical mueve una cinta de paneles de derecha a
 * izquierda (la banda transportadora del proceso).
 *
 * La capa premium comparte el ADN de la apertura: polvo dorado y grano
 * de película (atmosphere.js), coreografía de llegada por panel (la foto
 * se revela con un barrido ligado a la cinta, el título sube, la línea
 * crece), números fantasma con parallax propio, ruta con estaciones que
 * se encienden al llegar, y un imán suave que asienta la cinta en cada
 * paso — porque estamos guiando un proceso.
 */

const GOLD = '#C6A47E';

// Granos 3D desenfocados que derivan detrás de los paneles. El desenfoque
// y el calentado al dorado de marca vienen horneados en los WebP, así no
// cuesta nada en runtime. Se reproducen en ping-pong (ida y vuelta) para
// que el bucle no tenga salto.
const BG_COUNT = 67;
const bgPath = (i) => `/assets/process/beans-bg/b_${String(i).padStart(3, '0')}.webp`;

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

const PANELS = STEPS.length + 1; // título + pasos

const StepPanel = ({ num, title, text, img, alt, flip }) => (
  <div className="hp-panel relative w-screen h-full shrink-0 flex items-center px-8 md:px-24 pt-28 pb-24 md:py-0">
    {/* Número fantasma de fondo, con parallax propio */}
    <span
      aria-hidden="true"
      className={`hp-ghost absolute top-1/2 -translate-y-1/2 font-serif italic leading-none select-none pointer-events-none text-white/[0.05] text-[42vw] md:text-[26vw] ${flip ? 'left-[4%]' : 'right-[4%]'}`}
    >
      {num}
    </span>

    <div className={`relative grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 w-full max-w-6xl mx-auto ${flip ? 'md:[direction:rtl]' : ''}`}>
      <div className="hp-photo [direction:ltr] relative overflow-hidden rounded-sm w-full aspect-[4/3] md:aspect-[4/5] max-h-[38vh] md:max-h-[62vh]">
        <img src={img} alt={alt} className="hp-img w-full h-full object-cover" style={{ transform: 'scale(1.12)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.22))' }} />
        {/* Resplandor de llegada */}
        <div
          className="hp-glow absolute -inset-10 pointer-events-none opacity-0"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(198,164,126,0.25) 0%, transparent 60%)' }}
        />
      </div>

      <div className="[direction:ltr]">
        <span className="hp-num font-serif italic text-4xl md:text-6xl text-[#C6A47E] inline-block">{num}</span>
        <h3 className="hp-title font-serif text-3xl md:text-5xl text-white leading-[1.1] mt-4">{title}</h3>
        <div className="hp-rule w-12 h-px bg-[#A68A64] my-7 md:my-9 origin-left" />
        <p className="hp-text text-white/60 font-light text-base md:text-lg leading-[1.8] max-w-md">{text}</p>
      </div>
    </div>
  </div>
);

const HorizontalProcess = () => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const counterRef = useRef(null);
  const bgRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }

    let ctx;
    let cancelled = false;
    // Los canvas pueden no estar montados aún en un re-render (p. ej. HMR):
    // sin estas guardas, getContext() lanza y tumba el componente entero.
    const dustCanvas = rootRef.current.querySelector('.hp-dust');
    const stopDust = dustCanvas ? startDust(dustCanvas, { density: 26000 }) : () => {};

    // ── Granos 3D del fondo: su avance lo manda el scroll (scrub) ─────
    const bgCanvas = bgRef.current;
    const bgx = bgCanvas ? bgCanvas.getContext('2d') : null;
    const bgImgs = new Array(BG_COUNT);
    const bgState = { frame: 0 };

    const drawBg = () => {
      if (!bgx) return;
      const idx = Math.min(BG_COUNT - 1, Math.max(0, Math.round(bgState.frame)));
      const img = bgImgs[idx];
      if (!img || !img.complete || !img.naturalWidth) return;
      const cw = bgCanvas.width;
      const ch = bgCanvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      bgx.clearRect(0, 0, cw, ch);
      bgx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const resizeBg = () => {
      if (!bgCanvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      bgCanvas.width = window.innerWidth * dpr;
      bgCanvas.height = window.innerHeight * dpr;
      drawBg();
    };

    for (let i = 0; i < BG_COUNT; i++) {
      const im = new Image();
      im.decoding = 'async';
      im.src = bgPath(i);
      im.onload = drawBg;
      bgImgs[i] = im;
    }

    window.addEventListener('resize', resizeBg);
    resizeBg();

    // gsap y ScrollTrigger son CJS: importarlos estáticos rompe el SSR de Astro.
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapMod, stMod]) => {
      if (cancelled) return;
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const track = trackRef.current;
        const nodes = gsap.utils.toArray('.hp-node');

        // La cinta: scroll vertical → viaje horizontal, con un imán suave
        // que la asienta en cada estación del proceso.
        const belt = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
            // inertia:false — siempre a la estación más cercana; con la
            // proyección por velocidad, un flick fuerte salta estaciones.
            snap: { snapTo: 1 / (PANELS - 1), duration: { min: 0.2, max: 0.6 }, ease: 'power1.inOut', inertia: false },
            onUpdate: (self) => {
              const current = Math.min(STEPS.length, Math.max(1, Math.round(self.progress * STEPS.length)));
              if (counterRef.current) counterRef.current.textContent = String(current).padStart(2, '0');
              // Las estaciones de la ruta se encienden al alcanzarlas.
              nodes.forEach((node, i) => {
                const on = self.progress >= i / (PANELS - 1) - 0.02;
                node.style.backgroundColor = on ? GOLD : 'rgba(255,255,255,0.2)';
                node.style.boxShadow = on ? '0 0 12px rgba(198,164,126,0.8)' : 'none';
              });
            },
          },
        });

        // El riel dorado se llena con el viaje.
        gsap.fromTo(
          '.hp-progress',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
          }
        );

        // Coreografía de llegada de cada panel, ligada al avance de la
        // cinta (containerAnimation): nada llega "ya puesto".
        gsap.utils.toArray('.hp-panel').forEach((panel) => {
          const enter = {
            containerAnimation: belt,
            trigger: panel,
            start: 'left 75%',
            end: 'left 15%',
            scrub: true,
          };
          const photo = panel.querySelector('.hp-photo');
          if (photo) {
            gsap.fromTo(
              photo,
              { clipPath: 'inset(0% 78% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { ...enter } }
            );
          }
          const num = panel.querySelector('.hp-num');
          if (num) gsap.fromTo(num, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, ease: 'none', scrollTrigger: { ...enter, end: 'left 45%' } });
          const title = panel.querySelector('.hp-title');
          if (title) gsap.fromTo(title, { autoAlpha: 0, y: 46 }, { autoAlpha: 1, y: 0, ease: 'none', scrollTrigger: { ...enter, start: 'left 70%', end: 'left 38%' } });
          const rule = panel.querySelector('.hp-rule');
          if (rule) gsap.fromTo(rule, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { ...enter, start: 'left 65%', end: 'left 35%' } });
          const text = panel.querySelector('.hp-text');
          if (text) gsap.fromTo(text, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, ease: 'none', scrollTrigger: { ...enter, start: 'left 60%', end: 'left 30%' } });
          const glow = panel.querySelector('.hp-glow');
          if (glow) {
            gsap.fromTo(
              glow,
              { opacity: 0 },
              { opacity: 1, ease: 'none', scrollTrigger: { containerAnimation: belt, trigger: panel, start: 'left 45%', end: 'left 5%', scrub: true } }
            );
          }
          // El número fantasma viaja más lento que la cinta: profundidad.
          const ghost = panel.querySelector('.hp-ghost');
          if (ghost) {
            gsap.fromTo(
              ghost,
              { xPercent: 26 },
              {
                xPercent: -26,
                ease: 'none',
                scrollTrigger: { containerAnimation: belt, trigger: panel, start: 'left right', end: 'right left', scrub: true },
              }
            );
          }
        });

        // Los granos del fondo avanzan y retroceden CON el scroll (scrub),
        // igual que la cinta: el usuario los maneja con el dedo.
        gsap.to(bgState, {
          frame: BG_COUNT - 1,
          ease: 'none',
          onUpdate: drawBg,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Y además derivan en contra de la cinta: parallax de profundidad,
        // muy sutil para que no compita con los paneles.
        gsap.fromTo(
          '.hp-beans-bg',
          { xPercent: 4 },
          {
            xPercent: -4,
            ease: 'none',
            scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
          }
        );

        // La flecha del panel título late invitando al viaje, y la semilla
        // respira igual que en la apertura: el hilo conductor.
        gsap.to('.hp-arrow', { x: 10, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.to('.hp-bean', { scale: 1.12, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '17px 24px' });
      }, rootRef);
    });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resizeBg);
      stopDust();
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
        {/* Granos 3D desenfocados derivando al fondo, detrás de los paneles */}
        <canvas
          ref={bgRef}
          className="hp-beans-bg absolute inset-0 w-full h-full pointer-events-none z-[1]"
          style={{ opacity: 0.5 }}
        />

        {/* Barra superior: sección y contador */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-24 pt-24 md:pt-28 pointer-events-none">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#C6A47E] font-bold">Nuestro modelo</span>
          <span className="text-[11px] tracking-[0.3em] text-white/50 font-bold">
            <span ref={counterRef} className="text-[#C6A47E]">01</span> / {String(STEPS.length).padStart(2, '0')}
          </span>
        </div>

        {/* La cinta — z-[2] para quedar por encima de los granos del fondo */}
        <div ref={trackRef} className="relative z-[2] flex h-full will-change-transform">
          {/* Panel 0 — el título invita al viaje; la semilla del inicio lo recibe */}
          <div className="hp-panel w-screen h-full shrink-0 flex items-center px-8 md:px-24">
            <div className="max-w-3xl">
              <div className="hp-bean mb-10">
                <BeanIcon width={34} height={48} />
              </div>
              <h2 className="font-serif font-light text-4xl md:text-6xl xl:text-7xl text-white leading-[1.08]">
                Un proceso guiado por la <span className="italic text-[#C6A47E]">cooperación.</span>
              </h2>
              <p className="mt-10 text-white/50 font-light text-base md:text-lg flex items-center gap-4">
                Tres momentos entre la tierra y tu taza. Sigue bajando: el proceso avanza contigo.
                <span aria-hidden="true" className="hp-arrow inline-block text-[#C6A47E] text-2xl leading-none">→</span>
              </p>
            </div>
          </div>

          {STEPS.map((s, i) => (
            <StepPanel key={s.num} {...s} flip={i % 2 === 1} />
          ))}
        </div>

        {/* Polvo dorado */}
        <canvas className="hp-dust absolute inset-0 w-full h-full pointer-events-none z-[5]" style={{ mixBlendMode: 'screen', opacity: 0.5 }} />

        {/* Grano de película */}
        <div
          className="absolute inset-0 pointer-events-none z-[6]"
          style={{ backgroundImage: GRAIN, opacity: 0.05, mixBlendMode: 'overlay' }}
        />

        {/* La ruta: riel con estaciones que se encienden */}
        <div className="absolute bottom-10 left-8 right-8 md:left-24 md:right-24 h-px bg-white/10 z-20">
          <div className="hp-progress h-full bg-[#C6A47E] origin-left" style={{ transform: 'scaleX(0)' }} />
          {Array.from({ length: PANELS }, (_, i) => (
            <span
              key={i}
              className="hp-node absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors duration-300"
              style={{ left: `${(i / (PANELS - 1)) * 100}%`, marginLeft: '-4px', backgroundColor: 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalProcess;
