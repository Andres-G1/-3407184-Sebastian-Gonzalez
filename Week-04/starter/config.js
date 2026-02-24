/**
 * ============================================
 * MÓDULO DE CONFIGURACIÓN
 * Constantes y configuración global de la aplicación
 * ============================================
 *
 * INSTRUCCIONES:
 * Adapta TODA la configuración a tu dominio asignado.
 * Los valores aquí definidos se usarán en toda la aplicación.
 *
 * EJEMPLO (Planetario - NO asignable):
 * - APP_CONFIG.name: 'Observatorio Estelar'
 * - CATEGORIES: planet, star, satellite, asteroid
 * - THRESHOLDS: magnitud máxima visible
 *
 * ============================================
 */

// ============================================
// TODO 1: CONFIGURACIÓN DE LA APLICACIÓN
// ============================================
// Adapta estos valores a tu dominio

// Configuración base del aplicativo
export const APP_CONFIG = {
  name: 'Sistem_Health_Center',
  version: '1.0.0',
  storageKey: 'shc_inventory_items', // Key única para el inventario de salud mental
};

// Umbrales para el control de stock (Salud Mental)
export const THRESHOLDS = {
  low: 20,      // Alerta preventiva para reordenar insumos
  critical: 10,  // Riesgo de desabastecimiento inmediato
};

// Categorías adaptadas al inventario de salud mental
export const CATEGORIES = [
  { id: 'clinical_supplies', name: 'Material Clínico', icon: '📋' },
  { id: 'medication', name: 'Psiquiatría', icon: '💊' },
  { id: 'therapeutic_tools', name: 'Herramientas Terapéuticas', icon: '🧸' },
  { id: 'office_equipment', name: 'Mobiliario y Equipo', icon: '💺' },
  { id: 'educational_material', name: 'Psicoeducación', icon: '📚' },
  { id: 'other', name: 'Otros Recursos', icon: '📌' },
];

// Estados físicos de los productos/activos
export const STATES = {
  AVAILABLE: { id: 'available', name: 'Disponible', color: '#10b981' },
  LOW_STOCK: { id: 'low_stock', name: 'Stock Bajo', color: '#f59e0b' },
  OUT_OF_STOCK: { id: 'out_of_stock', name: 'Agotado', color: '#ef4444' },
  MAINTENANCE: { id: 'maintenance', name: 'Mantenimiento', color: '#3b82f6' }, // Para equipo/mobiliario
};

// ============================================
// DEFAULT EXPORT (para conveniencia)
// ============================================
export default {
  ...APP_CONFIG,
  ...THRESHOLDS,
  ...CATEGORIES,
  ...STATES,
};