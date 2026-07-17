import React, { useState, useEffect } from 'react';

const Navbar = ({ currentPath = '/' }) => {
  const isHome = currentPath === '/' || currentPath === '';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <>
      <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        (isScrolled || !isHome) ? 'bg-[#F5F1EB] backdrop-blur-md shadow-sm py-5' : 'bg-transparent py-10'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <img 
            src={(isScrolled || !isHome)
              ? "/assets/brand/coocentral-logo-primary-black.svg"
              : "/assets/brand/coocentral-logo-primary-gold.svg"}
            alt="Café Coocentral" 
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>
        
        <div className="flex items-center gap-8 md:gap-12">
          <div className="hidden md:flex space-x-12 items-center">
            {['Productos', 'Nosotros', 'Exportación'].map((item) => (
              <a 
                key={item}
                href={`/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                className={`text-[12px] font-bold uppercase tracking-[0.25em] transition-all duration-500 hover:text-accent-gold ${
                  (isScrolled || !isHome) ? 'text-black' : 'text-white'
                }`}
              >
                {item}
              </a>
            ))}
            <a 
              href="/contacto" 
              className={`text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-3 rounded-sm border transition-all duration-500 ${
                (isScrolled || !isHome)
                  ? 'border-accent-gold text-black hover:bg-accent-gold hover:text-white' 
                  : 'border-white/30 text-white hover:bg-white hover:text-black'
              }`}
            >
              Contacto
            </a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(true)}
            className={`flex items-center gap-3 transition-colors duration-500 hover:opacity-70 ${
              (isScrolled || !isHome) ? 'text-black' : 'text-white'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] hidden md:block">Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    {/* Overlay Menu */}
    <div 
      className={`fixed inset-0 bg-[#0B0B0B] z-[100] flex flex-col justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <button 
        onClick={() => setIsMenuOpen(false)}
        className="absolute top-8 right-8 md:right-[5.5rem] text-white hover:text-accent-gold transition-colors duration-300 p-2"
        aria-label="Cerrar menú"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex flex-col items-center gap-8 md:gap-12">
        {['Productos', 'Nosotros', 'Exportación', 'Contacto'].map((item, idx) => (
          <a 
            key={item}
            href={`/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
            className={`text-5xl md:text-7xl font-serif text-base-white hover:text-accent-gold hover:italic transition-all duration-500 transform ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: `${idx * 100 + 300}ms` }}
            onClick={() => setIsMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Contact Block */}
      <div className={`absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col gap-2 max-w-[260px] transition-all duration-700 transform ${
        isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`} style={{ transitionDelay: '600ms' }}>
        <p className="text-[12px] tracking-[0.05em] text-white/50 leading-[1.6]">+57 311 351 9915</p>
        <p className="text-[12px] tracking-[0.05em] text-white/50 leading-[1.6]">cafescoocentral.comercial@coocentral.co</p>
        <p className="text-[12px] tracking-[0.05em] text-white/50 leading-[1.6]">Garzón, Huila — Colombia</p>
      </div>

      {/* Social Block */}
      <div className={`absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-5 z-20 transition-all duration-700 transform ${
        isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`} style={{ transitionDelay: '700ms' }}>
        {[
          { label: 'IG', href: '#' },
          { label: 'IN', href: '#' },
          { label: 'YT', href: '#' }
        ].map((social) => (
          <a 
            key={social.label}
            href={social.href}
            className="text-[12px] tracking-[0.15em] uppercase text-white/50 transition-all duration-300 hover:text-white hover:opacity-100 hover:-translate-y-0.5"
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
    </>
  );
};

export default Navbar;
