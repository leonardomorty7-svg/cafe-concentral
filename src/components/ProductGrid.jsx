import React from 'react';

const products = [
  {
    id: 1,
    name: 'Grano Entero',
    description: 'La máxima pureza y frescura para los amantes del ritual.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop',
    tag: 'Premium'
  },
  {
    id: 2,
    name: 'Café Molido',
    description: 'Equilibrio perfecto y practicidad para tu mañana.',
    image: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=2069&auto=format&fit=crop',
    tag: 'Clásico'
  },
  {
    id: 3,
    name: 'Tostión Especial',
    description: 'Perfiles de sabor únicos desarrollados artesanalmente.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    tag: 'Signature'
  }
];

const ProductGrid = () => {
  return (
    <section className="section-container bg-white" id="productos">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Nuestras Categorías</h2>
        <div className="w-20 h-1 bg-brand-accent mx-auto mb-6" />
        <p className="text-neutral-500 max-w-xl mx-auto">
          Seleccionamos cuidadosamente cada lote para garantizar una experiencia sensorial incomparable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 mb-6">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                  {product.tag}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{product.name}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-4">{product.description}</p>
            <a href="/productos" className="text-sm font-semibold border-b border-neutral-900 pb-1 hover:border-brand-accent hover:text-brand-accent transition-all inline-block">
              Ver más
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
