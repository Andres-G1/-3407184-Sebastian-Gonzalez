/**
 * Models Barrel Export
 * Re-exports all models from a single entry point
 */

// Importación y re-exportación de modelos
export { default as Product } from './Product.js';
export { default as Category } from './Category.js';

/**
 * Ejemplo de uso en otros archivos:
 * import { Product, Category } from './models/index.js';
 */
