/**
 * Drawing scoring helpers.
 *
 * Phase 1 grading uses two cheap signals:
 *   1. Pixel-overlap IoU (Jaccard) between the user's drawing and the
 *      canonical kanji rasterised from its KanjiVG stroke paths — the same
 *      shape the Guide animation and the Trace ghost are built from.
 *   2. Stroke-count delta — number of strokes the user actually drew vs.
 *      the expected stroke count from KanjiVG.
 *
 * Both are combined into a single 0-100 score plus a short critique.
 * Everything is client-side. No model, no backend.
 */

import { KANJI_VIEWBOX } from './kanjiStrokes';

/**
 * Stroke width of the rasterised reference, in KanjiVG viewBox units. Tuned so
 * the reference band is about as thick as the user's brush after both are
 * normalised for grading — a faithful centerline trace then fills it and
 * scores near 100, while sloppy strokes lose overlap gracefully.
 */
const REF_STROKE_WIDTH = 3.5;

export interface GradeInput {
  /** Source canvas the user drew on. */
  userCanvas: HTMLCanvasElement;
  /** Number of distinct strokes the user produced (pointer down → up). */
  userStrokeCount: number;
  /** Ordered KanjiVG stroke paths for the canonical glyph. */
  targetStrokes: string[];
  /** Expected stroke count for the canonical glyph. */
  expectedStrokeCount: number;
  /** Optional grading size (square). Defaults to 256. */
  size?: number;
}

export interface GradeResult {
  /** 0–100 overall score. */
  score: number;
  /** 0–100 raw IoU score. */
  iou: number;
  /** 0–100 stroke-count component (100 = exact match). */
  strokeScore: number;
  /** Human-readable feedback lines, ordered worst → best. */
  notes: string[];
}

/**
 * Render the target kanji onto an offscreen canvas by stroking its KanjiVG
 * paths — black ink on white. Using the same vector data as the Guide
 * animation and the Trace ghost keeps the reference shape the learner sees
 * identical to the shape they are graded against.
 */
function rasterizeTarget(strokes: string[], size: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Map the KanjiVG viewBox onto the grading canvas; lineWidth is then in
  // viewBox units, so the reference scales cleanly with the grading size.
  ctx.scale(size / KANJI_VIEWBOX, size / KANJI_VIEWBOX);
  ctx.strokeStyle = '#000000';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = REF_STROKE_WIDTH;
  for (const d of strokes) {
    ctx.stroke(new Path2D(d));
  }
  return canvas;
}

/**
 * Normalize a canvas to a binary mask (1 = ink, 0 = blank) at a square
 * downscaled size. The downscale plus a luminance threshold cheaply
 * de-noises both the reference glyph and the user's ink stroke.
 */
function toMask(source: HTMLCanvasElement, size: number, threshold = 200): Uint8Array {
  const work = document.createElement('canvas');
  work.width = size;
  work.height = size;
  const ctx = work.getContext('2d');
  const mask = new Uint8Array(size * size);
  if (!ctx) return mask;

  // White background ensures user canvas (which may be transparent or themed)
  // still produces meaningful luminance contrast.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Auto-fit: find user's bounding box and stretch to fill so a small drawing
  // gets compared to a properly-sized reference. Skip the auto-fit for the
  // reference canvas (we already rendered it centred).
  const bbox = boundingBox(source);
  if (bbox) {
    const pad = 4;
    const sx = bbox.x;
    const sy = bbox.y;
    const sw = bbox.w;
    const sh = bbox.h;
    ctx.drawImage(source, sx, sy, sw, sh, pad, pad, size - pad * 2, size - pad * 2);
  } else {
    ctx.drawImage(source, 0, 0, size, size);
  }

  const data = ctx.getImageData(0, 0, size, size).data;
  for (let i = 0; i < size * size; i += 1) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const a = data[i * 4 + 3];
    // Pure white background → blank. Anything else → ink.
    const luminance = (r + g + b) / 3;
    mask[i] = a > 0 && luminance < threshold ? 1 : 0;
  }
  return mask;
}

/**
 * Find the tight bounding box of non-white pixels. Returns null if the
 * canvas is empty/blank.
 */
function boundingBox(source: HTMLCanvasElement): { x: number; y: number; w: number; h: number } | null {
  const ctx = source.getContext('2d');
  if (!ctx) return null;
  const { width, height } = source;
  const data = ctx.getImageData(0, 0, width, height).data;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      const luminance = (r + g + b) / 3;
      if (a > 0 && luminance < 240) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) return null;
  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

/**
 * Flatten the user's drawing to canonical black-on-white.
 *
 * The drawing canvas is transparent except where strokes were laid down, and
 * the stroke colour follows the UI theme — near-black in light mode but a pale
 * amber in dark mode. Luminance-based ink detection misses that pale colour, so
 * we use the alpha channel (the real "did the user draw here" signal) to
 * recolour every drawn pixel to solid black before masking. Without this, dark
 * mode produces an all-blank mask and the IoU score collapses to zero.
 */
function normalizeUserInk(source: HTMLCanvasElement): HTMLCanvasElement {
  const out = document.createElement('canvas');
  out.width = source.width;
  out.height = source.height;
  const ctx = out.getContext('2d');
  if (!ctx) return source;

  // Copy the strokes (colour + alpha), recolour every opaque pixel to black,
  // then drop a white background in behind them.
  ctx.drawImage(source, 0, 0);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, out.width, out.height);
  return out;
}

/**
 * Jaccard / IoU between two binary masks. Returns a value in [0, 1].
 */
function jaccard(a: Uint8Array, b: Uint8Array): number {
  if (a.length !== b.length) return 0;
  let intersection = 0;
  let union = 0;
  for (let i = 0; i < a.length; i += 1) {
    const av = a[i];
    const bv = b[i];
    if (av || bv) {
      union += 1;
      if (av && bv) intersection += 1;
    }
  }
  return union === 0 ? 0 : intersection / union;
}

/**
 * Stroke-count score:
 *   - exact match → 100
 *   - off by 1 → 70
 *   - off by 2 → 40
 *   - off by 3+ → max(0, 100 - |delta| * 25)
 */
function strokeCountScore(actual: number, expected: number): number {
  const diff = Math.abs(actual - expected);
  if (diff === 0) return 100;
  if (diff === 1) return 70;
  if (diff === 2) return 40;
  return Math.max(0, 100 - diff * 25);
}

export function gradeDrawing(input: GradeInput): GradeResult {
  const size = input.size ?? 192;
  const userMask = toMask(normalizeUserInk(input.userCanvas), size);
  const target = rasterizeTarget(input.targetStrokes, size);
  const targetMask = toMask(target, size);

  const iouRaw = jaccard(userMask, targetMask);
  const iou = Math.round(iouRaw * 100);

  const strokeScore = strokeCountScore(input.userStrokeCount, input.expectedStrokeCount);

  // Weight IoU heavier than stroke-count since shape is what we mostly care about.
  const score = Math.round(iou * 0.7 + strokeScore * 0.3);

  const notes: string[] = [];
  if (iou < 25) notes.push('The shape is quite different from the reference. Try making strokes the same size and in roughly the same position.');
  else if (iou < 55) notes.push('Outline is close but parts of the kanji are missing or oversized.');
  else if (iou < 80) notes.push('Good shape match. A few details are off.');
  else notes.push('Excellent shape match.');

  if (input.userStrokeCount === input.expectedStrokeCount) {
    notes.push(`Stroke count is correct (${input.expectedStrokeCount}).`);
  } else {
    const delta = input.userStrokeCount - input.expectedStrokeCount;
    notes.push(
      delta > 0
        ? `You used ${delta} more stroke${delta === 1 ? '' : 's'} than expected (${input.expectedStrokeCount}).`
        : `You used ${Math.abs(delta)} fewer stroke${Math.abs(delta) === 1 ? '' : 's'} than expected (${input.expectedStrokeCount}).`,
    );
  }

  return { score, iou, strokeScore, notes };
}
