/**
 * Question type definitions for the German A1 Exam Readiness Checker.
 */

/** Categories of assessment questions */
export type QuestionCategory = 'vocabulary' | 'grammar' | 'reading';

/** Represents a single multiple-choice question */
export interface Question {
  id: number;
  category: QuestionCategory;
  /** Optional reading passage (used for reading comprehension questions) */
  passage?: string;
  /** The question text */
  question: string;
  /** Explanation shown after the learner selects an answer. */
  explanation?: string;
  /** Skill focus used to generate targeted practice recommendations. */
  topic: string;
  practiceTip: string;
  /** Exactly four options */
  options: [string, string, string, string];
  /** Index (0-3) of the correct option */
  correctAnswer: number;
}

/** User's answer for a single question */
export interface UserAnswer {
  questionId: number;
  selectedOption: number | null;
}

/** Readiness level based on score percentage */
export type ReadinessLevel = 'needs-practice' | 'almost-ready' | 'ready';

/** Assessment result after submission */
export interface AssessmentResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  readinessLevel: ReadinessLevel;
  categoryScores: Record<QuestionCategory, { correct: number; total: number }>;
  practiceRecommendations: { topic: string; tip: string; missed: number }[];
}

/** Possible screens in the application */
export type AppScreen = 'welcome' | 'assessment' | 'result';
