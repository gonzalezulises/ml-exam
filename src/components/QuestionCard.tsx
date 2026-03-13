import type { Question } from '../types';

interface Props {
  question: Question;
  selectedOption: number | null;
  onSelect: (index: number) => void;
  onSubmit: () => void;
}

export function QuestionCard({ question, selectedOption, onSelect, onSubmit }: Props) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="flex-1 flex items-start justify-center p-4 pt-8">
        <div className="max-w-3xl w-full">
          <div className="mb-2 text-slate-500 text-sm font-medium">
            {question.subtopic}
          </div>
          <h2 className="text-xl font-semibold text-white leading-relaxed mb-8">
            {question.statement}
          </h2>

          <div className="space-y-3 mb-8">
            {question.options.map((option, i) => {
              const isSelected = selectedOption === i;
              const letter = String.fromCharCode(65 + i);
              return (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/10 text-white'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex gap-3">
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${
                        isSelected
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-sm leading-relaxed pt-0.5">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={onSubmit}
            disabled={selectedOption === null}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Confirmar respuesta
          </button>
        </div>
      </div>
    </div>
  );
}
