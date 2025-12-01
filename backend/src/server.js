// backend/src/server.js

const express = require('express');
const bodyParser = require('body-parser'); // Para lidar com dados JSON nas requisições
require('dotenv').config(); // Carrega as variáveis do .env

// Importa o módulo de conexão com o banco de dados para garantir que a conexão seja feita
const db = require('./config/db'); 

// Importa as rotas (URLs) que o backend irá responder
const authRoutes = require('./routes/auth.routes'); 
// const reportRoutes = require('./routes/report.routes'); // [A SER CRIADA NA PRÓXIMA FASE]

// 1. Inicializa o aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares essenciais
// Configura o Express para aceitar requisições com corpo JSON
app.use(bodyParser.json()); 
app.use(express.json());

// 3. Rotas da API
// O ponto de entrada principal será /api/
app.use('/api/auth', authRoutes); 
// app.use('/api/reports', reportRoutes); // [A SER ATIVADA NA PRÓXIMA FASE]

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