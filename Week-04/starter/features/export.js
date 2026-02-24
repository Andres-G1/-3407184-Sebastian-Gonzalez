/**
 * Export Feature Module
 * Lazy loaded module for exporting inventory data
 * This module is loaded on-demand using dynamic imports
 */

/**
 * Convierte los productos a una cadena JSON formateada
 * @param {Array} products
 * @returns {string} - JSON string
 */
export const toJSON = products => {
  return JSON.stringify(products, null, 2);
};

/**
 * Convierte los productos a formato CSV
 * @param {Array} products
 * @returns {string} - CSV string
 */
export const toCSV = products => {
  const headers = ['name', 'category', 'price', 'quantity', 'total'];
  const headerRow = headers.join(',');

  // Generación de filas usando destructuring y cálculo de total
  const rows = products.map(({ name, category, price, quantity }) => {
    const total = (price * quantity).toFixed(2);
    return [name, category, price, quantity, total].join(',');
  });

  return [headerRow, ...rows].join('\n');
};

/**
 * Crea un Blob y dispara la descarga en el navegador
 * @param {string} content - Contenido del archivo
 * @param {string} filename - Nombre del archivo
 * @param {string} type - MIME type
 */
export const downloadFile = (content, filename, type = 'application/json') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Limpieza del DOM y de memoria
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Exporta y descarga el inventario como JSON
 * @param {Array} products
 */
export const exportJSON = products => {
  const content = toJSON(products);
  const filename = `inventory_${Date.now()}.json`;
  downloadFile(content, filename, 'application/json');
};

/**
 * Exporta y descarga el inventario como CSV
 * @param {Array} products
 */
export const exportCSV = products => {
  const content = toCSV(products);
  const filename = `inventory_${Date.now()}.csv`;
  downloadFile(content, filename, 'text/csv');
};

// Exportación por defecto para facilitar la importación masiva
export default {
  toJSON,
  toCSV,
  exportJSON,
  exportCSV,
  downloadFile,
};

// Log de carga (útil para verificar Lazy Loading)
console.log('📤 Export module loaded!');
