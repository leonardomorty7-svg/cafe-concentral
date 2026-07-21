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
    // Ranura de video del panel: cuando llegue el material del cliente,
    // basta con reemplazar este archivo (mismo nombre) y listo. Mientras
    // tanto `img` hace de póster, así el panel nunca se ve vacío.
    video: '/assets/process/proceso-cuidado.mp4',
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

/**
 * VideoLightbox — el video a pantalla completa, con sonido y controles.
 *
 * Se renderiza como hijo directo de <section>, FUERA de la cinta: esa lleva
 * un transform de GSAP, y un position:fixed dentro de un ancestro
 * transformado se posiciona respecto de ese ancestro y no del viewport.
 * (Un portal a <body> también serviría, pero importar react-dom en una isla
 * de Astro rompe la hidratación del componente.)
 */
const VideoLightbox = ({ src, title, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    // Bloquea el scroll de fondo sin tocar overflow del body: cambiarlo
    // provoca salto de layout y obliga a ScrollTrigger a recalcular.
    const block = (e) => e.preventDefault();
    document.addEventListener('keydown', onKey);
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10"
      style={{ background: 'rgba(6,6,6,0.94)', backdropFilter: 'blur(6px)' }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar el video"
        className="absolute top-6 right-6 md:top-8 md:right-10 w-12 h-12 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-[#C6A47E] transition-colors duration-300 flex items-center justify-center"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <figure className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <video
          src={src}
          className="w-full h-auto max-h-[80vh] rounded-sm bg-black"
          controls
          autoPlay
          playsInline
        />
        <figcaption className="mt-5 text-center text-[11px] tracking-[0.3em] uppercase text-[#C6A47E] font-bold">
          {title}
        </figcaption>
      </figure>
    </div>
  );
};

const StepPanel = ({ num, title, text, img, alt, video, flip, onOpenVideo }) => (
  <div className="hp-panel relative w-screen h-full shrink-0 flex items-center px-8 md:px-24 pt-28 pb-24 md:py-0">
    {/* Número fantasma de fondo, con parallax propio */}
    <span
      aria-hidden="true"
      className={`hp-ghost absolute top-1/2 -translate-y-1/2 font-serif italic leading-none select-none pointer-events-none text-white/[0.05] text-[42vw] md:text-[26vw] ${flip ? 'left-[4%]' : 'right-[4%]'}`}
    >
      {num}
    </span>

    <div className={`relative grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 w-full max-w-6xl mx-auto ${flip ? 'md:[direction:rtl]' : ''}`}>
      {/* El panel con video usa 16:9 — el formato propio del video, que lo
          hace reconocible entre los paneles de foto (verticales). */}
      <div
        className={`hp-photo [direction:ltr] relative overflow-hidden rounded-sm w-full ${
          video ? 'aspect-video max-h-[52vh]' : 'aspect-[4/3] md:aspect-[4/5] max-h-[38vh] md:max-h-[62vh]'
        }`}
      >
        {video ? (
          // Preview silencioso en bucle. Sin autoplay en el atributo:
          // play/pause lo maneja el scroll, para no gastar recursos con la
          // sección fuera de pantalla.
          <video
            className="hp-img hp-video w-full h-full object-cover"
            style={{ transform: 'scale(1.12)' }}
            src={video}
            poster={img}
            aria-hidden="true"
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img src={img} alt={alt} className="hp-img w-full h-full object-cover" style={{ transform: 'scale(1.12)' }} />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.22))' }} />

        {/* Invitación a ver el video completo */}
        {video && (
          <button
            type="button"
            onClick={() => onOpenVideo({ src: video, title })}
            aria-label={`Ver el video: ${title}`}
            className="hp-play group absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer"
          >
            <span className="relative flex items-center justify-center">
              {/* Anillo que respira, para que el play se note */}
              <span
                className="absolute w-20 h-20 rounded-full border border-[#C6A47E]/50"
                style={{ animation: 'hpPulse 2.4s ease-out infinite' }}
                aria-hidden="true"
              />
              <span className="relative w-16 h-16 rounded-full border border-[#C6A47E]/80 bg-black/35 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:bg-[#C6A47E] group-hover:scale-110">
                <svg width="15" height="18" viewBox="0 0 15 18" fill="none" aria-hidden="true" className="ml-1">
                  <path
                    d="M14 9L0.5 17.2V0.8L14 9z"
                    className="fill-[#C6A47E] transition-colors duration-500 group-hover:fill-[#0B0B0B]"
                  />
                </svg>
              </span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold transition-colors duration-300 group-hover:text-white">
              Ver el video
            </span>
          </button>
        )}

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
  const [openVideo, setOpenVideo] = useState(null);

  // Con el lightbox abierto, el preview en bucle del panel se pausa: no
  // tiene sentido gastar decodificación en un video tapado.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const previews = root.querySelectorAll('.hp-video');
    previews.forEach((v) => {
      if (openVideo) {
        v.pause();
      } else {
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      }
    });
  }, [openVideo]);

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

        // Los videos de los paneles solo corren con la sección en pantalla:
        // fuera de vista se pausan para no gastar CPU ni batería.
        const videos = gsap.utils.toArray('.hp-video');
        if (videos.length) {
          ScrollTrigger.create({
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => {
              videos.forEach((v) => {
                if (self.isActive) {
                  // play() puede ser rechazado por la política de autoplay;
                  // si pasa, queda el póster, que es la foto del panel.
                  const p = v.play();
                  if (p && p.catch) p.catch(() => {});
                } else {
                  v.pause();
                }
              });
            },
          });
        }

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
          style={{ opacity: 0.75 }}
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
            <StepPanel key={s.num} {...s} flip={i % 2 === 1} onOpenVideo={setOpenVideo} />
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

      {openVideo && (
        <VideoLightbox src={openVideo.src} title={openVideo.title} onClose={() => setOpenVideo(null)} />
      )}

      <style>{`
        @keyframes hpPulse {
          0%   { transform: scale(0.85); opacity: 0.9; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hp-play span[style*="hpPulse"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default HorizontalProcess;
