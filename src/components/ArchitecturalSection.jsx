import React from 'react';

const ArchitecturalSection = () => {
  return (
    <section className="bg-white py-32 px-8 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid md:grid-cols-12 gap-16 items-center">
          
          {/* Narrative Content */}
          <div className="md:col-span-5 space-y-12">
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#A68A64] font-bold block">
                NUESTRO COMPROMISO
              </span>
              <h2 className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-[1.1]">
                Líneas arquitectónicas <span className="italic text-[#A68A64]">y granos vibrantes.</span>
              </h2>
            </div>

            <div className="space-y-8 text-lg text-[#6B6B6B] font-light leading-relaxed max-w-md">
              <p>
                Somos más que café; somos lugares. Espacios singulares donde la arquitectura mínima resalta la complejidad de cada tueste.
              </p>
              <p>
                Nuestro compromiso con el compromiso sostenible es absoluto. Trabajamos por lo bello y lo bueno, para componer y compartir experiencias sinceras que se reinventan constantemente.
              </p>
            </div>

            <div className="pt-12">
              <a href="/nosotros" className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-4 hover:border-[#A68A64] transition-all duration-500">
                DESCUBRE NUESTRA HISTORIA
              </a>
            </div>
          </div>

          {/* Asymmetric Visual Grid */}
          <div className="md:col-span-7 relative">
            <div className="grid grid-cols-2 gap-8">
              <div className="mt-24 space-y-8">
                <div className="aspect-[4/5] bg-[#F5F1EB] rounded-sm overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
                    alt="Interior minimalista"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">FOUNDERS</p>
                  <p className="font-serif italic text-[#1A1A1A]">Selección de Origen</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="aspect-[3/4] bg-[#F5F1EB] rounded-sm overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2064&auto=format&fit=crop" 
                    alt="Café y Arquitectura"
                    className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110"
                  />
                </div>
                <div className="bg-[#A68A64] p-8 text-white rounded-sm">
                  <h3 className="text-2xl font-serif mb-4 italic">B Corp Certified</h3>
                  <p className="text-xs uppercase tracking-widest opacity-80 leading-loose">
                    Garantizamos un impacto social y ambiental positivo en cada paso de nuestra cadena.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating label decoration */}
            <div className="absolute -bottom-12 -left-12 hidden lg:block">
              <div className="bg-[#1A1A1A] text-white p-12 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center animate-spin-slow">
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold leading-tight">
                  Premium • Organic • Specialty •
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArchitecturalSection;
