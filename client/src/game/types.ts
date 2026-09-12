export interface PlayerResources {
  finance: number; // Inicia com 1000
  populationProtected: number; // Inicia com 100
  sustainability: number; // Inicia com 50
  lives: number; // Inicia com 3 vidas (Capacidade de resposta)
  xp: number; // Inicia com 0
  round: number; // Rodada atual
}

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
}

export interface CrisisCard {
  id: string;
  name: string;
  category: 'flood' | 'drought' | 'wildfire' | 'heatwave' | 'deforestation' | 'sealevel' | 'earthquake' | 'pollution' | 'pandemic' | 'biodiversity';
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

export interface SurveyAnswer {
  preScore: number;
  postScore: number;
  preAnswers: Record<string, string>;
  postAnswers: Record<string, string>;
}
