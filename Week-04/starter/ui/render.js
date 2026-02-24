import { CATEGORIES } from '../config.js';
// import { formatPrice, formatStock } from '../utils/index.js';

/**
 * Renderiza la tabla de productos
 * @param {Array} products
 * @param {HTMLElement} container
 */
export const renderProducts = (products, container) => {
  if (!container) return;
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="text-center p-4">No hay insumos registrados.</td></tr>`;
    return;
  }

  // Iteración con destructuring para crear las filas
  products.forEach(product => {
    const row = document.createElement('tr');
    row.className = 'border-b hover:bg-gray-50';
    row.innerHTML = createProductRow(product);
    container.appendChild(row);
  });

  updateProductCount(products.length);
};

/**
 * Crea el HTML de una fila de producto
 * @param {Object} product
 * @returns {string} - HTML string
 */
export const createProductRow = ({ id, name, category, price, quantity }) => {
  // Buscamos la categoría para obtener su icono
  const cat = CATEGORIES.find(c => c.id === category) || { icon: '📦', name: 'Otro' };
  const total = (price * quantity).toFixed(2);
  
  // Determinamos clase visual según stock (puedes usar tus THRESHOLDS aquí)
  const stockClass = quantity <= 10 ? 'text-red-600 font-bold' : 'text-gray-700';

  return `
    <td class="p-3 text-center">${id}</td>
    <td class="p-3 font-medium">${name}</td>
    <td class="p-3"><span title="${cat.name}">${cat.icon}</span></td>
    <td class="p-3 text-right">$${price.toFixed(2)}</td>
    <td class="p-3 text-center ${stockClass}">${quantity}</td>
    <td class="p-3 text-right font-semibold">$${total}</td>
    <td class="p-3 text-center">
      <button data-id="${id}" data-action="edit" class="text-blue-600 hover:text-blue-800 mr-2">✏️</button>
      <button data-id="${id}" data-action="delete" class="text-red-600 hover:text-red-800">🗑️</button>
    </td>
  `;
};

/**
 * Puebla los elementos <select> con las categorías de salud mental
 * @param {Array<HTMLSelectElement>} selects
 */
export const renderCategoryOptions = selects => {
  const optionsHTML = CATEGORIES.map(({ id, name, icon }) => 
    `<option value="${id}">${icon} ${name}</option>`
  ).join('');

  selects.forEach(select => {
    if (select) {
      const defaultOption = select.firstElementChild?.outerHTML || '<option value="">Seleccionar...</option>';
      select.innerHTML = defaultOption + optionsHTML;
    }
  });
};

/**
 * Muestra una notificación temporal en pantalla
 */
export const showNotification = (message, type = 'info') => {
  const container = document.getElementById('notification-container') || document.body;
  const alert = document.createElement('div');
  
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  alert.className = `fixed bottom-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-500 z-50`;
  alert.textContent = message;

  container.appendChild(alert);

  setTimeout(() => {
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 500);
  }, 3000);
};

/**
 * Renderiza las tarjetas de estadísticas en la sección de reportes
 * @param {Object} stats
 * @param {HTMLElement} container
 */
export const renderReports = ({ totalProducts, totalValue, lowStockProducts }, container) => {
  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="p-4 bg-white rounded shadow border-l-4 border-blue-500">
        <p class="text-gray-500 text-sm">Total Productos</p>
        <h3 class="text-2xl font-bold">${totalProducts}</h3>
      </div>
      <div class="p-4 bg-white rounded shadow border-l-4 border-green-500">
        <p class="text-gray-500 text-sm">Valor Invertido</p>
        <h3 class="text-2xl font-bold">$${totalValue.toFixed(2)}</h3>
      </div>
      <div class="p-4 bg-white rounded shadow border-l-4 border-yellow-500">
        <p class="text-gray-500 text-sm">Stock Bajo</p>
        <h3 class="text-2xl font-bold">${lowStockProducts}</h3>
      </div>
    </div>
  `;
};
