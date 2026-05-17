import React from 'react';
import { Pair } from '../types';
import { Check, X, ArrowLeft, RotateCcw, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { getColumnLabel } from '../utils';

interface ResultsProps {
  shuffledTerms: Pair[];
  shuffledDefinitions: Pair[];
  userMatches: Record<string, string>;
  onRetry: () => void;
  onReshuffle: () => void;
  onNew: () => void;
}

export default function Results({
  shuffledTerms,
  shuffledDefinitions,
  userMatches,
  onRetry,
  onReshuffle,
  onNew,
}: ResultsProps) {
  // Calculate score
  let correctCount = 0;
  shuffledTerms.forEach((term) => {
    const userDefId = userMatches[term.id];
    if (userDefId === term.id) { // In our data model, correct match means IDs match (since we split from same pair object initially, wait... actually we need to be careful. 
      // The Pair objects in shuffledTerms and shuffledDefinitions are references to the same objects if we just shuffled references.
      // Let's verify how we created them. If we just shuffled the array of objects, then yes, checking ID equality works if the ID is unique to the pair.
      correctCount++;
    }
  });

  const score = Math.round((correctCount / shuffledTerms.length) * 100);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
        <div className={`p-8 text-center ${score === 100 ? 'bg-emerald-50' : 'bg-slate-50'}`}>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Results</h2>
          <div className="text-6xl font-black text-slate-900 mb-4">
            {score}%
          </div>
          <p className="text-slate-600">
            You got <span className="font-bold text-slate-900">{correctCount}</span> out of{' '}
            <span className="font-bold text-slate-900">{shuffledTerms.length}</span> correct.
          </p>
        </div>

        <div className="p-8">
          <div className="space-y-0 divide-y divide-slate-100">
            <div className="grid grid-cols-12 gap-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">Term</div>
              <div className="col-span-1 text-center">Your Ans</div>
              <div className="col-span-1 text-center">Correct</div>
              <div className="col-span-5">Definition</div>
            </div>

            {shuffledTerms.map((term, index) => {
              const userDefId = userMatches[term.id];
              const isCorrect = userDefId === term.id;
              
              // Find the definition object the user selected
              const userSelectedDef = shuffledDefinitions.find(d => d.id === userDefId);
              // Find the correct definition object (which is the term itself effectively, but we need its position in the shuffled B list to show the letter)
              const correctDefIndex = shuffledDefinitions.findIndex(d => d.id === term.id);
              const userDefIndex = shuffledDefinitions.findIndex(d => d.id === userDefId);
              
              const correctLetter = correctDefIndex >= 0 ? getColumnLabel(correctDefIndex) : '-';
              const userLetter = userDefIndex >= 0 ? getColumnLabel(userDefIndex) : '-';

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={term.id} 
                  className={`grid grid-cols-12 gap-4 py-4 items-center ${isCorrect ? '' : 'bg-red-50/50'}`}
                >
                  <div className="col-span-1 text-center font-mono text-slate-400 text-sm">{index + 1}</div>
                  <div className="col-span-4 font-medium text-slate-800">{term.term}</div>
                  
                  <div className={`col-span-1 flex justify-center`}>
                    <span className={`w-8 h-8 flex items-center justify-center rounded font-bold ${
                      isCorrect 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {userLetter}
                    </span>
                  </div>
                  
                  <div className="col-span-1 flex justify-center">
                    {!isCorrect && (
                      <span className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-600 font-bold opacity-50">
                        {correctLetter}
                      </span>
                    )}
                    {isCorrect && <Check size={20} className="text-emerald-500" />}
                  </div>

                  <div className="col-span-5 text-sm text-slate-600">
                    {/* Show the definition that belongs to this term */}
                    {term.definition}
                    {!isCorrect && userSelectedDef && (
                      <div className="mt-1 text-xs text-red-500">
                        You matched: {userSelectedDef.definition}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between">
          <button
            onClick={onNew}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-white hover:shadow-sm transition-all"
          >
            <ArrowLeft size={20} /> New Worksheet
          </button>
          <div className="flex gap-3">
            <button
              onClick={onReshuffle}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition-all"
            >
              <RefreshCw size={20} /> Reshuffle
            </button>
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
            >
              <RotateCcw size={20} /> Retry Same Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
