// Validación para formulario de registro
function validarRegistro(event) {
    event.preventDefault();
    let esValido = true;
    
    // Validar RUN
    const run = document.getElementById('run').value.trim();
    const runError = document.getElementById('run-error');
    if (!run) {
        runError.textContent = 'El RUN es requerido';
        runError.style.display = 'block';
        esValido = false;
    } else if (run.length < 7 || run.length > 9) {
        runError.textContent = 'El RUN debe tener entre 7 y 9 caracteres';
        runError.style.display = 'block';
        esValido = false;
    } else if (!validarRunChileno(run)) {
        runError.textContent = 'El RUN no es válido';
        runError.style.display = 'block';
        esValido = false;
    } else {
        runError.style.display = 'none';
    }
    
    // Validar nombre
    const nombre = document.getElementById('nombre').value.trim();
    const nombreError = document.getElementById('nombre-error');
    if (!nombre) {
        nombreError.textContent = 'El nombre es requerido';
        nombreError.style.display = 'block';
        esValido = false;
    } else if (nombre.length > 50) {
        nombreError.textContent = 'El nombre no puede tener más de 50 caracteres';
        nombreError.style.display = 'block';
        esValido = false;
    } else {
        nombreError.style.display = 'none';
    }
    
    // Validar apellidos
    const apellidos = document.getElementById('apellidos').value.trim();
    const apellidosError = document.getElementById('apellidos-error');
    if (!apellidos) {
        apellidosError.textContent = 'Los apellidos son requeridos';
        apellidosError.style.display = 'block';
        esValido = false;
    } else if (apellidos.length > 100) {
        apellidosError.textContent = 'Los apellidos no pueden tener más de 100 caracteres';
        apellidosError.style.display = 'block';
        esValido = false;
    } else {
        apellidosError.style.display = 'none';
    }
    
    // Validar email
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
    
    if (!email) {
        emailError.textContent = 'El email es requerido';
        emailError.style.display = 'block';
        esValido = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'El formato del email no es válido';
        emailError.style.display = 'block';
        esValido = false;
    } else if (email.length > 100) {
        emailError.textContent = 'El email no puede tener más de 100 caracteres';
        emailError.style.display = 'block';
        esValido = false;
    } else {
        const dominio = email.split('@')[1];
        if (!dominiosPermitidos.includes(dominio)) {
            emailError.textContent = 'Solo se permiten correos de @duoc.cl, @profesor.duoc.cl y @gmail.com';
            emailError.style.display = 'block';
            esValido = false;
        } else {
            emailError.style.display = 'none';
        }
    }
    
    // Validar fecha de nacimiento (opcional)
    const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
    const fechaError = document.getElementById('fecha-error');
    if (fechaNacimiento) {
        const fechaNac = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        
        if (edad < 18) {
            fechaError.textContent = 'Debes ser mayor de 18 años para registrarte';
            fechaError.style.display = 'block';
            esValido = false;
        } else {
            fechaError.style.display = 'none';
        }
    }
    
    // Validar dirección
    const direccion = document.getElementById('direccion').value.trim();
    const direccionError = document.getElementById('direccion-error');
    if (!direccion) {
        direccionError.textContent = 'La dirección es requerida';
        direccionError.style.display = 'block';
        esValido = false;
    } else if (direccion.length > 300) {
        direccionError.textContent = 'La dirección no puede tener más de 300 caracteres';
        direccionError.style.display = 'block';
        esValido = false;
    } else {
        direccionError.style.display = 'none';
    }
    
    if (esValido) {
        alert('Registro exitoso. Serás redirigido a la página de inicio.');
        // Aquí normalmente enviarías los datos al servidor
        window.location.href = 'index.html';
    }
}

// Validar RUN chileno (simplificado)
function validarRunChileno(run) {
    // Eliminar puntos y guión si existen
    run = run.replace(/\./g, '').replace(/-/g, '');
    
    // El RUN debe tener entre 7 y 8 dígitos más el dígito verificador
    if (run.length < 8 || run.length > 9) return false;
    
    // Separar el cuerpo del dígito verificador
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toUpperCase();
    
    // Calcular el dígito verificador esperado
    let suma = 0;
    let multiplo = 2;
    
    for (let i = 1; i <= cuerpo.length; i++) {
        const index = multiplo * parseInt(run.charAt(cuerpo.length - i));
        suma += index;
        if (multiplo < 7) {
            multiplo += 1;
        } else {
            multiplo = 2;
        }
    }
    
    const dvEsperado = 11 - (suma % 11);
    let dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    
    return dvCalculado === dv;
}

// Validación para formulario de contacto
function validarContacto(event) {
    event.preventDefault();
    let esValido = true;
    
    // Validar nombre
    const nombre = document.getElementById('nombre').value.trim();
    const nombreError = document.getElementById('nombre-error');
    if (!nombre) {
        nombreError.textContent = 'El nombre es requerido';
        nombreError.style.display = 'block';
        esValido = false;
    } else {
        nombreError.style.display = 'none';
    }
    
    // Validar email
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        emailError.textContent = 'El email es requerido';
        emailError.style.display = 'block';
        esValido = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'El formato del email no es válido';
        emailError.style.display = 'block';
        esValido = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Validar teléfono
    const telefono = document.getElementById('telefono').value.trim();
    const telefonoError = document.getElementById('telefono-error');
    const telefonoRegex = /^\+56 9 \d{4} \d{4}$/;
    
    if (!telefono) {
        telefonoError.textContent = 'El teléfono es requerido';
        telefonoError.style.display = 'block';
        esValido = false;
    } else if (!telefonoRegex.test(telefono)) {
        telefonoError.textContent = 'El formato debe ser: +56 9 1234 5678';
        telefonoError.style.display = 'block';
        esValido = false;
    } else {
        telefonoError.style.display = 'none';
    }
    
    // Validar mensaje
    const mensaje = document.getElementById('mensaje').value.trim();
    const mensajeError = document.getElementById('mensaje-error');
    if (!mensaje) {
        mensajeError.textContent = 'El mensaje es requerido';
        mensajeError.style.display = 'block';
        esValido = false;
    } else if (mensaje.length > 500) {
        mensajeError.textContent = 'El mensaje no puede tener más de 500 caracteres';
        mensajeError.style.display = 'block';
        esValido = false;
    } else {
        mensajeError.style.display = 'none';
    }
    
    if (esValido) {
        alert('Mensaje enviado correctamente. Te contactaremos pronto.');
        // Aquí normalmente enviarías los datos al servidor
        document.getElementById('contacto-form').reset();
    }
}

// Validación para formulario de login
function validarLogin(event) {
    event.preventDefault();
    let esValido = true;
    
    // Validar email
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('email-error');
    if (!email) {
        emailError.textContent = 'El email es requerido';
        emailError.style.display = 'block';
        esValido = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Validar contraseña
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('password-error');
    if (!password) {
        passwordError.textContent = 'La contraseña es requerida';
        passwordError.style.display = 'block';
        esValido = false;
    } else if (password.length < 6) {
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
        passwordError.style.display = 'block';
        esValido = false;
    } else {
        passwordError.style.display = 'none';
    }
    
    if (esValido) {
        // Aquí normalmente verificarías las credenciales con el servidor
        alert('Inicio de sesión exitoso.');
        window.location.href = 'index.html';
    }
}

// Formatear teléfono mientras se escribe
function formatearTelefono(input) {
    // Eliminar todo excepto números
    let value = input.value.replace(/\D/g, '');
    
    // Aplicar formato +56 9 1234 5678
    if (value.length > 0) {
        value = '+56 ' + value;
    }
    if (value.length > 6) {
        value = value.substring(0, 6) + ' ' + value.substring(6);
    }
    if (value.length > 11) {
        value = value.substring(0, 11) + ' ' + value.substring(11);
    }
    
    input.value = value;
}

// Inicializar eventos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Asignar eventos a formularios si existen
    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        registroForm.addEventListener('submit', validarRegistro);
    }
    
    const contactoForm = document.getElementById('contacto-form');
    if (contactoForm) {
        contactoForm.addEventListener('submit', validarContacto);
        
        // Formatear teléfono mientras se escribe
        const telefonoInput = document.getElementById('telefono');
        if (telefonoInput) {
            telefonoInput.addEventListener('input', function() {
                formatearTelefono(this);
            });
        }
    }
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', validarLogin);
    }
});