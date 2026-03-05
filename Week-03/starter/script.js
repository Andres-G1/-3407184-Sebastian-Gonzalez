// ============================================
// PROYECTO SEMANA 03: Calculadora de Dominio
// ============================================
// Adapta este archivo a tu dominio asignado.
//
// Ejemplos con dominios no asignables:
// - Planetario    → calcular ingresos por función, capacidad disponible
// - Acuario       → calcular costo de alimentación, volumen total de tanques
// - Museo         → calcular valor de exhibición, costo de entrada
// - Zoológico     → calcular gasto diario por especie, total de visitantes
// - Observatorio  → calcular duración total de eventos, aforo restante
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================
console.log("Salud Mental y Bienestar")
const Nom = "Psicologia"
console.log(Nom)
// TODO: Define las constantes base de tu dominio
// Ejemplos con dominios no asignables:
//   Planetario:   TICKET_PRICE = 12_000, MAX_CAPACITY = 45
//   Acuario:      DAILY_FEEDING_KG = 150, ENTRY_PRICE = 35_000
//   Museo:        ADULT_TICKET = 20_000, GUIDED_TOUR = 15_000
//   Zoológico:    FOOD_COST_PER_DAY = 500_000, MAX_VISITORS = 800
//   Observatorio: SESSION_DURATION = 90, TICKET_PRICE = 18_000

// const EXAMPLE_CONSTANT = 0; // TODO: Reemplazar con tus constantes
const SESSION_DURATION = 2, VAL_SESSION = 10_000
console.log("Duracion de la sesion:   ",SESSION_DURATION,"Horas") 
// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones básicas ===");

// TODO: Calcula totales, subtotales o valores clave de tu dominio
// Usa: +, -, *, /, %, **
// Etiqueta cada resultado con console.log()
const val_sess = 10_000
console.log("El valor de la sesion es:    ",val_sess)
const num_sess = 3
console.log("la cantidad de sesiones son:    ",num_sess)
// Ejemplo con dominio Planetario (NO copiar):
// const ticketPrice = 12_000;
// const attendees = 38;
// const totalRevenue = ticketPrice * attendees;
const totalsess = num_sess * val_sess
console.log("El valor total por ",num_sess ," es de ",totalsess)
// console.log("Ingresos función:", totalRevenue);
// const remainingSeats = 45 - attendees;
// console.log("Asientos disponibles:", remainingSeats);

console.log("");

// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Asignación compuesta ===");

// TODO: Usa +=, -=, *=, /= para actualizar valores acumulados
// Muestra el valor antes y después de cada operación

// Ejemplo (NO copiar):
 let runningTotal = 0;
 runningTotal += 30_000;
 console.log("Tras las 3 sessiones:", runningTotal);
 runningTotal += 5_000;
 console.log("Mas 30 min mas:", runningTotal);
 runningTotal *= 0.85; // descuento del 15%
 console.log("Con descuento:", runningTotal);

console.log("");

// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones con === ===");

// TODO: Valida condiciones usando === y operadores de orden
// NUNCA uses == (penalización en la rúbrica)

// Ejemplo (NO copiar):
 const daysLate = 3;
 const hasFine = daysLate > 3;
 console.log("¿Multa por faltar a la sesion?", hasFine);
const isOnTime = daysLate === 3;
 console.log("¿Sessiones completadas?", isOnTime);

console.log("");

// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones lógicas ===");

// TODO: Combina condiciones con &&, ||, !
// Al menos una condición con && y una con ||

// Ejemplo (NO copiar):
 const isPatient = true;
 const purchasesessions = 35_000;
 const qualifiesForDiscount = isPatient && purchasesessions >= 30_000;
 console.log("¿Descuento aplicable?", qualifiesForDiscount);

console.log("");

// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen ===");

// TODO: Muestra un resumen con los valores más importantes
// calculados en las secciones anteriores
console.log("Nombre sesion:   ",Nom)
console.log("cobro total:    ",runningTotal)
console.log("Descuento:   ",qualifiesForDiscount)
console.log("¿Sesiones completadas?   ",isOnTime)

console.log("");
