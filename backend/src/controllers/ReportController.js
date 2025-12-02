// backend/src/controllers/ReportController.js

const db = require('../config/db'); 

/**
 * Cria uma nova denúncia de lixo.
 * Requer Autenticação (req.user é injetado pelo middleware)
 */
exports.createReport = async (req, res) => {
    // ID do usuário logado é pego do Token JWT
    const user_id = req.user.id; 
    
    // Recebe dados do frontend
    const { title, description, latitude, longitude, photo_url } = req.body;

    // 1. Validação básica (Requisito 5)
    if (!title || !latitude || !longitude || !photo_url) {
        return res.status(400).json({ message: "Título, foto e localização são obrigatórios." });
    }

    try {
        // 2. Manipulação PostGIS: Converte Lat/Long em um ponto geográfico
        const location_wkt = `POINT(${longitude} ${latitude})`; 
        
        // Query de inserção
        const newReport = await db.query(
            `INSERT INTO reports (user_id, title, description, location, photo_url, status)
             VALUES ($1, $2, $3, ST_SetSRID(ST_GeomFromText($4), 4326), $5, 'pending')
             RETURNING id, title, created_at, status`,
            [user_id, title, description, location_wkt, photo_url]
        );

        return res.status(201).json({ 
            message: "Denúncia registrada com sucesso!",
            report: newReport.rows[0]
        });

    } catch (error) {
        console.error("Erro ao criar denúncia:", error);
        return res.status(500).json({ message: "Erro interno do servidor ao registrar denúncia." });
    }
};

/**
 * Lista todas as denúncias, convertendo o dado PostGIS para Lat/Long.
 */
exports.listReports = async (req, res) => {
    try {
        // Consulta que seleciona os reports E extrai as coordenadas X (longitude) e Y (latitude)
        const reportsResult = await db.query(
            `SELECT 
                id, title, description, photo_url, status, created_at,
                ST_X(location::geometry) AS longitude,
                ST_Y(location::geometry) AS latitude
            FROM reports
            ORDER BY created_at DESC`
        );

        return res.status(200).json(reportsResult.rows);

    } catch (error) {
        console.error("Erro ao listar denúncias:", error);
        return res.status(500).json({ message: "Erro interno do servidor ao listar denúncias." });
    }
};