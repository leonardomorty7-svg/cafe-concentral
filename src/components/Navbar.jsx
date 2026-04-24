import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-neutral-cream/95 backdrop-blur-xl py-5 border-b border-base-black/5 shadow-sm' 
          : 'bg-transparent py-10'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
        <a href="/" className={`text-2xl font-serif font-bold tracking-tighter transition-colors duration-500 ${
          isScrolled ? 'text-base-black' : 'text-base-white'
        }`}>
          CAFÉ <span className="text-accent-gold">CONCENTRAL</span>
        </a>
        
        <div className="hidden md:flex space-x-12 items-center">
          {['Productos', 'Nosotros', 'Exportación'].map((item) => (
            <a 
              key={item}
              href={`/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
              className={`text-[12px] font-bold uppercase tracking-[0.25em] transition-all duration-500 hover:text-accent-gold ${
                isScrolled ? 'text-base-black/60' : 'text-base-white/70'
              }`}
            >
              {item}
            </a>
          ))}
          <a 
            href="/contacto" 
            className={`text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-3 rounded-sm border transition-all duration-500 ${
              isScrolled 
                ? 'border-accent-gold text-base-black hover:bg-accent-gold hover:text-base-white' 
                : 'border-white/30 text-base-white hover:bg-white hover:text-base-black'
            }`}
          >
            Contacto
          </a>
        </div>

        <button className={`md:hidden transition-colors duration-500 ${
          isScrolled ? 'text-base-black' : 'text-base-white'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
