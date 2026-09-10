from pathlib import Path

path = Path('/home/ubuntu/geocrisis/client/src/game/crisesData.ts')
text = path.read_text()
marker = '\n];\n\nexport const SURVEY_QUESTIONS'
assert marker in text

addition = r'''
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
'''

path.write_text(text.replace(marker, ',\n' + addition + marker))
