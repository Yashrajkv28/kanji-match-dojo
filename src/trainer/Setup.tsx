import { BookOpen, ClipboardList, Dumbbell, Play, Plus, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { type Pair } from './types';
import { SAMPLE_DATA } from './utils';

export interface TrainerPaperSeed {
  id: string;
  label: string;
  subtitle: string;
  pairs: Pair[];
}

interface SetupProps {
  dailyExpressionCount: number;
  isDark: boolean;
  lastPairs: Pair[];
  onStart: (pairs: Pair[]) => void;
  onStartPractice: () => void;
  onStartTraining: () => void;
  paperSeeds: TrainerPaperSeed[];
}

function parseBulkPairs(value: string): Pair[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      let parts = line.split(/\s[-–—]\s/u);
      if (parts.length < 2) parts = line.split('\t');
      if (parts.length < 2) parts = line.split(',');
      if (parts.length < 2) {
        const dashIndex = line.indexOf('-');
        if (dashIndex <= 0) return null;
        parts = [line.substring(0, dashIndex), line.substring(dashIndex + 1)];
      }
      return {
        id: `custom-${Date.now()}-${index}`,
        term: parts[0].trim(),
        definition: parts.slice(1).join(' ').trim(),
      };
    })
    .filter((pair): pair is Pair => Boolean(pair?.term && pair.definition));
}

export default function Setup({
  dailyExpressionCount,
  isDark,
  lastPairs,
  onStart,
  onStartPractice,
  onStartTraining,
  paperSeeds,
}: SetupProps) {
  const [inputMode, setInputMode] = useState<'bulk' | 'simple'>('bulk');
  const [bulkText, setBulkText] = useState('');
  const [simplePairs, setSimplePairs] = useState<{ term: string; definition: string }[]>([
    { term: '', definition: '' },
    { term: '', definition: '' },
    { term: '', definition: '' },
  ]);
  const [error, setError] = useState('');

  const panel = isDark ? 'border-stone-700 bg-stone-900/85' : 'border-stone-200 bg-white/90';
  const muted = isDark ? 'text-stone-400' : 'text-stone-600';
  const input = isDark
    ? 'border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:ring-amber-400/20'
    : 'border-stone-300 bg-white text-stone-950 placeholder:text-stone-400 focus:border-red-700 focus:ring-red-700/15';
  const secondaryButton = isDark
    ? 'border-stone-700 bg-stone-950 text-stone-100 hover:bg-stone-800'
    : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-100';
  const primaryButton = isDark
    ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
    : 'bg-red-700 text-white hover:bg-red-800';

  const startCustom = () => {
    const pairs = inputMode === 'bulk'
      ? parseBulkPairs(bulkText)
      : simplePairs
        .filter((pair) => pair.term.trim() && pair.definition.trim())
        .map((pair, index) => ({
          id: `manual-${Date.now()}-${index}`,
          term: pair.term.trim(),
          definition: pair.definition.trim(),
        }));

    if (pairs.length < 2) {
      setError('Please add at least 2 pairs to start.');
      return;
    }
    setError('');
    onStart(pairs);
  };

  const loadSample = () => {
    setInputMode('bulk');
    setBulkText(SAMPLE_DATA);
    setError('');
  };

  const loadLastPairs = () => {
    setInputMode('bulk');
    setBulkText(lastPairs.map((pair) => `${pair.term} - ${pair.definition}`).join('\n'));
    setError('');
  };

  const loadSeed = (seed: TrainerPaperSeed) => {
    setInputMode('bulk');
    setBulkText(seed.pairs.map((pair) => `${pair.term} - ${pair.definition}`).join('\n'));
    setError('');
  };

  return (
    <section className="grid gap-4">
      <div className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>Daily expressions</p>
            <h2 className={`mt-1 text-2xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Learn first, then practice</h2>
            <p className={`mt-1 max-w-2xl text-sm leading-6 ${muted}`}>
              {dailyExpressionCount} bundled everyday Japanese phrases. Study the pairs, then drill them as a shuffled match worksheet.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <button className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${secondaryButton}`} onClick={onStartTraining} type="button">
            <div className={`mb-3 grid h-11 w-11 place-items-center rounded-xl ${isDark ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-red-700'}`}>
              <BookOpen size={22} />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Study daily expressions</h3>
            <p className={`mt-1 text-sm ${muted}`}>{dailyExpressionCount} bundled sentence pairs.</p>
          </button>
          <button className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${secondaryButton}`} onClick={onStartPractice} type="button">
            <div className={`mb-3 grid h-11 w-11 place-items-center rounded-xl ${isDark ? 'bg-stone-800 text-sky-300' : 'bg-stone-100 text-sky-700'}`}>
              <Dumbbell size={22} />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Practice daily expressions</h3>
            <p className={`mt-1 text-sm ${muted}`}>Start a shuffled worksheet immediately.</p>
          </button>
        </div>
      </div>

      {/* Bulk Input / Custom Pairs / Seed from Papers — disabled because the
          bundled daily expressions already cover this flow. Source preserved
          for reference; do not delete. To restore, uncomment the block below
          and reintroduce the `Start practice` CTA. */}
      {/*
      <div className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Custom pairs</h3>
            <p className={`mt-1 text-sm ${muted}`}>Supported separators: dash, tab, or comma.</p>
          </div>
          {lastPairs.length > 1 && (
            <button className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold ${secondaryButton}`} onClick={loadLastPairs} type="button">
              <ClipboardList size={16} />
              Load last set
            </button>
          )}
          <div className={`inline-flex rounded-full border p-1 ${isDark ? 'border-stone-700 bg-stone-950' : 'border-stone-200 bg-stone-50'}`}>
            {(['bulk', 'simple'] as const).map((mode) => (
              <button
                className={`h-9 rounded-full px-4 text-sm font-semibold capitalize transition ${inputMode === mode ? primaryButton : muted}`}
                key={mode}
                onClick={() => setInputMode(mode)}
                type="button"
              >
                {mode === 'bulk' ? 'Bulk input' : 'Manual entry'}
              </button>
            ))}
          </div>
        </div>

        {inputMode === 'bulk' ? (
          <div className="mt-5">
            <div className="relative">
              <textarea
                className={`h-64 w-full resize-y rounded-2xl border p-4 font-mono text-sm outline-none ring-4 ring-transparent transition ${input}`}
                onChange={(event) => setBulkText(event.target.value)}
                placeholder={'Apple - A red fruit\nBanana - A yellow fruit'}
                value={bulkText}
              />
              <button className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-semibold ${secondaryButton}`} onClick={loadSample} type="button">
                <Upload size={12} />
                Load sample
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-3">
            {simplePairs.map((pair, index) => (
              <div className="grid gap-2 sm:grid-cols-[2rem_minmax(0,1fr)_minmax(0,1fr)_2.5rem] sm:items-center" key={index}>
                <span className={`font-mono text-sm ${muted}`}>{index + 1}.</span>
                <input className={`rounded-xl border px-3 py-2 text-sm outline-none ring-4 ring-transparent transition ${input}`} onChange={(event) => {
                  const next = [...simplePairs];
                  next[index] = { ...next[index], term: event.target.value };
                  setSimplePairs(next);
                }} placeholder="Term" type="text" value={pair.term} />
                <input className={`rounded-xl border px-3 py-2 text-sm outline-none ring-4 ring-transparent transition ${input}`} onChange={(event) => {
                  const next = [...simplePairs];
                  next[index] = { ...next[index], definition: event.target.value };
                  setSimplePairs(next);
                }} placeholder="Definition" type="text" value={pair.definition} />
                <button className={`inline-flex h-10 items-center justify-center rounded-xl border ${secondaryButton}`} onClick={() => setSimplePairs(simplePairs.filter((_, i) => i !== index))} type="button">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-dashed text-sm font-semibold ${secondaryButton}`} onClick={() => setSimplePairs([...simplePairs, { term: '', definition: '' }])} type="button">
              <Plus size={17} />
              Add row
            </button>
          </div>
        )}

        {paperSeeds.length > 0 && (
          <div className="mt-5">
            <p className={`mb-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] ${muted}`}>Seed from papers</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {paperSeeds.slice(0, 6).map((seed) => (
                <button className={`rounded-xl border p-3 text-left transition hover:-translate-y-0.5 ${secondaryButton}`} key={seed.id} onClick={() => loadSeed(seed)} type="button">
                  <span className="block text-sm font-bold">{seed.label}</span>
                  <span className={`mt-0.5 block text-xs ${muted}`}>{seed.subtitle} · {seed.pairs.length} pairs</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <p className={`mt-4 rounded-xl border px-3 py-2 text-sm font-semibold ${isDark ? 'border-rose-700 bg-rose-950/40 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-800'}`}>{error}</p>}
        <button className={`mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition ${primaryButton}`} onClick={startCustom} type="button">
          <Play size={17} />
          Start practice
        </button>
      </div>
      */}
    </section>
  );
}
