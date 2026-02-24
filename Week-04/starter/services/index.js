/**
 * Services Barrel Export
 * Re-exports all services from a single entry point
 */

// Importación y re-exportación de servicios principales (Default Exports)
export { default as storage } from './storage.js';
export { default as inventory } from './inventory.js';

// Exportación de todas las constantes o funciones nombradas (Named Exports)
// Útil si tienes utilidades específicas dentro de storage.js (ej. validadores)
export * from './storage.js';

/**
 * Ejemplo de uso en la UI:
 * import { inventory, storage } from './services/index.js';
 * 
 * inventory.addProduct(new Product(...));
 */
