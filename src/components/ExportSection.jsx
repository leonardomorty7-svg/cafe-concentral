import React from 'react';

const ExportSection = () => {
  const services = [
    {
      titleLine1: 'Exportación',
      titleLine2: 'Internacional',
      desc: 'Llevamos café del Huila a mercados globales con estándares de calidad consistentes.'
    },
    {
      titleLine1: 'Red de',
      titleLine2: 'Caficultores',
      desc: 'Más de 3.500 familias que cultivan tradición, sostenibilidad y excelencia.'
    },
    {
      titleLine1: 'Calidad',
      titleLine2: 'Certificada',
      desc: 'Procesos controlados que garantizan trazabilidad y perfil sensorial único.'
    },
    {
      titleLine1: 'Comercialización',
      titleLine2: 'Especializada',
      desc: 'Conectamos origen y mercado con una cadena de valor sólida.'
    }
  ];

  return (
    <section className="bg-base-black py-40 sm:py-56 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-gold/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent-gold/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-28">
          <span className="label-premium text-accent-gold">Global Presence</span>
          <h2 className="text-base-white mb-10 leading-tight">
            <span className="block md:whitespace-nowrap">Llevamos lo mejor de Colombia</span>
            <span className="block italic-serif text-accent-gold">al mundo entero.</span>
          </h2>
          <p className="text-neutral-warm/50 text-xl font-light leading-relaxed max-w-[480px]">
            Somos aliados estratégicos para distribuidores, cafeterías de especialidad y hoteles que buscan excelencia y consistencia en cada grano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-12 border border-base-white/5 rounded-sm hover:border-accent-gold/40 hover:bg-base-white/[0.02] transition-all duration-700"
            >
              <h4 className="text-base-white font-serif text-2xl mb-6 group-hover:text-accent-gold transition-colors duration-300">
                <span className="block">{service.titleLine1}</span>
                <span className="block">{service.titleLine2}</span>
              </h4>
              <p className="text-neutral-warm/30 text-sm font-light leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-28">
          <a 
            href="/exportacion" 
            className="inline-flex items-center gap-6 text-accent-gold font-bold uppercase tracking-[0.3em] text-[12px] group"
          >
            <span className="border-b border-accent-gold/20 pb-2 group-hover:border-accent-gold transition-all duration-500">
              Solicitar Información de Exportación
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
