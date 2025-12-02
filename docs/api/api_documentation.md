# 🔌 Documentação da API RESTful - MIRU

## Base URL (Exemplo de Produção)
`https://fortaleza.vercel.app/api/`

## 1. Autenticação
* **Endpoint:** `POST /auth/login`
* **Retorno:** Objeto contendo o Token JWT (JSON Web Token) e dados básicos do usuário.

## 2. Denúncias (Reports)
* **Endpoint:** `POST /reports` (Protegida por Token)
* **Função:** Cria uma nova denúncia, inserindo coordenadas no formato GEOMETRY(Point, 4326) no banco de dados.
* **Endpoint:** `GET /reports` (Protegida por Token)
* **Função:** Lista todas as denúncias, convertendo dados PostGIS de volta para Lat/Long para exibição no mapa.