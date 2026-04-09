// ============================================
// PROYECTO SEMANA 07 — Librería de Funciones
// Dominio: Salud Mental y Bienestar
// ============================================

// NOTA PARA EL APRENDIZ:
// Adapta este proyecto a tu dominio asignado.
// Todos los nombres genéricos (item, value, category, etc.)
// deben reemplazarse con nombres específicos de tu dominio.
//
// Ejemplos de adaptación:
// - Biblioteca: book, author, available, fine
// - Farmacia: medicine, price, stock, laboratory
// - Gimnasio: member, plan, active, bmi
// - Restaurante: dish, price, available, category
// - Banco: account, balance, interest, active
// - Hospital: patient, age, hasAppointment, doctor

"use strict"; // activa el modo estricto — mejores errores

// ============================================
// SECCIÓN 1: Constantes y datos del dominio
// ============================================

// TODO: Define las constantes globales de tu dominio
// Ejemplo: const TAX_RATE = 0.19;
//          const CURRENCY = "USD";
//          const DOMAIN_NAME = "Mi Dominio";
const DOMAIN_NAME = "Salud Mental y Bienestar";
const VALUE_LABEL = "duración (min)"; // Ej: "precio", "cantidad", "duración"

// TODO: Define un array con al menos 5 elementos de tu dominio.
// Cada elemento debe ser un objeto con propiedades relevantes.
// Ejemplo (Biblioteca):
// const items = [
//   { id: 1, name: "El Quijote",  category: "clásico",    value: 15,  active: true },
//   { id: 2, name: "1984",        category: "distopía",   value: 12,  active: true },
//   ...
// ];
const items = [
  // Cada actividad tiene: id, name (nombre), category (tipo de técnica),
  // value (duración en minutos) y active (disponible para practicar)
  { id: 1, name: "Respiración 4-7-8",        category: "respiración",   value: 5,   active: true  },
  { id: 2, name: "Meditación guiada",         category: "meditación",    value: 20,  active: true  },
  { id: 3, name: "Journaling de gratitud",    category: "escritura",     value: 15,  active: true  },
  { id: 4, name: "Relajación muscular",       category: "corporal",      value: 10,  active: false },
  { id: 5, name: "Visualización positiva",    category: "mindfulness",   value: 12,  active: true  },
  { id: 6, name: "Caminata consciente",       category: "movimiento",    value: 30,  active: false },
  { id: 7, name: "Técnica de grounding 5-4-3-2-1", category: "mindfulness", value: 8, active: true },
];

// ============================================
// SECCIÓN 2: Función de formato
// ============================================

// TODO: Implementa una arrow function que reciba un elemento
// y devuelva un string formateado para mostrar en pantalla.
// Debe usar template literals y al menos 2 propiedades del elemento.
//
// Ejemplo (Biblioteca):
// const formatItem = (book) =>
//   `📚 ${book.name} [${book.category}] — $${book.value}`;
//
// Ejemplo (Farmacia):
// const formatItem = (medicine) =>
//   `💊 ${medicine.name} — Stock: ${medicine.stock} — $${medicine.price}`;

const formatItem = (activity) => {
  // Muestra el nombre de la actividad, su categoría y duración en minutos.
  // El emoji 🧘 indica que está activa; ⏸️ que está pausada/inactiva.
  const status = activity.active ? "🧘" : "⏸️ ";
  return `${status} ${activity.name} [${activity.category}] — ${activity.value} min`;
};

// ============================================
// SECCIÓN 3: Función de cálculo (pura)
// ============================================

// TODO: Implementa una función pura que calcule algún valor relevante
// del dominio a partir de parámetros numéricos.
// Debe ser una función pura: mismo input → siempre mismo output.
//
// Ejemplo (Biblioteca): calcular multa por días de retraso
// const calculateValue = (baseValue, factor) => baseValue * factor;
//
// Ejemplo (Farmacia): calcular total de compra con descuento
// const calculateValue = (price, quantity, discountPct = 0) =>
//   +(price * quantity * (1 - discountPct / 100)).toFixed(2);

// Calcula el tiempo total de práctica para una actividad en una semana.
// baseValue = duración de la actividad en minutos
// factor    = cantidad de sesiones a realizar (por defecto 1)
const calculateValue = (baseValue, factor = 1) => {
  // Tiempo total = duración por sesión × número de sesiones
  return baseValue * factor;
};

// ============================================
// SECCIÓN 4: Función de validación
// ============================================

// TODO: Implementa una función que reciba un elemento y devuelva
// true o false según una regla del dominio.
//
// Ejemplo (Biblioteca): verificar si el libro está disponible
// const isValid = (book) => book.available === true;
//
// Ejemplo (Farmacia): verificar si hay suficiente stock
// const isValid = (medicine) => medicine.stock > 0;
//
// Ejemplo (Gimnasio): verificar si el miembro está activo
// const isValid = (member) => member.active === true;

// Una actividad es válida (recomendable hoy) si está activa
// y su duración es mayor a 0 minutos.
const isValid = (activity) => {
  // Condición: debe estar activa Y tener duración positiva
  return activity.active === true && activity.value > 0;
};

// ============================================
// SECCIÓN 5: Función con parámetro por defecto
// ============================================

// TODO: Implementa una función que use al menos un parámetro
// por defecto significativo para tu dominio.
//
// Ejemplo (Biblioteca): crear un registro con valores por defecto
// const createRecord = (name, category = "general", available = true) =>
//   ({ name, category, available });
//
// Ejemplo (Farmacia): formatear precio con moneda por defecto
// const formatPrice = (price, currency = "USD", showTax = false) =>
//   showTax ? `${currency} ${(price * 1.19).toFixed(2)}` : `${currency} ${price.toFixed(2)}`;

// Formatea el total de minutos con una etiqueta y unidad por defecto.
// label   = descripción del valor (por defecto usa VALUE_LABEL)
// unit    = unidad de medida (por defecto "min")
const formatWithDefault = (value, label = VALUE_LABEL, unit = "min") => {
  // TODO: Implementar con parámetros por defecto relevantes al dominio
  return unit
    ? `${label}: ${value} ${unit}`
    : `${label}: ${value}`;
};

// ============================================
// SECCIÓN 6: Reporte usando las funciones
// ============================================

// TODO: Genera un reporte completo usando las funciones anteriores.
// Debe:
// 1. Mostrar el título del dominio
// 2. Recorrer items con for...of y mostrar cada uno con formatItem()
// 3. Contar los elementos válidos con isValid()
// 4. Calcular el total o promedio con calculateValue()
// 5. Mostrar el resumen final con formatWithDefault()

console.log(`\n${"═".repeat(45)}`);
console.log(`   REPORTE — ${DOMAIN_NAME}`);
console.log(`${"═".repeat(45)}`);

// TODO: Reemplaza este código de ejemplo con la implementación real

if (items.length === 0) {
  console.log("\n⚠️  No hay elementos. Agrega datos en la Sección 1.");
} else {
  // --- Listado ---
  console.log("\n📋 Listado:");
  let lineNumber = 1;
  for (const item of items) {
    // Usa formatItem(item) para mostrar cada actividad formateada
    console.log(`  ${lineNumber}. ${formatItem(item)}`);
    lineNumber++;
  }

  // --- Validación ---
  let validCount = 0;
  for (const item of items) {
    // Usa isValid(item) para contar las actividades disponibles hoy
    if (isValid(item)) {
      validCount++;
    }
  }
  console.log(`\n✅ Actividades disponibles hoy: ${validCount} / ${items.length}`);

  // --- Cálculo ---
  // Suma la duración de todas las actividades activas (1 sesión de cada una)
  let totalValue = 0;
  for (const item of items) {
    // Usa calculateValue() con la duración de cada actividad
    totalValue += calculateValue(item.value ?? 0);
  }
  // Muestra el tiempo total usando formatWithDefault
  console.log(formatWithDefault(totalValue, `Total ${VALUE_LABEL}`));
}

console.log(`\n${"═".repeat(45)}\n`);