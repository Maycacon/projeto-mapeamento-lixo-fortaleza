-- backend/database/schema.sql

-- Habilita a extensão PostGIS para dados geoespaciais (requisito do projeto)
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tabela: User (Usuários do sistema)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Armazena o hash da senha
    role VARCHAR(50) DEFAULT 'citizen' NOT NULL, -- Ex: 'citizen', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Report (Denúncias de descarte irregular)
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    -- Coluna para a localização geográfica (usando PostGIS)
    -- SRID 4326 é o padrão WGS84 (latitude/longitude)
    location GEOMETRY(Point, 4326) NOT NULL, 
    photo_url VARCHAR(255) NOT NULL, -- URL para a foto da denúncia
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- Ex: 'pending', 'resolved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice espacial para otimizar consultas de localização
CREATE INDEX reports_gix ON reports USING GIST (location);