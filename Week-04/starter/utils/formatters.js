/**
 * Formatters Utility Module
 * Functions for formatting data
 */

/**
 * Formatea el precio como moneda (EUR/USD)
 * @param {number} price
 * @param {string} currency - Código de moneda
 * @returns {string}
 */
export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
  }).format(price);
};

/**
 * Formatea la fecha y hora
 * @param {Date|string} date
 * @returns {string}
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date));
};

/**
 * Formatea la cantidad con su estado visual de stock
 * @param {number} quantity
 * @param {Object} options - Umbrales de stock
 * @returns {Object} - { text, className }
 */
export const formatStock = (
  quantity,
  { lowThreshold = 20, criticalThreshold = 10 } = {}
) => {
  let className = 'stock-ok';
  let text = `${quantity} unidades`;

  if (quantity === 0) {
    className = 'stock-out';
    text = 'Agotado';
  } else if (quantity <= criticalThreshold) {
    className = 'stock-critical';
    text = `¡Crítico! (${quantity})`;
  } else if (quantity <= lowThreshold) {
    className = 'stock-low';
    text = `Bajo (${quantity})`;
  }

  return { text, className };
};

/**
 * Trunca el texto con puntos suspensivos
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

// Exportación por defecto
export default {
  formatPrice,
  formatDate,
  formatStock,
  truncate
};
