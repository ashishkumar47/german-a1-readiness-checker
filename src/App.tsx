import { useState, useCallback } from 'react';
import type { AppScreen, AssessmentResult } from '@/types';
import { WelcomeScreen, AssessmentScreen, ResultScreen } from '@/components/screens';

function App() {
  const [screen, setScreen] = useState<AppScreen>('welcome');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [candidateName, setCandidateName] = useState('');

  // Key to force remount of AssessmentScreen (new shuffled questions each time)
  const [assessmentKey, setAssessmentKey] = useState(0);

  const handleStart = useCallback((name: string) => {
    setCandidateName(name);
    setAssessmentKey((k) => k + 1);
    setScreen('assessment');
  }, []);

  const handleComplete = useCallback((assessmentResult: AssessmentResult) => {
    setResult(assessmentResult);
    setScreen('result');
  }, []);

  const handleRetake = useCallback(() => {
    setResult(null);
    setScreen('welcome');
  }, []);

  return (
    <>
      {screen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {screen === 'assessment' && (
        <AssessmentScreen key={assessmentKey} onComplete={handleComplete} />
      )}
      {screen === 'result' && result && (
        <ResultScreen result={result} name={candidateName} onRetake={handleRetake} />
      )}
    </>
  );
}

export default App;
