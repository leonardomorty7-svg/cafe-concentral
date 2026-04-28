/**
 * products.js — Structured product data layer
 *
 * Source of truth: /public/assets/products/
 * Each entry maps 1:1 to a real image file on disk.
 *
 * Curation fields:
 *   featuredHome    — true if this product is eligible for homepage display
 *   featuredSection — "exclusivas" | "coleccion" | null
 *                     Determines which homepage section the product appears in.
 *                     "exclusivas" → "Categorías Exclusivas" grid (top 3 by priority)
 *                     "coleccion"  → "Selección de Temporada" section
 *   priority        — integer, higher = more prominent. Used to sort within each section.
 *
 * Curation rules for "exclusivas" (must avoid visual repetition):
 *   Slot 1 (priority 30) — classic product   : Café Especial 340g  (green bag)
 *   Slot 2 (priority 29) — premium product   : Café Premium 340g   (black bag)
 *   Slot 3 (priority 28) — special edition   : Mujeres Cafeteras 500g (distinct packaging)
 *
 * Curation rules for "coleccion":
 *   All ediciones-especiales + bourbon-rosado (zero overlap with "exclusivas")
 */

// ─── CAFÉ — MEZCLAS ──────────────────────────────────────────────────────────

const cafeEspecial340g = {
  id: 'cafe-especial-340g',
  name: 'Café Especial 340g',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Mezcla', 'Especial'],
  image: '/assets/products/cafe/mezclas/cafe-especial/340g/cafe-especial-340g-main.png',
  images: [
    '/assets/products/cafe/mezclas/cafe-especial/340g/cafe-especial-340g-main.png',
    '/assets/products/cafe/mezclas/cafe-especial/340g/cafe-especial-340g-02.png',
    '/assets/products/cafe/mezclas/cafe-especial/340g/cafe-especial-340g-03.png',
  ],
  // Curation — classic slot in "exclusivas"
  featuredHome: true,
  featuredSection: 'exclusivas',
  priority: 30,
};

const cafeEspecial500g = {
  id: 'cafe-especial-500g',
  name: 'Café Especial 500g',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Mezcla', 'Especial'],
  image: '/assets/products/cafe/mezclas/cafe-especial/500g/cafe-especial-500g-main.png',
  images: [
    '/assets/products/cafe/mezclas/cafe-especial/500g/cafe-especial-500g-main.png',
    '/assets/products/cafe/mezclas/cafe-especial/500g/cafe-especial-500g-02.png',
    '/assets/products/cafe/mezclas/cafe-especial/500g/cafe-especial-500g-03.png',
  ],
  // Same packaging style as 340g — kept off homepage to avoid duplication
  featuredHome: false,
  featuredSection: null,
  priority: 10,
};

const cafePremium340g = {
  id: 'cafe-premium-340g',
  name: 'Café Premium 340g',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Mezcla', 'Premium'],
  image: '/assets/products/cafe/mezclas/cafe-premium/340g/cafe-premium-340g-main.png',
  images: [
    '/assets/products/cafe/mezclas/cafe-premium/340g/cafe-premium-340g-main.png',
    '/assets/products/cafe/mezclas/cafe-premium/340g/cafe-premium-340g-02.png',
    '/assets/products/cafe/mezclas/cafe-premium/340g/cafe-premium-340g-03.png',
  ],
  // Curation — premium slot in "exclusivas" (black bag, visually distinct from green)
  featuredHome: true,
  featuredSection: 'exclusivas',
  priority: 29,
};

const cafePremium500g = {
  id: 'cafe-premium-500g',
  name: 'Café Premium 500g',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Mezcla', 'Premium'],
  image: '/assets/products/cafe/mezclas/cafe-premium/500g/cafe-premium-500g-main.png',
  images: [
    '/assets/products/cafe/mezclas/cafe-premium/500g/cafe-premium-500g-main.png',
    '/assets/products/cafe/mezclas/cafe-premium/500g/cafe-premium-500g-02.png',
    '/assets/products/cafe/mezclas/cafe-premium/500g/cafe-premium-500g-03.png',
  ],
  // Same style as 340g — excluded from homepage to avoid repetition
  featuredHome: false,
  featuredSection: null,
  priority: 10,
};

const mujeresCafeteras340g = {
  id: 'cafe-mujeres-cafeteras-340g',
  name: 'Mujeres Cafeteras 340g',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Mezcla', 'Edición Especial'],
  image: '/assets/products/cafe/mezclas/mujeres-cafeteras/340g/cafe-mujeres-cafeteras-340g-main.png',
  images: [
    '/assets/products/cafe/mezclas/mujeres-cafeteras/340g/cafe-mujeres-cafeteras-340g-main.png',
    '/assets/products/cafe/mezclas/mujeres-cafeteras/340g/cafe-mujeres-cafeteras-340g-02.png',
    '/assets/products/cafe/mezclas/mujeres-cafeteras/340g/cafe-mujeres-cafeteras-340g-03.png',
  ],
  // 500g gets the homepage slot for visual distinction
  featuredHome: false,
  featuredSection: null,
  priority: 10,
};

const mujeresCafeteras500g = {
  id: 'cafe-mujeres-cafeteras-500g',
  name: 'Mujeres Cafeteras 500g',
  category: 'cafe',
  subcategory: 'mezclas',
  tags: ['Mezcla', 'Edición Especial'],
  image: '/assets/products/cafe/mezclas/mujeres-cafeteras/500g/cafe-mujeres-cafeteras-500g-main.png',
  images: [
    '/assets/products/cafe/mezclas/mujeres-cafeteras/500g/cafe-mujeres-cafeteras-500g-main.png',
    '/assets/products/cafe/mezclas/mujeres-cafeteras/500g/cafe-mujeres-cafeteras-500g-02.png',
    '/assets/products/cafe/mezclas/mujeres-cafeteras/500g/cafe-mujeres-cafeteras-500g-03.png',
  ],
  // Curation — special-edition slot in "exclusivas" (distinct packaging from the two above)
  featuredHome: true,
  featuredSection: 'exclusivas',
  priority: 28,
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
  featuredHome: true,
  featuredSection: 'coleccion',
  priority: 19,
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
  // Visually distinct — included in "coleccion" to add variety
  featuredHome: true,
  featuredSection: 'coleccion',
  priority: 25,
};

// ─── ACCESORIOS — MÉTODOS ─────────────────────────────────────────────────────

const v60CeramicoBlanco = {
  id: 'v60-ceramico-blanco',
  name: 'V60 Cerámico Blanco',
  category: 'accesorios',
  subcategory: 'v60',
  tags: ['Método', 'V60'],
  image: '/assets/products/accesorios/metodos/v60/v60-ceramico-blanco-01.jpg',
  images: ['/assets/products/accesorios/metodos/v60/v60-ceramico-blanco-01.jpg'],
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
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

const cafeteraInfusionFria = {
  // Note: primary file has a typo ("afetera"), secondary is correct.
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
  featuredHome: false,
  featuredSection: null,
  priority: 5,
};

// ─── MASTER LIST ──────────────────────────────────────────────────────────────

/**
 * All products sourced strictly from /public/assets/products/.
 * No mock data. No invented entries.
 */
export const products = [
  // Café — Mezclas
  cafeEspecial340g,
  cafeEspecial500g,
  cafePremium340g,
  cafePremium500g,
  mujeresCafeteras340g,
  mujeresCafeteras500g,

  // Café — Ediciones Especiales
  cafePremium50Anos,
  cafeEdicionLimitada,
  cafeNotasJuventud,
  cafeSuenosCafe,

  // Café — Exóticos
  cafeBourbonRosado,

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
