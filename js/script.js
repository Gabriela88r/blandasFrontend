// URL base del backend
const API = 'http://localhost:5000/api/auth';

// ===== REGISTRO =====
const formRegistro = document.getElementById('formRegistro');
if (formRegistro) {
    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!nombre || !email || !password) {
                alert('⚠️ Todos los campos son obligatorios.');
                return;
            }

            console.log('📡 Enviando datos al backend...');
            const res = await fetch(`${API}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });

            // Si el backend no responde con JSON, evita error
            let data;
            try {
                data = await res.json();
            } catch (err) {
                alert('⚠️ Error al interpretar la respuesta del servidor.');
                console.error(err);
                return;
            }

            alert(`📩 Respuesta del servidor: ${data.msg || 'Sin mensaje'}`);

            if (res.ok) {
                alert('✅ Registro exitoso. Redirigiendo al login...');
                window.location.href = '/html/login.html';
            } else {
                alert('❌ Error en el registro. Verifica tus datos.');
            }

        } catch (err) {
            alert('🚨 Error al conectar con el servidor. Revisa la consola.');
            console.error('Error de red o backend:', err);
        }
    });
}

// ===== LOGIN =====
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!email || !password) {
                alert('⚠️ Completa todos los campos.');
                return;
            }

            console.log('📡 Enviando login...');
            const res = await fetch(`${API}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            let data;
            try {
                data = await res.json();
            } catch (err) {
                alert('⚠️ Error al interpretar la respuesta del servidor.');
                console.error(err);
                return;
            }

            alert(`📩 Respuesta del servidor: ${data.msg || 'Sin mensaje'}`);

            if (res.ok) {
                alert('✅ Login exitoso. Redirigiendo...');
                window.location.href = '/html/principal.html';
            } else {
                alert('❌ Credenciales incorrectas.');
            }

        } catch (err) {
            alert('🚨 Error al conectar con el servidor. Revisa la consola.');
            console.error('Error de red o backend:', err);
        }
    });
}
