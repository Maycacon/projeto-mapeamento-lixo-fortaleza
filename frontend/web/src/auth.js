// frontend/web/src/auth.js

import { loginUser, registerUser } from './api.js';

// ----------------------------------------------------
// 1. Lógica do Login (index.html)
// ----------------------------------------------------

export function setupLoginForm() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const alertDiv = document.getElementById('alertMessage');
            alertDiv.className = 'alert d-none mt-3';

            try {
                await loginUser(email, password); 
                window.location.href = 'reports.html'; 
            } catch (error) {
                alertDiv.className = 'alert alert-danger mt-3';
                alertDiv.textContent = error.message || 'Falha ao realizar login.';
            }
        });
    }
}

// ----------------------------------------------------
// 2. Lógica do Registro (register.html)
// ----------------------------------------------------

export function setupRegisterForm() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const alertDiv = document.getElementById('alertMessage');
            alertDiv.className = 'alert d-none mt-3';

            try {
                await registerUser(name, email, password); 
                alertDiv.className = 'alert alert-success mt-3';
                alertDiv.textContent = 'Cadastro realizado com sucesso! Redirecionando...';
                
                setTimeout(() => {
                    window.location.href = 'index.html'; 
                }, 2000);
            } catch (error) {
                alertDiv.className = 'alert alert-danger mt-3';
                alertDiv.textContent = error.message || 'Falha ao realizar o cadastro.';
            }
        });
    }
}