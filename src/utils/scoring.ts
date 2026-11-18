import type {
  Question,
  UserAnswer,
  AssessmentResult,
  ReadinessLevel,
  QuestionCategory,
} from '@/types';

/**
 * Calculate the readiness level based on score percentage.
 */
export function getReadinessLevel(percentage: number): ReadinessLevel {
  if (percentage >= 80) return 'ready';
  if (percentage >= 60) return 'almost-ready';
  return 'needs-practice';
}

/**
 * Calculate the full assessment result from questions and user answers.
 */
export function calculateResult(
  questions: Question[],
  answers: UserAnswer[]
): AssessmentResult {
  const categoryScores: Record<QuestionCategory, { correct: number; total: number }> = {
    vocabulary: { correct: 0, total: 0 },
    grammar: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
  };

  let correctAnswers = 0;
  const missedTopics = new Map<string, { topic: string; tip: string; missed: number }>();

  for (const question of questions) {
    categoryScores[question.category].total += 1;

    const userAnswer = answers.find((a) => a.questionId === question.id);
    if (userAnswer && userAnswer.selectedOption === question.correctAnswer) {
      correctAnswers += 1;
      categoryScores[question.category].correct += 1;
    } else {
      const current = missedTopics.get(question.topic);
      missedTopics.set(question.topic, {
        topic: question.topic,
        tip: question.practiceTip,
        missed: (current?.missed ?? 0) + 1,
      });
    }
  }

  const totalQuestions = questions.length;
  const scorePercentage = totalQuestions > 0
    ? Math.round((correctAnswers / totalQuestions) * 100)
    : 0;

  return {
    totalQuestions,
    correctAnswers,
    scorePercentage,
    readinessLevel: getReadinessLevel(scorePercentage),
    categoryScores,
    practiceRecommendations: [...missedTopics.values()]
      .sort((a, b) => b.missed - a.missed || a.topic.localeCompare(b.topic))
      .slice(0, 3),
  };
}
