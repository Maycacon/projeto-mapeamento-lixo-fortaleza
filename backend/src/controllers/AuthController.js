// backend/src/controllers/AuthController.js

const db = require('../config/db'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// Constante para o 'salt' (nível de complexidade do hash)
const SALT_ROUNDS = 10; 

// Chave secreta para gerar o JWT (DEVE VIR DO ARQUIVO .env!)
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_padrao'; 

/**
 * Registra um novo usuário (cidadão) no sistema.
 */
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos os campos (nome, email, senha) são obrigatórios." });
    }

    try {
        const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(409).json({ message: "Email já cadastrado." });
        }

        // Hash da Senha
        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await db.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, email, role',
            [name, email, password_hash, 'citizen']
        );

        return res.status(201).json({ 
            message: "Usuário registrado com sucesso!",
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error("Erro no registro de usuário:", error);
        return res.status(500).json({ message: "Erro interno do servidor ao registrar usuário." });
    }
};

/**
 * Autentica o usuário e emite um Token JWT.
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // 1. Validação
    if (!email || !password) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    try {
        // 2. Buscar o usuário pelo email
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            // Se o email não existir, retorna erro de credenciais inválidas
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // 3. Comparar a senha fornecida com o hash salvo
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            // Se a senha não bater, retorna erro de credenciais inválidas
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // 4. Gerar o Token JWT
        // Incluímos o ID do usuário e a função ('role') no payload do token
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: '1d' } // Token expira em 1 dia
        );

        // 5. Resposta de sucesso (sem o hash da senha!)
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Erro no login de usuário:", error);
        return res.status(500).json({ message: "Erro interno do servidor ao realizar login." });
    }
};