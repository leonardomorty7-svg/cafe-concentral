import React, { useEffect, useRef, useState } from 'react';
import { startDust, GRAIN } from '../scripts/atmosphere.js';
import BeanIcon from './BeanIcon.jsx';

/**
 * CinematicStory — la apertura del sitio como UNA sola animación continua,
 * dentro de un único pin y un único timeline con scrub de scroll:
 *
 *   granos (secuencia del cliente) → logo → la finca se FUNDE detrás del logo
 *   → oportunidades → (suelta el pin hacia la tienda)
 *
 * Las transiciones entre imágenes son FUNDIDOS CRUZADOS (no deslizamientos):
 * cada capa vive a pantalla completa (inset-0, object-cover) y solo cambia su
 * opacidad, así JAMÁS se expone un borde ni se ve un "recorte". La sensación
 * de descenso la dan el ken-burns (la foto entra un poco desde abajo y hace
 * zoom-out) y el HILO CONDUCTOR ondulado que se dibuja bajando con el scroll,
 * con la semilla de café viajando en su punta — el mismo hilo del proceso.
 */

const GOLD = '#D1AA49';

const FRAME_COUNT = 86;
const framePath = (i) => `/assets/intro/beans/f_${String(i).padStart(3, '0')}.webp`;
const LAST_FRAME = framePath(FRAME_COUNT);

// Cuánto del timeline ocupan los granos antes de que empiecen las fotos.
const BEANS_DUR = 3;

// El titular del sitio abre sobre los granos quietos, antes del primer
// scroll, y se despide cuando arranca el viaje.
const OPENING = {
  eyebrow: 'HUILA, COLOMBIA',
  title: 'Cada taza cuenta una historia',
  italic: 'que transforma vidas.',
};

const BEATS = [
  {
    img: '/assets/images/finca-huila.jpg',
    alt: 'Finca cafetera de Coocentral entre las montañas del Huila',
    eyebrow: 'NUESTRA TIERRA',
    title: 'En las montañas del Huila nacen historias',
    italic: 'que el mundo conoce en una taza.',
  },
  {
    img: '/assets/images/empaque-cafe-especial.jpg',
    alt: 'Manos empacando una bolsa de Café Coocentral en la planta',
    eyebrow: 'QUIÉNES SOMOS',
    title: 'No nacimos para producir café.',
    italic: 'Nacimos para crear oportunidades.',
  },
];


// Viñeta de cine: centro más luminoso, bordes hundidos.
const VIGNETTE =
  'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 95%), linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.45))';

/** Catmull-Rom → polyline suave que pasa por todos los puntos ancla. */
function smoothPath(points) {
  if (points.length < 2) return '';
  const p = [points[0], ...points, points[points.length - 1]];
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} `;
  const SEG = 24;
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

const BeatText = ({ eyebrow, title, italic, Tag = 'h2', withCtas = false }) => (
  <div className="max-w-5xl mx-auto px-6 text-center">
    <p className="cine-eyebrow max-w-none tracking-[0.3em] text-xs uppercase mb-6 text-[#D1AA49] font-bold">{eyebrow}</p>
    <Tag className="font-serif font-light text-white tracking-tight leading-[1.05] text-4xl md:text-6xl xl:text-7xl">
      <span className="cine-title-main block">{title}</span>{' '}
      <span className="cine-title-italic italic text-[#D1AA49] block mt-2">{italic}</span>
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
    // density menor = más partículas; sobre los granos se necesitan más
    // para que los destellos se lean sobre la textura.
    const stopDust = startDust(rootRef.current.querySelector('.cine-dust'), { density: 9000 });

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

    // ── Hilo conductor ondulado (SVG a tamaño del viewport) ───────────
    const threadSvg = rootRef.current.querySelector('.cine-thread');
    const threadTrack = rootRef.current.querySelector('.cine-thread-track');
    const threadLine = rootRef.current.querySelector('.cine-thread-line');
    const threadSeed = rootRef.current.querySelector('.cine-thread-seed');
    let threadLen = 0;
    let lastP = 0;

    const buildThread = () => {
      if (!threadSvg || !threadLine || !threadTrack) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      if (!W || !H) return;
      threadSvg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      // El hilo NACE justo debajo del texto de la finca (~0.56H) y baja RECTO
      // por el centro hasta salir por el borde inferior: así conecta, sin
      // quiebre, con el hilo (también recto y centrado) de la sección de
      // productos que lo retoma abajo. Coherencia arriba↔abajo.
      const anchors = [
        { x: 0.50 * W, y: 0.56 * H },
        { x: 0.50 * W, y: 0.72 * H },
        { x: 0.50 * W, y: 0.88 * H },
        { x: 0.50 * W, y: 1.04 * H },
      ];
      const d = smoothPath(anchors);
      threadTrack.setAttribute('d', d);
      threadLine.setAttribute('d', d);
      threadLen = threadLine.getTotalLength();
      threadLine.style.strokeDasharray = String(threadLen);
      threadLine.style.strokeDashoffset = String(threadLen);
      updateThread(lastP);
    };

    const updateThread = (p) => {
      lastP = p;
      if (!threadLen || !threadLine) return;
      const clamped = Math.max(0, Math.min(1, p));
      threadLine.style.strokeDashoffset = String(threadLen * (1 - clamped));
      const pt = threadLine.getPointAtLength(threadLen * clamped);
      if (threadSeed) threadSeed.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    };

    const onResize = () => {
      resizeBeans();
      buildThread();
    };
    window.addEventListener('resize', onResize);
    resizeBeans();

    // gsap y ScrollTrigger son CJS: importarlos estáticos rompe el SSR de Astro.
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapMod, stMod]) => {
      if (cancelled) return;
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        buildThread();

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: () => buildThread(),
          },
        });

        const beats = gsap.utils.toArray('.cine-beat');
        const texts = gsap.utils.toArray('.cine-text');
        const dots = gsap.utils.toArray('.cine-dot');

        // Las fotos empiezan invisibles y a pantalla completa (inset-0). Con
        // fundido cruzado nunca se mueve la capa entera → nunca hay recorte.
        gsap.set(beats, { autoAlpha: 0 });

        // ── Fase 1: los granos se scrubbean hasta el logo ──────────────
        tl.to(beans, { frame: FRAME_COUNT - 1, duration: BEANS_DUR, onUpdate: drawBeans }, 0);
        tl.to('.cine-hint', { autoAlpha: 0, duration: 0.5 }, 0.15);

        // El titular abre visible sobre los granos quietos (sin fade-in: ya
        // está ahí antes del primer scroll) y se despide al arrancar el viaje.
        tl.to('.cine-opening', { autoAlpha: 0, y: -40, duration: 0.7, ease: 'power2.in' }, 0.9);

        // ── Fase 2: las fotos se FUNDEN una sobre otra (cross-fade) ─────
        // Momentos de cada beat, con aire entre ellos.
        const AT = [BEANS_DUR, BEANS_DUR + 1.8];
        const FADE = 0.8;

        beats.forEach((beat, i) => {
          const at = AT[i];
          const img = beat.querySelector('img');

          // Fundido de la foto (capa completa: sin exponer bordes).
          tl.to(beat, { autoAlpha: 1, duration: FADE, ease: 'power1.inOut' }, at);

          // Ken-burns + leve deriva desde abajo → sensación de descenso sin
          // deslizar la capa. El drift termina pronto, mientras la escala
          // sigue >1 (headroom del object-cover), así jamás asoma un borde.
          tl.fromTo(img, { scale: 1.14 }, { scale: 1.0, duration: 3.2, ease: 'power1.out' }, at);
          tl.fromTo(img, { yPercent: 4 }, { yPercent: 0, duration: FADE + 0.3, ease: 'power2.out' }, at);

          // La primera foto se funde a la vez que se disuelve el canvas de
          // granos (con el logo): un dissolve limpio granos → finca.
          if (i === 0) {
            tl.to('.cine-beans', { autoAlpha: 0, duration: FADE, ease: 'power1.inOut' }, at);
          }

          // La frase entra coreografiada: eyebrow comprimiendo su tracking,
          // luego la línea principal y por último la itálica.
          const text = texts[i];
          tl.fromTo(text, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, at + 0.5);
          tl.fromTo(
            text.querySelector('.cine-eyebrow'),
            { letterSpacing: '0.7em', autoAlpha: 0, y: 20 },
            { letterSpacing: '0.3em', autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
            at + 0.5
          );
          tl.fromTo(
            text.querySelector('.cine-title-main'),
            { y: 44, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
            at + 0.58
          );
          tl.fromTo(
            text.querySelector('.cine-title-italic'),
            { y: 52, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
            at + 0.66
          );
          if (i === beats.length - 1) {
            tl.fromTo(
              '.cine-ctas',
              { y: 30, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.25, ease: 'power2.out' },
              at + 0.85
            );
          } else {
            // La frase saliente se despide antes de que entre la siguiente foto.
            tl.to(text, { autoAlpha: 0, y: -44, duration: 0.3, ease: 'power2.in' }, AT[i + 1] - 0.35);
          }

          // Punto de progreso del beat activo.
          tl.to(dots[i], { backgroundColor: GOLD, scale: 1.7, duration: 0.12 }, at + 0.5);
          if (i > 0) {
            tl.to(dots[i - 1], { backgroundColor: 'rgba(255,255,255,0.25)', scale: 1, duration: 0.12 }, at + 0.5);
          }
        });

        // El polvo brilla pleno sobre los granos y baja un poco sobre las fotos.
        tl.to('.cine-dust', { opacity: 0.4, duration: 0.5 }, BEANS_DUR);

        // Los puntos aparecen cuando empiezan las fotos.
        tl.to('.cine-dots', { autoAlpha: 1, duration: 0.2 }, BEANS_DUR + 0.1);

        // Cola para sostener el beat final antes de soltar el pin.
        tl.to({}, { duration: 0.5 });

        // La semilla del aviso de scroll respira.
        gsap.to('.cine-seed', { y: 6, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      }, rootRef);
    });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      stopDust();
      if (ctx) ctx.revert();
    };
  }, []);

  // Sin animaciones: el titular de apertura sobre la finca, como hero estático.
  if (reduced) {
    const b = BEATS[0];
    return (
      <section className="relative min-h-screen flex items-center bg-black" aria-label="Café Coocentral">
        <img src={b.img} alt={b.alt} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: VIGNETTE }} />
        <div className="relative z-10 w-full py-32">
          <BeatText {...OPENING} Tag="h1" withCtas />
        </div>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="relative bg-black" style={{ height: '440vh' }} aria-label="Café Coocentral">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Fotos: a pantalla completa, se FUNDEN una sobre otra (sin recortes) */}
        {BEATS.map((b) => (
          <div
            key={b.img}
            className="cine-beat absolute inset-0 z-[8] will-change-[opacity]"
            style={{ opacity: 0 }}
          >
            <img src={b.img} alt={b.alt} className="w-full h-full object-cover will-change-transform" />
            <div className="absolute inset-0" style={{ background: VIGNETTE }} />
          </div>
        ))}

        {/* Polvo dorado: por encima de todo (granos incluidos), z-[9], para
            que los destellos mágicos acompañen también la entrada de los granos. */}
        <canvas className="cine-dust absolute inset-0 w-full h-full pointer-events-none z-[9]" style={{ mixBlendMode: 'screen', opacity: 0.55 }} />

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

        {/* El aviso de scroll: la semilla dorada al pie, se despide al arrancar. */}
        <div className="cine-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-[10]">
          <span className="cine-seed inline-block mb-3">
            <BeanIcon width={22} height={31} />
          </span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-bold">Sigue el hilo</span>
          <div className="mt-3 w-px h-12" style={{ background: 'linear-gradient(to bottom, #D1AA49, transparent)' }} />
        </div>

        {/* Titular de apertura: sobre los granos, visible antes de scrollear */}
        <div className="cine-opening absolute inset-0 flex items-center z-10">
          <div className="w-full">
            <BeatText {...OPENING} Tag="h1" />
          </div>
        </div>

        {/* Frases: una por beat */}
        {BEATS.map((b, i) => (
          <div key={b.eyebrow} className="cine-text absolute inset-0 flex items-center opacity-0 z-10">
            <div className="w-full">
              <BeatText {...b} Tag="h2" withCtas={i === BEATS.length - 1} />
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
