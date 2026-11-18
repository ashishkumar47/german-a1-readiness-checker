import { useState } from 'react';
import { Button } from '@/components/ui';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [name, setName] = useState('');

  function handleStart() {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    onStart(trimmedName);
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Icon / Branding */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-100 text-primary-600 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            German A1 Exam Readiness Checker
          </h1>
          <p className="text-gray-500 text-lg">
            Find out if you're prepared for the Goethe or ÖSD A1 certification exam.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-semibold text-primary-600 mb-1">📖 Vocabulary</p>
            <p className="text-sm text-gray-500">5 questions</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-semibold text-primary-600 mb-1">📝 Grammar</p>
            <p className="text-sm text-gray-500">5 questions</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-semibold text-primary-600 mb-1">📄 Reading</p>
            <p className="text-sm text-gray-500">5 questions</p>
          </div>
        </div>

        {/* Total & CTA */}
        <div className="space-y-4">
          <p className="text-gray-600">
            This assessment contains <span className="font-semibold">15 questions</span> across
            three categories. No time limit — take it at your own pace.
          </p>
          <Button onClick={() => setShowNameDialog(true)} fullWidth>
            Start Assessment
          </Button>
        </div>
      </div>
      {showNameDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="presentation">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="name-dialog-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2 id="name-dialog-title" className="text-xl font-bold text-gray-900">Before you begin</h2>
            <p className="mt-2 text-sm text-gray-600">Enter your name to start the assessment.</p>
            <label htmlFor="candidate-name" className="mt-5 block text-sm font-medium text-gray-700">Your name</label>
            <input
              id="candidate-name"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter') handleStart(); }}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-200"
              placeholder="Enter your name"
            />
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowNameDialog(false)}>Cancel</Button>
              <Button onClick={handleStart} disabled={!name.trim()}>Continue</Button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
