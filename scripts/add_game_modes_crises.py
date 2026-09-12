from pathlib import Path

path = Path('/home/ubuntu/geocrisis/client/src/game/crisesData.ts')
text = path.read_text()
marker = "// Nova sequência: da pressão hídrica e alimentar até crises extremas e sistêmicas."
if "crisis-energy-blackout-1" not in text:
    addition = r'''
const ADDITIONAL_CRISES: CrisisCard[] = [
  {
    id: 'crisis-energy-blackout-1', name: 'Apagão Energético e Transição Justa', category: 'energy',
    location: 'Corredor Solar do Nordeste - Brasil', coordinates: { lat: -8.5, lng: -38.5 },
    image: '/manus-storage/crisis_heatwave_6f4c3c30.png',
    geographicConcepts: ['Transição energética', 'Infraestrutura crítica', 'Desigualdade de acesso', 'Armazenamento'],
    scientificDescription: 'Uma combinação de calor extremo, demanda elevada e baixa capacidade de armazenamento ameaça a continuidade de serviços essenciais e expõe famílias vulneráveis a um apagão prolongado.',
    realWorldSource: { institution: 'ONS & Agência Internacional de Energia', dataset: 'Relatórios de segurança elétrica e transição energética', year: '2024', urlDescription: 'Dados sobre picos de demanda, resiliência de redes e expansão de fontes renováveis.' },
    options: [
      { id: 'opt-energy-storage', title: 'Microrredes com Armazenamento Comunitário', description: 'Instalar baterias e geração distribuída em escolas, hospitais e abrigos.', category: 'infra', costFinance: 360, deltaPopulation: 340, deltaSustainability: 42, deltaXP: 170, scientificFeedback: 'Armazenamento reduz picos e cria autonomia local, mas exige governança e manutenção.' },
      { id: 'opt-energy-efficiency', title: 'Programa de Eficiência e Tarifa Social', description: 'Reduzir desperdícios e proteger o consumo básico de famílias vulneráveis.', category: 'social', costFinance: 210, deltaPopulation: 300, deltaSustainability: 28, deltaXP: 135, scientificFeedback: 'A eficiência evita novas usinas e combina proteção social com menor demanda.' },
      { id: 'opt-energy-fossil', title: 'Acionar Termelétricas de Emergência', description: 'Comprar estabilidade imediata usando capacidade fóssil de alto custo ambiental.', category: 'emergency', costFinance: 140, deltaPopulation: 360, deltaSustainability: -28, deltaXP: 90, scientificFeedback: 'A resposta rápida reduz o risco imediato, mas aumenta emissões e dependência.' },
      { id: 'opt-energy-solar', title: 'Leilão Solar com Contrapartida Territorial', description: 'Acelerar renováveis exigindo empregos, compensação e benefício local.', category: 'prevention', costFinance: 290, deltaPopulation: 280, deltaSustainability: 55, deltaXP: 180, scientificFeedback: 'A expansão planejada diversifica a matriz e distribui ganhos da transição.' },
    ],
    knowledgeQuestion: { question: 'Por que baterias e microrredes aumentam a resiliência energética?', options: ['Porque permitem armazenar energia e manter serviços essenciais quando a rede principal falha.', 'Porque eliminam toda necessidade de manutenção.', 'Porque aumentam automaticamente a chuva.', 'Porque substituem qualquer política social.'], correctIndex: 0, explanation: 'Armazenamento e microrredes criam redundância e autonomia local.' },
    unexpectedEvent: { title: 'Falha em Cascata na Rede!', description: 'Uma subestação superaquecida derruba linhas de transmissão durante o pico de consumo.', condition: 'random', impact: { finance: -90, population: -45, sustainability: -8 } },
  },
  {
    id: 'crisis-ocean-acidification-1', name: 'Acidificação dos Oceanos e Colapso Pesqueiro', category: 'ocean',
    location: 'Plataforma Continental do Atlântico Sul', coordinates: { lat: -23.5, lng: -42.2 },
    image: '/manus-storage/crisis_sealevel_1a37d2f2.png',
    geographicConcepts: ['Oceano', 'Pesca artesanal', 'Carbono azul', 'Segurança alimentar'],
    scientificDescription: 'O aumento do CO₂ dissolvido altera a química marinha, reduz a disponibilidade de espécies e pressiona comunidades costeiras que dependem da pesca.',
    realWorldSource: { institution: 'UNESCO-IOC & NOAA', dataset: 'Indicadores globais de acidificação oceânica', year: '2024', urlDescription: 'Monitoramento de pH marinho, temperatura e produtividade costeira.' },
    options: [
      { id: 'opt-ocean-marine', title: 'Áreas Marinhas Protegidas', description: 'Criar zonas de recuperação com fiscalização comunitária e ciência cidadã.', category: 'nature', costFinance: 260, deltaPopulation: 260, deltaSustainability: 62, deltaXP: 175, scientificFeedback: 'Refúgios marinhos podem recuperar estoques e aumentar a resiliência ecológica.' },
      { id: 'opt-ocean-fleet', title: 'Modernizar a Frota Artesanal', description: 'Financiar equipamentos seletivos, refrigeração eficiente e rastreabilidade.', category: 'infra', costFinance: 330, deltaPopulation: 350, deltaSustainability: 26, deltaXP: 150, scientificFeedback: 'Tecnologia reduz desperdícios, captura acidental e perdas de renda.' },
      { id: 'opt-ocean-income', title: 'Renda de Transição para Comunidades', description: 'Diversificar renda com turismo de base comunitária e restauração costeira.', category: 'social', costFinance: 240, deltaPopulation: 320, deltaSustainability: 38, deltaXP: 160, scientificFeedback: 'A transição evita que a proteção ambiental recaia sobre quem tem menos alternativas.' },
      { id: 'opt-ocean-extract', title: 'Expandir a Captura no Curto Prazo', description: 'Permitir maior esforço pesqueiro para compensar a queda imediata de renda.', category: 'emergency', costFinance: 90, deltaPopulation: 220, deltaSustainability: -35, deltaXP: 70, scientificFeedback: 'A medida alivia a renda no curto prazo, mas acelera o colapso do estoque.' },
    ],
    knowledgeQuestion: { question: 'O que causa a acidificação dos oceanos?', options: ['A absorção de parte do CO₂ atmosférico pela água do mar.', 'A redução da salinidade causada por desertos.', 'A ausência de marés.', 'A expansão de florestas costeiras.'], correctIndex: 0, explanation: 'O oceano absorve CO₂ e sofre mudanças químicas que afetam organismos calcificadores e cadeias alimentares.' },
    unexpectedEvent: { title: 'Maré Vermelha Costeira!', description: 'Uma proliferação de algas fecha áreas de cultivo e pesca por segurança sanitária.', condition: 'random', impact: { finance: -70, population: -35, sustainability: -12 } },
  },
  {
    id: 'crisis-cyber-infrastructure-1', name: 'Ciberataque à Infraestrutura Crítica', category: 'cyber',
    location: 'Sistema Integrado de Água e Energia - América do Sul', coordinates: { lat: -15.8, lng: -47.9 },
    image: '/manus-storage/crisis_pollution_13a0b7d8.png',
    geographicConcepts: ['Cibersegurança', 'Interdependência', 'Dados públicos', 'Infraestrutura crítica'],
    scientificDescription: 'Um ataque coordenado interrompe sistemas digitais de água, transporte e energia, revelando como a dependência de redes conectadas transforma uma falha técnica em crise territorial.',
    realWorldSource: { institution: 'CISA & Fórum Econômico Mundial', dataset: 'Relatórios de risco cibernético e infraestrutura crítica', year: '2024', urlDescription: 'Boas práticas de segurança, redundância e resposta a incidentes.' },
    options: [
      { id: 'opt-cyber-backup', title: 'Redundância Offline e Centros de Comando', description: 'Manter operações essenciais com cópias isoladas e protocolos manuais.', category: 'prevention', costFinance: 300, deltaPopulation: 330, deltaSustainability: 18, deltaXP: 185, scientificFeedback: 'Redundância reduz o impacto de ataques, mas precisa ser testada continuamente.' },
      { id: 'opt-cyber-public', title: 'Transparência e Mutirão Digital', description: 'Comunicar o incidente e mobilizar universidades para restaurar serviços.', category: 'social', costFinance: 160, deltaPopulation: 250, deltaSustainability: 24, deltaXP: 160, scientificFeedback: 'Confiança pública e capacidade distribuída aceleram a recuperação.' },
      { id: 'opt-cyber-hardening', title: 'Blindagem Total de Sistemas', description: 'Contratar resposta privada de emergência para isolar e reconstruir a rede.', category: 'infra', costFinance: 520, deltaPopulation: 410, deltaSustainability: 12, deltaXP: 175, scientificFeedback: 'A resposta é robusta, porém cara e pode deixar municípios menores desprotegidos.' },
      { id: 'opt-cyber-shutdown', title: 'Desligamento Preventivo Amplo', description: 'Desconectar sistemas para impedir a propagação e aceitar interrupções imediatas.', category: 'emergency', costFinance: 80, deltaPopulation: 170, deltaSustainability: 4, deltaXP: 115, scientificFeedback: 'Isolamento limita danos, mas exige planos físicos para manter serviços básicos.' },
    ],
    knowledgeQuestion: { question: 'Por que sistemas de infraestrutura precisam de redundância?', options: ['Para manter funções essenciais quando uma rede ou componente falha.', 'Para aumentar a dependência de um único servidor.', 'Para impedir qualquer atualização.', 'Para substituir equipes humanas.'], correctIndex: 0, explanation: 'Redundância cria caminhos alternativos e reduz pontos únicos de falha.' },
    unexpectedEvent: { title: 'Ransomware em Serviços Municipais!', description: 'Hospitais e centrais de atendimento perdem acesso a parte dos registros digitais.', condition: 'random', impact: { finance: -120, population: -55, lives: -1 } },
  },
  {
    id: 'crisis-food-logistics-1', name: 'Ruptura Logística e Inflação Alimentar', category: 'food',
    location: 'Eixo de Abastecimento Centro-Oeste - Brasil', coordinates: { lat: -15.2, lng: -55.0 },
    image: '/manus-storage/crisis_drought_0a0b0c0d.png',
    geographicConcepts: ['Logística', 'Abastecimento', 'Inflação', 'Produção regional'],
    scientificDescription: 'Secas, bloqueios de transporte e concentração de fornecedores elevam preços e reduzem o acesso a alimentos, atingindo de forma desigual cidades e comunidades rurais.',
    realWorldSource: { institution: 'FAO & CONAB', dataset: 'Sistemas de alerta e acompanhamento de preços de alimentos', year: '2024', urlDescription: 'Dados sobre estoques, rotas, produção e segurança alimentar.' },
    options: [
      { id: 'opt-food-stock', title: 'Estoques Públicos Descentralizados', description: 'Comprar alimentos básicos e distribuir reservas em centros regionais.', category: 'social', costFinance: 350, deltaPopulation: 420, deltaSustainability: 12, deltaXP: 155, scientificFeedback: 'Estoques reduzem volatilidade, mas exigem governança para evitar perdas e desperdício.' },
      { id: 'opt-food-rail', title: 'Corredor Logístico de Emergência', description: 'Priorizar ferrovias, estradas e combustível para rotas de abastecimento.', category: 'infra', costFinance: 440, deltaPopulation: 390, deltaSustainability: 8, deltaXP: 145, scientificFeedback: 'Corredores protegem o fluxo, mas precisam de planejamento e manutenção.' },
      { id: 'opt-food-local', title: 'Compra Local e Agricultura Urbana', description: 'Contratar produtores próximos, hortas e cozinhas comunitárias.', category: 'nature', costFinance: 230, deltaPopulation: 330, deltaSustainability: 44, deltaXP: 170, scientificFeedback: 'A produção local encurta cadeias e fortalece renda, embora não substitua toda a escala regional.' },
      { id: 'opt-food-price', title: 'Subsídio Emergencial de Preços', description: 'Reduzir imediatamente o preço ao consumidor com apoio financeiro direto.', category: 'emergency', costFinance: 180, deltaPopulation: 360, deltaSustainability: -4, deltaXP: 105, scientificFeedback: 'O subsídio protege famílias, mas precisa de prazo e foco para não consumir o orçamento.' },
    ],
    knowledgeQuestion: { question: 'Por que cadeias curtas de abastecimento podem aumentar a resiliência?', options: ['Porque reduzem dependências e dão alternativas locais quando rotas longas falham.', 'Porque eliminam a necessidade de planejamento.', 'Porque impedem toda importação.', 'Porque tornam alimentos automaticamente gratuitos.'], correctIndex: 0, explanation: 'Diversificar origens e rotas reduz vulnerabilidade a choques.' },
    unexpectedEvent: { title: 'Bloqueio no Corredor de Abastecimento!', description: 'Uma ponte interditada redireciona caminhões e aumenta o tempo de entrega.', condition: 'random', impact: { finance: -95, population: -40 } },
  },
];

'''
    text = text.replace(marker, addition + marker)
    text = text.replace("const CAMPAIGN_ORDER = [", "const CAMPAIGN_ORDER = [", 1)
    text = text.replace("  'crisis-pandemic-1',\n] as const;", "  'crisis-pandemic-1', 'crisis-energy-blackout-1', 'crisis-ocean-acidification-1',\n  'crisis-cyber-infrastructure-1', 'crisis-food-logistics-1',\n] as const;")
    text = text.replace(".map((id) => CRISES_DATA_BASE.find((crisis) => crisis.id === id))", ".map((id) => [...CRISES_DATA_BASE, ...ADDITIONAL_CRISES].find((crisis) => crisis.id === id))")
    path.write_text(text)
else:
    print('additional crises already present')
