import { inventory } from '../services/index.js';
// Asumiendo que estas funciones existen en tus utilidades y renderizado
// import { validateProduct } from '../utils/index.js';
// import { renderProducts, updateProductCount, showNotification } from './render.js';

/**
 * Inicializa todos los escuchadores de eventos
 */
export const initEvents = () => {
  // Formulario de alta
  document.getElementById('product-form')?.addEventListener('submit', handleFormSubmit);

  // Filtros dinámicos
  document.getElementById('search-input')?.addEventListener('input', handleFilterChange);
  document.getElementById('category-filter')?.addEventListener('change', handleFilterChange);
  document.getElementById('stock-filter')?.addEventListener('change', handleFilterChange);

  // Delegación de eventos para la tabla (Editar/Eliminar)
  document.getElementById('inventory-table')?.addEventListener('click', handleTableAction);

  // Botón de reportes con carga diferida
document.getElementById('load-reports')?.addEventListener('click', handleLoadReports);


  // Cerrar modal
  document.getElementById('btn-close-modal')?.addEventListener('click', closeModal);
};

/**
 * Maneja el envío del formulario de nuevo producto
 */
export const handleFormSubmit = event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  // Destructuring de los datos del formulario
  const productData = {
    name: formData.get('name').trim(),
    category: formData.get('category'),
    price: parseFloat(formData.get('price')),
    quantity: parseInt(formData.get('quantity'), 10)
  };

  // Validación básica
  if (!productData.name || !productData.category) {
    return alert('Por favor, completa los campos obligatorios.');
  }

  inventory.add(productData);
  event.target.reset();
  handleFilterChange(); // Refrescar vista
};

/**
 * Maneja los cambios en los filtros (Búsqueda, Categoría, Stock)
 */
export const handleFilterChange = () => {
  const filters = {
    search: document.getElementById('search-input').value,
    category: document.getElementById('category-filter').value,
    stockFilter: document.getElementById('stock-filter').value
  };

  const filteredProducts = inventory.filter(filters);
  // renderProducts(filteredProducts); // Función de renderizado
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
  if (confirm('¿Estás seguro de eliminar este insumo médico?')) {
    inventory.remove(productId);
    handleFilterChange();
  }
};

/**
 * Carga dinámica de reportes (Lazy Loading)
 */
export const handleLoadReports = async () => {
  try {
    const btn = document.getElementById('btn-reports');
    btn.disabled = true;
    btn.textContent = 'Cargando...';

    // Importación dinámica para ahorrar ancho de banda inicial
    const reports = await import('../features/reports.js');
    const products = inventory.getAll();
    const stats = reports.generateStats(products);
    
    console.log('📊 Estadísticas generadas:', stats);
    // renderStats(stats); // Función para mostrar los números en pantalla
  } catch (error) {
    console.error('Error cargando el módulo de reportes:', error);
  } finally {
    const btn = document.getElementById('btn-reports');
    btn.disabled = false;
    btn.textContent = 'Generar Reportes';
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
