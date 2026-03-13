import { useExam } from './hooks/useExam';
import { ExamIntro } from './components/ExamIntro';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { FeedbackCard } from './components/FeedbackCard';
import { Summary } from './components/Summary';

export default function App() {
  const exam = useExam();

  if (exam.phase === 'intro') {
    return (
      <ExamIntro
        onStart={exam.startExam}
        oralModeEnabled={exam.oralModeEnabled}
        onToggleOralMode={exam.setOralModeEnabled}
      />
    );
  }

  if (exam.phase === 'summary') {
    return (
      <Summary
        totalCorrect={exam.totalCorrect}
        totalQuestions={exam.totalQuestions}
        totalPercentage={exam.totalPercentage}
        topicScores={exam.topicScores}
        onRestart={exam.restart}
      />
    );
  }

  if (!exam.currentQuestion) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <ProgressBar
        current={exam.currentIndex}
        total={exam.totalQuestions}
        topic={exam.currentQuestion.topic}
      />

      {exam.phase === 'question' && (
        <QuestionCard
          question={exam.currentQuestion}
          selectedOption={exam.selectedOption}
          onSelect={exam.setSelectedOption}
          onSubmit={exam.submitAnswer}
        />
      )}

      {exam.phase === 'feedback' && exam.currentAnswer && (
        <FeedbackCard
          question={exam.currentQuestion}
          answer={exam.currentAnswer}
          showOral={exam.showOral}
          oralModeEnabled={exam.oralModeEnabled}
          onToggleOral={() => exam.setShowOral(true)}
          onNext={exam.nextQuestion}
          isLast={exam.currentIndex + 1 >= exam.totalQuestions}
        />
      )}
    </div>
  );
}
