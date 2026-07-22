import React, { useEffect, useRef, useState } from 'react';
import { startDust, GRAIN } from '../scripts/atmosphere.js';
import BeanIcon from './BeanIcon.jsx';

/**
 * VerticalProcess — "Un proceso guiado por la cooperación" como un recorrido
 * VERTICAL (scroll hacia abajo, sin secuestrar el scroll), al estilo de la
 * referencia jazeancoffee.com.
 *
 * Un hilo dorado baja conectando los momentos del proceso: se dibuja con el
 * scroll, se teje POR DETRÁS de los óvalos de foto/video y sale por delante,
 * con la semilla de café viajando en su punta. El recorrido termina en los
 * productos ("Cafés con nombre y con historia"), donde el hilo se recoge
 * detrás de las fichas: el resultado final.
 *
 * Fondo espresso profundo + polvo dorado (sin granos 3D). El trazado se
 * construye pasando por el centro de cada óvalo (posiciones estáticas en el
 * documento), así el hilo entrelaza literalmente lo que se cuenta.
 */

const EDITIONS_SHOWN = 3;
const SVGNS = 'http://www.w3.org/2000/svg';

const STEPS = [
  {
    num: '01',
    title: 'Nuestras manos',
    text: 'Más de 3.500 familias del Huila cultivan cada grano con el conocimiento que heredaron de sus padres y el cuidado de quien trabaja su propia tierra.',
    img: '/assets/images/proceso-nuestras-manos.jpg',
    alt: 'Manos empacando una bolsa de Café Coocentral en la planta',
  },
  {
    num: '02',
    title: 'Nuestro cuidado',
    text: 'Seleccionamos, secamos y tostamos cada lote con el mismo rigor con el que fue cultivado. Cuidar el grano es cuidar el trabajo que hay detrás.',
    img: '/assets/images/tostion-cafe.jpg',
    alt: 'Granos de café en la tostadora de Coocentral',
    // Cuando llegue el material del cliente, se reemplaza este archivo (mismo
    // nombre) y listo. Mientras tanto `img` hace de póster.
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

/**
 * VideoLightbox — el video a pantalla completa, con sonido y controles.
 */
const VideoLightbox = ({ src, title, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
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
        className="absolute top-6 right-6 md:top-8 md:right-10 w-12 h-12 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-[#D1AA49] transition-colors duration-300 flex items-center justify-center"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <figure className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <video src={src} className="w-full h-auto max-h-[80vh] rounded-sm bg-black" controls autoPlay playsInline />
        <figcaption className="mt-5 text-center text-[11px] tracking-[0.3em] uppercase text-[#D1AA49] font-bold">{title}</figcaption>
      </figure>
    </div>
  );
};

/**
 * OvalMedia — foto o video enmascarados en una elipse vertical (estilo Jazean).
 * Lleva .vp-weave: es punto de anclaje del hilo y hueco de la máscara.
 */
const OvalMedia = ({ img, video, alt, title, onOpenVideo }) => (
  <div className="vp-weave relative mx-auto w-[clamp(240px,34vw,420px)] aspect-[4/5] rounded-[50%] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
    {video ? (
      <video
        className="vp-video w-full h-full object-cover"
        src={video}
        poster={img}
        aria-hidden="true"
        muted
        loop
        playsInline
        preload="metadata"
      />
    ) : (
      <img src={img} alt={alt} className="w-full h-full object-cover" />
    )}
    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 60%, transparent 55%, rgba(0,0,0,0.35))' }} />

    {video && (
      <button
        type="button"
        onClick={() => onOpenVideo({ src: video, title })}
        aria-label={`Ver el video: ${title}`}
        className="group absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer"
      >
        <span className="relative flex items-center justify-center">
          <span className="hp-pulse-ring absolute w-20 h-20 rounded-full border border-[#D1AA49]/50" style={{ animation: 'hpPulse 2.4s ease-out infinite' }} aria-hidden="true" />
          <span className="relative w-16 h-16 rounded-full border border-[#D1AA49]/80 bg-black/35 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:bg-[#D1AA49] group-hover:scale-110">
            <svg width="15" height="18" viewBox="0 0 15 18" fill="none" aria-hidden="true" className="ml-1">
              <path d="M14 9L0.5 17.2V0.8L14 9z" className="fill-[#D1AA49] transition-colors duration-500 group-hover:fill-[#0B0B0B]" />
            </svg>
          </span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold transition-colors duration-300 group-hover:text-white">Ver el video</span>
      </button>
    )}
  </div>
);

/**
 * Beat — un momento del proceso: óvalo a un lado, texto al otro (alternando).
 */
const Beat = ({ num, title, text, img, video, alt, flip, onOpenVideo }) => (
  <div className="vp-beat relative min-h-screen flex items-center px-6 md:px-16 py-24">
    <div className={`grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20 w-full max-w-6xl mx-auto ${flip ? 'md:[direction:rtl]' : ''}`}>
      <div className="[direction:ltr]">
        <OvalMedia img={img} video={video} alt={alt} title={title} onOpenVideo={onOpenVideo} />
      </div>
      <div className="[direction:ltr] max-w-md">
        <span className="font-serif italic text-5xl md:text-7xl text-[#D1AA49] inline-block">{num}</span>
        <h3 className="font-serif text-3xl md:text-5xl text-white leading-[1.1] mt-4">{title}</h3>
        <div className="w-12 h-px bg-[#D1AA49] my-7 md:my-9" />
        <p className="text-white/60 font-light text-base md:text-lg leading-[1.8]">{text}</p>
      </div>
    </div>
  </div>
);

/**
 * EditionCard — ficha del panel final "llegada a la luz". Lleva .vp-card:
 * el hilo se recoge detrás de ellas.
 */
const EditionCard = ({ id, name, image, tag, notes, index }) => (
  <a href={`/products/${id}`} className="vp-card group block shrink-0 w-[clamp(250px,26vw,350px)]">
    {/* La bolsa flota sobre un fondo tonal cálido: editorial, de catálogo. */}
    <div
      className="relative aspect-[4/5] rounded-sm overflow-hidden mb-7 transition-transform duration-500 ease-out group-hover:-translate-y-2"
      style={{ background: 'linear-gradient(155deg, #FCFAF5 0%, #EFE7D8 100%)' }}
    >
      <span className="absolute top-5 left-6 font-serif italic text-3xl text-[#D1AA49]/60 select-none pointer-events-none">
        {String(index).padStart(2, '0')}
      </span>
      {tag && (
        <span className="absolute top-6 right-6 text-[9px] uppercase tracking-[0.22em] text-[#1A1A1A]/55 font-bold">{tag}</span>
      )}
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-contain p-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        style={{ filter: 'drop-shadow(0 26px 40px rgba(0,0,0,0.22))' }}
      />
      <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#D1AA49] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </div>
    <div className="px-1">
      <h4 className="font-serif text-2xl md:text-[1.6rem] text-[#1A1A1A] leading-tight group-hover:text-[#D1AA49] transition-colors duration-300">{name}</h4>
      {notes && <p className="text-[10px] uppercase tracking-[0.2em] text-[#9A9488] font-bold mt-3">{notes}</p>}
      <span className="inline-flex items-center gap-2 mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A]/15 pb-1 group-hover:border-[#D1AA49] group-hover:text-[#D1AA49] transition-all duration-300">
        Descubrir <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
      </span>
    </div>
  </a>
);

/** Catmull-Rom → polyline suave que pasa por todos los puntos ancla. */
function smoothPath(points) {
  if (points.length < 2) return '';
  const p = [points[0], ...points, points[points.length - 1]];
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} `;
  const SEG = 26;
  for (let i = 1; i < p.length - 2; i++) {
    const p0 = p[i - 1], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2];
    for (let t = 1; t <= SEG; t++) {
      const s = t / SEG;
      const s2 = s * s, s3 = s2 * s;
      const x = 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * s + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * s2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * s3);
      const y = 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * s + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * s2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * s3);
      d += `L${x.toFixed(1)} ${y.toFixed(1)} `;
    }
  }
  return d;
}

const VerticalProcess = ({ editions = [] }) => {
  const shownEditions = editions.slice(0, EDITIONS_SHOWN);
  const rootRef = useRef(null);
  const dustRef = useRef(null);
  const [reduced, setReduced] = useState(false);
  const [openVideo, setOpenVideo] = useState(null);

  // Pausa los previews de video cuando el lightbox está abierto.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll('.vp-video').forEach((v) => {
      if (openVideo) v.pause();
      else {
        const pr = v.play();
        if (pr && pr.catch) pr.catch(() => {});
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

    // Polvo dorado fijo al viewport, visible solo mientras la sección pasa.
    const dustCanvas = dustRef.current;
    const stopDust = dustCanvas ? startDust(dustCanvas, { density: 24000 }) : () => {};

    const threadSvg = rootRef.current.querySelector('.vp-thread');
    const threadTrack = rootRef.current.querySelector('.vp-thread-track');
    const threadLine = rootRef.current.querySelector('.vp-thread-line');
    const threadSeed = rootRef.current.querySelector('.vp-thread-seed');
    const threadMaskBg = rootRef.current.querySelector('.vp-mask-bg');
    const ovalHoles = Array.from(rootRef.current.querySelectorAll('.vp-hole-oval'));
    const cardHoles = Array.from(rootRef.current.querySelectorAll('.vp-hole-card'));
    let threadLen = 0;
    let lastP = 0;

    const buildThread = () => {
      if (!threadSvg || !threadLine || !threadTrack) return;
      const root = rootRef.current;
      const rootRect = root.getBoundingClientRect();
      const W = rootRect.width;
      const H = root.offsetHeight;
      if (!W || !H) return;
      threadSvg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      if (threadMaskBg) {
        threadMaskBg.setAttribute('width', String(W));
        threadMaskBg.setAttribute('height', String(H));
      }

      // Coordenadas (en el sistema de la sección) de cada elemento.
      const toLocal = (el) => {
        const r = el.getBoundingClientRect();
        return {
          cx: r.left + r.width / 2 - rootRect.left,
          cy: r.top + r.height / 2 - rootRect.top,
          rx: r.width / 2,
          ry: r.height / 2,
        };
      };

      const startEl = root.querySelector('.vp-start');
      const ovals = Array.from(root.querySelectorAll('.vp-weave')).map(toLocal);
      const cards = Array.from(root.querySelectorAll('.vp-card')).map(toLocal);

      // Anclas del hilo: arranque (semilla del título) → óvalos → centro de
      // la ficha central (destino final).
      const anchors = [];
      anchors.push(startEl ? { x: toLocal(startEl).cx, y: toLocal(startEl).cy } : { x: W * 0.5, y: 0 });
      ovals.forEach((o) => anchors.push({ x: o.cx, y: o.cy }));
      if (cards.length) {
        const mid = cards[Math.floor(cards.length / 2)];
        anchors.push({ x: mid.cx, y: mid.cy });
      } else {
        anchors.push({ x: W * 0.5, y: H });
      }

      const d = smoothPath(anchors);
      threadTrack.setAttribute('d', d);
      threadLine.setAttribute('d', d);
      threadLen = threadLine.getTotalLength();
      threadLine.style.strokeDasharray = String(threadLen);
      threadLine.style.strokeDashoffset = String(threadLen);

      // Huecos de la máscara: elipses en los óvalos, rects en las fichas.
      ovals.forEach((o, i) => {
        const h = ovalHoles[i];
        if (!h) return;
        h.setAttribute('cx', o.cx.toFixed(1));
        h.setAttribute('cy', o.cy.toFixed(1));
        h.setAttribute('rx', (o.rx + 2).toFixed(1));
        h.setAttribute('ry', (o.ry + 2).toFixed(1));
      });
      cards.forEach((c, i) => {
        const h = cardHoles[i];
        if (!h) return;
        h.setAttribute('x', (c.cx - c.rx - 2).toFixed(1));
        h.setAttribute('y', (c.cy - c.ry - 2).toFixed(1));
        h.setAttribute('width', (c.rx * 2 + 4).toFixed(1));
        h.setAttribute('height', (c.ry * 2 + 4).toFixed(1));
      });
      // El título final teje el hilo por detrás.
      const headEl = root.querySelector('.vp-headmask');
      const headHole = root.querySelector('.vp-hole-head');
      if (headEl && headHole) {
        const h = toLocal(headEl);
        headHole.setAttribute('x', (h.cx - h.rx - 6).toFixed(1));
        headHole.setAttribute('y', (h.cy - h.ry - 2).toFixed(1));
        headHole.setAttribute('width', (h.rx * 2 + 12).toFixed(1));
        headHole.setAttribute('height', (h.ry * 2 + 4).toFixed(1));
      }
    };

    const updateThread = (p) => {
      lastP = p;
      if (!threadLen || !threadLine) return;
      threadLine.style.strokeDashoffset = String(threadLen * (1 - p));
      const pt = threadLine.getPointAtLength(threadLen * p);
      if (threadSeed) threadSeed.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    };

    const onResize = () => {
      buildThread();
      updateThread(lastP);
    };
    window.addEventListener('resize', onResize);

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapMod, stMod]) => {
      if (cancelled) return;
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        buildThread();
        updateThread(0);

        // El hilo se dibuja con el scroll a lo largo de toda la sección.
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: () => { buildThread(); updateThread(lastP); },
          onUpdate: (self) => updateThread(self.progress),
        });

        // El polvo dorado (fijo) solo se ve mientras la sección está en vista.
        if (dustCanvas) {
          gsap.set(dustCanvas, { opacity: 0 });
          ScrollTrigger.create({
            trigger: rootRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            onToggle: (self) => gsap.to(dustCanvas, { opacity: self.isActive ? 0.5 : 0, duration: 0.6 }),
          });
        }

        // Entrada suave de cada óvalo. Solo fundido (autoAlpha): no desplaza
        // el layout, así los anclajes del hilo quedan exactos sobre su centro.
        gsap.utils.toArray('.vp-beat').forEach((beat) => {
          const media = beat.querySelector('.vp-weave');
          if (media) gsap.from(media, { autoAlpha: 0, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: beat, start: 'top 72%', once: true } });
        });

        // Previews de video solo con la sección en vista.
        const videos = gsap.utils.toArray('.vp-video');
        if (videos.length) {
          ScrollTrigger.create({
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => videos.forEach((v) => {
              if (self.isActive) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); }
              else v.pause();
            }),
          });
        }

        // La semilla del título respira, como en la apertura.
        gsap.to('.vp-bean', { scale: 1.12, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '17px 24px' });
      }, rootRef);
    });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      stopDust();
      if (ctx) ctx.revert();
    };
  }, []);

  // ─── Movimiento reducido: momentos en columna, sin hilo ni scrub. ───
  if (reduced) {
    return (
      <>
        <section className="bg-[#160F0B] py-28 px-8" aria-label="Nuestro modelo">
          <div className="max-w-3xl mx-auto space-y-24">
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1]">
              Un proceso guiado por la <span className="italic text-[#D1AA49]">cooperación.</span>
            </h2>
            {STEPS.map((s) => (
              <div key={s.num}>
                <div className="w-[clamp(220px,60vw,360px)] aspect-[4/5] rounded-[50%] overflow-hidden mb-8">
                  <img src={s.img} alt={s.alt} className="w-full h-full object-cover" />
                </div>
                <span className="font-serif italic text-4xl text-[#D1AA49]">{s.num}</span>
                <h3 className="font-serif text-3xl text-white mt-3">{s.title}</h3>
                <p className="text-white/60 font-light mt-5 leading-[1.8]">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
        {shownEditions.length > 0 && (
          <section className="bg-[#F5F1EB] py-28 px-8" aria-label="Nuestras ediciones">
            <div className="max-w-6xl mx-auto text-center">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D1AA49] font-bold mb-5 block">Nuestras ediciones</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-12">
                Cafés con nombre <span className="italic text-[#D1AA49]">y con historia.</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-10">
                {shownEditions.map((p, i) => (
                  <EditionCard key={p.id} index={i + 1} id={p.id} name={p.name} image={p.image} tag={p.tag} notes={(p.tags || []).slice(1).join(' · ')} />
                ))}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }

  return (
    <section ref={rootRef} className="relative bg-[#160F0B]" aria-label="Nuestro modelo">
      {/* Polvo dorado — fijo al viewport, visible solo durante la sección */}
      <canvas ref={dustRef} className="fixed inset-0 w-full h-full pointer-events-none z-[1]" style={{ mixBlendMode: 'screen', opacity: 0 }} />

      {/* Grano de película */}
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{ backgroundImage: GRAIN, opacity: 0.05, mixBlendMode: 'overlay' }} />

      {/* El hilo conductor — un SVG que cubre toda la sección */}
      <svg className="vp-thread absolute inset-0 w-full h-full z-20 pointer-events-none" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <mask id="vpThreadMask" maskUnits="userSpaceOnUse">
            <rect className="vp-mask-bg" x="0" y="0" width="100%" height="100%" fill="white" />
            {STEPS.map((_, i) => (
              <ellipse key={`o${i}`} className="vp-hole-oval" cx="-9999" cy="-9999" rx="0" ry="0" fill="black" />
            ))}
            {shownEditions.map((_, i) => (
              <rect key={`c${i}`} className="vp-hole-card" x="-9999" y="-9999" width="0" height="0" rx="6" fill="black" />
            ))}
            {/* El título final también teje el hilo por detrás */}
            <rect className="vp-hole-head" x="-9999" y="-9999" width="0" height="0" fill="black" />
          </mask>
        </defs>
        <g mask="url(#vpThreadMask)">
          <path className="vp-thread-track" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <path className="vp-thread-line" fill="none" stroke="#D1AA49" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 7px rgba(209,170,73,0.6))' }} />
          <g className="vp-thread-seed">
            <circle r="14" fill="rgba(209,170,73,0.28)" />
            <ellipse rx="7" ry="10" fill="rgba(209,170,73,0.14)" stroke="#D1AA49" strokeWidth="1.7" />
            <path d="M0 -9 C -5.5 -3, -5.5 3, 0 9" fill="none" stroke="#D1AA49" strokeWidth="1.7" />
          </g>
        </g>
      </svg>

      {/* Contenido */}
      <div className="relative z-10">
        {/* Título — arranque del hilo, centrado en el viewport */}
        <div className="min-h-screen flex items-center justify-center px-6 md:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="vp-bean vp-start inline-block mb-10">
              <BeanIcon width={40} height={56} />
            </div>
            <h2 className="font-serif font-light text-4xl md:text-6xl xl:text-7xl text-white leading-[1.08]">
              Un proceso guiado por la <span className="italic text-[#D1AA49]">cooperación.</span>
            </h2>
            <p className="mt-10 text-white/50 font-light text-base md:text-lg max-w-md mx-auto">
              Tres momentos entre la tierra y tu taza. Baja despacio: el hilo te lleva.
            </p>
          </div>
        </div>

        {/* Momentos */}
        {STEPS.map((s, i) => (
          <Beat key={s.num} {...s} flip={i % 2 === 1} onOpenVideo={setOpenVideo} />
        ))}

        {/* Final — "llegada a la luz": los productos, en crema */}
        {shownEditions.length > 0 && (
          <div className="relative min-h-screen flex flex-col items-center justify-center gap-10 md:gap-14 px-6 md:px-16 py-24 bg-[#F5F1EB]">
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D1AA49] font-bold mb-4 block">Nuestras ediciones</span>
              <h2 className="vp-headmask font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-[1.05] md:whitespace-nowrap">
                Cafés con nombre <span className="italic text-[#D1AA49]">y con historia.</span>
              </h2>
            </div>
            <div className="flex justify-center items-start gap-8 md:gap-14">
              {shownEditions.map((p, i) => (
                <EditionCard key={p.id} index={i + 1} id={p.id} name={p.name} image={p.image} tag={p.tag} notes={(p.tags || []).slice(1).join(' · ')} />
              ))}
            </div>
            <a href="/productos" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-1 hover:border-[#D1AA49] hover:text-[#D1AA49] transition-all">
              Ver toda la colección <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>

      {openVideo && <VideoLightbox src={openVideo.src} title={openVideo.title} onClose={() => setOpenVideo(null)} />}

      <style>{`
        @keyframes hpPulse {
          0%   { transform: scale(0.85); opacity: 0.9; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hp-pulse-ring { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default VerticalProcess;
