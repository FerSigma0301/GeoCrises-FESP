# Architecture: GeoCrisis

## Directory Structure
- `client/src/game/`
  - `scene.ts`: Criação da cena Babylon.js com globo tático 3D, atmosfera, rotação e pinos de crise.
  - `GlobeManager.ts`: Gerencia os marcadores no globo terrestre em coordenadas esféricas (latitude/longitude), reage à crise ativa e foca a câmera.
  - `types.ts`: Modelos de dados para Crises, Decisões, Eventos, Quizzes de Conhecimento, Recursos e Histórico de Rodadas.
  - `crisesData.ts`: Coleção completa de crises baseadas em evidências reais e conceitos da Geografia escolar (Ensino Fundamental II e Médio).
  - `soundEffects.ts`: Efeitos sonoros procedurais via Web Audio API (sem dependência de arquivos externos).
- `client/src/components/`
  - `GlobeCanvas.tsx`: Container React com ciclo de vida seguro para Babylon.js (evitando duplicação no StrictMode).
  - `CrisisModal.tsx`: Visualização da Carta de Crise, dados geográficos, fontes e ações disponíveis.
  - `EventCard.tsx`: Apresentação de cartas de eventos climáticos repentinos.
  - `KnowledgeQuizModal.tsx`: Cartas de conhecimento geográfico (+100 XP por resposta correta).
  - `ScienceFairSurveyModal.tsx`: Módulo do PDR (Seção 14) com teste antes/depois da partida para gerar relatório e gráfico da feira.
  - `VictoryReportModal.tsx`: Tela final com classificação do gestor, estatísticas e resumo de impacto territorial.
