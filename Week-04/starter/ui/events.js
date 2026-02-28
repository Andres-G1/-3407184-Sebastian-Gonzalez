import { inventory } from '../services/index.js';
import { renderProducts, updateProductCount, renderReports } from './render.js';

/**
 * Inicializa todos los escuchadores de eventos
 */
export const initEvents = () => {
  // Formulario de alta
  document.getElementById('product-form')?.addEventListener('submit', handleFormSubmit);

  // Filtros dinámicos
  // CORREGIDO: IDs según el HTML real
  document.getElementById('search')?.addEventListener('input', handleFilterChange);
  document.getElementById('filter-category')?.addEventListener('change', handleFilterChange);
  document.getElementById('filter-stock')?.addEventListener('change', handleFilterChange);

  // Delegación de eventos para la tabla (Editar/Eliminar)
  // CORREGIDO: ID en HTML es 'products-table', no 'inventory-table'
  document.getElementById('products-table')?.addEventListener('click', handleTableAction);

  // Botón de reportes con carga diferida
  // CORREGIDO: ID en HTML es 'load-reports', no 'btn-reports'
  document.getElementById('load-reports')?.addEventListener('click', handleLoadReports);

  // Cerrar modal
  // CORREGIDO: ID en HTML es 'modal-close', no 'btn-close-modal'
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('cancel-edit')?.addEventListener('click', closeModal);

  // Guardar edición desde el modal
  document.getElementById('edit-form')?.addEventListener('submit', handleEditSubmit);
};

/**
 * Maneja el envío del formulario de nuevo producto
 */
export const handleFormSubmit = event => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const productData = {
    name: formData.get('name').trim(),
    category: formData.get('category'),
    price: parseFloat(formData.get('price')),
    quantity: parseInt(formData.get('quantity'), 10)
  };

  if (!productData.name || !productData.category) {
    return alert('Por favor, completa los campos obligatorios.');
  }

  inventory.add(productData);
  event.target.reset();
  refreshView();
};

/**
 * Maneja el envío del formulario de edición desde el modal
 */
export const handleEditSubmit = event => {
  event.preventDefault();

  const id = parseInt(document.getElementById('edit-id').value, 10);
  const updates = {
    name: document.getElementById('edit-name').value.trim(),
    category: document.getElementById('edit-category').value,
    price: parseFloat(document.getElementById('edit-price').value),
    quantity: parseInt(document.getElementById('edit-quantity').value, 10)
  };

  inventory.update(id, updates);
  closeModal();
  refreshView();
};

/**
 * Refresca la tabla aplicando los filtros activos
 */
export const refreshView = () => {
  const filters = {
    // CORREGIDO: IDs según el HTML real
    search: document.getElementById('search')?.value || '',
    category: document.getElementById('filter-category')?.value || '',
    stockFilter: document.getElementById('filter-stock')?.value || ''
  };

  const filteredProducts = inventory.filter(filters);
  const container = document.getElementById('products-body');
  renderProducts(filteredProducts, container);
  updateProductCount(filteredProducts.length);
};

/**
 * Maneja los cambios en los filtros
 */
export const handleFilterChange = () => {
  refreshView();
};

/**
 * Delegación de eventos para acciones en la tabla
 */
export const handleTableAction = event => {
  const button = event.target.closest('button');
  if (!button) return;

  const { action, id } = button.dataset;
  const productId = parseInt(id, 10);

  if (action === 'edit') handleEdit(productId);
  if (action === 'delete') handleDelete(productId);
};

/**
 * Maneja el clic en editar
 */
export const handleEdit = productId => {
  const product = inventory.getById(productId);
  if (product) openModal(product);
};

/**
 * Maneja el clic en eliminar
 */
export const handleDelete = productId => {
  if (confirm('¿Estás seguro de eliminar este insumo?')) {
    inventory.remove(productId);
    refreshView();
  }
};

/**
 * Carga dinámica de reportes (Lazy Loading)
 */
export const handleLoadReports = async () => {
  // CORREGIDO: el botón en el HTML es 'load-reports', no 'btn-reports'
  const btn = document.getElementById('load-reports');

  try {
    btn.disabled = true;
    btn.textContent = 'Cargando...';

    const reports = await import('../features/reports.js');
    const products = inventory.getAll();
    const stats = reports.generateStats(products);

    const container = document.getElementById('reports-container');
    renderReports(stats, container);

    console.log('📊 Estadísticas generadas:', stats);
  } catch (error) {
    console.error('Error cargando el módulo de reportes:', error);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Cargar Reportes';
  }
};

/**
 * Abre el modal y lo puebla con los datos del producto
 */
export const openModal = ({ id, name, category, price, quantity }) => {
  const modal = document.getElementById('edit-modal');
  document.getElementById('edit-id').value = id;
  document.getElementById('edit-name').value = name;
  document.getElementById('edit-category').value = category;
  document.getElementById('edit-price').value = price;
  document.getElementById('edit-quantity').value = quantity;

  modal.classList.remove('hidden');
};

/**
 * Cierra el modal
 */
export const closeModal = () => {
  document.getElementById('edit-modal').classList.add('hidden');
};
