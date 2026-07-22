import React from 'react';

/**
 * CTA — el cierre y manifiesto de marca ("Haz parte"). Full-bleed sobre una
 * imagen de fondo (el territorio y las familias), con overlay para que el
 * dorado y el blanco se lean. La imagen es un placeholder único
 * (cta-manifiesto.jpg) que el cliente reemplaza por la suya en su sitio.
 */
const CTA = () => {
  return (
    <section className="relative overflow-hidden px-6 py-40 md:py-56">
      {/* Fondo — imagen del manifiesto (reemplazable) */}
      <img
        src="/assets/images/cta-manifiesto.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlays: base oscura + viñeta para legibilidad y calidez cinematográfica */}
      <div className="absolute inset-0 bg-[#0B0B0B]/72" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.72) 95%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(11,11,11,0.55), transparent 30%, transparent 70%, rgba(11,11,11,0.6))' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center" data-fx="header">
        <span className="label-premium text-[#D1AA49] mx-auto mb-8">Haz parte</span>
        <h2 className="font-serif font-light text-white text-4xl md:text-6xl xl:text-7xl leading-[1.08] tracking-[-0.02em]">
          Cuando eliges nuestro café,{' '}
          <span className="italic text-[#D1AA49]">eliges a quienes lo cultivan.</span>
        </h2>
        <p className="text-white/65 text-lg md:text-xl mt-10 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
          No te estamos pidiendo que compres café. Te estamos invitando a un modelo que
          genera bienestar, fortalece comunidades y demuestra que el café puede transformar vidas.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center" data-fx="rise">
          <a href="/productos" className="btn-primary">Ver nuestros cafés</a>
          <a href="/contacto" className="btn-secondary border-white/25 text-white hover:bg-white/10">
            Hablar con nosotros
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
