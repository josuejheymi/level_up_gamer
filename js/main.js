// Funciones generales para todo el sitio
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar contador del carrito en todas las páginas
    actualizarContadorCarrito();
    
    // Cargar productos destacados en la página principal
    cargarProductosDestacados();
});

// Función para cargar productos destacados en la página principal
function cargarProductosDestacados() {
    const featuredSection = document.getElementById('featured-products');
    
    if (!featuredSection) return;
    
    // Tomar los primeros 4 productos como destacados
    const productosDestacados = productos.slice(0, 4);
    
    let html = '';
    productosDestacados.forEach(producto => {
        html += `
            <div class="product-card">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${producto.nombre}</h3>
                    <p class="product-price">$${producto.precio.toLocaleString('es-CL')} CLP</p>
                    <button class="add-to-cart" data-id="${producto.id}">Añadir al Carrito</button>
                    <a href="detalle-producto.html?id=${producto.id}" class="btn-details">Ver Detalles</a>
                </div>
            </div>
        `;
    });
    
    featuredSection.innerHTML = html;
    
    // Agregar eventos a los botones de carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            agregarAlCarrito(productId);
        });
    });
}

// Función para actualizar contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    document.querySelectorAll('#cart-count').forEach(element => {
        element.textContent = totalItems;
    });
}