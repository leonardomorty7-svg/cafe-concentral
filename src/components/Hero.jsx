import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-neutral-900">
      {/* Background Image / Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
          alt="Coffee roasting process"
          className="w-full h-full object-cover opacity-60 scale-105"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <span className="inline-block text-brand-accent font-semibold tracking-widest uppercase text-sm mb-4 animate-fade-in">
            Origen Seleccionado
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            El alma de Colombia en cada taza.
          </h1>
          <p className="text-lg text-neutral-300 mb-10 leading-relaxed max-w-lg">
            Descubre la esencia del café premium, cultivado con paciencia y tostado a la perfección en el corazón de las montañas colombianas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/productos" className="btn-primary bg-brand-accent hover:bg-brand-accent/90 text-center">
              Explorar Colección
            </a>
            <a href="/nosotros" className="btn-secondary border-white/20 text-white hover:bg-white/10 text-center">
              Nuestra Historia
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-white/40 text-xs uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
