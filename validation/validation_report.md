# 📝 Relatório de Validação com Público-Alvo

Este relatório detalha o processo de validação das funcionalidades implementadas do sistema MIRU (Mapeamento Inteligente de Resíduos Urbanos) junto ao público-alvo prioritário.

---

### 1. Identificação Específica do Público-Alvo

* **Entidade Validada:** Cooperativa de Catadores do Jangurussu.
* **Localização:** Bairro Jangurussu, Fortaleza - Ceará.
* **Contexto e Necessidades:** Utilização do mapa de Reports para otimizar a coleta e identificar a natureza do lixo (reciclável/orgânico).

---

### 2. Registro da Validação e Apresentação

* **Data da Apresentação:** 28/11/2025
* **Participantes do Grupo:** AMANDA ALVES ELOI, ESTHER DE SOUZA RAMALHO, MARCOS AURÉLIO SOUSA DE CARVALHO, MAYCON BARROSO ANDRADE.
* **Representante da Cooperativa:** Sr. Ricardo Moura, Coordenador de Logística.
* **Método de Apresentação:** Demonstração interativa do Frontend Web (reports.html) em notebook, com simulação de criação de denúncia em tempo real.
* **Evidências de Contato:** O registro fotográfico/vídeo da reunião e o termo de autorização foram salvos na pasta **`validation/evidence/`**.

---

### 3. Funcionalidades Essenciais Validadas

As funcionalidades centrais testadas com o público-alvo foram:

1.  **Registro de Denúncia (PostGIS):** A clareza dos campos de título e a captura automática da Lat/Long foram consideradas vitais para a precisão das ações de coleta.
2.  **Visualização no Mapa (Leaflet):** A usabilidade do mapa e a visualização rápida da localização dos Reports foram aprovadas como ferramentas de planejamento logístico.
3.  **Fluxo de Notificação:** Foi validada a utilidade de receber informações em tempo real sobre novos Reports.

---

### 4. Análise e Documentação do Feedback

O feedback foi coletado e documentado na pasta **`validation/feedback/`**.

* **Pontos Positivos (Eficiência):** A ferramenta é altamente relevante para o ODS 11, pois direciona recursos de forma inteligente. A precisão do GPS (PostGIS) é vital para evitar viagens desnecessárias e economizar combustível.
* **Sugestões de Melhoria (Ajustes):**
    1.  Adicionar um campo de "Tipo de Resíduo" (ex: Reciclável, Orgânico, Misto) no formulário de denúncia.
    2.  Implementar um filtro de Status no mapa (Aguardando Coleta, Em Rota, Resolvido) para gerenciar melhor as tarefas.

---

### 5. Plano de Implementação Pós-Validação

Os seguintes ajustes serão implementados (ou considerados para a próxima fase do projeto) com base no feedback:

1.  **Adição de Campo de Tipo de Resíduo:** Será adicionado um campo *dropdown* ao formulário de Report para classificar o tipo de lixo.
2.  **Filtro de Status no Mapa:** Implementação de uma funcionalidade de filtro na listagem de Reports para visualizar apenas os pontos com status 'pending' (aguardando ação).
3.  **Melhoria na Identificação:** Serão usadas cores ou ícones diferentes no mapa para os Reports em status 'pending' e 'resolved', facilitando a visualização.

---
