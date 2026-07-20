import React, { useEffect, useRef, useState } from 'react';

/**
 * BeansIntro — la apertura del sitio con scrub de scroll.
 *
 * Reproduce, controlada por el scroll, la secuencia renderizada por el
 * cliente en After Effects (granos que se asientan y se apartan para
 * revelar el logo dorado). Es una secuencia de fotogramas WebP dibujada
 * en canvas con object-cover — la técnica de scrubbing tipo Apple:
 * suave y liviana, sin depender de la decodificación de un <video>.
 *
 * Entrega el relevo a CinematicStory: termina en el logo sobre el hueco
 * oscuro, justo de donde florece la primera fotografía.
 */

const FRAME_COUNT = 76;
const framePath = (i) => `/assets/intro/beans/f_${String(i).padStart(3, '0')}.webp`;
const LAST_FRAME = framePath(FRAME_COUNT);

const BeansIntro = () => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }

    const canvas = canvasRef.current;
    const cx = canvas.getContext('2d');
    const images = new Array(FRAME_COUNT);
    const state = { frame: 0 };
    let ctx;
    let cancelled = false;

    const draw = () => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(state.frame)));
      const img = images[idx];
      if (!img || !img.complete || !img.naturalWidth) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      cx.clearRect(0, 0, cw, ch);
      cx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      draw();
    };

    // Precarga: el primer y el último frame primero (estados de reposo),
    // el resto en orden. draw() se dispara al llegar cada uno visible.
    const order = [0, FRAME_COUNT - 1, ...Array.from({ length: FRAME_COUNT }, (_, i) => i)];
    order.forEach((i) => {
      if (images[i]) return;
      const im = new Image();
      im.decoding = 'async';
      im.src = framePath(i + 1);
      im.onload = draw;
      images[i] = im;
    });

    window.addEventListener('resize', resize);
    resize();

    // gsap/ScrollTrigger son CJS: import dinámico o rompe el SSR de Astro.
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapMod, stMod]) => {
      if (cancelled) return;
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.to(state, {
          frame: FRAME_COUNT - 1,
          ease: 'none',
          onUpdate: draw,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // El aviso de scroll se desvanece apenas empieza el viaje.
        gsap.to('.beans-hint', {
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: '10% top', scrub: true },
        });
      }, rootRef);
    });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resize);
      if (ctx) ctx.revert();
    };
  }, []);

  // Sin animación: el logo final como apertura estática.
  if (reduced) {
    return (
      <section className="relative h-screen bg-black flex items-center justify-center" aria-label="Café Coocentral">
        <img src={LAST_FRAME} alt="Café Coocentral" className="w-full h-full object-cover" />
      </section>
    );
  }

  return (
    <section ref={rootRef} className="relative bg-black" style={{ height: '240vh' }} aria-label="Café Coocentral">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full" />
        <div className="beans-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-bold">SCROLL</span>
          <div className="mt-4 w-px h-10 bg-white/25" />
        </div>
      </div>
    </section>
  );
};

export default BeansIntro;
