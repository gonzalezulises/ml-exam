import { useState, useCallback, useMemo } from 'react';
import { questions } from '../data/questions';
import type { Answer, ExamPhase, TopicScore, Topic, Question } from '../types';
import { TOPIC_LABELS } from '../types';

function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useExam() {
  const [phase, setPhase] = useState<ExamPhase>('intro');
  const [questionOrder, setQuestionOrder] = useState<Question[]>(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRandom, setIsRandom] = useState(false);
  const [showOral, setShowOral] = useState(false);
  const [oralModeEnabled, setOralModeEnabled] = useState(true);

  const currentQuestion = questionOrder[currentIndex] ?? null;
  const totalQuestions = questionOrder.length;
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id);

  const startExam = useCallback((random: boolean) => {
    setIsRandom(random);
    setQuestionOrder(random ? shuffle(questions) : questions);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setPhase('question');
    setShowOral(false);
  }, []);

  const submitAnswer = useCallback(() => {
    if (selectedOption === null || !currentQuestion) return;
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selectedIndex: selectedOption, isCorrect },
    ]);
    setPhase('feedback');
    setShowOral(false);
  }, [selectedOption, currentQuestion]);

  const nextQuestion = useCallback(() => {
    setSelectedOption(null);
    setShowOral(false);
    if (currentIndex + 1 >= totalQuestions) {
      setPhase('summary');
    } else {
      setCurrentIndex((i) => i + 1);
      setPhase('question');
    }
  }, [currentIndex, totalQuestions]);

  const restart = useCallback(() => {
    setPhase('intro');
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowOral(false);
  }, []);

  const topicScores: TopicScore[] = useMemo(() => {
    const topics = Object.keys(TOPIC_LABELS) as Topic[];
    return topics.map((topic) => {
      const topicQuestions = questions.filter((q) => q.topic === topic);
      const topicAnswers = answers.filter((a) =>
        topicQuestions.some((q) => q.id === a.questionId)
      );
      const correct = topicAnswers.filter((a) => a.isCorrect).length;
      const total = topicQuestions.length;
      return { topic, correct, total, percentage: total > 0 ? (correct / total) * 100 : 0 };
    });
  }, [answers]);

  const totalCorrect = answers.filter((a) => a.isCorrect).length;
  const totalPercentage = answers.length > 0 ? (totalCorrect / answers.length) * 100 : 0;

  return {
    phase,
    currentQuestion,
    currentIndex,
    totalQuestions,
    answers,
    currentAnswer,
    selectedOption,
    setSelectedOption,
    isRandom,
    showOral,
    setShowOral,
    oralModeEnabled,
    setOralModeEnabled,
    startExam,
    submitAnswer,
    nextQuestion,
    restart,
    topicScores,
    totalCorrect,
    totalPercentage,
  };
}
