/**
 * ============================================
 * PROYECTO SEMANA 04 - SISTEMA MODULAR ES6
 * Punto de entrada principal de la aplicación
 * ============================================
 */

// ============================================
// TODO 1: IMPORTAR DEPENDENCIAS
// ============================================
import { CATEGORIES, APP_CONFIG } from './config.js';

// Importar servicios (Usando el barrel export de services)
import { inventory as manager } from './services/index.js';

// Importar funciones de UI (Usando el barrel export de ui)
import {
  initEvents,
  renderProducts as renderItems,
  renderCategoryOptions,
  updateProductCount as updateItemCount
} from './ui/index.js';

// ============================================
// TODO 2: INICIALIZAR LA APLICACIÓN
// ============================================

/**
 * Inicializa la aplicación de Inventario de Salud Mental
 */
const init = () => {
  console.log(`🚀 Iniciando ${APP_CONFIG.name} v${APP_CONFIG.version}...`);

  try {
    // 1. Cargar elementos desde localStorage e inicializar estado en memoria
    const items = manager.init();

    // 2. Renderizar opciones de categoría en los selectores del DOM
    const categorySelects = [
      document.getElementById('category'),         // Formulario de agregar
      document.getElementById('filter-category'),  // Filtro de búsqueda
      document.getElementById('edit-category')     // Modal de edición
    ];
    renderCategoryOptions(categorySelects);

    // 3. Renderizar la lista inicial de elementos
    // CORREGIDO: el ID en el HTML es 'products-body', no 'inventory-body'
    const tableContainer = document.getElementById('products-body');
    renderItems(items, tableContainer);

    // 4. Actualizar contador global de insumos
    updateItemCount(items.length);

    // 5. Inicializar todos los event listeners (Formularios, filtros, delegación)
    initEvents();

    console.log('✅ Sistema de inventario listo para operar');
  } catch (error) {
    console.error('❌ Error crítico durante la inicialización:', error);
  }
};

// ============================================
// TODO 3: FUNCIÓN PARA CARGAR REPORTES (DYNAMIC IMPORT)
// ============================================

/**
 * Carga el módulo de reportes bajo demanda para salud mental
 * @returns {Promise<Object>} Estadísticas generadas
 */
const loadReports = async () => {
  try {
    const { generateStats } = await import('./features/reports.js');

    const items = manager.getAll();
    const stats = generateStats(items);

    console.log('📊 Estadísticas de salud mental generadas:', stats);
    return stats;
  } catch (error) {
    console.error('Error al cargar el módulo de reportes:', error);
    throw error;
  }
};

// ============================================
// TODO 4: FUNCIÓN PARA EXPORTAR DATOS (DYNAMIC IMPORT)
// ============================================

/**
 * Carga el módulo de exportación bajo demanda
 * @param {string} format - Formato de exportación ('csv' | 'json')
 */
const loadExport = async (format = 'json') => {
  try {
    const exportModule = await import('./features/export.js');
    const items = manager.getAll();

    if (format === 'csv') {
      exportModule.exportCSV(items);
    } else {
      exportModule.exportJSON(items);
    }

    console.log(`📤 Inventario exportado en formato ${format.toUpperCase()}`);
  } catch (error) {
    console.error(`Error cargando módulo de exportación (${format}):`, error);
  }
};

// ============================================
// EJECUTAR CUANDO EL DOM ESTÉ LISTO
// ============================================
// Los módulos ES6 se ejecutan después de que el DOM está listo,
// por lo que DOMContentLoaded no es necesario. Llamamos init() directamente.
init();

// ============================================
// EXPORTAR FUNCIONES PARA USO EXTERNO
// ============================================
export { init, loadReports, loadExport };
