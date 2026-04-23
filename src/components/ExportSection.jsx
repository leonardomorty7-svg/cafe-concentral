import React from 'react';

const ExportSection = () => {
  return (
    <section className="bg-neutral-900 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Llevamos lo mejor de Colombia al mundo</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Somos aliados estratégicos para distribuidores, cafeterías de especialidad y hoteles que buscan excelencia y consistencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
            <h4 className="text-white font-bold text-lg mb-4">Exportación B2B</h4>
            <p className="text-neutral-500 text-sm">Logística simplificada y certificada para envíos internacionales a gran escala.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
            <h4 className="text-white font-bold text-lg mb-4">Marca Blanca</h4>
            <p className="text-neutral-500 text-sm">Desarrollamos tu propia línea de café con la calidad de origen Concentral.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
            <h4 className="text-white font-bold text-lg mb-4">Suscripción Office</h4>
            <p className="text-neutral-500 text-sm">Suministro recurrente para empresas que valoran la cultura del buen café.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
            <h4 className="text-white font-bold text-lg mb-4">Asesoría Barista</h4>
            <p className="text-neutral-500 text-sm">Capacitación técnica para maximizar el potencial de nuestro café en tu barra.</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <a href="/exportacion" className="inline-block px-10 py-4 border border-brand-accent text-brand-accent font-bold rounded-full hover:bg-brand-accent hover:text-white transition-all">
            Solicitar Información de Exportación
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
