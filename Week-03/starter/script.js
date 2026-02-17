// ============================================
// TODO 1: CLASE BASE - BaseItem
// ============================================
/**
 * Clase base abstracta para todos los elementos de tu dominio.
 * Implementa encapsulación con campos privados.
 *
 * EJEMPLO (Planetario - NO asignable):
 * class CelestialBody { ... }
 *
 * Debes renombrar esta clase según tu dominio:
 * - Biblioteca → LibraryItem
 * - Farmacia → Medicine
 * - Gimnasio → Equipment
 * - etc.
 */
class WellnessResource {
  // TODO: Declara los campos privados de tu clase base
  // Estos son los campos mínimos requeridos:
  #id;
  #name;
  #active;
  #location;
  #dateCreated;
  //
  // EJEMPLO Planetario - campos adicionales específicos:
  // #magnitude;
  // #distance;

  /**
   * Constructor de la clase base
   * @param {string} name - Nombre del elemento
   * @param {string} location - Ubicación del elemento
   */
  constructor(name, location) {
    this.#id = crypto.randomUUID();
    this.#name = name?.trim();
    this.#location = location?.trim();
    this.#active = true;
    this.#dateCreated = new Date().toISOString();

    if (!this.#name) {
      throw new Error('El nombre no puede estar vacío');
    }

    if (!this.#location) {
      throw new Error('La ubicación no puede estar vacía');
    }
  }

  // ============================================
  // GETTERS - Acceso controlado a propiedades
  // ============================================

  /**
   * Retorna el ID único del elemento
   */
  get id() {
    return this.#id;
  }

  /**
   * Retorna el nombre del elemento
   */
  get name() {
    return this.#name;
  }

  /**
   * Retorna si el elemento está activo
   */
  get isActive() {
    return this.#active;
  }

  /**
   * Retorna la ubicación del elemento
   */
  get location() {
    return this.#location;
  }

  /**
   * Retorna la fecha de creación
   */
  get dateCreated() {
    return this.#dateCreated;
  }

  // ============================================
  // SETTERS - Modificación controlada con validación
  // ============================================

  /**
   * Establece la ubicación con validación
   * @param {string} value - Nueva ubicación
   */
  set location(value) {
    if (!value || value.trim() === '') {
      throw new Error('La ubicación no puede estar vacía');
    }
    this.#location = value.trim();
  }

  // ============================================
  // MÉTODOS DE INSTANCIA
  // ============================================

  /**
   * Activa el elemento
   * @returns {Object} Resultado de la operación
   */
  activate() {
    if (this.#active) {
      return { success: false, message: 'El elemento ya está activo' };
    }
    this.#active = true;
    return { success: true, message: 'Elemento activado correctamente' };
  }

  /**
   * Desactiva el elemento
   * @returns {Object} Resultado de la operación
   */
  deactivate() {
    if (!this.#active) {
      return { success: false, message: 'El elemento ya está desactivado' };
    }
    this.#active = false;
    return { success: true, message: 'Elemento desactivado correctamente' };
  }

  /**
   * Método abstracto - DEBE ser sobrescrito en clases hijas
   * @returns {Object} Información del elemento
   */
  getInfo() {
    throw new Error('El método getInfo() debe ser implementado en la clase hija');
  }

  /**
   * Retorna el tipo de elemento (nombre de la clase)
   * @returns {string} Nombre del constructor
   */
  getType() {
    return this.constructor.name;
  }
}
// ============================================
// TODO 2: CLASES DERIVADAS - Tipos de Elementos
// ============================================
/**
 * Crea al menos 3 clases que extiendan tu clase base.
 * Cada clase debe tener:
 * - Campos privados adicionales específicos
 * - Constructor que llame a super()
 * - Getters para las nuevas propiedades
 * - Implementación de getInfo()
 *
 * EJEMPLO (Planetario - NO asignable):
 *
 * class Planet extends CelestialBody {
 *   #type;      // Rocoso, gaseoso, etc.
 *   #moons;     // Número de lunas
 *   #hasRings;  // Tiene anillos
 *
 *   constructor(name, location, type, moons, hasRings) {
 *     super(name, location);
 *     this.#type = type;
 *     this.#moons = moons;
 *     this.#hasRings = hasRings;
 *   }
 *
 *   get type() { return this.#type; }
 *   get moons() { return this.#moons; }
 *   get hasRings() { return this.#hasRings; }
 *
 *   getInfo() {
 *     return {
 *       id: this.id,
 *       name: this.name,
 *       location: this.location,
 *       type: this.#type,
 *       moons: this.#moons,
 *       hasRings: this.#hasRings,
 *       active: this.isActive
 *     };
 *   }
 * }
 */

// TODO: Implementa tu primera clase derivada (Tipo 1)
class TherapySession extends WellnessResource {
  #therapistName;
  #durationMinutes;

  constructor(name, location, therapistName, durationMinutes) {
    super(name, location);

    if (!therapistName || therapistName.trim() === '') {
      throw new Error('El nombre del terapeuta no puede estar vacío');
    }

    if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
      throw new Error('La duración debe ser un número entero positivo');
    }

    this.#therapistName = therapistName.trim();
    this.#durationMinutes = durationMinutes;
  }

  // Getters
  get therapistName() { return this.#therapistName; }
  get durationMinutes() { return this.#durationMinutes; }

  // Implementación de getInfo
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      therapistName: this.#therapistName,
      durationMinutes: this.#durationMinutes,
      active: this.isActive
    };
  }
}

// TODO: Implementa tu segunda clase derivada (Tipo 2)
class SupportGroup extends WellnessResource {
  #topic;
  #maxParticipants;

  constructor(name, location, topic, maxParticipants) {
    super(name, location);

    if (!topic || topic.trim() === '') {
      throw new Error('El tema del grupo no puede estar vacío');
    }

    if (!Number.isInteger(maxParticipants) || maxParticipants <= 0) {
      throw new Error('El número máximo de participantes debe ser un entero positivo');
    }

    this.#topic = topic.trim();
    this.#maxParticipants = maxParticipants;
  }

  // Getters
  get topic() { return this.#topic; }
  get maxParticipants() { return this.#maxParticipants; }

  // Implementación de getInfo
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      topic: this.#topic,
      maxParticipants: this.#maxParticipants,
      active: this.isActive
    };
  }
}

// TODO: Implementa tu tercera clase derivada (Tipo 3)
class MeditationProgram extends WellnessResource {
  #level;
  #sessionsCount;

  constructor(name, location, level, sessionsCount) {
    super(name, location);

    if (!level || level.trim() === '') {
      throw new Error('El nivel del programa no puede estar vacío');
    }

    if (!Number.isInteger(sessionsCount) || sessionsCount <= 0) {
      throw new Error('La cantidad de sesiones debe ser un entero positivo');
    }

    this.#level = level.trim();
    this.#sessionsCount = sessionsCount;
  }

  // Getters
  get level() { return this.#level; }
  get sessionsCount() { return this.#sessionsCount; }

  // Implementación de getInfo
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      level: this.#level,
      sessionsCount: this.#sessionsCount,
      active: this.isActive
    };
  }
}

// ============================================
// TODO 3: CLASE PERSON - Base para usuarios
// ============================================
/**
 * Clase base para todos los usuarios del sistema.
 *
 * EJEMPLO (Planetario - NO asignable):
 * Person → Visitor (visitante), Astronomer (astrónomo)
 */
class Person {
  // TODO: Declara campos privados
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) {
    if (!name || name.trim() === '') {
      throw new Error('El nombre no puede estar vacío');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Formato de email inválido');
    }

    this.#id = crypto.randomUUID();
    this.#name = name.trim();
    this.#email = email.trim();
    this.#registrationDate = new Date().toISOString();
  }

  // TODO: Implementa getters
  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get registrationDate() { return this.#registrationDate; }

  // TODO: Implementa setter con validación de email
  set email(value) {
    // Valida formato de email usando regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Formato de email inválido');
    }
    this.#email = value.trim();
  }

  /**
   * Retorna la información básica del usuario
   */
  getInfo() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      registrationDate: this.#registrationDate
    };
  }
}
// ============================================
// TODO 4: CLASES DE ROLES - Usuarios especializados
// ============================================
/**
 * Crea al menos 2 clases que extiendan Person con diferentes roles.
 *
 * EJEMPLO (Planetario - NO asignable):
 *
 * class Visitor extends Person {
 *   #ticketType;
 *   #visitCount;
 *
 *   constructor(name, email, ticketType) {
 *     super(name, email);
 *     this.#ticketType = ticketType;
 *     this.#visitCount = 0;
 *   }
 *
 *   recordVisit() {
 *     this.#visitCount++;
 *   }
 *
 *   get ticketType() { return this.#ticketType; }
 *   get visitCount() { return this.#visitCount; }
 * }
 *
 * class Astronomer extends Person {
 *   #specialty;
 *   #observations;
 *
 *   constructor(name, email, specialty) {
 *     super(name, email);
 *     this.#specialty = specialty;
 *     this.#observations = [];
 *   }
 *
 *   addObservation(observation) {
 *     this.#observations.push(observation);
 *   }
 * }
 */

// TODO: Implementa tu primer rol de usuario
class Client extends Person {
  #goals;
  #enrolledResources;

  constructor(name, email) {
    super(name, email);
    this.#goals = [];
    this.#enrolledResources = [];
  }

  addGoal(goal) {
    if (!goal || goal.trim() === '') {
      throw new Error('La meta no puede estar vacía');
    }
    this.#goals.push(goal.trim());
  }

  enrollResource(resource) {
    this.#enrolledResources.push(resource);
  }

  get goals() { return [...this.#goals]; }
  get enrolledResources() { return [...this.#enrolledResources]; }
}

// TODO: Implementa tu segundo rol de usuario
class Therapist extends Person {
  #specialty;
  #assignedSessions;

  constructor(name, email, specialty) {
    super(name, email);

    if (!specialty || specialty.trim() === '') {
      throw new Error('La especialidad no puede estar vacía');
    }

    this.#specialty = specialty.trim();
    this.#assignedSessions = [];
  }

  assignSession(session) {
    this.#assignedSessions.push(session);
  }

  get specialty() { return this.#specialty; }
  get assignedSessions() { return [...this.#assignedSessions]; }
}

// ============================================
// TODO 5: CLASE PRINCIPAL DEL SISTEMA
// ============================================
class MainSystem {
  #items = [];
  #users = [];
  #transactions = [];

  static {
    this.VERSION = '1.0.0';
    this.MAX_ITEMS = 1000;
    this.SYSTEM_NAME = 'Sistema de Salud Mental y Bienestar';
    console.log(`Sistema ${this.SYSTEM_NAME} v${this.VERSION} cargado`);
  }

  static isValidId(id) {
    return typeof id === 'string' && id.trim().length > 0;
  }

  static generateId() {
    return crypto.randomUUID();
  }

  addItem(item) {
    if (!(item instanceof WellnessResource)) {
      return { success: false, message: 'El item debe ser instancia de WellnessResource' };
    }

    if (this.#items.length >= MainSystem.MAX_ITEMS) {
      return { success: false, message: 'Límite de items alcanzado' };
    }

    this.#items.push(item);
    return { success: true, message: 'Item agregado correctamente', item };
  }

  removeItem(id) {
    const index = this.#items.findIndex(item => item.id === id);

    if (index === -1) {
      return { success: false, message: 'Item no encontrado' };
    }

    const removed = this.#items.splice(index, 1)[0];
    return { success: true, message: 'Item eliminado', item: removed };
  }

  findItem(id) {
    return this.#items.find(item => item.id === id) ?? null;
  }

  getAllItems() {
    return [...this.#items];
  }

  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(i => i.isActive).length;
    const inactive = total - active;

    const byType = this.#items.reduce((acc, item) => {
      const type = item.getType();
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    return {
      total,
      active,
      inactive,
      byType,
      users: this.#users.length
    };
  }

  addUser(user) {
    if (!(user instanceof Person)) {
      return { success: false, message: 'Debe ser instancia de Person' };
    }

    this.#users.push(user);
    return { success: true, message: 'Usuario registrado' };
  }

  getAllUsers() {
    return [...this.#users];
  }
}

// ============================================
// TODO 6: INSTANCIA DEL SISTEMA Y DATOS DE PRUEBA
// ============================================
const system = new MainSystem();

const therapy1 = new TherapySession('Terapia de Ansiedad', 'Consultorio 101', 'Dra. López', 60);
const therapy2 = new TherapySession('Terapia de Estrés', 'Online', 'Dr. Pérez', 45);

const group1 = new SupportGroup('Grupo de Apoyo Emocional', 'Sala 3', 'Manejo del estrés', 12);
const group2 = new SupportGroup('Grupo de Duelo', 'Sala 2', 'Acompañamiento en duelo', 10);

const meditation1 = new MeditationProgram('Meditación Guiada Inicial', 'Online', 'Inicial', 8);
const meditation2 = new MeditationProgram('Mindfulness Avanzado', 'Sala Zen', 'Avanzado', 12);

system.addItem(therapy1);
system.addItem(therapy2);
system.addItem(group1);
system.addItem(group2);
system.addItem(meditation1);
system.addItem(meditation2);

const client1 = new Client('Ana Torres', 'ana@example.com');
const client2 = new Client('Luis Martínez', 'luis@example.com');
const therapist1 = new Therapist('Carla Gómez', 'carla@example.com', 'Terapia Cognitivo-Conductual');

system.addUser(client1);
system.addUser(client2);
system.addUser(therapist1);

// ============================================
// TODO 7: REFERENCIAS AL DOM
// ============================================
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const statsContainer = document.getElementById('stats');
const filterType = document.getElementById('filter-type');
const filterStatus = document.getElementById('filter-status');
const searchInput = document.getElementById('search-input');

const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');

// ============================================
// TODO 8: FUNCIONES DE RENDERIZADO
// ============================================
const renderItem = item => `
  <div class="item ${item.isActive ? '' : 'inactive'}" data-id="${item.id}">
    <h3>${item.name}</h3>
    <span>${item.getType()}</span>
    <p>Ubicación: ${item.location}</p>
    <p>Estado: ${item.isActive ? 'Activo' : 'Inactivo'}</p>
    <button class="btn-toggle" data-id="${item.id}">
      ${item.isActive ? 'Desactivar' : 'Activar'}
    </button>
    <button class="btn-delete" data-id="${item.id}">Eliminar</button>
  </div>
`;

const renderItems = items => {
  itemList.innerHTML = items.length
    ? items.map(renderItem).join('')
    : '<p>No hay elementos</p>';
};

const renderUsers = users => {
  userList.innerHTML = users.length
    ? users.map(u => `
      <div class="user">
        <h4>${u.name}</h4>
        <p>${u.email}</p>
      </div>
    `).join('')
    : '<p>No hay usuarios registrados</p>';
};

const renderStats = stats => {
  statsContainer.innerHTML = `
    <p>Total: ${stats.total}</p>
    <p>Activos: ${stats.active}</p>
    <p>Inactivos: ${stats.inactive}</p>
    <p>Usuarios: ${stats.users}</p>
  `;
};

// ============================================
// TODO 9: EVENT HANDLERS
// ============================================
const handleFormSubmit = e => {
  e.preventDefault();
  const fd = new FormData(itemForm);

  let item;

  if (fd.get('type') === 'TherapySession') {
    item = new TherapySession(fd.get('name'), fd.get('location'), fd.get('therapistName'), Number(fd.get('durationMinutes')));
  }

  if (fd.get('type') === 'SupportGroup') {
    item = new SupportGroup(fd.get('name'), fd.get('location'), fd.get('topic'), Number(fd.get('maxParticipants')));
  }

  if (fd.get('type') === 'MeditationProgram') {
    item = new MeditationProgram(fd.get('name'), fd.get('location'), fd.get('level'), Number(fd.get('sessionsCount')));
  }

  if (!item) return;

  system.addItem(item);
  renderItems(system.getAllItems());
  renderStats(system.getStats());
  itemForm.reset();
  document.getElementById('item-modal').style.display = 'none';
};

const handleUserSubmit = e => {
  e.preventDefault();
  const fd = new FormData(userForm);

  let user;

  if (fd.get('type') === 'Client') {
    user = new Client(fd.get('name'), fd.get('email'));
  }

  if (fd.get('type') === 'Therapist') {
    user = new Therapist(fd.get('name'), fd.get('email'), fd.get('specialty'));
  }

  if (!user) return;

  system.addUser(user);
  renderUsers(system.getAllUsers());
  userForm.reset();
  document.getElementById('user-modal').style.display = 'none';
};

const handleItemAction = e => {
  const id = e.target.dataset.id;
  if (!id) return;

  const item = system.findItem(id);
  if (!item) return;

  if (e.target.classList.contains('btn-toggle')) {
    item.isActive ? item.deactivate() : item.activate();
  }

  if (e.target.classList.contains('btn-delete')) {
    if (confirm('¿Eliminar este elemento?')) {
      system.removeItem(id);
    }
  }

  renderItems(system.getAllItems());
  renderStats(system.getStats());
};

// ============================================
// TODO 10: EVENT LISTENERS
// ============================================
itemForm.addEventListener('submit', handleFormSubmit);
userForm.addEventListener('submit', handleUserSubmit);
itemList.addEventListener('click', handleItemAction);

// ============================================
// TODO 11: INICIALIZACIÓN
// ============================================
const init = () => {
  renderItems(system.getAllItems());
  renderUsers(system.getAllUsers());
  renderStats(system.getStats());
  setupTabs();
  setupItemModal();
  setupUserModal();
  console.log('✅ Sistema inicializado correctamente');
};

document.addEventListener('DOMContentLoaded', init);
// ============================================
// FIX: NAVEGACIÓN DE TABS
// ============================================

const setupTabs = () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
};

// ============================================
// FIX: MODAL DE AGREGAR ELEMENTOS
// ============================================

const setupItemModal = () => {
  const addItemBtn = document.getElementById('add-item-btn');
  const modal = document.getElementById('item-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const cancelBtn = document.getElementById('cancel-btn');

  if (!addItemBtn || !modal) return;

  addItemBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar modal al hacer click fuera
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
};

// ============================================
// FIX: MODAL DE USUARIOS
// ============================================

const setupUserModal = () => {
  const addUserBtn = document.getElementById('add-user-btn');
  const modal = document.getElementById('user-modal');
  const closeBtn = document.getElementById('close-user-modal');
  const cancelBtn = document.getElementById('cancel-user-btn');
  const modalContent = modal?.querySelector('.modal-content');

  if (!addUserBtn || !modal) {
    console.warn('❌ No se encontró #add-user-btn o #user-modal');
    return;
  }

  addUserBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeBtn?.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  cancelBtn?.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // 🔒 Evita que el click dentro del contenido cierre el modal
  modalContent?.addEventListener('click', e => {
    e.stopPropagation();
  });

  // ✅ Solo cierra si haces click en el fondo (overlay)
  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
};

// ============================================

// ============================================
// INTEGRACIÓN CON TU INIT()
// ============================================

const originalInit = init;

const initWithUI = () => {
  if (originalInit) originalInit();
  setupTabs();
  setupItemModal();
  setupUserModal();
};

document.removeEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', initWithUI);

// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// Después de completar todos los TODOs, verifica:
//
// CLASES Y HERENCIA:
// ✓ Clase base con campos privados
// ✓ Mínimo 3 clases derivadas con extends
// ✓ Uso correcto de super() en constructores
// ✓ Método getInfo() implementado en cada clase derivada
//
// ENCAPSULACIÓN:
// ✓ Todos los campos son privados (#)
// ✓ Getters para acceso a propiedades
// ✓ Setters con validación donde corresponda
//
// CARACTERÍSTICAS MODERNAS:
// ✓ Static block en clase principal
// ✓ Métodos estáticos de utilidad
// ✓ Uso de crypto.randomUUID() para IDs
//
// CÓDIGO:
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
// ✓ Nombres de clases adaptados a mi dominio
// ✓ Sin copiar implementación de otros compañeros
