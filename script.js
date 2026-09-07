// DATOS DE PRODUCTOS DE MOKAFETERÍA
const products = [
  {
    id: 1,
    name: "Café Espresso Doble",
    category: "cafes",
    price: 2400,
    description: "Espresso concentrado preparado con granos selección especial de la casa.",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80"
  },
  {
    id: 2,
    name: "Cappuccino Italiano",
    category: "cafes",
    price: 3200,
    description: "Espresso perfecto, leche vaporizada y cremosa espuma de leche con cacao.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80"
  },
  {
    id: 3,
    name: "Café & Muffin de Arándanos",
    category: "reposteria",
    price: 4500,
    description: "Café americano recién elaborado acompañado de un muffin casero horneado hoy.",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500&q=80"
  },
  {
    id: 4,
    name: "Muffin de Chocolate y Nueces",
    category: "reposteria",
    price: 2600,
    description: "Esponjoso muffin de cacao intenso cargado de trozos de chocolate y nueces.",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&q=80"
  },
  {
    id: 5,
    name: "Avocado Toast Mokafetería",
    category: "desayunos",
    price: 6800,
    description: "Pan de masa madre tostado, palta fresca molida, huevo pochado y semillas.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80"
  },
  {
    id: 6,
    name: "Sándwich Mechada Queso",
    category: "sandwiches",
    price: 7200,
    description: "Carne mechada suave y jugosa con abundante queso fundido en pan brioche.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80"
  },
  {
    id: 7,
    name: "Iced Caramel Macchiato",
    category: "bebidas",
    price: 3800,
    description: "Bebida fría a base de café, leche, hielo y toque dulce de salsa de caramelo.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80"
  },
  {
    id: 8,
    name: "Torta de Zanahoria & Nuez",
    category: "reposteria",
    price: 3900,
    description: "Porción de tarta casera de zanahoria con especias y suave cobertura de queso crema.",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&q=80"
  }
];

// ESTADO DEL CARRITO
let cart = [];

// ELEMENTOS DOM
const productsGrid = document.getElementById('productsGrid');
const cartBadge = document.getElementById('cartBadge');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.btn-category');

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupEvents();
});

// MOSTRAR PRODUCTOS EN PANTALLA
function renderProducts(productList) {
  productsGrid.innerHTML = '';
  
  if (productList.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-12 text-center text-light py-5">
        <h4>No se encontraron productos</h4>
        <p>Prueba buscando con otro término o categoría.</p>
      </div>
    `;
    return;
  }

  productList.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="card card-product h-100 shadow-sm">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title fw-bold mb-1">${product.name}</h6>
          <p class="card-text text-muted small flex-grow-1">${product.description}</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="badge-price">$${product.price.toLocaleString('es-CL')}</span>
            <button class="btn btn-add-cart" onclick="addToCart(${product.id})" title="Añadir al carrito">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    productsGrid.appendChild(col);
  });
}

// AÑADIR PRODUCTO AL CARRITO
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

// REMOVER / DISMINUIR DEL CARRITO
function removeFromCart(productId) {
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem.quantity > 1) {
    existingItem.quantity -= 1;
  } else {
    cart = cart.filter(item => item.id !== productId);
  }

  updateCartUI();
}

// ACTUALIZAR INTERFAZ DEL CARRITO
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems > 0) {
    cartBadge.textContent = totalItems;
    cartBadge.classList.remove('d-none');
    checkoutBtn.disabled = false;
  } else {
    cartBadge.classList.add('d-none');
    checkoutBtn.disabled = true;
  }

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-center text-muted py-4">Tu carrito está vacío</p>';
    cartTotal.textContent = '$0';
    return;
  }

  cartItemsContainer.innerHTML = '';
  let totalCost = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalCost += itemTotal;

    const row = document.createElement('div');
    row.className = 'd-flex justify-content-between align-items-center mb-3 pb-2 border-bottom';
    row.innerHTML = `
      <div>
        <h6 class="mb-0 fw-bold">${item.name}</h6>
        <small class="text-muted">$${item.price.toLocaleString('es-CL')} c/u</small>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary px-2" onclick="removeFromCart(${item.id})">-</button>
        <span class="fw-bold">${item.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary px-2" onclick="addToCart(${item.id})">+</button>
        <span class="ms-2 fw-bold text-dark">$${itemTotal.toLocaleString('es-CL')}</span>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartTotal.textContent = `$${totalCost.toLocaleString('es-CL')}`;
}

// EVENTOS DE FILTRADO Y BÚSQUEDA
function setupEvents() {
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');
      if (category === 'todos') {
        renderProducts(products);
      } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
      }
    });
  });

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term)
    );
    renderProducts(filtered);
  });

  checkoutBtn.addEventListener('click', () => {
    alert('¡Gracias por tu pedido en Mokafetería! Lo estamos preparando.');
    cart = [];
    updateCartUI();
    const modalEl = document.getElementById('cartModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  });
}

//RESERVAS

const reservaForm = document.getElementById('reservaForm');
const reservaMensaje = document.getElementById('reservaMensaje');

reservaForm.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const fechaIngresada = document.getElementById('reservaFecha').value;
    const horaIngresada = document.getElementById('reservaHora').value;
    const personasIngresadas = document.getElementById('reservaPersonas').value;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaReserva = new Date(fechaIngresada + 'T00:00:00');

    if (fechaReserva < hoy) {
        mostrarMensaje('Por favor, elige una fecha a partir de hoy.', 'danger');
        return;
    }

    // validar hora
    const hora = parseInt(horaIngresada.split(':')[0]);
    if (hora < 8 || hora >= 22) {
        mostrarMensaje('Nuestro horario de atención es de 08:00 a 22:00 hrs.', 'danger');
        return;
    }

    // Validar Personas (Entre 1 y 20)
    if (personasIngresadas < 1 || personasIngresadas > 20) {
        mostrarMensaje('Las reservas deben ser para entre 1 y 20 personas.', 'danger');
        return;
    }

    mostrarMensaje('¡Reserva confirmada con éxito! Te esperamos.', 'success');
    reservaForm.reset();
});

function mostrarMensaje(texto, tipo) {
    reservaMensaje.textContent = texto;
    reservaMensaje.className = `alert alert-${tipo} mb-4`; 
    reservaMensaje.classList.remove('d-none');
}