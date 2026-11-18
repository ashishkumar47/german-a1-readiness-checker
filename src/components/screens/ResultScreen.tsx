import type { AssessmentResult, QuestionCategory } from '@/types';
import { Button } from '@/components/ui';

interface ResultScreenProps {
  result: AssessmentResult;
  name: string;
  onRetake: () => void;
}

const readinessConfig = {
  'needs-practice': {
    label: 'Needs Practice',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: '🔴',
    message: 'Keep studying! Focus on the areas where you scored lower and try again.',
  },
  'almost-ready': {
    label: 'Almost Ready',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: '🟡',
    message: 'You\'re getting close! Review your weak areas and you\'ll be ready soon.',
  },
  ready: {
    label: 'Ready!',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '🟢',
    message: 'Great job! You appear well-prepared for the German A1 exam.',
  },
};

const categoryLabels: Record<QuestionCategory, string> = {
  vocabulary: '📖 Vocabulary',
  grammar: '📝 Grammar',
  reading: '📄 Reading',
};

export default function ResultScreen({ result, name, onRetake }: ResultScreenProps) {
  const config = readinessConfig[result.readinessLevel];
  const passed = result.readinessLevel === 'ready';
  const confettiColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Assessment Complete</h1>
          <p className="text-gray-500">{name ? `${name}, here's how you did` : "Here's how you did"}</p>
        </div>

        {passed && (
          <div
            className="flex items-center justify-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-center shadow-sm celebration-banner"
            role="status"
          >
            <span className="text-3xl" aria-hidden="true">🎉</span>
            <div>
              <p className="font-bold text-green-800">You passed the readiness check!</p>
              <p className="text-sm text-green-700">Your score meets the Ready benchmark. Great work!</p>
            </div>
            <span className="text-3xl" aria-hidden="true">🎊</span>
          </div>
        )}

        {/* Score Card */}
        <div className={`relative overflow-hidden rounded-2xl p-6 text-center ${config.bg} ${config.border} border-2`}>
          {passed && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              {confettiColors.concat(confettiColors, confettiColors).map((color, index) => (
                <span
                  key={index}
                  className="celebration-confetti"
                  style={{
                    left: `${(index * 29) % 100}%`,
                    animationDelay: `${(index % 7) * -0.24}s`,
                    animationDuration: `${2.2 + (index % 4) * 0.25}s`,
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          )}
          <div className="relative z-10">
            <p className="text-5xl font-bold mb-1">
              <span className={config.color}>{result.correctAnswers}</span>
              <span className="text-gray-400 text-3xl">/{result.totalQuestions}</span>
            </p>
            <p className="text-gray-500 text-sm mb-4">{result.scorePercentage}% correct</p>
            <div className="inline-flex items-center gap-2 text-lg font-semibold">
              <span>{config.icon}</span>
              <span className={config.color}>{config.label}</span>
            </div>
            <p className="text-sm text-gray-600 mt-3">{config.message}</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          <div className="px-5 py-3">
            <h3 className="font-semibold text-gray-700 text-sm">Category Breakdown</h3>
          </div>
          {(Object.keys(result.categoryScores) as QuestionCategory[]).map((cat) => {
            const { correct, total } = result.categoryScores[cat];
            const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
            return (
              <div key={cat} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm text-gray-600">{categoryLabels[cat]}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-16 text-right">
                    {correct}/{total}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Targeted practice recommendations */}
        <section className="rounded-2xl border border-primary-100 bg-primary-50 p-5" aria-labelledby="practice-heading">
          <h2 id="practice-heading" className="font-semibold text-gray-900">What to practise before booking</h2>
          {result.practiceRecommendations.length > 0 ? (
            <ol className="mt-3 space-y-3">
              {result.practiceRecommendations.map((item) => (
                <li key={item.topic} className="rounded-xl bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium text-gray-800">{item.topic}</h3>
                    <span className="shrink-0 text-xs text-gray-500">{item.missed} missed</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{item.tip}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-2 text-sm text-gray-600">You answered every question correctly. Keep practising across all three skills to maintain your level before booking.</p>
          )}
        </section>

        {/* Retake */}
        <Button onClick={onRetake} fullWidth variant="primary">
          Retake Assessment
        </Button>
      </div>
    </div>
  );
}
