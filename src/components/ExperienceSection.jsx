import React from 'react';

const ExperienceSection = () => {
  return (
    <section className="w-full bg-[#F5F1EB] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-[#A68A64]">
            EXPERIENCIA SENSORIAL
          </p>

          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#1A1A1A]">
            Más que café, una experiencia <span className="italic text-[#A68A64]">en cada origen.</span>
          </h2>

          <p className="text-base text-[#6B6B6B] leading-relaxed max-w-md">
            Cada lote es seleccionado, tostado y preparado para revelar su carácter único. 
            Descubre perfiles que transforman lo cotidiano en extraordinario.
          </p>
        </div>

        <div className="hidden md:block"></div>

      </div>
    </section>
  );
};

export default ExperienceSection;
