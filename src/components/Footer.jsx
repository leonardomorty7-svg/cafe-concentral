import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] text-white py-32 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Inspiration Section: Lifestyle & Interaction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-24 border-b border-white/10">
          
          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#A68A64] font-bold">NEWSLETTER</h4>
            <p className="text-xl font-serif leading-tight">Mantente en contacto</p>
            <form className="flex gap-4 border-b border-white/20 pb-2 group focus-within:border-[#A68A64] transition-colors">
              <input 
                type="email" 
                placeholder="Tu correo" 
                className="bg-transparent text-sm w-full focus:outline-none placeholder:text-white/30 font-light"
              />
              <button className="text-[10px] uppercase tracking-widest hover:text-[#A68A64] transition-colors font-bold">
                SUSCRIBIRME
              </button>
            </form>
          </div>

          {/* Contact / Collaborations */}
          <div className="space-y-6 text-center md:border-x md:border-white/10 md:px-12">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#A68A64] font-bold">CONTACTO</h4>
            <p className="text-xl font-serif leading-tight">¿Quieres trabajar con nosotros?</p>
            <a 
              href="mailto:hola@cafeconcentral.com" 
              className="inline-block px-8 py-3 border border-white/20 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-[#0B0B0B] transition-all rounded-sm"
            >
              ESCRÍBENOS
            </a>
          </div>

          {/* Lifestyle / Playlist */}
          <div className="space-y-6 text-right">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#A68A64] font-bold">TAKE YOUR TIME</h4>
            <p className="text-xl font-serif leading-tight italic">Disfruta tu café</p>
            <a 
              href="https://open.spotify.com/playlist/0sc2FfgT3UMWrHqu4Napbf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border border-white/20 text-[10px] uppercase tracking-[0.2em] font-bold hover:border-[#A68A64] hover:text-[#A68A64] transition-all rounded-sm"
            >
              ESCUCHAR PLAYLIST
            </a>
          </div>
        </div>

        {/* Main Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 pt-24">
          <div className="col-span-2 space-y-6">
            <a href="/">
              <img 
                src="/assets/brand/cafe-concentral-logo-primary-gold.svg" 
                alt="Café Concentral" 
                className="h-8 md:h-10 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs font-light">
              Elevando el estándar del café colombiano para el mundo. Arquitectura sensorial en cada grano seleccionado a mano.
            </p>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#A68A64] font-bold">EMPRESA</h5>
            <ul className="space-y-4 text-xs tracking-widest text-white/50 uppercase">
              <li><a href="/nosotros" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="/proceso" className="hover:text-white transition-colors">Proceso</a></li>
              <li><a href="/sostenibilidad" className="hover:text-white transition-colors">Sostenibilidad</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#A68A64] font-bold">COLECCIÓN</h5>
            <ul className="space-y-4 text-xs tracking-widest text-white/50 uppercase">
              <li><a href="/productos" className="hover:text-white transition-colors">Grano Entero</a></li>
              <li><a href="/productos" className="hover:text-white transition-colors">Café Molido</a></li>
              <li><a href="/exportacion" className="hover:text-white transition-colors">Exportación</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1 lg:col-start-6 flex flex-col items-end gap-4 max-w-[220px] ml-auto">
            <div className="flex justify-between w-full text-white">
              <a href="#" className="flex items-center justify-center w-8 h-8 opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"> <rect x="3" y="3" width="18" height="18" rx="4"/> <circle cx="12" cy="12" r="4"/> <circle cx="17.5" cy="6.5" r="1"/> </svg>
              </a>
              <a href="#" className="flex items-center justify-center w-8 h-8 opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 9h4v2h.1c.6-1 2-2 4-2 4 0 5 2.6 5 6v7h-4v-6c0-1.5 0-3.5-2-3.5s-2.3 1.6-2.3 3.3V22H10z"/> </svg>
              </a>
              <a href="#" className="flex items-center justify-center w-8 h-8 opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <polygon points="5,3 19,12 5,21"/> </svg>
              </a>
            </div>
            <p className="text-[12px] leading-[1.6] text-right text-white/40 w-full">
              © 2026 Café Coocentral. Todos los derechos reservados.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
