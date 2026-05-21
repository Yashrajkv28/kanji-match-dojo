/**
 * Reference stroke counts for the 22 beginner kanji used by Drawing mode.
 *
 * Counts are from KanjiVG (https://kanjivg.tagaini.net/, CC-BY-SA 3.0). They
 * power the stroke-count check in the scoring step. The matching per-stroke
 * vector paths — used by the Guide animation, the Trace ghost, and IoU
 * scoring — live alongside this file in kanjiStrokes.ts.
 */

export interface DrawKanjiData {
  id: number;
  kanji: string;
  meaning: string;
  reading: string;
  strokeCount: number;
}

export const DRAW_KANJI: DrawKanjiData[] = [
  { id: 1, kanji: '一', meaning: 'One', reading: 'ichi', strokeCount: 1 },
  { id: 2, kanji: '二', meaning: 'Two', reading: 'ni', strokeCount: 2 },
  { id: 3, kanji: '三', meaning: 'Three', reading: 'san', strokeCount: 3 },
  { id: 4, kanji: '四', meaning: 'Four', reading: 'yon / shi', strokeCount: 5 },
  { id: 5, kanji: '五', meaning: 'Five', reading: 'go', strokeCount: 4 },
  { id: 6, kanji: '六', meaning: 'Six', reading: 'roku', strokeCount: 4 },
  { id: 7, kanji: '七', meaning: 'Seven', reading: 'nana / shichi', strokeCount: 2 },
  { id: 8, kanji: '八', meaning: 'Eight', reading: 'hachi', strokeCount: 2 },
  { id: 9, kanji: '九', meaning: 'Nine', reading: 'kyu', strokeCount: 2 },
  { id: 10, kanji: '十', meaning: 'Ten', reading: 'ju', strokeCount: 2 },
  { id: 11, kanji: '人', meaning: 'Person', reading: 'hito', strokeCount: 2 },
  { id: 12, kanji: '上', meaning: 'Above / Up', reading: 'ue', strokeCount: 3 },
  { id: 13, kanji: '下', meaning: 'Below / Down', reading: 'shita', strokeCount: 3 },
  { id: 14, kanji: '口', meaning: 'Mouth', reading: 'kuchi', strokeCount: 3 },
  { id: 15, kanji: '山', meaning: 'Mountain', reading: 'yama', strokeCount: 3 },
  { id: 16, kanji: '川', meaning: 'River', reading: 'kawa', strokeCount: 3 },
  { id: 17, kanji: '火', meaning: 'Fire', reading: 'hi', strokeCount: 4 },
  { id: 18, kanji: '水', meaning: 'Water', reading: 'mizu', strokeCount: 4 },
  { id: 19, kanji: '木', meaning: 'Wood', reading: 'ki', strokeCount: 4 },
  { id: 20, kanji: '日', meaning: 'Sun / Day', reading: 'hi / nichi', strokeCount: 4 },
  { id: 21, kanji: '月', meaning: 'Moon', reading: 'tsuki', strokeCount: 4 },
  { id: 22, kanji: '雨', meaning: 'Rain', reading: 'ame', strokeCount: 8 },
];

export function getDrawKanjiById(id: number): DrawKanjiData | undefined {
  return DRAW_KANJI.find((k) => k.id === id);
}
