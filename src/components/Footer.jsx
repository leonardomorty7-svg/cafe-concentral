import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <a href="/" className="text-xl font-bold tracking-tighter text-neutral-900">
              CAFÉ <span className="text-brand-accent">CONCENTRAL</span>
            </a>
            <p className="mt-4 text-neutral-500 text-sm leading-relaxed max-w-xs">
              Elevando el estándar del café colombiano para el mundo. Calidad, origen y pasión en cada grano.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-neutral-900">Empresa</h4>
            <ul className="mt-6 space-y-4">
              <li><a href="/nosotros" className="text-neutral-500 hover:text-neutral-900 text-sm transition-colors">Sobre Nosotros</a></li>
              <li><a href="/proceso" className="text-neutral-500 hover:text-neutral-900 text-sm transition-colors">Nuestro Proceso</a></li>
              <li><a href="/sostenibilidad" className="text-neutral-500 hover:text-neutral-900 text-sm transition-colors">Sostenibilidad</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-neutral-900">Productos</h4>
            <ul className="mt-6 space-y-4">
              <li><a href="/productos" className="text-neutral-500 hover:text-neutral-900 text-sm transition-colors">Grano Entero</a></li>
              <li><a href="/productos" className="text-neutral-500 hover:text-neutral-900 text-sm transition-colors">Café Molido</a></li>
              <li><a href="/exportacion" className="text-neutral-500 hover:text-neutral-900 text-sm transition-colors">Exportación B2B</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-neutral-900">Newsletter</h4>
            <p className="mt-6 text-neutral-500 text-sm">Suscríbete para recibir noticias y ofertas exclusivas.</p>
            <form className="mt-4 flex">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-white border border-neutral-200 px-4 py-2 rounded-l-lg text-sm w-full focus:outline-none focus:border-brand-accent"
              />
              <button className="bg-neutral-900 text-white px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
                Unirse
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-xs">
            © 2024 Café Concentral. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">Instagram</a>
            <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
