// backend/src/config/db.js

const { Pool } = require('pg');
require('dotenv').config(); 

// Configurações de Conexão com o PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD, // Lerá a senha do .env
    port: process.env.DB_PORT || 5432,
    // Configuração para produção (se o deploy for feito em um serviço como Heroku)
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// ------------------------------------------------------------------
// LÓGICA DE DEBUG: EXIBE ERRO OU SUCESSO NO CONSOLE
// ------------------------------------------------------------------

// Evento disparado quando a conexão é estabelecida
pool.on('connect', () => {
    console.log('✅ Conexão com o PostgreSQL bem-sucedida!');
});

// Evento disparado quando há uma falha de conexão (ex: senha ou credencial errada)
pool.on('error', (err) => {
    // ESTA MENSAGEM IRÁ APARECER NO TERMINAL SE A CONEXÃO FALHAR.
    console.error('❌ ERRO CRÍTICO DE CONEXÃO COM O BANCO:', err.message);
    // Removemos o 'process.exit(-1)' para que o servidor Node.js continue rodando,
    // mas sabemos que a API NÃO VAI FUNCIONAR enquanto este erro for exibido.
});

// Exporta o pool para que os controllers possam executar queries
module.exports = {
    query: (text, params) => pool.query(text, params),
};