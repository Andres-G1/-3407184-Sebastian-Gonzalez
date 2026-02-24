/**
 * Validators Utility Module
 * Functions for validating data
 */

/**
 * Valida los datos de un producto (Insumo)
 * @param {Object} productData
 * @returns {Object} - { isValid, errors }
 */
export const validateProduct = ({ name, category, price, quantity } = {}) => {
  const errors = [];

  // Validación de Nombre
  if (!name || name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  // Validación de Categoría
  if (!category || category.trim() === '') {
    errors.push('La categoría es obligatoria');
  }

  // Validación de Precio
  if (!isValidPrice(price)) {
    errors.push('El precio debe ser un número mayor o igual a 0');
  }

  // Validación de Cantidad
  if (!isValidQuantity(quantity)) {
    errors.push('La cantidad debe ser un número entero mayor o igual a 0');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valida si el valor es un precio válido
 * @param {*} value
 * @returns {boolean}
 */
export const isValidPrice = value => {
  const n = parseFloat(value);
  return !isNaN(n) && isFinite(n) && n >= 0;
};

/**
 * Valida si el valor es una cantidad válida (entero)
 * @param {*} value
 * @returns {boolean}
 */
export const isValidQuantity = value => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 0;
};

/**
 * Sanitiza entradas de texto para evitar XSS básico
 * @param {string} input
 * @returns {string}
 */
export const sanitize = input => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/&/g, '&amp;') // Primero escapar el ampersand
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export default {
  validateProduct,
  isValidPrice,
  isValidQuantity,
  sanitize
};
