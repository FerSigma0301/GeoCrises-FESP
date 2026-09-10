# Game Plan: GeoCrisis — Decisões em um Mundo em Crise

## Risk Tasks
Nenhum risco de física de veículos ou retarget de GLBs complexos. O núcleo é a simulação sistêmica dos recursos do PDR, o globo 3D interativo via Babylon.js renderizando os focos de crise em tempo real e o ciclo de cartas (Crise, Decisão, Evento, Conhecimento/Quiz) com métricas científicas e fontes.

## Main Build
- **Globo Tático 3D (Babylon.js)**: Esfera terrestre com rotação, shaders de atmosfera, marcadores pulsantes das crises geográficas ativas, iluminação dinâmica e interação visual.
- **Ciclo de Jogo PDR**:
  - Recursos iniciais: 1.000 Finanças, 100 População Protegida, 50 Sustentabilidade, 3 Vidas (Capacidade de Resposta), 0 XP.
  - Cartas de Crise baseadas em dados reais com fontes científicas confiáveis (CEMADEN, INPE, NASA, IPCC, ONU/WMO).
  - Cartas de Decisão com trade-offs realistas (custos financeiros vs população vs sustentabilidade).
  - Cartas de Evento Inesperado (ex: nova tempestade, pico de calor, frente fria).
  - Cartas de Conhecimento (perguntas conceituais geográficas valendo +100 XP).
  - Sistema de Pontuação e Vitória (Líder Global 2.000+, Gestor Expert 1.500-1.999, Gestor em Desenvolvimento 1.000-1.499, Gestor Iniciante até 999).
  - Modo Questionário Científico Antes/Depois (conforme seção 14 do PDR para feiras de ciências).
  - Suporte ao modo AutoPilot / Demo (`?demo`) para demonstração automatizada.

- **Assets:**
  - Capa do Centro de Crise: `/manus-storage/geocrisis_cover_cf920979.png`
  - Crise de Enchente: `/manus-storage/crisis_flood_78fe1959.png`
  - Crise de Seca: `/manus-storage/crisis_drought_cca1c7d6.png`
  - Crise de Incêndio: `/manus-storage/crisis_fire_38d92c20.png`
  - Crise de Onda de Calor: `/manus-storage/crisis_heatwave_025c598f.png`
  - Crise de Desmatamento: `/manus-storage/crisis_deforest_cd8ad5b2.png`
  - Crise de Elevação do Nível do Mar: `/manus-storage/crisis_sealevel_8f0012fc.png`
