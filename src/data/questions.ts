import type { Question, QuestionCategory } from '@/types';
import vocabularyData from '../../vocabulary/a1_vocabulary.json';
import grammarData from '../../grammer/a1_grammer.json';
import readingData from '../../reading/a1_reading.json';

/** Raw shape of a question in the JSON files */
interface RawQuestion {
  id: string;
  question: string;
  explanation?: string;
  topic?: string;
  practiceTip?: string;
  passage?: string;
  options: string[];
  correctAnswer: number;
}

/**
 * Fisher-Yates shuffle — returns a new shuffled array.
 */
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Convert raw JSON data into typed Question objects.
 */
function mapQuestions(raw: RawQuestion[], category: QuestionCategory): Question[] {
  return raw.map((q, index) => ({
    id: index,
    category,
    question: q.question,
    explanation: q.explanation,
    topic: q.topic ?? (category === 'vocabulary' ? 'Everyday vocabulary' : category === 'grammar' ? 'A1 grammar' : 'Reading comprehension'),
    practiceTip: q.practiceTip ?? 'Review the question pattern and practise a few similar A1 examples.',
    passage: q.passage,
    options: q.options as [string, string, string, string],
    correctAnswer: q.correctAnswer,
  }));
}

/**
 * Get a fresh set of 15 shuffled questions (5 per category).
 * Each call produces a different random selection from the question pool.
 */
export function getShuffledQuestions(): Question[] {
  const vocabPool = mapQuestions(vocabularyData as RawQuestion[], 'vocabulary');
  const grammarPool = mapQuestions(grammarData as RawQuestion[], 'grammar');
  const readingPool = mapQuestions(readingData as RawQuestion[], 'reading');

  // Pick 5 random questions from each category
  const selectedVocab = shuffle(vocabPool).slice(0, 5);
  const selectedGrammar = shuffle(grammarPool).slice(0, 5);
  const selectedReading = shuffle(readingPool).slice(0, 5);

  // Combine and re-assign sequential IDs
  const allQuestions = [...selectedVocab, ...selectedGrammar, ...selectedReading];
  return allQuestions.map((q, index) => ({ ...q, id: index + 1 }));
}
