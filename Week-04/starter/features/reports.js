/**
 * Reports Feature Module
 * Lazy loaded module for generating inventory reports
 * This module is loaded on-demand using dynamic imports
 */

// TODO: Import dependencies when implementing
// import { STOCK_THRESHOLDS, CATEGORIES } from '../config.js';

import { THRESHOLDS } from './config.js';

/**
 * Generate comprehensive inventory statistics
 * @param {Array} products - Array of products
 * @returns {Object} - Statistics object
 */
export const generateStats = products => {
  if (products.length === 0) return {};

  return products.reduce((stats, { price, quantity, category }) => {
    const itemValue = price * quantity;

    // Acumuladores básicos
    stats.totalProducts += 1;
    stats.totalValue += itemValue;
    stats.totalItems += quantity;

    // Conteo de stock basado en THRESHOLDS
    if (quantity === 0) stats.outOfStockProducts += 1;
    else if (quantity <= THRESHOLDS.low) stats.lowStockProducts += 1;

    // Conteo por categoría (Destructuring en la asignación)
    stats.categoryCounts[category] = (stats.categoryCounts[category] || 0) + 1;

    // Cálculos promedios (se finalizan abajo)
    stats.avgPrice = stats.totalValue / stats.totalItems; // Precio promedio ponderado
    stats.avgQuantity = stats.totalItems / stats.totalProducts;

    return stats;
  }, {
    totalProducts: 0,
    totalValue: 0,
    totalItems: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    categoryCounts: {},
    avgPrice: 0,
    avgQuantity: 0,
  });
};

/**
 * Get low stock products
 * @param {Array} products
 * @returns {Array}
 */
export const getLowStockProducts = products => {
  // Filtra productos que están entre 1 y el umbral 'low'
  return products.filter(({ quantity }) => quantity > 0 && quantity <= THRESHOLDS.low);
};

/**
 * Get products by category
 * @param {Array} products
 * @returns {Object} - { categoryId: [products] }
 */
export const groupByCategory = products => {
  return products.reduce((acc, product) => {
    const { category } = product;
    // Si la categoría no existe en el acumulador, la inicializamos
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});
};

/**
 * Get top products by value
 * @param {Array} products
 * @param {number} limit
 * @returns {Array}
 */
export const getTopByValue = (products, limit = 5) => {
  // Creamos una copia para no mutar el array original y ordenamos por valor total
  return [...products]
    .sort((a, b) => (b.price * b.quantity) - (a.price * a.quantity))
    .slice(0, limit);
};

/**
 * Calculate category breakdown
 * @param {Array} products
 * @returns {Array} - [{ category, count, totalValue, percentage }]
 */
export const getCategoryBreakdown = products => {
  const { totalValue: grandTotal } = generateStats(products);

  // Agrupamos primero los datos por categoría
  const grouped = products.reduce((acc, { category, price, quantity }) => {
    if (!acc[category]) {
      acc[category] = { category, count: 0, totalValue: 0 };
    }
    acc[category].count += 1;
    acc[category].totalValue += (price * quantity);
    return acc;
  }, {});

  // Convertimos el objeto a un array y calculamos porcentajes
  return Object.values(grouped).map(item => ({
    ...item,
    percentage: grandTotal > 0 ? ((item.totalValue / grandTotal) * 100).toFixed(2) : 0
  }));
};

// Default export for convenience
export default {
  generateStats,
  getLowStockProducts,
  groupByCategory,
  getTopByValue,
  getCategoryBreakdown,
};

console.log('📊 Reports module loaded!');
