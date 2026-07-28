import React, { useEffect, useRef } from 'react';

/**
 * ColombianoBadge — sello circular que gira ("100% COLOMBIANO").
 *
 * El texto debe CERRAR el círculo completo: antes iban 2 repeticiones que
 * ocupaban ~70% de la circunferencia y dejaban un hueco visible.
 *
 * ⚠️ `textLength` sobre <textPath> NO lo respeta Chrome (queda ignorado), así
 * que el ajuste se hace midiendo: se toma la longitud natural del texto y se
 * reparte el sobrante en el interletrado —  letterSpacing = (2πr − ancho) / nº
 * de caracteres — de modo que las 3 repeticiones den la vuelta EXACTA, sin
 * hueco ni solape. Se recalcula cuando Gotham termina de cargar (una fuente
 * distinta cambia el ancho del texto) y las medidas van en unidades del
 * viewBox, así que no dependen del tamaño en pantalla.
 */

const R = 95;                          // radio del trazado circular
const CIRCUMFERENCE = 2 * Math.PI * R; // 596.9 — longitud a rellenar
const LABEL = '100% COLOMBIANO • ';
const REPS = 3;
const TEXT = LABEL.repeat(REPS);

const ColombianoBadge = ({ className = '' }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Devuelve false si no se pudo medir (el sello está oculto: en móvil el
    // contenedor es `hidden`, y sin caja de layout la medida da 0).
    const fit = () => {
      if (!el.isConnected || typeof el.getComputedTextLength !== 'function') return false;
      const prev = el.getAttribute('letter-spacing');
      // Medir sin interletrado para partir siempre del ancho natural.
      el.setAttribute('letter-spacing', '0');
      const natural = el.getComputedTextLength();
      if (!natural) {
        if (prev !== null) el.setAttribute('letter-spacing', prev); // no romper lo ya ajustado
        return false;
      }
      el.setAttribute('letter-spacing', String((CIRCUMFERENCE - natural) / TEXT.length));
      return true;
    };

    fit();
    // Gotham es una fuente local: al cargar cambian los anchos → re-ajustar.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit).catch(() => {});
    }
    // Si al montar estaba oculto (viewport < lg), se ajusta al aparecer.
    const onResize = () => fit();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className={`hidden lg:block z-0 pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 240 240"
        className="w-[190px] h-[190px] animate-spin-slow md:w-[210px] md:h-[210px]"
        aria-hidden="true"
      >
        <defs>
          <path
            id="circlePath"
            d={`M 120, 120
               m -${R}, 0
               a ${R},${R} 0 1,1 ${R * 2},0
               a ${R},${R} 0 1,1 -${R * 2},0`}
          />
        </defs>
        {/* letterSpacing inicial = el valor que cierra el círculo con Gotham a
            13px (2πr − ancho natural) / nº de caracteres. El efecto lo afina. */}
        <text ref={textRef} fontSize="13" letterSpacing="2.82" fill="#D1AA49" fontWeight="600" opacity="0.75">
          <textPath href="#circlePath">{TEXT}</textPath>
        </text>
      </svg>
    </div>
  );
};

export default ColombianoBadge;
