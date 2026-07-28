import React from 'react';

/**
 * TeamSection — "Las personas detrás de cada taza": carrusel infinito.
 *
 * Decisiones de diseño (pedido del cliente):
 *  · CINCO personas, no seis: la cadena queda completa y sin relleno —
 *    cultivo → beneficio → tostión → catación → calidad.
 *  · Cards MÁS ANCHAS, no más altas: el ancho sube y la foto pasa de retrato
 *    (3/4) a apaisada (4/3), así el nombre entra SIEMPRE en un solo renglón.
 *  · Cada persona lleva su LinkedIn.
 *
 * `layout` deja preparada la variante HORIZONTAL (foto al lado del texto),
 * que el cliente quiere usar más adelante: <TeamSection layout="horizontal" />
 */

const TEAM = [
  {
    id: 'maria-fernanda',
    name: 'María Fernanda Rojas',
    role: 'Caficultora Asociada',
    description: 'Acompaña el cultivo del café desde la finca, preservando la tradición y la calidad que nos distinguen.',
    // TODO: reemplazar por los perfiles reales cuando el cliente los envíe.
    linkedin: null,
  },
  {
    id: 'luis-fernando',
    name: 'Luis Fernando Ramírez',
    role: 'Procesos de Beneficio',
    description: 'Cuida cada detalle del lavado y secado del grano, etapas críticas para la pureza de nuestro café.',
    linkedin: null,
  },
  {
    id: 'carlos-andres',
    name: 'Carlos Andrés Gómez',
    role: 'Maestro Tostador',
    description: 'Supervisa el proceso de tostión para resaltar el perfil sensorial de cada origen.',
    linkedin: null,
  },
  {
    id: 'sandra-milena',
    name: 'Sandra Milena Cruz',
    role: 'Catadora de Café',
    description: 'Evalúa cada taza para asegurar que los perfiles aromáticos cumplan nuestros estándares.',
    linkedin: null,
  },
  {
    id: 'diana-marcela',
    name: 'Diana Marcela Ortiz',
    role: 'Control de Calidad',
    description: 'Verifica cada lote antes del empaque para garantizar consistencia y excelencia.',
    linkedin: null,
  },
];

const LinkedInIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.4 8.75 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2.05-3.3-2.06 0-2.37 1.57-2.37 3.2V21h-4z" />
  </svg>
);

/** Enlace a LinkedIn — se muestra siempre (pedido del cliente). */
const LinkedInLink = ({ href, name }) => (
  <a
    href={href || '#'}
    target={href ? '_blank' : undefined}
    rel={href ? 'noopener noreferrer' : undefined}
    aria-label={`Perfil de ${name} en LinkedIn`}
    onClick={(e) => { if (!href) e.preventDefault(); }}
    className="shrink-0 w-9 h-9 rounded-full border border-black/10 text-[#6B6B6B] flex items-center justify-center transition-all duration-300 hover:bg-[#D1AA49] hover:border-[#D1AA49] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1AA49]"
  >
    <LinkedInIcon className="w-4 h-4" />
  </a>
);

const TeamCard = ({ member, horizontal }) => {
  const { name, role, description, id, linkedin } = member;

  // Nombre SIEMPRE en un renglón: el ancho de la card lo permite y el
  // truncate evita que un nombre muy largo rompa la composición.
  const nameEl = (
    <h3 className="font-serif text-lg sm:text-xl md:text-[1.4rem] text-[#1A1A1A] leading-tight whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-500 group-hover/card:text-[#D1AA49]">
      {name}
    </h3>
  );

  const meta = (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          {nameEl}
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#D1AA49] font-bold mt-2 block">
            {role}
          </span>
        </div>
        <LinkedInLink href={linkedin} name={name} />
      </div>
      <p className="mt-4 text-[#6B6B6B] font-light leading-[1.7] text-sm">
        {description}
      </p>
    </>
  );

  const cardBase =
    'shrink-0 bg-[#FDFCFB] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] group/card transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:border-[#D1AA49]/30';

  // ── Variante HORIZONTAL: foto al lado del texto ──────────────────────
  if (horizontal) {
    return (
      <div className={`${cardBase} w-[340px] sm:w-[440px] md:w-[520px] p-5 md:p-6 flex items-center gap-5`}>
        <div className="w-[38%] shrink-0 aspect-square overflow-hidden bg-black/5 rounded-sm">
          <img
            src={`/assets/team/${id}.jpg`}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">{meta}</div>
      </div>
    );
  }

  // ── Variante VERTICAL (por defecto): más ANCHA y menos alta ──────────
  return (
    <div className={`${cardBase} w-[330px] sm:w-[360px] md:w-[400px] p-6 md:p-8 flex flex-col`}>
      <div className="w-full aspect-[4/3] mb-6 overflow-hidden bg-black/5 rounded-sm">
        <img
          src={`/assets/team/${id}.jpg`}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
        />
      </div>
      {meta}
    </div>
  );
};

const TeamSection = ({ layout = 'vertical' }) => {
  const horizontal = layout === 'horizontal';

  return (
    <section className="bg-white py-24 md:py-40 overflow-hidden">
      <style>{`
        @keyframes scroll-carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-scroll-carousel {
          animation: scroll-carousel 42s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-carousel { animation: none; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-10">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D1AA49] font-bold mb-5 block">
              QUIENES LO HACEN POSIBLE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-serif text-[#1A1A1A] leading-tight">
              Las personas detrás de cada taza.
            </h2>
          </div>
          <p className="text-[#6B6B6B] md:max-w-sm font-light text-base md:text-lg lg:text-xl leading-[1.7]">
            Cada taza de Café Coocentral representa el trabajo coordinado de personas que cultivan, seleccionan, tuestan y acompañan cada etapa del proceso con compromiso y conocimiento.
          </p>
        </div>
      </div>

      {/* Carrusel infinito: dos juegos idénticos en fila */}
      <div
        className="w-full relative group"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
      >
        <div className="flex gap-6 md:gap-8 w-max animate-scroll-carousel group-hover:[animation-play-state:paused] px-6">
          {[0, 1].map((set) => (
            <div key={`set-${set}`} className="flex gap-6 md:gap-8 shrink-0" aria-hidden={set === 1}>
              {TEAM.map((member) => (
                <TeamCard key={`${set}-${member.id}`} member={member} horizontal={horizontal} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
