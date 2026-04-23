import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="/" className="text-xl font-bold tracking-tighter text-neutral-900">
          CAFÉ <span className="text-brand-accent">CONCENTRAL</span>
        </a>
        
        <div className="hidden md:flex space-x-8 items-center">
          <a href="/productos" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Productos</a>
          <a href="/nosotros" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Nosotros</a>
          <a href="/exportacion" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Exportación</a>
          <a href="/contacto" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors border border-neutral-200 px-4 py-2 rounded-full hover:bg-neutral-50 transition-all">Contacto</a>
        </div>

        <button className="md:hidden text-neutral-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
