import React from 'react';

const ProcessSection = () => {
  return (
    <section className="section-container border-t border-base-black/5 bg-base-white/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
            <img 
              src="/assets/images/huila-farmers.jpg"
              alt="Caficultores del Huila cultivando café"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-16 -right-16 hidden xl:block w-80 aspect-square rounded-sm overflow-hidden shadow-2xl border-[16px] border-neutral-cream">
            <img 
              src="/assets/images/coffee-processing.png"
              alt="Selección y secado de café en Huila"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:pl-16">
          <span className="label-premium">Nuestro Modelo</span>
          <h2 className="mb-14 leading-[1.1]">Un proceso guiado por la <span className="italic-serif text-accent-gold">cooperación.</span></h2>
          
          <div className="space-y-16">
            {[
              {
                num: '01',
                title: 'Origen Colectivo',
                desc: 'Más de 3.500 familias caficultoras del Huila cultivan cada grano con tradición, conocimiento y compromiso con la calidad.'
              },
              {
                num: '02',
                title: 'Transformación y Control',
                desc: 'Procesos de selección, secado, control de calidad y tostión garantizan consistencia y perfil sensorial en cada lote.'
              },
              {
                num: '03',
                title: 'Conexión Global',
                desc: 'Llevamos el café del Huila a mercados internacionales, conectando origen y experiencia en cada taza.'
              }
            ].map((step, index) => (
              <div key={index} className="flex gap-12 group">
                <div className="flex-shrink-0 text-5xl font-serif text-accent-gold/20 group-hover:text-accent-gold transition-colors duration-700 italic">
                  {step.num}
                </div>
                <div className="pt-3">
                  <h4 className="text-2xl font-serif mb-4 group-hover:text-accent-gold transition-colors duration-500">{step.title}</h4>
                  <p className="text-base-muted text-base leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
