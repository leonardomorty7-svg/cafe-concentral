import React from 'react';

const ProductCard = ({ id, name, tag, description, category, subcategory, image }) => (
  <a
    href={`/products/${id}`}
    className="group block relative"
  >
    <div className="relative aspect-[4/5] bg-white rounded-sm overflow-hidden mb-6 flex items-center justify-center p-8 transition-shadow duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-black/5">
      {/* Badge */}
      {tag && (
        <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest bg-[#F5F1EB]/80 backdrop-blur-md px-3 py-1.5 rounded-sm text-[#1A1A1A] font-bold z-10 border border-black/5">
          {tag}
        </span>
      )}
      
      {/* Image */}
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-contain transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
      />
    </div>
    
    <div className="flex flex-col space-y-3 px-1">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-serif text-2xl text-[#1A1A1A] mb-1 group-hover:text-[#A68A64] transition-colors duration-300">
            {name}
          </h3>
          <p className="text-[13px] text-[#8C8C8C] font-light">
            {description}
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] shrink-0 mt-2 font-bold">
          {category || subcategory || 'Café'}
        </span>
      </div>
      
      <div className="pt-2">
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-1 group-hover:border-[#A68A64] group-hover:text-[#A68A64] transition-all duration-300 group-hover:translate-x-1">
          Ver producto
        </span>
      </div>
    </div>
  </a>
);

const ProductGrid = ({ title = "Nuestras Categorías", products = [] }) => {
  if (!products || products.length === 0) return null;

  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-32 md:py-48 px-6 bg-[#F5F1EB]" id="productos">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#A68A64] font-bold mb-6 block">NUESTRA COLECCIÓN</span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] leading-tight reveal delay-100">
              Café con <span className="italic text-[#A68A64]">carácter.</span>
            </h2>
          </div>
          <p className="text-[#6B6B6B] max-w-sm font-light text-lg leading-[1.7] reveal delay-200">
            Perfiles seleccionados para cada forma de disfrutar el origen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
          {featuredProducts.map((product, idx) => {
            const delayClass = `delay-${(idx % 3) * 100 + 100}`;
            return (
              <div key={product.id} className={`${delayClass} reveal`}>
                <ProductCard {...product} />
              </div>
            );
          })}
        </div>

        <div className="mt-20 flex justify-center reveal delay-400">
          <a 
            href="/productos" 
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-1.5 hover:border-[#A68A64] hover:text-[#A68A64] transition-all duration-300 flex items-center gap-2 group"
          >
            Ver toda la colección <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
