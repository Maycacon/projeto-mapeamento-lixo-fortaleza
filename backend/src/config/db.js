// backend/src/config/db.js (Configuração FINAL e CORRETA para RENDER)

const { Pool } = require('pg');
require('dotenv').config(); 

// A variável DATABASE_URL é fornecida automaticamente pelo Render.
// Em ambiente local, usaremos a conexão padrão que falhou.
// Em ambiente de produção (Render), usaremos a DATABASE_URL.

const pool = new Pool({
    // Verifica se estamos em produção e usa a string de conexão completa
    // fornecida pelo Render. Caso contrário, usa as variáveis locais (para o DB_USER, etc).
    connectionString: process.env.NODE_ENV === 'production' 
        ? process.env.DATABASE_URL 
        : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        
    // Configuração SSL é obrigatória para o Render (conexão segura)
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// ------------------------------------------------------------------
// LÓGICA DE DEBUG
// ------------------------------------------------------------------

pool.on('connect', () => {
    console.log('✅ Conexão com o PostgreSQL bem-sucedida!');
});

pool.on('error', (err) => {
    console.error('❌ ERRO CRÍTICO DE CONEXÃO COM O BANCO:', err.message);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};