import React, { useState } from 'react';
import Setup from './components/Setup';
import Training from './components/Training';
import Worksheet from './components/Worksheet';
import Results from './components/Results';
import { Pair, GameState } from './types';
import { shuffleArray } from './utils';
import { DAILY_EXPRESSION_COUNT, DAILY_EXPRESSION_PAIRS } from './dailyExpressions';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    pairs: [],
    status: 'setup',
    shuffledTerms: [],
    shuffledDefinitions: [],
    userMatches: {},
  });

  const startNewGame = (pairs: Pair[]) => {
    const terms = shuffleArray([...pairs]);
    const definitions = shuffleArray([...pairs]);

    setGameState({
      pairs,
      status: 'playing',
      shuffledTerms: terms,
      shuffledDefinitions: definitions,
      userMatches: {},
    });
  };

  const handleStartPractice = () => {
    startNewGame(DAILY_EXPRESSION_PAIRS);
  };

  const handleStartTraining = () => {
    setGameState((prev) => ({
      ...prev,
      pairs: DAILY_EXPRESSION_PAIRS,
      status: 'training',
      userMatches: {},
    }));
  };

  const handleComplete = (matches: Record<string, string>) => {
    setGameState((prev) => ({
      ...prev,
      userMatches: matches,
      status: 'results',
    }));
  };

  const handleRetry = () => {
    setGameState((prev) => ({
      ...prev,
      userMatches: {},
      status: 'playing',
    }));
  };

  const handleReshuffle = () => {
    startNewGame(gameState.pairs);
  };

  const handleReset = () => {
    setGameState((prev) => ({
      ...prev,
      status: 'setup',
      userMatches: {},
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 py-8 px-4">
      {gameState.status === 'setup' && (
        <Setup
          dailyExpressionCount={DAILY_EXPRESSION_COUNT}
          onStart={startNewGame}
          onStartPractice={handleStartPractice}
          onStartTraining={handleStartTraining}
        />
      )}

      {gameState.status === 'training' && (
        <Training
          pairs={DAILY_EXPRESSION_PAIRS}
          onPractice={handleStartPractice}
          onBack={handleReset}
        />
      )}
      
      {gameState.status === 'playing' && (
        <Worksheet
          totalCount={gameState.pairs.length}
          shuffledTerms={gameState.shuffledTerms}
          shuffledDefinitions={gameState.shuffledDefinitions}
          onComplete={handleComplete}
          onReset={handleReset}
          onReshuffle={handleReshuffle}
        />
      )}

      {gameState.status === 'results' && (
        <Results
          shuffledTerms={gameState.shuffledTerms}
          shuffledDefinitions={gameState.shuffledDefinitions}
          userMatches={gameState.userMatches}
          onRetry={handleRetry}
          onReshuffle={handleReshuffle}
          onNew={handleReset}
        />
      )}
    </div>
  );
}
