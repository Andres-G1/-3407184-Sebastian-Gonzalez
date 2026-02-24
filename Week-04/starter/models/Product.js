import { THRESHOLDS } from '../config.js';

/**
 * Product Model
 * Represents a product in the inventory
 */
class Product {
  // Propiedad estática para manejar IDs únicos de forma incremental
  static nextId = 1;

  /**
   * Create a new Product
   * @param {Object} productData - Datos iniciales del producto
   */
  constructor({ name, category, price = 0, quantity = 0 }) {
    // Asignación de propiedades básicas
    this.id = Product.nextId++;
    this.name = name;
    this.category = category;
    this.price = Number(price);
    this.quantity = Number(quantity);

    // Timestamps para trazabilidad en salud mental
    const now = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
  }

  /**
   * Calcula el valor total del stock (precio * cantidad)
   * @returns {number}
   */
  get totalValue() {
    return this.price * this.quantity;
  }

  /**
   * Verifica si el stock está por debajo del umbral preventivo
   * @returns {boolean}
   */
  get isLowStock() {
    return this.quantity > 0 && this.quantity <= THRESHOLDS.low;
  }

  /**
   * Verifica si el producto se ha agotado completamente
   * @returns {boolean}
   */
  get isOutOfStock() {
    return this.quantity <= 0;
  }

  /**
   * Actualiza los datos del producto mediante encadenamiento (chaining)
   * @param {Object} updates - Campos a actualizar
   * @returns {Product}
   */
  update({ name, category, price, quantity }) {
    // Solo actualizamos si el valor fue proporcionado (evita sobrescribir con undefined)
    if (name !== undefined) this.name = name;
    if (category !== undefined) this.category = category;
    if (price !== undefined) this.price = Number(price);
    if (quantity !== undefined) this.quantity = Number(quantity);

    // Actualizamos la fecha de modificación
    this.updatedAt = new Date().toISOString();

    return this; // Permite: producto.update({...}).toJSON()
  }

  /**
   * Convierte la instancia a un objeto plano para persistencia
   * @returns {Object}
   */
  toJSON() {
    // Uso de Shorthand properties y destructuring
    const { id, name, category, price, quantity, createdAt, updatedAt } = this;
    return { id, name, category, price, quantity, createdAt, updatedAt };
  }

  /**
   * Reconstruye un objeto Product a partir de datos planos (ej. de LocalStorage)
   * @param {Object} data - Objeto con los datos del producto
   * @returns {Product}
   */
  static fromJSON(data) {
    const { id, name, category, price, quantity, createdAt, updatedAt } = data;
    
    // Creamos una instancia nueva
    const product = new Product({ name, category, price, quantity });
    
    // Restauramos los metadatos originales que el constructor sobrescribiría
    product.id = id;
    product.createdAt = createdAt;
    product.updatedAt = updatedAt;

    // Aseguramos que el siguiente ID estático sea mayor al ID restaurado
    if (id >= Product.nextId) {
      Product.nextId = id + 1;
    }

    return product;
  }
}

export default Product;
