import { ArrowLeft, ArrowRight, BookOpen, RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { type Pair } from './types';
import { shuffleArray } from './utils';

interface TrainingProps {
  isDark: boolean;
  onBack: () => void;
  onPractice: () => void;
  pairs: Pair[];
}

export default function Training({ isDark, onBack, onPractice, pairs }: TrainingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studyOrder, setStudyOrder] = useState(() => pairs);
  const currentPair = studyOrder[currentIndex] ?? pairs[0];
  const progress = useMemo(
    () => (studyOrder.length === 0 ? 0 : Math.round(((currentIndex + 1) / studyOrder.length) * 100)),
    [currentIndex, studyOrder.length],
  );
  const panel = isDark ? 'border-stone-700 bg-stone-900/85' : 'border-stone-200 bg-white/90';
  const muted = isDark ? 'text-stone-400' : 'text-stone-600';
  const secondaryButton = isDark
    ? 'border-stone-700 bg-stone-950 text-stone-100 hover:bg-stone-800'
    : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-100';
  const primaryButton = isDark
    ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
    : 'bg-red-700 text-white hover:bg-red-800';

  const goToCard = (nextIndex: number) => setCurrentIndex(Math.min(Math.max(nextIndex, 0), studyOrder.length - 1));

  return (
    <section className="grid gap-4">
      <div className={`flex flex-col gap-3 rounded-2xl border p-3 shadow-sm md:flex-row md:items-center md:justify-between ${panel}`}>
        <button className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${secondaryButton}`} onClick={onBack} type="button">
          <ArrowLeft size={16} />
          Modules
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}>{studyOrder.length} pairs</span>
          <button className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${secondaryButton}`} onClick={() => {
            setStudyOrder(shuffleArray(pairs));
            setCurrentIndex(0);
          }} type="button">
            <RefreshCw size={16} />
            Shuffle study
          </button>
          <button className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${primaryButton}`} onClick={onPractice} type="button">
            <BookOpen size={16} />
            Practice
          </button>
        </div>
      </div>

      <article className={`overflow-hidden rounded-2xl border shadow-sm ${panel}`}>
        <div className={`border-b p-5 ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}>Training module</p>
              <h2 className={`mt-1 text-2xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Study each pair</h2>
            </div>
            <span className={`text-sm font-bold tabular-nums ${muted}`}>{currentIndex + 1} / {studyOrder.length}</span>
          </div>
          <div className={`mt-4 h-2 overflow-hidden rounded-full ${isDark ? 'bg-stone-800' : 'bg-stone-200'}`}>
            <div className={`h-full rounded-full transition-all ${isDark ? 'bg-amber-400' : 'bg-red-700'}`} style={{ width: `${progress}%` }} />
          </div>
        </div>

        {currentPair && (
          <div className="grid gap-4 p-5 md:grid-cols-2">
            <section className={`min-h-44 rounded-2xl border p-5 ${isDark ? 'border-stone-800 bg-stone-950/70' : 'border-stone-200 bg-stone-50'}`}>
              <p className={`text-xs font-bold uppercase tracking-[0.16em] ${muted}`}>Column A</p>
              <p className={`mt-4 text-2xl font-semibold leading-snug ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{currentPair.term}</p>
            </section>
            <section className={`min-h-44 rounded-2xl border p-5 ${isDark ? 'border-amber-700/50 bg-amber-950/30' : 'border-red-200 bg-red-50'}`}>
              <p className={`text-xs font-bold uppercase tracking-[0.16em] ${isDark ? 'text-amber-200' : 'text-red-700'}`}>Column B</p>
              <p className={`mt-4 text-2xl font-semibold leading-snug ${isDark ? 'text-amber-100' : 'text-red-900'}`}>{currentPair.definition}</p>
            </section>
          </div>
        )}

        <div className={`flex justify-end gap-2 border-t p-5 ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
          <button className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold disabled:opacity-50 ${secondaryButton}`} disabled={currentIndex === 0} onClick={() => goToCard(currentIndex - 1)} type="button">
            <ArrowLeft size={16} />
            Previous
          </button>
          <button className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold disabled:opacity-50 ${secondaryButton}`} disabled={currentIndex >= studyOrder.length - 1} onClick={() => goToCard(currentIndex + 1)} type="button">
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </article>

      <div className="grid gap-2 sm:grid-cols-2">
        {studyOrder.map((pair, index) => (
          <button
            className={`rounded-xl border p-3 text-left transition hover:-translate-y-0.5 ${index === currentIndex ? isDark ? 'border-amber-500 bg-amber-950/40' : 'border-red-700 bg-red-50' : panel}`}
            key={pair.id}
            onClick={() => goToCard(index)}
            type="button"
          >
            <span className={`font-mono text-xs ${muted}`}>{index + 1}</span>
            <span className={`mt-1 block text-sm font-semibold ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>{pair.term}</span>
            <span className={`mt-1 block text-xs ${muted}`}>{pair.definition}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
