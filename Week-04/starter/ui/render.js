import { CATEGORIES } from '../config.js';

/**
 * Renderiza la tabla de productos
 * @param {Array} products
 * @param {HTMLElement} container
 */
export const renderProducts = (products, container) => {
  if (!container) return;
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="empty-state">No hay insumos registrados. ¡Agrega uno!</td></tr>`;
    return;
  }

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = createProductRow(product);
    container.appendChild(row);
  });
};

/**
 * Crea el HTML de una fila de producto
 * @param {Object} product
 * @returns {string} - HTML string
 */
export const createProductRow = ({ id, name, category, price, quantity }) => {
  const cat = CATEGORIES.find(c => c.id === category) || { icon: '📦', name: 'Otro' };
  const total = (price * quantity).toFixed(2);
  const stockClass = quantity === 0 ? 'stock-out' : quantity <= 10 ? 'stock-low' : '';

  return `
    <td>${name}</td>
    <td><span title="${cat.name}">${cat.icon} ${cat.name}</span></td>
    <td>$${price.toFixed(2)}</td>
    <td class="${stockClass}">${quantity}</td>
    <td>$${total}</td>
    <td>
      <button data-id="${id}" data-action="edit" class="btn btn-secondary" style="padding:4px 10px;font-size:0.85rem;">✏️ Editar</button>
      <button data-id="${id}" data-action="delete" class="btn" style="padding:4px 10px;font-size:0.85rem;background:#ef4444;color:#fff;border:none;">🗑️ Borrar</button>
    </td>
  `;
};

/**
 * Actualiza el contador de productos
 * @param {number} count
 */
export const updateProductCount = count => {
  // CORREGIDO: el ID en el HTML es 'product-count'
  const badge = document.getElementById('product-count');
  if (badge) badge.textContent = `${count} producto${count !== 1 ? 's' : ''}`;
};

/**
 * Puebla los elementos <select> con las categorías
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
  const container = document.body;
  const alert = document.createElement('div');

  const colors = { success: '#10b981', error: '#ef4444', info: '#3b82f6' };
  alert.style.cssText = `
    position:fixed;bottom:1.5rem;right:1.5rem;
    background:${colors[type]};color:#fff;
    padding:0.75rem 1.25rem;border-radius:8px;
    box-shadow:0 4px 12px rgba(0,0,0,0.15);
    z-index:9999;transition:opacity 0.5s;
  `;
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
export const renderReports = (stats, container) => {
  if (!container) return;

  const { totalProducts = 0, totalValue = 0, lowStockProducts = 0, outOfStockProducts = 0 } = stats;

  container.innerHTML = `
    <div class="report-card">
      <p>Total Productos</p>
      <h3>${totalProducts}</h3>
    </div>
    <div class="report-card">
      <p>Valor Total Inventario</p>
      <h3>$${totalValue.toFixed(2)}</h3>
    </div>
    <div class="report-card">
      <p>Stock Bajo</p>
      <h3>${lowStockProducts}</h3>
    </div>
    <div class="report-card">
      <p>Sin Stock</p>
      <h3>${outOfStockProducts}</h3>
    </div>
  `;
};
