/**
 * cart.js — El carrito compartido entre las islas de Astro.
 *
 * En Astro cada componente interactivo (Navbar, ficha, grilla, drawer)
 * hidrata por separado, así que NO pueden compartir un estado de React.
 * Este store vive FUERA de todo framework: el estado se guarda en memoria
 * y en localStorage, y avisa los cambios con un evento del window. Cada
 * isla se suscribe con subscribe() y así todas ven el mismo carrito.
 *
 * Fase 1 (sin pasarela de pago todavía): el carrito arma un PEDIDO que se
 * envía por WhatsApp a la cooperativa. Los precios son informativos y el
 * total final (incluido el envío) se confirma con la cooperativa.
 */

// Número de WhatsApp de la cooperativa. Placeholder provisional que nos pasó
// el cliente mientras confirma el definitivo. Formato E.164 sin el "+".
export const WHATSAPP_NUMBER = '573044851938';

const STORAGE_KEY = 'coocentral-cart';
const CHANGE_EVENT = 'cart:change';
const OPEN_EVENT = 'cart:open';
const CLOSE_EVENT = 'cart:close';

const hasWindow = () => typeof window !== 'undefined';

// ─── MOLIENDA ─────────────────────────────────────────────────────────────────
// El diferenciador de Café Coocentral: el cliente elige cómo quiere su café.
// Se guarda la etiqueta tal cual (legible en el pedido de WhatsApp).
export const GRIND_OPTIONS = [
  { label: 'En grano', hint: 'Muele en casa a tu gusto' },
  { label: 'Molienda gruesa', hint: 'Prensa francesa · cold brew' },
  { label: 'Molienda media', hint: 'Goteo · V60 · greca' },
  { label: 'Molienda fina', hint: 'Espresso · moka' },
];

/** Clave única: misma referencia, presentación y molienda = misma línea. */
const lineKey = (id, size, grind) => `${id}::${size || 'unica'}::${grind || 'sin-molienda'}`;
/** Clave de una línea ya guardada (compat con carritos viejos sin `key`). */
const keyOf = (it) => it.key || lineKey(it.id, it.size, it.grind);

/** Formato consistente para todos los valores mostrados en COP. */
export function formatPrice(price) {
  if (!Number.isFinite(price)) return 'Por confirmar';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(price);
}

export function getSubtotal(item) {
  return Number.isFinite(item?.price) ? item.price * (item.qty || 0) : null;
}

export function getTotal(items = []) {
  const totals = items.map(getSubtotal);
  return totals.every((total) => Number.isFinite(total))
    ? totals.reduce((sum, total) => sum + total, 0)
    : null;
}

// ─── LECTURA / ESCRITURA ──────────────────────────────────────────────────────

/** Lee el carrito desde localStorage. Nunca lanza: ante cualquier error, [] */
export function getItems() {
  if (!hasWindow()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items) {
  if (!hasWindow()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* almacenamiento lleno o bloqueado — el carrito sigue en memoria del evento */
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { items } }));
}

// ─── OPERACIONES ──────────────────────────────────────────────────────────────

/** Cantidad total de unidades (para el contador del navbar). */
export function getCount() {
  return getItems().reduce((sum, it) => sum + (it.qty || 0), 0);
}

/**
 * Añade un producto. Si ya está (misma referencia, presentación y molienda), suma.
 * product: { id, name, image, size, price }; grind: etiqueta de molienda o null.
 */
export function addItem(product, qty = 1, grind = null) {
  if (!product || !product.id) return;
  const items = getItems();
  const key = lineKey(product.id, product.size, grind);
  const existing = items.find((it) => keyOf(it) === key);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({
      key,
      id: product.id,
      name: product.name,
      image: product.image || null,
      size: product.size || null,
      price: Number.isFinite(product.price) ? product.price : null,
      grind: grind || null,
      qty,
    });
  }
  write(items);
}

/** Fija la cantidad exacta de una línea (por su clave). Si baja a 0, la elimina. */
export function setQty(key, qty) {
  let items = getItems();
  if (qty <= 0) {
    items = items.filter((it) => keyOf(it) !== key);
  } else {
    const target = items.find((it) => keyOf(it) === key);
    if (target) target.qty = qty;
  }
  write(items);
}

/** Elimina una línea del carrito (por su clave). */
export function removeItem(key) {
  write(getItems().filter((it) => keyOf(it) !== key));
}

/** Vacía el carrito por completo. */
export function clear() {
  write([]);
}

// ─── SUSCRIPCIÓN ──────────────────────────────────────────────────────────────

/**
 * Se suscribe a los cambios del carrito. Devuelve la función de limpieza.
 * También escucha el evento 'storage' para sincronizar entre pestañas.
 */
export function subscribe(callback) {
  if (!hasWindow()) return () => {};
  const onChange = () => callback(getItems());
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

// ─── ABRIR / CERRAR EL DRAWER ─────────────────────────────────────────────────
// Desacopla las islas: cualquiera dispara openCart() y el drawer (otra isla)
// lo escucha, sin que se conozcan entre sí.

export function openCart() {
  if (hasWindow()) window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function closeCart() {
  if (hasWindow()) window.dispatchEvent(new CustomEvent(CLOSE_EVENT));
}

export function onOpen(callback) {
  if (!hasWindow()) return () => {};
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}

export function onClose(callback) {
  if (!hasWindow()) return () => {};
  window.addEventListener(CLOSE_EVENT, callback);
  return () => window.removeEventListener(CLOSE_EVENT, callback);
}

// ─── PEDIDO POR WHATSAPP ──────────────────────────────────────────────────────

const METHOD_LABELS = {
  contraentrega: 'Contraentrega (pago al recibir)',
  transferencia: 'Transferencia · Nequi / Bancolombia',
  coordinar: 'Coordinar con la cooperativa',
};

/**
 * Arma el texto del pedido para WhatsApp. Texto plano legible: la persona de
 * la cooperativa lo recibe listo para responder con disponibilidad y total.
 * customer: { nombre, telefono, ciudad, direccion, metodo, notas }
 */
export function buildOrderMessage(items, customer = {}) {
  const lines = [];
  lines.push('Hola Café Coocentral, quiero hacer un pedido:');
  lines.push('');

  items.forEach((it) => {
    const grind = it.grind ? ` — ${it.grind}` : '';
    const size = it.size ? ` (${it.size})` : '';
    const subtotal = getSubtotal(it);
    const price = subtotal === null ? '' : ` — ${formatPrice(subtotal)}`;
    lines.push(`• ${it.qty} × ${it.name}${size}${grind}${price}`);
  });

  const total = getTotal(items);
  if (total !== null) {
    lines.push('');
    lines.push(`Subtotal de productos: ${formatPrice(total)}`);
  }

  lines.push('');
  if (customer.nombre) lines.push(`Nombre: ${customer.nombre}`);
  if (customer.telefono) lines.push(`Teléfono: ${customer.telefono}`);
  if (customer.ciudad) lines.push(`Ciudad: ${customer.ciudad}`);
  if (customer.direccion) lines.push(`Dirección: ${customer.direccion}`);
  if (customer.metodo) {
    lines.push(`Forma de pago: ${METHOD_LABELS[customer.metodo] || customer.metodo}`);
  }
  if (customer.notas) lines.push(`Notas: ${customer.notas}`);

  lines.push('');
  lines.push('Quedo atento(a) a la confirmación de disponibilidad, envío y total final. ¡Gracias!');

  return lines.join('\n');
}

/** Construye la URL de WhatsApp con el mensaje ya codificado. */
export function whatsappUrl(message, phone = WHATSAPP_NUMBER) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
