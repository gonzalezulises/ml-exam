import { TOPIC_LABELS, type TopicScore } from '../types';

interface Props {
  totalCorrect: number;
  totalQuestions: number;
  totalPercentage: number;
  topicScores: TopicScore[];
  onRestart: () => void;
}

function getDiagnosticLevel(pct: number): { label: string; color: string } {
  if (pct >= 80) return { label: 'Dominio fuerte', color: 'text-emerald-400' };
  if (pct >= 60) return { label: 'Competente', color: 'text-blue-400' };
  if (pct >= 40) return { label: 'En desarrollo', color: 'text-amber-400' };
  return { label: 'Brecha crítica', color: 'text-red-400' };
}

function getBarColor(pct: number): string {
  if (pct >= 80) return 'bg-emerald-500';
  if (pct >= 60) return 'bg-blue-500';
  if (pct >= 40) return 'bg-amber-500';
  return 'bg-red-500';
}

export function Summary({
  totalCorrect,
  totalQuestions,
  totalPercentage,
  topicScores,
  onRestart,
}: Props) {
  const strengths = topicScores.filter((s) => s.percentage >= 70);
  const gaps = topicScores.filter((s) => s.percentage < 50);
  const moderate = topicScores.filter((s) => s.percentage >= 50 && s.percentage < 70);

  const globalLevel = getDiagnosticLevel(totalPercentage);

  return (
    <div className="min-h-screen bg-slate-900 p-4 pt-8">
      <div className="max-w-3xl mx-auto">
        {/* Score header */}
        <div className="text-center mb-10">
          <div className="text-6xl font-bold text-white mb-2">
            {totalCorrect}/{totalQuestions}
          </div>
          <div className="text-2xl text-slate-400 mb-4">
            {totalPercentage.toFixed(0)}% de acierto
          </div>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${globalLevel.color} border-current/20`}
          >
            {globalLevel.label}
          </div>
        </div>

        {/* Topic breakdown */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="text-white font-semibold text-lg mb-5">
            Diagnóstico por dominio
          </h3>
          <div className="space-y-4">
            {topicScores.map((score) => {
              const level = getDiagnosticLevel(score.percentage);
              return (
                <div key={score.topic}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-slate-300 text-sm font-medium">
                      {TOPIC_LABELS[score.topic]}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold ${level.color}`}>
                        {level.label}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {score.correct}/{score.total}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getBarColor(score.percentage)} rounded-full transition-all duration-700`}
                      style={{ width: `${score.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 mb-4">
            <h4 className="text-emerald-400 font-semibold mb-3">Fortalezas</h4>
            <ul className="space-y-1.5">
              {strengths.map((s) => (
                <li key={s.topic} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  Tienes dominio fuerte en{' '}
                  <span className="text-white font-medium">
                    {TOPIC_LABELS[s.topic]}
                  </span>{' '}
                  ({s.correct}/{s.total})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gaps */}
        {gaps.length > 0 && (
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 mb-4">
            <h4 className="text-red-400 font-semibold mb-3">Brechas a reforzar</h4>
            <ul className="space-y-1.5">
              {gaps.map((s) => (
                <li key={s.topic} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  Tus brechas principales están en{' '}
                  <span className="text-white font-medium">
                    {TOPIC_LABELS[s.topic]}
                  </span>{' '}
                  ({s.correct}/{s.total}). Requiere estudio urgente.
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Moderate */}
        {moderate.length > 0 && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 mb-4">
            <h4 className="text-amber-400 font-semibold mb-3">Áreas en desarrollo</h4>
            <ul className="space-y-1.5">
              {moderate.map((s) => (
                <li key={s.topic} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Tienes base en{' '}
                  <span className="text-white font-medium">
                    {TOPIC_LABELS[s.topic]}
                  </span>{' '}
                  pero necesitas reforzar distinciones finas ({s.correct}/{s.total})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Study recommendation */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 mb-8">
          <h4 className="text-indigo-400 font-semibold mb-3">
            Recomendación de estudio priorizada
          </h4>
          <div className="space-y-3 text-sm text-slate-300">
            {gaps.length > 0 && (
              <div>
                <span className="text-red-400 font-semibold">Prioridad 1 (Urgente):</span>{' '}
                Refuerza{' '}
                {gaps.map((g) => TOPIC_LABELS[g.topic]).join(', ')}.
                Estas son brechas críticas que indican confusiones conceptuales fundamentales.
              </div>
            )}
            {moderate.length > 0 && (
              <div>
                <span className="text-amber-400 font-semibold">Prioridad 2 (Importante):</span>{' '}
                Revisa las distinciones finas en{' '}
                {moderate.map((m) => TOPIC_LABELS[m.topic]).join(', ')}.
                Tienes la base pero confundes conceptos cercanos.
              </div>
            )}
            {strengths.length > 0 && (
              <div>
                <span className="text-emerald-400 font-semibold">Consolidación:</span>{' '}
                Mantén tu dominio en{' '}
                {strengths.map((s) => TOPIC_LABELS[s.topic]).join(', ')}{' '}
                practicando las preguntas de modo oral.
              </div>
            )}
            <div className="pt-2 border-t border-slate-700 text-slate-400">
              Recuerda: Alfonso prioriza la justificación sobre la precisión numérica.
              Un modelo de 85% explicable es superior a uno de 95% opaco.
            </div>
          </div>
        </div>

        {/* Restart */}
        <div className="pb-8">
          <button
            onClick={onRestart}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Reiniciar examen
          </button>
        </div>
      </div>
    </div>
  );
}
