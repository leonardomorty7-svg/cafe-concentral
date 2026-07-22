/**
 * products.js — Capa de datos de producto
 *
 * Fuente de verdad: /public/assets/products/ (cada imagen existe en disco).
 *
 * GRAMAJE Y PRECIO
 *   Cada producto tiene `variants`: [{ size, price }]. Un café con varios
 *   tamaños (340g / 500g) es UN solo producto con varias variantes, y en la
 *   ficha un selector cambia el precio. Los que tienen una sola variante no
 *   muestran selector. Los que no aplican gramaje (kit, achira, accesorios)
 *   llevan size: null.
 *
 *   ⚠️ PRECIOS PROVISIONALES (COP): valores de referencia para ver el
 *   mecanismo. Reemplazar por los definitivos del cliente. El pedido va por
 *   WhatsApp y el total se confirma con la cooperativa.
 *
 * Curación (home):
 *   featuredSection: "exclusivas" (grilla de 3) | "coleccion" (ediciones) | null
 *   priority: mayor = más prominente dentro de su sección.
 */

// ─── CAFÉ — MEZCLAS ──────────────────────────────────────────────────────────

const cafeEspecial = {
  id: 'cafe-especial',
  name: 'Café Especial',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Intenso · Mezcla', 'Especial'],
  image: '/assets/products/cafe/mezclas/cafe-especial/340g/cafe-especial-340g-main.png',
  images: [
    '/assets/products/cafe/mezclas/cafe-especial/340g/cafe-especial-340g-main.png',
    '/assets/products/cafe/mezclas/cafe-especial/340g/cafe-especial-340g-02.png',
    '/assets/products/cafe/mezclas/cafe-especial/340g/cafe-especial-340g-03.png',
    '/assets/products/cafe/mezclas/cafe-especial/500g/cafe-especial-500g-main.png',
  ],
  variants: [
    { size: '340g', price: 26000 },
    { size: '500g', price: 36000 },
  ],
  featuredHome: true,
  featuredSection: 'exclusivas',
  priority: 30,
};

const cafePremium = {
  id: 'cafe-premium',
  name: 'Café Premium',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Premium · Mezcla', 'Premium'],
  image: '/assets/products/cafe/mezclas/cafe-premium/340g/cafe-premium-340g-main.png',
  images: [
    '/assets/products/cafe/mezclas/cafe-premium/340g/cafe-premium-340g-main.png',
    '/assets/products/cafe/mezclas/cafe-premium/340g/cafe-premium-340g-02.png',
    '/assets/products/cafe/mezclas/cafe-premium/340g/cafe-premium-340g-03.png',
    '/assets/products/cafe/mezclas/cafe-premium/500g/cafe-premium-500g-main.png',
  ],
  variants: [
    { size: '340g', price: 30000 },
    { size: '500g', price: 42000 },
  ],
  featuredHome: true,
  featuredSection: 'exclusivas',
  priority: 29,
};

const cafeMujeresCafeteras = {
  id: 'cafe-mujeres-cafeteras',
  name: 'Mujeres Cafeteras',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Suave · Mezcla', 'Edición Especial'],
  image: '/assets/products/cafe/mezclas/mujeres-cafeteras/500g/cafe-mujeres-cafeteras-500g-main.png',
  images: [
    '/assets/products/cafe/mezclas/mujeres-cafeteras/500g/cafe-mujeres-cafeteras-500g-main.png',
    '/assets/products/cafe/mezclas/mujeres-cafeteras/500g/cafe-mujeres-cafeteras-500g-02.png',
    '/assets/products/cafe/mezclas/mujeres-cafeteras/500g/cafe-mujeres-cafeteras-500g-03.png',
    '/assets/products/cafe/mezclas/mujeres-cafeteras/340g/cafe-mujeres-cafeteras-340g-main.png',
  ],
  variants: [
    { size: '340g', price: 30000 },
    { size: '500g', price: 42000 },
  ],
  featuredHome: true,
  featuredSection: 'exclusivas',
  priority: 28,
};

const cafeDonMaximo = {
  id: 'cafe-don-maximo-500g',
  name: 'Café Don Máximo',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Tradicional · Mezcla', 'Don Máximo'],
  image: '/assets/products/cafe/mezclas/cafe-don-maximo/500g/cafe-don-maximo-500g-main.png',
  images: [
    '/assets/products/cafe/mezclas/cafe-don-maximo/500g/cafe-don-maximo-500g-main.png',
    '/assets/products/cafe/mezclas/cafe-don-maximo/500g/cafe-don-maximo-500g-02.png',
    '/assets/products/cafe/mezclas/cafe-don-maximo/500g/cafe-don-maximo-500g-03.png',
  ],
  variants: [{ size: '500g', price: 34000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 12,
};

const cafeClasico = {
  id: 'cafe-clasico-340g',
  name: 'Café Clásico',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Clásico · Mezcla'],
  image: '/assets/products/cafe/mezclas/cafe-clasico/340g/cafe-clasico-340g-main.png',
  images: [
    '/assets/products/cafe/mezclas/cafe-clasico/340g/cafe-clasico-340g-main.png',
    '/assets/products/cafe/mezclas/cafe-clasico/340g/cafe-clasico-340g-02.png',
    '/assets/products/cafe/mezclas/cafe-clasico/340g/cafe-clasico-340g-03.png',
  ],
  variants: [{ size: '340g', price: 22000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 11,
};

// ─── CAFÉ — EDICIONES ESPECIALES ─────────────────────────────────────────────

const cafePremium50Anos = {
  id: 'cafe-premium-50-anos',
  name: 'Café Premium 50 Años',
  category: 'cafe',
  subcategory: 'ediciones-especiales',
  tags: ['Edición Especial', 'Aniversario'],
  image: '/assets/products/cafe/ediciones-especiales/cafe-premium-50-anos/cafe-premium-50-anos-main.png',
  images: [
    '/assets/products/cafe/ediciones-especiales/cafe-premium-50-anos/cafe-premium-50-anos-main.png',
    '/assets/products/cafe/ediciones-especiales/cafe-premium-50-anos/cafe-premium-50-anos-02.png',
  ],
  variants: [{ size: '500g', price: 48000 }],
  featuredHome: true,
  featuredSection: 'coleccion',
  priority: 20,
};

const cafeEdicionLimitada = {
  id: 'cafe-edicion-limitada',
  name: 'Café Edición Limitada',
  category: 'cafe',
  subcategory: 'ediciones-especiales',
  tags: ['Edición Limitada'],
  image: '/assets/products/cafe/ediciones-especiales/edicion-limitada/cafe-edicion-limitada-main.png',
  images: [
    '/assets/products/cafe/ediciones-especiales/edicion-limitada/cafe-edicion-limitada-main.png',
    '/assets/products/cafe/ediciones-especiales/edicion-limitada/cafe-edicion-limitada-02.png',
    '/assets/products/cafe/ediciones-especiales/edicion-limitada/cafe-edicion-limitada-03.png',
  ],
  variants: [{ size: '340g', price: 42000 }],
  featuredHome: true,
  featuredSection: 'coleccion',
  priority: 22,
};

const cafeNotasJuventud = {
  id: 'cafe-notas-juventud',
  name: 'Café Notas de Juventud',
  category: 'cafe',
  subcategory: 'ediciones-especiales',
  tags: ['Edición Especial'],
  image: '/assets/products/cafe/ediciones-especiales/notas-juventud/cafe-notas-juventud-main.png',
  images: [
    '/assets/products/cafe/ediciones-especiales/notas-juventud/cafe-notas-juventud-main.png',
    '/assets/products/cafe/ediciones-especiales/notas-juventud/cafe-notas-juventud-02.png',
    '/assets/products/cafe/ediciones-especiales/notas-juventud/cafe-notas-juventud-03.png',
  ],
  variants: [{ size: '340g', price: 38000 }],
  featuredHome: true,
  featuredSection: 'coleccion',
  priority: 21,
};

const cafeSuenosCafe = {
  id: 'cafe-suenos-cafe',
  name: 'Sueños con Café',
  category: 'cafe',
  subcategory: 'ediciones-especiales',
  tags: ['Edición Especial'],
  image: '/assets/products/cafe/ediciones-especiales/suenos-con-cafe/cafe-suenos-cafe-main.png',
  images: [
    '/assets/products/cafe/ediciones-especiales/suenos-con-cafe/cafe-suenos-cafe-main.png',
    '/assets/products/cafe/ediciones-especiales/suenos-con-cafe/cafe-suenos-cafe-02.png',
    '/assets/products/cafe/ediciones-especiales/suenos-con-cafe/cafe-suenos-cafe-03.png',
  ],
  variants: [{ size: '340g', price: 38000 }],
  featuredHome: true,
  featuredSection: 'coleccion',
  priority: 19,
};

const kitFrutosMontana = {
  id: 'kit-frutos-montana',
  name: 'Kit Frutos de Nuestra Montaña',
  category: 'cafe',
  subcategory: 'ediciones-especiales',
  tags: ['Kit', 'Edición Navidad'],
  image: '/assets/products/cafe/ediciones-especiales/kit-frutos-montana/kit-frutos-montana-main.jpg',
  images: [
    '/assets/products/cafe/ediciones-especiales/kit-frutos-montana/kit-frutos-montana-main.jpg',
    '/assets/products/cafe/ediciones-especiales/kit-frutos-montana/kit-frutos-montana-02.jpg',
    '/assets/products/cafe/ediciones-especiales/kit-frutos-montana/kit-frutos-montana-03.png',
  ],
  // Caja navideña: no aplica gramaje ni molienda.
  variants: [{ size: null, price: 95000 }],
  featuredHome: true,
  featuredSection: 'coleccion',
  priority: 26,
};

// ─── CAFÉ — CAFÉS EXÓTICOS ────────────────────────────────────────────────────

const cafeBourbonRosado = {
  id: 'cafe-bourbon-rosado',
  name: 'Café Bourbon Rosado',
  category: 'cafe',
  subcategory: 'cafes-exoticos',
  tags: ['Exótico', 'Varietal'],
  image: '/assets/products/cafe/cafes-exoticos/bourbon-rosado/cafe-bourbon-rosado-main.png',
  images: [
    '/assets/products/cafe/cafes-exoticos/bourbon-rosado/cafe-bourbon-rosado-main.png',
    '/assets/products/cafe/cafes-exoticos/bourbon-rosado/cafe-bourbon-rosado-02.png',
    '/assets/products/cafe/cafes-exoticos/bourbon-rosado/cafe-bourbon-rosado-03.png',
  ],
  variants: [{ size: '340g', price: 48000 }],
  featuredHome: true,
  featuredSection: 'coleccion',
  priority: 25,
};

const cafeGeisha = {
  id: 'cafe-geisha-340g',
  name: 'Café Geisha',
  category: 'cafe',
  subcategory: 'cafes-exoticos',
  // La etiqueta real dice: "Variedad Geisha — Miguel Bohorquez — Edición de Lujo"
  tags: ['Exótico', 'Varietal', 'Edición de Lujo'],
  image: '/assets/products/cafe/cafes-exoticos/geisha/cafe-geisha-340g-main.png',
  images: [
    '/assets/products/cafe/cafes-exoticos/geisha/cafe-geisha-340g-main.png',
    '/assets/products/cafe/cafes-exoticos/geisha/cafe-geisha-340g-02.png',
    '/assets/products/cafe/cafes-exoticos/geisha/cafe-geisha-340g-03.png',
  ],
  variants: [{ size: '340g', price: 65000 }],
  featuredHome: true,
  featuredSection: 'coleccion',
  priority: 23,
};

// ─── ALIMENTOS ────────────────────────────────────────────────────────────────

const bizcochoAchira = {
  id: 'bizcocho-de-achira',
  name: 'Bizcocho de Achira',
  category: 'alimentos',
  subcategory: 'achiras',
  tags: ['Tradición del Huila', 'Bizcocho'],
  image: '/assets/products/alimentos/achiras/achiras-main.jpg',
  images: [
    '/assets/products/alimentos/achiras/achiras-main.jpg',
    '/assets/products/alimentos/achiras/achiras-02.jpg',
    '/assets/products/alimentos/achiras/achiras-03.png',
  ],
  variants: [{ size: null, price: 14000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 8,
};

// ─── ACCESORIOS — MÉTODOS ─────────────────────────────────────────────────────
// Nota: pendiente confirmar con el cliente si estos accesorios se venden.

const v60CeramicoBlanco = {
  id: 'v60-ceramico-blanco',
  name: 'V60 Cerámico Blanco',
  category: 'accesorios',
  subcategory: 'v60',
  tags: ['Método', 'V60'],
  image: '/assets/products/accesorios/metodos/v60/v60-ceramico-blanco-01.jpg',
  images: ['/assets/products/accesorios/metodos/v60/v60-ceramico-blanco-01.jpg'],
  variants: [{ size: null, price: 48000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const v60PlasticoTransparente = {
  id: 'v60-plastico-transparente',
  name: 'V60 Plástico Transparente',
  category: 'accesorios',
  subcategory: 'v60',
  tags: ['Método', 'V60'],
  image: '/assets/products/accesorios/metodos/v60/v60-plastico-transparente-01.jpg',
  images: ['/assets/products/accesorios/metodos/v60/v60-plastico-transparente-01.jpg'],
  variants: [{ size: null, price: 32000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const v60SetBasico = {
  id: 'v60-set-basico',
  name: 'V60 Set Básico',
  category: 'accesorios',
  subcategory: 'v60',
  tags: ['Método', 'V60', 'Set'],
  image: '/assets/products/accesorios/metodos/v60/v60-set-basico-01.jpg',
  images: ['/assets/products/accesorios/metodos/v60/v60-set-basico-01.jpg'],
  variants: [{ size: null, price: 85000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const chemex3Tazas = {
  id: 'chemex-3-tazas',
  name: 'Chemex 3 Tazas',
  category: 'accesorios',
  subcategory: 'chemex',
  tags: ['Método', 'Chemex'],
  image: '/assets/products/accesorios/metodos/chemex/chemex-3-tazas-01.jpg',
  images: [
    '/assets/products/accesorios/metodos/chemex/chemex-3-tazas-01.jpg',
    '/assets/products/accesorios/metodos/chemex/chemex-3-tazas-02.jpg',
    '/assets/products/accesorios/metodos/chemex/chemex-3-tazas-03.jpg',
  ],
  variants: [{ size: null, price: 130000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const prensaFrancesaNegra = {
  id: 'prensa-francesa-negra',
  name: 'Prensa Francesa Negra',
  category: 'accesorios',
  subcategory: 'prensa-francesa',
  tags: ['Método', 'Prensa Francesa'],
  image: '/assets/products/accesorios/metodos/prensa-francesa/prensa-francesa-negra-01.jpg',
  images: ['/assets/products/accesorios/metodos/prensa-francesa/prensa-francesa-negra-01.jpg'],
  variants: [{ size: null, price: 58000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const prensaFrancesaRoja = {
  id: 'prensa-francesa-roja',
  name: 'Prensa Francesa Roja',
  category: 'accesorios',
  subcategory: 'prensa-francesa',
  tags: ['Método', 'Prensa Francesa'],
  image: '/assets/products/accesorios/metodos/prensa-francesa/prensa-francesa-roja-01.jpg',
  images: ['/assets/products/accesorios/metodos/prensa-francesa/prensa-francesa-roja-01.jpg'],
  variants: [{ size: null, price: 58000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const cafeteraColdBrewHario = {
  id: 'cafetera-cold-brew-hario',
  name: 'Cafetera Cold Brew Hario',
  category: 'accesorios',
  subcategory: 'cold-brew',
  tags: ['Método', 'Cold Brew'],
  image: '/assets/products/accesorios/metodos/cold-brew/cafetera-cold-brew-hario-01.jpg',
  images: [
    '/assets/products/accesorios/metodos/cold-brew/cafetera-cold-brew-hario-01.jpg',
    '/assets/products/accesorios/metodos/cold-brew/cafetera-cold-brew-hario-02.jpg',
  ],
  variants: [{ size: null, price: 95000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const kitV60Hario = {
  id: 'kit-v60-hario',
  name: 'Kit V60 Hario',
  category: 'accesorios',
  subcategory: 'kits',
  tags: ['Kit', 'V60', 'Hario'],
  image: '/assets/products/accesorios/metodos/kits/kit-v60-hario-01.jpg',
  images: [
    '/assets/products/accesorios/metodos/kits/kit-v60-hario-01.jpg',
    '/assets/products/accesorios/metodos/kits/kit-v60-hario-02.jpg',
  ],
  variants: [{ size: null, price: 120000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const cafeteraInfusionFria = {
  // Nota: el archivo principal tiene un typo ("afetera"), el secundario es correcto.
  id: 'cafetera-infusion-fria',
  name: 'Cafetera Infusión Fría',
  category: 'accesorios',
  subcategory: 'sifon',
  tags: ['Método', 'Infusión Fría'],
  image: '/assets/products/accesorios/metodos/sifon/cafetera-infusion-fria-02.jpg',
  images: [
    '/assets/products/accesorios/metodos/sifon/cafetera-infusion-fria-02.jpg',
    '/assets/products/accesorios/metodos/sifon/afetera-infusion-fria-01.jpg',
  ],
  variants: [{ size: null, price: 110000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

// ─── ACCESORIOS — OTROS ───────────────────────────────────────────────────────

const botellaTermicaNegra = {
  id: 'botella-termica-negra',
  name: 'Botella Térmica Negra',
  category: 'accesorios',
  subcategory: 'botella-termica',
  tags: ['Accesorio'],
  image: '/assets/products/accesorios/botella-termica-negra/botella-termica-negra.jpg',
  images: ['/assets/products/accesorios/botella-termica-negra/botella-termica-negra.jpg'],
  variants: [{ size: null, price: 55000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const filtrosV60 = {
  id: 'filtros-v60-60-unidades',
  name: 'Filtros V60 60 Unidades',
  category: 'accesorios',
  subcategory: 'filtros-v60',
  tags: ['Accesorio', 'V60'],
  image: '/assets/products/accesorios/filtros-v60/filtros-v60-60-unidades-01.jpg',
  images: [
    '/assets/products/accesorios/filtros-v60/filtros-v60-60-unidades-01.jpg',
    '/assets/products/accesorios/filtros-v60/filtros-v60-60-unidades-02.png',
  ],
  variants: [{ size: null, price: 22000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const mugNegroCoocentral = {
  id: 'mug-negro-coocentral',
  name: 'Mug Negro Coocentral',
  category: 'accesorios',
  subcategory: 'mug',
  tags: ['Accesorio', 'Mug'],
  image: '/assets/products/accesorios/mug-negro-coocentral/mug-negro-coocentral.png',
  images: ['/assets/products/accesorios/mug-negro-coocentral/mug-negro-coocentral.png'],
  variants: [{ size: null, price: 35000 }],
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

// ─── LISTA MAESTRA ──────────────────────────────────────────────────────────────

export const products = [
  // Café — Mezclas (Especial/Premium/Mujeres consolidados con gramaje)
  cafeEspecial,
  cafePremium,
  cafeMujeresCafeteras,
  cafeDonMaximo,
  cafeClasico,

  // Café — Ediciones Especiales
  cafePremium50Anos,
  cafeEdicionLimitada,
  cafeNotasJuventud,
  cafeSuenosCafe,
  kitFrutosMontana,

  // Café — Exóticos
  cafeBourbonRosado,
  cafeGeisha,

  // Alimentos
  bizcochoAchira,

  // Accesorios — Métodos
  v60CeramicoBlanco,
  v60PlasticoTransparente,
  v60SetBasico,
  chemex3Tazas,
  prensaFrancesaNegra,
  prensaFrancesaRoja,
  cafeteraColdBrewHario,
  kitV60Hario,
  cafeteraInfusionFria,

  // Accesorios — Otros
  botellaTermicaNegra,
  filtrosV60,
  mugNegroCoocentral,
];
