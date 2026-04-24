import React from 'react';

const ProcessSection = () => {
  return (
    <section className="section-container border-t border-base-black/5 bg-base-white/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=2070&auto=format&fit=crop" 
              alt="Manual harvest" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-16 -right-16 hidden xl:block w-80 aspect-square rounded-sm overflow-hidden shadow-2xl border-[16px] border-neutral-cream">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
              alt="Quality control" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:pl-16">
          <span className="label-premium">Nuestro Método</span>
          <h2 className="mb-14 leading-[1.1]">Un proceso guiado por la <span className="italic-serif text-accent-gold">paciencia.</span></h2>
          
          <div className="space-y-16">
            {[
              {
                num: '01',
                title: 'Recolección Manual',
                desc: 'Nuestros caficultores seleccionan solo los cerezos en su punto óptimo de maduración, garantizando la calidad desde el primer paso.'
              },
              {
                num: '02',
                title: 'Tostión Controlada',
                desc: 'Cada lote se tuesta siguiendo un perfil específico que resalta sus notas naturales, ya sean frutales, achocolatadas o florales.'
              },
              {
                num: '03',
                title: 'Empaque de Origen',
                desc: 'Utilizamos tecnología de vanguardia para preservar la frescura y el perfil sensorial intactos hasta que lleguen a tu taza.'
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
