import React, { useEffect } from 'react';
import { PlayerResources, FinalRank } from '@/game/types';
import { Button } from '@/components/ui/button';
import { Award, Download, RefreshCw, Share2, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '@/game/soundEffects';

interface VictoryReportModalProps {
  resources: PlayerResources;
  totalScore: number;
  rank: FinalRank;
  isOpen: boolean;
  onRestart: () => void;
}

export default function VictoryReportModal({
  resources,
  totalScore,
  rank,
  isOpen,
  onRestart
}: VictoryReportModalProps) {
  useEffect(() => {
    if (isOpen) {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-sky-500/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl text-slate-100 flex flex-col gap-6 max-h-[92vh] overflow-y-auto">
        {/* Banner with Rank */}
        <div className="text-center flex flex-col items-center gap-2 border-b border-sky-900/60 pb-5">
          <div className="p-4 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-1">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>
          <span className="text-xs uppercase font-mono tracking-widest text-sky-400 font-bold">
            RELATÓRIO DE GESTÃO TERRITORIAL FINAL
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">{rank}</h2>
          <p className="text-xs text-slate-300 max-w-md">
            "Não existe uma solução perfeita para todas as crises. O objetivo é encontrar o melhor equilíbrio entre economia, população e meio ambiente."
          </p>
        </div>

        {/* Score Grid based on PDR Item 10 and 11 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 text-xs block mb-1">Pontuação Total</span>
            <span className="text-2xl font-black font-mono text-amber-400">{totalScore}</span>
            <span className="text-[10px] text-slate-500 block">pontos acumulados</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 text-xs block mb-1">População Salva</span>
            <span className="text-2xl font-black font-mono text-emerald-400">{resources.populationProtected}</span>
            <span className="text-[10px] text-slate-500 block">pontos humanos</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 text-xs block mb-1">Sustentabilidade</span>
            <span className="text-2xl font-black font-mono text-green-400">{resources.sustainability}</span>
            <span className="text-[10px] text-slate-500 block">preservação ecológica</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 text-xs block mb-1">XP Geográfico</span>
            <span className="text-2xl font-black font-mono text-purple-400">{resources.xp}</span>
            <span className="text-[10px] text-slate-500 block">ciência aplicada</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-400">
            GeoCrisis — Conhecer o mundo é o primeiro passo. Saber agir é o desafio.
          </div>

          <Button
            onClick={() => {
              sounds.playClick();
              onRestart();
            }}
            className="bg-sky-600 hover:bg-sky-500 text-white font-semibold gap-2 shadow-lg shadow-sky-600/30"
          >
            <RefreshCw className="w-4 h-4" />
            Jogar Novamente / Novo Ciclo
          </Button>
        </div>
      </div>
    </div>
  );
}
