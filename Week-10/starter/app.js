// ============================================
// PROYECTO INTEGRADOR — ETAPA 0
// Semana 10 — JavaScript ES2023 Bootcamp
// ============================================
//
// INSTRUCCIONES:
// 1. Reemplaza DOMAIN_NAME y los datos de ejemplo con tu dominio asignado
// 2. Implementa cada TODO siguiendo las instrucciones de los comentarios
// 3. Ejecuta con: node 3-proyecto/starter/app.js
// 4. Valida el checklist del README antes de entregar
//
// DOMINIO ASIGNADO: Salud Mental y Bienestar
// ============================================

// ============================================
// SECCIÓN 1: Configuración y Constantes (Semanas 01–02)
// ============================================

// TODO: Renombrar con el nombre de tu dominio (en inglés, UPPER_SNAKE_CASE)
const DOMAIN_NAME = "Salud Mental y Bienestar";
const VALUE_LABEL = "actividades";

// TODO: Ajustar al límite razonable para tu dominio
// Usa separadores numéricos (ES2021): 1_000, 10_000
const MAX_ITEMS = 1_000;

// ============================================
// SECCIÓN 2: Datos — Array Principal (Semanas 01–02)
// ============================================

// TODO: Definir el array con MÍNIMO 6 objetos
// Requisitos:
// - Mínimo 5 propiedades por objeto (tipos mixtos)
// - Al menos 1 propiedad numérica (para calcular estadísticas)
// - Al menos 1 propiedad booleana (para filtrar activos/inactivos)
// - Al menos 1 propiedad OPCIONAL (no todos los objetos la tienen)
//
// Nota para el aprendiz — Adaptaciones por dominio:
// - Biblioteca:    { id, title, author, year, pages, available, notes? }
// - Farmacia:      { id, name, price, stock, laboratory, active, prescription? }
// - Gimnasio:      { id, name, memberType, fee, joinDate, active, plan? }
// - Restaurante:   { id, name, category, price, calories, available, allergens? }
// - Banco:         { id, owner, type, balance, rate, active, creditLimit? }

const items = [
  // Actividades terapéuticas de salud mental y bienestar
  // Propiedades: id, name, category, duration (numérica), level, active (booleana)
  // Propiedad opcional: note (recomendación especial — no todas la tienen)
  {
    id: 1,
    name: "Respiración 4-7-8",
    category: "respiración",
    duration: 5,
    level: "principiante",
    active: true,
    note: "Ideal para crisis de ansiedad",
  },
  {
    id: 2,
    name: "Meditación guiada",
    category: "meditación",
    duration: 20,
    level: "intermedio",
    active: true,
  },
  {
    id: 3,
    name: "Journaling de gratitud",
    category: "escritura",
    duration: 15,
    level: "principiante",
    active: true,
    note: "Recomendada en la mañana",
  },
  {
    id: 4,
    name: "Relajación muscular",
    category: "corporal",
    duration: 10,
    level: "principiante",
    active: false,
  },
  {
    id: 5,
    name: "Visualización positiva",
    category: "mindfulness",
    duration: 12,
    level: "intermedio",
    active: true,
  },
  {
    id: 6,
    name: "Caminata consciente",
    category: "movimiento",
    duration: 30,
    level: "principiante",
    active: false,
    note: "Mejor en espacios naturales",
  },
  {
    id: 7,
    name: "Técnica grounding 5-4-3-2-1",
    category: "mindfulness",
    duration: 8,
    level: "principiante",
    active: true,
  },
  {
    id: 8,
    name: "Escáner corporal",
    category: "mindfulness",
    duration: 25,
    level: "intermedio",
    active: true,
    note: "Recomendada antes de dormir",
  },
];

// ============================================
// SECCIÓN 3: Funciones CRUD (Semanas 07–08)
// ============================================

/**
 * Agrega un nuevo elemento al array principal
 * @param {Object} item - El elemento a agregar
 */
const addItem = (item) => {
  // TODO: Implementar
  // 1. Verificar que no supere MAX_ITEMS (usar items.length)
  // 2. Agregar el item al array con .push()
  // 3. Mostrar confirmación con console.log y template literal
  if (items.length >= MAX_ITEMS) {
    console.log(`⚠️  Límite alcanzado: no se pueden agregar más de ${MAX_ITEMS} actividades.`);
    return;
  }
  items.push(item);
  console.log(`  ➕ Actividad agregada: ${item.name} (${item.duration} min)`);
};

/**
 * Busca un elemento por su id
 * @param {number} id - El id a buscar
 * @returns {Object|undefined} - El elemento encontrado o undefined
 */
const findById = (id) => {
  // TODO: Implementar usando .find()
  return items.find((activity) => activity.id === id);
};

/**
 * Retorna todos los elementos activos
 * @returns {Object[]}
 */
const getActive = () => {
  // TODO: Implementar usando .filter() con la propiedad booleana
  return items.filter((activity) => activity.active === true);
};

/**
 * Filtra elementos por el valor de un campo
 * @param {string} field - El nombre de la propiedad
 * @param {*} value - El valor a buscar
 * @returns {Object[]}
 */
const filterByField = (field, value) => {
  // TODO: Implementar usando .filter()
  return items.filter((activity) => activity[field] === value);
};

// ============================================
// SECCIÓN 4: Funciones de Análisis (Semanas 08–09)
// ============================================

/**
 * Actualiza un elemento de forma inmutable usando spread
 * @param {number} id - Id del elemento a actualizar
 * @param {Object} changes - Objeto con los cambios a aplicar
 * @returns {Object[]} - Nuevo array con el elemento actualizado
 */
const updateItem = (id, changes) => {
  // TODO: Implementar
  // 1. Usar .map() para crear un nuevo array
  // 2. Para el item con el id buscado: retornar { ...item, ...changes }
  // 3. Para los demás: retornar el item sin cambios
  return items.map((item) =>
    item.id === id ? { ...item, ...changes } : item
  );
};

/**
 * Calcula estadísticas de un campo numérico
 * @param {string} field - El nombre de la propiedad numérica
 * @returns {{ min: number, max: number, avg: number, total: number }}
 */
const calculateStats = (field) => {
  // TODO: Implementar
  // 1. Extraer los valores numéricos con Object.values o .map()
  // 2. Calcular: min (Math.min), max (Math.max), avg (sum/length), total (sum)
  // Pista: const values = items.map(i => i[field]);
  const values = items.map((i) => i[field]).filter((v) => v !== undefined);
  const total  = values.reduce((sum, v) => sum + v, 0);
  const avg    = total / values.length;
  const min    = Math.min(...values);
  const max    = Math.max(...values);
  return { min, max, avg, total };
};

// ============================================
// SECCIÓN 5: Funciones de Display (Semanas 04–07)
// ============================================

/**
 * Formatea un elemento para mostrar en consola (una línea)
 * @param {Object} item - El elemento a formatear
 * @returns {string}
 */
const formatItem = (activity) => {
  // TODO: Implementar usando template literals
  // 1. Usar .padEnd() o .padStart() para alinear columnas
  // 2. Usar ?? y ?. para propiedades opcionales
  // 3. Retornar string (NO hacer console.log aquí)
  const status = activity.active ? "🧘" : "⏸️ ";
  const note   = activity.note != null ? ` | 📝 ${activity.note}` : "";
  return `[${String(activity.id).padStart(2, "0")}] ${status} ${activity.name.padEnd(34)} ${String(activity.duration).padStart(2)} min | ${activity.level}${note}`;
};

/**
 * Genera el reporte completo del dominio
 * Usa: Object.entries, forEach, filter, map, calculateStats
 */
const buildReport = () => {
  // TODO: Implementar
  // 1. Cabecera: título del dominio con template literal
  // 2. Listado completo usando formatItem + forEach
  // 3. Sección de activos vs inactivos (getActive)
  // 4. Estadísticas con calculateStats para la propiedad numérica
  // 5. Propiedades del primer elemento con Object.entries
  // 6. Pie de reporte con conteo total

  // 1. Cabecera
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  📦 REPORTE COMPLETO — ${DOMAIN_NAME.toUpperCase()}`);
  console.log(`${"=".repeat(60)}`);

  // 2. Listado completo
  console.log(`\n📋 Listado de ${VALUE_LABEL}:`);
  items.forEach((item) => console.log(`  ${formatItem(item)}`));

  // 3. Activos vs inactivos
  const active   = getActive();
  const inactive = items.filter((a) => !a.active);
  console.log(`\n✅ Activas  : ${active.length}`);
  active.forEach((a) => console.log(`   🧘 ${a.name}`));
  console.log(`⏸️  Inactivas: ${inactive.length}`);
  inactive.forEach((a) => console.log(`   ⏸️  ${a.name}`));

  // 4. Estadísticas de la propiedad numérica "duration"
  const stats = calculateStats("duration");
  console.log(`\n📊 Estadísticas de duración:`);
  console.log(`   Total    : ${stats.total} min`);
  console.log(`   Promedio : ${stats.avg.toFixed(1)} min`);
  console.log(`   Máxima   : ${stats.max} min`);
  console.log(`   Mínima   : ${stats.min} min`);

  // 5. Propiedades del primer elemento con Object.entries
  console.log(`\n🔍 Detalle de "${items[0].name}" (Object.entries):`);
  Object.entries(items[0]).forEach(([key, value]) => {
    console.log(`   ${key.padEnd(12)}: ${value}`);
  });

  // 6. Pie de reporte
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  Total: ${items.length} / ${MAX_ITEMS} ${VALUE_LABEL}`);
  console.log(`${"=".repeat(60)}\n`);
};

// ============================================
// SECCIÓN 6: Ejecución Principal
// ============================================
//
// TODO: Descomentar a medida que implementes cada función
//

console.log("=".repeat(60));
console.log(`  ${DOMAIN_NAME.toUpperCase()}`);
console.log("=".repeat(60));
console.log(`Total de ${VALUE_LABEL}: ${items.length} / ${MAX_ITEMS}`);
console.log("");

// Paso 1: Buscar por id
const found = findById(1);
console.log("Encontrado id=1:", found?.name ?? "no encontrado");
console.log("");

// Paso 2: Listar activos
const active = getActive();
console.log(`Activos: ${active.length}`);
active.forEach((item) => console.log(" ", formatItem(item)));
console.log("");

// Paso 3: Filtrar por campo
const filtered = filterByField("category", "mindfulness");
console.log(`Filtro category=mindfulness: ${filtered.length} resultados`);
filtered.forEach((item) => console.log(" ", formatItem(item)));
console.log("");

// Paso 4: Actualizar con spread
const updated = updateItem(4, { active: true, note: "Reactivada esta semana" });
console.log(`Actualizado id=4: active=${updated.find((i) => i.id === 4)?.active}`);
console.log("");

// Paso 5: Estadísticas
const stats = calculateStats("duration");
console.log(`Estadísticas (duration): min=${stats.min} max=${stats.max} avg=${stats.avg.toFixed(2)}`);
console.log("");

// Paso 6: Reporte completo
buildReport();

// TODO: Agregar un nuevo elemento usando addItem
addItem({
  id: 9,
  name: "Respiración de emergencia",
  category: "respiración",
  duration: 3,
  level: "principiante",
  active: true,
  note: "Para momentos de pánico agudo",
});