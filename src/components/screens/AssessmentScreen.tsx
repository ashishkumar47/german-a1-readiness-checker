import { useState, useMemo } from 'react';
import type { Question, UserAnswer } from '@/types';
import { Button, ProgressBar } from '@/components/ui';
import { getShuffledQuestions } from '@/data/questions';
import { calculateResult } from '@/utils/scoring';
import type { AssessmentResult } from '@/types';

interface AssessmentScreenProps {
  onComplete: (result: AssessmentResult) => void;
}

export default function AssessmentScreen({ onComplete }: AssessmentScreenProps) {
  // Generate shuffled questions ONCE when this screen mounts
  const questions: Question[] = useMemo(() => getShuffledQuestions(), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>(
    questions.map((q) => ({ questionId: q.id, selectedOption: null }))
  );

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const categoryLabels: Record<string, string> = {
    vocabulary: '📖 Vocabulary',
    grammar: '📝 Grammar',
    reading: '📄 Reading',
  };

  function handleSelect(optionIndex: number) {
    setAnswers((prev) => {
      if (prev[currentIndex].selectedOption !== null) return prev;

      return prev.map((answer, index) =>
        index === currentIndex ? { ...answer, selectedOption: optionIndex } : answer
      );
    });
  }

  function handleNext() {
    if (isLastQuestion) {
      const result = calculateResult(questions, answers);
      onComplete(result);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 max-w-3xl mx-auto w-full">
      {/* Progress */}
      <div className="mb-6">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </div>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
          {categoryLabels[currentQuestion.category] ?? currentQuestion.category}
        </span>
      </div>

      {/* Reading Passage (if applicable) */}
      {currentQuestion.passage && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm leading-relaxed text-gray-700 italic">
          {currentQuestion.passage}
        </div>
      )}

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
        {currentQuestion.question}
      </h2>

      {/* Options */}
      <div className="space-y-3 mb-8 flex-1">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = currentAnswer.selectedOption === idx;
          const hasAnswered = currentAnswer.selectedOption !== null;
          const isCorrectOption = currentQuestion.correctAnswer === idx;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={hasAnswered}
              aria-pressed={isSelected}
              className={`
                w-full text-left rounded-xl border-2 p-4 transition-all duration-200
                ${
                  hasAnswered && isCorrectOption
                    ? 'border-green-600 bg-green-50 text-green-800'
                    : hasAnswered && isSelected
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : isSelected
                    ? 'border-primary-600 bg-primary-50 text-primary-800 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                }
              `}
            >
              <span className="font-medium mr-3 text-sm">
                {String.fromCharCode(65 + idx)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {currentAnswer.selectedOption !== null && (
        <section
          className={`mb-6 rounded-xl border p-4 ${
            currentAnswer.selectedOption === currentQuestion.correctAnswer
              ? 'border-green-200 bg-green-50'
              : 'border-amber-200 bg-amber-50'
          }`}
          role="status"
          aria-live="polite"
        >
          <p className="font-semibold text-gray-900">
            {currentAnswer.selectedOption === currentQuestion.correctAnswer
              ? 'Correct!'
              : 'Not quite.'}{' '}
            Correct answer: {currentQuestion.options[currentQuestion.correctAnswer]}
          </p>
          <p className="mt-1 text-sm text-gray-700">
            {currentQuestion.explanation ?? 'This is the correct answer for this question.'}
          </p>
        </section>
      )}

      {/* Navigation */}
      <div className="flex justify-between gap-4 pt-4 border-t border-gray-100">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentAnswer.selectedOption === null}
        >
          {isLastQuestion ? 'Submit Assessment' : 'Next →'}
        </Button>
      </div>
    </div>
  );
}
