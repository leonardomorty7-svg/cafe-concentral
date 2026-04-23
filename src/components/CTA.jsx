import React from 'react';

const CTA = () => {
  return (
    <section className="section-container">
      <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square bg-brand-accent rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] aspect-square bg-brand-accent rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">¿Listo para elevar tu experiencia?</h2>
          <p className="text-neutral-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Únete a la comunidad de conocedores que eligen Café Concentral por su autenticidad y calidad excepcional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/productos" className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100">
              Ir a la Tienda
            </a>
            <a href="/contacto" className="btn-secondary border-white/20 text-white hover:bg-white/10">
              Hablar con un Experto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
