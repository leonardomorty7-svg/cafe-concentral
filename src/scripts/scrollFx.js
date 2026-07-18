import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * scrollFx — el lenguaje de movimiento global del sitio.
 *
 * El mismo ADN que la apertura cinemática, aplicado por atributos:
 *
 *   data-fx="header"    → eyebrow comprime su tracking, el título sube,
 *                         los párrafos acompañan. (El eyebrow se detecta
 *                         por .label-premium o [data-fx-eyebrow].)
 *   data-fx="stagger"   → los hijos directos entran en cascada.
 *   data-fx="rise"      → un elemento suelto sube y aparece.
 *   data-fx="parallax"  → la <img> interior deriva verticalmente con el
 *                         scroll (el contenedor debe tener overflow-hidden;
 *                         no usar sobre imágenes con hover:scale, pelean
 *                         por transform).
 *
 * Anima con gsap.from(): el HTML llega visible del servidor, así que sin
 * JS —o con prefers-reduced-motion— el contenido simplemente se ve.
 * Convive con el sistema legado .reveal (IntersectionObserver) mientras
 * ningún elemento use ambos a la vez.
 */
export function initScrollFx() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-fx="header"]').forEach((el) => {
    const eyebrow = el.querySelector('.label-premium, [data-fx-eyebrow]');
    const title = el.querySelector('h1, h2, h3');
    const rest = el.querySelectorAll('p');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      defaults: { ease: 'power3.out' },
    });
    if (eyebrow) tl.from(eyebrow, { autoAlpha: 0, y: 16, letterSpacing: '0.55em', duration: 0.6 }, 0);
    if (title) tl.from(title, { autoAlpha: 0, y: 44, duration: 0.8 }, 0.12);
    if (rest.length) tl.from(rest, { autoAlpha: 0, y: 26, duration: 0.7, stagger: 0.08 }, 0.3);
  });

  document.querySelectorAll('[data-fx="stagger"]').forEach((el) => {
    gsap.from(el.children, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      autoAlpha: 0,
      y: 56,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
    });
  });

  document.querySelectorAll('[data-fx="rise"]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  document.querySelectorAll('[data-fx="parallax"]').forEach((el) => {
    const img = el.querySelector('img');
    if (!img) return;
    // scale fija >1 para que la deriva nunca deje ver los bordes.
    gsap.fromTo(
      img,
      { yPercent: -6, scale: 1.12 },
      {
        yPercent: 6,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });
}
