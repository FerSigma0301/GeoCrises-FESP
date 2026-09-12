import React, { useState, useEffect } from 'react';
import GlobeCanvas from '@/components/GlobeCanvas';
import CrisisCardView from '@/components/CrisisCardView';
import KnowledgeQuizModal from '@/components/KnowledgeQuizModal';
import EventCardModal from '@/components/EventCardModal';
import ScienceFairSurveyModal from '@/components/ScienceFairSurveyModal';
import VictoryReportModal from '@/components/VictoryReportModal';
import { CRISES_DATA } from '@/game/crisesData';
import { PlayerResources, DecisionOption, FinalRank } from '@/game/types';
import type { CrisisImpact } from '@/game/scene';
import { sounds } from '@/game/soundEffects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertOctagon,
  BarChart2,
  DollarSign,
  Heart,
  HelpCircle,
  Leaf,
  RotateCcw,
  Sparkles,
  Users,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';

export default function Home() {
  // PDR Initial Resources (Item 7):
  // Finanças: 1000 | População: 100 | Sustentabilidade: 50 | Vidas: 3 | XP: 0
  const initialResources: PlayerResources = {
    finance: 1000,
    populationProtected: 100,
    sustainability: 50,
    lives: 3,
    xp: 0,
    round: 1
  };

  const [resources, setResources] = useState<PlayerResources>(initialResources);
  const [currentCrisisIdx, setCurrentCrisisIdx] = useState<number>(0);
  const [impacts, setImpacts] = useState<CrisisImpact[]>([]);
  const [decisionHistory, setDecisionHistory] = useState<Array<{ crisisId: string; crisisName: string; action: string; balance: number; result: string }>>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals state
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
  const [knowledgeCompletedForCurrent, setKnowledgeCompletedForCurrent] = useState(false);
  const [activeEvent, setActiveEvent] = useState<any | null>(null);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [surveyMode, setSurveyMode] = useState<'pre' | 'post'>('pre');
  const [preScore, setPreScore] = useState<number>(1);
  const [postScore, setPostScore] = useState<number>(3);
  const [isGameOver, setIsGameOver] = useState(false);

  // AutoPilot / Demo mode query parameter support
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('demo')) {
      const demoTimer = setTimeout(() => {
        // Automatically make a balanced decision in demo mode
        const firstOpt = CRISES_DATA[0].options[0];
        handleSelectDecision(firstOpt);
      }, 2500);
      return () => clearTimeout(demoTimer);
    }
  }, []);

  const currentCrisis = CRISES_DATA[currentCrisisIdx];

  const handleToggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const handleSelectDecision = (option: DecisionOption) => {
    const newFinance = Math.max(0, resources.finance - option.costFinance);
    const newPop = resources.populationProtected + option.deltaPopulation;
    const newSust = Math.max(0, resources.sustainability + option.deltaSustainability);
    const newXP = resources.xp + option.deltaXP;

    setResources((prev) => ({
      ...prev,
      finance: newFinance,
      populationProtected: newPop,
      sustainability: newSust,
      xp: newXP
    }));

    const balance = option.deltaPopulation + option.deltaSustainability * 2 + option.deltaXP / 2 - option.costFinance / 3;
    const result = balance >= 180 ? 'Recuperação forte' : balance >= 90 ? 'Equilíbrio positivo' : 'Resposta de alto custo';
    setImpacts((prev) => [
      ...prev.filter((impact) => impact.crisisId !== currentCrisis.id),
      { crisisId: currentCrisis.id, balance, label: result },
    ]);
    setDecisionHistory((prev) => [
      ...prev,
      { crisisId: currentCrisis.id, crisisName: currentCrisis.name, action: option.title, balance, result },
    ]);

    // Check unexpected event (Carta de Evento - PDR item 8)
    const shouldTriggerEvent = Math.random() < 0.65;
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

    setActiveEvent(null);
    advanceRound();
  };

  const advanceRound = () => {
    if (resources.lives <= 0 || currentCrisisIdx >= CRISES_DATA.length - 1) {
      // Trigger post survey before game victory screen
      setSurveyMode('post');
      setIsSurveyOpen(true);
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

  const handleSurveyComplete = (score: number) => {
    if (surveyMode === 'pre') {
      setPreScore(score);
      setIsSurveyOpen(false);
    } else {
      setPostScore(score);
      setIsSurveyOpen(false);
      setIsGameOver(true);
    }
  };

  const handleRestartGame = () => {
    setResources(initialResources);
    setCurrentCrisisIdx(0);
    setKnowledgeCompletedForCurrent(false);
    setImpacts([]);
    setDecisionHistory([]);
    setIsGameOver(false);
    sounds.playClick();
  };

  // Calculate Total Score (Item 10 and 11 do PDR)
  const totalScore = resources.populationProtected + resources.sustainability * 2 + resources.xp + resources.finance / 2;

  let finalRank: FinalRank = 'Gestor Iniciante 🥉';
  if (totalScore >= 2000) finalRank = 'Líder Global 🌎';
  else if (totalScore >= 1500) finalRank = 'Gestor Expert 🥇';
  else if (totalScore >= 1000) finalRank = 'Gestor em Desenvolvimento 🥈';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Tactical Status Bar (Recursos - PDR Item 7) */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-sky-900/60 px-4 py-2.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo and Subtitle */}
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/20 text-lg">
              🌍
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold tracking-tight text-white text-base">GeoCrisis</h1>
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
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            {/* Finance */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-amber-500/30 text-amber-300">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">Finanças</span>
                <span className="font-bold">{resources.finance} pts</span>
              </div>
            </div>

            {/* Protected Population */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-sky-500/30 text-sky-300">
              <Users className="w-4 h-4 text-sky-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">População</span>
                <span className="font-bold">{resources.populationProtected} pts</span>
              </div>
            </div>

            {/* Sustainability */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-emerald-500/30 text-emerald-300">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">Sustentabilidade</span>
                <span className="font-bold">{resources.sustainability} pts</span>
              </div>
            </div>

            {/* Lives / Response Capacity */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-rose-500/30 text-rose-300">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">Capacidade</span>
                <span className="font-bold">{resources.lives} Vidas</span>
              </div>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-purple-500/30 text-purple-300">
              <Zap className="w-4 h-4 text-purple-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">XP</span>
                <span className="font-bold">{resources.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSurveyMode('pre');
                setIsSurveyOpen(true);
              }}
              className="text-xs text-sky-300 hover:bg-sky-950/50 gap-1.5 border border-sky-900/60"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Questionário Feira
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

      {/* Main Command Center Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: 3D Globe & Spatial Information */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <div className="h-[380px] w-full">
            <GlobeCanvas activeCrisisId={currentCrisis.id} activeCrisis={currentCrisis} impacts={impacts} />
          </div>

          {/* Crisis Pipeline & Map Legend */}
          <div className="bg-slate-900/80 border border-sky-900/40 rounded-xl p-4 text-xs font-mono">
            <div className="flex items-center justify-between mb-3 text-slate-300">
              <span className="font-bold uppercase tracking-wider text-sky-400">
                CRISES GLOBAIS CATALOGADAS ({currentCrisisIdx + 1}/{CRISES_DATA.length})
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
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-400 animate-ping' : isPast ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                      <span className="font-sans font-medium">{c.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{c.category.toUpperCase()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-emerald-900/40 rounded-xl p-4 text-xs">
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
        </section>

        {/* Right Side: Active Crisis, Real Science Data, Decision Cards */}
        <section className="lg:col-span-7">
          <CrisisCardView
            crisis={currentCrisis}
            resources={resources}
            onSelectDecision={handleSelectDecision}
            onOpenKnowledgeQuiz={() => setIsKnowledgeOpen(true)}
            knowledgeCompleted={knowledgeCompletedForCurrent}
          />
        </section>
      </main>

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

      <ScienceFairSurveyModal
        isOpen={isSurveyOpen}
        mode={surveyMode}
        onComplete={handleSurveyComplete}
        preScore={preScore}
      />

      <VictoryReportModal
        isOpen={isGameOver}
        resources={resources}
        totalScore={Math.round(totalScore)}
        rank={finalRank}
        preScore={preScore}
        postScore={postScore}
        onRestart={handleRestartGame}
      />
    </div>
  );
}
