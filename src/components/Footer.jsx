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
                placeholder="Tu email" 
                className="bg-transparent text-sm w-full focus:outline-none placeholder:text-white/30 font-light"
              />
              <button className="text-[10px] uppercase tracking-widest hover:text-[#A68A64] transition-colors font-bold">
                ENVIAR
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
              ESCRIBENOS
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
              WHITE PLAYLIST
            </a>
          </div>
        </div>

        {/* Main Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 pt-24">
          <div className="col-span-2 space-y-6">
            <a href="/" className="text-2xl font-serif font-bold tracking-tighter">
              CAFÉ <span className="text-[#A68A64]">CONCENTRAL</span>
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

          <div className="col-span-2 lg:col-span-1 lg:col-start-6 flex flex-col justify-end items-end space-y-6">
            <div className="flex gap-8">
              {['IG', 'LN', 'VM'].map((social) => (
                <a key={social} href="#" className="text-[10px] text-white/30 hover:text-white transition-colors font-bold tracking-widest">
                  {social}
                </a>
              ))}
            </div>
            <p className="text-[9px] text-white/20 uppercase tracking-[0.3em]">
              © 2024 ARCHITECTURAL COFFEE
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
