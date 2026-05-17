import { ArrowLeft, Check, RefreshCw, RotateCcw, X } from 'lucide-react';
import { motion } from 'motion/react';
import { type Pair } from './types';
import { getColumnLabel } from './utils';

interface ResultsProps {
  bestScore: number | null;
  isDark: boolean;
  onNew: () => void;
  onReshuffle: () => void;
  onRetry: () => void;
  shuffledDefinitions: Pair[];
  shuffledTerms: Pair[];
  userMatches: Record<string, string>;
}

export default function Results({
  bestScore,
  isDark,
  onNew,
  onReshuffle,
  onRetry,
  shuffledDefinitions,
  shuffledTerms,
  userMatches,
}: ResultsProps) {
  const correctCount = shuffledTerms.filter((term) => userMatches[term.id] === term.id).length;
  const score = shuffledTerms.length === 0 ? 0 : Math.round((correctCount / shuffledTerms.length) * 100);
  const panel = isDark ? 'border-stone-700 bg-stone-900/85' : 'border-stone-200 bg-white/90';
  const muted = isDark ? 'text-stone-400' : 'text-stone-600';
  const secondaryButton = isDark
    ? 'border-stone-700 bg-stone-950 text-stone-100 hover:bg-stone-800'
    : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-100';
  const primaryButton = isDark
    ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
    : 'bg-red-700 text-white hover:bg-red-800';

  return (
    <section className="grid gap-4">
      <div className={`overflow-hidden rounded-2xl border shadow-sm ${panel}`}>
        <div className={`p-6 text-center ${score === 100 ? isDark ? 'bg-emerald-950/40' : 'bg-emerald-50' : isDark ? 'bg-stone-950/40' : 'bg-stone-50'}`}>
          <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}>Bulk trainer results</p>
          <h2 className={`mt-2 text-5xl font-black tabular-nums ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{score}%</h2>
          <p className={`mt-2 text-sm ${muted}`}>
            You got <span className={isDark ? 'text-stone-100' : 'text-stone-950'}>{correctCount}</span> out of{' '}
            <span className={isDark ? 'text-stone-100' : 'text-stone-950'}>{shuffledTerms.length}</span> correct.
          </p>
          <p className={`mt-1 text-xs font-semibold ${muted}`}>Best score: {bestScore === null ? 'Not set' : `${bestScore}%`}</p>
        </div>

        <div className="grid gap-2 p-4">
          {shuffledTerms.map((term, index) => {
            const userDefinitionId = userMatches[term.id];
            const isCorrect = userDefinitionId === term.id;
            const correctDefinitionIndex = shuffledDefinitions.findIndex((definition) => definition.id === term.id);
            const userDefinitionIndex = shuffledDefinitions.findIndex((definition) => definition.id === userDefinitionId);
            const userDefinition = shuffledDefinitions.find((definition) => definition.id === userDefinitionId);
            return (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl border p-3 ${isCorrect ? isDark ? 'border-emerald-700/50 bg-emerald-950/30' : 'border-emerald-200 bg-emerald-50' : isDark ? 'border-rose-700/50 bg-rose-950/30' : 'border-rose-200 bg-rose-50'}`}
                initial={{ opacity: 0, y: 8 }}
                key={term.id}
                transition={{ delay: index * 0.025 }}
              >
                <div className="grid gap-3 sm:grid-cols-[2rem_minmax(0,1fr)_5rem_5rem_minmax(0,1.2fr)] sm:items-center">
                  <span className={`font-mono text-xs ${muted}`}>{index + 1}</span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>{term.term}</span>
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${isCorrect ? isDark ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-100 text-emerald-800' : isDark ? 'bg-rose-900 text-rose-200' : 'bg-rose-100 text-rose-800'}`}>
                    {userDefinitionIndex >= 0 ? getColumnLabel(userDefinitionIndex) : '-'}
                  </span>
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${isDark ? 'bg-stone-900 text-stone-300' : 'bg-white text-stone-700'}`}>
                    {isCorrect ? <Check size={16} /> : correctDefinitionIndex >= 0 ? getColumnLabel(correctDefinitionIndex) : <X size={16} />}
                  </span>
                  <span className={`text-sm ${muted}`}>
                    {term.definition}
                    {!isCorrect && userDefinition && <span className="mt-1 block text-xs">You matched: {userDefinition.definition}</span>}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className={`flex flex-col gap-2 border-t p-4 sm:flex-row sm:items-center sm:justify-between ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
          <button className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold ${secondaryButton}`} onClick={onNew} type="button">
            <ArrowLeft size={16} />
            New worksheet
          </button>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold ${secondaryButton}`} onClick={onReshuffle} type="button">
              <RefreshCw size={16} />
              Reshuffle
            </button>
            <button className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold ${primaryButton}`} onClick={onRetry} type="button">
              <RotateCcw size={16} />
              Retry same set
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
