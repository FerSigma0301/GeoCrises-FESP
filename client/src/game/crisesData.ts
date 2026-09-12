import { CrisisCard } from './types';

const CRISES_DATA_BASE: CrisisCard[] = [
  {
    id: 'crisis-flood-1',
    name: 'Enchente Urbana e Cheia Fluvial',
    category: 'flood',
    location: 'Bacia do Rio Taquari / Vale do Sinos, RS - Brasil',
    coordinates: { lat: -29.68, lng: -51.96 },
    image: '/manus-storage/crisis_flood_78fe1959.png',
    geographicConcepts: ['Urbanização desordenada', 'Hidrografia', 'Ocupação de planície de inundação', 'Impermeabilização do solo'],
    scientificDescription: 'Precipitações de alta intensidade concentradas em cabeceiras de bacia hidrográfica provocaram a rápida elevação da lâmina d’água em áreas densamente povoadas. A canalização de arroios e a redução de matas ciliares amplificaram a velocidade de escoamento e o assoreamento do leito.',
    realWorldSource: {
      institution: 'CEMADEN & Defesa Civil Nacional',
      dataset: 'Atlas Digital de Desastres / Monitoramento Hidrológico 2024',
      year: '2024',
      urlDescription: 'Dados de pluviometria extrema e mapeamento geomorfológico de risco fluvial.'
    },
    options: [
      {
        id: 'opt-flood-alert',
        title: 'Criar Sistema Integrado de Alerta Precoce e Sirenes',
        description: 'Implantar estações hidrológicas telemétricas e planos comunitários de contingência para evacuação célere.',
        category: 'prevention',
        costFinance: 200,
        deltaPopulation: 250,
        deltaSustainability: 10,
        deltaXP: 100,
        scientificFeedback: 'Sistemas de alerta salvam vidas de forma imediata e de baixo custo, mas não eliminam a vulnerabilidade estrutural das habitações.'
      },
      {
        id: 'opt-flood-drain',
        title: 'Macro-drenagem e Diques de Contenção de Cheias',
        description: 'Engenharia pesada com bacias de amortecimento (piscinões) e comportas automatizadas nas áreas ribeirinhas.',
        category: 'infra',
        costFinance: 450,
        deltaPopulation: 380,
        deltaSustainability: -15,
        deltaXP: 130,
        scientificFeedback: 'Obras cinzas oferecem proteção temporária de alto nível, porém demandam manutenção cara e podem transferir o impacto da cheia para municípios a jusante.'
      },
      {
        id: 'opt-flood-relocate',
        title: 'Reassentamento Habitacional Fora das Áreas de Risco',
        description: 'Remoção planejada de famílias de encostas e faixas marginais de proteção, transformando as várzeas em parques fluviais inundáveis.',
        category: 'social',
        costFinance: 500,
        deltaPopulation: 420,
        deltaSustainability: 45,
        deltaXP: 180,
        scientificFeedback: 'A solução mais resiliente a longo prazo: desocupa a planície natural de inundação e respeita a dinâmica geomorfológica do rio.'
      },
      {
        id: 'opt-flood-renature',
        title: 'Recuperação de Matas Ciliares e Soluções Baseadas na Natureza (SbN)',
        description: 'Reflorestar margens, criar biovaletas e restaurar a capacidade de infiltração da bacia.',
        category: 'nature',
        costFinance: 280,
        deltaPopulation: 200,
        deltaSustainability: 60,
        deltaXP: 150,
        scientificFeedback: 'Aumenta a infiltração da água no solo, diminui o pico do hidrograma e reequilibra o ecossistema local com alta sustentabilidade.'
      }
    ],
    knowledgeQuestion: {
      question: 'Por que o processo de impermeabilização do solo urbano agrava diretamente a magnitude das inundações?',
      options: [
        'Diminui a infiltração de água no subsolo e acelera o escoamento superficial em direção aos corpos hídricos.',
        'Aumenta a transpiração vegetal da atmosfera diminuindo a chuva local.',
        'Diminui a temperatura do asfalto, reduzindo a umidade relativa do ar.',
        'Provoca o aumento da vazão subterrânea imediata nos aquíferos profundos.'
      ],
      correctIndex: 0,
      explanation: 'O asfalto e as construções impedem a infiltração natural da água. A maior parte do volume precipitado escorre rapidamente na superfície (runoff), gerando picos rápidos e violentos de vazão nos rios.'
    },
    unexpectedEvent: {
      title: 'Tempestade Convectiva Secundária!',
      description: 'Uma nova linha de instabilidade despejou 120 mm em apenas 3 horas sobre a bacia vulnerável.',
      condition: 'high_rain',
      impact: {
        population: -50,
        finance: -80,
        lives: -1
      }
    }
  },
  {
    id: 'crisis-drought-1',
    name: 'Seca Severa e Colapso Hídrico',
    category: 'drought',
    location: 'Semiárido e Bacia do São Francisco - Brasil',
    coordinates: { lat: -9.4, lng: -40.5 },
    image: '/manus-storage/crisis_drought_cca1c7d6.png',
    geographicConcepts: ['Recursos hídricos', 'Climatologia (semiárido)', 'Segurança alimentar', 'Uso consuntivo da água'],
    scientificDescription: 'Bloqueios atmosféricos persistentes e anomalias térmicas oceânicas provocaram déficit pluviométrico contínuo de 18 meses. Os volumes úteis das represas caíram abaixo de 12%, ameaçando o abastecimento humano e a agricultura irrigada.',
    realWorldSource: {
      institution: 'ANA (Agência Nacional de Águas) & INMET',
      dataset: 'Monitor de Secas do Brasil',
      year: '2024',
      urlDescription: 'Índice padronizado de precipitação e monitoramento dos volumes dos reservatórios estratégicos.'
    },
    options: [
      {
        id: 'opt-drought-irrigation',
        title: 'Modernizar Irrigação para Gotejamento e Microaspersão',
        description: 'Substituir sistemas obsoletos de inundação ou pivô por técnicas de precisão com economia de até 60% de água.',
        category: 'nature',
        costFinance: 320,
        deltaPopulation: 260,
        deltaSustainability: 50,
        deltaXP: 140,
        scientificFeedback: 'A agricultura responde por cerca de 70% do consumo de água doce mundial; eficiência técnica é o principal escudo contra a escassez.'
      },
      {
        id: 'opt-drought-cisterns',
        title: 'Programa Popular de Cisternas de Captação Pluvial',
        description: 'Construir cisternas de placas familiares para captação de água de chuva dos telhados nas comunidades difusas.',
        category: 'social',
        costFinance: 240,
        deltaPopulation: 310,
        deltaSustainability: 40,
        deltaXP: 130,
        scientificFeedback: 'Garante segurança hídrica básica descentralizada com baixo custo e altíssimo empoderamento comunitário.'
      },
      {
        id: 'opt-drought-trucks',
        title: 'Operação Carro-Pipa Emergencial Contínua',
        description: 'Contratação emergencial de frota de caminhões pipa para distribuir água potável nos povoados.',
        category: 'emergency',
        costFinance: 380,
        deltaPopulation: 190,
        deltaSustainability: -10,
        deltaXP: 80,
        scientificFeedback: 'Ação paliativa essencial no curto prazo para evitar mortes imediatas, mas insustentável economicamente a longo prazo.'
      },
      {
        id: 'opt-drought-desal',
        title: 'Implantar Dessalinizadores com Energia Solar para Águas Subterrâneas',
        description: 'Aproveitar poços artesianos salobres utilizando dessalinização fotovoltaica sustentável.',
        category: 'infra',
        costFinance: 420,
        deltaPopulation: 340,
        deltaSustainability: 35,
        deltaXP: 160,
        scientificFeedback: 'Excelente convergência entre transição energética e segurança hídrica no semiárido cristalino.'
      }
    ],
    knowledgeQuestion: {
      question: 'Qual fator climático explica a formação predominante do clima semiárido no interior do Nordeste brasileiro?',
      options: [
        'Ação combinada do relevo (Planalto da Borborema como barreira orográfica) e circulação de massas de ar com subsidência.',
        'Proximidade direta com a Corrente Marítima Quente do Golfo.',
        'Ausência completa de luz solar durante metade do ano.',
        'Invasão diária da Massa Polar Atlântica congelando a evapotranspiração.'
      ],
      correctIndex: 0,
      explanation: 'O Planalto da Borborema induz chuvas orográficas na encosta leste e cria uma "sombra de chuva" a barlavento/sotavento, além de células de subsidência que inibem a convecção de nuvens de chuva.'
    },
    unexpectedEvent: {
      title: 'Pico de Evaporação por Vento Quente!',
      description: 'Rajadas de ventos secos aceleraram a perda evaporativa do espelho d’água das represas.',
      condition: 'random',
      impact: {
        population: -30,
        sustainability: -15,
        finance: -50
      }
    }
  },
  {
    id: 'crisis-fire-1',
    name: 'Mega-Incêndios Florestais e Queimadas Descontroladas',
    category: 'wildfire',
    location: 'Pantanal e Bioma Cerrado - Centro-Oeste do Brasil',
    coordinates: { lat: -16.5, lng: -56.5 },
    image: '/manus-storage/crisis_fire_38d92c20.png',
    geographicConcepts: ['Biomas', 'Dinâmica do fogo', 'Uso e ocupação do solo', 'Poluição atmosférica por material particulado'],
    scientificDescription: 'A conjunção de seca extrema histórica, baixa umidade relativa do ar (< 15%) e uso indevido do fogo para renovação de pastagens gerou frentes de fogo incontroláveis de até 80 km de extensão, aniquilando fauna e cobrindo cidades de fumaça tóxica.',
    realWorldSource: {
      institution: 'INPE (Programa Queimadas) & Prevfogo/IBAMA',
      dataset: 'Detecção de Focos de Calor por Satélite GOES e MODIS',
      year: '2024',
      urlDescription: 'Monitoramento geoespacial de focos ativos e estimativa de área calcinada em hectares.'
    },
    options: [
      {
        id: 'opt-fire-aero',
        title: 'Mobilizar Aviação de Combate e Brigadas Especializadas',
        description: 'Empregar aeronaves de lançamento de água e retardantes químicos combinadas com brigadistas indígenas em solo.',
        category: 'emergency',
        costFinance: 400,
        deltaPopulation: 280,
        deltaSustainability: 20,
        deltaXP: 120,
        scientificFeedback: 'Ataque direto rápido que suprime frentes ativas críticas, ainda que de custo financeiro e logístico muito elevado.'
      },
      {
        id: 'opt-fire-mif',
        title: 'Manejo Integrado do Fogo (MIF) e Queimas Prescritas de Inverno',
        description: 'Técnica científica e tradicional de queima preventiva na estação úmida para diminuir a biomassa combustível seca.',
        category: 'prevention',
        costFinance: 220,
        deltaPopulation: 250,
        deltaSustainability: 55,
        deltaXP: 170,
        scientificFeedback: 'Consenso ecológico moderno: o fogo planejado em mosaico previne os catastróficos incêndios florestais descontrolados na seca.'
      },
      {
        id: 'opt-fire-corridors',
        title: 'Criação de Corredores Ecológicos e Barreiras Corta-Fogo',
        description: 'Abrir faixas sem vegetação estratégica e recuperar áreas úmidas naturais para bloquear o avanço das chamas.',
        category: 'nature',
        costFinance: 310,
        deltaPopulation: 220,
        deltaSustainability: 45,
        deltaXP: 130,
        scientificFeedback: 'Estruturação territorial que fragmenta a continuidade do combustível vegetal e protege refúgios de fauna.'
      },
      {
        id: 'opt-fire-fiscal',
        title: 'Fiscalização Integrada por Sensoriamento Remoto e Multas',
        description: 'Embargar remotamente propriedades rurais que iniciaram fogo criminoso durante a vigência de decretos de proibição.',
        category: 'social',
        costFinance: 180,
        deltaPopulation: 210,
        deltaSustainability: 35,
        deltaXP: 140,
        scientificFeedback: 'Desestimula a conduta ilegal sem necessidade de custosas patrulhas terrestres contínuas.'
      }
    ],
    knowledgeQuestion: {
      question: 'Qual é a principal diferença conceitual na Geografia Ecológica entre "foco de calor/queima prescrita" e "incêndio florestal"?',
      options: [
        'A queima prescrita é controlada com objetivo de manejo e segurança; o incêndio florestal é descontrolado e consome ecossistemas além da capacidade de suporte.',
        'Não existe diferença, todo fogo tem exatamente a mesma temperatura e efeito ecológico.',
        'O incêndio florestal ocorre apenas em centros urbanos asfaltados.',
        'Queimas prescritas só ocorrem por combustão espontânea sem intervenção humana.'
      ],
      correctIndex: 0,
      explanation: 'O Manejo Integrado do Fogo reconhece que certos biomas evoluíram com regimes de fogo. Queimas controladas e prescritas previnem o acúmulo de palha que alimenta incêndios devastadores.'
    },
    unexpectedEvent: {
      title: 'Pluma de Fumaça Atinge Capitais!',
      description: 'A inversão térmica transportou aerossóis e fuligem por milhares de quilômetros, saturando hospitais com crises respiratórias.',
      condition: 'random',
      impact: {
        population: -60,
        sustainability: -20,
        lives: -1
      }
    }
  },
  {
    id: 'crisis-heat-1',
    name: 'Onda de Calor Extrema e Ilhas de Calor Urbanas',
    category: 'heatwave',
    location: 'Regiões Metropolitanas / Sudeste e Centro-Sul - Brasil',
    coordinates: { lat: -23.55, lng: -46.63 },
    image: '/manus-storage/crisis_heatwave_025c598f.png',
    geographicConcepts: ['Ilhas de calor', 'Albedo das superfícies', 'Saúde pública urbana', 'Justiça climática'],
    scientificDescription: 'Uma cúpula de calor (heat dome) gerou temperaturas sustentadas superiores a 41°C com sensação térmica ultrapassando 50°C. O concreto, o vidro e a carência de arborização nas periferias elevaram as temperaturas noturnas, impedindo o resfriamento biológico do corpo humano.',
    realWorldSource: {
      institution: 'WMO (Organização Meteorológica Mundial) & USP Climatologia',
      dataset: 'Monitoramento Termográfico de Superfície e Análise de Albedo Urbano',
      year: '2024',
      urlDescription: 'Medições satelitais de temperatura da superfície e registros de excesso de mortalidade.'
    },
    options: [
      {
        id: 'opt-heat-roofs',
        title: 'Florestas Urbanas e Parques Lineares de Resfriamento',
        description: 'Plantio maciço de árvores nativas em vias públicas e criação de microparques arborizados para reduzir a temperatura em até 4°C.',
        category: 'nature',
        costFinance: 290,
        deltaPopulation: 310,
        deltaSustainability: 60,
        deltaXP: 160,
        scientificFeedback: 'A evapotranspiração vegetal consome energia térmica do ambiente e a sombra reduz drasticamente a radiação incidente no pavimento.'
      },
      {
        id: 'opt-heat-shelters',
        title: 'Abrigos Públicos Climatizados e Pontos de Hidratação',
        description: 'Transformar escolas, estações de metrô e centros comunitários em refúgios térmicos com água gelada para populações vulneráveis.',
        category: 'social',
        costFinance: 190,
        deltaPopulation: 270,
        deltaSustainability: 10,
        deltaXP: 110,
        scientificFeedback: 'Resposta humanitária imediata com foco nas populações em situação de rua, crianças e idosos com menor regulação térmica.'
      },
      {
        id: 'opt-heat-coolpave',
        title: 'Telhados Brancos Reflexivos e Pavimentos Frios (Cool Pavements)',
        description: 'Substituir coberturas escuras por materiais de alto albedo que refletem a radiação solar de volta ao espaço.',
        category: 'infra',
        costFinance: 350,
        deltaPopulation: 250,
        deltaSustainability: 35,
        deltaXP: 130,
        scientificFeedback: 'Materiais com alto índice de refletância solar não absorvem calor sensível, atenuando sensivelmente a ilha de calor noturna.'
      },
      {
        id: 'opt-heat-warning',
        title: 'Suspensão de Trabalhos Externos em Horário Crítico e Alertas',
        description: 'Protocolo de emergência com proibição de serviços pesados ao ar livre entre 11h e 16h com garantia de renda.',
        category: 'prevention',
        costFinance: 230,
        deltaPopulation: 290,
        deltaSustainability: 15,
        deltaXP: 120,
        scientificFeedback: 'Previne mortes por estresse térmico ocupacional e insolação em operários da construção e garis.'
      }
    ],
    knowledgeQuestion: {
      question: 'O que define o conceito geográfico de "Albedo" e qual é sua relevância para o microclima urbano?',
      options: [
        'A taxa de reflexão da radiação solar por uma superfície; superfícies com alto albedo refletem mais luz e retêm menos calor.',
        'A velocidade dos ventos que descem as montanhas durante as madrugadas.',
        'A profundidade das galerias pluviais construídas abaixo do asfalto.',
        'A quantidade de monóxido de carbono emitido pelos veículos automotores.'
      ],
      correctIndex: 0,
      explanation: 'O albedo varia de 0 (absorção total, como asfalto escuro) a 1 (reflexão total, como neve ou tinta branca pura). Aumentar o albedo urbano reduz o calor absorvido pela cidade.'
    },
    unexpectedEvent: {
      title: 'Sobrecarga na Rede Elétrica!',
      description: 'O uso recorde simultâneo de ar-condicionado causou apagões localizados em setores hospitalares.',
      condition: 'random',
      impact: {
        finance: -70,
        population: -40,
        sustainability: -10
      }
    }
  },
  {
    id: 'crisis-deforest-1',
    name: 'Desmatamento e Degradação da Bacia Amazônica',
    category: 'deforestation',
    location: 'Arco do Povoamento / Norte de Mato Grosso e Sul do Pará',
    coordinates: { lat: -8.88, lng: -55.22 },
    image: '/manus-storage/crisis_deforest_cd8ad5b2.png',
    geographicConcepts: ['Rios voadores', 'Fronteira agrícola', 'Grileiros e posse da terra', 'Regulação climática continental'],
    scientificDescription: 'Abertura acelerada de ramais clandestinos e corte raso de floresta primária para grilagem de terras públicas. A perda florestal compromete a bomba biótica dos rios voadores que abastecem as chuvas do Centro-Oeste e Sudeste.',
    realWorldSource: {
      institution: 'INPE (PRODES / DETER) & MapBiomas',
      dataset: 'Sistema de Detecção do Desmatamento em Tempo Real',
      year: '2024',
      urlDescription: 'Polígonos de alerta de degradação e série histórica de taxa anual de desmatamento.'
    },
    options: [
      {
        id: 'opt-def-bioeconomy',
        title: 'Fomento à Bioeconomia Florestal e Cadeias Socioprodutivas',
        description: 'Incentivar o manejo sustentável de açaí, castanha, borracha e cacau nativo mantendo a floresta em pé gerando renda superior à pecuária extensiva.',
        category: 'nature',
        costFinance: 260,
        deltaPopulation: 290,
        deltaSustainability: 65,
        deltaXP: 180,
        scientificFeedback: 'Floresta em pé tem valor ecológico e econômico mensurável superior; fixa populações tradicionais no território como guardiãs da biodiversidade.'
      },
      {
        id: 'opt-def-satelitte',
        title: 'Fiscalização com Satélites Radar (SAR) e Apreensão de Bens',
        description: 'Imagens que atravessam nuvens dia e noite para flagrar motosserras e tratores, destruindo maquinário em campo.',
        category: 'emergency',
        costFinance: 330,
        deltaPopulation: 220,
        deltaSustainability: 45,
        deltaXP: 150,
        scientificFeedback: 'Corta o lucro dos infratores e inviabiliza a operação logística pesada do corte ilegal.'
      },
      {
        id: 'opt-def-titling',
        title: 'Destinação de Florestas Públicas e Terras Indígenas Demarcadas',
        description: 'Homologar reservas extrativistas e terras indígenas, comprovadamente as áreas com menor taxa de devastação do planeta.',
        category: 'social',
        costFinance: 210,
        deltaPopulation: 340,
        deltaSustainability: 60,
        deltaXP: 170,
        scientificFeedback: 'Estudos do MapBiomas mostram que Terras Indígenas demarcadas barram até 98% da invasão ilegal e preservam nascentes vitais.'
      },
      {
        id: 'opt-def-embargo',
        title: 'Rastreabilidade Total da Cadeia Bovina e de Grãos',
        description: 'Exigir brincos eletrônicos e CAR rastreado, bloqueando crédito bancário para produtores com passivos ambientais.',
        category: 'prevention',
        costFinance: 280,
        deltaPopulation: 250,
        deltaSustainability: 40,
        deltaXP: 140,
        scientificFeedback: 'Seca a demanda de mercado por commodities cultivadas em áreas recém-desmatadas ilegalmente.'
      }
    ],
    knowledgeQuestion: {
      question: 'O fenômeno atmosférico conhecido como "Rios Voadores" da Amazônia é fundamental para o Brasil porque:',
      options: [
        'Transporta imensos volumes de vapor d’água gerados pela evapotranspiração da floresta para produzir chuvas vitais no Centro-Oeste, Sudeste e Sul.',
        'Permite a navegação comercial de aeronaves sem gastar combustível.',
        'Leva a poeira do deserto do Saara diretamente para as geleiras da Antártica.',
        'Impede a ocorrência de qualquer estação seca em todo o território nacional.'
      ],
      correctIndex: 0,
      explanation: 'A floresta bombeia água do solo e libera bilhões de litros de vapor diariamente na atmosfera através da evapotranspiração, que são carregados pelos ventos alísios para nutrir os reservatórios e a agricultura do país.'
    },
    unexpectedEvent: {
      title: 'Invasão em Unidade de Conservação!',
      description: 'Grileiros aproveitaram período nublado para queimar uma reserva biológica antes da fiscalização chegar.',
      condition: 'low_sustainability',
      impact: {
        sustainability: -25,
        population: -20,
        finance: -40
      }
    }
  },
  {
    id: 'crisis-sea-1',
    name: 'Elevação do Nível do Mar e Erosão Costeira',
    category: 'sealevel',
    location: 'Litoral Fluminense e Baixada Santista - Brasil',
    coordinates: { lat: -23.96, lng: -46.33 },
    image: '/manus-storage/crisis_sealevel_8f0012fc.png',
    geographicConcepts: ['Dinâmica costeira', 'Manguezais como berçários', 'Intrusão salina', 'Vulnerabilidade do litoral'],
    scientificDescription: 'A combinação de marés astronômicas de sizígia, ressacas oceânicas alimentadas por ciclones extratropicais e a taxa histórica de subida do nível médio global das águas gerou colapso de calçadões, destruição de diques e salinização de lençóis freáticos litorâneos.',
    realWorldSource: {
      institution: 'IPCC (Painel Intergovernamental de Mudanças Climáticas) & Rede Maregráfica IBGE',
      dataset: 'Relatório Especial sobre Oceanos e Criosfera (SROCC) / Séries Históricas de Maregrafia',
      year: '2024',
      urlDescription: 'Projeções de elevação média do mar até 2100 e taxas de recuo de linha de costa.'
    },
    options: [
      {
        id: 'opt-sea-mangrove',
        title: 'Restauro Ecológico de Manguezais e Restingas',
        description: 'Proteger e replantar vegetação estuarina e dunas que dissipam até 66% da energia das ondas oceânicas.',
        category: 'nature',
        costFinance: 250,
        deltaPopulation: 290,
        deltaSustainability: 65,
        deltaXP: 170,
        scientificFeedback: 'Manguezais atuam como amortecedores naturais vivos, crescem com o depósito de sedimentos e protegem contra a erosão com custo dez vezes menor que muros de concreto.'
      },
      {
        id: 'opt-sea-barrier',
        title: 'Quebra-mares Submersos e Enrocamento de Pedra',
        description: 'Implantar barreiras marinhas artificiais de rocha para forçar o arrebentamento das ondas antes de alcançar a orla.',
        category: 'infra',
        costFinance: 480,
        deltaPopulation: 340,
        deltaSustainability: -10,
        deltaXP: 130,
        scientificFeedback: 'Protege a infraestrutura urbana imediata, mas altera o transporte litorâneo de areia e pode acelerar a erosão na praia vizinha.'
      },
      {
        id: 'opt-sea-retreat',
        title: 'Recuo Estratégico Controlado da Infraestrutura Costeira',
        description: 'Proibir novas construções em faixa de maré, desapropriar imóveis condenados e criar parques litorâneos de transição.',
        category: 'social',
        costFinance: 420,
        deltaPopulation: 360,
        deltaSustainability: 45,
        deltaXP: 180,
        scientificFeedback: 'A recomendação de ouro do IPCC para adaptação costeira: devolver espaço para o oceano respirar em vez de travar uma guerra perdida contra a água.'
      },
      {
        id: 'opt-sea-monitoring',
        title: 'Sistema de Boias Oceanográficas e Alerta de Ressaca Marítima',
        description: 'Instalar sensores de ondas e correntes acoplados à Defesa Civil municipal para fechar vias e portos preventivamente.',
        category: 'prevention',
        costFinance: 210,
        deltaPopulation: 240,
        deltaSustainability: 15,
        deltaXP: 120,
        scientificFeedback: 'Evita acidentes náuticos e destruição de veículos durante as marés de tempestade com investimento moderado.'
      }
    ],
    knowledgeQuestion: {
      question: 'Por que a vegetação de Manguezal e Restinga é considerada um dos ecossistemas mais eficazes na proteção costeira contra eventos extremos?',
      options: [
        'Suas raízes aéreas e emaranhadas retêm sedimentos e dissipam fortemente a força mecânica das ondas e tempestades marítimas.',
        'A vegetação de mangue absorve todo o sal do oceano tornando a água doce.',
        'Os manguezais esfriam a temperatura do manto terrestre reduzindo abalos sísmicos.',
        'O manguezal repele a água do mar empurrando as marés para longe dos continentes.'
      ],
      correctIndex: 0,
      explanation: 'As raízes pneumatóforas e escoras criam uma malha biológica densa que quebra a velocidade da água, ancora os sedimentos estuarinos e ancora a linha de costa contra a erosão.'
    },
    unexpectedEvent: {
      title: 'Ciclone Extratropical e Ressaca Histórica!',
      description: 'Ondas de 4 metros invadiram a primeira linha de avenidas litorâneas destruindo galerias de água.',
      condition: 'random',
      impact: {
        population: -50,
        finance: -80,
        lives: -1
      }
    }
  },

  {
    id: 'crisis-cyclone-1',
    name: 'Ciclone Tropical e Inundação Costeira',
    category: 'sealevel',
    location: 'Delta do Mekong / Vietnã e Camboja',
    coordinates: { lat: 10.2, lng: 105.8 },
    image: '/manus-storage/crisis_sealevel_8f0012fc.png',
    geographicConcepts: ['Ciclones tropicais', 'Delta fluvial', 'Vulnerabilidade costeira', 'Deslocamento populacional'],
    scientificDescription: 'Um ciclone tropical intensificado pelo oceano mais quente avança sobre o delta densamente povoado. A maré de tempestade coincide com a cheia do rio, pressionando diques, arrozais e comunidades construídas sobre sedimentos baixos.',
    realWorldSource: {
      institution: 'WMO & IPCC',
      dataset: 'State of the Global Climate / Special Report on Oceans',
      year: '2024',
      urlDescription: 'Séries de intensidade de ciclones, maré de tempestade e exposição de deltas densamente povoados.'
    },
    options: [
      {
        id: 'opt-cyclone-evac',
        title: 'Evacuação Comunitária e Rotas Elevadas',
        description: 'Abrir abrigos, transportar moradores vulneráveis e sinalizar rotas acima da cota de inundação.',
        category: 'emergency', costFinance: 260, deltaPopulation: 330, deltaSustainability: 12, deltaXP: 130,
        scientificFeedback: 'Evacuação antecipada reduz drasticamente mortes em ciclones, sobretudo quando combinada com comunicação local confiável.'
      },
      {
        id: 'opt-cyclone-mangrove',
        title: 'Restaurar Manguezais no Delta',
        description: 'Recuperar faixas de mangue que dissipam ondas e protegem os diques naturais do estuário.',
        category: 'nature', costFinance: 280, deltaPopulation: 260, deltaSustainability: 58, deltaXP: 165,
        scientificFeedback: 'Ecossistemas costeiros reduzem a energia das ondas e sustentam pesca, segurança alimentar e renda comunitária.'
      },
      {
        id: 'opt-cyclone-dikes',
        title: 'Reforçar Diques e Estações de Bombeamento',
        description: 'Elevar trechos críticos e instalar bombas redundantes para drenar áreas urbanizadas.',
        category: 'infra', costFinance: 470, deltaPopulation: 410, deltaSustainability: -12, deltaXP: 145,
        scientificFeedback: 'Infraestrutura cinza protege áreas estratégicas, mas pode aumentar a dependência de manutenção e transferir risco para vizinhos.'
      },
      {
        id: 'opt-cyclone-insurance',
        title: 'Fundo de Reconstrução e Seguro Paramétrico',
        description: 'Liberar recursos automaticamente quando ventos e chuva ultrapassarem os limiares definidos.',
        category: 'social', costFinance: 210, deltaPopulation: 240, deltaSustainability: 20, deltaXP: 125,
        scientificFeedback: 'Financiamento previsível acelera a recuperação e evita que comunidades vulneráveis entrem em ciclos de pobreza após o desastre.'
      },
      {
        id: 'opt-cyclone-early',
        title: 'Radar Meteorológico e Alerta Multilíngue',
        description: 'Integrar radar, rádio comunitária, SMS e sirenes para ampliar o tempo de preparação.',
        category: 'prevention', costFinance: 180, deltaPopulation: 290, deltaSustainability: 18, deltaXP: 120,
        scientificFeedback: 'Mais tempo de preparação transforma uma ameaça meteorológica em uma operação coordenada de proteção civil.'
      }
    ],
    knowledgeQuestion: {
      question: 'Por que a maré de tempestade torna os deltas fluviais especialmente vulneráveis?',
      options: [
        'Porque o vento e a baixa pressão empilham água do mar no litoral enquanto o rio encontra dificuldade para escoar sua cheia.',
        'Porque os deltas estão sempre acima do nível do mar.',
        'Porque a água salgada congela e bloqueia todos os canais.',
        'Porque a chuva deixa de existir sobre regiões costeiras.'
      ],
      correctIndex: 0,
      explanation: 'A maré de tempestade eleva o nível do mar justamente quando a drenagem do rio já está comprometida, causando inundação composta.'
    },
    unexpectedEvent: {
      title: 'Maré de Tempestade Antecipada!',
      description: 'A baixa pressão aprofundou-se rapidamente e a maré máxima chegará antes do previsto.',
      condition: 'random', impact: { population: -55, finance: -65, lives: -1 }
    }
  },
  {
    id: 'crisis-volcano-1',
    name: 'Erupção Vulcânica e Cinzas Atmosféricas',
    category: 'wildfire',
    location: 'Arco Vulcânico da América Central',
    coordinates: { lat: 14.5, lng: -90.8 },
    image: '/manus-storage/crisis_fire_38d92c20.png',
    geographicConcepts: ['Tectonismo', 'Riscos naturais', 'Qualidade do ar', 'Uso do território'],
    scientificDescription: 'Uma erupção explosiva lança cinzas sobre cidades, plantações e rotas aéreas. O risco combina fluxos piroclásticos na zona proximal, lahars em vales e problemas respiratórios a centenas de quilômetros.',
    realWorldSource: {
      institution: 'USGS & Smithsonian Global Volcanism Program',
      dataset: 'Volcanic Ash Advisory and Global Volcanism Reports',
      year: '2024',
      urlDescription: 'Monitoramento sísmico, colunas de cinzas e mapas de perigo vulcânico.'
    },
    options: [
      {
        id: 'opt-volcano-evac', title: 'Evacuar o Anel de Alto Risco', description: 'Remover moradores de encostas e vales de lahar usando abrigos temporários.', category: 'emergency', costFinance: 250, deltaPopulation: 340, deltaSustainability: 8, deltaXP: 135,
        scientificFeedback: 'A zona de exclusão é a medida mais efetiva contra fluxos rápidos e imprevisíveis próximos ao cone.'
      },
      {
        id: 'opt-volcano-sensors', title: 'Rede de Sensores Sísmicos e GPS', description: 'Ampliar instrumentos que detectam deformação do terreno e tremores precursores.', category: 'prevention', costFinance: 230, deltaPopulation: 280, deltaSustainability: 18, deltaXP: 140,
        scientificFeedback: 'Instrumentação melhora a previsão de curto prazo e reduz falsos alarmes quando interpretada por vulcanólogos.'
      },
      {
        id: 'opt-volcano-masks', title: 'Proteção Respiratória e Abrigos Filtrados', description: 'Distribuir máscaras adequadas e criar centros de ar filtrado em escolas e hospitais.', category: 'social', costFinance: 160, deltaPopulation: 250, deltaSustainability: 5, deltaXP: 105,
        scientificFeedback: 'Cinzas finas podem penetrar profundamente nos pulmões; proteção e filtragem reduzem internações.'
      },
      {
        id: 'opt-volcano-lahar', title: 'Bacias de Contenção para Lahars', description: 'Desobstruir canais e construir bacias para reduzir a energia de fluxos de lama.', category: 'infra', costFinance: 390, deltaPopulation: 320, deltaSustainability: -8, deltaXP: 130,
        scientificFeedback: 'Obras de contenção protegem vales críticos, porém exigem manutenção e não substituem o zoneamento.'
      },
      {
        id: 'opt-volcano-landuse', title: 'Zoneamento Vulcânico e Relocalização', description: 'Impedir novas ocupações em rotas de fluxo e oferecer alternativas habitacionais.', category: 'nature', costFinance: 410, deltaPopulation: 380, deltaSustainability: 38, deltaXP: 175,
        scientificFeedback: 'Planejamento territorial reduz exposição futura, respeitando a dinâmica geológica do vulcão.'
      }
    ],
    knowledgeQuestion: {
      question: 'O que torna um lahar particularmente perigoso?',
      options: [
        'É um fluxo de lama vulcânica que pode descer por vales a grande velocidade, mesmo depois de a erupção principal terminar.',
        'É uma nuvem de gelo que sobe para a estratosfera.',
        'É uma maré causada exclusivamente pela Lua cheia.',
        'É uma corrente de ar sem partículas sólidas.'
      ],
      correctIndex: 0,
      explanation: 'Chuva sobre cinzas e neve ou gelo derretidos podem formar rios densos de lama que seguem os vales e soterram comunidades.'
    },
    unexpectedEvent: {
      title: 'Chuva Intensa Sobre a Encosta!',
      description: 'Uma frente úmida transformou depósitos de cinza em fluxos de lama secundários.',
      condition: 'high_rain', impact: { population: -45, finance: -50, lives: -1 }
    }
  },
  {
    id: 'crisis-agri-1',
    name: 'Crise Agrícola e Insegurança Alimentar',
    category: 'drought',
    location: 'Corredor Seco da África Oriental',
    coordinates: { lat: 3.0, lng: 38.5 },
    image: '/manus-storage/crisis_drought_cca1c7d6.png',
    geographicConcepts: ['Clima e agricultura', 'Segurança alimentar', 'Desertificação', 'Pastoralismo'],
    scientificDescription: 'Quatro estações chuvosas abaixo da média reduziram colheitas e pastagens. A perda de rebanhos força deslocamentos e eleva a pressão sobre aquíferos e centros urbanos.',
    realWorldSource: {
      institution: 'FAO & WFP',
      dataset: 'Food Security and Climate Early Warning Systems',
      year: '2024',
      urlDescription: 'Indicadores de produção, preços, precipitação e insegurança alimentar aguda.'
    },
    options: [
      {
        id: 'opt-agri-seeds', title: 'Sementes Resilientes e Diversificação', description: 'Distribuir variedades adaptadas à seca, hortas comunitárias e assistência agronômica.', category: 'nature', costFinance: 260, deltaPopulation: 300, deltaSustainability: 42, deltaXP: 155,
        scientificFeedback: 'Diversificação reduz a dependência de uma única safra e melhora a adaptação climática local.'
      },
      {
        id: 'opt-agri-grain', title: 'Reserva Regional de Grãos e Compra Antecipada', description: 'Formar estoques estratégicos antes do pico de preços e da interrupção de rotas.', category: 'social', costFinance: 340, deltaPopulation: 360, deltaSustainability: 8, deltaXP: 125,
        scientificFeedback: 'Estoque e logística estabilizam preços, mas devem ser combinados com produção sustentável para não apenas adiar a crise.'
      },
      {
        id: 'opt-agri-water', title: 'Pequenas Barragens e Captação de Chuva', description: 'Construir estruturas de retenção distribuídas para recarregar o solo e atender rebanhos.', category: 'infra', costFinance: 310, deltaPopulation: 280, deltaSustainability: 46, deltaXP: 145,
        scientificFeedback: 'Infraestrutura hídrica descentralizada reduz a vulnerabilidade de comunidades rurais dispersas.'
      },
      {
        id: 'opt-agri-pastoral', title: 'Corredores para Pastoreio Móvel', description: 'Negociar corredores sazonais para reduzir conflitos entre pastores e agricultores.', category: 'prevention', costFinance: 170, deltaPopulation: 270, deltaSustainability: 30, deltaXP: 135,
        scientificFeedback: 'Mobilidade tradicional é uma adaptação territorial eficiente quando há acesso negociado à água e às pastagens.'
      },
      {
        id: 'opt-agri-cash', title: 'Transferência de Renda e Proteção Social', description: 'Garantir renda mínima e merenda escolar para famílias em insegurança alimentar.', category: 'emergency', costFinance: 290, deltaPopulation: 320, deltaSustainability: 4, deltaXP: 110,
        scientificFeedback: 'Proteção social impede que famílias vendam seus ativos produtivos durante o choque climático.'
      }
    ],
    knowledgeQuestion: {
      question: 'Como a desertificação se relaciona com a gestão do território?',
      options: [
        'É um processo de degradação de terras secas influenciado por clima, uso inadequado do solo, perda de vegetação e manejo da água.',
        'É a formação natural de qualquer deserto sem relação com atividades humanas.',
        'É o aumento da cobertura vegetal em áreas de chuva intensa.',
        'É um fenômeno restrito às regiões polares.'
      ],
      correctIndex: 0,
      explanation: 'A desertificação é uma combinação de vulnerabilidade climática e decisões de uso da terra que reduzem a capacidade de recuperação dos ecossistemas.'
    },
    unexpectedEvent: {
      title: 'Preços de Alimentos Disparam!',
      description: 'A quebra simultânea de safras em regiões vizinhas interrompeu importações e elevou o custo básico.',
      condition: 'random', impact: { finance: -90, population: -65, sustainability: -8 }
    }
  },
  {
    id: 'crisis-displacement-1',
    name: 'Deslocamento Populacional por Crise Ambiental',
    category: 'deforestation',
    location: 'Região do Lago Chade / África Central',
    coordinates: { lat: 13.3, lng: 14.0 },
    image: '/manus-storage/crisis_deforest_cd8ad5b2.png',
    geographicConcepts: ['Migrações ambientais', 'Conflitos por recursos', 'Território', 'Urbanização'],
    scientificDescription: 'A redução do lago, a perda de pastagens e eventos extremos empurram famílias agricultoras e pastoris para centros urbanos já pressionados. A crise exige acolhimento, serviços públicos e negociação territorial.',
    realWorldSource: {
      institution: 'IOM & UNHCR',
      dataset: 'World Migration Report / Climate Mobility Assessments',
      year: '2024',
      urlDescription: 'Estimativas de mobilidade humana, deslocamento interno e pressão sobre territórios de acolhimento.'
    },
    options: [
      {
        id: 'opt-displace-services', title: 'Expandir Serviços nos Territórios de Acolhimento', description: 'Financiar água, escolas, saúde e moradia temporária em cidades receptoras.', category: 'social', costFinance: 360, deltaPopulation: 340, deltaSustainability: 12, deltaXP: 145,
        scientificFeedback: 'Acolhimento planejado reduz tensões e transforma deslocamento emergencial em integração urbana digna.'
      },
      {
        id: 'opt-displace-lake', title: 'Recuperar Zonas Úmidas e Pesca Sustentável', description: 'Restaurar áreas alagáveis e criar acordos de uso compartilhado do lago.', category: 'nature', costFinance: 300, deltaPopulation: 260, deltaSustainability: 55, deltaXP: 165,
        scientificFeedback: 'A restauração da base ecológica diminui a pressão migratória, mas seus resultados são graduais.'
      },
      {
        id: 'opt-displace-jobs', title: 'Programa de Trabalho e Renda Verde', description: 'Empregar famílias em restauração de solo, água e infraestrutura comunitária.', category: 'prevention', costFinance: 250, deltaPopulation: 310, deltaSustainability: 35, deltaXP: 150,
        scientificFeedback: 'Renda e recuperação ambiental podem avançar juntas quando o trabalho é decidido com a comunidade.'
      },
      {
        id: 'opt-displace-border', title: 'Corredores Humanitários e Registro de Proteção', description: 'Organizar passagem segura, documentação e acesso a serviços básicos.', category: 'emergency', costFinance: 210, deltaPopulation: 290, deltaSustainability: 6, deltaXP: 115,
        scientificFeedback: 'Registro e proteção legal reduzem exploração e permitem planejar o território com dados.'
      },
      {
        id: 'opt-displace-planning', title: 'Planejamento Regional Participativo', description: 'Reunir municípios, comunidades deslocadas e produtores para pactuar o uso da água.', category: 'infra', costFinance: 180, deltaPopulation: 240, deltaSustainability: 32, deltaXP: 140,
        scientificFeedback: 'Governança multiescalar evita respostas isoladas e disputa permanente por recursos escassos.'
      }
    ],
    knowledgeQuestion: {
      question: 'Por que o deslocamento ambiental não deve ser explicado apenas por um único fenômeno natural?',
      options: [
        'Porque clima, condições sociais, conflitos, políticas de território e acesso desigual a recursos interagem na decisão de migrar.',
        'Porque mudanças ambientais nunca influenciam a mobilidade humana.',
        'Porque toda migração é exclusivamente econômica.',
        'Porque as pessoas se deslocam somente quando há terremotos.'
      ],
      correctIndex: 0,
      explanation: 'A mobilidade é multicausal: riscos ambientais se combinam com pobreza, conflitos, serviços e políticas públicas.'
    },
    unexpectedEvent: {
      title: 'Novo Fluxo de Famílias Chega à Fronteira!',
      description: 'A falha de uma colheita vizinha acelera a chegada de pessoas em busca de água e proteção.',
      condition: 'random', impact: { finance: -70, population: -35, lives: -1 }
    }
  },
  {
    id: 'crisis-landslide-1',
    name: 'Deslizamentos em Encostas Urbanizadas',
    category: 'flood',
    location: 'Serra do Mar / Sudeste do Brasil',
    coordinates: { lat: -23.4, lng: -45.2 },
    image: '/manus-storage/crisis_flood_78fe1959.png',
    geographicConcepts: ['Relevo', 'Movimentos de massa', 'Ocupação de encostas', 'Cartografia de risco'],
    scientificDescription: 'Chuvas persistentes saturam encostas ocupadas sem drenagem adequada. A combinação entre declividade, solo profundo, cortes irregulares e impermeabilização cria risco de escorregamentos rápidos.',
    realWorldSource: {
      institution: 'CEMADEN & CPRM',
      dataset: 'Mapas de Suscetibilidade a Movimentos de Massa',
      year: '2024',
      urlDescription: 'Cartas de risco, pluviometria crítica e inventário de deslizamentos em áreas urbanas.'
    },
    options: [
      {
        id: 'opt-landslide-map', title: 'Mapear Encostas e Instalar Pluviômetros', description: 'Cruzar declividade, geologia, ocupação e chuva para emitir alertas por bairro.', category: 'prevention', costFinance: 220, deltaPopulation: 280, deltaSustainability: 20, deltaXP: 145,
        scientificFeedback: 'Mapas de risco não removem a ameaça, mas orientam evacuação e impedem novas ocupações perigosas.'
      },
      {
        id: 'opt-landslide-drain', title: 'Drenagem, Canaletas e Contenção Vegetada', description: 'Controlar água superficial sem transformar toda a encosta em concreto.', category: 'infra', costFinance: 350, deltaPopulation: 310, deltaSustainability: 38, deltaXP: 150,
        scientificFeedback: 'A água é um dos principais gatilhos de deslizamento; conduzi-la com soluções híbridas reduz a pressão no solo.'
      },
      {
        id: 'opt-landslide-housing', title: 'Reassentamento Seguro com Participação Comunitária', description: 'Retirar famílias de setores de altíssimo risco e ofertar moradia próxima de serviços.', category: 'social', costFinance: 480, deltaPopulation: 420, deltaSustainability: 30, deltaXP: 185,
        scientificFeedback: 'A remoção com dignidade e participação evita perdas humanas sem romper redes sociais e acesso ao trabalho.'
      },
      {
        id: 'opt-landslide-reforest', title: 'Revegetar Encostas e Proteger Nascentes', description: 'Recuperar cobertura vegetal, terraços e áreas de preservação permanente.', category: 'nature', costFinance: 240, deltaPopulation: 230, deltaSustainability: 58, deltaXP: 160,
        scientificFeedback: 'Raízes aumentam a coesão superficial e a vegetação regula o escoamento, embora não resolva todos os riscos geotécnicos.'
      },
      {
        id: 'opt-landslide-drill', title: 'Simulado de Evacuação e Brigadas de Bairro', description: 'Treinar rotas, pontos de encontro e comunicação em períodos de chuva intensa.', category: 'emergency', costFinance: 150, deltaPopulation: 300, deltaSustainability: 10, deltaXP: 120,
        scientificFeedback: 'Capacitação local reduz o tempo de resposta e salva vidas quando a previsão é curta.'
      }
    ],
    knowledgeQuestion: {
      question: 'Qual combinação aumenta o risco de deslizamentos em áreas urbanas?',
      options: [
        'Encosta íngreme, solo saturado por chuva, cortes sem contenção e ocupação sem drenagem adequada.',
        'Terreno plano, solo seco e cobertura vegetal preservada.',
        'Maré baixa, vento fraco e céu sem nuvens.',
        'Alta infiltração natural e ausência de construções.'
      ],
      correctIndex: 0,
      explanation: 'A estabilidade depende da relação entre gravidade, água, material geológico e intervenção humana na encosta.'
    },
    unexpectedEvent: {
      title: 'Chuva Persistente Supera o Limiar!',
      description: 'O acumulado de 72 horas ultrapassou o nível crítico para os setores mais íngremes.',
      condition: 'high_rain', impact: { population: -50, finance: -60, lives: -1 }
    }
  }
,
  {
    "id": "crisis-earthquake-1",
    "name": "Terremoto e Colapso de Infraestrutura",
    "category": "earthquake",
    "location": "Cordilheira dos Andes / Santiago - Chile",
    "coordinates": {
      "lat": -33.45,
      "lng": -70.67
    },
    "image": "/manus-storage/crisis_flood_78fe1959.png",
    "geographicConcepts": [
      "Tectônica de placas",
      "Risco sísmico",
      "Resiliência urbana",
      "Infraestrutura crítica"
    ],
    "scientificDescription": "Um terremoto de alta magnitude atingiu uma área metropolitana densamente povoada. A intensidade do tremor e a interrupção de energia e água transformaram um evento natural em uma crise territorial complexa.",
    "realWorldSource": {
      "institution": "Centro Sismológico Nacional & USGS",
      "dataset": "ShakeMap e Inventário de Risco Sísmico Urbano",
      "year": "2024",
      "urlDescription": "Mapas de intensidade, falhas geológicas ativas e estimativas de exposição da população."
    },
    "options": [
      {
        "id": "opt-quake-retrofit",
        "title": "Reforço Estrutural de Escolas e Hospitais",
        "description": "Priorizar prédios essenciais com reforço de pilares e rotas de evacuação.",
        "category": "infra",
        "costFinance": 420,
        "deltaPopulation": 360,
        "deltaSustainability": 8,
        "deltaXP": 150,
        "scientificFeedback": "Infraestrutura crítica resiliente reduz mortes secundárias e acelera a recuperação."
      },
      {
        "id": "opt-quake-drills",
        "title": "Rede Comunitária de Treinamento e Alerta",
        "description": "Criar brigadas locais, simulados recorrentes e alertas multicanal.",
        "category": "prevention",
        "costFinance": 180,
        "deltaPopulation": 240,
        "deltaSustainability": 18,
        "deltaXP": 110,
        "scientificFeedback": "Preparação comunitária reduz pânico e aumenta a velocidade de resposta."
      },
      {
        "id": "opt-quake-shelter",
        "title": "Abrigos Temporários e Logística Humanitária",
        "description": "Montar centros de abrigo e corredores de suprimentos descentralizados.",
        "category": "social",
        "costFinance": 300,
        "deltaPopulation": 390,
        "deltaSustainability": 2,
        "deltaXP": 130,
        "scientificFeedback": "Abrigos bem distribuídos protegem a população deslocada."
      },
      {
        "id": "opt-quake-open-space",
        "title": "Parques de Segurança e Rotas de Evacuação",
        "description": "Converter áreas livres em pontos seguros conectados por rotas sinalizadas.",
        "category": "nature",
        "costFinance": 260,
        "deltaPopulation": 270,
        "deltaSustainability": 35,
        "deltaXP": 140,
        "scientificFeedback": "Espaços abertos funcionam como infraestrutura verde e zona de segurança."
      }
    ],
    "knowledgeQuestion": {
      "question": "Por que prédios e hospitais devem ser priorizados na preparação sísmica?",
      "options": [
        "Porque concentram serviços vitais e precisam permanecer operacionais após o tremor.",
        "Porque são sempre os prédios mais antigos.",
        "Porque eliminam o risco de terremotos.",
        "Porque impedem o movimento das placas."
      ],
      "correctIndex": 0,
      "explanation": "Hospitais, escolas e redes de emergência sustentam a resposta e sua continuidade salva vidas."
    },
    "unexpectedEvent": {
      "title": "Réplica de Alta Intensidade!",
      "description": "Uma réplica bloqueou duas rotas de acesso aos abrigos.",
      "condition": "random",
      "impact": {
        "finance": -70,
        "population": -45,
        "lives": -1
      }
    }
  },
  {
    "id": "crisis-pollution-1",
    "name": "Nuvem Tóxica e Crise da Qualidade do Ar",
    "category": "pollution",
    "location": "Corredor Industrial do Rio Paraopeba - Brasil",
    "coordinates": {
      "lat": -19.97,
      "lng": -44.2
    },
    "image": "/manus-storage/crisis_heatwave_025c598f.png",
    "geographicConcepts": [
      "Poluição atmosférica",
      "Saúde ambiental",
      "Justiça territorial",
      "Indústria"
    ],
    "scientificDescription": "Uma inversão térmica reteve poluentes sobre uma área industrial e bairros periféricos. A exposição agravou doenças respiratórias e revelou a desigual distribuição dos riscos ambientais.",
    "realWorldSource": {
      "institution": "CETESB & Organização Mundial da Saúde",
      "dataset": "Diretrizes de Qualidade do Ar e Inventário de Emissões",
      "year": "2024",
      "urlDescription": "Medições de material particulado, ozônio e fontes emissoras em áreas urbanas."
    },
    "options": [
      {
        "id": "opt-pollution-sensors",
        "title": "Sensores Abertos de Qualidade do Ar",
        "description": "Instalar estações e publicar mapas horários de poluentes por bairro.",
        "category": "prevention",
        "costFinance": 190,
        "deltaPopulation": 210,
        "deltaSustainability": 22,
        "deltaXP": 115,
        "scientificFeedback": "Monitoramento transparente orienta proteção e responsabilização ambiental."
      },
      {
        "id": "opt-pollution-health",
        "title": "Protocolo de Saúde e Proteção Respiratória",
        "description": "Distribuir máscaras adequadas e abrir centros de atendimento.",
        "category": "social",
        "costFinance": 280,
        "deltaPopulation": 330,
        "deltaSustainability": 5,
        "deltaXP": 125,
        "scientificFeedback": "Resposta sanitária imediata reduz internações enquanto a fonte é controlada."
      },
      {
        "id": "opt-pollution-transition",
        "title": "Transição Industrial para Emissão Zero",
        "description": "Financiar filtros, eletrificação de processos e metas públicas.",
        "category": "infra",
        "costFinance": 520,
        "deltaPopulation": 390,
        "deltaSustainability": 65,
        "deltaXP": 190,
        "scientificFeedback": "A transição tecnológica ataca a causa estrutural com governança de longo prazo."
      },
      {
        "id": "opt-pollution-greenbelt",
        "title": "Cinturão Verde e Corredores de Ventilação",
        "description": "Criar parques lineares e preservar áreas de circulação do vento.",
        "category": "nature",
        "costFinance": 340,
        "deltaPopulation": 250,
        "deltaSustainability": 55,
        "deltaXP": 150,
        "scientificFeedback": "Infraestrutura verde reduz calor e exposição, sem substituir o controle da fonte."
      }
    ],
    "knowledgeQuestion": {
      "question": "O que torna uma inversão térmica perigosa?",
      "options": [
        "Ela impede a dispersão vertical dos poluentes e concentra a exposição perto do solo.",
        "Ela elimina todo o oxigênio.",
        "Ela transforma poluentes em água potável.",
        "Ela ocorre apenas em áreas rurais."
      ],
      "correctIndex": 0,
      "explanation": "A camada de ar quente sobre o ar frio funciona como uma tampa e mantém contaminantes próximos à população."
    },
    "unexpectedEvent": {
      "title": "Pico de Material Particulado!",
      "description": "Uma falha em um filtro industrial elevou a concentração durante o horário de pico.",
      "condition": "random",
      "impact": {
        "finance": -90,
        "population": -60
      }
    }
  },
  {
    "id": "crisis-pandemic-1",
    "name": "Surto Epidemiológico e Pressão Hospitalar",
    "category": "pandemic",
    "location": "Região Metropolitana de Manaus - Brasil",
    "coordinates": {
      "lat": -3.12,
      "lng": -60.02
    },
    "image": "/manus-storage/crisis_drought_cca1c7d6.png",
    "geographicConcepts": [
      "Saúde pública",
      "Mobilidade",
      "Vigilância epidemiológica",
      "Desigualdade"
    ],
    "scientificDescription": "Um surto de transmissão rápida pressiona unidades de saúde e interrompe atividades econômicas. A distância entre comunidades e o acesso desigual exigem coordenação territorial.",
    "realWorldSource": {
      "institution": "Fiocruz & Ministério da Saúde",
      "dataset": "Sistemas de Vigilância Epidemiológica e Leitos SUS",
      "year": "2024",
      "urlDescription": "Indicadores de transmissão, capacidade hospitalar e distribuição espacial de serviços."
    },
    "options": [
      {
        "id": "opt-pandemic-surveillance",
        "title": "Vigilância de Dados e Testagem Rápida",
        "description": "Criar laboratórios móveis, rastreamento ético e boletins transparentes.",
        "category": "prevention",
        "costFinance": 260,
        "deltaPopulation": 340,
        "deltaSustainability": 12,
        "deltaXP": 145,
        "scientificFeedback": "Dados rápidos permitem direcionar recursos antes do colapso hospitalar."
      },
      {
        "id": "opt-pandemic-hospitals",
        "title": "Expandir Leitos e Proteger Profissionais",
        "description": "Reforçar hospitais regionais, estoques estratégicos e equipes.",
        "category": "infra",
        "costFinance": 430,
        "deltaPopulation": 410,
        "deltaSustainability": 4,
        "deltaXP": 160,
        "scientificFeedback": "Capacidade hospitalar salva vidas, mas precisa de prevenção."
      },
      {
        "id": "opt-pandemic-community",
        "title": "Comunicação Comunitária e Proteção Social",
        "description": "Apoiar agentes locais, renda emergencial e comunicação acessível.",
        "category": "social",
        "costFinance": 240,
        "deltaPopulation": 300,
        "deltaSustainability": 18,
        "deltaXP": 130,
        "scientificFeedback": "Confiança pública aumenta adesão e reduz impactos desiguais."
      },
      {
        "id": "opt-pandemic-prevention",
        "title": "Prevenção Integrada e Saúde Ambiental",
        "description": "Investir em saneamento, ventilação, vacinação e redução de riscos.",
        "category": "nature",
        "costFinance": 360,
        "deltaPopulation": 280,
        "deltaSustainability": 48,
        "deltaXP": 175,
        "scientificFeedback": "Prevenção estrutural reduz a recorrência de surtos."
      }
    ],
    "knowledgeQuestion": {
      "question": "Por que a vigilância territorial é importante durante um surto?",
      "options": [
        "Porque mostra onde transmissão e pressão hospitalar estão crescendo.",
        "Porque substitui hospitais.",
        "Porque garante que nenhuma doença será transmitida.",
        "Porque registra apenas o clima."
      ],
      "correctIndex": 0,
      "explanation": "A vigilância combina tempo e espaço para identificar focos e priorizar recursos."
    },
    "unexpectedEvent": {
      "title": "Nova Cadeia de Transmissão!",
      "description": "Uma rota regional conectou comunidades sem acesso a testagem.",
      "condition": "random",
      "impact": {
        "finance": -65,
        "population": -55,
        "lives": -1
      }
    }
  },
  {
    "id": "crisis-biodiversity-1",
    "name": "Colapso de Biodiversidade e Serviços Ecossistêmicos",
    "category": "biodiversity",
    "location": "Mata Atlântica e Serra do Mar - Brasil",
    "coordinates": {
      "lat": -23.35,
      "lng": -44.82
    },
    "image": "/manus-storage/crisis_deforest_cd8ad5b2.png",
    "geographicConcepts": [
      "Biodiversidade",
      "Fragmentação",
      "Polinização",
      "Conectividade ecológica"
    ],
    "scientificDescription": "A fragmentação de habitats e a perda de espécies-chave ameaçam água, polinização e estabilidade de encostas. O impacto aparece lentamente, mas compromete serviços essenciais.",
    "realWorldSource": {
      "institution": "ICMBio & IPBES",
      "dataset": "Avaliação Nacional de Biodiversidade e Áreas Prioritárias",
      "year": "2024",
      "urlDescription": "Indicadores de perda de habitat, conectividade e risco para espécies ameaçadas."
    },
    "options": [
      {
        "id": "opt-bio-corridors",
        "title": "Corredores Ecológicos Conectados",
        "description": "Restaurar faixas entre fragmentos e integrar unidades de conservação.",
        "category": "nature",
        "costFinance": 300,
        "deltaPopulation": 230,
        "deltaSustainability": 75,
        "deltaXP": 180,
        "scientificFeedback": "Conectividade permite fluxo gênico e deslocamento diante das mudanças climáticas."
      },
      {
        "id": "opt-bio-communities",
        "title": "Economia da Floresta com Comunidades",
        "description": "Financiar cadeias de produtos nativos e monitoramento comunitário.",
        "category": "social",
        "costFinance": 250,
        "deltaPopulation": 290,
        "deltaSustainability": 52,
        "deltaXP": 150,
        "scientificFeedback": "Renda alinhada à conservação transforma comunidades em guardiãs."
      },
      {
        "id": "opt-bio-restoration",
        "title": "Restauração de Nascentes e Encostas",
        "description": "Recuperar áreas críticas para água, solo e refúgio de espécies.",
        "category": "infra",
        "costFinance": 380,
        "deltaPopulation": 310,
        "deltaSustainability": 68,
        "deltaXP": 165,
        "scientificFeedback": "Restauração multifuncional recupera serviços e reduz riscos."
      },
      {
        "id": "opt-bio-monitoring",
        "title": "Observatório de Espécies Sentinelas",
        "description": "Usar sensores, ciência cidadã e eDNA para detectar perdas.",
        "category": "prevention",
        "costFinance": 210,
        "deltaPopulation": 180,
        "deltaSustainability": 45,
        "deltaXP": 155,
        "scientificFeedback": "Indicadores precoces permitem agir antes de danos irreversíveis."
      }
    ],
    "knowledgeQuestion": {
      "question": "Por que corredores ecológicos são importantes?",
      "options": [
        "Porque conectam habitats e permitem deslocamento e troca genética.",
        "Porque substituem todas as áreas protegidas.",
        "Porque impedem qualquer incêndio.",
        "Porque servem apenas como estradas."
      ],
      "correctIndex": 0,
      "explanation": "A conectividade reduz o isolamento das populações e melhora a adaptação dos ecossistemas."
    },
    "unexpectedEvent": {
      "title": "Mortalidade de Polinizadores!",
      "description": "Uma onda de calor e defensivos reduziram a atividade de polinizadores.",
      "condition": "random",
      "impact": {
        "finance": -75,
        "population": -35,
        "sustainability": -15
      }
    }
  }
];

// Nova sequência: da pressão hídrica e alimentar até crises extremas e sistêmicas.
const CAMPAIGN_ORDER = [
  'crisis-drought-1', 'crisis-agri-1', 'crisis-flood-1', 'crisis-landslide-1',
  'crisis-deforest-1', 'crisis-fire-1', 'crisis-heat-1', 'crisis-sea-1',
  'crisis-displacement-1', 'crisis-cyclone-1', 'crisis-volcano-1',
  'crisis-earthquake-1', 'crisis-pollution-1', 'crisis-biodiversity-1', 'crisis-pandemic-1',
] as const;

export const CRISES_DATA: CrisisCard[] = CAMPAIGN_ORDER
  .map((id) => CRISES_DATA_BASE.find((crisis) => crisis.id === id))
  .filter((crisis): crisis is CrisisCard => Boolean(crisis));

export const SURVEY_QUESTIONS = [
  {
    id: 'q1',
    question: 'Você sabe por que as enchentes urbanas são agravadas pelas características das cidades modernas?',
    options: [
      'A impermeabilização do solo pelo asfalto e concreto impede a infiltração da água, forçando todo o volume a escorrer rapidamente para os canais e rios.',
      'As cidades atraem mais nuvens de chuva apenas por causa dos edifícios espelhados.',
      'A temperatura das cidades faz a água evaporar instantaneamente antes de tocar o solo.',
      'Os rios urbanos aumentam naturalmente de tamanho a cada década sem influência humana.'
    ],
    correctIndex: 0
  },
  {
    id: 'q2',
    question: 'Como a conservação da vegetação nativa e das matas ciliares auxilia no combate a crises hídricas e secas?',
    options: [
      'As raízes facilitam a infiltração de água no subsolo, recarregando aquíferos e mantendo a vazão regular dos rios mesmo em épocas secas.',
      'As folhas das árvores bloqueiam completamente a passagem do oxigênio para a atmosfera.',
      'A vegetação impede que a chuva chegue ao chão, guardando a água em poças no topo das árvores.',
      'As plantas consomem toda a água potável dos rios para seu próprio crescimento.'
    ],
    correctIndex: 0
  },
  {
    id: 'q3',
    question: 'O que significa o princípio do "equilíbrio entre economia, população e sustentabilidade" na gestão territorial de crises?',
    options: [
      'Significa que obras puramente financeiras ou emergenciais que ignoram a dinâmica ecológica tendem a falhar ou gerar custos maiores no futuro.',
      'Significa gastar todo o dinheiro público na primeira emergência que acontecer.',
      'Significa impedir qualquer tipo de habitação ou atividade econômica nos países.',
      'Significa priorizar apenas o lucro imediato das empresas de construção pesada.'
    ],
    correctIndex: 0
  },

];
