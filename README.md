# 🗺️ Mapeamento Inteligente de Resíduos em Fortaleza (ODS 11)

## 1. Título e Descrição do Projeto

* **Nome do Sistema:** Mapeamento Inteligente de Resíduos Urbanos (MIRU)
* **Problema Solucionado:** O descarte irregular de lixo e a falta de monitoramento eficiente dos pontos críticos de descarte em Fortaleza. 
* **Propósito:** Desenvolver um sistema multiplataforma para o mapeamento e monitoramento de pontos de descarte irregular de lixo em Fortaleza, promovendo o engajamento comunitário e auxiliando a gestão ambiental urbana.

## 2. Funcionalidades Implementadas

| Funcionalidade | Descrição | Status de Implementação |
| :--- | :--- | :--- |
| **Registro de Denúncias** | Cidadãos podem registrar denúncias com fotos e localização.  | *FEITO* |
| **Visualização em Mapa** | Exibição geoespacial dos pontos de descarte para monitoramento. | *FEITO* |
| **Login/Autenticação** | Gerenciamento de usuários (`User`) e acesso seguro ao sistema.  | *FEITO* |
| **Gestão de Reports** | Funcionalidade para o backend gerenciar e atualizar o status dos reports (`Report`).  | *FEITO* |

_(Nota: As capturas de tela das telas principais e o status final de implementação serão adicionados após a conclusão do Frontend.)_

## 3. Tecnologias Utilizadas 

| Camada | Tecnologia | Detalhe |
| :--- | :--- | :--- |
| **Frontend** | React e React Native | Desenvolvimento web e mobile. |
| **Backend** | Node.js com Express | APIs RESTful para comunicação. |
| **Banco de Dados** | PostgreSQL com PostGIS | Armazenamento de dados e funcionalidades geoespaciais. |

## 4. Arquitetura do Sistema 

O sistema segue a arquitetura **cliente-servidor**. 

* **Componentes Principais:** Frontend (React/React Native), Backend (Node.js/Express) e Banco de Dados (PostgreSQL/PostGIS).
* **Integrações:** Comunicação via APIs RESTful entre o Frontend e o Backend. 
* **Modelo de Dados:** Duas entidades principais: `User` e `Report`, com relacionamento 1:N. 

## 5. Instruções de Instalação e Execução 

### 5.1 Pré-requisitos

* Node.js
* PostgreSQL e extensão PostGIS instalados
* Gerenciador de pacotes Yarn ou NPM
* Dispositivo ou emulador para testes mobile (para o React Native)

### 5.2 Passo a Passo para Instalação

```bash
# 1. Clonar o repositório
git clone [https://github.com/Maycon/projeto-mapeamento-lixo-fortaleza.git](https://github.com/Maycon/projeto-mapeamento-lixo-fortaleza.git)
cd projeto-mapeamento-lixo-fortaleza

# 2. Configurar o Backend
cd backend
# npm start

# 3. Configurar o Frontend
cd frontend
# live server
