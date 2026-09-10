import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SURVEY_QUESTIONS } from '@/game/crisesData';
import { BarChart3, CheckCircle, GraduationCap } from 'lucide-react';
import { sounds } from '@/game/soundEffects';

interface ScienceFairSurveyModalProps {
  mode: 'pre' | 'post';
  isOpen: boolean;
  onComplete: (score: number) => void;
  preScore?: number;
}

export default function ScienceFairSurveyModal({
  mode,
  isOpen,
  onComplete,
  preScore = 0
}: ScienceFairSurveyModalProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (qIdx: number, optIdx: number) => {
    sounds.playClick();
    setAnswers({ ...answers, [qIdx]: optIdx });
  };

  const handleFinish = () => {
    let score = 0;
    SURVEY_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) score += 1;
    });
    setSubmitted(true);
    sounds.playSuccess();
    setTimeout(() => {
      onComplete(score);
    }, 1200);
  };

  const allAnswered = Object.keys(answers).length === SURVEY_QUESTIONS.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-sky-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl text-slate-100 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-3 border-b border-sky-500/20 pb-3">
          <span className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <GraduationCap className="w-6 h-6" />
          </span>
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-sky-400 font-bold">
              METODOLOGIA CIENTÍFICA (SEÇÃO 14 DO PDR)
            </span>
            <h3 className="text-xl font-bold text-white">
              {mode === 'pre' ? 'Questionário Diagnóstico (Antes do Jogo)' : 'Avaliação de Aprendizagem (Depois do Jogo)'}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          {mode === 'pre'
            ? 'Responda estas 3 perguntas para registrar seu nível de conhecimento geográfico antes da simulação. Ao final, você poderá comparar seu avanço para o painel da feira de ciências!'
            : 'Parabéns pela partida! Agora responda novamente para calcular a eficácia pedagógica e gerar o gráfico de evolução científica do projeto.'}
        </p>

        <div className="flex flex-col gap-4">
          {SURVEY_QUESTIONS.map((q, qIdx) => (
            <div key={q.id} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <h4 className="text-sm font-semibold text-white mb-2.5">
                {qIdx + 1}. {q.question}
              </h4>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[qIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`p-3 rounded-lg border text-left text-xs leading-relaxed transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'border-sky-400 bg-sky-950/50 text-sky-200'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 font-mono text-[10px]">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {submitted && (
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Dados registrados com sucesso! Processando metodologia científica...</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <Button
            disabled={!allAnswered || submitted}
            onClick={handleFinish}
            className="bg-sky-600 hover:bg-sky-500 text-white font-semibold"
          >
            {mode === 'pre' ? 'Iniciar Partida no GeoCrisis' : 'Gerar Gráfico de Aprendizagem da Feira'}
          </Button>
        </div>
      </div>
    </div>
  );
}
