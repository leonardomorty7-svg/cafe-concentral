import React from 'react';

const TEAM = [
  {
    id: 'maria-fernanda',
    name: 'María Fernanda Rojas',
    role: 'Caficultora Asociada',
    description: 'Acompaña el cultivo del café desde la finca, preservando la tradición y la calidad que distinguen a Café Cocentral.',
  },
  {
    id: 'carlos-andres',
    name: 'Carlos Andrés Gómez',
    role: 'Maestro Tostador',
    description: 'Supervisa el proceso de tostión para resaltar el perfil sensorial de cada origen.',
  },
  {
    id: 'diana-marcela',
    name: 'Diana Marcela Ortiz',
    role: 'Control de Calidad',
    description: 'Verifica cada lote antes del empaque para garantizar consistencia y excelencia.',
  },
  {
    id: 'julian-herrera',
    name: 'Julián Herrera',
    role: 'Coordinador Logístico',
    description: 'Gestiona que cada café llegue oportunamente desde la cooperativa hasta nuestros clientes.',
  },
  {
    id: 'sandra-milena',
    name: 'Sandra Milena Cruz',
    role: 'Catadora de Café',
    description: 'Evalúa meticulosamente cada taza para asegurar que los perfiles aromáticos cumplan con nuestros estándares premium.',
  },
  {
    id: 'luis-fernando',
    name: 'Luis Fernando Ramírez',
    role: 'Procesos de Beneficio',
    description: 'Cuida cada detalle del lavado y secado del grano, etapas críticas para la pureza y limpieza de nuestro café.',
  },
];

const TeamSection = () => {
  return (
    <section className="bg-white py-32 md:py-48 overflow-hidden">
      <style>{`
        @keyframes scroll-carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-scroll-carousel {
          animation: scroll-carousel 45s linear infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D1AA49] font-bold mb-6 block">
              QUIENES LO HACEN POSIBLE
            </span>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-serif text-[#1A1A1A] leading-tight">
              Las personas detrás de cada taza.
            </h2>
          </div>
          <p className="text-[#6B6B6B] max-w-sm font-light text-lg md:text-xl leading-[1.7]">
            Cada taza de Café Cocentral representa el trabajo coordinado de personas que cultivan, seleccionan, tuestan y acompañan cada etapa del proceso con compromiso y conocimiento.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div 
        className="w-full relative group"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
      >
        <div className="flex gap-8 w-max animate-scroll-carousel group-hover:[animation-play-state:paused] px-6">
          {/* First Set */}
          <div className="flex gap-8 shrink-0">
            {TEAM.map((member, i) => (
              <div 
                key={`set1-${i}`} 
                className="w-[300px] shrink-0 bg-[#FDFCFB] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 flex flex-col group/card transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:border-[#D1AA49]/30"
              >
                <div className="w-full aspect-[3/4] mb-8 overflow-hidden bg-black/5">
                  <img 
                    src={`/assets/team/${member.id}.jpg`} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" 
                  />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] transition-colors duration-500 group-hover/card:text-[#D1AA49]">
                  {member.name}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#D1AA49] font-bold mt-4 block">
                  {member.role}
                </span>
                <p className="mt-5 text-[#6B6B6B] font-light leading-[1.7] text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>

          {/* Duplicate Set for Infinite Scroll */}
          <div className="flex gap-8 shrink-0">
            {TEAM.map((member, i) => (
              <div 
                key={`set2-${i}`} 
                className="w-[300px] shrink-0 bg-[#FDFCFB] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 flex flex-col group/card transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:border-[#D1AA49]/30"
              >
                <div className="w-full aspect-[3/4] mb-8 overflow-hidden bg-black/5">
                  <img 
                    src={`/assets/team/${member.id}.jpg`} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" 
                  />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] transition-colors duration-500 group-hover/card:text-[#D1AA49]">
                  {member.name}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#D1AA49] font-bold mt-4 block">
                  {member.role}
                </span>
                <p className="mt-5 text-[#6B6B6B] font-light leading-[1.7] text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
