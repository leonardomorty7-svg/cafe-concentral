/**
 * products.ts — Product query helpers
 *
 * Thin functional layer over the products data array.
 * All functions are pure and synchronous (no network calls).
 * Ready to be swapped out for a Shopify Storefront API call in the future.
 */

import { products } from '../data/products.js';

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type ProductCategory = 'cafe' | 'accesorios' | 'experiencias';
export type FeaturedSection = 'exclusivas' | 'coleccion' | null;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  tags: string[];
  /** Primary display image — always a real path under /public */
  image: string;
  /** All available images for this product */
  images: string[];
  /** Whether this product is eligible for any homepage section */
  featuredHome: boolean;
  /**
   * Which homepage section this product belongs to:
   *   "exclusivas" → "Categorías Exclusivas" grid
   *   "coleccion"  → "Selección de Temporada" section
   *   null         → not shown on homepage
   */
  featuredSection: FeaturedSection;
  /** Higher number = higher display priority within a section */
  priority: number;
}

// ─── INTERNAL HELPERS ─────────────────────────────────────────────────────────

/** Cast the raw JS array to typed Product[]. */
const all = () => products as Product[];

/** Sort descending by priority. */
const byPriorityDesc = (a: Product, b: Product) => b.priority - a.priority;

// ─── QUERY FUNCTIONS ──────────────────────────────────────────────────────────

/** Returns the full product catalogue. */
export function getAllProducts(): Product[] {
  return all();
}

/** Returns all products belonging to a given top-level category. */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return all().filter((p) => p.category === category);
}

/** Returns all products belonging to a given subcategory (folder name). */
export function getProductsBySubcategory(subcategory: string): Product[] {
  return all().filter((p) => p.subcategory === subcategory);
}

/** Returns products that include a given tag. */
export function getProductsByTag(tag: string): Product[] {
  return all().filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/** Returns a single product by id (slug). */
export function getProductById(id: string): Product | undefined {
  return all().find((p) => p.id === id);
}

/**
 * Returns products curated for the "Categorías Exclusivas" homepage grid.
 *   - featuredHome === true AND featuredSection === "exclusivas"
 *   - Sorted by priority DESC
 *   - Hard-capped at 3 to preserve the 3-column layout
 */
export function getExclusivas(limit = 3): Product[] {
  return all()
    .filter((p) => p.featuredHome && p.featuredSection === 'exclusivas')
    .sort(byPriorityDesc)
    .slice(0, limit);
}

/**
 * Returns products curated for the "Selección de Temporada" (colección) section.
 *   - featuredHome === true AND featuredSection === "coleccion"
 *   - Sorted by priority DESC
 *   - Guaranteed zero overlap with getExclusivas() by section assignment
 */
export function getColeccion(): Product[] {
  return all()
    .filter((p) => p.featuredHome && p.featuredSection === 'coleccion')
    .sort(byPriorityDesc);
}

/** Returns the first N products, useful for ad-hoc featured blocks. */
export function getFeaturedProducts(limit = 3): Product[] {
  return all().slice(0, limit);
}
