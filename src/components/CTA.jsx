import React from 'react';

const CTA = () => {
  return (
    <section className="px-6 py-32 sm:py-48 bg-neutral-cream">
      <div className="max-w-7xl mx-auto bg-base-black rounded-sm p-16 md:p-40 text-center relative overflow-hidden">
        {/* Artistic background background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-accent-gold/20 via-transparent to-accent-gold/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-base-white/[0.05] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="label-premium text-accent-gold mb-10 mx-auto">Haz parte</span>
          <h2 className="text-base-white mb-12 leading-[1.1]">
            Cuando eliges nuestro café, <br /><span className="italic-serif text-accent-gold underline decoration-accent-gold/20 underline-offset-[12px]">eliges a quienes lo cultivan.</span>
          </h2>
          <p className="text-neutral-warm/60 text-xl mb-20 max-w-2xl mx-auto leading-relaxed font-light">
            No te estamos pidiendo que compres café. Te estamos invitando a un modelo que genera bienestar, fortalece comunidades y demuestra que el café puede transformar vidas.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a href="/productos" className="btn-primary">
              Ver nuestros cafés
            </a>
            <a href="/contacto" className="btn-secondary border-base-white/20 text-base-white hover:bg-base-white/10">
              Hablar con nosotros
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
