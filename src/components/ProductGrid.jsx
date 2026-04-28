import React from 'react';

const ProductCard = ({ id, name, description, image, tag, category, subcategory }) => (
  <a
    href={`/products/${id}`}
    className="group block transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-white rounded-sm overflow-hidden p-4"
  >
    <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#F5F1EB] mb-8">
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {tag && (
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm font-bold text-[#1A1A1A] z-10">
          {tag}
        </span>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
    </div>
    
    <div className="flex flex-col px-2 pb-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
        {category ?? subcategory ?? 'Café'}
      </p>
      
      <h3 className="font-serif text-xl text-[#1A1A1A] mb-2 group-hover:text-[#A68A64] transition-colors duration-300">
        {name}
      </h3>
      
      <p className="text-sm text-gray-500 font-light mb-6 line-clamp-2">
        {description}
      </p>
      
      <span className="self-start text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-transparent group-hover:border-[#A68A64] transition-all duration-300 py-1">
        Explorar →
      </span>
    </div>
  </a>
);


const ProductGrid = ({ title = "Nuestras Categorías", products = [] }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-32 px-6 bg-[#F5F1EB]" id="productos">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#A68A64] font-bold mb-6 block">Colección</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
              Categorías <span className="italic text-[#A68A64]">Exclusivas</span>
            </h2>
          </div>
          <p className="text-[#6B6B6B] max-w-sm font-light text-base leading-relaxed">
            Seleccionamos cuidadosamente cada lote para garantizar una experiencia sensorial incomparable en cada preparación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
