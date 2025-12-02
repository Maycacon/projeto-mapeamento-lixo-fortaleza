// backend/src/server.js

const express = require('express');
const cors = require('cors'); // <--- 1. NOVO: Importar a biblioteca CORS
const bodyParser = require('body-parser'); 
require('dotenv').config(); 

// Importa o módulo de conexão com o banco de dados para garantir que a conexão seja feita
const db = require('./config/db'); 

// Importa as rotas (URLs) que o backend irá responder
const authRoutes = require('./routes/auth.routes'); 
const reportRoutes = require('./routes/reports.routes'); // Corrigido para incluir a rota de reports

// 1. Inicializa o aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000;

// =========================================================
// 2. Middlewares essenciais
// =========================================================

// CORREÇÃO CORS: Permite que o Frontend do Vercel acesse a API do Render.
app.use(cors({
    origin: '*', // Permite todas as origens (ideal para o deploy de entrega)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Configura o Express para aceitar requisições com corpo JSON
app.use(bodyParser.json()); 
app.use(express.json());

// =========================================================
// 3. Rotas da API
// =========================================================

// O ponto de entrada principal será /api/
app.use('/api/auth', authRoutes); 
app.use('/api/reports', reportRoutes); // Rotas de Reports ativadas

// 4. Rota de Teste Simples (Health Check)
app.get('/', (req, res) => {
    res.send('API do Mapeamento Inteligente de Resíduos Urbanos (MIRU) está funcionando!');
});

// 5. Tratamento de Erro Global (Requisito 5: Implementar tratamento de erros [cite: 27])
// Middleware para lidar com erros não capturados
app.use((err, req, res, next) => {
    console.error(err.stack);
    // Erros internos do servidor
    res.status(500).send({ message: 'Erro interno do servidor.', error: err.message });
});


// 6. Inicializa o Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    // A conexão com o banco de dados é testada automaticamente no módulo db.js ao ser importado.
});