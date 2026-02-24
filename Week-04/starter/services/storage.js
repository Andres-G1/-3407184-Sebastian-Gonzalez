import { APP_CONFIG } from '../config.js';

/**
 * Guarda datos en localStorage
 * @param {string} key - Clave del almacenamiento
 * @param {*} data - Datos a guardar (serán convertidos a JSON)
 */
export const save = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`❌ Error guardando en localStorage [${key}]:`, error);
  }
};

/**
 * Carga datos desde localStorage
 * @param {string} key - Clave del almacenamiento
 * @param {*} defaultValue - Valor por defecto si no existe o hay error
 * @returns {*} - Datos parseados o valor por defecto
 */
export const load = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    // Si el item no existe, retornamos el valor por defecto
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`❌ Error cargando desde localStorage [${key}]:`, error);
    return defaultValue;
  }
};

/**
 * Elimina una clave específica de localStorage
 * @param {string} key - Clave a eliminar
 */
export const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`❌ Error eliminando clave [${key}]:`, error);
  }
};

/**
 * Limpia todos los datos relacionados con la aplicación
 */
export const clear = () => {
  // Solo eliminamos la key específica de nuestra app definida en config.js
  // para no afectar otros datos que el usuario tenga en el mismo dominio
  remove(APP_CONFIG.storageKey);
  console.warn(`🧹 Datos de ${APP_CONFIG.name} eliminados.`);
};

// Exportación por defecto para el Barrel Export
export default {
  save,
  load,
  remove,
  clear,
};
