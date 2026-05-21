import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type React from 'react';
import { KANJI_VIEWBOX } from './kanjiStrokes';

/**
 * Square drawing surface with pointer-based brush. Captures distinct strokes
 * (one stroke per pointer-down → pointer-up cycle) and exposes:
 *   - the underlying <canvas> element via ref (for IoU scoring)
 *   - the current stroke count
 *   - clear() and undo() actions on the imperative handle
 *
 * With `eraseMode` on, pointer input removes whole strokes instead of drawing:
 * a tap deletes the stroke under it, a drag deletes every stroke it crosses.
 */

export interface DrawCanvasHandle {
  getCanvas: () => HTMLCanvasElement | null;
  clear: () => void;
  undo: () => void;
  getStrokeCount: () => number;
}

interface DrawCanvasProps {
  /** When true, pointer input erases whole strokes instead of drawing. */
  eraseMode?: boolean;
  /** KanjiVG stroke paths rendered behind the drawing area as a faint ghost. */
  ghostStrokes?: string[];
  isDark: boolean;
  /** Called when the stroke count changes so the host can re-render. */
  onStrokeCountChange?: (count: number) => void;
  /** Width/height of the square canvas in pixels. */
  size?: number;
  /** Brush stroke width in pixels. */
  strokeWidth?: number;
}

type Point = { x: number; y: number };
type Stroke = Point[];

/** Pointer-to-stroke hit radius for the eraser, in canvas pixels. */
const ERASE_RADIUS = 12;

/** Shortest distance from point (px,py) to the segment (ax,ay)-(bx,by). */
function pointSegmentDistance(
  px: number, py: number, ax: number, ay: number, bx: number, by: number,
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** True when point `p` lies within `radius` of any part of `stroke`. */
function strokeHit(stroke: Stroke, p: Point, radius: number): boolean {
  if (stroke.length === 0) return false;
  if (stroke.length === 1) {
    return Math.hypot(p.x - stroke[0].x, p.y - stroke[0].y) <= radius;
  }
  for (let i = 0; i < stroke.length - 1; i += 1) {
    if (pointSegmentDistance(p.x, p.y, stroke[i].x, stroke[i].y, stroke[i + 1].x, stroke[i + 1].y) <= radius) {
      return true;
    }
  }
  return false;
}

export const DrawCanvas = forwardRef<DrawCanvasHandle, DrawCanvasProps>(function DrawCanvas(
  { eraseMode = false, ghostStrokes, isDark, onStrokeCountChange, size = 320, strokeWidth = 9 },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef<boolean>(false);
  const erasingRef = useRef<boolean>(false);
  const currentStrokeRef = useRef<Stroke>([]);
  const strokesRef = useRef<Stroke[]>([]);
  const [strokeCount, setStrokeCount] = useState(0);

  const inkColor = isDark ? '#fef3c7' : '#1c1917';

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = inkColor;
    for (const stroke of strokesRef.current) {
      if (stroke.length === 0) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i += 1) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      // For a single-point tap, draw a dot.
      if (stroke.length === 1) {
        ctx.lineTo(stroke[0].x + 0.01, stroke[0].y + 0.01);
      }
      ctx.stroke();
    }
  }, [inkColor, strokeWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;
    redraw();
  }, [size, redraw]);

  // Re-render when theme changes (inkColor changes).
  useEffect(() => {
    redraw();
  }, [inkColor, redraw]);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    clear: () => {
      strokesRef.current = [];
      currentStrokeRef.current = [];
      drawingRef.current = false;
      setStrokeCount(0);
      onStrokeCountChange?.(0);
      redraw();
    },
    undo: () => {
      if (strokesRef.current.length === 0) return;
      strokesRef.current = strokesRef.current.slice(0, -1);
      const next = strokesRef.current.length;
      setStrokeCount(next);
      onStrokeCountChange?.(next);
      redraw();
    },
    getStrokeCount: () => strokesRef.current.length,
  }), [onStrokeCountChange, redraw]);

  const localPoint = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  // Remove every stroke touched by an erase at `p`; no-op if nothing is hit.
  const eraseAt = (p: Point) => {
    const remaining = strokesRef.current.filter((s) => !strokeHit(s, p, ERASE_RADIUS));
    if (remaining.length === strokesRef.current.length) return;
    strokesRef.current = remaining;
    setStrokeCount(remaining.length);
    onStrokeCountChange?.(remaining.length);
    redraw();
  };

  const handlePointerDown: React.PointerEventHandler<HTMLCanvasElement> = (event) => {
    event.preventDefault();
    canvasRef.current?.setPointerCapture(event.pointerId);
    const point = localPoint(event);
    if (eraseMode) {
      erasingRef.current = true;
      eraseAt(point);
      return;
    }
    drawingRef.current = true;
    currentStrokeRef.current = [point];
    strokesRef.current = [...strokesRef.current, currentStrokeRef.current];
    redraw();
  };

  const handlePointerMove: React.PointerEventHandler<HTMLCanvasElement> = (event) => {
    if (eraseMode) {
      if (!erasingRef.current) return;
      event.preventDefault();
      eraseAt(localPoint(event));
      return;
    }
    if (!drawingRef.current) return;
    event.preventDefault();
    currentStrokeRef.current.push(localPoint(event));
    redraw();
  };

  const finishStroke = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const next = strokesRef.current.length;
    setStrokeCount(next);
    onStrokeCountChange?.(next);
  };

  const handlePointerUp: React.PointerEventHandler<HTMLCanvasElement> = (event) => {
    canvasRef.current?.releasePointerCapture?.(event.pointerId);
    erasingRef.current = false;
    finishStroke();
  };

  return (
    <div
      className={`relative inline-block overflow-hidden rounded-2xl border shadow-sm ${
        isDark ? 'border-stone-700 bg-stone-950' : 'border-stone-200 bg-white'
      }`}
      style={{ width: size, height: size }}
    >
      {/* Grid + ghost reference behind the canvas */}
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
      {ghostStrokes && ghostStrokes.length > 0 && (
        <svg
          aria-hidden
          className="absolute inset-0 pointer-events-none select-none"
          viewBox={`0 0 ${KANJI_VIEWBOX} ${KANJI_VIEWBOX}`}
          width={size}
          height={size}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ghostStrokes.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke={isDark ? 'rgba(254,243,199,0.22)' : 'rgba(28,25,23,0.20)'}
              strokeWidth={5}
            />
          ))}
        </svg>
      )}
      <canvas
        ref={canvasRef}
        className={`relative h-full w-full touch-none ${eraseMode ? 'cursor-crosshair' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      <div
        className={`pointer-events-none absolute bottom-2 right-2 rounded-full px-2 py-0.5 text-[0.65rem] font-bold tabular-nums ${
          isDark ? 'bg-stone-900/80 text-amber-200' : 'bg-white/90 text-red-700'
        }`}
      >
        {strokeCount} stroke{strokeCount === 1 ? '' : 's'}
      </div>
    </div>
  );
});
