# ESTADO-CLAUDE — Café Coocentral

**Fecha:** 2026-10-02
**Para:** cualquier sesión de Claude (u otra persona) que retome este proyecto sin la conversación original.
**Último commit al escribir esto:** `c6b9f49` en `main`, igual a `origin/main`. Árbol de trabajo limpio.

---

## 1. Qué es, para quién y para qué

- **Qué:** sitio web + tienda de **Café Coocentral**, la marca de café de la cooperativa cafetera
  **Coocentral** (Huila, Colombia). OJO: la marca es **Coocentral**; el repo y la URL dicen
  "concentral" por un error de origen que nunca se renombró.
- **Para quién:** el cliente es la cooperativa. El proyecto lo lleva **Andrés** (diseño, dirección
  creativa y relación con el cliente).
- **Objetivo:** una web **premium y narrativa** que cuente que detrás de cada taza hay familias
  caficultoras ("Cada taza cuenta una historia que transforma vidas"), y que permita **comprar**:
  elegir café, gramaje y molienda, armar un carrito y enviar el pedido por **WhatsApp**.
- **Publicado en:** https://cafe-concentral.vercel.app
- **Repo:** https://github.com/leonardomorty7-svg/cafe-concentral (rama `main`). **El repo es PÚBLICO.**

## 2. Estado hoy

### Terminado y aprobado por el cliente
El cliente aprobó la web (commit `ff4031f Release v1.0`, 2026-07-24) y después pidió dos rondas de
retoques pequeños que ya están hechas y publicadas (2026-07-28).

- **Home**, en este orden: hero cinemático → grilla de 3 cafés → proceso vertical → raíces/familias
  → equipo → manifiesto de cierre (CTA).
  - **Hero** (`CinematicStory.jsx`): secuencia de granos 3D del cliente (86 fotogramas WebP en canvas,
    controlada por scroll) → logo → fundido cruzado a la finca → "No nacimos para producir café".
    Sin hilo conductor y sin sello giratorio (el cliente pidió quitar ambos).
  - **Proceso** "Un proceso guiado por la cooperación" (`VerticalProcess.jsx`): 3 momentos con los PNG
    transparentes del cliente, un **hilo dorado** que se dibuja con el scroll y pasa por detrás de las
    imágenes, la semilla viajando en la punta, parallax sutil y hover. Termina en lo oscuro y no entra
    a la sección de ediciones. En móvil el hilo se oculta. Cierra con 3 "Cafés con nombre y con historia".
  - **Equipo** (`TeamSection.jsx`): carrusel infinito de 5 personas, cards anchas, foto a sangre,
    nombre en un solo renglón e icono de LinkedIn. Ya trae lista una variante `layout="horizontal"`.
  - **Cierre** (`CTA.jsx`): manifiesto con foto de fondo y el sello "100% COLOMBIANO" girando
    (cierra el círculo completo).
- **Tienda:** `/productos` (catálogo), ficha por producto en `/products/[slug]`, carrito lateral y
  `/checkout`. El pedido sale por WhatsApp con producto, gramaje, molienda, cantidad y total.
- **Páginas internas:** `/nosotros`, `/contacto`, `/exportacion`.
- **Tipografía:** **Gotham** (archivos del cliente) en toda la web, títulos incluidos. Sin itálicas;
  las palabras de acento en dorado van en **bold**.
- **Responsive de la home:** auditado en 375 / 768 / 1440 px, sin desbordamiento horizontal.

### A medias
- **LinkedIn del equipo:** el icono está, pero las 5 URLs son `linkedin: null`, así que no navega.
- **Fotos y nombres del equipo:** son provisionales hasta que el cliente mande los reales.
- **Precios:** todos son **provisionales** (COP) en `src/data/products.js`.
- **WhatsApp:** el número `573044851938` es **provisional** (`WHATSAPP_NUMBER` en `src/lib/cart.js`).
- **Accesorios** (V60, Chemex, prensas, filtros, mug, botella) y **Café Edición Limitada**: siguen con
  foto de fondo horneado; no hay mockups limpios. Además no está confirmado si los accesorios se venden.
- **Responsive de las páginas internas:** no se ha auditado a fondo (solo la home).
- **Pago en línea:** no existe. El pedido es una cotización por WhatsApp (Fase 1). La Fase 2
  (Shopify, Wompi o Nequi) depende de que el cliente decida.

## 3. Decisiones importantes y por qué

**Tecnología**
- **Astro 4 + React 18 (islas) + Tailwind 3 + GSAP 3 (ScrollTrigger).** Sitio estático en Vercel.
- **GSAP se importa dinámicamente dentro de `useEffect`** (`import('gsap')`). Si se importa arriba del
  archivo, se rompe el render del servidor de Astro.
- **El carrito vive en un store propio** (`src/lib/cart.js`, localStorage + eventos de `window`), no
  en el estado de React, porque cada isla de Astro hidrata por separado y no comparte estado.
- Cada café con varios tamaños es **un solo producto con `variants: [{ size, price }]`**; los slugs
  viejos (`…-340g`, `…-500g`) redirigen a la ficha consolidada.

**Diseño**
- **Dorado oficial `#D1AA49`**: el oro metálico real del isologo, tomado del manual de marca
  (`Manual de Uso - CAFÉ COOCENTRAL.pdf`). Fondos oscuros en espresso cálido `#160F0B`, claros en crema `#F5F1EB`.
- **Referencias del cliente:** jazeancoffee.com (hilo conductor, recorrido vertical) y le-mugs.com
  (movimiento sutil de las imágenes al hacer scroll).
- **Recorrido vertical, no horizontal:** el scroll horizontal desorientaba; Andrés lo descartó.
- **Transiciones del hero por fundido cruzado, nunca por deslizamiento:** el deslizamiento dejaba ver un
  "recorte" entre capas, y el cliente lo marcó como error grave.
- **Hilo conductor solo en el proceso.** Se probó en el hero y en el relevo hacia productos; el cliente
  pidió quitarlo de ahí.
- **El hilo pasa por detrás de las imágenes por z-index, no con máscara:** la máscara en elipse
  dejaba un "círculo" visible alrededor de los PNG transparentes.
- **Cards de producto tipo packshot:** bolsa flotando sobre blanco, sin recorte (`object-contain`),
  con los mockups transparentes del cliente recortados a su contorno.
- **Ninguna imagen se repite en el sitio**, para que el cliente pueda reemplazar cada una 1:1.

**Contenido y cliente**
- El cliente pidió **Gotham en todo y sin itálicas**. El manual también menciona Folklore (para la
  palabra "CAFÉ"); se descartó porque solo tenía un peso y Andrés prefirió Gotham.
- **Molienda como diferenciador** en la compra: En grano / gruesa / media / fina.
- Equipo de **5 personas** contando la cadena completa: cultivo → beneficio → tostión → catación → calidad.

## 4. Pendientes en orden de prioridad

1. **Datos reales del cliente.** Siguiente paso: pedirle a la cooperativa en un solo mensaje:
   WhatsApp definitivo, precios por producto y gramaje, URLs de LinkedIn del equipo, fotos y nombres
   reales del equipo, y si los accesorios se venden. Con eso se actualizan `cart.js`, `products.js` y
   `TeamSection.jsx`.
2. **Licencia de Gotham.** Siguiente paso: confirmar con Andrés que la cooperativa tiene licencia
   **web** de Gotham. Si no la tiene, comprarla o sacar los `.otf` del repo público (ver sección 6).
3. **Responsive de páginas internas** (`/nosotros`, `/contacto`, `/exportacion`, fichas de producto).
   Siguiente paso: medir el desbordamiento en 375 / 768 / 1440 px con el método de la sección 6.
4. **Imágenes limpias de accesorios y Edición Limitada**, o quitar los accesorios del catálogo si no se
   venden. Siguiente paso: depende de la respuesta del punto 1.
5. **Footer:** enlaza a `/proceso` y `/sostenibilidad`, que no existen. Siguiente paso: decidir con
   Andrés si se crean o se quitan los enlaces.
6. **Limpieza de código sin uso** (no afecta al sitio): `IntroAnimation.jsx`, `FeaturedProducts.jsx`,
   `ProductSlider.jsx`, `ExportSection.jsx`, `src/lib/shopify.js`, el `VideoLightbox` y la máscara
   `vpThreadMask` dentro de `VerticalProcess.jsx`, y los restos del hilo (`buildThread`, `smoothPath`)
   en `CinematicStory.jsx`.
7. **Renombrar** repo y URL de Vercel a "coocentral". Lo hace Andrés.
8. **Fase 2 de pago** (Shopify, Wompi o Nequi), solo si el cliente la pide.

## 5. Archivos clave y cómo se corre o publica

| Ruta | Qué hay |
|---|---|
| `src/pages/index.astro` | Home: orden de las secciones |
| `src/components/CinematicStory.jsx` | Hero cinemático (granos, logo, fotos) |
| `src/components/VerticalProcess.jsx` | Proceso con hilo conductor + "Cafés con nombre" |
| `src/components/TeamSection.jsx` | Equipo (datos en el arreglo `TEAM`) |
| `src/components/ProductGrid.jsx` | Grilla y cards de producto (home y `/productos`) |
| `src/components/ProductGallery.jsx` | Galería de la ficha de producto |
| `src/components/CTA.jsx` / `ColombianoBadge.jsx` | Cierre y sello giratorio |
| `src/components/Navbar.jsx` | Menú (enlaces sueltos solo desde 1024 px) |
| `src/data/products.js` | **Catálogo y precios** |
| `src/lib/cart.js` | Carrito, total, mensaje de WhatsApp y `WHATSAPP_NUMBER` |
| `src/styles/global.css` | `@font-face` de Gotham y reglas globales de títulos |
| `tailwind.config.mjs` | Fuentes (`serif` y `sans` = Gotham) y colores |
| `public/assets/` | Imágenes: `products/`, `process/`, `team/`, `images/`, `intro/beans/` |
| `public/fonts/gotham/` | Gotham (`.otf`) |

**Material fuente del cliente** (disco externo `PortableSSD`, no está en el repo):
`/Volumes/PortableSSD/Quantum/Cafecoocentral/Informacion/`
- `DOCUMENTOS/PRODUCTOS - MOCKUP/` (mockups; los transparentes terminan en `PNG.png`)
- `DOCUMENTOS/MANUALES DE IDENTIDAD/` (manual del café)
- `Tipografia/Gotham/`
- Las imágenes del proceso están en `/Volumes/PortableSSD/Quantum/Cafecoocentral/Imagenes/Imagenes proceso ` (el nombre de la carpeta termina en espacio).

**Correr en local** (probado con Node 20):
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # verifica que compile (≈37 páginas)
```
**Publicar:** Vercel publica solo cada push a `main`. Andrés hace los push con **GitHub Desktop**
(repo `cafe-concentral` → "Push origin"). Si en el navegador se ve la versión vieja, es caché:
`Cmd + Shift + R`.

## 6. Problemas conocidos, qué NO hacer y aprendizajes

**Problemas conocidos**
- **Gotham es una fuente comercial y el repo es público:** los `.otf` se pueden descargar desde GitHub y
  desde la web. Hay que confirmar la licencia web (pendiente 2).
- **Advertencias de hidratación en consola** ("Extra attributes from the server: style") en la grilla
  de productos. Vienen de las animaciones `data-fx` y no rompen nada.
- El `README.md` es todavía la plantilla de Astro.

**Qué NO hacer**
- No importar `gsap` arriba del archivo en componentes React: va dentro de `useEffect`.
- No poner `transform` en el `style` de algo que anima GSAP: se suma al de GSAP y duplica el movimiento.
  En timelines con scrub, usar `fromTo` (no `.to`), porque `invalidateOnRefresh` hace que `.to`
  relea el punto de partida.
- No volver a deslizar capas en el hero: usar fundido cruzado.
- No volver a meter el hilo en el hero ni hacerlo pasar por detrás del título de las ediciones.
- No usar itálicas en títulos.
- No usar `md:whitespace-nowrap` en títulos largos: a 768 px desbordan la página. Usar `lg:`.
- No subir datos inventados como si fueran reales: precios, número y equipo están marcados como provisionales.

**Aprendizajes**
- La regla global `p { max-width: 65ch }` (en `global.css`) encoge los párrafos. Si un texto centrado
  sale corrido a la izquierda, le falta `mx-auto` o `max-w-none`.
- Chrome **ignora `textLength` en `<textPath>`**. Por eso el sello mide el texto y calcula el interletrado.
- Para cazar desbordamientos: medir `scrollWidth − clientWidth` en cada ancho y ocultar candidatos con
  JS hasta que el número llegue a 0. A ojo no se encuentran.
- Al verificar en el navegador de la app: después de cambiar el tamaño de la ventana, **recargar**, o el
  CSS queda viejo y las medidas mienten. Si el panel del navegador está oculto, los screenshots salen en
  blanco: medir por DOM.
- Los nombres de archivo con acentos del SSD rompen `sips` sin avisar: copiarlos primero a una ruta sin acentos.
- Los PNG del cliente traen mucho margen transparente. Se recortan al contorno con Python (PIL `getbbox`).

## 7. Personas y fechas

| Rol | Quién |
|---|---|
| Responsable del proyecto: diseño, dirección creativa, cliente; hace los push | Andrés |
| Cliente | Cooperativa Coocentral (Café Coocentral), Huila. No hay persona de contacto registrada. |
| Dueña del repo en GitHub | Cuenta `leonardomorty7-svg` |
| Otras IA que tocaron el código | ChatGPT/Codex: gramaje, página Nosotros y parte de la tipografía |

**Fechas**
- 2026-04-23: primer commit.
- 2026-07-24: el cliente aprueba la versión final (`Release v1.0`).
- 2026-07-28: últimos retoques del cliente, publicados.
- No hay fecha de entrega pendiente registrada.

---

**Nota sobre la memoria:** las notas de trabajo de Claude viven fuera del repo, en
`~/.claude/projects/-Users-andres-Documents-cafe-concentral/memory/` de este Mac, y **no viajan con el
proyecto**. Este archivo es lo que hay que leer en otro computador.
