import React, { useEffect, useState } from 'react';
import { getItems, setQty, removeItem, subscribe, onOpen, onClose, closeCart } from '../lib/cart.js';

/**
 * CartDrawer — la canasta lateral deslizante.
 *
 * Es UNA isla montada en el layout (client:load). Cualquier otra isla abre
 * el drawer disparando openCart(); aquí lo escuchamos con onOpen(). El estado
 * de las líneas se lee del store compartido (localStorage) y se sincroniza vía
 * subscribe(), así que refleja lo que añaden la ficha, la grilla o el checkout.
 *
 * Fase 1: sin precios ni pago en línea. El drawer lleva al /checkout, donde el
 * pedido se confirma por WhatsApp.
 */
const CartDrawer = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(getItems());
    const unsubStore = subscribe(setItems);
    const unsubOpen = onOpen(() => setOpen(true));
    const unsubClose = onClose(() => setOpen(false));
    return () => {
      unsubStore();
      unsubOpen();
      unsubClose();
    };
  }, []);

  // Cerrar con Escape y bloquear el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Evita parpadeo de hidratación: no pintamos nada hasta montar en cliente.
  if (!mounted) return null;

  const count = items.reduce((sum, it) => sum + it.qty, 0);
  const isEmpty = items.length === 0;

  return (
    <>
      {/* Fondo oscuro */}
      <div
        onClick={() => closeCart()}
        className={`fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        className={`fixed top-0 right-0 z-[120] h-full w-full max-w-[440px] bg-[#F5F1EB] shadow-[0_0_60px_rgba(0,0,0,0.25)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.3,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Encabezado */}
        <header className="flex items-center justify-between px-7 py-6 border-b border-[#1A1A1A]/8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D1AA49] font-bold mb-1">Tu selección</p>
            <h2 className="font-serif text-2xl text-[#1A1A1A] leading-none m-0">
              Pedido {count > 0 && <span className="text-[#D1AA49]">({count})</span>}
            </h2>
          </div>
          <button
            onClick={() => closeCart()}
            aria-label="Cerrar"
            className="p-2 text-[#1A1A1A] hover:text-[#D1AA49] transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Líneas del pedido */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {isEmpty ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D1AA49" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <p className="font-serif text-xl text-[#1A1A1A] mb-2">Tu canasta está vacía</p>
              <p className="text-sm text-[#6B6B6B] font-light leading-relaxed mb-8 max-w-[240px]">
                Cada café que elijas viene de las montañas del Huila y de las familias que lo cultivan.
              </p>
              <a
                href="/productos"
                onClick={() => closeCart()}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-1 hover:border-[#D1AA49] hover:text-[#D1AA49] transition-all"
              >
                Ver nuestros cafés
              </a>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((it) => {
                const k = it.key || it.id;
                return (
                <li key={k} className="flex gap-4 items-center">
                  <a
                    href={`/products/${it.id}`}
                    onClick={() => closeCart()}
                    className="shrink-0 w-20 h-20 rounded-sm bg-white border border-[#1A1A1A]/5 overflow-hidden flex items-center justify-center p-2"
                  >
                    {it.image && (
                      <img src={it.image} alt={it.name} className="w-full h-full object-contain" />
                    )}
                  </a>

                  <div className="flex-1 min-w-0">
                    <a
                      href={`/products/${it.id}`}
                      onClick={() => closeCart()}
                      className="font-serif text-[17px] text-[#1A1A1A] leading-tight hover:text-[#D1AA49] transition-colors block truncate"
                    >
                      {it.name}
                    </a>
                    {it.grind && (
                      <span className="block text-[11px] uppercase tracking-[0.15em] text-[#D1AA49] font-bold mt-1">{it.grind}</span>
                    )}

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Selector de cantidad */}
                      <div className="inline-flex items-center border border-[#1A1A1A]/15 rounded-sm">
                        <button
                          onClick={() => setQty(k, it.qty - 1)}
                          aria-label="Restar uno"
                          className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:text-[#D1AA49] transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-[#1A1A1A] tabular-nums">{it.qty}</span>
                        <button
                          onClick={() => setQty(k, it.qty + 1)}
                          aria-label="Sumar uno"
                          className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:text-[#D1AA49] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(k)}
                        className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Pie con acción */}
        {!isEmpty && (
          <footer className="border-t border-[#1A1A1A]/8 px-7 py-6 bg-white/40">
            <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed mb-5">
              Confirmamos disponibilidad, envío y total contigo al finalizar. El pedido se coordina de forma personal.
            </p>
            <a
              href="/checkout"
              onClick={() => closeCart()}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Finalizar pedido
              <span aria-hidden="true">→</span>
            </a>
            <button
              onClick={() => closeCart()}
              className="w-full text-center mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
            >
              Seguir explorando
            </button>
          </footer>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
