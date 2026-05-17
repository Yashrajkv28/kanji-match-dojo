import { ArrowLeft, CheckCircle, RefreshCw, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { type Pair } from './types';
import { getColumnLabel } from './utils';

interface WorksheetProps {
  isDark: boolean;
  onComplete: (userMatches: Record<string, string>) => void;
  onReset: () => void;
  onReshuffle: () => void;
  shuffledDefinitions: Pair[];
  shuffledTerms: Pair[];
  totalCount: number;
}

export default function Worksheet({
  isDark,
  onComplete,
  onReset,
  onReshuffle,
  shuffledDefinitions,
  shuffledTerms,
  totalCount,
}: WorksheetProps) {
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const matchedDefinitionIds = useMemo(() => new Set(Object.values(matches)), [matches]);
  const allMatched = shuffledTerms.length > 0 && shuffledTerms.every((term) => matches[term.id]);
  const panel = isDark ? 'border-stone-700 bg-stone-900/85' : 'border-stone-200 bg-white/90';
  const muted = isDark ? 'text-stone-400' : 'text-stone-600';
  const secondaryButton = isDark
    ? 'border-stone-700 bg-stone-950 text-stone-100 hover:bg-stone-800'
    : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-100';
  const primaryButton = isDark
    ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
    : 'bg-red-700 text-white hover:bg-red-800';

  const chooseDefinition = (definitionId: string) => {
    if (!selectedTermId) return;
    if (selectedTermId === definitionId) {
      setMatches((previous) => ({ ...previous, [selectedTermId]: definitionId }));
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    setSelectedTermId(null);
    window.setTimeout(() => setFeedback(null), 700);
  };

  const getMatchedLetter = (termId: string) => {
    const definitionId = matches[termId];
    if (!definitionId) return '';
    const index = shuffledDefinitions.findIndex((definition) => definition.id === definitionId);
    return index >= 0 ? getColumnLabel(index) : '?';
  };

  return (
    <section className="grid gap-4">
      <div className={`flex flex-col gap-3 rounded-2xl border p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between ${panel}`}>
        <div className="flex flex-wrap items-center gap-2">
          <button className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${secondaryButton}`} onClick={onReset} type="button">
            <ArrowLeft size={16} />
            Edit setup
          </button>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}>
            {Object.keys(matches).length} / {totalCount} matched
          </span>
          {feedback && (
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${feedback === 'correct' ? isDark ? 'bg-emerald-950 text-emerald-200' : 'bg-emerald-50 text-emerald-800' : isDark ? 'bg-rose-950 text-rose-200' : 'bg-rose-50 text-rose-800'}`}>
              {feedback === 'correct' ? 'Correct' : 'Wrong, try again'}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${secondaryButton}`} onClick={onReshuffle} type="button">
            <RefreshCw size={16} />
            Reshuffle
          </button>
          <button className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${secondaryButton}`} onClick={() => {
            setMatches({});
            setSelectedTermId(null);
          }} type="button">
            <RotateCcw size={16} />
            Clear
          </button>
          <button className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${primaryButton}`} disabled={!allMatched} onClick={() => onComplete(matches)} type="button">
            <CheckCircle size={16} />
            Check answers
          </button>
        </div>
      </div>

      <article className={`rounded-2xl border p-4 shadow-sm md:p-6 ${panel}`}>
        <div className="mb-6 text-center">
          <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}>Matching exercise</p>
          <h2 className={`mt-1 text-2xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Match Column A to Column B</h2>
          <p className={`mt-1 text-sm ${muted}`}>Pick a term, then choose its matching definition.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <h3 className={`mb-3 border-b pb-2 text-sm font-bold uppercase tracking-[0.16em] ${isDark ? 'border-stone-700 text-stone-300' : 'border-stone-300 text-stone-700'}`}>Column A</h3>
            <div className="grid gap-2">
              {shuffledTerms.map((term, index) => {
                const selected = selectedTermId === term.id;
                const matched = Boolean(matches[term.id]);
                return (
                  <button
                    className={`grid min-h-16 grid-cols-[2.5rem_3rem_minmax(0,1fr)] items-center gap-3 rounded-xl border p-3 text-left transition hover:-translate-y-0.5 ${matched ? isDark ? 'border-emerald-700 bg-emerald-950/40' : 'border-emerald-200 bg-emerald-50' : selected ? isDark ? 'border-amber-500 bg-amber-950/50' : 'border-red-700 bg-red-50' : isDark ? 'border-stone-800 bg-stone-950/60 hover:border-stone-600' : 'border-stone-200 bg-white hover:border-stone-400'}`}
                    disabled={matched}
                    key={term.id}
                    onClick={() => setSelectedTermId(selected ? null : term.id)}
                    type="button"
                  >
                    <span className={`font-mono text-sm ${muted}`}>{index + 1}.</span>
                    <span className={`grid h-9 w-9 place-items-center rounded-lg border text-lg font-bold ${matched ? isDark ? 'border-emerald-600 text-emerald-200' : 'border-emerald-300 text-emerald-800' : isDark ? 'border-stone-700 text-stone-500' : 'border-stone-200 text-stone-400'}`}>{getMatchedLetter(term.id)}</span>
                    <span className={`text-base font-semibold ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{term.term}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className={`mb-3 border-b pb-2 text-sm font-bold uppercase tracking-[0.16em] ${isDark ? 'border-stone-700 text-stone-300' : 'border-stone-300 text-stone-700'}`}>Column B</h3>
            <div className="grid gap-2">
              {shuffledDefinitions.map((definition, index) => {
                const used = matchedDefinitionIds.has(definition.id);
                return (
                  <button
                    className={`grid min-h-16 grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3 rounded-xl border p-3 text-left transition ${selectedTermId && !used ? 'hover:-translate-y-0.5' : ''} ${used ? isDark ? 'border-emerald-700/50 bg-emerald-950/30 opacity-70' : 'border-emerald-200 bg-emerald-50 opacity-80' : selectedTermId ? isDark ? 'border-stone-700 bg-stone-950/60 hover:border-amber-500' : 'border-stone-200 bg-white hover:border-red-700' : isDark ? 'border-stone-800 bg-stone-950/50' : 'border-stone-200 bg-white'}`}
                    disabled={!selectedTermId || used}
                    key={definition.id}
                    onClick={() => chooseDefinition(definition.id)}
                    type="button"
                  >
                    <span className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-bold ${isDark ? 'border-stone-700 bg-stone-900 text-stone-200' : 'border-stone-200 bg-stone-100 text-stone-700'}`}>{getColumnLabel(index)}</span>
                    <span className={`text-sm font-medium leading-6 ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>{definition.definition}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
