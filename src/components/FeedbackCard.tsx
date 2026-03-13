import type { Question, Answer } from '../types';

interface Props {
  question: Question;
  answer: Answer;
  showOral: boolean;
  oralModeEnabled: boolean;
  onToggleOral: () => void;
  onNext: () => void;
  isLast: boolean;
}

export function FeedbackCard({
  question,
  answer,
  showOral,
  oralModeEnabled,
  onToggleOral,
  onNext,
  isLast,
}: Props) {
  const isCorrect = answer.isCorrect;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="flex-1 p-4 pt-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {/* Result banner */}
          <div
            className={`rounded-xl p-4 mb-6 border ${
              isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{isCorrect ? '✓' : '✗'}</span>
              <div>
                <div
                  className={`font-bold text-lg ${
                    isCorrect ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {isCorrect ? 'Correcto' : 'Incorrecto'}
                </div>
                {!isCorrect && (
                  <div className="text-slate-400 text-sm mt-1">
                    Tu respuesta:{' '}
                    <span className="text-red-300">
                      {String.fromCharCode(65 + answer.selectedIndex)}.{' '}
                      {question.options[answer.selectedIndex]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Correct answer */}
          <Section title="Respuesta correcta" color="indigo">
            <p className="text-white font-medium">
              {String.fromCharCode(65 + question.correctIndex)}.{' '}
              {question.options[question.correctIndex]}
            </p>
          </Section>

          {/* Technical rationale */}
          <Section title="Racional técnico" color="blue">
            <p className="text-slate-300 leading-relaxed">
              {question.technicalRationale}
            </p>
          </Section>

          {/* Math intuition */}
          <Section title="Intuición matemática" color="purple">
            <p className="text-slate-300 leading-relaxed">{question.mathIntuition}</p>
          </Section>

          {/* Business implication */}
          <Section title="Implicación de negocio" color="amber">
            <p className="text-slate-300 leading-relaxed">
              {question.businessImplication}
            </p>
          </Section>

          {/* Distractor explanations */}
          <Section title="Por qué las otras opciones no" color="rose">
            <div className="space-y-2">
              {question.distractorExplanations.map((explanation, i) => {
                if (i === question.correctIndex) return null;
                return (
                  <div key={i} className="flex gap-2">
                    <span className="text-slate-500 font-bold text-sm flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <p className="text-slate-400 text-sm leading-relaxed">{explanation}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Oral mode */}
          {oralModeEnabled && (
            <div className="mt-6">
              {!showOral ? (
                <button
                  onClick={onToggleOral}
                  className="w-full py-3 px-4 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors text-sm"
                >
                  Mostrar pregunta de seguimiento (Modo Oral)
                </button>
              ) : (
                <div className="bg-slate-800/80 border border-cyan-500/20 rounded-xl p-5">
                  <div className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Modo Oral — Pregunta de Seguimiento
                  </div>
                  <p className="text-white font-medium mb-4 leading-relaxed">
                    {question.oralFollowUp}
                  </p>
                  <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
                    <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                      Guía de respuesta excelente
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {question.oralGuide}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Next button */}
          <div className="mt-8 pb-8">
            <button
              onClick={onNext}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              {isLast ? 'Ver resultados' : 'Siguiente pregunta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  const borderColors: Record<string, string> = {
    indigo: 'border-indigo-500/30',
    blue: 'border-blue-500/30',
    purple: 'border-purple-500/30',
    amber: 'border-amber-500/30',
    rose: 'border-rose-500/30',
  };
  const titleColors: Record<string, string> = {
    indigo: 'text-indigo-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
  };

  return (
    <div className={`border-l-2 ${borderColors[color]} pl-4 mb-5`}>
      <h4 className={`${titleColors[color]} text-sm font-semibold uppercase tracking-wider mb-2`}>
        {title}
      </h4>
      {children}
    </div>
  );
}
