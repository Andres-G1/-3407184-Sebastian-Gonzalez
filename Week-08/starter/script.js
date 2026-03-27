// ============================================
// SEMANA 08 — PROYECTO: Gestión de Inventario
// ============================================
// INSTRUCCIONES:
// 1. Reemplaza DOMAIN_NAME con el nombre de tu dominio asignado
// 2. Reemplaza VALUE_LABEL con la etiqueta de tu unidad de valor
//    Ejemplos: "unidades", "libros", "medicamentos", "miembros"
// 3. Define tu array items con objetos de tu dominio
// 4. Completa cada TODO con la implementación contextualizada
// ============================================

// ---- CONFIGURA TU DOMINIO ----
const DOMAIN_NAME = "Salud Mental y Bienestar"; // Dominio: actividades terapéuticas
const VALUE_LABEL = "actividades";              // Unidad: actividades de bienestar

// ============================================
// 1. ARRAY INICIAL — Define tu inventario
// ============================================

// TODO: Definir el array con mínimo 5 objetos de tu dominio.
// Cada objeto debe tener:
//   - id: número único
//   - name: nombre del elemento
//   - [propiedad numérica]: precio, cantidad, puntuación, etc.
//   - [propiedad booleana]: active, available, inStock, etc.
//   - [otras 2+ propiedades relevantes a tu dominio]
//
// Ejemplos por dominio:
// Biblioteca:  { id, name, author, year, available: true }
// Farmacia:    { id, name, price, stock, requiresPrescription: false }
// Gimnasio:    { id, name, memberSince, plan, active: true }
// Restaurante: { id, name, price, category, available: true }

const items = [
  // Actividades terapéuticas de salud mental y bienestar
  // Propiedades: id, name, category, duration (minutos), level, active
  { id: 1, name: "Respiración 4-7-8",           category: "respiración", duration: 5,  level: "principiante", active: true  },
  { id: 2, name: "Meditación guiada",            category: "meditación",  duration: 20, level: "intermedio",   active: true  },
  { id: 3, name: "Journaling de gratitud",       category: "escritura",   duration: 15, level: "principiante", active: true  },
  { id: 4, name: "Relajación muscular",          category: "corporal",    duration: 10, level: "principiante", active: false },
  { id: 5, name: "Visualización positiva",       category: "mindfulness", duration: 12, level: "intermedio",   active: true  },
  { id: 6, name: "Caminata consciente",          category: "movimiento",  duration: 30, level: "principiante", active: false },
  { id: 7, name: "Técnica grounding 5-4-3-2-1", category: "mindfulness", duration: 8,  level: "principiante", active: true  },
];

// ============================================
// 2. FUNCIONES DE GESTIÓN
// ============================================

/**
 * Agrega un nuevo elemento al inventario
 * @param {Object} newItem - Elemento a agregar
 */
const addItem = (newItem) => {
  // Usar push para agregar la nueva actividad al final del array
  items.push(newItem);
  console.log(`  ➕ Agregada: ${newItem.name}`);
};

/**
 * Elimina el último elemento del inventario
 * @returns {Object} El elemento eliminado
 */
const removeLastItem = () => {
  // Usar pop para eliminar y retornar la última actividad del array
  const removed = items.pop();
  console.log(`  ➖ Eliminada (última): ${removed.name}`);
  return removed;
};

/**
 * Agrega un elemento prioritario al inicio del inventario
 * @param {Object} priorityItem - Elemento a agregar con prioridad
 */
const addPriorityItem = (priorityItem) => {
  // Usar unshift para agregar la actividad prioritaria al inicio del array
  items.unshift(priorityItem);
  console.log(`  ⭐ Actividad prioritaria agregada: ${priorityItem.name}`);
};

/**
 * Elimina un elemento por su posición (índice)
 * @param {number} index - Posición del elemento a eliminar
 */
const removeByIndex = (index) => {
  // Usar splice para eliminar 1 actividad en la posición indicada
  const removed = items.splice(index, 1);
  console.log(`  🗑️  Eliminada en posición ${index}: ${removed[0].name}`);
};

/**
 * Obtiene todos los elementos activos/disponibles
 * @returns {Array} Array de elementos activos
 */
const getActiveItems = () => {
  // Usar filter para retornar solo las actividades con active === true
  return items.filter((activity) => activity.active === true);
};

/**
 * Busca un elemento por su nombre
 * @param {string} name - Nombre a buscar
 * @returns {Object|undefined} El elemento encontrado o undefined
 */
const findByName = (name) => {
  // Usar find para retornar la primera actividad cuyo name coincida
  return items.find((activity) => activity.name === name);
};

/**
 * Formatea un elemento para mostrar en el reporte
 * @param {Object} item - Elemento a formatear
 * @returns {string} Texto formateado
 */
const formatItem = (activity) => {
  // Mostrar id, nombre, categoría, duración y nivel de la actividad
  // El emoji indica si está activa 🧘 o pausada ⏸️
  const status = activity.active ? "🧘" : "⏸️ ";
  return `[${activity.id}] ${status} ${activity.name} — ${activity.category} | ${activity.duration} min | ${activity.level}`;
};

// ============================================
// 3. REPORTE
// ============================================

console.log(`\n${"=".repeat(50)}`);
console.log(`📦 GESTIÓN DE ${DOMAIN_NAME.toUpperCase()}`);
console.log(`${"=".repeat(50)}\n`);

// Estado inicial
console.log(`📋 Inventario inicial (${items.length} ${VALUE_LABEL}):`);
// Usar forEach para mostrar cada actividad con formatItem
items.forEach((item) => {
  console.log(`  ${formatItem(item)}`);
});

console.log("\n--- Operaciones de mutación ---\n");

// Agregar una nueva actividad terapéutica al final del inventario
addItem({ id: 8, name: "Escáner corporal", category: "mindfulness", duration: 25, level: "intermedio", active: true });

// Agregar una actividad prioritaria al inicio (recomendada para crisis de ansiedad)
addPriorityItem({ id: 0, name: "Respiración de emergencia", category: "respiración", duration: 3, level: "principiante", active: true });

// Eliminar la actividad en la posición 3 (Relajación muscular — actualmente inactiva)
removeByIndex(3);

// Quitar la última actividad del inventario
removeLastItem();

console.log("\n--- Inventario después de mutaciones ---\n");
// Mostrar el inventario actualizado con forEach + formatItem
items.forEach((item) => {
  console.log(`  ${formatItem(item)}`);
});

console.log("\n--- Búsqueda y filtrado ---\n");

// Buscar una actividad específica por nombre usando find
const found = findByName("Meditación guiada");
console.log(`  🔍 Búsqueda "Meditación guiada": ${found ? found.name + " — " + found.duration + " min" : "No encontrada"}`);

// Mostrar cuántas actividades están activas usando getActiveItems()
const activeItems = getActiveItems();
console.log(`  ✅ Actividades disponibles hoy: ${activeItems.length} de ${items.length}`);

// Crear un snapshot inmutable con spread [...items]
// y agregar una actividad extra sin modificar el array original
const snapshot = [...items, { id: 99, name: "Actividad de prueba", category: "test", duration: 1, level: "principiante", active: false }];
console.log(`  📸 Snapshot (sin modificar items): ${snapshot.length} actividades | items original: ${items.length}`);

console.log("\n--- Transformación con map ---\n");

// Usar map para crear un array con solo los nombres de las actividades
const names = items.map((activity) => activity.name);
console.log("  📝 Nombres:", names.join(", "));

// Usar map para crear un array con la duración convertida a segundos
const durations = items.map((activity) => ({
  name: activity.name,
  seconds: activity.duration * 60,
}));
console.log("  ⏱️  Duraciones en segundos:");
durations.forEach((d) => console.log(`     ${d.name}: ${d.seconds}s`));

console.log("\n--- Resumen final ---\n");
console.log(`Total en inventario: ${items.length} ${VALUE_LABEL}`);
// Mostrar total de activos vs total general
const activeCount = getActiveItems().length;
console.log(`Activos: ${activeCount} | Inactivos: ${items.length - activeCount}`);

console.log(`\n${"=".repeat(50)}`);
console.log("✅ Reporte completado");
console.log(`${"=".repeat(50)}\n`);