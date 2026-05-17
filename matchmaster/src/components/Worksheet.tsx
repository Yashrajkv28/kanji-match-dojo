import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Pair } from '../types';
import { CheckCircle, RefreshCw, ArrowLeft, Type, Link as LinkIcon, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { getColumnLabel } from '../utils';

interface WorksheetProps {
  totalCount: number;
  shuffledTerms: Pair[];
  shuffledDefinitions: Pair[];
  onComplete: (userMatches: Record<string, string>) => void;
  onReset: () => void;
  onReshuffle: () => void;
}

type Mode = 'classic' | 'connect';
type AttemptFeedback = {
  termId: string;
  defId: string;
  status: 'correct' | 'wrong';
};

export default function Worksheet({
  totalCount,
  shuffledTerms,
  shuffledDefinitions,
  onComplete,
  onReset,
  onReshuffle,
}: WorksheetProps) {
  const [mode, setMode] = useState<Mode>('classic');
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<AttemptFeedback | null>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);
  
  // Refs for line drawing
  const containerRef = useRef<HTMLDivElement>(null);
  const termRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const defRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState<{
    terms: Record<string, { x: number; y: number }>;
    defs: Record<string, { x: number; y: number }>;
  }>({ terms: {}, defs: {} });

  const showFeedback = (nextFeedback: AttemptFeedback) => {
    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }

    setFeedback(nextFeedback);
    feedbackTimeoutRef.current = window.setTimeout(() => {
      setFeedback(null);
      feedbackTimeoutRef.current = null;
    }, 900);
  };

  const handleTermClick = (termId: string) => {
    if (matches[termId]) {
      return;
    }

    if (selectedTermId === termId) {
      setSelectedTermId(null);
      return;
    }

    setSelectedTermId(termId);
  };

  const handleDefinitionClick = (defId: string) => {
    if (!selectedTermId) return;

    if (selectedTermId === defId) {
      setMatches((prev) => ({
        ...prev,
        [selectedTermId]: defId,
      }));
      showFeedback({ termId: selectedTermId, defId, status: 'correct' });
    } else {
      setMatches((prev) => {
        const nextMatches = { ...prev };
        delete nextMatches[selectedTermId];
        return nextMatches;
      });
      showFeedback({ termId: selectedTermId, defId, status: 'wrong' });
    }

    setSelectedTermId(null);
  };

  const isMatched = (termId: string) => !!matches[termId];
  const getMatchedLetter = (termId: string) => {
    const defId = matches[termId];
    if (!defId) return '';
    const index = shuffledDefinitions.findIndex((d) => d.id === defId);
    return index >= 0 ? getColumnLabel(index) : '?';
  };

  // Update coordinates for lines
  const updateCoordinates = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newTermCoords: Record<string, { x: number; y: number }> = {};
    const newDefCoords: Record<string, { x: number; y: number }> = {};

    termRefs.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect();
      // Right side of the term box
      newTermCoords[id] = {
        x: rect.right - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });

    defRefs.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect();
      // Left side of the definition box
      newDefCoords[id] = {
        x: rect.left - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });

    setCoords({ terms: newTermCoords, defs: newDefCoords });
  };

  // Update coords on mount, resize, and mode change
  useLayoutEffect(() => {
    updateCoordinates();
    window.addEventListener('resize', updateCoordinates);
    return () => window.removeEventListener('resize', updateCoordinates);
  }, [mode, shuffledTerms, shuffledDefinitions]);

  // Track mouse for active line drawing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mode === 'connect' && selectedTermId && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - containerRect.left,
          y: e.clientY - containerRect.top,
        });
      }
    };

    if (mode === 'connect') {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mode, selectedTermId]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  // Check if all terms have matches
  const allMatched = shuffledTerms.every((t) => matches[t.id]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={20} /> Edit Setup
          </button>
          
          {/* Mode Toggle */}
          <div className="bg-slate-200 p-1 rounded-lg flex text-sm font-medium">
            <button
              onClick={() => setMode('classic')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                mode === 'classic' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Type size={16} /> Classic
            </button>
            <button
              onClick={() => {
                setMode('connect');
                // Small timeout to allow layout to settle before calculating coords
                setTimeout(updateCoordinates, 50);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                mode === 'connect' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LinkIcon size={16} /> Connect
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onReshuffle}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
            title="Shuffle terms and definitions"
          >
            <RefreshCw size={18} /> <span className="hidden sm:inline">Reshuffle</span>
          </button>
          <button
            onClick={() => {
              setMatches({});
              setFeedback(null);
            }}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
            title="Clear all matches"
          >
            <RotateCcw size={18} /> <span className="hidden sm:inline">Clear</span>
          </button>
          <button
            onClick={() => onComplete(matches)}
            disabled={!allMatched}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-md transition-all ${
              allMatched
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle size={18} /> Check Answers
          </button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 min-h-[600px] relative print:shadow-none print:border-none print:p-0"
      >
        {/* SVG Overlay for Lines */}
        {mode === 'connect' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Drawn Matches */}
            {Object.entries(matches).map(([termId, defId]) => {
              const start = coords.terms[termId];
              const end = coords.defs[defId];
              if (!start || !end) return null;
              
              return (
                <line
                  key={`${termId}-${defId}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="#4f46e5" // indigo-600
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}
            
            {/* Active Dragging Line */}
            {selectedTermId && coords.terms[selectedTermId] && (
              <line
                x1={coords.terms[selectedTermId].x}
                y1={coords.terms[selectedTermId].y}
                x2={mousePos.x}
                y2={mousePos.y}
                stroke="#818cf8" // indigo-400
                strokeWidth="2"
                strokeDasharray="5,5"
                strokeLinecap="round"
              />
            )}
          </svg>
        )}

        <div className="text-center mb-12 border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-serif font-bold text-slate-900">Matching Exercise</h2>
          <p className="text-slate-500 mt-2">
            {totalCount} sentence pairs to match.{' '}
            {mode === 'classic' 
              ? 'Select a sentence, then choose its match for instant feedback.'
              : 'Click an item in Column A, then click its match in Column B for instant feedback.'}
          </p>
          <div className="mt-4 min-h-8 flex items-center justify-center">
            {feedback && (
              <div
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold ${
                  feedback.status === 'correct'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {feedback.status === 'correct' ? 'Correct' : 'Wrong, try again'}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32">
          {/* Column A */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-2">
              Column A
            </h3>
            <div className="space-y-4">
              {shuffledTerms.map((term, index) => {
                const isSelected = selectedTermId === term.id;
                const hasMatch = isMatched(term.id);
                const isCorrectFeedback = feedback?.termId === term.id && feedback.status === 'correct';
                const isWrongFeedback = feedback?.termId === term.id && feedback.status === 'wrong';
                
                return (
                  <div
                    key={term.id}
                    ref={el => { if (el) termRefs.current.set(term.id, el); }}
                    onClick={() => handleTermClick(term.id)}
                    className={`relative group flex items-center gap-4 p-3 rounded-lg transition-all border ${
                      isWrongFeedback
                        ? 'bg-red-50 border-red-300 ring-1 ring-red-200 z-20'
                        : isCorrectFeedback
                        ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-200 z-20'
                        : isSelected
                        ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 z-20'
                        : hasMatch
                        ? 'bg-emerald-50 border-emerald-200 hover:border-emerald-300'
                        : 'bg-white border-transparent hover:bg-slate-50'
                    } ${hasMatch ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex-shrink-0 w-8 text-right font-mono text-slate-400 font-medium select-none">
                      {index + 1}.
                    </div>
                    
                    {/* Classic Mode: Answer Box */}
                    {mode === 'classic' && (
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded border-2 font-bold text-lg transition-colors ${
                          isSelected
                            ? 'border-indigo-500 bg-white text-indigo-600'
                            : isWrongFeedback
                            ? 'border-red-300 bg-red-50 text-red-700'
                            : isCorrectFeedback || hasMatch
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : hasMatch
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-slate-200 bg-slate-50 text-transparent group-hover:border-slate-300'
                        }`}
                      >
                        {getMatchedLetter(term.id)}
                      </div>
                    )}

                    <div className="flex-1 text-slate-800 font-medium text-lg select-none">
                      {term.term}
                    </div>

                    {/* Connect Mode: Dot */}
                    {mode === 'connect' && (
                      <div className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-colors ${
                        isWrongFeedback
                          ? 'bg-red-500 border-red-500'
                          : isSelected
                          ? 'bg-indigo-600 border-indigo-600'
                          : isCorrectFeedback || hasMatch
                          ? 'bg-emerald-600 border-emerald-600'
                          : 'bg-white border-slate-300 group-hover:border-indigo-400'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column B */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-2">
              Column B
            </h3>
            <div className="space-y-4">
              {shuffledDefinitions.map((def, index) => {
                const letter = getColumnLabel(index);
                const isLinkedToSelected = selectedTermId && matches[selectedTermId] === def.id;
                const isUsed = Object.values(matches).includes(def.id);
                const isCorrectFeedback = feedback?.defId === def.id && feedback.status === 'correct';
                const isWrongFeedback = feedback?.defId === def.id && feedback.status === 'wrong';

                return (
                  <div
                    key={def.id}
                    ref={el => { if (el) defRefs.current.set(def.id, el); }}
                    onClick={() => handleDefinitionClick(def.id)}
                    className={`relative flex items-start gap-4 p-3 rounded-lg transition-all border ${
                      isWrongFeedback
                        ? 'bg-red-50 border-red-300 z-20'
                        : isCorrectFeedback
                        ? 'bg-emerald-50 border-emerald-300 z-20'
                        : selectedTermId
                        ? 'cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 border-transparent z-20'
                        : 'cursor-default border-transparent'
                    } ${isLinkedToSelected ? 'bg-indigo-100 border-indigo-200' : ''} ${
                      isUsed && !isLinkedToSelected && !isCorrectFeedback ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Connect Mode: Dot */}
                    {mode === 'connect' && (
                      <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-colors ${
                        isWrongFeedback
                          ? 'bg-red-500 border-red-500'
                          : isCorrectFeedback || isUsed
                          ? 'bg-emerald-600 border-emerald-600'
                          : 'bg-white border-slate-300'
                      }`} />
                    )}

                    <div
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm border select-none ${
                        isWrongFeedback
                          ? 'bg-red-100 text-red-700 border-red-200'
                          : isCorrectFeedback || isUsed
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {letter}
                    </div>
                    <div className="flex-1 text-slate-700 pt-1 select-none">
                      {def.definition}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
