export type Topic =
  | 'regresion_logistica'
  | 'tfidf_nlp'
  | 'arboles_random_forest'
  | 'regularizacion'
  | 'metricas_evaluacion'
  | 'negocio_interpretacion';

export const TOPIC_LABELS: Record<Topic, string> = {
  regresion_logistica: 'Regresión Logística',
  tfidf_nlp: 'TF-IDF / NLP',
  arboles_random_forest: 'Árboles / Random Forest',
  regularizacion: 'Regularización (Ridge / Lasso)',
  metricas_evaluacion: 'Métricas y Evaluación',
  negocio_interpretacion: 'Criterio de Negocio / Interpretación',
};

export interface Question {
  id: number;
  topic: Topic;
  subtopic: string;
  statement: string;
  options: string[];
  correctIndex: number;
  technicalRationale: string;
  mathIntuition: string;
  businessImplication: string;
  distractorExplanations: string[];
  oralFollowUp: string;
  oralGuide: string;
}

export interface Answer {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
}

export type ExamPhase = 'intro' | 'question' | 'feedback' | 'summary';

export interface TopicScore {
  topic: Topic;
  correct: number;
  total: number;
  percentage: number;
}
