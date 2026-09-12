import React, { useState } from 'react';
import { CrisisCard, DecisionOption, PlayerResources } from '@/game/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, BookOpen, CheckCircle, ExternalLink, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import { sounds } from '@/game/soundEffects';

interface CrisisCardViewProps {
  crisis: CrisisCard;
  resources: PlayerResources;
  onSelectDecision: (option: DecisionOption) => void;
  onOpenKnowledgeQuiz: () => void;
  knowledgeCompleted: boolean;
}

export default function CrisisCardView({
  crisis,
  resources,
  onSelectDecision,
  onOpenKnowledgeQuiz,
  knowledgeCompleted
}: CrisisCardViewProps) {
  const [showSource, setShowSource] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null);

  const handleConfirmDecision = () => {
    if (!selectedOption) return;
    if (resources.finance < selectedOption.costFinance) {
      sounds.playWarning();
      return;
    }
    sounds.playClick();
    onSelectDecision(selectedOption);
  };

  return (
    <div className="glass-panel border border-sky-800/50 rounded-2xl p-5 lg:p-6 shadow-2xl flex flex-col gap-5 text-slate-100">
      {/* Header and Crisis Category Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-900/60 pb-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-rose-400 font-bold">CRISE GEOGRÁFICA ATIVA</span>
              <Badge variant="outline" className="border-sky-500/40 text-sky-300 bg-sky-950/40 text-[10px]">
                {crisis.location}
              </Badge>
            </div>
            <h2 className="text-2xl lg:text-[28px] font-black tracking-tight text-white mt-0.5">{crisis.name}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowSource(!showSource)}
            className="border-sky-700/60 text-sky-300 hover:bg-sky-900/40 text-xs gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {showSource ? "Ocultar Dados Reais" : "Ver Evidência Científica (Verso da Carta)"}
          </Button>

          {!knowledgeCompleted && (
            <Button
              size="sm"
              onClick={() => {
                sounds.playClick();
                onOpenKnowledgeQuiz();
              }}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs gap-1.5 animate-pulse"
            >
              <BookOpen className="w-3.5 h-3.5" />
              💡 Carta de Conhecimento (+100 XP)
            </Button>
          )}
        </div>
      </div>

      {/* Real Scientific Data Panel (Verso da Carta - PDR Item 9 e 12) */}
      {showSource && (
        <div className="p-4 rounded-xl bg-sky-950/70 border border-sky-600/40 text-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2 text-sky-300 font-semibold mb-1">
            <Sparkles className="w-4 h-4 text-sky-400" />
            Base de Dados Científica & Instituição de Monitoramento
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">
            <strong>Fonte Oficial:</strong> {crisis.realWorldSource.institution} ({crisis.realWorldSource.year})
          </p>
          <p className="text-slate-300 text-xs mt-1">
            <strong>Conjunto de Dados:</strong> {crisis.realWorldSource.dataset}
          </p>
          <p className="text-slate-400 text-xs italic mt-1.5 border-t border-sky-800/40 pt-1.5">
            "{crisis.realWorldSource.urlDescription}"
          </p>
        </div>
      )}

      {/* Main Crisis Image and Context */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-slate-700/60 group min-h-[220px]">
          <img
            src={crisis.image}
            alt={crisis.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-200 flex flex-wrap gap-1.5">
            {crisis.geographicConcepts.map((concept, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[11px] text-sky-300">
                #{concept}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
              Diagnóstico do Território
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed mb-4 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
              {crisis.scientificDescription}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-600/30 text-xs text-amber-200/90 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Dilema de Prioridades:</strong> Os recursos são limitados. Nenhuma escolha é isenta de trade-offs.
            </span>
          </div>
        </div>
      </div>

      {/* Decision Options Cards (Carta de Decisão) */}
      <div className="mt-2">
        <div className="flex items-center justify-between mb-3 gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-300 font-mono flex items-center gap-2">
            🧠 Cartas de Decisão — Escolha o Plano de Ação:
          </h3>
          <div className="shrink-0 text-right">
            <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-mono">Orçamento disponível</span>
            <strong className="text-emerald-400 font-mono text-xs">💰 {resources.finance} pts</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {crisis.options.map((opt) => {
            const isAffordable = resources.finance >= opt.costFinance;
            const isSelected = selectedOption?.id === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => {
                  if (isAffordable) {
                    sounds.playClick();
                    setSelectedOption(opt);
                  }
                }}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-sky-400 bg-gradient-to-br from-sky-950/80 to-slate-950/80 shadow-lg shadow-sky-500/15 ring-1 ring-sky-400 -translate-y-0.5'
                    : isAffordable
                    ? 'border-slate-800 bg-slate-950/60 hover:border-cyan-700/70 hover:bg-slate-900 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-950/20'
                    : 'border-red-900/40 bg-red-950/10 opacity-60 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="font-bold text-white text-sm leading-snug">{opt.title}</h4>
                    {isSelected && <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{opt.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className={isAffordable ? "text-rose-400 font-bold" : "text-rose-500 line-through"}>
                      💰 -{opt.costFinance}
                    </span>
                    <span className="text-emerald-400">👥 +{opt.deltaPopulation}</span>
                    <span className={opt.deltaSustainability >= 0 ? "text-green-400" : "text-amber-400"}>
                      🌱 {opt.deltaSustainability >= 0 ? `+${opt.deltaSustainability}` : opt.deltaSustainability}
                    </span>
                  </div>
                  <span className="text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
                    ⭐ +{opt.deltaXP} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-sky-900/40 mt-1">
        <div className="text-xs text-slate-400 min-w-0">
          {selectedOption ? (
            <div className="flex items-start gap-2 text-sky-300">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>Ação selecionada: <strong>{selectedOption.title}</strong></span>
            </div>
          ) : (
            <span>Selecione uma carta de decisão acima para prosseguir.</span>
          )}
        </div>

        <Button
          disabled={!selectedOption || resources.finance < (selectedOption?.costFinance || 0)}
          onClick={handleConfirmDecision}
          className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 shadow-lg shadow-sky-600/30 gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Executar Decisão Estratégica
        </Button>
      </div>
    </div>
  );
}
