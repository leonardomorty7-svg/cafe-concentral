import React, { useState } from 'react';
import { addItem, openCart, whatsappUrl } from '../lib/cart.js';

/**
 * AddToCart — el bloque de compra de la ficha de producto.
 *
 * Isla de React montada dentro de [slug].astro. Recibe el producto y ofrece:
 *   1) selector de cantidad + "Añadir al carrito" (abre el drawer al añadir),
 *   2) un enlace directo de WhatsApp por si prefieren preguntar antes.
 *
 * product: { id, name, image }
 */
const AddToCart = ({ id, name, image }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, name, image }, qty);
    setAdded(true);
    openCart();
    // Restablece el rótulo del botón tras un momento.
    setTimeout(() => setAdded(false), 2000);
  };

  const waLink = whatsappUrl(
    `Hola, estoy interesado(a) en ${name}. Me gustaría recibir más información.`
  );

  return (
    <div className="flex flex-col gap-6 mt-4">
      <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center">
        {/* Selector de cantidad */}
        <div className="inline-flex items-center border border-[#1A1A1A]/15 rounded-sm self-start bg-white">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Restar uno"
            className="w-12 h-14 flex items-center justify-center text-xl text-[#1A1A1A] hover:text-[#CCA678] transition-colors"
          >
            −
          </button>
          <span className="w-10 text-center text-base font-bold text-[#1A1A1A] tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Sumar uno"
            className="w-12 h-14 flex items-center justify-center text-xl text-[#1A1A1A] hover:text-[#CCA678] transition-colors"
          >
            +
          </button>
        </div>

        {/* Añadir al carrito */}
        <button
          onClick={handleAdd}
          className="btn-primary flex-1 px-12 py-6 shadow-xl shadow-accent-gold/10 hover:shadow-accent-gold/20 flex items-center justify-center gap-3"
        >
          {added ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Añadido
            </>
          ) : (
            'Añadir al carrito'
          )}
        </button>
      </div>

      {/* WhatsApp directo — para quien prefiere preguntar primero */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors self-start"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        O pregunta por WhatsApp
      </a>
    </div>
  );
};

export default AddToCart;
