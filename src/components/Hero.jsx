import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Background Image with requested overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65))' }} />
        <img 
          src="/assets/images/hero-huila.png"
          alt="Plantaciones de café en las montañas del Huila, Colombia"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center w-full flex flex-col items-center">
        {/* Animated content wrapper */}
        <div className={`flex flex-col items-center justify-center text-center max-w-[900px] mx-auto transition-all duration-800 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          
          {/* Vertical line above */}
          <div className="h-10 w-px bg-white/30 mx-auto mb-6" />

          {/* Eyebrow */}
          <p className="tracking-[0.3em] text-xs uppercase mb-4 text-accent-gold">
            HUILA, COLOMBIA
          </p>

          {/* Main Title — el concepto madre del brief de marca */}
          <h1 className="font-serif font-light text-white tracking-tight leading-[0.95] text-5xl md:text-7xl xl:text-[110px] mb-4 text-center">
            Cada taza cuenta una historia <br />
            {/* Secondary Title */}
            <span className="italic text-[#C6A47E] text-4xl md:text-6xl xl:text-[90px] block mt-2 text-center">
              que transforma vidas.
            </span>
          </h1>

          <p className="text-white/80 max-w-xl mx-auto mt-8 font-light text-lg">
            Detrás de cada grano hay manos que cuidan la tierra del Huila y transforman su esfuerzo en un café que llega hasta tu mesa.
          </p>

          {/* CTA Button */}
          <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/productos"
              className="inline-block border border-white/40 text-white px-8 py-3 uppercase tracking-wide bg-transparent hover:bg-white/10 transition-all duration-300"
            >
              Conocer nuestros cafés
            </a>
            <a
              href="/nosotros"
              className="inline-block border-b border-transparent text-white px-6 py-3 uppercase tracking-wide bg-transparent hover:border-white/40 transition-all duration-300"
            >
              Conoce a nuestras familias
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center transition-opacity duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[10px] uppercase tracking-widest text-white/50 mb-4">SCROLL</span>
        <div className="w-px h-12 bg-white/30" />
      </div>
    </section>
  );
};

export default Hero;
