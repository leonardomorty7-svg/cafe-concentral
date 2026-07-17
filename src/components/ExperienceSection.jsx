import React from 'react';

const ExperienceSection = () => {
  return (
    <section className="w-full bg-[#F5F1EB] py-32 md:py-48 px-6 md:px-12 text-center">
      <div className="max-w-[850px] mx-auto flex flex-col items-center">
        
        <p className="text-[11px] tracking-[0.4em] uppercase text-[#A68A64] font-bold mb-8 reveal delay-100">
          NUESTRA TIERRA
        </p>

        <h2 className="leading-[1.1] text-[#1A1A1A] mb-10 md:mb-14 reveal delay-200">
          En las montañas del Huila nacen historias <br className="hidden md:block" />
          <span className="italic font-serif text-[#A68A64]">que el mundo conoce en una taza.</span>
        </h2>

        <p className="text-lg text-[#6B6B6B] leading-[1.7] max-w-[600px] mx-auto font-light reveal delay-300">
          El Huila no es el lugar donde se produce nuestro café. Es el protagonista:
          su altura, su clima y sus manos son lo que vas a reconocer en cada sorbo.
        </p>

      </div>
    </section>
  );
};

export default ExperienceSection;
