export interface PlayerResources {
  finance: number; // Inicia com 1000
  populationProtected: number; // Inicia com 100
  sustainability: number; // Inicia com 50
  lives: number; // Inicia com 3 vidas (Capacidade de resposta)
  xp: number; // Inicia com 0
  round: number; // Rodada atual
}

export type CardRarity = 'comum' | 'raro' | 'epico' | 'lendario' | 'mitico' | 'secreto';

export type CardType = 'tecnologia' | 'prevencao' | 'diplomacia' | 'natureza' | 'resposta';

export interface DecisionOption {
  id: string;
  title: string;
  description: string;
  category: 'infra' | 'prevention' | 'social' | 'nature' | 'emergency';
  costFinance: number;
  deltaPopulation: number;
  deltaSustainability: number;
  deltaXP: number;
  deltaLives?: number;
  scientificFeedback: string;
  rarity?: CardRarity;
  cardType?: CardType;
}

export interface RarityEffects {
  financeDiscount: number;
  populationBonus: number;
  sustainabilityBonus: number;
  xpBonus: number;
  livesDelta: number;
  buffLabel: string;
  debuffLabel: string;
}

export const getCardRarity = (option: DecisionOption): CardRarity => {
  if (option.rarity) return option.rarity;
  const score = option.deltaPopulation + option.deltaSustainability * 3 + option.deltaXP / 2 - option.costFinance / 4;
  if (score >= 430) return 'secreto';
  if (score >= 370) return 'mitico';
  if (score >= 300) return 'lendario';
  if (score >= 230) return 'epico';
  if (score >= 170) return 'raro';
  return 'comum';
};

const RARITY_EFFECTS: Record<CardRarity, RarityEffects> = {
  comum: { financeDiscount: 0, populationBonus: 0, sustainabilityBonus: 0, xpBonus: 0, livesDelta: 0, buffLabel: 'Efeito base', debuffLabel: 'Sem modificadores' },
  raro: { financeDiscount: 0, populationBonus: 10, sustainabilityBonus: 4, xpBonus: 8, livesDelta: 0, buffLabel: '+10 população · +4 sustentabilidade · +8 XP', debuffLabel: 'Sem penalidade' },
  epico: { financeDiscount: 10, populationBonus: 18, sustainabilityBonus: 8, xpBonus: 16, livesDelta: 0, buffLabel: '−10 custo · +18 população · +8 sustentabilidade', debuffLabel: 'Sem penalidade' },
  lendario: { financeDiscount: 20, populationBonus: 28, sustainabilityBonus: 14, xpBonus: 26, livesDelta: -1, buffLabel: '−20 custo · +28 população · +14 sustentabilidade', debuffLabel: '−1 vida: operação de alto risco' },
  mitico: { financeDiscount: 35, populationBonus: 42, sustainabilityBonus: 22, xpBonus: 42, livesDelta: -1, buffLabel: '−35 custo · +42 população · +22 sustentabilidade', debuffLabel: '−1 vida: pressão extrema' },
  secreto: { financeDiscount: 55, populationBonus: 65, sustainabilityBonus: 34, xpBonus: 80, livesDelta: -1, buffLabel: '−55 custo · +65 população · +34 sustentabilidade', debuffLabel: '−1 vida: efeito irreversível' },
};

export const getRarityEffects = (rarity: CardRarity): RarityEffects => RARITY_EFFECTS[rarity];

export interface RevenueOpportunity {
  id: string;
  title: string;
  description: string;
  tag: 'comunidade' | 'ciência' | 'mercado' | 'natureza';
  rewardFinance: number;
  costXP: number;
  deltaPopulation: number;
  deltaSustainability: number;
}

export interface RiskContract {
  id: string;
  title: string;
  brief: string;
  stake: number;
  reward: number;
  threshold: number;
  penaltyFinance: number;
  penaltyLives: number;
  penaltySustainability: number;
}

export interface MarketOffer {
  id: string;
  title: string;
  sector: string;
  basePrice: number;
  volatility: number;
  returnRate: number;
  deltaSustainability: number;
}

export interface CrisisCard {
  id: string;
  name: string;
  category: 'flood' | 'drought' | 'wildfire' | 'heatwave' | 'deforestation' | 'sealevel' | 'earthquake' | 'pollution' | 'pandemic' | 'biodiversity' | 'energy' | 'ocean' | 'cyber' | 'food';
  location: string;
  coordinates: { lat: number; lng: number };
  image: string;
  geographicConcepts: string[];
  scientificDescription: string;
  realWorldSource: {
    institution: string;
    dataset: string;
    year: string;
    urlDescription: string;
  };
  options: DecisionOption[];
  knowledgeQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  unexpectedEvent: {
    title: string;
    description: string;
    condition: 'random' | 'low_sustainability' | 'high_rain';
    impact: {
      finance?: number;
      population?: number;
      sustainability?: number;
      lives?: number;
    };
  };
}

export type FinalRank = 'Líder Global 🌎' | 'Gestor Expert 🥇' | 'Gestor em Desenvolvimento 🥈' | 'Gestor Iniciante 🥉';
