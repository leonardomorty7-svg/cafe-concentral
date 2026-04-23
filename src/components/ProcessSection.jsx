import React from 'react';

const ProcessSection = () => {
  return (
    <section className="section-container bg-neutral-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=2070&auto=format&fit=crop" 
              alt="Manual harvest" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 hidden md:block w-64 aspect-square rounded-2xl overflow-hidden shadow-xl border-8 border-neutral-50">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
              alt="Quality control" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <span className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-4 block">Del Cultivo a tu Taza</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Un proceso guiado por la paciencia y el respeto.</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100 font-bold text-neutral-900">01</div>
              <div>
                <h4 className="text-lg font-bold mb-2">Recolección Manual</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">Nuestros caficultores seleccionan solo los cerezos en su punto óptimo de maduración, garantizando la calidad desde el primer paso.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100 font-bold text-neutral-900">02</div>
              <div>
                <h4 className="text-lg font-bold mb-2">Tostión Controlada</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">Cada lote se tuesta siguiendo un perfil específico que resalta sus notas naturales, ya sean frutales, achocolatadas o florales.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100 font-bold text-neutral-900">03</div>
              <div>
                <h4 className="text-lg font-bold mb-2">Empaque al Vacío</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">Utilizamos empaques con válvula unidireccional para preservar la frescura y el aroma por mucho más tiempo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
