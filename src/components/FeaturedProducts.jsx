import React from 'react';

const ProductCard = ({ name, tastingNotes, price, image, tag, category = "Origen" }) => (
  <div className="group cursor-pointer flex flex-col transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-white rounded-sm overflow-hidden p-4">
    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-[#F5F1EB] mb-8">
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
    
    <div className="flex flex-col flex-grow px-2 pb-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
        {category}
      </p>
      
      <h3 className="font-serif text-xl text-[#1A1A1A] mb-2 group-hover:text-[#CCA678] transition-colors duration-300">
        {name}
      </h3>
      
      <p className="text-sm text-gray-500 font-light mb-4">
        Notas: {tastingNotes}
      </p>
      
      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
        <p className="text-lg font-medium text-[#CCA678]">
          {price}
        </p>
        <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-transparent hover:border-[#CCA678] transition-all duration-300 py-1">
          Descubrir origen →
        </button>
      </div>
    </div>
  </div>
);

const FeaturedProducts = ({ 
  products = [], 
  title = "Selección de Temporada", 
  subtitle = "Experiencias sensoriales",
  subtitleItalic = "embotelladas."
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-32 px-6 bg-[#F5F1EB]" id="featured">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#CCA678] font-bold mb-6">
            {title}
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] max-w-3xl mx-auto leading-tight">
            {subtitle} <span className="italic text-[#CCA678]">{subtitleItalic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <a 
            href="/productos" 
            className="inline-block px-12 py-5 border border-[#1A1A1A]/10 text-[#1A1A1A] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500 rounded-sm"
          >
            Ver Toda la Colección
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
