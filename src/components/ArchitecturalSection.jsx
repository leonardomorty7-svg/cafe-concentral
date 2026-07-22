import React from 'react';

const ArchitecturalSection = () => {
  return (
    <section className="bg-white py-32 px-8 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid md:grid-cols-12 gap-16 items-center">
          
          {/* Narrative Content */}
          <div className="md:col-span-5 space-y-16">
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#CCA678] font-bold block reveal">
                NUESTRO ORIGEN
              </span>
              <div className="reveal delay-100">
                <h2 className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-[1.05]">
                  Raíces que cultivan futuro.
                </h2>
                <p className="mt-4 md:mt-6 text-3xl md:text-4xl font-serif italic text-[#CCA678] tracking-[0.02em] font-light">
                  Un café que nace del trabajo de todos.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-lg text-[#6B6B6B] font-light leading-[1.7] max-w-[520px] reveal delay-200">
              <p>
                Somos una cooperativa de miles de familias caficultoras del Huila, unidas por la tradición, la calidad y el compromiso con el territorio.
              </p>
              <p>
                Cada grano nace del trabajo colectivo, del respeto por la tierra y de una visión compartida: llevar el café colombiano a su máxima expresión, generando oportunidades, sostenibilidad y desarrollo para nuestras comunidades.
              </p>
            </div>

            <div className="pt-12 reveal delay-300">
              <a href="/nosotros" className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-4 hover:border-[#CCA678] transition-all duration-500 inline-block hover:translate-x-1">
                DESCUBRE NUESTRA HISTORIA
              </a>
            </div>
          </div>

          {/* Asymmetric Visual Grid */}
          <div className="md:col-span-7 relative">
            <div className="grid grid-cols-2 gap-8">
              <div className="mt-24 space-y-8 reveal delay-100">
                <div className="aspect-[4/5] bg-[#F5F1EB] rounded-sm overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500">
                  <img
                    src="/assets/images/finca-huila-detalle.jpg"
                    alt="Casa de finca cafetera entre cafetales del Huila"
                    className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                  />
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">ORIGEN</p>
                  <p className="font-serif italic text-[#1A1A1A]">Finca cafetera, Huila</p>
                </div>
              </div>
              <div className="space-y-8 reveal delay-200">
                <div className="aspect-[4/5] bg-[#F5F1EB] rounded-sm overflow-hidden shadow-2xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-shadow duration-500">
                  <img
                    src="/assets/images/cafes-premium-costales.jpg"
                    alt="Cafés Coocentral sobre costales de exportación"
                    className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                  />
                </div>
                <div className="bg-[#CCA678] p-8 text-white rounded-sm">
                  <h3 className="text-xl font-serif mb-3 leading-snug">Cuando el valor regresa</h3>
                  <p className="text-xs text-white/80 leading-relaxed max-w-[280px] font-light">
                    Cuando eliges Café Coocentral, haces parte de un modelo donde el valor del café regresa a quienes lo cultivan.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating label decoration */}
            <div className="absolute -bottom-12 -left-12 hidden lg:block z-10">
              <svg
                viewBox="0 0 240 240"
                className="w-[190px] h-[190px] animate-spin-slow md:w-[210px] md:h-[210px]"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 120, 120
                       m -95, 0
                       a 95,95 0 1,1 190,0
                       a 95,95 0 1,1 -190,0"
                  />
                </defs>
                <text fontSize="13" letterSpacing="3.5" fill="#3B2A1A" fontWeight="600" opacity="0.75">
                  <textPath href="#circlePath">
                    100% COLOMBIANO • 100% COLOMBIANO •
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArchitecturalSection;
