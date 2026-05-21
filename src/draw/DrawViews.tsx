import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Award, Eraser, Eye, EyeOff, Footprints, RotateCcw, Sparkles, Target, Undo2 } from 'lucide-react';
import { DRAW_KANJI, type DrawKanjiData } from './kanjiData';
import { DrawCanvas, type DrawCanvasHandle } from './DrawCanvas';
import { KanjiGuide } from './KanjiGuide';
import { getKanjiStrokes } from './kanjiStrokes';
import { gradeDrawing, type GradeResult } from './scoring';

export const DRAW_PROGRESS_KEY = 'kanji-match-dojo-draw:v1';

export interface DrawProgressState {
  /** Best score 0-100 keyed by kanji glyph. */
  bestScoreByKanji: Record<string, number>;
  /** Attempts count keyed by kanji glyph. */
  attemptsByKanji: Record<string, number>;
}

export function getDefaultDrawProgress(): DrawProgressState {
  return { bestScoreByKanji: {}, attemptsByKanji: {} };
}

export function loadDrawProgress(): DrawProgressState {
  if (typeof window === 'undefined') return getDefaultDrawProgress();
  const stored = window.localStorage.getItem(DRAW_PROGRESS_KEY);
  if (!stored) return getDefaultDrawProgress();
  try {
    const parsed = JSON.parse(stored);
    return {
      bestScoreByKanji: typeof parsed.bestScoreByKanji === 'object' && parsed.bestScoreByKanji ? parsed.bestScoreByKanji : {},
      attemptsByKanji: typeof parsed.attemptsByKanji === 'object' && parsed.attemptsByKanji ? parsed.attemptsByKanji : {},
    };
  } catch {
    return getDefaultDrawProgress();
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   Draw Dashboard — kanji picker grid
   ─────────────────────────────────────────────────────────────────────────── */

interface DrawDashboardProps {
  isDark: boolean;
  onSelect: (kanjiId: number) => void;
  progress: DrawProgressState;
  selectedId: number | null;
}

export function DrawDashboard({ isDark, onSelect, progress, selectedId }: DrawDashboardProps) {
  const completed = DRAW_KANJI.filter((k) => (progress.bestScoreByKanji[k.kanji] ?? 0) >= 80).length;
  const totalAttempts = Object.values(progress.attemptsByKanji).reduce((s, v) => s + v, 0);

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm backdrop-blur ${isDark ? 'border-stone-700/80 bg-stone-900/85' : 'border-stone-200 bg-white/90'}`}>
        <div aria-hidden className={`pointer-events-none absolute -top-24 right-[-4rem] h-56 w-56 rounded-full blur-3xl ${isDark ? 'bg-emerald-500/15' : 'bg-emerald-500/10'}`} />
        <div className="relative mb-5">
          <p className={`text-[0.7rem] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>Kanji Drawing</p>
          <h2 className={`mt-1 text-2xl font-bold leading-tight md:text-3xl ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Trace, freehand, score</h2>
          <p className={`mt-1 text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            {DRAW_KANJI.length} characters · {completed} mastered (≥80%) · {totalAttempts} attempts
          </p>
        </div>
        <div className="relative grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {DRAW_KANJI.map((k) => {
            const best = progress.bestScoreByKanji[k.kanji] ?? 0;
            const tries = progress.attemptsByKanji[k.kanji] ?? 0;
            const selected = selectedId === k.id;
            const mastered = best >= 80;
            return (
              <button
                key={k.id}
                onClick={() => onSelect(k.id)}
                className={`group relative overflow-hidden rounded-2xl border p-3 text-center shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
                  selected
                    ? isDark ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/40 focus:ring-emerald-500' : 'border-emerald-700 bg-emerald-50 ring-1 ring-emerald-500/30 focus:ring-emerald-700'
                    : isDark ? 'border-stone-800 bg-stone-950/70 hover:border-stone-600 focus:ring-emerald-500' : 'border-stone-200 bg-white hover:border-stone-300 focus:ring-emerald-700'
                }`}
                type="button"
              >
                {mastered && (
                  <span aria-hidden className={`absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full text-[0.6rem] font-bold ${isDark ? 'bg-emerald-500 text-stone-950' : 'bg-emerald-700 text-white'}`}>★</span>
                )}
                <div className={`text-4xl leading-none ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{k.kanji}</div>
                <p className={`mt-1 text-[0.7rem] font-bold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>{k.meaning}</p>
                <p className={`text-[0.62rem] ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{k.reading}</p>
                <div className={`mt-1 flex items-center justify-center gap-1 text-[0.6rem] font-semibold ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  <span>{k.strokeCount} stroke{k.strokeCount === 1 ? '' : 's'}</span>
                  {tries > 0 && (
                    <span className={best >= 80 ? (isDark ? 'text-emerald-300' : 'text-emerald-700') : best >= 50 ? (isDark ? 'text-amber-300' : 'text-amber-700') : isDark ? 'text-rose-300' : 'text-rose-700'}>
                      · {best}%
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <aside className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm backdrop-blur ${isDark ? 'border-stone-700/80 bg-stone-900/90' : 'border-stone-200 bg-white/95'}`}>
        <div aria-hidden className={`pointer-events-none absolute -top-16 right-[-3rem] h-36 w-36 rounded-full blur-2xl ${isDark ? 'bg-emerald-500/15' : 'bg-emerald-500/10'}`} />
        <div className="relative">
          <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl shadow-sm ${isDark ? 'bg-emerald-500 text-stone-950' : 'bg-emerald-700 text-white'}`}>
            <Target size={22} />
          </div>
          <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>How it works</p>
          <h3 className={`mt-1 text-xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Pick a kanji and start</h3>
          <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            In Trace mode a faint reference sits behind the canvas — draw on top. In Freehand mode the reference hides; draw from memory. Hit Grade to get an instant score.
          </p>
          <ul className={`mt-3 grid gap-1 text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            <li>• Shape match via pixel overlap (IoU).</li>
            <li>• Bonus for the correct stroke count.</li>
            <li>• Best score per kanji is saved automatically.</li>
          </ul>
          <div className={`mt-5 rounded-xl border p-3 ${isDark ? 'border-stone-700 bg-stone-950/60' : 'border-stone-200 bg-stone-50'}`}>
            <p className={`text-[0.65rem] font-bold uppercase tracking-[0.12em] ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>Progress</p>
            <p className={`mt-1 text-3xl font-bold tabular-nums ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{completed}<span className={`ml-1 text-sm font-semibold ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>/ {DRAW_KANJI.length}</span></p>
            <p className={`mt-1 text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>mastered at 80%+</p>
          </div>
        </div>
      </aside>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Draw Practice — canvas + grader
   ─────────────────────────────────────────────────────────────────────────── */

interface DrawPracticeProps {
  isDark: boolean;
  kanji: DrawKanjiData;
  onBack: () => void;
  onScore: (result: GradeResult) => void;
  onSelectKanji: (id: number) => void;
}

type DrawMode = 'trace' | 'freehand' | 'guide';

export function DrawPractice({ isDark, kanji, onBack, onScore, onSelectKanji }: DrawPracticeProps) {
  const canvasRef = useRef<DrawCanvasHandle | null>(null);
  const [mode, setMode] = useState<DrawMode>('trace');
  const [strokeCount, setStrokeCount] = useState(0);
  const [eraseMode, setEraseMode] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);

  // Reset state when kanji changes.
  useEffect(() => {
    canvasRef.current?.clear();
    setStrokeCount(0);
    setEraseMode(false);
    setResult(null);
  }, [kanji.id]);

  const handleGrade = () => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;
    const graded = gradeDrawing({
      userCanvas: canvas,
      userStrokeCount: canvasRef.current?.getStrokeCount() ?? 0,
      targetStrokes: getKanjiStrokes(kanji.id),
      expectedStrokeCount: kanji.strokeCount,
    });
    setResult(graded);
    onScore(graded);
  };

  const handleClear = () => {
    canvasRef.current?.clear();
    setEraseMode(false);
    setResult(null);
  };

  const handleUndo = () => {
    canvasRef.current?.undo();
    setResult(null);
  };

  const neighborIds = useMemo(() => {
    const idx = DRAW_KANJI.findIndex((k) => k.id === kanji.id);
    return {
      prev: idx > 0 ? DRAW_KANJI[idx - 1].id : null,
      next: idx < DRAW_KANJI.length - 1 ? DRAW_KANJI[idx + 1].id : null,
    };
  }, [kanji.id]);

  const scoreTone = result
    ? result.score >= 80
      ? isDark ? 'border-emerald-700 bg-emerald-950/50 text-emerald-100' : 'border-emerald-300 bg-emerald-50 text-emerald-900'
      : result.score >= 55
        ? isDark ? 'border-amber-700 bg-amber-950/40 text-amber-100' : 'border-amber-300 bg-amber-50 text-amber-900'
        : isDark ? 'border-rose-700 bg-rose-950/40 text-rose-100' : 'border-rose-300 bg-rose-50 text-rose-900'
    : isDark ? 'border-stone-700 bg-stone-900' : 'border-stone-200 bg-white';

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className={`rounded-2xl border p-5 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/85' : 'border-stone-200 bg-white/90'}`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition ${isDark ? 'border-stone-700 bg-stone-950 text-stone-300 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'}`}
            type="button"
          >
            <ArrowLeft size={13} /> All kanji
          </button>
          <div className={`inline-flex rounded-full border p-1 ${isDark ? 'border-stone-700 bg-stone-950/60' : 'border-stone-200 bg-white'}`}>
            <button
              className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-bold transition ${
                mode === 'trace'
                  ? isDark ? 'bg-emerald-500 text-stone-950' : 'bg-emerald-700 text-white'
                  : isDark ? 'text-stone-300 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
              }`}
              onClick={() => setMode('trace')}
              type="button"
            >
              <Eye size={13} /> Trace
            </button>
            <button
              className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-bold transition ${
                mode === 'freehand'
                  ? isDark ? 'bg-emerald-500 text-stone-950' : 'bg-emerald-700 text-white'
                  : isDark ? 'text-stone-300 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
              }`}
              onClick={() => setMode('freehand')}
              type="button"
            >
              <EyeOff size={13} /> Freehand
            </button>
            <button
              className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-bold transition ${
                mode === 'guide'
                  ? isDark ? 'bg-emerald-500 text-stone-950' : 'bg-emerald-700 text-white'
                  : isDark ? 'text-stone-300 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
              }`}
              onClick={() => {
                setMode('guide');
                setResult(null);
              }}
              type="button"
            >
              <Footprints size={13} /> Guide
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{kanji.reading}</p>
            <h2 className={`text-3xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{kanji.meaning}</h2>
            <p className={`mt-1 text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{kanji.strokeCount} stroke{kanji.strokeCount === 1 ? '' : 's'} · {mode === 'trace' ? 'Trace the faint kanji' : mode === 'freehand' ? 'Draw from memory' : 'Watch the stroke order'}</p>
          </div>

          {mode === 'guide' ? (
            <KanjiGuide
              kanji={kanji.kanji}
              strokes={getKanjiStrokes(kanji.id)}
              isDark={isDark}
              size={320}
            />
          ) : (
            <>
              <DrawCanvas
                ref={canvasRef}
                eraseMode={eraseMode}
                ghostStrokes={mode === 'trace' ? getKanjiStrokes(kanji.id) : undefined}
                isDark={isDark}
                onStrokeCountChange={setStrokeCount}
                size={320}
              />

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={handleUndo}
                  disabled={strokeCount === 0}
                  className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition disabled:opacity-50 ${isDark ? 'border-stone-700 bg-stone-950 text-stone-100 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-950 hover:bg-stone-100'}`}
                  type="button"
                >
                  <Undo2 size={15} /> Undo
                </button>
                <button
                  onClick={() => setEraseMode((e) => !e)}
                  aria-pressed={eraseMode}
                  className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                    eraseMode
                      ? isDark ? 'border-rose-500 bg-rose-950/50 text-rose-200' : 'border-rose-400 bg-rose-50 text-rose-700'
                      : isDark ? 'border-stone-700 bg-stone-950 text-stone-100 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-950 hover:bg-stone-100'
                  }`}
                  type="button"
                >
                  <Eraser size={15} /> {eraseMode ? 'Erasing' : 'Eraser'}
                </button>
                <button
                  onClick={handleGrade}
                  disabled={strokeCount === 0}
                  className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 ${
                    isDark
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-stone-950 hover:from-emerald-300 hover:to-emerald-400'
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-500 hover:to-emerald-600'
                  }`}
                  type="button"
                >
                  <Sparkles size={15} /> Grade
                </button>
              </div>
            </>
          )}

          <div className="flex w-full max-w-md justify-between">
            <button
              onClick={() => neighborIds.prev !== null && onSelectKanji(neighborIds.prev)}
              disabled={neighborIds.prev === null}
              className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition disabled:opacity-50 ${isDark ? 'border-stone-700 bg-stone-950 text-stone-300 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'}`}
              type="button"
            >
              ← Previous
            </button>
            <button
              onClick={() => neighborIds.next !== null && onSelectKanji(neighborIds.next)}
              disabled={neighborIds.next === null}
              className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition disabled:opacity-50 ${isDark ? 'border-stone-700 bg-stone-950 text-stone-300 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'}`}
              type="button"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <aside className={`rounded-2xl border p-5 shadow-sm ${scoreTone}`}>
        {mode === 'guide' ? (
          <>
            <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl ${isDark ? 'bg-stone-800 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
              <Footprints size={22} />
            </div>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Stroke order</p>
            <h3 className={`mt-1 text-xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Follow the guide</h3>
            <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              Press Play to watch the kanji drawn in the correct order, or use the arrows to step through one stroke at a time.
            </p>
            <ul className={`mt-3 grid gap-1 text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              <li>• The green dot marks where each stroke starts.</li>
              <li>• Strokes ink on in the canonical writing order.</li>
              <li>• Faint lines preview strokes not yet drawn.</li>
            </ul>
            <div className={`mt-5 rounded-xl border p-3 ${isDark ? 'border-stone-700 bg-stone-950/60' : 'border-stone-200 bg-stone-50'}`}>
              <p className={`text-[0.65rem] font-bold uppercase tracking-[0.12em] ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>Stroke count</p>
              <p className={`mt-1 text-2xl font-bold tabular-nums ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{kanji.strokeCount}</p>
              <p className={`mt-1 text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Switch to Trace or Freehand when you're ready to draw.</p>
            </div>
          </>
        ) : !result ? (
          <>
            <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl ${isDark ? 'bg-stone-800 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
              <Target size={22} />
            </div>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Ready when you are</p>
            <h3 className={`mt-1 text-xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Draw the kanji</h3>
            <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              Each pointer-down to pointer-up counts as one stroke. Lift between strokes so the count is accurate, then hit Grade.
            </p>
            <div className={`mt-5 rounded-xl border p-3 ${isDark ? 'border-stone-700 bg-stone-950/60' : 'border-stone-200 bg-stone-50'}`}>
              <p className={`text-[0.65rem] font-bold uppercase tracking-[0.12em] ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>Stroke count</p>
              <p className={`mt-1 text-2xl font-bold tabular-nums ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{strokeCount} <span className={`text-sm font-semibold ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>/ {kanji.strokeCount}</span></p>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl ${isDark ? 'bg-stone-900 text-emerald-200' : 'bg-white text-emerald-700'}`}>
              <Award size={22} />
            </div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] opacity-75">Your score</p>
            <p className="mt-1 text-5xl font-bold tabular-nums leading-none">{result.score}</p>
            <p className="mt-1 text-xs opacity-75">out of 100</p>

            <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
              <div className={`rounded-xl border px-3 py-2 ${isDark ? 'border-stone-700 bg-stone-900/60' : 'border-white/40 bg-white/40'}`}>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] opacity-75">Shape (IoU)</p>
                <p className="mt-1 text-xl font-bold tabular-nums">{result.iou}</p>
              </div>
              <div className={`rounded-xl border px-3 py-2 ${isDark ? 'border-stone-700 bg-stone-900/60' : 'border-white/40 bg-white/40'}`}>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] opacity-75">Strokes</p>
                <p className="mt-1 text-xl font-bold tabular-nums">{result.strokeScore}</p>
              </div>
            </div>

            <ul className="mt-4 space-y-1.5 text-sm leading-6">
              {result.notes.map((note, i) => (
                <li key={i}>• {note}</li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={handleClear}
                className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${isDark ? 'border-stone-700 bg-stone-900 text-stone-100' : 'border-white/40 bg-white/40 text-current'}`}
                type="button"
              >
                <RotateCcw size={15} /> Try again
              </button>
            </div>
          </motion.div>
        )}
      </aside>
    </section>
  );
}
