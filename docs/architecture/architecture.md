# 🏗️ Arquitetura Final Implementada - MIRU

## 1. Visão Geral
O sistema opera sob uma arquitetura Cliente-Servidor. O Frontend Web e Mobile se comunica com o Backend monolítico via APIs RESTful. O sistema está implantado e acessível publicamente.

## 2. Componentes e Tecnologias
* **Frontend (Web/Mobile):** HTML, CSS (Bootstrap), JavaScript Puro (Web) e React Native (Mobile).
* **Backend (API):** Node.js com Express.
* **Banco de Dados:** PostgreSQL com a extensão PostGIS para a manipulação de dados geoespaciais (latitude e longitude das denúncias).
* **Autenticação:** Token JWT (JSON Web Token) e Middleware de verificação.

## 3. Fluxo de Dados Geolocalizados (PostGIS)
O sistema utiliza PostGIS para salvar a localização das denúncias na coluna `location` do tipo `GEOMETRY`. A conversão de PostGIS para Lat/Long ocorre na API (`ReportController`) antes de enviar os dados para o Frontend.