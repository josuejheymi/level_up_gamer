// Array de productos
const productos = [
    {
        id: 1,
        nombre: "Audifonos Gamer HyperX Cloud II",
        categoria: "accesorios",
        precio: 19990,
        imagen: "img/Auriculares gamer inalámbricos.jpeg",
        descripcion: "Los mejores audifonos con: Alcance inalámbrico de 0 m, modo manos libres incluido y Con cancelación de ruido."
    },
    {
        id: 2,
        nombre: "Call of Duty",
        categoria: "juegos",
        precio: 59990,
        imagen: "img/call_of_duty.jpg",
        descripcion: "Call of Duty (2003) es un shooter en primera persona ambientado en la Segunda Guerra Mundial que te permite jugar desde la perspectiva de soldados estadounidenses, británicos y soviéticos en campañas interconectadas, viviendo el conflicto a través de distintas batallas importantes como el desembarco de Normandía y la Batalla de Stalingrado."
    },
    {
        id: 3,
        nombre: "PlayStation 5",
        categoria: "consolas",
        precio: 549990,
        imagen: "img/ps1-image.jpg",
        descripcion: "La consola de última generación de Sony, con gráficos impresionantes y tiempos de carga ultrarrápidos."
    },
    {
        id: 4,
        nombre: "PC Gamer ASUS ROG Strix",
        categoria: "computadores",
        precio: 1299990,
        imagen: "img/pc_gamer1.jpg",
        descripcion: "Potente equipo diseñado para gamers exigentes, equipado con los últimos componentes."
    },
    {
        id: 5,
        nombre: "Silla Gamer SecretLab Titan",
        categoria: "sillas",
        precio: 349990,
        imagen: "img/silla.jpg",
        descripcion: "Silla diseñada para máximo confort con soporte ergonómico y personalización ajustable."
    },
    {
        id: 6,
        nombre: "Guitar Hero",
        categoria: "juegos",
        precio: 49990,
        imagen: "img/guitar_hero_3.jpg",
        descripcion: "Guitar Hero III: Legends of Rock es un videojuego musical en el que el jugador simula tocar la guitarra para interpretar canciones de rock, desbloqueando nuevas canciones, guitarras y personajes a medida que progresa en el modo carrera. La historia sigue el viaje de un guitarrista que, tras unirse a una banda, se enfrenta a leyendas del rock como Tom Morello y Slash, y es retado hasta el infierno para convertirse en una leyenda del rock."
    },
    {
        id: 7,
        nombre: "Sonic",
        categoria: "juegos",
        precio: 29990,
        imagen: "img/sonic.jpg",
        descripcion: "Un erizo azul supersónico llamado Sonic debe frustrar los planes del científico loco Doctor Robotnik en la Isla Sur. Robotnik ha capturado a los animales de la isla y los ha convertido en robots, además de intentar robar las seis Esmeraldas del Caos para dominar el mundo. Sonic recorre diversas zonas de la isla, rescatando animales, recolectando anillos y enfrentándose a los robots y a Robotnik para restaurar la paz."
    },
    {
        id: 8,
        nombre: "Super Mario Bros U Deluxe",
        categoria: "juegos",
        precio: 14990,
        imagen: "img/super_mario.jpg",
        descripcion: "Se centra en los hermanos Mario y Luigi, fontaneros del Reino Champiñón, que deben rescatar a la Princesa Peach y a su reino del malvado Rey Koopa (Bowser). Bowser ha invadido el reino, transformando a sus habitantes en piedras y ladrillos mediante magia negra, y solo la Princesa Peach puede revertir el hechizo."
    }
];

// Función para mostrar productos
function mostrarProductos(productosMostrar = productos) {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (productosMostrar.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No se encontraron productos.</p>';
        return;
    }
    
    productosMostrar.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-price">$${producto.precio.toLocaleString('es-CL')} CLP</p>
                <button class="add-to-cart" data-id="${producto.id}">Añadir al Carrito</button>
                <a href="detalle-producto.html?id=${producto.id}" class="btn-details">Ver Detalles</a>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Agregar eventos a los botones de carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            agregarAlCarrito(productId);
        });
    });
}

// Función para filtrar productos
function filtrarProductos() {
    const categoria = document.getElementById('categoria-filter').value;
    const searchText = document.getElementById('search').value.toLowerCase();
    
    let productosFiltrados = productos;
    
    // Filtrar por categoría
    if (categoria) {
        productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoria);
    }
    
    // Filtrar por texto de búsqueda
    if (searchText) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.nombre.toLowerCase().includes(searchText) || 
            producto.descripcion.toLowerCase().includes(searchText)
        );
    }
    
    mostrarProductos(productosFiltrados);
}

// Función para agregar producto al carrito
function agregarAlCarrito(productId) {
    const producto = productos.find(p => p.id === productId);
    
    if (!producto) return;
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === productId);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    // Mostrar mensaje de confirmación
    alert(`¡${producto.nombre} añadido al carrito!`);
}

// Función para actualizar contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    document.querySelectorAll('#cart-count').forEach(element => {
        element.textContent = totalItems;
    });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar todos los productos al cargar la página
    mostrarProductos();
    actualizarContadorCarrito();
    
    // Agregar eventos a los filtros
    const categoriaFilter = document.getElementById('categoria-filter');
    const searchInput = document.getElementById('search');
    
    if (categoriaFilter) {
        categoriaFilter.addEventListener('change', filtrarProductos);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filtrarProductos);
    }
});

