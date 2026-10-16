import React from 'react';
import { Button } from '@/components/ui/button';
import { CloudLightning, HeartCrack, TrendingDown } from 'lucide-react';
import { sounds } from '@/game/soundEffects';

interface EventCardModalProps {
  title: string;
  description: string;
  impact: {
    finance?: number;
    population?: number;
    sustainability?: number;
    lives?: number;
  };
  isOpen: boolean;
  onAcknowledge: () => void;
  crisisCategory?: string;
}

export default function EventCardModal({
  title,
  description,
  impact,
  isOpen,
  onAcknowledge,
  crisisCategory = 'default'
}: EventCardModalProps) {
  if (!isOpen) return null;
  const crisisTone: Record<string, string> = { flood: 'text-sky-300', drought: 'text-amber-300', wildfire: 'text-orange-300', heatwave: 'text-rose-300', deforestation: 'text-emerald-300', sealevel: 'text-cyan-300', earthquake: 'text-stone-300', pollution: 'text-lime-300', pandemic: 'text-violet-300', biodiversity: 'text-green-300', energy: 'text-yellow-300', ocean: 'text-blue-300', cyber: 'text-fuchsia-300', food: 'text-red-300', default: 'text-purple-300' };
  const arrowTone = crisisTone[crisisCategory] || crisisTone.default;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-purple-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-100 flex flex-col gap-5">
        <div className="flex items-center gap-3 border-b border-purple-500/20 pb-3">
          <span className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
            <CloudLightning className="w-6 h-6 animate-bounce" />
          </span>
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-bold">
              EVENTO METEOROLÓGICO INESPERADO
            </span>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          {description}
        </p>

        {/* Impacts breakdown */}
        <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs">
          <span className="font-semibold text-purple-300 mb-2 block font-mono">CONSEQUÊNCIAS NO TERRITÓRIO:</span>
          <div className="grid grid-cols-2 gap-2 font-mono">
            {impact.finance !== undefined && (
              <div className="flex items-center gap-1.5 text-rose-400">
                <TrendingDown className={`w-3.5 h-3.5 ${arrowTone}`} />
                <span>Finanças: {impact.finance} pts</span>
              </div>
            )}
            {impact.population !== undefined && (
              <div className="flex items-center gap-1.5 text-rose-400">
                <TrendingDown className={`w-3.5 h-3.5 ${arrowTone}`} />
                <span>População: {impact.population} pts</span>
              </div>
            )}
            {impact.sustainability !== undefined && (
              <div className="flex items-center gap-1.5 text-rose-400">
                <TrendingDown className={`w-3.5 h-3.5 ${arrowTone}`} />
                <span>Sustentabilidade: {impact.sustainability} pts</span>
              </div>
            )}
            {impact.lives !== undefined && (
              <div className="flex items-center gap-1.5 text-red-500 font-bold">
                <HeartCrack className="w-3.5 h-3.5" />
                <span>Vidas: {impact.lives}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={() => {
              sounds.playClick();
              onAcknowledge();
            }}
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold w-full"
          >
            Assumir Impacto e Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
