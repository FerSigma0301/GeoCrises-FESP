import React, { useEffect, useState } from 'react';
import { CrisisCard, DecisionOption, PlayerResources, getCardRarity, getRarityEffects } from '@/game/types';
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
  useEffect(() => {
    setShowSource(false);
    setSelectedOption(null);
  }, [crisis.id]);
  const categoryMeta: Record<DecisionOption['category'], { label: string; color: string }> = {
    infra: { label: 'INFRAESTRUTURA', color: 'text-orange-300 border-orange-400/30 bg-orange-400/10' },
    prevention: { label: 'PREVENÇÃO', color: 'text-cyan-300 border-cyan-400/30 bg-cyan-400/10' },
    social: { label: 'PROTEÇÃO SOCIAL', color: 'text-violet-300 border-violet-400/30 bg-violet-400/10' },
    nature: { label: 'NATUREZA', color: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10' },
    emergency: { label: 'EMERGÊNCIA', color: 'text-rose-300 border-rose-400/30 bg-rose-400/10' },
  };
  const rarityMeta = {
    comum: { label: 'COMUM', color: 'border-slate-700 bg-slate-800/40 text-slate-400', icon: '·' },
    raro: { label: 'RARO', color: 'border-cyan-400/60 bg-cyan-400/10 text-cyan-200', icon: '◆' },
    epico: { label: 'ÉPICO', color: 'border-violet-400/70 bg-violet-400/10 text-violet-200', icon: '✦' },
    lendario: { label: 'LENDÁRIO', color: 'border-amber-400/80 bg-amber-400/10 text-amber-200', icon: '★' },
    mitico: { label: 'MÍTICO', color: 'border-fuchsia-400/80 bg-fuchsia-400/10 text-fuchsia-200', icon: '✹' },
    secreto: { label: 'SECRETO', color: 'border-rose-400/80 bg-rose-400/10 text-rose-200', icon: '⬢' },
  };
  const typeMeta: Record<DecisionOption['category'], string> = { infra: 'TECNOLOGIA', prevention: 'PREVENÇÃO', social: 'DIPLOMACIA', nature: 'NATUREZA', emergency: 'RESPOSTA' };

  const handleConfirmDecision = () => {
    if (!selectedOption) return;
    const effectiveCost = Math.max(0, selectedOption.costFinance - getRarityEffects(getCardRarity(selectedOption)).financeDiscount);
    if (resources.finance < effectiveCost) {
      sounds.playWarning();
      return;
    }
    sounds.playClick();
    onSelectDecision(selectedOption);
  };

  return (
    <div className="glass-panel hud-corner border border-sky-800/50 rounded-3xl p-5 lg:p-7 shadow-2xl flex flex-col gap-5 text-slate-100">
      {/* Header and Crisis Category Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-900/60 pb-4">
        <div className="flex items-center gap-3">
          <span className="relative p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-lg shadow-rose-950/30">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-rose-300 shadow-[0_0_10px_rgba(251,113,133,0.9)]" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-rose-400 font-bold">CRISE GEOGRÁFICA ATIVA</span>
              <Badge variant="outline" className="border-sky-500/40 text-sky-300 bg-sky-950/40 text-[10px]">
                {crisis.location}
              </Badge>
            </div>
            <h2 className="text-2xl lg:text-[30px] font-black tracking-tight text-white mt-0.5">{crisis.name}</h2>
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
          <div className="card-sheen md:col-span-5 relative rounded-2xl overflow-hidden border border-slate-700/60 group min-h-[220px] shadow-xl shadow-slate-950/40">
          <img
            src={crisis.image}
            alt={crisis.name}
            loading="eager"
            decoding="async"
            fetchPriority="high"
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
            <p className="text-slate-200 text-sm leading-relaxed mb-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 shadow-inner shadow-slate-950/30">
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
            const isAffordable = resources.finance >= Math.max(0, opt.costFinance - getRarityEffects(getCardRarity(opt)).financeDiscount);
            const isSelected = selectedOption?.id === opt.id;
            const rarity = getCardRarity(opt);
            const rarityInfo = rarityMeta[rarity];
            const rarityEffects = getRarityEffects(rarity);

            return (
              <div
                key={opt.id}
                onClick={() => {
                  if (isAffordable) {
                    sounds.playClick();
                    setSelectedOption(opt);
                  }
                }}
                onKeyDown={(event) => {
                  if ((event.key === 'Enter' || event.key === ' ') && isAffordable) {
                    event.preventDefault();
                    sounds.playClick();
                    setSelectedOption(opt);
                  }
                }}
                role="button"
                tabIndex={isAffordable ? 0 : -1}
                className={`card-sheen p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 ${rarity === 'lendario' ? 'rarity-legendary' : rarity === 'mitico' || rarity === 'secreto' ? 'rarity-mythic' : ''} ${
                  isSelected
                    ? 'border-sky-400 bg-gradient-to-br from-sky-950/80 to-slate-950/80 shadow-xl shadow-sky-500/20 ring-1 ring-sky-400 -translate-y-1'
                    : isAffordable
                    ? 'border-slate-800 bg-slate-950/60 hover:border-cyan-700/70 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-950/20'
                    : 'border-red-900/40 bg-red-950/10 opacity-60 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <span className={`mb-2 mr-1 inline-flex rounded-full border px-2 py-0.5 text-[9px] font-mono tracking-wider ${rarityInfo.color}`}>{rarityInfo.icon} {rarityInfo.label}</span>
                      <span className={`mb-2 inline-flex rounded-full border px-2 py-0.5 text-[9px] font-mono tracking-wider ${categoryMeta[opt.category].color}`}>
                        {typeMeta[opt.category]}
                      </span>
                      <h4 className="font-bold text-white text-sm leading-snug">{opt.title}</h4>
                    </div>
                    {isSelected && <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{opt.description}</p>
                  <div className="mb-1 flex items-end gap-1.5" aria-label="Comparador de impacto">
                    <span className="h-1.5 flex-1 rounded-full bg-sky-400/80" style={{ opacity: Math.min(1, Math.max(0.2, opt.deltaPopulation / 450)) }} />
                    <span className="h-1.5 flex-1 rounded-full bg-emerald-400/80" style={{ opacity: Math.min(1, Math.max(0.2, (opt.deltaSustainability + 20) / 80)) }} />
                    <span className="h-1.5 flex-1 rounded-full bg-purple-400/80" style={{ opacity: Math.min(1, Math.max(0.2, opt.deltaXP / 200)) }} />
                  </div>
                  <div className="mb-2 flex justify-between text-[9px] font-mono text-slate-600"><span>população</span><span>sustentabilidade</span><span>XP</span></div>
                  <div className="grid gap-1 text-[9px] font-mono"><span className="text-emerald-300">BUFF · {rarityEffects.buffLabel}</span><span className="text-rose-300">DEBUFF · {rarityEffects.debuffLabel}</span></div>
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
            <>
              <div className="flex items-start gap-2 text-sky-300">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>Ação selecionada: <strong>{selectedOption.title}</strong></span>
              </div>
              <p className="ml-6 mt-1 max-w-xl text-[11px] leading-relaxed text-slate-400">{selectedOption.scientificFeedback}</p>
            </>
          ) : (
            <span>Selecione uma carta de decisão acima para prosseguir.</span>
          )}
        </div>

        <Button
          disabled={!selectedOption || resources.finance < Math.max(0, (selectedOption?.costFinance || 0) - (selectedOption ? getRarityEffects(getCardRarity(selectedOption)).financeDiscount : 0))}
          onClick={handleConfirmDecision}
          className="h-11 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold px-6 shadow-lg shadow-sky-600/30 gap-2 transition-transform active:scale-[0.98]"
        >
          <TrendingUp className="w-4 h-4" />
          Executar Decisão Estratégica
        </Button>
      </div>
    </div>
  );
}
