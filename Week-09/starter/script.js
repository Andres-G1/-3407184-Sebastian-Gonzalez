// ============================================
// PROYECTO SEMANA 09: Catálogo de Elementos
// ============================================
//
// INSTRUCCIONES:
// 1. Define tu dominio en DOMAIN_NAME y VALUE_LABEL
// 2. Completa el array `items` con datos de tu dominio
// 3. Implementa cada función siguiendo los TODOs
// 4. Ejecuta con: node script.js
//
// Tu catálogo debe tener:
//   - Mínimo 6 objetos con al menos 5 propiedades cada uno
//   - Al menos 1 propiedad numérica, 1 booleana y 1 opcional
// ============================================

// ============================================
// CONFIGURACIÓN DEL DOMINIO
// ============================================

// TODO: Reemplaza con el nombre de tu dominio
// Ejemplos: "Biblioteca", "Farmacia", "Gimnasio", "Restaurante"
const DOMAIN_NAME = "Salud Mental y Bienestar";

// TODO: Reemplaza con el nombre del tipo de elemento
// Ejemplos: "libros", "medicamentos", "equipos", "platillos"
const VALUE_LABEL = "actividades";

// ============================================
// DATOS DEL CATÁLOGO
// ============================================

// TODO: Define al menos 6 objetos con mínimo 5 propiedades cada uno
// Incluye:
//   - id (número)
//   - name (string)
//   - Al menos 1 propiedad numérica (price, pages, duration, capacity, etc.)
//   - Al menos 1 propiedad booleana (available, active, inStock, visible, etc.)
//   - Al menos 1 propiedad opcional (no todos los objetos la tienen)

const items = [
  // Actividades terapéuticas de salud mental y bienestar
  // Propiedad opcional: "note" (recomendación especial, solo algunas la tienen)
  { id: 1, name: "Respiración 4-7-8",           category: "respiración", duration: 5,  level: "principiante", active: true,  note: "Ideal para crisis de ansiedad" },
  { id: 2, name: "Meditación guiada",            category: "meditación",  duration: 20, level: "intermedio",   active: true  },
  { id: 3, name: "Journaling de gratitud",       category: "escritura",   duration: 15, level: "principiante", active: true,  note: "Recomendada en la mañana" },
  { id: 4, name: "Relajación muscular",          category: "corporal",    duration: 10, level: "principiante", active: false },
  { id: 5, name: "Visualización positiva",       category: "mindfulness", duration: 12, level: "intermedio",   active: true  },
  { id: 6, name: "Caminata consciente",          category: "movimiento",  duration: 30, level: "principiante", active: false, note: "Mejor en espacios naturales" },
  { id: 7, name: "Técnica grounding 5-4-3-2-1", category: "mindfulness", duration: 8,  level: "principiante", active: true  },
  { id: 8, name: "Escáner corporal",             category: "mindfulness", duration: 25, level: "intermedio",   active: true,  note: "Recomendada antes de dormir" },
];

// ============================================
// INSPECCIÓN CON Object.*
// ============================================

/**
 * Muestra las claves y valores de un objeto usando Object.entries()
 * @param {Object} item - El objeto a inspeccionar
 */
const inspectItem = (item) => {
  console.log(`\n📋 Detalle de: ${item.name}`);
  // Usar Object.entries() + forEach para imprimir cada clave y valor
  // Alinear las claves con padEnd para formato de tabla
  Object.entries(item).forEach(([key, value]) => {
    console.log(`   ${key.padEnd(12)}: ${value}`);
  });
};

/**
 * Calcula estadísticas numéricas del catálogo
 * @param {string} numericKey - El nombre de la propiedad numérica a analizar
 */
const calculateStats = (numericKey) => {
  // Usar Object.values() sobre el array de valores numéricos
  // Calcular: total, promedio, máximo, mínimo
  // Imprimir los resultados
  const values = items.map((item) => item[numericKey]).filter((v) => v !== undefined);
  const total   = values.reduce((sum, v) => sum + v, 0);
  const average = (total / values.length).toFixed(1);
  const max     = Math.max(...values);
  const min     = Math.min(...values);

  console.log(`\n📊 Estadísticas de "${numericKey}":`);
  console.log(`   Total    : ${total} min`);
  console.log(`   Promedio : ${average} min`);
  console.log(`   Máximo   : ${max} min`);
  console.log(`   Mínimo   : ${min} min`);
};

// ============================================
// VERIFICACIÓN CON Object.hasOwn()
// ============================================

/**
 * Muestra el detalle de un elemento, incluyendo propiedades opcionales
 * si existen en ese objeto
 * @param {Object} item - El objeto a mostrar
 */
const showWithOptionals = (item) => {
  console.log(`\n→ ${item.name}`);
  // Mostrar propiedades básicas siempre
  console.log(`   Categoría : ${item.category}`);
  console.log(`   Duración  : ${item.duration} min`);
  console.log(`   Nivel     : ${item.level}`);
  console.log(`   Activa    : ${item.active ? "✅ Sí" : "⏸️  No"}`);
  // Usar Object.hasOwn() para verificar la propiedad opcional "note"
  // y mostrarla solo si existe en este objeto
  if (Object.hasOwn(item, "note")) {
    console.log(`   📝 Nota   : ${item.note}`);
  }
};

// ============================================
// ITERACIÓN CON for...in
// ============================================

/**
 * Imprime todas las propiedades de un objeto usando for...in
 * @param {Object} item - El objeto a recorrer
 */
const printAllProperties = (item) => {
  console.log(`\n🔍 Propiedades de "${item.name}":`);
  // Usar for...in + Object.hasOwn() para recorrer propiedades propias
  // Imprimir cada clave y su valor
  for (const key in item) {
    if (Object.hasOwn(item, key)) {
      console.log(`   ${key.padEnd(12)}: ${item[key]}`);
    }
  }
};

// ============================================
// SPREAD OPERATOR
// ============================================

/**
 * Aplica una actualización inmutable a un elemento
 * @param {Object} item - El objeto original
 * @param {Object} changes - Las propiedades a actualizar
 * @returns {Object} Nuevo objeto con los cambios aplicados
 */
const updateItem = (item, changes) => {
  // Retornar un nuevo objeto usando spread + changes
  // El objeto original NO debe modificarse
  return { ...item, ...changes };
};

// ============================================
// OPERACIONES CON EL ARRAY
// ============================================

/**
 * Filtra los elementos disponibles/activos
 * @returns {Object[]} Array de elementos disponibles
 */
const getAvailable = () => {
  // Usar filter() por la propiedad booleana "active" del dominio
  return items.filter((activity) => activity.active === true);
};

/**
 * Busca un elemento por su id
 * @param {number} id - El id a buscar
 * @returns {Object|undefined} El elemento encontrado o undefined
 */
const findById = (id) => {
  // Usar find() para retornar la actividad con el id indicado
  return items.find((activity) => activity.id === id);
};

/**
 * Agrega una propiedad calculada a cada elemento
 * @returns {Object[]} Nuevo array con la propiedad adicional
 */
const addCalculatedProp = () => {
  // Usar map() para agregar "durationInSeconds" a cada actividad
  // Fórmula: duration * 60
  // Recuerda: item => ({ ...item, newProp: calculation })
  return items.map((activity) => ({
    ...activity,
    durationInSeconds: activity.duration * 60,
  }));
};

/**
 * Ordena los elementos por valor numérico (sin mutar el original)
 * @param {boolean} ascending - true para ascendente, false para descendente
 * @returns {Object[]} Nuevo array ordenado
 */
const sortByNumericProp = (ascending = true) => {
  // Usar [...items].sort() con un comparador por "duration"
  // No mutar el array original
  return [...items].sort((a, b) =>
    ascending ? a.duration - b.duration : b.duration - a.duration
  );
};

// ============================================
// REPORTE FINAL
// ============================================

/**
 * Imprime el reporte completo del catálogo
 */
const buildReport = () => {
  console.log("\n" + "=".repeat(50));
  console.log(`📦 CATÁLOGO: ${DOMAIN_NAME.toUpperCase()}`);
  console.log("=".repeat(50));

  // Mostrar cantidad total de elementos
  console.log(`\nTotal de ${VALUE_LABEL}: ${items.length}`);

  // Mostrar cuántos están disponibles/activos
  const available = getAvailable();
  console.log(`Disponibles hoy    : ${available.length} | Inactivas: ${items.length - available.length}`);

  // Mostrar estadísticas de la propiedad numérica principal
  calculateStats("duration");

  // Listar todos los elementos ordenados de menor a mayor duración
  console.log("\n📋 Actividades ordenadas por duración (ascendente):");
  sortByNumericProp(true).forEach((activity) => {
    const status = activity.active ? "🧘" : "⏸️ ";
    console.log(`   ${status} ${activity.name.padEnd(32)} ${activity.duration} min`);
  });

  // Mostrar el elemento con la duración más alta y más baja
  const sorted = sortByNumericProp(true);
  console.log(`\n⬇️  Más corta : ${sorted[0].name} (${sorted[0].duration} min)`);
  console.log(`⬆️  Más larga : ${sorted[sorted.length - 1].name} (${sorted[sorted.length - 1].duration} min)`);

  console.log("=".repeat(50));
};

// ============================================
// EJECUCIÓN PRINCIPAL
// ============================================

console.log(`\n🚀 Iniciando catálogo: ${DOMAIN_NAME}`);
console.log(`   Total de ${VALUE_LABEL}: ${items.length}`);

// 1. Inspeccionar el primer elemento con Object.entries()
inspectItem(items[0]);

// 2. Calcular estadísticas de la propiedad numérica "duration"
calculateStats("duration");

// 3. Mostrar cada actividad con sus propiedades opcionales si las tiene
console.log("\n--- Actividades con propiedades opcionales ---");
items.forEach(showWithOptionals);

// 4. Recorrer todas las propiedades del primer elemento con for...in
printAllProperties(items[0]);

// 5. Demostrar updateItem: activar "Relajación muscular" sin mutar el original
const original   = items[3]; // Relajación muscular (active: false)
const updated    = updateItem(original, { active: true, note: "Reactivada esta semana" });
console.log(`\n✏️  updateItem — original activa: ${original.active} | nueva activa: ${updated.active}`);
console.log(`   Nota agregada: ${updated.note}`);

// 6. Mostrar elementos disponibles con getAvailable()
const availableItems = getAvailable();
console.log(`\n✅ Actividades disponibles hoy (${availableItems.length}):`);
availableItems.forEach((a) => console.log(`   🧘 ${a.name}`));

// 7. Demostrar findById con un id válido y uno inexistente
const found    = findById(3);
const notFound = findById(99);
console.log(`\n🔎 findById(3)  → ${found    ? found.name    : "No encontrada"}`);
console.log(`🔎 findById(99) → ${notFound ? notFound.name : "No encontrada"}`);

// 8. Mostrar addCalculatedProp: duración en segundos
console.log("\n⏱️  Duraciones en segundos:");
addCalculatedProp().forEach((a) =>
  console.log(`   ${a.name.padEnd(32)}: ${a.durationInSeconds}s`)
);

// 9. Mostrar sortByNumericProp: orden descendente por duración
console.log("\n🔽 Ordenadas por duración (descendente):");
sortByNumericProp(false).forEach((a) =>
  console.log(`   ${a.name.padEnd(32)}: ${a.duration} min`)
);

// 10. Reporte completo final
buildReport();