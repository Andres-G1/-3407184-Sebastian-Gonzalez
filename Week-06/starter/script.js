// ============================================
// PROYECTO SEMANA 06: Reporte con Bucles
// Dominio: [tu dominio asignado]
// ============================================
//
// INSTRUCCIONES:
// 1. Reemplaza todos los elementos genéricos
//    con datos reales de TU dominio asignado.
// 2. Completa cada sección marcada con TODO.
// 3. Ejecuta con: node starter/script.js
// ============================================
// ============================================
// SECCIÓN 1: Datos del dominio - Salud Mental
// ============================================
const activities = [
  { name: "Meditación guiada", category: "Mindfulness", value: 15_000 },
  { name: "Escritura terapéutica (Journaling)", category: "Reflexión", value: 10_000 },
  { name: "Caminata al aire libre", category: "Cuerpo", value: 11_000 },
  { name: "Sesión de terapia", category: "Reflexión", value: 10_000 },
  { name: "Ejercicios de respiración", category: "Mindfulness", value: 15_000 },
  { name: "Lectura de desarrollo personal", category: "Reflexión", value: 10_000 }
];

const categories = ["Mindfulness", "Reflexión", "Cuerpo"];

const valueLabel = "minutos por semana";

// ============================================
// SECCIÓN 2: Listado completo con for...of
// ============================================
console.log("=== LISTADO COMPLETO DE ACTIVIDADES ===");

let lineNumber = 0;
for (const activity of activities) {
  lineNumber++;
  console.log(`${lineNumber}. ${activity.name} — ${activity.category} — ${valueLabel}: ${activity.value}`);
}

console.log("");

// ============================================
// SECCIÓN 3: Contadores por categoría
// ============================================
console.log("=== CONTEO POR CATEGORÍA ===");

for (const category of categories) {
  let count = 0;
  for (const activity of activities) {
    if (activity.category === category) count++;
  }
  console.log(`${category}: ${count} actividad(es)`);
}

console.log("");

// ============================================
// SECCIÓN 4: Totales y promedio
// ============================================
console.log("=== ESTADÍSTICAS DE TIEMPO ===");

let totalValue = 0;
for (const activity of activities) {
  totalValue += activity.value;
}

const averageValue = activities.length > 0 ? totalValue / activities.length : 0;

console.log(`Inversión total: ${totalValue} ${valueLabel}`);
console.log(`Promedio por actividad: ${averageValue.toFixed(1)} ${valueLabel}`);

console.log("");

// ============================================
// SECCIÓN 5: Máximo y mínimo
// ============================================
console.log("=== MÁXIMO Y MÍNIMO ESFUERZO ===");

let maxActivity = activities[0] ?? null;
let minActivity = activities[0] ?? null;

if (activities.length > 0) {
  for (const activity of activities) {
    if (activity.value > maxActivity.value) maxActivity = activity;
    if (activity.value < minActivity.value) minActivity = activity;
  }

  console.log(`Mayor dedicación: ${maxActivity.name} (${maxActivity.value} min)`);
  console.log(`Menor dedicación: ${minActivity.name} (${minActivity.value} min)`);
}

console.log("");

// ============================================
// SECCIÓN 6: Reporte detallado con for clásico
// ============================================
console.log("=== REPORTE DETALLADO (Respecto al promedio) ===");

for (let i = 0; i < activities.length; i++) {
  const activity = activities[i];
  const comparison = activity.value >= averageValue ? "SOBRE el promedio" : "BAJO el promedio";
  
  console.log(`${i + 1}. ${activity.name} — ${comparison}`);
}

console.log("");
console.log("=== FIN DEL REPORTE DE BIENESTAR ===");