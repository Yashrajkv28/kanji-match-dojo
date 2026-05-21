import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { KANJI_VIEWBOX } from './kanjiStrokes';

/**
 * Guided stroke-order animation for a single kanji.
 *
 * Renders the KanjiVG stroke paths and inks them on, one stroke at a time, in
 * the correct writing order. Two ways to use it from one engine:
 *   - Watch: press Play and the strokes auto-advance start → finish.
 *   - Step:  use Prev / Next to move one stroke at a time at your own pace.
 *
 * Each stroke is animated by tweening an SVG path's `pathLength` from 0 → 1.
 * Per-stroke duration is derived from the measured path length so long and
 * short strokes are drawn at a roughly constant speed.
 */

interface KanjiGuideProps {
  /** The kanji glyph (used only for keys / labels). */
  kanji: string;
  /** Ordered stroke `d` strings, canonical writing order. */
  strokes: string[];
  isDark: boolean;
  /** Width/height of the square render area in pixels. */
  size?: number;
}

/** Drawing speed in viewBox units per second (constant-speed feel). */
const DRAW_SPEED = 78;
/** Floor so very short strokes still read as a deliberate motion. */
const MIN_STROKE_SEC = 0.4;
/** Pause between strokes during auto-play. */
const PAUSE_BETWEEN_MS = 360;

/** Parse the initial move (`M x y`) of a path to locate the stroke start. */
function strokeStart(d: string): { x: number; y: number } | null {
  const m = /^[Mm]\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/.exec(d.trim());
  if (!m) return null;
  return { x: parseFloat(m[1]), y: parseFloat(m[2]) };
}

export function KanjiGuide({ kanji, strokes, isDark, size = 320 }: KanjiGuideProps) {
  const total = strokes.length;

  // Number of strokes currently revealed. The stroke at index `revealed - 1`
  // is the one that animates when `revealed` last changed.
  const [revealed, setRevealed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [finished, setFinished] = useState(false);
  // Measured path lengths (viewBox units), filled in after first layout.
  const [lengths, setLengths] = useState<number[]>([]);

  const measureRef = useRef<SVGGElement | null>(null);

  const inkColor = isDark ? '#fef3c7' : '#1c1917';
  const activeColor = isDark ? '#34d399' : '#047857';
  const ghostColor = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.09)';
  const dotColor = isDark ? '#6ee7b7' : '#059669';

  // Measure each stroke's path length once the paths are in the DOM.
  useLayoutEffect(() => {
    const group = measureRef.current;
    if (!group) return;
    const next: number[] = [];
    group.querySelectorAll('path').forEach((node) => {
      next.push((node as SVGPathElement).getTotalLength());
    });
    setLengths(next);
  }, [strokes]);

  // Restart from scratch whenever the kanji changes.
  useEffect(() => {
    setRevealed(0);
    setFinished(false);
    setPlaying(true);
  }, [kanji]);

  const activeIndex = revealed - 1;
  const activeDuration = useMemo(() => {
    const len = lengths[activeIndex];
    if (!len || !Number.isFinite(len)) return 0.7;
    return Math.max(MIN_STROKE_SEC, len / DRAW_SPEED);
  }, [lengths, activeIndex]);

  // Auto-advance during playback: reveal the first stroke, then step forward
  // once each stroke has had time to ink on. The final stroke is left to
  // `handleStrokeDone` so the finished state lands exactly on completion.
  useEffect(() => {
    if (!playing || total === 0) return;
    if (revealed === 0) {
      setRevealed(1);
      return;
    }
    if (revealed >= total) return;
    const t = setTimeout(
      () => setRevealed((r) => r + 1),
      activeDuration * 1000 + PAUSE_BETWEEN_MS,
    );
    return () => clearTimeout(t);
  }, [playing, revealed, total, activeDuration]);

  // Fires when any stroke finishes inking on. Only the final stroke matters
  // here — it flips the guide into its completed (all-ink) state.
  const handleStrokeDone = () => {
    if (revealed >= total) {
      setFinished(true);
      setPlaying(false);
    }
  };

  const stop = () => setPlaying(false);

  const handlePlayPause = () => {
    if (playing) {
      stop();
      return;
    }
    if (finished || revealed >= total) {
      setRevealed(0);
      setFinished(false);
    }
    setPlaying(true);
  };

  const handleNext = () => {
    stop();
    if (revealed < total) {
      setFinished(false);
      setRevealed((r) => r + 1);
    }
  };

  const handlePrev = () => {
    stop();
    setFinished(false);
    setRevealed((r) => Math.max(0, r - 1));
  };

  const handleRestart = () => {
    setFinished(false);
    setRevealed(0);
    setPlaying(true);
  };

  const startPoint = activeIndex >= 0 ? strokeStart(strokes[activeIndex]) : null;
  const showActive = activeIndex >= 0 && !finished;

  const btnBase = `inline-flex h-9 w-9 items-center justify-center rounded-xl border text-sm transition disabled:opacity-40 ${
    isDark
      ? 'border-stone-700 bg-stone-950 text-stone-100 hover:bg-stone-800'
      : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-100'
  }`;

  return (
    <div className="flex flex-col items-center gap-3" style={{ width: size }}>
      <div
        className={`relative overflow-hidden rounded-2xl border shadow-sm ${
          isDark ? 'border-stone-700 bg-stone-950' : 'border-stone-200 bg-white'
        }`}
        style={{ width: size, height: size }}
      >
        {/* Quarter grid, matching the drawing canvas. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(0,0,0,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.07) 1px, transparent 1px)',
            backgroundSize: `${size / 4}px ${size / 4}px`,
          }}
        />

        <svg
          viewBox={`0 0 ${KANJI_VIEWBOX} ${KANJI_VIEWBOX}`}
          width={size}
          height={size}
          className="relative"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Hidden copy of every stroke, used only to measure path lengths. */}
          <g ref={measureRef} style={{ visibility: 'hidden' }}>
            {strokes.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {/* Faint preview of strokes not yet drawn — keeps the target shape visible. */}
          {strokes.map((d, i) =>
            i >= revealed ? (
              <path key={`ghost-${i}`} d={d} stroke={ghostColor} strokeWidth={6} />
            ) : null,
          )}

          {/* Strokes already completed (every revealed stroke once finished). */}
          {strokes.map((d, i) => {
            const isCompleted = finished ? i < revealed : i < activeIndex;
            return isCompleted ? (
              <path key={`done-${i}`} d={d} stroke={inkColor} strokeWidth={7} />
            ) : null;
          })}

          {/* The active stroke — inks itself on via pathLength 0 → 1. */}
          {showActive && (
            <motion.path
              key={`active-${kanji}-${revealed}`}
              d={strokes[activeIndex]}
              stroke={activeColor}
              strokeWidth={7.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: activeDuration, ease: 'easeInOut' }}
              onAnimationComplete={handleStrokeDone}
            />
          )}

          {/* Pulsing dot marking where the active stroke begins. */}
          {showActive && startPoint && (
            <motion.circle
              key={`dot-${kanji}-${revealed}`}
              cx={startPoint.x}
              cy={startPoint.y}
              r={4}
              fill={dotColor}
              initial={{ scale: 0.6, opacity: 0.4 }}
              animate={{ scale: [0.7, 1.25, 0.9], opacity: [0.5, 1, 0.85] }}
              transition={{ duration: 0.9, repeat: Infinity, repeatType: 'reverse' }}
              style={{ transformOrigin: `${startPoint.x}px ${startPoint.y}px` }}
            />
          )}
        </svg>

        {/* Stroke counter. */}
        <div
          className={`pointer-events-none absolute bottom-2 right-2 rounded-full px-2 py-0.5 text-[0.65rem] font-bold tabular-nums ${
            isDark ? 'bg-stone-900/80 text-emerald-200' : 'bg-white/90 text-emerald-700'
          }`}
        >
          {finished ? total : Math.max(0, revealed)} / {total}
        </div>
      </div>

      {/* Playback controls — Play drives Watch mode, Prev/Next drive Step mode. */}
      <div className="flex items-center gap-2">
        <button type="button" onClick={handleRestart} className={btnBase} aria-label="Restart">
          <RotateCcw size={15} />
        </button>
        <button
          type="button"
          onClick={handlePrev}
          disabled={revealed <= 0}
          className={btnBase}
          aria-label="Previous stroke"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={handlePlayPause}
          aria-label={playing ? 'Pause' : 'Play'}
          className={`inline-flex h-9 items-center gap-1.5 rounded-xl px-4 text-sm font-bold transition ${
            isDark
              ? 'bg-emerald-500 text-stone-950 hover:bg-emerald-400'
              : 'bg-emerald-700 text-white hover:bg-emerald-600'
          }`}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
          {playing ? 'Pause' : finished ? 'Replay' : 'Play'}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={revealed >= total}
          className={btnBase}
          aria-label="Next stroke"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
