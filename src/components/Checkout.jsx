import React, { useEffect, useState } from 'react';
import {
  getItems,
  setQty,
  removeItem,
  subscribe,
  clear,
  buildOrderMessage,
  whatsappUrl,
} from '../lib/cart.js';

/**
 * Checkout — la experiencia completa del pedido, hasta el método de pago.
 *
 * Isla de React montada en /checkout. Lee el carrito del store compartido,
 * recoge los datos de contacto y la forma de pago, y arma el pedido que se
 * confirma por WhatsApp con la cooperativa.
 *
 * Fase 1: sin pasarela en línea. Los métodos reales hoy son contraentrega,
 * transferencia (Nequi/Bancolombia) o coordinar. "Tarjeta en línea" queda
 * anunciada como "muy pronto" para cuando el cliente conecte la pasarela.
 */

const METHODS = [
  {
    id: 'contraentrega',
    label: 'Contraentrega',
    desc: 'Pagas cuando recibes tu pedido.',
  },
  {
    id: 'transferencia',
    label: 'Transferencia · Nequi / Bancolombia',
    desc: 'Coordinamos los datos por WhatsApp.',
  },
  {
    id: 'coordinar',
    label: 'Prefiero coordinar',
    desc: 'Hablamos y definimos juntos la mejor forma.',
  },
];

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    metodo: 'contraentrega',
    notas: '',
  });
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(getItems());
    return subscribe(setItems);
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  if (!mounted) return null;

  const isEmpty = items.length === 0;
  const count = items.reduce((sum, it) => sum + it.qty, 0);
  const nombreOk = form.nombre.trim().length > 1;
  const telOk = form.telefono.replace(/\D/g, '').length >= 7;
  const canSubmit = !isEmpty && nombreOk && telOk;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) {
      const first = document.querySelector('[data-invalid="true"]');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const message = buildOrderMessage(items, form);
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };

  if (isEmpty) {
    return (
      <div className="max-w-lg mx-auto text-center py-24">
        <p className="font-serif text-3xl text-[#1A1A1A] mb-4">Tu canasta está vacía</p>
        <p className="text-[#6B6B6B] font-light leading-relaxed mb-10">
          Añade algún café a tu pedido y vuelve aquí para finalizarlo.
        </p>
        <a href="/productos" className="btn-primary inline-flex">
          Ver nuestros cafés
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-start">
      {/* ─── IZQUIERDA — Datos + método de pago ─── */}
      <div className="order-2 lg:order-1 flex flex-col gap-14">
        {/* Datos de contacto */}
        <section>
          <span className="label-premium">Paso 1 — Tus datos</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] leading-tight mb-10">
            ¿A dónde <span className="italic text-[#CCA678]">enviamos</span> tu café?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field
              label="Nombre completo"
              value={form.nombre}
              onChange={set('nombre')}
              required
              invalid={touched && !nombreOk}
              hint="Cuéntanos con quién hablamos."
            />
            <Field
              label="Teléfono / WhatsApp"
              value={form.telefono}
              onChange={set('telefono')}
              type="tel"
              required
              invalid={touched && !telOk}
              hint="Para confirmarte disponibilidad y total."
            />
            <Field label="Ciudad" value={form.ciudad} onChange={set('ciudad')} />
            <Field label="Dirección (opcional)" value={form.direccion} onChange={set('direccion')} />
          </div>

          <div className="mt-6">
            <label className="block text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-3">
              Notas del pedido
            </label>
            <textarea
              value={form.notas}
              onChange={set('notas')}
              rows={3}
              placeholder="¿Molido o en grano? ¿Alguna preferencia?"
              className="w-full bg-white border border-[#1A1A1A]/12 rounded-sm px-4 py-3 text-[#1A1A1A] placeholder:text-[#B5B0A6] focus:outline-none focus:border-[#CCA678] transition-colors font-light"
            />
          </div>
        </section>

        {/* Método de pago */}
        <section>
          <span className="label-premium">Paso 2 — Forma de pago</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] leading-tight mb-4">
            Elige cómo <span className="italic text-[#CCA678]">prefieres</span> pagar.
          </h2>
          <p className="text-[#6B6B6B] font-light leading-relaxed mb-8 max-w-md">
            Confirmamos contigo el total y el envío antes de cualquier pago. Nada se cobra en este paso.
          </p>

          <div className="flex flex-col gap-3">
            {METHODS.map((m) => {
              const active = form.metodo === m.id;
              return (
                <label
                  key={m.id}
                  className={`flex items-start gap-4 p-5 rounded-sm border cursor-pointer transition-all duration-300 ${
                    active
                      ? 'border-[#CCA678] bg-[#CCA678]/8 shadow-sm'
                      : 'border-[#1A1A1A]/10 bg-white hover:border-[#CCA678]/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="metodo"
                    value={m.id}
                    checked={active}
                    onChange={set('metodo')}
                    className="sr-only"
                  />
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                      active ? 'border-[#CCA678]' : 'border-[#1A1A1A]/25'
                    }`}
                  >
                    {active && <span className="w-2.5 h-2.5 rounded-full bg-[#CCA678]" />}
                  </span>
                  <span>
                    <span className="block font-serif text-lg text-[#1A1A1A] leading-tight">{m.label}</span>
                    <span className="block text-sm text-[#6B6B6B] font-light mt-1">{m.desc}</span>
                  </span>
                </label>
              );
            })}

            {/* Tarjeta en línea — próximamente (queda listo para Fase 2) */}
            <div className="flex items-start gap-4 p-5 rounded-sm border border-dashed border-[#1A1A1A]/12 bg-transparent opacity-70">
              <span className="mt-0.5 w-5 h-5 rounded-full border-2 border-[#1A1A1A]/15 shrink-0" />
              <span>
                <span className="block font-serif text-lg text-[#1A1A1A]/60 leading-tight">
                  Pago con tarjeta en línea
                  <span className="ml-2 text-[9px] uppercase tracking-[0.2em] bg-[#CCA678]/15 text-[#CCA678] font-bold px-2 py-0.5 rounded-full align-middle">
                    Muy pronto
                  </span>
                </span>
                <span className="block text-sm text-[#6B6B6B] font-light mt-1">
                  Estamos habilitando el pago en línea con tarjeta.
                </span>
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* ─── DERECHA — Resumen del pedido ─── */}
      <aside className="order-1 lg:order-2 lg:sticky lg:top-28">
        <div className="bg-white rounded-sm border border-[#1A1A1A]/8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-7">
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="font-serif text-xl text-[#1A1A1A] m-0">Tu pedido</h3>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-bold">
              {count} {count === 1 ? 'ítem' : 'ítems'}
            </span>
          </div>

          <ul className="space-y-4 mb-6">
            {items.map((it) => (
              <li key={it.id} className="flex gap-3 items-center">
                <div className="shrink-0 w-14 h-14 rounded-sm bg-[#F5F1EB] overflow-hidden flex items-center justify-center p-1.5">
                  {it.image && <img src={it.image} alt={it.name} className="w-full h-full object-contain" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-[15px] text-[#1A1A1A] leading-tight truncate m-0">{it.name}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="inline-flex items-center border border-[#1A1A1A]/12 rounded-sm">
                      <button type="button" onClick={() => setQty(it.id, it.qty - 1)} aria-label="Restar" className="w-7 h-7 flex items-center justify-center text-[#1A1A1A] hover:text-[#CCA678]">−</button>
                      <span className="w-7 text-center text-xs font-bold tabular-nums">{it.qty}</span>
                      <button type="button" onClick={() => setQty(it.id, it.qty + 1)} aria-label="Sumar" className="w-7 h-7 flex items-center justify-center text-[#1A1A1A] hover:text-[#CCA678]">+</button>
                    </div>
                    <button type="button" onClick={() => removeItem(it.id)} className="text-[10px] uppercase tracking-[0.12em] text-[#B5B0A6] hover:text-[#1A1A1A] transition-colors">
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Nota de precio honesta */}
          <div className="border-t border-[#1A1A1A]/8 pt-5 mb-6">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] text-[#6B6B6B] font-light">Total</span>
              <span className="font-serif text-lg text-[#1A1A1A]">A confirmar</span>
            </div>
            <p className="text-[12px] text-[#6B6B6B] font-light leading-relaxed mt-2">
              Te confirmamos el valor y el envío por WhatsApp según tu ciudad y tu pedido.
            </p>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-primary w-full flex items-center justify-center gap-2.5 disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Confirmar pedido por WhatsApp
          </button>

          {touched && !canSubmit && (
            <p className="text-[12px] text-[#B4462F] font-light mt-3 text-center">
              Completa tu nombre y un teléfono válido para continuar.
            </p>
          )}

          <button
            type="button"
            onClick={() => clear()}
            className="w-full text-center mt-4 text-[10px] uppercase tracking-[0.2em] text-[#B5B0A6] hover:text-[#1A1A1A] transition-colors"
          >
            Vaciar canasta
          </button>
        </div>

        <p className="text-[12px] text-[#6B6B6B] font-light leading-relaxed text-center mt-5 px-4">
          Al confirmar se abre WhatsApp con tu pedido listo para enviar. Una persona de la cooperativa te responde.
        </p>
      </aside>
    </form>
  );
};

/** Campo de texto reutilizable con rótulo, pista y estado de error. */
const Field = ({ label, value, onChange, type = 'text', required = false, invalid = false, hint }) => (
  <div data-invalid={invalid ? 'true' : 'false'}>
    <label className="block text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-3">
      {label} {required && <span className="text-[#CCA678]">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full bg-white border rounded-sm px-4 py-3 text-[#1A1A1A] placeholder:text-[#B5B0A6] focus:outline-none transition-colors font-light ${
        invalid ? 'border-[#B4462F]' : 'border-[#1A1A1A]/12 focus:border-[#CCA678]'
      }`}
    />
    {hint && !invalid && <p className="text-[11px] text-[#B5B0A6] font-light mt-1.5">{hint}</p>}
    {invalid && <p className="text-[11px] text-[#B4462F] font-light mt-1.5">Este dato es necesario.</p>}
  </div>
);

export default Checkout;
