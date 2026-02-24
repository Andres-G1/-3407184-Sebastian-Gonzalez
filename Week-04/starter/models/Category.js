/**
 * Category Model
 * Represents a product category
 */
class Category {
  /**
   * Create a new Category
   * @param {Object} data - Category data
   */
  constructor({ id, name, icon = '📦' }) {
    // Asignación mediante destructuring del objeto de entrada
    this.id = id;
    this.name = name;
    this.icon = icon;
  }

  /**
   * Get display name with icon
   * @example "💊 Farmacia"
   * @returns {string}
   */
  get displayName() {
    // Retorna el icono y el nombre combinados
    return `${this.icon} ${this.name}`;
  }

  /**
   * Convert to option element data for <select>
   * @returns {Object} - { value, text }
   */
  toOption() {
    return {
      value: this.id,
      text: this.displayName
    };
  }
}

// Exportación por defecto para mantener la modularidad
export default Category;

/** 
 * Ejemplo de uso:
 * const cat = new Category({ id: 'meds', name: 'Medicamentos', icon: '💊' });
 * console.log(cat.displayName); // "💊 Medicamentos"
 */
