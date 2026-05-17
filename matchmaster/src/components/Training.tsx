import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, RefreshCw } from 'lucide-react';
import { Pair } from '../types';
import { shuffleArray } from '../utils';

interface TrainingProps {
  pairs: Pair[];
  onPractice: () => void;
  onBack: () => void;
}

export default function Training({ pairs, onPractice, onBack }: TrainingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studyOrder, setStudyOrder] = useState(() => pairs);

  const currentPair = studyOrder[currentIndex];
  const progress = useMemo(
    () => Math.round(((currentIndex + 1) / studyOrder.length) * 100),
    [currentIndex, studyOrder.length],
  );

  const goToCard = (nextIndex: number) => {
    setCurrentIndex(nextIndex);
  };

  const handleShuffle = () => {
    setStudyOrder(shuffleArray(pairs));
    goToCard(0);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors w-fit"
        >
          <ArrowLeft size={20} /> Modules
        </button>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
            {studyOrder.length} sentence pairs
          </div>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
          >
            <RefreshCw size={18} /> Shuffle Study
          </button>
          <button
            onClick={onPractice}
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200"
          >
            <BookOpen size={18} /> Practice
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Training Module</h1>
              <p className="text-slate-500 mt-1">Study each English sentence with its Japanese match.</p>
            </div>
            <div className="text-sm font-semibold text-slate-500">
              {currentIndex + 1} / {studyOrder.length}
            </div>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 min-h-48">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">English</p>
              <p className="text-2xl font-semibold text-slate-900 leading-snug">{currentPair.term}</p>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 min-h-48">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Japanese</p>
              <p className="text-2xl font-semibold text-indigo-700 leading-snug">{currentPair.definition}</p>
            </section>
          </div>

          <div className="mt-8 flex justify-end">
            <div className="flex items-center gap-3">
              <button
                onClick={() => goToCard(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={18} /> Previous
              </button>
              <button
                onClick={() => goToCard(Math.min(studyOrder.length - 1, currentIndex + 1))}
                disabled={currentIndex === studyOrder.length - 1}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {studyOrder.map((pair, index) => (
          <button
            key={pair.id}
            onClick={() => goToCard(index)}
            className={`text-left p-4 rounded-lg border transition-colors ${
              index === currentIndex
                ? 'border-indigo-300 bg-indigo-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-mono text-slate-400 mb-1">{index + 1}</div>
            <div className="font-medium text-slate-800">{pair.term}</div>
            <div className="text-sm text-slate-500 mt-1">{pair.definition}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
