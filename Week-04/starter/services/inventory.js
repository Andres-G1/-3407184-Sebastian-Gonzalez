import { Product } from '../models/index.js';
import storage from './storage.js';
import { APP_CONFIG } from '../config.js';

// Array de productos en memoria para acceso rápido
let products = [];

/**
 * Persiste el estado actual en el localStorage
 */
const persist = () => {
  storage.save(APP_CONFIG.storageKey, products);
};

/**
 * Inicializa el inventario desde el localStorage
 * @returns {Array<Product>}
 */
export const init = () => {
  const data = storage.load(APP_CONFIG.storageKey) || [];
  // Convertimos los objetos planos de nuevo a instancias de la clase Product
  products = data.map(item => Product.fromJSON(item));
  return [...products];
};

/**
 * Obtiene todos los productos (retorna una copia para evitar mutaciones accidentales)
 * @returns {Array<Product>}
 */
export const getAll = () => [...products];

/**
 * Obtiene un producto por su ID
 * @param {number} id
 * @returns {Product|undefined}
 */
export const getById = id => products.find(p => p.id === Number(id));

/**
 * Agrega un nuevo producto al inventario
 * @param {Object} productData - Datos del producto ({ name, category, price, quantity })
 * @returns {Product}
 */
export const add = (productData) => {
  const newProduct = new Product(productData);
  products.push(newProduct);
  persist();
  return newProduct;
};

/**
 * Actualiza un producto existente
 * @param {number} id - ID del producto
 * @param {Object} updates - Campos a modificar
 * @returns {Product|null}
 */
export const update = (id, updates) => {
  const product = getById(id);
  if (!product) return null;
  
  product.update(updates);
  persist();
  return product;
};

/**
 * Elimina un producto del inventario
 * @param {number} id - ID del producto
 * @returns {boolean} - Estado de éxito
 */
export const remove = id => {
  const initialLength = products.length;
  products = products.filter(p => p.id !== Number(id));
  
  if (products.length !== initialLength) {
    persist();
    return true;
  }
  return false;
};

/**
 * Filtra productos según criterios de búsqueda y stock
 * @param {Object} filters - Criterios de filtrado
 * @returns {Array<Product>}
 */
export const filter = ({
  search = '',
  category = '',
  stockFilter = '', // 'low', 'out', 'available'
} = {}) => {
  return products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || product.category === category;
    
    let matchesStock = true;
    if (stockFilter === 'low') matchesStock = product.isLowStock;
    if (stockFilter === 'out') matchesStock = product.isOutOfStock;
    if (stockFilter === 'available') matchesStock = !product.isOutOfStock;

    return matchesSearch && matchesCategory && matchesStock;
  });
};

/**
 * Obtiene productos por categoría específica
 * @param {string} categoryId
 * @returns {Array<Product>}
 */
export const getByCategory = categoryId => {
  return products.filter(p => p.category === categoryId);
};

// Exportación por defecto para conveniencia
export default {
  init,
  getAll,
  getById,
  add,
  update,
  remove,
  filter,
  getByCategory,
};
