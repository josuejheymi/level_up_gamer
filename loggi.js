// Almacenamiento de usuarios
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Elementos del DOM
        const emailInput = document.getElementById('email');
        const fechaNacimientoInput = document.getElementById('fechaNacimiento');
        const emailValidation = document.getElementById('emailValidation');
        const edadValidation = document.getElementById('edadValidation');
        const registroForm = document.getElementById('registroForm');
        
        // Validar email en tiempo real
        emailInput.addEventListener('blur', function() {
            const email = this.value.toLowerCase();
            
            if (email.includes('@duocuc.cl') || email.includes('@duoc.cl')) {
                emailValidation.innerHTML = '<div class="success">¡Felicidades! Obtienes un 20% de descuento permanente. <span class="discount-badge">20% OFF</span></div>';
            } else if (email) {
                emailValidation.innerHTML = '<div class="info">Correo válido. Los correos @duocuc.cl y @duoc.cl obtienen 20% de descuento.</div>';
            } else {
                emailValidation.innerHTML = '';
            }
        });
        
        // Validar edad en tiempo real
        fechaNacimientoInput.addEventListener('change', function() {
            const fechaNacimiento = new Date(this.value);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mes = hoy.getMonth() - fechaNacimiento.getMonth();
            
            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }
            
            if (edad < 18) {
                edadValidation.innerHTML = '<div class="error">Debes ser mayor de 18 años para registrarte.</div>';
            } else {
                edadValidation.innerHTML = '<div class="success">Edad válida.</div>';
            }
        });
        
        // Manejar el envío del formulario
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
            
            // Validar edad nuevamente
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mes = hoy.getMonth() - fechaNacimiento.getMonth();
            
            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }
            
            if (edad < 18) {
                alert('Debes ser mayor de 18 años para registrarte.');
                return;
            }
            
            // Verificar si el usuario ya existe
            if (usuarios.some(usuario => usuario.email === email)) {
                alert('Este correo electrónico ya está registrado.');
                return;
            }
            
            // Aplicar descuento para correos DuocUC
            const tieneDescuento = email.toLowerCase().includes('@duocuc.cl') || email.toLowerCase().includes('@duoc.cl');
            
            // Crear nuevo usuario
            const nuevoUsuario = {
                nombre,
                email,
                password,
                fechaNacimiento: fechaNacimiento.toISOString(),
                tieneDescuento,
                preferencias: ''
            };
            
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            window.location.href = 'level_up.html';
        });
        
        // Menú hamburguesa para móviles
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        // Cerrar el menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        }));