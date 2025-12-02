// backend/src/routes/reports.routes.js

const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');
const authMiddleware = require('../middlewares/auth.middleware');

// Rotas de Reports (TODAS PROTEGIDAS)

// POST: Cria uma nova denúncia
router.post('/', authMiddleware.verifyToken, ReportController.createReport);

// GET: Lista todas as denúncias
router.get('/', authMiddleware.verifyToken, ReportController.listReports);

// NOTA: As funções createReport e listReports estão no ReportController.js

module.exports = router;