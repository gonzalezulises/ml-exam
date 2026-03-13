import { TOPIC_LABELS, type Topic } from '../types';

const TOPIC_COLORS: Record<Topic, string> = {
  regresion_logistica: 'bg-blue-400',
  tfidf_nlp: 'bg-emerald-400',
  arboles_random_forest: 'bg-amber-400',
  regularizacion: 'bg-purple-400',
  metricas_evaluacion: 'bg-rose-400',
  negocio_interpretacion: 'bg-cyan-400',
};

interface Props {
  current: number;
  total: number;
  topic: Topic;
}

export function ProgressBar({ current, total, topic }: Props) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm font-medium">
            Pregunta {current + 1} de {total}
          </span>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${TOPIC_COLORS[topic]} text-slate-900`}
          >
            {TOPIC_LABELS[topic]}
          </span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
