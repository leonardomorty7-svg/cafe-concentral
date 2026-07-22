import React, { useState } from 'react';

const ContactForm = () => {
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-12 text-center rounded-sm shadow-sm border border-neutral-cream reveal active">
        <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CCA678" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-serif text-3xl mb-4 text-base-black">Mensaje Enviado</h3>
        <p className="text-text-muted mb-8 max-w-sm mx-auto">
          Gracias por contactarnos. Un experto de Café Coocentral se comunicará contigo en las próximas 24 horas.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="btn-secondary"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-16 rounded-sm shadow-sm border border-neutral-cream reveal active">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label htmlFor="nombre" className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold">
              Nombre Completo
            </label>
            <input
              required
              type="text"
              id="nombre"
              className="w-full bg-neutral-cream/30 border-b border-neutral-warm py-4 px-0 focus:outline-none focus:border-accent-gold transition-colors font-light text-base"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold">
              Correo Electrónico
            </label>
            <input
              required
              type="email"
              id="email"
              className="w-full bg-neutral-cream/30 border-b border-neutral-warm py-4 px-0 focus:outline-none focus:border-accent-gold transition-colors font-light text-base"
              placeholder="juan@empresa.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="empresa" className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold">
            Empresa (Opcional)
          </label>
          <input
            type="text"
            id="empresa"
            className="w-full bg-neutral-cream/30 border-b border-neutral-warm py-4 px-0 focus:outline-none focus:border-accent-gold transition-colors font-light text-base"
            placeholder="Nombre de tu compañía"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="mensaje" className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold">
            ¿En qué podemos ayudarte?
          </label>
          <textarea
            required
            id="mensaje"
            rows="4"
            className="w-full bg-neutral-cream/30 border-b border-neutral-warm py-4 px-0 focus:outline-none focus:border-accent-gold transition-colors font-light text-base resize-none"
            placeholder="Cuéntanos qué buscas y te respondemos."
          />
        </div>

        <div className="pt-8">
          <button 
            type="submit" 
            disabled={status === 'sending'}
            className={`btn-primary w-full md:w-auto ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
