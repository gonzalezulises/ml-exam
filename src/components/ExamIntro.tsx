interface Props {
  onStart: (random: boolean) => void;
  oralModeEnabled: boolean;
  onToggleOralMode: (enabled: boolean) => void;
}

export function ExamIntro({ onStart, oralModeEnabled, onToggleOralMode }: Props) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-6">
            Nivel Experto
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Examen de Machine Learning
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
            20 preguntas de alto nivel técnico y de negocio. Cada pregunta evalúa
            comprensión profunda, intuición matemática y criterio de decisión.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-3">Temas evaluados</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Regresión Logística (4)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              TF-IDF / NLP (4)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Árboles / Random Forest (4)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Regularización (3)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              Métricas y Evaluación (3)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Negocio / Interpretación (2)
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-8">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-white font-medium">Modo oral</span>
              <p className="text-slate-400 text-sm">
                Muestra preguntas de seguimiento tipo "comité" después del feedback
              </p>
            </div>
            <button
              onClick={() => onToggleOralMode(!oralModeEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                oralModeEnabled ? 'bg-indigo-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  oralModeEnabled ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => onStart(false)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Modo Secuencial
          </button>
          <button
            onClick={() => onStart(true)}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl border border-slate-600 transition-colors"
          >
            Modo Aleatorio
          </button>
        </div>
      </div>
    </div>
  );
}
