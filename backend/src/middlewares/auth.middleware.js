// backend/src/middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');

// Chave secreta para verificar o JWT (DEVE VIR DO ARQUIVO .env!)
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_padrao'; 

/**
 * Middleware para verificar se o usuário está autenticado via Token JWT.
 * Ele será usado em todas as rotas protegidas (como as de Report).
 */
exports.verifyToken = (req, res, next) => {
    // 1. Tentar pegar o token do cabeçalho 'Authorization'
    // O formato esperado é: 'Bearer [TOKEN_JWT]'
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // Se o cabeçalho não existir, nega o acesso
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // Pega apenas o token (ignora 'Bearer ')
    const token = authHeader.split(' ')[1]; 
    
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Formato de token inválido.' });
    }

    try {
        // 2. Verificar o token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. Anexar os dados do usuário (id e role) na requisição
        // Isso é crucial! Os controllers podem saber quem está fazendo a requisição.
        req.user = decoded; 
        
        // 4. Se tudo OK, passa para o próximo middleware ou controller
        next(); 

    } catch (err) {
        // Se o token for inválido ou expirou
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};

/**
 * Middleware para verificar se o usuário é Administrador.
 * [OPCIONAL, PODE SER ÚTIL PARA ROTAS DE GESTÃO]
 */
exports.isAdmin = (req, res, next) => {
    // Verifica se o usuário autenticado tem a role 'admin'
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
    }
};