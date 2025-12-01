// frontend/web/src/api.js

const API_BASE_URL = 'http://localhost:3000/api'; 
const TOKEN_KEY = 'userToken';
const USER_NAME_KEY = 'userName';

// Função principal de comunicação com a API
async function callApi(endpoint, method = 'GET', data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // Adiciona o token JWT para rotas protegidas
            'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}` 
        },
        body: data ? JSON.stringify(data) : null,
    };

    try {
        const response = await fetch(url, config);
        const result = await response.json();

        if (!response.ok) {
            // Tratamento de Erros: Requisito Obrigatório 5 [cite: 27]
            throw new Error(result.message || 'Erro de rede ou na API.');
        }

        return result;

    } catch (error) {
        console.error('Erro de Integração:', error.message);
        throw error;
    }
}

// ----------------------------------------------------
// FASE 1: Autenticação
// ----------------------------------------------------

export async function loginUser(email, password) {
    const response = await callApi('/auth/login', 'POST', { email, password });
    localStorage.setItem(TOKEN_KEY, response.token);
    // Salva o nome do usuário para exibição na página principal
    localStorage.setItem(USER_NAME_KEY, response.user.name); 
    return response.user;
}

export async function registerUser(name, email, password) {
    return callApi('/auth/register', 'POST', { name, email, password });
}

export function logoutUser() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    window.location.href = 'index.html'; 
}

// ----------------------------------------------------
// FASE 2: Reports (Core do Mapeamento)
// ----------------------------------------------------
export async function createReport(reportData) {
    return callApi('/reports', 'POST', reportData);
}

export async function listReports() {
    return callApi('/reports', 'GET');
}