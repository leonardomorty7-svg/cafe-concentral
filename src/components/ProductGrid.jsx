import React from 'react';
import { addItem, formatPrice, openCart } from '../lib/cart.js';

const ProductCard = ({ id, name, tag, description, category, image, variants = [] }) => {
  const defaultVariant = variants[0] || { size: null, price: null };
  const lowestPrice = variants.reduce(
    (lowest, variant) => Math.min(lowest, variant.price),
    defaultVariant.price ?? Infinity,
  );
  const handleAdd = (e) => {
    // El enlace envolvente es un "stretched link"; el botón vive por encima y
    // no debe navegar al añadir.
    e.preventDefault();
    e.stopPropagation();
    // El café entra con una molienda por defecto (cambiable en la ficha).
    addItem(
      { id, name, image, size: defaultVariant.size, price: defaultVariant.price },
      1,
      category === 'cafe' ? 'En grano' : null,
    );
    openCart();
  };

  return (
    <div className="group relative transition-transform duration-500 ease-out hover:-translate-y-2">
      {/* Enlace estirado: toda la tarjeta navega al producto, salvo el botón. */}
      <a href={`/products/${id}`} className="absolute inset-0 z-[1]" aria-label={`Ver ${name}`} />

      {/* Minimalista: la bolsa flota sobre un tono cálido, sin adornos. */}
      <div
        className="relative aspect-[4/5] rounded-sm overflow-hidden mb-6"
        style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F1EADC 100%)' }}
      >
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain p-9 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          style={{ filter: 'drop-shadow(0 22px 38px rgba(0,0,0,0.20))' }}
        />

        {/* Añadir rápido — aparece al pasar el mouse, por encima del enlace */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Añadir ${name} al carrito`}
          className="absolute bottom-4 right-4 z-[3] inline-flex items-center gap-1.5 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-[0.18em] px-4 py-2.5 rounded-sm shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#D1AA49] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1AA49] focus-visible:opacity-100 focus-visible:translate-y-0"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Añadir
        </button>
      </div>

      <div className="flex items-baseline justify-between gap-3 px-1">
        <h3 className="font-serif text-xl md:text-2xl text-[#1A1A1A] leading-tight group-hover:text-[#D1AA49] transition-colors duration-300">
          {name}
        </h3>
        {Number.isFinite(lowestPrice) && (
          <span className="font-serif text-base md:text-lg text-[#1A1A1A]/70 shrink-0 whitespace-nowrap tabular-nums">
            {variants.length > 1 && (
              <span className="font-sans text-[10px] uppercase tracking-wide text-[#9A9488] mr-1">desde</span>
            )}
            {formatPrice(lowestPrice)}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * El encabezado es opcional: en la home la grilla llega después del recorrido
 * (tierra → familias → modelo) y puede apoyarse en él. En /productos la página
 * ya trae su propio h1, así que se omite para no duplicarlo.
 */
const ProductGrid = ({ products = [], limit = 0, eyebrow, heading, headingItalic, description }) => {
  if (!products || products.length === 0) return null;

  // limit=0 means show all; any positive number caps the list
  const displayedProducts = limit > 0 ? products.slice(0, limit) : products;

  return (
    <section className="py-32 md:py-48 px-6 bg-[#F5F1EB]" id="productos">
      <div className="max-w-7xl mx-auto">
        {heading && (
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10" data-fx="header">
            <div className="max-w-2xl">
              {eyebrow && (
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#D1AA49] font-bold mb-6 block" data-fx-eyebrow>{eyebrow}</span>
              )}
              <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] leading-tight">
                {heading}{' '}
                {headingItalic && <span className="italic text-[#D1AA49]">{headingItalic}</span>}
              </h2>
            </div>
            {description && (
              <p className="text-[#6B6B6B] max-w-sm font-light text-lg leading-[1.7]">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10" data-fx="stagger">
          {displayedProducts.map((product) => (
            <div key={product.id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {limit > 0 && (
          <div className="mt-20 flex justify-center" data-fx="rise">
            <a 
              href="/productos" 
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-1.5 hover:border-[#D1AA49] hover:text-[#D1AA49] transition-all duration-300 flex items-center gap-2 group"
            >
              Ver toda la colección <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
