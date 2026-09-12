import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import GlobeCanvas from '@/components/GlobeCanvas';
import CrisisCardView from '@/components/CrisisCardView';
import KnowledgeQuizModal from '@/components/KnowledgeQuizModal';
import EventCardModal from '@/components/EventCardModal';
import VictoryReportModal from '@/components/VictoryReportModal';
import { CRISES_DATA } from '@/game/crisesData';
import { PlayerResources, DecisionOption, FinalRank, RevenueOpportunity, RiskContract, MarketOffer } from '@/game/types';
import type { CrisisImpact } from '@/game/scene';
import { sounds } from '@/game/soundEffects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertOctagon,
  BookOpen,
  CheckCircle2,
  Coins,
  Crosshair,
  DollarSign,
  FlaskConical,
  Gamepad2,
  Gauge,
  HandCoins,
  Heart,
  HelpCircle,
  Infinity as InfinityIcon,
  Leaf,
  Map as MapIcon,
  RotateCcw,
  Recycle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Timer,
  X,
  Users,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';

const REVENUE_OPPORTUNITIES: RevenueOpportunity[] = [
  { id: 'green-bonds', title: 'Emitir Títulos Verdes', description: 'Capte investimento privado para financiar adaptação climática com metas transparentes.', tag: 'mercado', rewardFinance: 340, costXP: 70, deltaPopulation: 20, deltaSustainability: 8 },
  { id: 'science-grant', title: 'Bolsa de Inovação Científica', description: 'Converta dados da simulação em pesquisa aplicada e atraia um fundo de ciência aberta.', tag: 'ciência', rewardFinance: 260, costXP: 45, deltaPopulation: 10, deltaSustainability: 12 },
  { id: 'community-coop', title: 'Cooperativa de Resiliência', description: 'Gere renda local com monitoramento, manutenção e serviços prestados pela comunidade.', tag: 'comunidade', rewardFinance: 220, costXP: 30, deltaPopulation: 55, deltaSustainability: 10 },
  { id: 'circular-economy', title: 'Economia Circular de Emergência', description: 'Transforme resíduos e materiais recuperados em recursos para a próxima resposta.', tag: 'natureza', rewardFinance: 180, costXP: 25, deltaPopulation: 15, deltaSustainability: 24 },
  { id: 'parametric-insurance', title: 'Seguro Paramétrico Climático', description: 'Antecipe liquidez com uma apólice acionada automaticamente quando os sensores confirmarem o evento.', tag: 'mercado', rewardFinance: 420, costXP: 95, deltaPopulation: 25, deltaSustainability: 6 },
  { id: 'open-data-license', title: 'Licença de Dados Abertos', description: 'Compartilhe inteligência territorial com universidades e atraia royalties para a operação.', tag: 'ciência', rewardFinance: 380, costXP: 80, deltaPopulation: 15, deltaSustainability: 16 },
];

const OPPORTUNITY_ICONS = { mercado: HandCoins, ciência: FlaskConical, comunidade: Sparkles, natureza: Recycle };

const RISK_CONTRACTS: RiskContract[] = [
  { id: 'rapid-response', title: 'Corredor de Resposta Rápida', brief: 'Proteja uma área crítica antes que a próxima onda de risco atinja o território.', stake: 120, reward: 520, threshold: 170, penaltyFinance: 220, penaltyLives: 1, penaltySustainability: 6 },
  { id: 'resilience-bond', title: 'Bônus de Resiliência Territorial', brief: 'Prometa um salto de sustentabilidade e atraia capital paciente para a operação.', stake: 180, reward: 760, threshold: 210, penaltyFinance: 300, penaltyLives: 0, penaltySustainability: 14 },
  { id: 'global-challenge', title: 'Desafio Global de Inovação', brief: 'Concorra com outras cidades por um prêmio internacional de adaptação climática.', stake: 90, reward: 430, threshold: 135, penaltyFinance: 160, penaltyLives: 0, penaltySustainability: 10 },
  { id: 'all-in-resilience', title: 'Pacto All-in de Resiliência', brief: 'Aposte uma reserva massiva em uma transformação territorial de alto risco e alto retorno.', stake: 680, reward: 1850, threshold: 300, penaltyFinance: 520, penaltyLives: 1, penaltySustainability: 20 },
];

const MARKET_OFFERS: MarketOffer[] = [
  { id: 'water-tech', title: 'Tecnologia Hídrica', sector: 'ÁGUA', basePrice: 180, volatility: 34, returnRate: 1.82, deltaSustainability: 8 },
  { id: 'clean-energy', title: 'Energia Limpa', sector: 'ENERGIA', basePrice: 240, volatility: 48, returnRate: 1.72, deltaSustainability: 14 },
  { id: 'agro-resilience', title: 'Agrofloresta Resiliente', sector: 'ALIMENTOS', basePrice: 150, volatility: 28, returnRate: 1.95, deltaSustainability: 18 },
  { id: 'early-warning', title: 'Sensores de Alerta', sector: 'DADOS', basePrice: 110, volatility: 20, returnRate: 2.1, deltaSustainability: 7 },
  { id: 'climate-credit', title: 'Créditos de Carbono Comunitários', sector: 'CLIMA', basePrice: 195, volatility: 42, returnRate: 2.18, deltaSustainability: 22 },
  { id: 'resilient-housing', title: 'Habitação Adaptada', sector: 'CIDADES', basePrice: 260, volatility: 55, returnRate: 1.88, deltaSustainability: 16 },
];

const getMarketPrice = (offer: MarketOffer, round: number, index: number) =>
  Math.max(60, Math.round(offer.basePrice + Math.sin(round * 1.7 + index * 1.9) * offer.volatility));

type ActionFeedback = {
  title: string;
  detail: string;
  finance: number;
  population: number;
  sustainability: number;
  lives: number;
  xp: number;
  synergy?: string;
};

type GameMode = 'campaign' | 'survival' | 'sandbox' | 'speedrun';

const MODE_DETAILS: Record<GameMode, { title: string; subtitle: string; description: string; icon: typeof Crosshair; accent: string }> = {
  campaign: { title: 'Campanha', subtitle: '19 crises · progressão guiada', description: 'A sequência completa de crises, com economia, contratos e consequências persistentes.', icon: Crosshair, accent: 'cyan' },
  survival: { title: 'Survival', subtitle: 'infinito · dificuldade crescente', description: 'Sobreviva enquanto novas rodadas aumentam a pressão e os eventos ficam mais severos.', icon: InfinityIcon, accent: 'rose' },
  sandbox: { title: 'Sandbox', subtitle: 'recursos livres · teste estratégias', description: 'Experimente decisões, cartas e investimentos com recursos amplificados e sem fim de campanha.', icon: Gamepad2, accent: 'emerald' },
  speedrun: { title: 'Speedrun', subtitle: '10 crises · tempo mínimo', description: 'Resolva um circuito curto e intenso. Cada decisão conta para o seu tempo final.', icon: Timer, accent: 'amber' },
};

const getCrisisDeck = (mode: GameMode) => mode === 'speedrun' ? CRISES_DATA.slice(0, 10) : mode === 'survival' ? [...CRISES_DATA].reverse() : CRISES_DATA;

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>('campaign');
  const [gameStarted, setGameStarted] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  // PDR Initial Resources (Item 7):
  // Finanças: 1000 | População: 100 | Sustentabilidade: 50 | Vidas: 3 | XP: 0
  const buildInitialResources = (mode: GameMode): PlayerResources => ({
    finance: mode === 'sandbox' ? 100000 : 1000,
    populationProtected: mode === 'sandbox' ? 1000 : 100,
    sustainability: mode === 'sandbox' ? 100 : 50,
    lives: mode === 'sandbox' ? 99 : 3,
    xp: 0,
    round: 1
  });
  const initialResources = buildInitialResources(gameMode);

  const [resources, setResources] = useState<PlayerResources>(initialResources);
  const [currentCrisisIdx, setCurrentCrisisIdx] = useState<number>(0);
  const [impacts, setImpacts] = useState<CrisisImpact[]>([]);
  const [decisionHistory, setDecisionHistory] = useState<Array<{ crisisId: string; crisisName: string; action: string; balance: number; result: string }>>([]);
  const [claimedOpportunities, setClaimedOpportunities] = useState<string[]>([]);
  const [activeContract, setActiveContract] = useState<RiskContract | null>(null);
  const [resolvedContracts, setResolvedContracts] = useState<string[]>([]);
  const [marketPurchases, setMarketPurchases] = useState<string[]>([]);
  const [activeModule, setActiveModule] = useState<'map' | 'economy' | 'decisions'>(() => {
    if (typeof window === 'undefined') return 'decisions';
    const stored = window.localStorage.getItem('geocrisis:last-module');
    return stored === 'map' || stored === 'economy' || stored === 'decisions' ? stored : 'decisions';
  });
  const [moduleTransition, setModuleTransition] = useState(0);
  const [financeHistory, setFinanceHistory] = useState<Array<{ round: number; finance: number; delta: number; label: string }>>([
    { round: 1, finance: 1000, delta: 0, label: 'Base' },
  ]);
  const [actionFeedback, setActionFeedback] = useState<ActionFeedback | null>(null);
  const [lastDecisionCategory, setLastDecisionCategory] = useState<DecisionOption['category'] | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals state
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
  const [knowledgeCompletedForCurrent, setKnowledgeCompletedForCurrent] = useState(false);
  const [activeEvent, setActiveEvent] = useState<any | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [speedrunSeconds, setSpeedrunSeconds] = useState(0);

  useEffect(() => {
    if (!gameStarted || gameMode !== 'speedrun' || isGameOver) return;
    const timer = window.setInterval(() => setSpeedrunSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [gameStarted, gameMode, isGameOver]);

  // AutoPilot / Demo mode query parameter support
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === '1' || params.get('demo') === 'true') {
      setGameStarted(true);
      const demoTimer = setTimeout(() => {
        // Automatically make a balanced decision in demo mode
        const firstOpt = CRISES_DATA[0].options[0];
        handleSelectDecision(firstOpt);
      }, 2500);
      return () => clearTimeout(demoTimer);
    }
  }, []);

  const crisisDeck = getCrisisDeck(gameMode);
  const currentCrisis = crisisDeck[currentCrisisIdx % crisisDeck.length];

  const startGame = (mode: GameMode) => {
    sounds.playClick();
    setGameMode(mode);
    setGameStarted(true);
    setResources(buildInitialResources(mode));
    setCurrentCrisisIdx(0);
    setImpacts([]);
    setDecisionHistory([]);
    setClaimedOpportunities([]);
    setActiveContract(null);
    setResolvedContracts([]);
    setMarketPurchases([]);
    setFinanceHistory([{ round: 1, finance: mode === 'sandbox' ? 100000 : 1000, delta: 0, label: 'Base' }]);
    setActionFeedback(null);
    setLastDecisionCategory(null);
    setIsGameOver(false);
    setSpeedrunSeconds(0);
    setActiveModule('decisions');
  };

  const openTutorial = () => {
    sounds.playClick();
    setTutorialOpen(true);
  };

  const switchModule = (module: 'map' | 'economy' | 'decisions') => {
    if (module === activeModule) return;
    setModuleTransition((prev) => prev + 1);
    setActiveModule(module);
  };

  useEffect(() => {
    window.localStorage.setItem('geocrisis:last-module', activeModule);
  }, [activeModule]);

  const recordFinance = (nextFinance: number, label: string) => {
    setFinanceHistory((prev) => {
      const last = prev[prev.length - 1];
      return [...prev, { round: resources.round, finance: nextFinance, delta: nextFinance - last.finance, label }].slice(-12);
    });
  };

  const handleToggleSound = () => {
    sounds.enabled = !soundEnabled;
    if (soundEnabled) sounds.stopMusic();
    setSoundEnabled(!soundEnabled);
  };

  const handleRevenueOpportunity = (opportunity: RevenueOpportunity) => {
    if (claimedOpportunities.includes(opportunity.id)) return;
    if (resources.xp < opportunity.costXP) {
      sounds.playWarning();
      return;
    }
    sounds.playSuccess();
    setClaimedOpportunities((prev) => [...prev, opportunity.id]);
    recordFinance(resources.finance + opportunity.rewardFinance, opportunity.title);
    setResources((prev) => ({
      ...prev,
      finance: prev.finance + opportunity.rewardFinance,
      xp: prev.xp - opportunity.costXP,
      populationProtected: prev.populationProtected + opportunity.deltaPopulation,
      sustainability: Math.max(0, prev.sustainability + opportunity.deltaSustainability),
    }));
  };

  const handleSelectContract = (contract: RiskContract) => {
    if (activeContract || resolvedContracts.includes(contract.id) || resources.finance < contract.stake) {
      sounds.playWarning();
      return;
    }
    sounds.playAlarm();
    setActiveContract(contract);
    recordFinance(resources.finance - contract.stake, `Entrada · ${contract.title}`);
    setResources((prev) => ({ ...prev, finance: prev.finance - contract.stake }));
  };

  const handleMarketBuy = (offer: MarketOffer, price: number) => {
    const purchaseKey = `${resources.round}-${offer.id}`;
    if (marketPurchases.includes(purchaseKey) || resources.finance < price) {
      sounds.playWarning();
      return;
    }
    const payout = Math.round(price * offer.returnRate);
    sounds.playSuccess();
    setMarketPurchases((prev) => [...prev, purchaseKey]);
    recordFinance(resources.finance - price + payout, offer.title);
    setResources((prev) => ({
      ...prev,
      finance: prev.finance - price + payout,
      sustainability: Math.max(0, prev.sustainability + offer.deltaSustainability),
    }));
  };

  const resolveRiskContract = (balance: number) => {
    if (!activeContract) return;
    const contract = activeContract;
    const success = balance >= contract.threshold;
    const nextFinance = success ? resources.finance + contract.reward : Math.max(0, resources.finance - contract.penaltyFinance);
    recordFinance(nextFinance, success ? `Sucesso · ${contract.title}` : `Falha · ${contract.title}`);
    setResources((prev) => ({
      ...prev,
      finance: success ? prev.finance + contract.reward : Math.max(0, prev.finance - contract.penaltyFinance),
      lives: success ? prev.lives : Math.max(0, prev.lives - contract.penaltyLives),
      sustainability: success ? prev.sustainability + 4 : Math.max(0, prev.sustainability - contract.penaltySustainability),
    }));
    setResolvedContracts((prev) => [...prev, contract.id]);
    setActiveContract(null);
  };

  const handleSelectDecision = (option: DecisionOption) => {
    const synergyActive = Boolean(lastDecisionCategory && lastDecisionCategory !== option.category);
    const synergyBonus = synergyActive ? 45 : 0;
    const synergyPopulation = synergyActive ? 35 : 0;
    const survivalPressure = gameMode === 'survival' ? Math.min(220, Math.floor(resources.round / 3) * 10) : 0;
    const newFinance = Math.max(0, resources.finance - option.costFinance - survivalPressure);
    const newPop = resources.populationProtected + option.deltaPopulation + synergyPopulation;
    const newSust = Math.max(0, resources.sustainability + option.deltaSustainability + (synergyActive ? 8 : 0));
    const newXP = resources.xp + option.deltaXP;

    setResources((prev) => ({
      ...prev,
      finance: newFinance,
      populationProtected: newPop,
      sustainability: newSust,
      xp: newXP
    }));

    const balance = option.deltaPopulation + option.deltaSustainability * 2 + option.deltaXP / 2 - option.costFinance / 3 + synergyBonus;
    const result = balance >= 180 ? 'Recuperação forte' : balance >= 90 ? 'Equilíbrio positivo' : 'Resposta de alto custo';
    const feedback: ActionFeedback = {
      title: synergyActive ? 'Sinergia ativada' : 'Decisão executada',
      detail: synergyActive ? 'A combinação de frentes diferentes criou uma resposta multissetorial mais eficiente.' : 'A operação foi aplicada ao território e seus efeitos já aparecem no painel.',
      finance: -(option.costFinance + survivalPressure),
      population: option.deltaPopulation + synergyPopulation,
      sustainability: option.deltaSustainability + (synergyActive ? 8 : 0),
      lives: 0,
      xp: option.deltaXP,
      synergy: synergyActive ? '+45 equilíbrio · +35 população · +8 sustentabilidade' : undefined,
    };
    setActionFeedback(feedback);
    if (synergyActive) {
      confetti({ particleCount: 35, spread: 55, startVelocity: 22, colors: ['#34d399', '#fbbf24', '#38bdf8'], origin: { x: 0.78, y: 0.72 } });
    }
    window.setTimeout(() => setActionFeedback(null), 3200);
    setLastDecisionCategory(option.category);
    recordFinance(newFinance, currentCrisis.name);
    resolveRiskContract(balance);
    setImpacts((prev) => [
      ...prev.filter((impact) => impact.crisisId !== currentCrisis.id),
      { crisisId: currentCrisis.id, balance, label: result },
    ]);
    setDecisionHistory((prev) => [
      ...prev,
      { crisisId: currentCrisis.id, crisisName: currentCrisis.name, action: option.title, balance, result },
    ]);

    // Check unexpected event (Carta de Evento - PDR item 8)
    const shouldTriggerEvent = Math.random() < Math.min(0.9, 0.65 + (gameMode === 'survival' ? resources.round * 0.01 : 0));
    if (shouldTriggerEvent && currentCrisis.unexpectedEvent) {
      sounds.playAlarm();
      setActiveEvent(currentCrisis.unexpectedEvent);
    } else {
      advanceRound();
    }
  };

  const handleAcknowledgeEvent = () => {
    if (!activeEvent) return;

    setResources((prev) => {
      const impact = activeEvent.impact;
      const updatedLives = prev.lives + (impact.lives || 0);
      return {
        ...prev,
        finance: Math.max(0, prev.finance + (impact.finance || 0)),
        populationProtected: Math.max(0, prev.populationProtected + (impact.population || 0)),
        sustainability: Math.max(0, prev.sustainability + (impact.sustainability || 0)),
        lives: Math.max(0, updatedLives)
      };
    });

    const eventImpact = activeEvent.impact;
    setActionFeedback({
      title: 'Evento resolvido',
      detail: activeEvent.title,
      finance: eventImpact.finance || 0,
      population: eventImpact.population || 0,
      sustainability: eventImpact.sustainability || 0,
      lives: eventImpact.lives || 0,
      xp: 0,
    });
    window.setTimeout(() => setActionFeedback(null), 3200);

    setActiveEvent(null);
    advanceRound();
  };

  const advanceRound = () => {
    if (resources.lives <= 0) {
      setIsGameOver(true);
    } else if (gameMode === 'survival') {
      setCurrentCrisisIdx((prev) => (prev + 1) % crisisDeck.length);
      setKnowledgeCompletedForCurrent(false);
      setResources((prev) => ({ ...prev, round: prev.round + 1 }));
    } else if (currentCrisisIdx >= crisisDeck.length - 1) {
      setIsGameOver(true);
    } else {
      setCurrentCrisisIdx((prev) => prev + 1);
      setKnowledgeCompletedForCurrent(false);
      setResources((prev) => ({ ...prev, round: prev.round + 1 }));
    }
  };

  const handleKnowledgeSuccess = () => {
    setResources((prev) => ({ ...prev, xp: prev.xp + 100 }));
    setKnowledgeCompletedForCurrent(true);
  };

  const handleRestartGame = () => {
    setResources(initialResources);
    setCurrentCrisisIdx(0);
    setKnowledgeCompletedForCurrent(false);
    setImpacts([]);
    setDecisionHistory([]);
    setFinanceHistory([{ round: 1, finance: initialResources.finance, delta: 0, label: 'Base' }]);
    setLastDecisionCategory(null);
    setActionFeedback(null);
    setClaimedOpportunities([]);
    setActiveContract(null);
    setResolvedContracts([]);
    setMarketPurchases([]);
    setIsGameOver(false);
    setSpeedrunSeconds(0);
    sounds.playClick();
  };

  const returnToMenu = () => {
    sounds.playClick();
    setGameStarted(false);
    setIsGameOver(false);
  };

  // Calculate Total Score (Item 10 and 11 do PDR)
  const totalScore = resources.populationProtected + resources.sustainability * 2 + resources.xp + resources.finance / 2;
  const playerLevel = 1 + Math.floor(resources.xp / 250);
  const nextLevelXP = (playerLevel * 250) - resources.xp;

  let finalRank: FinalRank = 'Gestor Iniciante 🥉';
  if (totalScore >= 2000) finalRank = 'Líder Global 🌎';
  else if (totalScore >= 1500) finalRank = 'Gestor Expert 🥇';
  else if (totalScore >= 1000) finalRank = 'Gestor em Desenvolvimento 🥈';

  const chartMin = Math.min(...financeHistory.map((point) => point.finance), 0);
  const chartMax = Math.max(...financeHistory.map((point) => point.finance), 1000);
  const chartRange = Math.max(1, chartMax - chartMin);
  const chartPoints = financeHistory.map((point, index) => {
    const x = financeHistory.length === 1 ? 20 : 20 + (index / (financeHistory.length - 1)) * 340;
    const y = 112 - ((point.finance - chartMin) / chartRange) * 92;
    return `${x},${y}`;
  }).join(' ');

  if (!gameStarted) {
    return (
      <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-100 tactical-grid">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 lg:px-10 lg:py-10">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-emerald-400 text-xl shadow-lg shadow-cyan-500/25">🌍</span>
              <div><p className="text-lg font-black tracking-tight text-white">GeoCrisis</p><p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">Centro de comando planetário</p></div>
            </div>
            <button type="button" onClick={openTutorial} className="flex items-center gap-2 rounded-xl border border-sky-800/70 bg-slate-950/60 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-400/70 hover:text-white"><BookOpen className="h-4 w-4 text-cyan-300" /> Como jogar</button>
          </header>

          <main className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-200"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Simulação online · Terra em estado crítico</div>
              <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl">Decida o futuro.<br /><span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent">Proteja o mundo.</span></h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400">Você lidera uma central de resposta global. Equilibre economia, população e sustentabilidade enquanto crises reais se encadeiam no mapa.</p>
              <div className="mt-8 grid grid-cols-3 gap-2 text-center text-[10px] font-mono uppercase tracking-wider text-slate-500"><div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"><strong className="block text-lg text-cyan-300">19</strong>crises</div><div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"><strong className="block text-lg text-amber-300">4</strong>modos</div><div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"><strong className="block text-lg text-emerald-300">∞</strong>estratégias</div></div>
            </section>

            <section className="glass-panel rounded-3xl border border-sky-900/60 p-4 shadow-2xl shadow-cyan-950/20 sm:p-6">
              <div className="mb-5 flex items-end justify-between"><div><p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">Selecione a operação</p><h2 className="mt-1 text-xl font-bold text-white">Escolha seu modo de jogo</h2></div><span className="text-[10px] font-mono text-slate-600">v2.4 / COMMAND</span></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(Object.keys(MODE_DETAILS) as GameMode[]).map((mode) => {
                  const details = MODE_DETAILS[mode];
                  const Icon = details.icon;
                  const selected = gameMode === mode;
                  return <button key={mode} type="button" onClick={() => setGameMode(mode)} className={`group rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-1 ${selected ? 'border-cyan-400/70 bg-cyan-400/10 shadow-lg shadow-cyan-500/10' : 'border-slate-800 bg-slate-950/60 hover:border-slate-600'}`}><div className="flex items-start justify-between"><span className={`rounded-xl p-2 ${selected ? 'bg-cyan-400/15 text-cyan-200' : 'bg-slate-800/70 text-slate-400'}`}><Icon className="h-5 w-5" /></span>{selected && <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[9px] font-mono uppercase text-emerald-300">selecionado</span>}</div><p className="mt-4 font-bold text-white">{details.title}</p><p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-cyan-300/80">{details.subtitle}</p><p className="mt-3 text-xs leading-relaxed text-slate-400">{details.description}</p></button>;
                })}
              </div>
              <Button onClick={() => startGame(gameMode)} className="mt-5 h-12 w-full gap-2 bg-gradient-to-r from-cyan-500 to-sky-500 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-sky-400"><Crosshair className="h-4 w-4" /> Iniciar {MODE_DETAILS[gameMode].title}</Button>
            </section>
          </main>
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/70 pt-4 text-[10px] font-mono uppercase tracking-wider text-slate-600"><span>Conhecer o mundo é o primeiro passo.</span><span>Dados · ciência · estratégia</span></footer>
        </div>

        {tutorialOpen && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"><div className="w-full max-w-3xl rounded-3xl border border-cyan-800/60 bg-slate-950 p-6 shadow-2xl shadow-cyan-950/40"><div className="flex items-start justify-between"><div><p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">Protocolo de iniciação</p><h2 className="mt-1 text-2xl font-bold text-white">Como jogar GeoCrisis</h2></div><button type="button" onClick={() => setTutorialOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white"><X className="h-5 w-5" /></button></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-sky-900/60 bg-sky-950/20 p-4"><span className="text-2xl">01</span><p className="mt-3 font-bold text-white">Leia o território</p><p className="mt-1 text-xs leading-relaxed text-slate-400">Use o Mapa para localizar cada crise e entender seus conceitos geográficos.</p></div><div className="rounded-2xl border border-amber-900/60 bg-amber-950/20 p-4"><span className="text-2xl">02</span><p className="mt-3 font-bold text-white">Escolha uma carta</p><p className="mt-1 text-xs leading-relaxed text-slate-400">Compare custo, população, sustentabilidade e XP. Categorias diferentes ativam sinergias.</p></div><div className="rounded-2xl border border-emerald-900/60 bg-emerald-950/20 p-4"><span className="text-2xl">03</span><p className="mt-3 font-bold text-white">Construa recursos</p><p className="mt-1 text-xs leading-relaxed text-slate-400">Na Economia, resgate oportunidades, aceite contratos e invista no mercado dinâmico.</p></div><div className="rounded-2xl border border-rose-900/60 bg-rose-950/20 p-4"><span className="text-2xl">04</span><p className="mt-3 font-bold text-white">Aceite os eventos</p><p className="mt-1 text-xs leading-relaxed text-slate-400">Crises inesperadas mudam o cenário. Preserve vidas e mantenha o equilíbrio do sistema.</p></div></div><Button onClick={() => setTutorialOpen(false)} className="mt-6 w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400">Entendi, iniciar operação</Button></div></div>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none tactical-grid">
      {/* Top Tactical Status Bar (Recursos - PDR Item 7) */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-sky-900/60 px-4 py-2.5 shadow-[0_10px_35px_rgba(2,6,23,0.55)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo and Subtitle */}
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/25 text-lg ring-1 ring-white/15">
              🌍
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black tracking-tight text-white text-base">GeoCrisis</h1>
                <Badge variant="outline" className="border-sky-500/40 text-sky-400 bg-sky-950/40 text-[10px] py-0">
                  Simulador de Decisões Reais
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Conhecer o mundo é o primeiro passo. Saber agir é o desafio.
              </p>
            </div>
          </div>

          {/* Resources Dashboard (Item 7) */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {/* Finance */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-amber-500/30 text-amber-300 shadow-inner shadow-amber-500/5">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">Finanças</span>
                <span className="font-bold">{resources.finance} pts</span>
              </div>
            </div>

            {/* Protected Population */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-sky-500/30 text-sky-300 shadow-inner shadow-sky-500/5">
              <Users className="w-4 h-4 text-sky-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">População</span>
                <span className="font-bold">{resources.populationProtected} pts</span>
              </div>
            </div>

            {/* Sustainability */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-emerald-500/30 text-emerald-300 shadow-inner shadow-emerald-500/5">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">Sustentabilidade</span>
                <span className="font-bold">{resources.sustainability} pts</span>
              </div>
            </div>

            {/* Lives / Response Capacity */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-rose-500/30 text-rose-300 shadow-inner shadow-rose-500/5">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">Capacidade</span>
                <span className="font-bold">{resources.lives} Vidas</span>
              </div>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-purple-500/30 text-purple-300 shadow-inner shadow-purple-500/5">
              <Zap className="w-4 h-4 text-purple-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">XP</span>
                <span className="font-bold">{resources.xp} XP · Nível {playerLevel}</span>
                <span className="block text-[9px] text-purple-300/70">{nextLevelXP > 0 ? `${nextLevelXP} XP para o próximo nível` : 'Novo nível disponível'}</span>
              </div>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            <span className="hidden rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-cyan-300 sm:inline-flex">{MODE_DETAILS[gameMode].title}</span>
            {gameMode === 'speedrun' && <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-mono text-amber-200">{String(Math.floor(speedrunSeconds / 60)).padStart(2, '0')}:{String(speedrunSeconds % 60).padStart(2, '0')}</span>}
            <Button
              size="icon"
              variant="ghost"
              onClick={returnToMenu}
              title="Voltar ao menu"
              className="h-8 w-8 text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleToggleSound}
              className="h-8 w-8 text-slate-400 hover:text-white"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      <aside className="fixed bottom-5 left-5 top-24 z-30 hidden w-16 flex-col items-center justify-between rounded-2xl border border-sky-900/60 bg-slate-950/85 py-4 shadow-2xl shadow-slate-950/50 backdrop-blur-xl lg:flex">
        <div className="flex flex-col items-center gap-3">
          <span className="mb-2 text-[9px] font-black tracking-[0.25em] text-sky-400 [writing-mode:vertical-rl]">COMMAND</span>
          {[
            { id: 'map' as const, label: 'Mapa', icon: MapIcon },
            { id: 'economy' as const, label: 'Economia', icon: Coins },
            { id: 'decisions' as const, label: 'Decisões', icon: Crosshair },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeModule === item.id;
            return <button key={item.id} type="button" onClick={() => switchModule(item.id)} title={item.label} className={`group flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 ${active ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-200 shadow-lg shadow-cyan-500/10' : 'border-transparent text-slate-500 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-200'}`}><Icon className="h-4 w-4 transition-transform group-hover:scale-110" /></button>;
          })}
        </div>
        <span className="text-[9px] font-mono text-slate-600 [writing-mode:vertical-rl]">GEOCRISIS</span>
      </aside>

      {/* Main Command Center Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 lg:pl-28 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <nav className="col-span-full flex gap-2 overflow-x-auto rounded-2xl border border-sky-900/60 bg-slate-950/65 p-2 backdrop-blur-xl lg:hidden">
          {[
            { id: 'map' as const, label: 'Mapa', icon: MapIcon, hint: 'Globo e crises' },
            { id: 'economy' as const, label: 'Economia', icon: Coins, hint: 'Recursos e mercado' },
            { id: 'decisions' as const, label: 'Decisões', icon: Crosshair, hint: 'Cartas e ciência' },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeModule === item.id;
            return <button key={item.id} type="button" onClick={() => switchModule(item.id)} className={`flex min-w-[125px] flex-1 items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all ${active ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-100' : 'border-transparent text-slate-500 hover:bg-slate-900'}`}><Icon className="h-4 w-4" /><span><strong className="block text-xs">{item.label}</strong><small className="block text-[9px] text-slate-500">{item.hint}</small></span></button>;
          })}
        </nav>

        <div className="col-span-full flex items-center justify-between rounded-xl border border-sky-900/40 bg-slate-950/40 px-3 py-2 text-[10px] font-mono text-slate-500">
          <span className="uppercase tracking-[0.2em] text-sky-300">MÓDULO ATIVO · {activeModule === 'map' ? 'MAPA OPERACIONAL' : activeModule === 'economy' ? 'ECONOMIA DE RESILIÊNCIA' : 'DECISÕES E CIÊNCIA'}</span>
          <span>{gameMode === 'survival' ? `RODADA ${resources.round}` : `FASE ${currentCrisisIdx + 1}/${crisisDeck.length}`}</span>
        </div>
        {/* Left Side: 3D Globe & Spatial Information */}
        <section key={`module-left-${moduleTransition}`} className={`${activeModule === 'decisions' ? 'hidden' : 'lg:col-span-12'} flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500`}>
          <div className={`${activeModule !== 'map' ? 'hidden' : ''} h-[440px] w-full`}>
            <GlobeCanvas activeCrisisId={currentCrisis.id} impacts={impacts} />
          </div>

          <div className={`${activeModule !== 'map' ? 'hidden' : ''} glass-panel rounded-2xl border border-cyan-900/60 p-4`}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300"><Gauge className="h-3.5 w-3.5" /> Operação em curso</div>
                <p className="mt-1 text-sm font-semibold text-white">Responda à crise com estratégia</p>
              </div>
              <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-mono text-cyan-200">{gameMode === 'survival' ? `RODADA ${resources.round}` : `FASE ${currentCrisisIdx + 1}/${crisisDeck.length}`}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 transition-all duration-700" style={{ width: `${gameMode === 'survival' ? Math.min(100, ((resources.round % 10) / 10) * 100) : ((currentCrisisIdx + 1) / crisisDeck.length) * 100}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>{decisionHistory.length} decisões registradas</span>
              <span>{resources.lives > 0 ? 'Capacidade operacional estável' : 'Capacidade esgotada'}</span>
            </div>
          </div>

          <details open className={`${activeModule !== 'economy' ? 'hidden' : ''} group rounded-2xl border border-amber-900/50 bg-slate-950/30 p-3 shadow-inner shadow-amber-950/10`}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-1 py-1 marker:hidden">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300"><DollarSign className="h-3.5 w-3.5" /> Finanças & estratégia</div>
                <p className="mt-1 text-xs text-slate-400">Receitas, contratos e investimentos da rodada</p>
              </div>
              <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-1 text-[9px] font-mono text-amber-200 transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <div className="mt-3 flex flex-col gap-3">
              <div className="rounded-2xl border border-amber-500/20 bg-slate-950/65 p-3 animate-in fade-in zoom-in-95 duration-500">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-300">Fluxo financeiro</p>
                    <p className="mt-1 text-xs text-slate-400">Histórico de ganhos e perdas da operação</p>
                  </div>
                  <span className="text-right font-mono text-[10px] text-amber-200">Atual<br /><strong className="text-sm">{resources.finance}</strong></span>
                </div>
                <svg viewBox="0 0 380 132" className="h-32 w-full overflow-visible" role="img" aria-label="Gráfico histórico de finanças">
                  <defs>
                    <linearGradient id="finance-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="20" x2="360" y1="112" y2="112" stroke="#334155" strokeWidth="1" />
                  <line x1="20" x2="360" y1="66" y2="66" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 5" />
                  <polyline points={`${chartPoints} 360,112 20,112`} fill="url(#finance-fill)" stroke="none" />
                  <polyline points={chartPoints} fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-700" />
                  {financeHistory.map((point, index) => {
                    const x = financeHistory.length === 1 ? 20 : 20 + (index / (financeHistory.length - 1)) * 340;
                    const y = 112 - ((point.finance - chartMin) / chartRange) * 92;
                    return <circle key={`${point.round}-${index}`} cx={x} cy={y} r="3.5" fill={point.delta >= 0 ? '#34d399' : '#fb7185'} stroke="#0f172a" strokeWidth="2" />;
                  })}
                </svg>
                <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-slate-500"><span>Base: {financeHistory[0]?.finance ?? 0}</span><span>{financeHistory.length - 1} movimentações</span><span className={resources.finance >= (financeHistory[0]?.finance ?? 0) ? 'text-emerald-300' : 'text-rose-300'}>{resources.finance >= (financeHistory[0]?.finance ?? 0) ? 'saldo positivo' : 'saldo negativo'}</span></div>
              </div>
          <div className="glass-panel rounded-2xl border border-amber-900/60 p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300"><DollarSign className="h-3.5 w-3.5" /> Economia de resiliência</div>
                <p className="mt-1 text-sm font-semibold text-white">Crie recursos sem abandonar seus valores</p>
              </div>
              <Sparkles className="reward-float h-5 w-5 text-amber-300" />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {REVENUE_OPPORTUNITIES.map((opportunity) => {
                const Icon = OPPORTUNITY_ICONS[opportunity.tag];
                const claimed = claimedOpportunities.includes(opportunity.id);
                const affordable = resources.xp >= opportunity.costXP;
                return (
                  <button
                    key={opportunity.id}
                    type="button"
                    disabled={claimed}
                    onClick={() => handleRevenueOpportunity(opportunity)}
                    className={`group rounded-xl border p-3 text-left transition-all duration-200 ${claimed ? 'border-emerald-500/30 bg-emerald-950/20 opacity-70' : affordable ? 'border-slate-800 bg-slate-950/60 hover:-translate-y-0.5 hover:border-amber-500/60 hover:bg-amber-950/20' : 'border-slate-800/70 bg-slate-950/40 opacity-60'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`rounded-lg p-1.5 ${claimed ? 'bg-emerald-400/10 text-emerald-300' : 'bg-amber-400/10 text-amber-300'}`}><Icon className="h-4 w-4" /></span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">{opportunity.tag}</span>
                    </div>
                    <p className="mt-2 text-xs font-bold text-white">{opportunity.title}</p>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-slate-400">{opportunity.description}</p>
                    <div className="mt-2 flex items-center justify-between border-t border-slate-800 pt-2 text-[10px] font-mono">
                      <span className="text-amber-300">+{opportunity.rewardFinance} fin.</span>
                      <span className={claimed ? 'text-emerald-300' : affordable ? 'text-purple-300' : 'text-rose-300'}>{claimed ? 'RESGATADO' : `-${opportunity.costXP} XP`}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-rose-900/60 p-4 animate-in fade-in slide-in-from-left-2 duration-500">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-rose-300"><ShieldCheck className="h-3.5 w-3.5" /> Contratos de risco</div>
                <p className="mt-1 text-sm font-semibold text-white">Aposte alto. Responda melhor.</p>
              </div>
              {activeContract ? <span className="animate-pulse rounded-full border border-rose-400/40 bg-rose-400/10 px-2 py-1 text-[9px] font-mono text-rose-200">EM EXECUÇÃO</span> : <span className="text-[10px] font-mono text-slate-500">1 contrato por vez</span>}
            </div>
            <div className="grid gap-2">
              {RISK_CONTRACTS.map((contract) => {
                const resolved = resolvedContracts.includes(contract.id);
                const selected = activeContract?.id === contract.id;
                const available = !activeContract && !resolved && resources.finance >= contract.stake;
                return (
                  <button
                    key={contract.id}
                    type="button"
                    disabled={resolved || selected}
                    onClick={() => handleSelectContract(contract)}
                    className={`group rounded-xl border p-3 text-left transition-all duration-300 ${selected ? 'border-rose-400 bg-rose-950/40 shadow-lg shadow-rose-950/40' : resolved ? 'border-emerald-500/20 bg-emerald-950/10 opacity-55' : available ? 'border-slate-800 bg-slate-950/55 hover:-translate-y-0.5 hover:border-rose-500/60 hover:bg-rose-950/20' : 'border-slate-800/70 bg-slate-950/35 opacity-55'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-white">{contract.title}</span>
                      <span className="font-mono text-[10px] text-amber-300">+{contract.reward} pts</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{contract.brief}</p>
                    <div className="mt-2 flex items-center justify-between border-t border-slate-800 pt-2 text-[10px] font-mono">
                      <span className="text-rose-300">Entrada -{contract.stake}</span>
                      <span className="text-slate-500">Meta +{contract.threshold}</span>
                      <span className={resolved ? 'text-emerald-300' : 'text-rose-400'}>{resolved ? 'RESOLVIDO' : `Falha: -${contract.penaltyFinance}`}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-panel market-live rounded-2xl border border-violet-900/60 p-4 animate-in fade-in slide-in-from-left-2 duration-700">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-violet-300"><TrendingUp className="h-3.5 w-3.5" /> Mercado dinâmico</div>
                <p className="mt-1 text-sm font-semibold text-white">Oportunidades mudam a cada rodada</p>
              </div>
              <span className="rounded-full border border-violet-400/25 bg-violet-400/10 px-2 py-1 text-[9px] font-mono text-violet-200">RODADA {resources.round}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {MARKET_OFFERS.map((offer, index) => {
                const price = getMarketPrice(offer, resources.round, index);
                const purchaseKey = `${resources.round}-${offer.id}`;
                const bought = marketPurchases.includes(purchaseKey);
                const profit = Math.round(price * (offer.returnRate - 1));
                const canBuy = resources.finance >= price && !bought;
                return (
                  <button key={offer.id} type="button" disabled={bought} onClick={() => handleMarketBuy(offer, price)} className={`rounded-xl border p-3 text-left transition-all duration-300 ${bought ? 'border-emerald-500/25 bg-emerald-950/15 opacity-65' : canBuy ? 'border-slate-800 bg-slate-950/55 hover:-translate-y-0.5 hover:border-violet-500/60' : 'border-slate-800/70 bg-slate-950/35 opacity-55'}`}>
                    <div className="flex items-center justify-between text-[9px] font-mono"><span className="text-violet-300">{offer.sector}</span><span className={price <= offer.basePrice ? 'text-emerald-300' : 'text-amber-300'}>{price <= offer.basePrice ? '▼' : '▲'} {price}</span></div>
                    <p className="mt-1 text-xs font-bold text-white">{offer.title}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono"><span className="text-emerald-300">retorno +{profit}</span><span className={bought ? 'text-emerald-300' : 'text-slate-500'}>{bought ? 'ADQUIRIDO' : `risco ±${offer.volatility}`}</span></div>
                  </button>
                );
              })}
            </div>
          </div>
            </div>
          </details>

          <details open className={`${activeModule !== 'map' ? 'hidden' : ''} group rounded-2xl border border-sky-900/50 bg-slate-950/30 p-3`}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-1 py-1 marker:hidden">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-sky-300"><Gauge className="h-3.5 w-3.5" /> Navegação da campanha</div>
                <p className="mt-1 text-xs text-slate-400">Crises catalogadas e histórico de impactos</p>
              </div>
              <span className="rounded-full border border-sky-400/25 bg-sky-400/10 px-2 py-1 text-[9px] font-mono text-sky-200 transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <div className="mt-3 flex flex-col gap-3">
          <div className="glass-panel border border-sky-900/40 rounded-2xl p-4 text-xs font-mono">
            <div className="flex items-center justify-between mb-3 text-slate-300">
              <span className="font-bold uppercase tracking-wider text-sky-400">
                CRISES GLOBAIS CATALOGADAS ({gameMode === 'survival' ? `${resources.round}ª rodada` : `${currentCrisisIdx + 1}/${crisisDeck.length}`})
              </span>
              <span className="text-slate-400">Rodada {resources.round}</span>
            </div>

            <div className="flex flex-col gap-2">
              {CRISES_DATA.map((c, idx) => {
                const isActive = idx === currentCrisisIdx;
                const isPast = idx < currentCrisisIdx;
                return (
                  <div
                    key={c.id}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all ${
                      isActive
                        ? 'border-sky-500 bg-sky-950/60 text-sky-200'
                        : isPast
                        ? 'border-slate-800 bg-slate-950/40 text-slate-500'
                        : 'border-slate-800/60 bg-slate-950/20 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isPast ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-400 animate-ping' : 'bg-slate-600'}`} />}
                      <span className="font-sans font-medium">{c.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{c.category.toUpperCase()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel border border-emerald-900/40 rounded-2xl p-4 text-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold uppercase tracking-wider text-emerald-300">IMPACTO DAS SUAS ESCOLHAS</span>
              <span className="text-slate-500 font-mono">{decisionHistory.length} decisões registradas</span>
            </div>
            {decisionHistory.length === 0 ? (
              <p className="text-slate-500 leading-relaxed">As regiões do globo mudarão de cor depois de cada decisão. Verde indica recuperação; vermelho indica que o risco ainda está alto.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {decisionHistory.slice(-3).reverse().map((item) => (
                  <div key={`${item.crisisId}-${item.action}`} className="rounded-lg bg-slate-950/60 border border-slate-800 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-200 truncate">{item.crisisName}</span>
                      <span className={item.balance >= 0 ? 'text-emerald-400 font-mono' : 'text-rose-400 font-mono'}>{item.balance >= 0 ? '+' : ''}{Math.round(item.balance)}</span>
                    </div>
                    <p className="text-slate-400 mt-1 truncate">{item.action}</p>
                    <span className="text-[10px] text-sky-300">{item.result}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
            </div>
          </details>
        </section>

        {/* Right Side: Active Crisis, Real Science Data, Decision Cards */}
        <section key={`module-right-${moduleTransition}`} className={`${activeModule === 'decisions' ? 'lg:col-span-12 animate-in fade-in slide-in-from-bottom-2 duration-500' : 'hidden'}`}>
          <CrisisCardView
            crisis={currentCrisis}
            resources={resources}
            onSelectDecision={handleSelectDecision}
            onOpenKnowledgeQuiz={() => setIsKnowledgeOpen(true)}
            knowledgeCompleted={knowledgeCompletedForCurrent}
          />
        </section>
      </main>

      {actionFeedback && (
        <div className="fixed bottom-5 right-5 z-50 w-[min(92vw,390px)] animate-in fade-in slide-in-from-bottom-4 duration-300" role="status" aria-live="polite">
          <div className="rounded-2xl border border-cyan-400/40 bg-slate-950/95 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">RESUMO DA RODADA</p>
                <h3 className="mt-1 text-base font-black text-white">{actionFeedback.title}</h3>
              </div>
              <button type="button" onClick={() => setActionFeedback(null)} className="rounded-lg p-1 text-slate-500 hover:bg-slate-800 hover:text-white" aria-label="Fechar resumo"><X className="h-4 w-4" /></button>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{actionFeedback.detail}</p>
            <div className="mt-3 grid grid-cols-5 gap-2 border-t border-slate-800 pt-3 text-center font-mono text-[10px]">
              <div><span className="block text-slate-500">FIN</span><strong className={actionFeedback.finance >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{actionFeedback.finance >= 0 ? '+' : ''}{actionFeedback.finance}</strong></div>
              <div><span className="block text-slate-500">POP</span><strong className={actionFeedback.population >= 0 ? 'text-sky-300' : 'text-rose-300'}>{actionFeedback.population >= 0 ? '+' : ''}{actionFeedback.population}</strong></div>
              <div><span className="block text-slate-500">SUST</span><strong className={actionFeedback.sustainability >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{actionFeedback.sustainability >= 0 ? '+' : ''}{actionFeedback.sustainability}</strong></div>
              <div><span className="block text-slate-500">VIDAS</span><strong className={actionFeedback.lives >= 0 ? 'text-rose-200' : 'text-rose-400'}>{actionFeedback.lives >= 0 ? '+' : ''}{actionFeedback.lives}</strong></div>
              <div><span className="block text-slate-500">XP</span><strong className="text-purple-300">+{actionFeedback.xp}</strong></div>
            </div>
            {actionFeedback.synergy && <div className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-[10px] font-mono text-amber-200">COMBO MULTISSETORIAL · {actionFeedback.synergy}</div>}
          </div>
        </div>
      )}

      {/* Modals for Complete PDR Loop */}
      <KnowledgeQuizModal
        isOpen={isKnowledgeOpen}
        onClose={() => setIsKnowledgeOpen(false)}
        onSuccess={handleKnowledgeSuccess}
        question={currentCrisis.knowledgeQuestion.question}
        options={currentCrisis.knowledgeQuestion.options}
        correctIndex={currentCrisis.knowledgeQuestion.correctIndex}
        explanation={currentCrisis.knowledgeQuestion.explanation}
      />

      {activeEvent && (
        <EventCardModal
          isOpen={true}
          title={activeEvent.title}
          description={activeEvent.description}
          impact={activeEvent.impact}
          onAcknowledge={handleAcknowledgeEvent}
        />
      )}

      <VictoryReportModal
        isOpen={isGameOver}
        resources={resources}
        totalScore={Math.round(totalScore)}
        rank={finalRank}
        onRestart={handleRestartGame}
      />
    </div>
  );
}
