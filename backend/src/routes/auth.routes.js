// backend/src/routes/auth.routes.js

const express = require('express');
const router = express.Router();
// Importa o Controller que contém as funções register e login
const AuthController = require('../controllers/AuthController'); 

// Rota POST para registrar um novo usuário
// Endpoint final: /api/auth/register
router.post('/register', AuthController.register);

// Rota POST para autenticar um usuário
// Endpoint final: /api/auth/login
router.post('/login', AuthController.login);

// Exporta o router para ser usado no server.js
module.exports = router;