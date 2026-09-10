import { CrisisCard } from './types';

export const CRISES_DATA: CrisisCard[] = [
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
  }
];

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
  }
];
