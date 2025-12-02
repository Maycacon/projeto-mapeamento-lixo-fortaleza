// backend/src/config/db.js (Configuração FINAL e CORRETA para RENDER)

const { Pool } = require('pg');
require('dotenv').config(); 

// Determina a configuração de conexão
const pool = new Pool({
    // Se NODE_ENV for 'production', usa a string de conexão completa (DATABASE_URL) fornecida pelo Render.
    // Caso contrário, usa as variáveis locais (DB_USER, DB_HOST, etc.) para o ambiente de desenvolvimento.
    connectionString: process.env.NODE_ENV === 'production' 
        ? process.env.DATABASE_URL 
        : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    
    // Configuração SSL é obrigatória para o Render (conexão segura)
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// ------------------------------------------------------------------
// LÓGICA DE DEBUG
// ------------------------------------------------------------------

// Evento disparado quando a conexão é estabelecida
pool.on('connect', () => {
    console.log('✅ Conexão com o PostgreSQL bem-sucedida!');
});

// Evento disparado quando há uma falha de conexão (ex: senha ou credencial errada)
pool.on('error', (err) => {
    console.error('❌ ERRO CRÍTICO DE CONEXÃO COM O BANCO:', err.message);
});

// Exporta o pool para que os controllers possam executar queries
module.exports = {
    query: (text, params) => pool.query(text, params),
};