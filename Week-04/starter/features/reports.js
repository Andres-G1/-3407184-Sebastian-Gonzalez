/**
 * Reports Feature Module
 * Lazy loaded module for generating inventory reports
 * This module is loaded on-demand using dynamic imports
 */

// CORREGIDO: la ruta era './config.js' pero este archivo está en features/,
// por eso debe subir un nivel con '../config.js'
import { THRESHOLDS } from '../config.js';

/**
 * Generate comprehensive inventory statistics
 * @param {Array} products - Array of products
 * @returns {Object} - Statistics object
 */
export const generateStats = products => {
  if (products.length === 0) return {
    totalProducts: 0,
    totalValue: 0,
    totalItems: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    categoryCounts: {},
    avgPrice: 0,
    avgQuantity: 0,
  };

  return products.reduce((stats, { price, quantity, category }) => {
    const itemValue = price * quantity;

    // Acumuladores básicos
    stats.totalProducts += 1;
    stats.totalValue += itemValue;
    stats.totalItems += quantity;

    // Conteo de stock basado en THRESHOLDS
    if (quantity === 0) stats.outOfStockProducts += 1;
    else if (quantity <= THRESHOLDS.low) stats.lowStockProducts += 1;

    // Conteo por categoría
    stats.categoryCounts[category] = (stats.categoryCounts[category] || 0) + 1;

    // Cálculos promedios
    stats.avgPrice = stats.totalItems > 0 ? stats.totalValue / stats.totalItems : 0;
    stats.avgQuantity = stats.totalProducts > 0 ? stats.totalItems / stats.totalProducts : 0;

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

  const grouped = products.reduce((acc, { category, price, quantity }) => {
    if (!acc[category]) {
      acc[category] = { category, count: 0, totalValue: 0 };
    }
    acc[category].count += 1;
    acc[category].totalValue += (price * quantity);
    return acc;
  }, {});

  return Object.values(grouped).map(item => ({
    ...item,
    percentage: grandTotal > 0 ? ((item.totalValue / grandTotal) * 100).toFixed(2) : 0
  }));
};

export default {
  generateStats,
  getLowStockProducts,
  groupByCategory,
  getTopByValue,
  getCategoryBreakdown,
};

console.log('📊 Reports module loaded!');
