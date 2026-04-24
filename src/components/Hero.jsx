import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-[95vh] flex items-center overflow-hidden bg-base-black">
      {/* Background Image with sophisticated overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-base-black/70 via-base-black/30 to-base-black/70 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
          alt="Coffee roasting process"
          className={`w-full h-full object-cover transition-transform duration-[3000ms] ease-out ${isLoaded ? 'scale-100' : 'scale-110'}`}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-20">
        <div className={`max-w-4xl transition-all duration-1000 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="label-premium text-accent-gold !mb-8">Origen Seleccionado</span>
          <h1 className="text-base-white mb-10 leading-[1.1]">
            El alma de Colombia <br />
            <span className="italic-serif text-accent-gold">en cada taza.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-warm/70 mb-14 leading-relaxed max-w-2xl font-light">
            Descubre la esencia del café premium, cultivado con paciencia y tostado a la perfección en el corazón de las montañas colombianas. Una experiencia sensorial sin precedentes.
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <a href="/productos" className="btn-primary">
              Explorar Colección
            </a>
            <a href="/nosotros" className="btn-secondary border-white/20 text-base-white hover:bg-white/10">
              Nuestra Historia
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center transition-opacity duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-base-white/30 text-[10px] uppercase tracking-[0.3em] mb-6">Scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-accent-gold to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
