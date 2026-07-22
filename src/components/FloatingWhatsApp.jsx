import React from 'react';
import { WHATSAPP_NUMBER } from '../lib/cart.js';

const FloatingWhatsApp = () => {
  const message = "Hola, me gustaría saber más sobre Café Coocentral.";
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-10 group flex items-center justify-center w-16 h-16 bg-[#1A1A1A] rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(166,138,100,0.2)] transition-all duration-500 hover:scale-105 hover:bg-[#CCA678] overflow-hidden"
      aria-label="Contactar por WhatsApp"
    >
      {/* Subtle gold glow on hover */}
      <div className="absolute inset-0 bg-[#CCA678] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
      >
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
