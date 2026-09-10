import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import { sounds } from '@/game/soundEffects';

interface KnowledgeQuizModalProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function KnowledgeQuizModal({
  question,
  options,
  correctIndex,
  explanation,
  isOpen,
  onClose,
  onSuccess
}: KnowledgeQuizModalProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const isCorrect = selectedIdx === correctIndex;

  const handleConfirm = () => {
    if (selectedIdx === null) return;
    setSubmitted(true);
    if (isCorrect) {
      sounds.playSuccess();
      onSuccess();
    } else {
      sounds.playWarning();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl text-slate-100 flex flex-col gap-5">
        <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
          <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <BookOpen className="w-6 h-6" />
          </span>
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
              DESAFIO GEOGRÁFICO
            </span>
            <h3 className="text-xl font-bold text-white">Carta de Conhecimento Científico</h3>
          </div>
        </div>

        <p className="text-sm font-medium text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          {question}
        </p>

        <div className="flex flex-col gap-2.5">
          {options.map((opt, idx) => {
            let itemStyle = 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900';
            if (submitted) {
              if (idx === correctIndex) itemStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300';
              else if (idx === selectedIdx) itemStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
            } else if (selectedIdx === idx) {
              itemStyle = 'border-amber-400 bg-amber-950/30 text-amber-200';
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => {
                  sounds.playClick();
                  setSelectedIdx(idx);
                }}
                className={`p-3.5 rounded-xl border text-left text-xs leading-relaxed transition-all flex items-start gap-3 ${itemStyle}`}
              >
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'}`}>
            <div className="flex items-center gap-2 font-bold mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Correto! +100 XP adicionados à sua pontuação!
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  Resposta incorreta. Veja a explicação científica abaixo:
                </>
              )}
            </div>
            <p className="text-slate-300 mt-1">{explanation}</p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          {!submitted ? (
            <>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400">
                Pular
              </Button>
              <Button
                disabled={selectedIdx === null}
                onClick={handleConfirm}
                className="bg-amber-600 hover:bg-amber-500 text-white font-semibold"
              >
                Confirmar Resposta (+100 XP)
              </Button>
            </>
          ) : (
            <Button onClick={onClose} className="bg-sky-600 hover:bg-sky-500 text-white font-semibold">
              Continuar Gestão
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
