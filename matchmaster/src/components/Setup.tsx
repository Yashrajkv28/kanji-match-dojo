import React, { useState } from 'react';
import { Pair } from '../types';
import { SAMPLE_DATA } from '../utils';
import { BookOpen, Dumbbell, Play, Plus, Trash2, Upload } from 'lucide-react';

interface SetupProps {
  onStart: (pairs: Pair[]) => void;
  onStartPractice: () => void;
  onStartTraining: () => void;
  dailyExpressionCount: number;
}

export default function Setup({
  onStart,
  onStartPractice,
  onStartTraining,
  dailyExpressionCount,
}: SetupProps) {
  const [inputMode, setInputMode] = useState<'simple' | 'bulk'>('bulk');
  const [bulkText, setBulkText] = useState('');
  const [simplePairs, setSimplePairs] = useState<{ term: string; definition: string }[]>([
    { term: '', definition: '' },
    { term: '', definition: '' },
    { term: '', definition: '' },
  ]);

  const handleStart = () => {
    let finalPairs: Pair[] = [];

    if (inputMode === 'bulk') {
      finalPairs = bulkText
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line, index) => {
          // Try to split by common separators
          let parts = line.split(/ [-–—] /); // Dash with spaces
          if (parts.length < 2) parts = line.split('\t'); // Tab
          if (parts.length < 2) parts = line.split(','); // Comma (risky)

          // Fallback if no clear separator found, just split by first space (not ideal but something)
          // Better: If no separator, ignore or put whole line in term
          if (parts.length < 2) {
             // Try looking for just a dash without spaces
             const dashIndex = line.indexOf('-');
             if (dashIndex > 0) {
                 parts = [line.substring(0, dashIndex), line.substring(dashIndex + 1)];
             } else {
                 return null;
             }
          }

          return {
            id: `pair-${index}-${Date.now()}`,
            term: parts[0].trim(),
            definition: parts.slice(1).join(' ').trim(),
          };
        })
        .filter((p): p is Pair => p !== null);
    } else {
      finalPairs = simplePairs
        .filter((p) => p.term.trim() && p.definition.trim())
        .map((p, index) => ({
          id: `pair-${index}-${Date.now()}`,
          term: p.term.trim(),
          definition: p.definition.trim(),
        }));
    }

    if (finalPairs.length < 2) {
      alert('Please add at least 2 pairs to start.');
      return;
    }

    onStart(finalPairs);
  };

  const loadSample = () => {
    setBulkText(SAMPLE_DATA);
    setInputMode('bulk');
  };

  const addSimpleRow = () => {
    setSimplePairs([...simplePairs, { term: '', definition: '' }]);
  };

  const updateSimpleRow = (index: number, field: 'term' | 'definition', value: string) => {
    const newPairs = [...simplePairs];
    newPairs[index][field] = value;
    setSimplePairs(newPairs);
  };

  const removeSimpleRow = (index: number) => {
    setSimplePairs(simplePairs.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Daily Expressions</h1>
          <p className="text-slate-500">
            {dailyExpressionCount} sentence pairs loaded from daily expression.json.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={onStartTraining}
            className="text-left p-5 rounded-xl border border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 mb-4">
              <BookOpen size={22} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Training Module</h2>
            <p className="text-sm text-slate-500 mt-2">
              Study every English sentence and reveal the Japanese answer one card at a time.
            </p>
          </button>

          <button
            onClick={onStartPractice}
            className="text-left p-5 rounded-xl border border-indigo-200 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white shadow-lg shadow-indigo-200"
          >
            <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center mb-4">
              <Dumbbell size={22} />
            </div>
            <h2 className="text-xl font-bold">Practice Module</h2>
            <p className="text-sm text-indigo-100 mt-2">
              Match all {dailyExpressionCount} sentences. Questions shuffle each time practice starts.
            </p>
          </button>
        </div>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Custom Worksheet</h2>
        <p className="text-slate-500">Create a matching exercise by entering your own terms and definitions below.</p>
      </div>

      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setInputMode('bulk')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            inputMode === 'bulk'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Bulk Input
        </button>
        <button
          onClick={() => setInputMode('simple')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            inputMode === 'simple'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Manual Entry
        </button>
      </div>

      {inputMode === 'bulk' ? (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Enter pairs, one per line. Example:&#10;Apple - A red fruit&#10;Banana - A yellow fruit"
              className="w-full h-64 p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none font-mono text-sm resize-y"
            />
            <button
              onClick={loadSample}
              className="absolute top-4 right-4 text-xs bg-white border border-slate-200 px-2 py-1 rounded shadow-sm hover:bg-slate-50 text-slate-500 flex items-center gap-1"
            >
              <Upload size={12} /> Load Sample
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Supported separators: " - ", tab, or comma.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {simplePairs.map((pair, index) => (
            <div key={index} className="flex gap-3 items-center">
              <span className="text-slate-400 font-mono text-sm w-6 text-right">{index + 1}.</span>
              <input
                type="text"
                value={pair.term}
                onChange={(e) => updateSimpleRow(index, 'term', e.target.value)}
                placeholder="Term (Column A)"
                className="flex-1 p-2 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none"
              />
              <input
                type="text"
                value={pair.definition}
                onChange={(e) => updateSimpleRow(index, 'definition', e.target.value)}
                placeholder="Definition (Column B)"
                className="flex-1 p-2 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none"
              />
              <button
                onClick={() => removeSimpleRow(index)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            onClick={addSimpleRow}
            className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={18} /> Add Row
          </button>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <Play size={20} /> Generate Worksheet
        </button>
      </div>
    </div>
    </div>
  );
}
