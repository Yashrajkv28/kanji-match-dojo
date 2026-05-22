import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  Dumbbell,
  Eye,
  Flag,
  Globe2,
  HelpCircle,
  Languages,
  Layers3,
  ListFilter,
  Moon,
  PenTool,
  Play,
  RefreshCw,
  RotateCcw,
  Search,
  Sparkles,
  Sun,
  Target,
  XCircle,
} from 'lucide-react';
import {
  QUESTION_PAPERS,
  type PaperQuestion,
  type QuestionPaper,
} from './data/questionPapers';
import {
  CURATED_PAPERS,
  getCuratedPaper,
  type CuratedPaper,
  type CuratedPaperSection,
} from './data/questionPaperGroups';
import TrainerResults from './trainer/Results';
import TrainerSetup, { type TrainerPaperSeed } from './trainer/Setup';
import TrainerTraining from './trainer/Training';
import TrainerWorksheet from './trainer/Worksheet';
import { DAILY_EXPRESSION_COUNT, DAILY_EXPRESSION_PAIRS } from './trainer/dailyExpressions';
import { type GameState as TrainerGameState, type Pair } from './trainer/types';
import { shuffleArray } from './trainer/utils';
import { DRAW_KANJI, getDrawKanjiById } from './draw/kanjiData';
import { DrawDashboard, DrawPractice, DRAW_PROGRESS_KEY, getDefaultDrawProgress, loadDrawProgress, type DrawProgressState } from './draw/DrawViews';
import { type GradeResult } from './draw/scoring';

/* ─────────────────────────────────────────────────────────────────────────────
   Kanji deck data (existing HEAD baseline)
   ─────────────────────────────────────────────────────────────────────────── */

interface KanjiData {
  id: number;
  kanji: string;
  meaning: string;
  reading: string;
}

interface QuestionSet {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  description: string;
  items: KanjiData[];
}

const BEGINNER_KANJI: KanjiData[] = [
  { id: 1, kanji: '一', meaning: 'One', reading: 'ichi' },
  { id: 2, kanji: '二', meaning: 'Two', reading: 'ni' },
  { id: 3, kanji: '三', meaning: 'Three', reading: 'san' },
  { id: 4, kanji: '四', meaning: 'Four', reading: 'yon / shi' },
  { id: 5, kanji: '五', meaning: 'Five', reading: 'go' },
  { id: 6, kanji: '六', meaning: 'Six', reading: 'roku' },
  { id: 7, kanji: '七', meaning: 'Seven', reading: 'nana / shichi' },
  { id: 8, kanji: '八', meaning: 'Eight', reading: 'hachi' },
  { id: 9, kanji: '九', meaning: 'Nine', reading: 'kyu' },
  { id: 10, kanji: '十', meaning: 'Ten', reading: 'ju' },
  { id: 11, kanji: '人', meaning: 'Person', reading: 'hito' },
  { id: 12, kanji: '上', meaning: 'Above / Up', reading: 'ue' },
  { id: 13, kanji: '下', meaning: 'Below / Down', reading: 'shita' },
  { id: 14, kanji: '口', meaning: 'Mouth', reading: 'kuchi' },
  { id: 15, kanji: '山', meaning: 'Mountain', reading: 'yama' },
  { id: 16, kanji: '川', meaning: 'River', reading: 'kawa' },
  { id: 17, kanji: '火', meaning: 'Fire', reading: 'hi' },
  { id: 18, kanji: '水', meaning: 'Water', reading: 'mizu' },
  { id: 19, kanji: '木', meaning: 'Wood', reading: 'ki' },
  { id: 20, kanji: '日', meaning: 'Sun / Day', reading: 'hi / nichi' },
  { id: 21, kanji: '月', meaning: 'Moon', reading: 'tsuki' },
  { id: 22, kanji: '雨', meaning: 'Rain', reading: 'ame' },
];

const QUESTION_SETS: QuestionSet[] = [
  {
    id: 'beginner-essentials',
    title: 'Beginner Essentials',
    subtitle: '22 core kanji',
    level: 'Starter',
    description: 'Numbers, nature, directions, and everyday nouns for first-pass recognition drills.',
    items: BEGINNER_KANJI,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Storage + view types
   ─────────────────────────────────────────────────────────────────────────── */

// Feature flag — paper test mode is implemented but disabled in the UI for
// now; only paper review is exposed. Flip to true to re-enable test entry
// points without touching the underlying screens.
const PAPER_TEST_ENABLED = false;

const THEME_KEY = 'kanji-matcher-theme';
const PAPER_PROGRESS_KEY = 'kanji-match-dojo-paper-practice:v1';
const LANGUAGE_KEY = 'kanji-match-dojo-language:v1';
const TRAINER_STORAGE_KEY = 'kanji-match-dojo-trainer:v1';
const KANJI_PROGRESS_KEY = 'kanji-match-dojo-kanji-progress:v1';
const ALL_PAPERS_ID = 'all-papers';

type KanjiAppView = 'dashboard' | 'game';
type PaperAppView = 'paper-dashboard' | 'paper-learn' | 'paper-test' | 'paper-results' | 'paper-browser';
type TrainerAppView = 'trainer-setup' | 'trainer-training' | 'trainer-worksheet' | 'trainer-results';
type DrawAppView = 'draw-dashboard' | 'draw-practice';
type AppView = KanjiAppView | PaperAppView | TrainerAppView | DrawAppView;
type AppMode = 'kanji' | 'papers' | 'trainer' | 'draw';
type Theme = 'light' | 'dark';
type Language = 'en' | 'ja';
type PaperFilter = 'all' | 'unanswered' | 'wrong' | 'review';

type PaperListingSection = CuratedPaperSection;
type PaperListing = CuratedPaper;

interface PaperProgressState {
  studiedByScope: Record<string, number>;
  reviewIds: string[];
  wrongIds: string[];
  answeredIds: string[];
}

interface TrainerStorageState {
  bestScore: number | null;
  pairs: Pair[];
}

const QUESTION_PAPER_LISTINGS: PaperListing[] = CURATED_PAPERS;
const DEFAULT_PAPER_ID = QUESTION_PAPER_LISTINGS[0]?.id ?? ALL_PAPERS_ID;

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
   ─────────────────────────────────────────────────────────────────────────── */

function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function clampIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(Math.max(index, 0), total - 1);
}

function isEditableKeyboardTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName);
}

function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem(THEME_KEY);
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialLanguage(): Language {
  const storedLanguage = window.localStorage.getItem(LANGUAGE_KEY);
  return storedLanguage === 'ja' ? 'ja' : 'en';
}

const JAPANESE_EXACT_TRANSLATIONS: Record<string, string> = {
  'Kanji Match Dojo': '漢字マッチ道場',
  'Kanji match dashboard': '漢字マッチ ダッシュボード',
  'Question paper practice': '過去問練習',
  'Question Paper Practice': '過去問練習',
  'Choose a question set': '問題セットを選ぶ',
  'Pick a deck to drill kanji ↔ meaning matching.': '漢字と意味を結びつけるデッキを選びます。',
  'Selected deck': '選択中のデッキ',
  'No deck selected': 'デッキ未選択',
  'Choose a set': 'セットを選ぶ',
  'Pick a deck before starting a drill.': '練習を始める前にデッキを選んでください。',
  'Best time': 'ベストタイム',
  'Not set': '未設定',
  'Start set': 'スタート',
  'Match each character to its meaning': '各文字を意味とマッチ',
  'Board complete.': 'ボード完了。',
  'Current pick': '現在の選択',
  'Choose the matching meaning.': '対応する意味を選んでください。',
  'Select a kanji to begin a match.': '漢字を選んでマッチを始めます。',
  'Perfect score. Subarashii!': '満点です。すばらしい！',
  'Play again': 'もう一度',
  'Kanji': '漢字',
  'Daily': '日常',
  'Papers': '過去問',
  'Trainer': 'トレーナー',
  'Bulk trainer': '一括トレーナー',
  'Bulk trainer results': '一括トレーナー結果',
  'Build a matching worksheet': 'マッチング練習を作成',
  'Paste pairs, use the daily expressions, or seed from an MCQ section.': 'ペアを貼り付ける、日常表現を使う、またはMCQセクションから作成できます。',
  'Study daily expressions': '日常表現を学習',
  'Practice daily expressions': '日常表現を練習',
  'Start a shuffled worksheet immediately.': 'シャッフルされた練習をすぐに始めます。',
  'Custom pairs': 'カスタムペア',
  'Supported separators: dash, tab, or comma.': '区切り文字: ダッシュ、タブ、コンマ。',
  'Bulk input': '一括入力',
  'Manual entry': '手入力',
  'Load sample': '例を読み込む',
  'Load last set': '前回のセット',
  'Seed from papers': '過去問から作成',
  'Start practice': '練習開始',
  'Term': '用語',
  'Definition': '定義',
  'Add row': '行を追加',
  'Please add at least 2 pairs to start.': '開始するには少なくとも2組のペアを追加してください。',
  'Training module': '学習モジュール',
  'Study each pair': '各ペアを学習',
  'Modules': 'モジュール',
  'Practice': '練習',
  'Shuffle study': '学習順をシャッフル',
  'Column A': '列A',
  'Column B': '列B',
  'Matching exercise': 'マッチング練習',
  'Match Column A to Column B': '列Aと列Bをマッチ',
  'Pick a term, then choose its matching definition.': '用語を選び、対応する定義を選んでください。',
  'Edit setup': '設定を編集',
  'Reshuffle': 'シャッフル',
  'Clear': 'クリア',
  'Check answers': '答え合わせ',
  'Correct': '正解',
  'Wrong, try again': '不正解、もう一度',
  'New worksheet': '新しい練習',
  'Retry same set': '同じセットを再挑戦',
  'Best score: Not set': '最高スコア: 未設定',
  'Apple - A red fruit\nBanana - A yellow fruit': 'りんご - 赤い果物\nバナナ - 黄色い果物',
  'Meaning': '意味',
  'Matched': '正解',
  'Misses': 'ミス',
  'Accuracy': '正答率',
  'Time': '時間',
  'Reset': 'リセット',
  'Shuffle': 'シャッフル',
  'Dashboard': 'ダッシュボード',
  'Light': 'ライト',
  'Dark': 'ダーク',
  'Dark mode': 'ダークモード',
  'Light mode': 'ライトモード',
  'English': '英語',
  'Japanese': '日本語',
  'Language': '言語',
  'Shortcuts': 'ショートカット',
  'Keyboard shortcuts': 'キーボードショートカット',
  'Toggle theme': 'テーマ切替',
  'Switch mode': 'モード切替',
  'Move through paper learn questions': '学習問題を移動',
  'Mark current question for review': '現在の問題を復習に追加',
  'Submit test': 'テストを提出',
  'Open shortcuts': 'ショートカットを開く',
  '? opens shortcuts': '? でショートカット',
  'opens shortcuts': 'でショートカット',
  'Close': '閉じる',
  'Skip': 'スキップ',
  'Pick a paper': '過去問を選ぶ',
  'Search papers': '過去問を検索',
  'All': 'すべて',
  'SEE': 'SEE',
  'Mid-sem': '中間試験',
  'Pre-test': '事前テスト',
  'Patterns': 'パターン',
  'No papers match the current filters.': '現在の条件に一致する過去問はありません。',
  'View questions': '問題を見る',
  'View opened questions': '開いている問題を見る',
  'Opened paper': '開いている過去問',
  'Questions': '問題',
  'Answered': '回答済み',
  'Review': '復習',
  'Wrong': '誤答',
  'Progress': '進捗',
  'Full paper review': '全問レビュー',
  'Full paper test': '全問テスト',
  'Review section': 'セクション復習',
  'Test section': 'セクションテスト',
  'Practice review-later': '後で復習を練習',
  'All papers aggregate': '全過去問の集計',
  'All question papers': 'すべての過去問',
  'Aggregate practice scope': '集計練習範囲',
  'All curated papers combined into one review and test scope.': 'すべての厳選過去問を1つの復習・テスト範囲にまとめます。',
  'Aggregate summary': '集計サマリー',
  'Section actions': 'セクション操作',
  'Sections': 'セクション',
  'Full paper': '全問',
  'Opened': '開いています',
  'Back': '戻る',
  'Mark for review': '復習に追加',
  'Marked': '追加済み',
  'Default reveal': '最初から答えを表示',
  'Answer shown': '答え表示中',
  'Show answer': '答えを見る',
  'Test these': 'これをテスト',
  'No questions in scope': 'この範囲に問題はありません',
  'Try a different paper or section.': '別の過去問またはセクションを選んでください。',
  'Answer': '答え',
  'Previous preview': '前の問題プレビュー',
  'Next preview': '次の問題プレビュー',
  'Start of section': 'セクションの先頭',
  'End of section': 'セクションの最後',
  'Previous': '前へ',
  'Next': '次へ',
  'to navigate': 'で移動',
  'No questions available.': '問題がありません。',
  'Submit': '提出',
  'Cancel': 'キャンセル',
  'Submit anyway': 'それでも提出',
  'Unanswered questions will stay out of the score.': '未回答の問題はスコアに含まれません。',
  'Descriptive question — review the answer in Learn mode.': '記述問題です。学習モードで答えを確認してください。',
  'Results': '結果',
  'Retry': '再挑戦',
  'Your answer:': 'あなたの答え:',
  'Correct:': '正解:',
  'Not answered': '未回答',
  'Search prompts': '問題を検索',
  'all': 'すべて',
  'unanswered': '未回答',
  'wrong': '誤答',
  'review': '復習',
  'Mark': '追加',
  'No questions match the current filter.': '現在のフィルターに一致する問題はありません。',
  'PaperKind.SEE': 'SEE',

  // ─── Draw module — chrome, controls, instructional text ──────────────────
  'Draw': '書く',
  'Kanji drawing': '漢字書き',
  'Kanji Drawing': '漢字書き',
  'Trace, freehand, score': 'なぞる・自由書き・採点',
  'Trace': 'なぞる',
  'Freehand': '自由書き',
  'Guide': 'ガイド',
  'Eraser': '消しゴム',
  'Erasing': '消去中',
  'Grade': '採点',
  'Undo': '元に戻す',
  'All kanji': 'すべての漢字',
  'Try again': 'もう一度',
  'Trace the faint kanji': '薄い見本をなぞる',
  'Draw from memory': '記憶から書く',
  'Watch the stroke order': '書き順を見る',
  'Ready when you are': '準備ができたら',
  'Draw the kanji': '漢字を書く',
  'Each pointer-down to pointer-up counts as one stroke. Lift between strokes so the count is accurate, then hit Grade.':
    '画面に触れて離すまでが1画として数えられます。画と画の間で指を離して画数を正しく保ち、最後に「採点」を押してください。',
  'Stroke count': '画数',
  'Your score': 'あなたのスコア',
  'out of 100': '/ 100',
  'Shape (IoU)': '形状（IoU）',
  'Strokes': '画数',
  'How it works': '使い方',
  'Pick a kanji and start': '漢字を選んで始める',
  'In Trace mode a faint reference sits behind the canvas — draw on top. In Freehand mode the reference hides; draw from memory. Hit Grade to get an instant score.':
    'なぞるモードではキャンバスの後ろに薄い見本が表示されるので、その上から書きます。自由書きモードでは見本は隠れるので、記憶から書きます。「採点」を押せばすぐにスコアが出ます。',
  '• Shape match via pixel overlap (IoU).': '• ピクセルの重なり（IoU）で形状を判定。',
  '• Bonus for the correct stroke count.': '• 画数が正しいとボーナス。',
  '• Best score per kanji is saved automatically.': '• 漢字ごとの最高スコアは自動保存。',
  'mastered at 80%+': '80%以上で習得',

  // Guide mode aside
  'Stroke order': '書き順',
  'Follow the guide': 'ガイドに従う',
  'Press Play to watch the kanji drawn in the correct order, or use the arrows to step through one stroke at a time.':
    '「再生」を押すと漢字が正しい書き順で描かれます。矢印で1画ずつ進めることもできます。',
  '• The green dot marks where each stroke starts.': '• 緑の点が各画の開始位置を示します。',
  '• Strokes ink on in the canonical writing order.': '• 正しい書き順で線が描かれます。',
  '• Faint lines preview strokes not yet drawn.': '• 薄い線はまだ書かれていない画のプレビューです。',
  "Switch to Trace or Freehand when you're ready to draw.": '書く準備ができたら、なぞるか自由書きに切り替えてください。',

  // KanjiGuide controls (aria-label + button text)
  'Restart': 'やり直し',
  'Previous stroke': '前の画',
  'Pause': '一時停止',
  'Play': '再生',
  'Next stroke': '次の画',
  'Replay': 'もう一度',

  // Scoring critique notes
  'Excellent shape match.': '形状が非常によく一致しています。',
  'Good shape match. A few details are off.': '形状はよく一致しています。細部に少しずれがあります。',
  'Outline is close but parts of the kanji are missing or oversized.': '輪郭は近いですが、一部が欠けているか大きすぎます。',
  'The shape is quite different from the reference. Try making strokes the same size and in roughly the same position.':
    '形状が見本とかなり異なります。各画を同じ大きさ・位置で書いてみましょう。',

  // ─── Beginner Essentials kanji content (meanings + readings) ─────────────
  'One': '一',
  'Two': '二',
  'Three': '三',
  'Four': '四',
  'Five': '五',
  'Six': '六',
  'Seven': '七',
  'Eight': '八',
  'Nine': '九',
  'Ten': '十',
  'Person': '人',
  'Above / Up': '上',
  'Below / Down': '下',
  'Mouth': '口',
  'Mountain': '山',
  'River': '川',
  'Fire': '火',
  'Water': '水',
  'Wood': '木',
  'Sun / Day': '日',
  'Moon': '月',
  'Rain': '雨',
  'ichi': 'いち',
  'ni': 'に',
  'san': 'さん',
  'yon / shi': 'よん / し',
  'go': 'ご',
  'roku': 'ろく',
  'nana / shichi': 'なな / しち',
  'hachi': 'はち',
  'kyu': 'きゅう',
  'ju': 'じゅう',
  'hito': 'ひと',
  'ue': 'うえ',
  'shita': 'した',
  'kuchi': 'くち',
  'yama': 'やま',
  'kawa': 'かわ',
  'hi': 'ひ',
  'mizu': 'みず',
  'ki': 'き',
  'hi / nichi': 'ひ / にち',
  'tsuki': 'つき',
  'ame': 'あめ',
};

const JAPANESE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/^(\d+) remaining in (.+)$/u, '$1 問残り（$2）'],
  [/^Finished in (.+) with (\d+) misses\.$/u, '$1 で完了、ミス $2 回。'],
  [/^(\d+)\/(\d+) matched last run$/u, '前回 $1/$2 マッチ'],
  [/^(\d+) \/ (\d+) matched$/u, '$1 / $2 マッチ済み'],
  [/^(\d+) \/ (\d+) answered$/u, '$1 / $2 回答済み'],
  [/^Submit with (\d+) unanswered\?$/u, '未回答 $1 問のまま提出しますか？'],
  [/^You got (\d+) out of (\d+) correct\.$/u, '$2 問中 $1 問正解です。'],
  [/^Best score: (\d+)%$/u, '最高スコア: $1%'],
  [/^(\d+) pairs$/u, '$1 ペア'],
  [/^(\d+) bundled sentence pairs\.$/u, '収録文ペア $1 組。'],
  [/^(.+) · (\d+) pairs$/u, '$1・$2 ペア'],
  [/^(\d+) sentence pairs to match\.$/u, '$1 組の文ペアをマッチします。'],
  [/^(\d+) total questions across (\d+) curated papers\.$/u, '厳選過去問 $2 件、合計 $1 問。'],
  [/^(\d+) reviewed$/u, '$1 件復習済み'],
  [/^\(\+(\d+) reviewed\)$/u, '（+$1 件復習）'],
  [/^(\d+) curated papers · (\d+) questions · (\d+) flagged for review$/u, '$1 件の過去問・$2 問・復習 $3 件'],
  [/^(\d+) questions$/u, '$1 問'],
  [/^(\d+) section$/u, '$1 セクション'],
  [/^(\d+) sections$/u, '$1 セクション'],
  [/^(\d+) q$/u, '$1 問'],
  [/^(\d+) to review$/u, '復習 $1 件'],
  [/^(\d+) wrong$/u, '誤答 $1 件'],
  [/^Reviewed (\d+)\/(\d+)$/u, '復習済み $1/$2'],
  [/^(\d+)\/(\d+) reviewed · (.+)$/u, '$1/$2 復習済み・$3'],
  [/^Practice review-later \((\d+)\)$/u, '後で復習を練習（$1）'],
  [/^Sections · (\d+)$/u, 'セクション・$1'],
  [/^(\d+) of (\d+) correct · (\d+)% · (.+)$/u, '$2 問中 $1 問正解・$3%・$4'],

  // Draw module compound strings
  [/^(\d+) characters · (\d+) mastered \(≥80%\) · (\d+) attempts$/u, '$1 文字・$2 習得（80%以上）・$3 回挑戦'],
  [/^Stroke count is correct \((\d+)\)\.$/u, '画数は正しいです（$1）。'],
  [/^You used (\d+) more strokes? than expected \((\d+)\)\.$/u, '見本（$2）より $1 画多く書いています。'],
  [/^You used (\d+) fewer strokes? than expected \((\d+)\)\.$/u, '見本（$2）より $1 画少なく書いています。'],
  [/^(\d+) strokes? · (.+)$/u, '$1 画・$2'],
  [/^· (\d+)%$/u, '・$1%'],
  [/^(\d+) strokes?$/u, '$1 画'],
];

function translateToJapanese(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const exact = JAPANESE_EXACT_TRANSLATIONS[trimmed];
  if (exact) return value.replace(trimmed, exact);
  for (const [pattern, replacement] of JAPANESE_REPLACEMENTS) {
    if (pattern.test(trimmed)) {
      return value.replace(trimmed, trimmed.replace(pattern, replacement));
    }
  }
  return value;
}

function getBestTimeKey(setId: string): string {
  return `kanji-matcher-best-time:${setId}`;
}

function getDefaultPaperProgress(): PaperProgressState {
  return { studiedByScope: {}, reviewIds: [], wrongIds: [], answeredIds: [] };
}

function getInitialPaperProgress(): PaperProgressState {
  const stored = window.localStorage.getItem(PAPER_PROGRESS_KEY);
  if (!stored) return getDefaultPaperProgress();
  try {
    const parsed = JSON.parse(stored);
    return {
      studiedByScope: typeof parsed.studiedByScope === 'object' && parsed.studiedByScope !== null ? parsed.studiedByScope : {},
      reviewIds: Array.isArray(parsed.reviewIds) ? parsed.reviewIds : [],
      wrongIds: Array.isArray(parsed.wrongIds) ? parsed.wrongIds : [],
      answeredIds: Array.isArray(parsed.answeredIds) ? parsed.answeredIds : [],
    };
  } catch {
    return getDefaultPaperProgress();
  }
}

function getInitialTrainerStorage(): TrainerStorageState {
  const stored = window.localStorage.getItem(TRAINER_STORAGE_KEY);
  if (!stored) return { bestScore: null, pairs: [] };
  try {
    const parsed = JSON.parse(stored);
    const pairs = Array.isArray(parsed.pairs)
      ? parsed.pairs.filter((pair: Partial<Pair>) => typeof pair.id === 'string' && typeof pair.term === 'string' && typeof pair.definition === 'string')
      : [];
    const bestScore = typeof parsed.bestScore === 'number' && Number.isFinite(parsed.bestScore) ? parsed.bestScore : null;
    return { bestScore, pairs };
  } catch {
    return { bestScore: null, pairs: [] };
  }
}

function getInitialKanjiProgress(): Record<string, number> {
  const stored = window.localStorage.getItem(KANJI_PROGRESS_KEY);
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function getDefaultTrainerGameState(pairs: Pair[] = []): TrainerGameState {
  return {
    pairs,
    status: 'setup',
    shuffledTerms: [],
    shuffledDefinitions: [],
    userMatches: {},
  };
}

function calculateTrainerScore(pairs: Pair[], matches: Record<string, string>): number {
  if (pairs.length === 0) return 0;
  const correct = pairs.filter((pair) => matches[pair.id] === pair.id).length;
  return Math.round((correct / pairs.length) * 100);
}

function buildTrainerPaperSeeds(): TrainerPaperSeed[] {
  return CURATED_PAPERS.flatMap((paper) => paper.sections.map((section) => {
    const pairs = section.questions
      .filter((question) => question.options.length > 1)
      .map((question, index) => {
        const correct = question.options.find((option) => option.isCorrect);
        return correct
          ? {
            id: `${section.id}-trainer-${index}`,
            term: `${question.number} ${question.prompt}`,
            definition: correct.text,
          }
          : null;
      })
      .filter((pair): pair is Pair => pair !== null);

    return {
      id: `${paper.id}-${section.id}`,
      label: `${paper.title} - ${section.title}`,
      subtitle: section.subtitle ?? paper.subtitle ?? 'Curated paper section',
      pairs,
    };
  })).filter((seed) => seed.pairs.length >= 2);
}

function getPaperScopeKey(paperId: string, sectionId: string): string {
  return `${paperId}:${sectionId}`;
}

function getPaperListing(paperId: string): PaperListing | undefined {
  return getCuratedPaper(paperId);
}

function getPaperSectionsForScope(paperId: string): PaperListingSection[] {
  if (paperId === ALL_PAPERS_ID) {
    return QUESTION_PAPER_LISTINGS.map((listing) => ({
      id: listing.id,
      title: listing.title,
      subtitle: listing.subtitle,
      rawPaperId: listing.id,
      questions: listing.questions,
    }));
  }

  const listing = getPaperListing(paperId);
  if (listing) return listing.sections;

  const paper = QUESTION_PAPERS.find((candidate) => candidate.id === paperId);
  if (!paper) return [];
  return paper.sections.map((section) => ({
    id: section.id,
    title: section.title,
    rawPaperId: paper.id,
    rawSectionId: section.id,
    questions: paper.questions.filter((q) => q.sectionId === section.id || q.sectionTitle === section.title),
  }));
}

function getQuestionsForScope(paperId: string, sectionId: string): PaperQuestion[] {
  if (paperId === ALL_PAPERS_ID) {
    if (sectionId === 'all') return QUESTION_PAPERS.flatMap((p) => p.questions);
    const agg = QUESTION_PAPER_LISTINGS.find((l) => l.id === sectionId);
    return agg ? agg.questions : QUESTION_PAPERS.flatMap((p) => p.questions);
  }
  const listing = getPaperListing(paperId);
  const questions = listing?.questions ?? QUESTION_PAPERS.find((p) => p.id === paperId)?.questions ?? [];
  if (sectionId === 'all') return questions;
  const section = getPaperSectionsForScope(paperId).find((c) => c.id === sectionId || c.title === sectionId);
  if (section) return section.questions;
  return questions.filter((q) => q.sectionTitle === sectionId || q.sectionId === sectionId);
}

function getPaperLabel(paperId: string): string {
  if (paperId === ALL_PAPERS_ID) return 'All question papers';
  return getPaperListing(paperId)?.title ?? QUESTION_PAPERS.find((p) => p.id === paperId)?.title ?? 'Question paper';
}

function getSectionLabel(paperId: string, sectionId: string): string {
  if (sectionId === 'all') return 'Full paper';
  const section = getPaperSectionsForScope(paperId).find((s) => s.id === sectionId || s.title === sectionId);
  return section?.title ?? 'Selected section';
}

const TRANSLATE_OBSERVE_OPTIONS: MutationObserverInit = {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['placeholder', 'aria-label', 'title'],
};

function TranslatedSurface({ children, language }: { children: ReactNode; language: Language }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const textOriginals = useRef(new WeakMap<Text, string>());

  // useLayoutEffect runs before the browser paints, so switching language
  // never flashes the untranslated English text first.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const translateTextNode = (node: Text) => {
      const current = node.nodeValue ?? '';
      const stored = textOriginals.current.get(node);
      // (Re)capture the English original the first time we see a node, or
      // when React has replaced it with genuinely new content — never when
      // `current` is just our own translation of the stored original.
      if (stored === undefined || (current !== stored && current !== translateToJapanese(stored))) {
        textOriginals.current.set(node, current);
      }

      const original = textOriginals.current.get(node) ?? current;
      const translated = language === 'ja' ? translateToJapanese(original) : original;
      if (node.nodeValue !== translated) {
        node.nodeValue = translated;
      }
    };

    const translateElementAttributes = (element: Element) => {
      const htmlElement = element as HTMLElement;
      for (const attribute of ['placeholder', 'aria-label', 'title']) {
        const current = htmlElement.getAttribute(attribute);
        if (!current) continue;
        const dataKey = `i18nOriginal${attribute.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())}`;
        const stored = htmlElement.dataset[dataKey];
        const original = stored ?? current;
        htmlElement.dataset[dataKey] = original;
        const translated = language === 'ja' ? translateToJapanese(original) : original;
        if (current !== translated) {
          htmlElement.setAttribute(attribute, translated);
        }
      }
    };

    const applyTranslations = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
          return node.nodeValue?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
      });

      let next = walker.nextNode();
      while (next) {
        translateTextNode(next as Text);
        next = walker.nextNode();
      }

      root.querySelectorAll('[placeholder], [aria-label], [title]').forEach(translateElementAttributes);
    };

    // Pause the observer around our own writes so it never re-fires on the
    // translations we just applied (which would re-walk the whole tree).
    const observer = new MutationObserver(() => {
      observer.disconnect();
      applyTranslations();
      observer.observe(root, TRANSLATE_OBSERVE_OPTIONS);
    });
    applyTranslations();
    observer.observe(root, TRANSLATE_OBSERVE_OPTIONS);
    return () => observer.disconnect();
  }, [language]);

  return <div ref={rootRef}>{children}</div>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   App component
   ─────────────────────────────────────────────────────────────────────────── */

export default function App() {
  const [appView, setAppView] = useState<AppView>('dashboard');
  const [appMode, setAppMode] = useState<AppMode>('kanji');

  // Kanji game state (preserved from HEAD)
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [shuffledKanji, setShuffledKanji] = useState<KanjiData[]>([]);
  const [shuffledMeanings, setShuffledMeanings] = useState<KanjiData[]>([]);
  const [selectedKanjiId, setSelectedKanjiId] = useState<number | null>(null);
  const [selectedMeaningId, setSelectedMeaningId] = useState<number | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<number>>(new Set());
  const [isError, setIsError] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [kanjiRunProgress, setKanjiRunProgress] = useState<Record<string, number>>(getInitialKanjiProgress);

  // Paper-practice state
  const [paperProgress, setPaperProgress] = useState<PaperProgressState>(getInitialPaperProgress);
  const [selectedPaperId, setSelectedPaperId] = useState<string>(DEFAULT_PAPER_ID);
  const [selectedPaperSection, setSelectedPaperSection] = useState<string>('all');
  const [paperQuestionSet, setPaperQuestionSet] = useState<PaperQuestion[]>(() => getQuestionsForScope(DEFAULT_PAPER_ID, 'all'));
  const [paperQuestionIndex, setPaperQuestionIndex] = useState(0);
  const [paperAnswers, setPaperAnswers] = useState<Record<string, string>>({});
  const [paperElapsedSeconds, setPaperElapsedSeconds] = useState(0);
  const [paperBrowserFilter, setPaperBrowserFilter] = useState<PaperFilter>('all');
  const [paperSearch, setPaperSearch] = useState('');
  const [paperSubmitConfirmOpen, setPaperSubmitConfirmOpen] = useState(false);
  const [trainerInitialStorage] = useState<TrainerStorageState>(getInitialTrainerStorage);
  const [trainerGame, setTrainerGame] = useState<TrainerGameState>(() => getDefaultTrainerGameState(trainerInitialStorage.pairs));
  const [trainerBestScore, setTrainerBestScore] = useState<number | null>(trainerInitialStorage.bestScore);

  // Draw-mode state
  const [drawProgress, setDrawProgress] = useState<DrawProgressState>(() => loadDrawProgress());
  const [selectedDrawKanjiId, setSelectedDrawKanjiId] = useState<number | null>(null);

  const isDark = theme === 'dark';
  const selectedSet = useMemo(() => QUESTION_SETS.find((s) => s.id === selectedSetId), [selectedSetId]);
  const activeSet = selectedSet ?? QUESTION_SETS[0];
  const totalQuestions = activeSet.items.length;
  const isComplete = matchedIds.size === totalQuestions;
  const attempts = matchedIds.size + mistakes;
  const accuracy = attempts === 0 ? 100 : Math.round((matchedIds.size / attempts) * 100);
  const remaining = totalQuestions - matchedIds.size;

  const selectedKanji = useMemo(
    () => activeSet.items.find((i) => i.id === selectedKanjiId),
    [activeSet.items, selectedKanjiId],
  );

  // Derived sets for paper progress
  const reviewIds = useMemo(() => new Set(paperProgress.reviewIds), [paperProgress.reviewIds]);
  const wrongIds = useMemo(() => new Set(paperProgress.wrongIds), [paperProgress.wrongIds]);
  const answeredIds = useMemo(() => new Set(paperProgress.answeredIds), [paperProgress.answeredIds]);

  const paperScopeKey = getPaperScopeKey(selectedPaperId, selectedPaperSection);
  const studiedCount = paperProgress.studiedByScope[paperScopeKey] ?? 0;
  const currentPaperQuestion = paperQuestionSet[paperQuestionIndex];
  const trainerPaperSeeds = useMemo(() => buildTrainerPaperSeeds(), []);

  /* ── Kanji game callbacks ── */
  const initGame = useCallback((questionSet: QuestionSet = activeSet) => {
    setShuffledKanji(shuffle(questionSet.items));
    setShuffledMeanings(shuffle(questionSet.items));
    setSelectedKanjiId(null);
    setSelectedMeaningId(null);
    setMatchedIds(new Set());
    setIsError(false);
    setMistakes(0);
    setElapsedSeconds(0);
  }, [activeSet]);

  const shuffleKanjiColumns = () => {
    setShuffledKanji(shuffle(activeSet.items));
    setShuffledMeanings(shuffle(activeSet.items));
    setSelectedKanjiId(null);
    setSelectedMeaningId(null);
    setIsError(false);
  };

  useEffect(() => {
    initGame(activeSet);
  }, [activeSet, initGame]);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
    // Keep the page (html/body) background in sync with the theme so an
    // overscroll/rubber-band bounce never reveals a mismatched border.
    const pageBg = theme === 'dark' ? '#12110f' : '#f6f4ef';
    document.documentElement.style.background = pageBg;
    document.body.style.background = pageBg;
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language === 'ja' ? 'ja' : 'en';
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem(PAPER_PROGRESS_KEY, JSON.stringify(paperProgress));
  }, [paperProgress]);

  useEffect(() => {
    window.localStorage.setItem(KANJI_PROGRESS_KEY, JSON.stringify(kanjiRunProgress));
  }, [kanjiRunProgress]);

  useEffect(() => {
    window.localStorage.setItem(TRAINER_STORAGE_KEY, JSON.stringify({
      bestScore: trainerBestScore,
      pairs: trainerGame.pairs,
    }));
  }, [trainerBestScore, trainerGame.pairs]);

  useEffect(() => {
    window.localStorage.setItem(DRAW_PROGRESS_KEY, JSON.stringify(drawProgress));
  }, [drawProgress]);

  useEffect(() => {
    const splashTimer = window.setTimeout(() => setShowSplash(false), 1100);
    return () => window.clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!selectedSet) {
      setBestTime(null);
      return;
    }
    const storedBestTime = window.localStorage.getItem(getBestTimeKey(selectedSet.id));
    if (storedBestTime !== null) {
      const parsed = Number(storedBestTime);
      setBestTime(Number.isFinite(parsed) ? parsed : null);
      return;
    }
    setBestTime(null);
  }, [selectedSet]);

  useEffect(() => {
    if (appView !== 'game' || isComplete) return;
    const timerId = window.setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timerId);
  }, [appView, isComplete]);

  useEffect(() => {
    if (!isComplete || appView !== 'game') return;
    setBestTime((prev) => {
      if (prev !== null && prev <= elapsedSeconds) return prev;
      window.localStorage.setItem(getBestTimeKey(activeSet.id), String(elapsedSeconds));
      return elapsedSeconds;
    });
  }, [activeSet.id, appView, elapsedSeconds, isComplete]);

  useEffect(() => {
    if (appView !== 'game') return;
    setKanjiRunProgress((previous) => ({
      ...previous,
      [activeSet.id]: matchedIds.size,
    }));
  }, [activeSet.id, appView, matchedIds.size]);

  // Paper test timer
  useEffect(() => {
    if (appView !== 'paper-test') return;
    const id = window.setInterval(() => setPaperElapsedSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [appView]);

  const finishAttempt = useCallback((kanjiId: number, meaningId: number) => {
    setSelectedKanjiId(kanjiId);
    setSelectedMeaningId(meaningId);
    if (kanjiId === meaningId) {
      setMatchedIds((prev) => new Set(prev).add(kanjiId));
      setSelectedKanjiId(null);
      setSelectedMeaningId(null);
      return;
    }
    setMistakes((m) => m + 1);
    setIsError(true);
    window.setTimeout(() => {
      setIsError(false);
      setSelectedKanjiId(null);
      setSelectedMeaningId(null);
    }, 600);
  }, []);

  const handleKanjiClick = (id: number) => {
    if (matchedIds.has(id) || isError) return;
    if (selectedKanjiId === id) { setSelectedKanjiId(null); return; }
    if (selectedMeaningId !== null) { finishAttempt(id, selectedMeaningId); return; }
    setSelectedKanjiId(id);
  };

  const handleMeaningClick = (id: number) => {
    if (matchedIds.has(id) || isError) return;
    if (selectedMeaningId === id) { setSelectedMeaningId(null); return; }
    if (selectedKanjiId !== null) { finishAttempt(selectedKanjiId, id); return; }
    setSelectedMeaningId(id);
  };

  const handleSelectSet = (setId: string) => {
    setSelectedSetId(setId);
    setAppView('dashboard');
  };

  const handleStartSet = (setId: string) => {
    const set = QUESTION_SETS.find((s) => s.id === setId) ?? QUESTION_SETS[0];
    setSelectedSetId(set.id);
    initGame(set);
    setAppView('game');
  };

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  /* ── Paper-practice callbacks ── */
  const updatePaperScope = useCallback((paperId: string, sectionId: string) => {
    const questions = getQuestionsForScope(paperId, sectionId);
    setSelectedPaperId(paperId);
    setSelectedPaperSection(sectionId);
    setPaperQuestionSet(questions);
    setPaperQuestionIndex(0);
    return questions;
  }, []);

  const openPaperLearn = (paperId = selectedPaperId, sectionId = selectedPaperSection, startIndex = 0) => {
    const questions = updatePaperScope(paperId, sectionId);
    setPaperQuestionIndex(clampIndex(startIndex, questions.length));
    setAppView('paper-learn');
  };

  const openPaperBrowser = (paperId = selectedPaperId, sectionId = selectedPaperSection) => {
    updatePaperScope(paperId, sectionId);
    setPaperBrowserFilter('all');
    setPaperSearch('');
    setAppView('paper-browser');
  };

  const openPaperTest = (paperId = selectedPaperId, sectionId = selectedPaperSection, questions?: PaperQuestion[]) => {
    if (!PAPER_TEST_ENABLED) {
      // Test mode is feature-flagged off — keep the underlying screens
      // implemented but ignore entry attempts.
      return;
    }
    const next = questions ?? updatePaperScope(paperId, sectionId);
    setPaperQuestionSet(next);
    setPaperQuestionIndex(0);
    setPaperAnswers({});
    setPaperElapsedSeconds(0);
    setPaperSubmitConfirmOpen(false);
    setAppView('paper-test');
  };

  const movePaperQuestion = (direction: -1 | 1) => {
    setPaperQuestionIndex((prev) => clampIndex(prev + direction, paperQuestionSet.length));
    setPaperProgress((prev) => {
      const next = Math.min(prev.studiedByScope[paperScopeKey] ?? 0, paperQuestionSet.length);
      const newCount = clampIndex(paperQuestionIndex + direction, paperQuestionSet.length);
      return {
        ...prev,
        studiedByScope: {
          ...prev.studiedByScope,
          [paperScopeKey]: Math.max(next, newCount + 1),
        },
      };
    });
  };

  const togglePaperReview = (questionId: string) => {
    setPaperProgress((prev) => {
      const has = prev.reviewIds.includes(questionId);
      return {
        ...prev,
        reviewIds: has ? prev.reviewIds.filter((id) => id !== questionId) : [...prev.reviewIds, questionId],
      };
    });
  };

  const submitPaperAnswer = (questionId: string, answer: string) => {
    setPaperAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const finishPaperTest = () => {
    setPaperSubmitConfirmOpen(false);
    setPaperProgress((prev) => {
      const newAnswered = new Set(prev.answeredIds);
      const newWrong = new Set(prev.wrongIds);
      for (const q of paperQuestionSet) {
        const given = paperAnswers[q.id];
        if (given === undefined) continue;
        newAnswered.add(q.id);
        const correct = q.options.find((o) => o.isCorrect);
        if (!correct || given !== correct.id) {
          newWrong.add(q.id);
        } else {
          newWrong.delete(q.id);
        }
      }
      return {
        ...prev,
        answeredIds: [...newAnswered],
        wrongIds: [...newWrong],
      };
    });
    setAppView('paper-results');
  };

  const requestFinishPaperTest = () => {
    const answeredCount = paperQuestionSet.filter((question) => paperAnswers[question.id] !== undefined).length;
    if (answeredCount < paperQuestionSet.length) {
      setPaperSubmitConfirmOpen(true);
      return;
    }
    finishPaperTest();
  };

  const openReviewOnly = () => {
    const flagged = paperQuestionSet.filter((q) => reviewIds.has(q.id));
    if (flagged.length === 0) return;
    setPaperQuestionSet(flagged);
    setPaperQuestionIndex(0);
    setAppView('paper-learn');
  };

  const startTrainerGame = (pairs: Pair[]) => {
    setTrainerGame({
      pairs,
      status: 'playing',
      shuffledTerms: shuffleArray([...pairs]),
      shuffledDefinitions: shuffleArray([...pairs]),
      userMatches: {},
    });
    setAppView('trainer-worksheet');
  };

  const startTrainerPractice = () => {
    startTrainerGame(DAILY_EXPRESSION_PAIRS);
  };

  const startTrainerTraining = () => {
    setTrainerGame({
      pairs: DAILY_EXPRESSION_PAIRS,
      status: 'training',
      shuffledTerms: [],
      shuffledDefinitions: [],
      userMatches: {},
    });
    setAppView('trainer-training');
  };

  const completeTrainerWorksheet = (matches: Record<string, string>) => {
    const score = calculateTrainerScore(trainerGame.pairs, matches);
    setTrainerBestScore((previous) => previous === null ? score : Math.max(previous, score));
    setTrainerGame((previous) => ({
      ...previous,
      status: 'results',
      userMatches: matches,
    }));
    setAppView('trainer-results');
  };

  const retryTrainerWorksheet = () => {
    setTrainerGame((previous) => ({
      ...previous,
      status: 'playing',
      userMatches: {},
    }));
    setAppView('trainer-worksheet');
  };

  const reshuffleTrainerWorksheet = () => {
    setTrainerGame((previous) => ({
      ...previous,
      status: 'playing',
      shuffledTerms: shuffleArray([...previous.pairs]),
      shuffledDefinitions: shuffleArray([...previous.pairs]),
      userMatches: {},
    }));
    setAppView('trainer-worksheet');
  };

  const resetTrainer = () => {
    setTrainerGame((previous) => getDefaultTrainerGameState(previous.pairs));
    setAppView('trainer-setup');
  };

  /* ── Keyboard nav for paper-learn ── */
  useEffect(() => {
    if (appView !== 'paper-learn') return;
    const onKey = (e: KeyboardEvent) => {
      if (isEditableKeyboardTarget(e.target)) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); movePaperQuestion(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); movePaperQuestion(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appView, paperQuestionIndex, paperQuestionSet.length, paperScopeKey]);

  const toggleLanguage = () => setLanguage((current) => (current === 'en' ? 'ja' : 'en'));

  const switchMode = (next: AppMode) => {
    setAppMode(next);
    setAppView(
      next === 'kanji' ? 'dashboard'
      : next === 'papers' ? 'paper-dashboard'
      : next === 'trainer' ? 'trainer-setup'
      : 'draw-dashboard'
    );
  };

  // Launch the trainer directly from the kanji dashboard card. Seeds with
  // the daily expression pack and jumps to the worksheet so it feels like a
  // deck, not a separate tool.
  const launchDailyExpressions = () => {
    const pairs = shuffleArray([...DAILY_EXPRESSION_PAIRS]);
    setTrainerGame({
      pairs,
      status: 'playing',
      shuffledTerms: shuffleArray([...pairs]),
      shuffledDefinitions: shuffleArray([...pairs]),
      userMatches: {},
    });
    setAppMode('trainer');
    setAppView('trainer-worksheet');
  };

  /* ── Draw-mode handlers ── */
  const openDrawPractice = (kanjiId: number) => {
    setSelectedDrawKanjiId(kanjiId);
    setAppView('draw-practice');
  };

  const recordDrawScore = (kanji: string, result: GradeResult) => {
    setDrawProgress((prev) => {
      const prevBest = prev.bestScoreByKanji[kanji] ?? 0;
      const nextBest = Math.max(prevBest, result.score);
      return {
        bestScoreByKanji: { ...prev.bestScoreByKanji, [kanji]: nextBest },
        attemptsByKanji: { ...prev.attemptsByKanji, [kanji]: (prev.attemptsByKanji[kanji] ?? 0) + 1 },
      };
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const editable = isEditableKeyboardTarget(e.target);
      if (e.key === 'Escape' && showShortcuts) {
        e.preventDefault();
        setShowShortcuts(false);
        return;
      }
      if (editable) return;
      if (e.key === '?') {
        e.preventDefault();
        setShowShortcuts(true);
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleTheme();
      } else if (e.key === '1') {
        e.preventDefault();
        switchMode('kanji');
      } else if (e.key === '2') {
        e.preventDefault();
        switchMode('trainer');
      } else if (e.key === '3') {
        e.preventDefault();
        switchMode('papers');
      } else if (e.key === '4') {
        e.preventDefault();
        switchMode('draw');
      } else if (e.key.toLowerCase() === 'r' && currentPaperQuestion && (appView === 'paper-learn' || appView === 'paper-test')) {
        e.preventDefault();
        togglePaperReview(currentPaperQuestion.id);
      } else if (e.key === 'Enter' && appView === 'paper-test') {
        e.preventDefault();
        requestFinishPaperTest();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [appView, currentPaperQuestion, showShortcuts]);

  /* ── Render ── */
  // Daily Expressions ("trainer" internally) is now a top-level tab, so its
  // back button returns to its own Learn / Practice picker (trainer-setup).
  const dashboardView: AppView = appMode === 'kanji' ? 'dashboard'
    : appMode === 'papers' ? 'paper-dashboard'
    : appMode === 'trainer' ? 'trainer-setup'
    : 'draw-dashboard';

  return (
    <div className={isDark ? 'min-h-screen bg-[#12110f] text-stone-100' : 'min-h-screen bg-[#f6f4ef] text-stone-900'}>
      <TranslatedSurface language={language}>
        {showSplash && <SplashScreen isDark={isDark} onSkip={() => setShowSplash(false)} />}
        {showShortcuts && <KeyboardShortcutsModal appMode={appMode} appView={appView} isDark={isDark} onClose={() => setShowShortcuts(false)} />}
        <main
          className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8"
          onClick={appView === 'dashboard' ? () => setSelectedSetId(null) : undefined}
        >
          <AppHeader
            appMode={appMode}
            appView={appView}
            isDark={isDark}
            language={language}
            onBackToDashboard={() => setAppView(dashboardView)}
            onOpenShortcuts={() => setShowShortcuts(true)}
            onSwitchMode={switchMode}
            onToggleLanguage={toggleLanguage}
            onToggleTheme={toggleTheme}
            selectedSet={activeSet}
            stats={{ accuracy, elapsedSeconds, matched: matchedIds.size, mistakes, total: totalQuestions }}
          />

        {/* Kanji mode */}
        {appView === 'dashboard' && (
          <Dashboard
            bestTime={bestTime}
            dailyExpressionCount={DAILY_EXPRESSION_COUNT}
            isDark={isDark}
            onLaunchDailyExpressions={launchDailyExpressions}
            onSelectSet={handleSelectSet}
            onStartSet={handleStartSet}
            progressBySet={kanjiRunProgress}
            questionSets={QUESTION_SETS}
            selectedSetId={selectedSetId}
            trainerBestScore={trainerBestScore}
          />
        )}
        {appView === 'game' && (
          <GameBoard
            bestTime={bestTime}
            elapsedSeconds={elapsedSeconds}
            isComplete={isComplete}
            isDark={isDark}
            isError={isError}
            matchedIds={matchedIds}
            mistakes={mistakes}
            onKanjiSelect={handleKanjiClick}
            onMeaningSelect={handleMeaningClick}
            onReset={() => initGame(activeSet)}
            onShuffle={shuffleKanjiColumns}
            remaining={remaining}
            selectedKanji={selectedKanji}
            selectedKanjiId={selectedKanjiId}
            selectedMeaningId={selectedMeaningId}
            selectedSet={activeSet}
            shuffledKanji={shuffledKanji}
            shuffledMeanings={shuffledMeanings}
          />
        )}

        {/* Paper mode */}
        {appView === 'paper-dashboard' && (
          <PaperPracticeDashboard
            answeredIds={answeredIds}
            isDark={isDark}
            onBrowse={openPaperBrowser}
            onLearn={openPaperLearn}
            onReviewOnly={openReviewOnly}
            onSectionChange={(sid) => updatePaperScope(selectedPaperId, sid)}
            onSelectPaper={(pid) => updatePaperScope(pid, 'all')}
            onStartTest={openPaperTest}
            reviewIds={reviewIds}
            selectedPaperId={selectedPaperId}
            selectedSection={selectedPaperSection}
            studiedCount={studiedCount}
            wrongIds={wrongIds}
          />
        )}
        {appView === 'paper-learn' && (
          <PaperLearnMode
            currentIndex={paperQuestionIndex}
            isDark={isDark}
            onBack={() => setAppView('paper-dashboard')}
            onMove={movePaperQuestion}
            onStartTest={() => openPaperTest(selectedPaperId, selectedPaperSection, paperQuestionSet)}
            onToggleReview={togglePaperReview}
            question={currentPaperQuestion}
            questions={paperQuestionSet}
            reviewIds={reviewIds}
            scopeTitle={`${getPaperLabel(selectedPaperId)} · ${getSectionLabel(selectedPaperId, selectedPaperSection)}`}
            studiedCount={studiedCount}
          />
        )}
        {appView === 'paper-test' && (
          <PaperTestMode
            answers={paperAnswers}
            confirmSubmitOpen={paperSubmitConfirmOpen}
            currentIndex={paperQuestionIndex}
            elapsedSeconds={paperElapsedSeconds}
            isDark={isDark}
            onAnswer={submitPaperAnswer}
            onBack={() => setAppView('paper-dashboard')}
            onCancelSubmit={() => setPaperSubmitConfirmOpen(false)}
            onConfirmSubmit={finishPaperTest}
            onFinish={requestFinishPaperTest}
            onJump={(i) => setPaperQuestionIndex(clampIndex(i, paperQuestionSet.length))}
            onMove={(d) => setPaperQuestionIndex((p) => clampIndex(p + d, paperQuestionSet.length))}
            question={currentPaperQuestion}
            questions={paperQuestionSet}
            reviewIds={reviewIds}
            scopeTitle={`${getPaperLabel(selectedPaperId)} · ${getSectionLabel(selectedPaperId, selectedPaperSection)}`}
          />
        )}
        {appView === 'paper-results' && (
          <PaperResults
            answers={paperAnswers}
            elapsedSeconds={paperElapsedSeconds}
            isDark={isDark}
            onBack={() => setAppView('paper-dashboard')}
            onRetry={() => openPaperTest(selectedPaperId, selectedPaperSection, paperQuestionSet)}
            questions={paperQuestionSet}
            scopeTitle={`${getPaperLabel(selectedPaperId)} · ${getSectionLabel(selectedPaperId, selectedPaperSection)}`}
          />
        )}
        {appView === 'paper-browser' && (
          <PaperQuestionBrowser
            answeredIds={answeredIds}
            filter={paperBrowserFilter}
            isDark={isDark}
            onBack={() => setAppView('paper-dashboard')}
            onFilterChange={setPaperBrowserFilter}
            onOpenLearn={(i) => openPaperLearn(selectedPaperId, selectedPaperSection, i)}
            onSearchChange={setPaperSearch}
            onToggleReview={togglePaperReview}
            questions={paperQuestionSet}
            reviewIds={reviewIds}
            scopeTitle={`${getPaperLabel(selectedPaperId)} · ${getSectionLabel(selectedPaperId, selectedPaperSection)}`}
            search={paperSearch}
            wrongIds={wrongIds}
          />
        )}

        {/* Trainer mode */}
        {appView === 'trainer-setup' && (
          <TrainerSetup
            dailyExpressionCount={DAILY_EXPRESSION_COUNT}
            isDark={isDark}
            lastPairs={trainerGame.pairs}
            onStart={startTrainerGame}
            onStartPractice={startTrainerPractice}
            onStartTraining={startTrainerTraining}
            paperSeeds={trainerPaperSeeds}
          />
        )}
        {appView === 'trainer-training' && (
          <TrainerTraining
            isDark={isDark}
            onBack={resetTrainer}
            onPractice={startTrainerPractice}
            pairs={trainerGame.pairs.length > 0 ? trainerGame.pairs : DAILY_EXPRESSION_PAIRS}
          />
        )}
        {appView === 'trainer-worksheet' && (
          <TrainerWorksheet
            isDark={isDark}
            onComplete={completeTrainerWorksheet}
            onReset={resetTrainer}
            onReshuffle={reshuffleTrainerWorksheet}
            shuffledDefinitions={trainerGame.shuffledDefinitions}
            shuffledTerms={trainerGame.shuffledTerms}
            totalCount={trainerGame.pairs.length}
          />
        )}
        {appView === 'trainer-results' && (
          <TrainerResults
            bestScore={trainerBestScore}
            isDark={isDark}
            onNew={resetTrainer}
            onReshuffle={reshuffleTrainerWorksheet}
            onRetry={retryTrainerWorksheet}
            shuffledDefinitions={trainerGame.shuffledDefinitions}
            shuffledTerms={trainerGame.shuffledTerms}
            userMatches={trainerGame.userMatches}
          />
        )}

        {appView === 'draw-dashboard' && (
          <DrawDashboard
            isDark={isDark}
            onSelect={openDrawPractice}
            progress={drawProgress}
            selectedId={selectedDrawKanjiId}
          />
        )}

        {appView === 'draw-practice' && selectedDrawKanjiId !== null && (() => {
          const k = getDrawKanjiById(selectedDrawKanjiId) ?? DRAW_KANJI[0];
          return (
            <DrawPractice
              isDark={isDark}
              kanji={k}
              onBack={() => setAppView('draw-dashboard')}
              onScore={(result) => recordDrawScore(k.kanji, result)}
              onSelectKanji={openDrawPractice}
            />
          );
        })()}
        </main>
      </TranslatedSurface>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   AppHeader (with mode tabs)
   ─────────────────────────────────────────────────────────────────────────── */

interface AppHeaderProps {
  appMode: AppMode;
  appView: AppView;
  isDark: boolean;
  language: Language;
  onBackToDashboard: () => void;
  onOpenShortcuts: () => void;
  onSwitchMode: (mode: AppMode) => void;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  selectedSet: QuestionSet;
  stats: { accuracy: number; elapsedSeconds: number; matched: number; mistakes: number; total: number };
}

function AppHeader({ appMode, appView, isDark, language, onBackToDashboard, onOpenShortcuts, onSwitchMode, onToggleLanguage, onToggleTheme, selectedSet, stats }: AppHeaderProps) {
  const inGame = appView === 'game';
  const inPaperSub = appView === 'paper-learn' || appView === 'paper-test' || appView === 'paper-results' || appView === 'paper-browser';
  const inTrainerSub = appView === 'trainer-training' || appView === 'trainer-worksheet' || appView === 'trainer-results';
  const inDrawSub = appView === 'draw-practice';
  const modeLabel = appMode === 'kanji'
    ? (inGame ? selectedSet.subtitle : 'Kanji match dashboard')
    : appMode === 'papers'
      ? 'Question paper practice'
      : appMode === 'trainer'
        ? 'Common daily expressions'
        : 'Kanji drawing';

  return (
    <header className={`flex flex-col gap-5 border-b pb-5 lg:flex-row lg:items-end lg:justify-between ${isDark ? 'border-stone-700' : 'border-stone-300/80'}`}>
      <div className="flex items-center gap-3">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-sm ${isDark ? 'bg-amber-600' : 'bg-red-700'}`}>
          <Languages size={26} />
        </div>
        <div className="min-w-0">
          <p className={`text-[0.7rem] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-amber-400' : 'text-red-700'}`}>
            {modeLabel}
          </p>
          <h1 className={`bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-normal text-transparent sm:text-3xl ${isDark ? 'from-amber-200 via-amber-100 to-stone-100' : 'from-red-700 via-red-900 to-stone-900'}`}>
            Kanji Match Dojo
          </h1>
          <button
            className={`mt-1 inline-flex items-center gap-1 text-[0.68rem] font-semibold ${isDark ? 'text-stone-500 hover:text-stone-300' : 'text-stone-500 hover:text-stone-700'}`}
            onClick={onOpenShortcuts}
            type="button"
          >
            <kbd className={`rounded border px-1.5 py-0.5 font-mono text-[0.65rem] ${isDark ? 'border-stone-700 bg-stone-900 text-amber-200' : 'border-stone-300 bg-white text-red-700'}`}>?</kbd>
            opens shortcuts
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        {/* Mode segmented control */}
        <div className={`inline-flex rounded-full border p-1 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/80' : 'border-stone-200 bg-white'}`}>
          <button
            className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition sm:h-10 sm:px-4 ${
              appMode === 'kanji'
                ? isDark ? 'bg-amber-500 text-stone-950' : 'bg-red-700 text-white'
                : isDark ? 'text-stone-300 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
            }`}
            onClick={() => onSwitchMode('kanji')}
            type="button"
          >
            <Sparkles size={15} />
            Kanji
          </button>
          <button
            className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition sm:h-10 sm:px-4 ${
              appMode === 'trainer'
                ? isDark ? 'bg-sky-500 text-stone-950' : 'bg-sky-700 text-white'
                : isDark ? 'text-stone-300 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
            }`}
            onClick={() => onSwitchMode('trainer')}
            type="button"
          >
            <Dumbbell size={15} />
            Daily
          </button>
          <button
            className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition sm:h-10 sm:px-4 ${
              appMode === 'papers'
                ? isDark ? 'bg-amber-500 text-stone-950' : 'bg-red-700 text-white'
                : isDark ? 'text-stone-300 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
            }`}
            onClick={() => onSwitchMode('papers')}
            type="button"
          >
            <ClipboardList size={15} />
            Papers
          </button>
          <button
            className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition sm:h-10 sm:px-4 ${
              appMode === 'draw'
                ? isDark ? 'bg-emerald-500 text-stone-950' : 'bg-emerald-700 text-white'
                : isDark ? 'text-stone-300 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
            }`}
            onClick={() => onSwitchMode('draw')}
            type="button"
          >
            <PenTool size={15} />
            Draw
          </button>
        </div>

        {(inGame || inPaperSub || inTrainerSub || inDrawSub) && (
          <button
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
              isDark ? 'border-stone-700 bg-stone-900 text-stone-100 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-100'
            }`}
            onClick={onBackToDashboard}
            type="button"
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>
        )}

        <button
          aria-label="Switch language"
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
            isDark ? 'border-stone-700 bg-stone-900 text-stone-100 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-100'
          }`}
          onClick={onToggleLanguage}
          type="button"
        >
          <Globe2 size={17} />
          {language === 'en' ? '日本語' : 'English'}
        </button>

        <button
          aria-label="Open shortcuts"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
            isDark ? 'border-stone-700 bg-stone-900 text-amber-200 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-100'
          }`}
          onClick={onOpenShortcuts}
          title="? opens shortcuts"
          type="button"
        >
          <HelpCircle size={17} />
        </button>

        <button
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
            isDark ? 'border-stone-700 bg-stone-900 text-amber-200 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-100'
          }`}
          onClick={onToggleTheme}
          type="button"
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
          {isDark ? 'Light' : 'Dark'}
        </button>

        {inGame && (
          <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 lg:w-auto lg:min-w-[34rem]">
            <StatCard icon={<Target size={18} />} isDark={isDark} label="Matched" value={`${stats.matched}/${stats.total}`} />
            <StatCard icon={<XCircle size={18} />} isDark={isDark} label="Misses" value={String(stats.mistakes)} />
            <StatCard icon={<Sparkles size={18} />} isDark={isDark} label="Accuracy" value={`${stats.accuracy}%`} />
            <StatCard icon={<Clock3 size={18} />} isDark={isDark} label="Time" value={formatTime(stats.elapsedSeconds)} />
          </div>
        )}
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Kanji Dashboard (HEAD baseline)
   ─────────────────────────────────────────────────────────────────────────── */

function KeyboardShortcutsModal({ appMode, appView, isDark, onClose }: { appMode: AppMode; appView: AppView; isDark: boolean; onClose: () => void }) {
  const shortcuts = [
    { keyName: '?', action: 'Open shortcuts' },
    { keyName: 'Esc', action: 'Close' },
    { keyName: 'M', action: 'Toggle theme' },
    { keyName: '1 / 2 / 3 / 4', action: 'Switch mode (Kanji / Daily / Papers / Draw)' },
  ];

  if (appView === 'paper-learn') {
    shortcuts.push(
      { keyName: '← / →', action: 'Move through paper learn questions' },
      { keyName: 'R', action: 'Mark for review' },
    );
  }

  if (appView === 'paper-test') {
    shortcuts.push(
      { keyName: 'Enter', action: 'Submit test' },
      { keyName: 'R', action: 'Mark current question for review' },
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <button
        aria-label="Close shortcuts"
        className={`absolute inset-0 ${isDark ? 'bg-black/65' : 'bg-stone-950/30'}`}
        onClick={onClose}
        type="button"
      />
      <motion.section
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`relative w-full max-w-lg rounded-2xl border p-5 shadow-2xl ${isDark ? 'border-stone-700 bg-stone-900 text-stone-100' : 'border-stone-200 bg-white text-stone-950'}`}
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}>
              {appMode === 'kanji' ? 'Kanji' : appMode === 'papers' ? 'Papers' : 'Trainer'}
            </p>
            <h2 className="mt-1 text-xl font-bold">Keyboard shortcuts</h2>
          </div>
          <button
            aria-label="Close shortcuts"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${isDark ? 'border-stone-700 bg-stone-950 text-stone-300 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-100'}`}
            onClick={onClose}
            type="button"
          >
            <XCircle size={17} />
          </button>
        </div>
        <div className="mt-5 grid gap-2">
          {shortcuts.map((shortcut) => (
            <div
              className={`flex items-center justify-between gap-4 rounded-xl border px-3 py-2 ${isDark ? 'border-stone-800 bg-stone-950/70' : 'border-stone-200 bg-stone-50'}`}
              key={`${shortcut.keyName}-${shortcut.action}`}
            >
              <span className={`text-sm font-medium ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>{shortcut.action}</span>
              <kbd className={`shrink-0 rounded-md border px-2 py-1 font-mono text-xs font-bold ${isDark ? 'border-stone-700 bg-stone-900 text-amber-200' : 'border-stone-300 bg-white text-red-700'}`}>{shortcut.keyName}</kbd>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

interface DashboardProps {
  bestTime: number | null;
  dailyExpressionCount: number;
  isDark: boolean;
  onLaunchDailyExpressions: () => void;
  onSelectSet: (setId: string) => void;
  onStartSet: (setId: string) => void;
  progressBySet: Record<string, number>;
  questionSets: QuestionSet[];
  selectedSetId: string | null;
  trainerBestScore: number | null;
}

function Dashboard({ bestTime, dailyExpressionCount, isDark, onLaunchDailyExpressions, onSelectSet, onStartSet, progressBySet, questionSets, selectedSetId, trainerBestScore }: DashboardProps) {
  const selectedSet = questionSets.find((s) => s.id === selectedSetId);

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className={`rounded-2xl border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/90' : 'border-stone-200 bg-white/85'}`}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Choose a question set</h2>
            <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>Pick a deck to drill kanji ↔ meaning matching.</p>
          </div>
          <div className={`hidden h-10 w-10 place-items-center rounded-md sm:grid ${isDark ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-red-700'}`}>
            <Layers3 size={20} />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {questionSets.map((qs) => {
            const selected = qs.id === selectedSetId;
            const preview = qs.items.slice(0, 6).map((i) => i.kanji).join(' ');
            const lastMatched = progressBySet[qs.id] ?? 0;
            return (
              <button
                className={`rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
                  selected
                    ? isDark ? 'border-amber-500 bg-amber-950/50 focus:ring-amber-500' : 'border-red-700 bg-red-50 focus:ring-red-700'
                    : isDark ? 'border-stone-800 bg-stone-950 hover:border-stone-500 focus:ring-amber-500' : 'border-stone-200 bg-white hover:border-stone-400 focus:ring-red-700'
                }`}
                key={qs.id}
                onClick={(e) => { e.stopPropagation(); onSelectSet(qs.id); }}
                type="button"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}>{qs.level}</p>
                    <h3 className={`mt-1 text-xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{qs.title}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}>{qs.items.length}</span>
                </div>
                <p className={`text-sm leading-6 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{qs.description}</p>
                <span className={`mt-4 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${isDark ? 'border-amber-700/60 bg-amber-950/40 text-amber-200' : 'border-red-200 bg-red-50 text-red-800'}`}>{lastMatched}/{qs.items.length} matched last run</span>
                <p className={`mt-5 text-3xl font-semibold tracking-normal ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{preview}</p>
              </button>
            );
          })}

          {/* Common Daily Expressions deck card — disabled in favor of the new
              top-level "Daily" mode tab. Source preserved for reference; do not
              delete. To restore, re-render this button and re-enable the
              onLaunchDailyExpressions prop wiring. */}
          {/*
          <button
            className={`group relative overflow-hidden rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
              isDark
                ? 'border-stone-800 bg-stone-950 hover:border-sky-500/60 focus:ring-sky-500'
                : 'border-stone-200 bg-white hover:border-sky-400 focus:ring-sky-600'
            }`}
            onClick={(e) => { e.stopPropagation(); onLaunchDailyExpressions(); }}
            type="button"
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${isDark ? 'from-sky-400/40' : 'from-sky-400/30'} to-transparent blur-2xl`}
            />
            <div className="relative mb-4 flex items-start justify-between gap-3">
              <div>
                <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>Daily expressions</p>
                <h3 className={`mt-1 text-xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Common Daily Expressions</h3>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${isDark ? 'bg-sky-500/20 text-sky-200' : 'bg-sky-100 text-sky-800'}`}>{dailyExpressionCount}</span>
            </div>
            <p className={`relative text-sm leading-6 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              Bulk-trainer style match-the-pair drill seeded with everyday Japanese phrases — perfect for quick daily reps.
            </p>
            <div className={`relative mt-4 flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${isDark ? 'border-sky-700/60 bg-sky-950/40 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-800'}`}>
                <Dumbbell size={11} /> Worksheet
              </span>
              {trainerBestScore !== null && (
                <span>Best score · <span className="tabular-nums">{trainerBestScore}%</span></span>
              )}
            </div>
            <p className={`relative mt-5 text-2xl font-semibold tracking-normal ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>こんにちは · ありがとう · さようなら</p>
          </button>
          */}
        </div>
      </div>
      <aside className={`rounded-2xl border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900' : 'border-stone-200 bg-white'}`}>
        <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl ${isDark ? 'bg-amber-600 text-stone-950' : 'bg-red-700 text-white'}`}>
          <BookOpen size={24} />
        </div>
        <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
          {selectedSet ? 'Selected deck' : 'No deck selected'}
        </p>
        <h2 className={`mt-2 text-2xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{selectedSet ? selectedSet.title : 'Choose a set'}</h2>
        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{selectedSet ? selectedSet.description : 'Pick a deck before starting a drill.'}</p>
        {selectedSet && (
          <div className={`mt-5 rounded-xl p-3 ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`}>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.16em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Best time</p>
            <p className={`mt-1 text-3xl font-bold tabular-nums ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{bestTime === null ? 'Not set' : formatTime(bestTime)}</p>
          </div>
        )}
        <button
          className={`mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            isDark ? 'bg-amber-500 text-stone-950 hover:bg-amber-400 focus:ring-amber-400' : 'bg-stone-950 text-white hover:bg-stone-800 focus:ring-red-700'
          }`}
          disabled={!selectedSet}
          onClick={(e) => { e.stopPropagation(); if (selectedSet) onStartSet(selectedSet.id); }}
          type="button"
        >
          <Play size={17} />
          Start set
        </button>
      </aside>
    </section>
  );
}

interface GameBoardProps {
  bestTime: number | null;
  elapsedSeconds: number;
  isComplete: boolean;
  isDark: boolean;
  isError: boolean;
  matchedIds: Set<number>;
  mistakes: number;
  onKanjiSelect: (id: number) => void;
  onMeaningSelect: (id: number) => void;
  onReset: () => void;
  onShuffle: () => void;
  remaining: number;
  selectedKanji: KanjiData | undefined;
  selectedKanjiId: number | null;
  selectedMeaningId: number | null;
  selectedSet: QuestionSet;
  shuffledKanji: KanjiData[];
  shuffledMeanings: KanjiData[];
}

function GameBoard({
  bestTime, elapsedSeconds, isComplete, isDark, isError, matchedIds, mistakes,
  onKanjiSelect, onMeaningSelect, onReset, onShuffle, remaining,
  selectedKanji, selectedKanjiId, selectedMeaningId, selectedSet,
  shuffledKanji, shuffledMeanings,
}: GameBoardProps) {
  return (
    <>
      <section className="grid gap-4 md:grid-cols-[minmax(0,1fr)_17rem]">
        <div className={`rounded-2xl border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/90' : 'border-stone-200 bg-white/80'}`}>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Match each character to its meaning</h2>
              <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                {remaining === 0 ? 'Board complete.' : `${remaining} remaining in ${selectedSet.title}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onShuffle}
                className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                  isDark ? 'border-stone-700 bg-stone-950 text-stone-100 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-950 hover:bg-stone-100'
                }`}
                type="button"
              >
                <RefreshCw size={17} />
                Shuffle
              </button>
              <button
                onClick={onReset}
                className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                  isDark ? 'border-amber-700 bg-amber-600 text-stone-950 hover:bg-amber-500' : 'border-stone-200 bg-stone-950 text-white hover:bg-stone-800'
                }`}
                type="button"
              >
                <RotateCcw size={17} />
                Reset
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <KanjiColumn isDark={isDark} isError={isError} items={shuffledKanji} matchedIds={matchedIds} onSelect={onKanjiSelect} selectedId={selectedKanjiId} />
            <MeaningColumn isDark={isDark} isError={isError} items={shuffledMeanings} matchedIds={matchedIds} onSelect={onMeaningSelect} selectedId={selectedMeaningId} />
          </div>
        </div>
        <aside className="flex flex-col gap-4">
          <div className={`rounded-2xl border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900' : 'border-stone-200 bg-white'}`}>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Current pick</p>
            <div className={`mt-4 min-h-36 rounded-xl p-4 ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`}>
              {selectedKanji ? (
                <div className="flex h-full flex-col justify-between gap-4">
                  <span className={`text-6xl font-semibold leading-none ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{selectedKanji.kanji}</span>
                  <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Choose the matching meaning.</p>
                </div>
              ) : (
                <div className={`flex min-h-28 items-center text-sm ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Select a kanji to begin a match.</div>
              )}
            </div>
          </div>
          <div className={`rounded-2xl border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900' : 'border-stone-200 bg-white'}`}>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Best time</p>
            <p className={`mt-3 text-3xl font-bold tabular-nums ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{bestTime === null ? 'Not set' : formatTime(bestTime)}</p>
          </div>
        </aside>
      </section>
      {isComplete && (
        <motion.section
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`rounded-2xl border p-6 text-center shadow-sm ${isDark ? 'border-emerald-800 bg-emerald-950/60 text-emerald-100' : 'border-emerald-300 bg-emerald-50 text-emerald-900'}`}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
        >
          <div className={`mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full ${isDark ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
            <Award size={32} />
          </div>
          <h2 className="text-2xl font-bold">Perfect score. Subarashii!</h2>
          <p className={`mt-2 text-sm ${isDark ? 'text-emerald-200' : 'text-emerald-800'}`}>Finished in {formatTime(elapsedSeconds)} with {mistakes} misses.</p>
          <button
            onClick={onReset}
            className={`mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition ${isDark ? 'bg-emerald-500 text-stone-950 hover:bg-emerald-400' : 'bg-emerald-700 text-white hover:bg-emerald-800'}`}
            type="button"
          >
            <RotateCcw size={17} />
            Play again
          </button>
        </motion.section>
      )}
    </>
  );
}

interface PaperPracticeDashboardProps {
  answeredIds: Set<string>;
  isDark: boolean;
  onBrowse: (paperId?: string, sectionId?: string) => void;
  onLearn: (paperId?: string, sectionId?: string, startIndex?: number) => void;
  onReviewOnly: () => void;
  onSectionChange: (sectionId: string) => void;
  onSelectPaper: (paperId: string) => void;
  onStartTest: (paperId?: string, sectionId?: string, questions?: PaperQuestion[]) => void;
  reviewIds: Set<string>;
  selectedPaperId: string;
  selectedSection: string;
  studiedCount: number;
  wrongIds: Set<string>;
}

function PaperPracticeDashboard({
  answeredIds, isDark, onBrowse, onLearn, onReviewOnly, onSectionChange,
  onSelectPaper, onStartTest, reviewIds, selectedPaperId, selectedSection,
  studiedCount, wrongIds,
}: PaperPracticeDashboardProps) {
  const paperListings = QUESTION_PAPER_LISTINGS;
  const [paperDashboardSearch, setPaperDashboardSearch] = useState('');
  const [paperKindFilter, setPaperKindFilter] = useState<'all' | PaperKind>('all');
  const [studiedDelta, setStudiedDelta] = useState(0);
  const previousStudiedRef = useRef(studiedCount);
  const isAggregate = selectedPaperId === ALL_PAPERS_ID;
  const openedListing = isAggregate ? undefined : getPaperListing(selectedPaperId) ?? paperListings[0];
  const sections = getPaperSectionsForScope(selectedPaperId);
  const selectedQuestions = getQuestionsForScope(selectedPaperId, selectedSection);
  const reviewCount = selectedQuestions.filter((q) => reviewIds.has(q.id)).length;
  const wrongCount = selectedQuestions.filter((q) => wrongIds.has(q.id)).length;
  const answeredCount = selectedQuestions.filter((q) => answeredIds.has(q.id)).length;
  const progressPercent = selectedQuestions.length === 0 ? 0 : Math.round((studiedCount / selectedQuestions.length) * 100);
  const selectedSectionTitle = selectedSection === 'all'
    ? 'Full paper'
    : sections.find((s) => s.id === selectedSection || s.title === selectedSection)?.title ?? 'Selected section';
  const totalPapers = paperListings.length;
  const totalQuestions = paperListings.reduce((sum, l) => sum + l.questions.length, 0);
  const totalReviewable = paperListings.reduce((sum, l) => sum + l.questions.filter((q) => reviewIds.has(q.id)).length, 0);
  const filteredPaperListings = paperListings.filter((listing) => {
    const needle = paperDashboardSearch.trim().toLowerCase();
    const matchesSearch = !needle || `${listing.title} ${listing.subtitle ?? ''} ${listing.description}`.toLowerCase().includes(needle);
    const matchesKind = paperKindFilter === 'all' || classifyPaper(listing) === paperKindFilter;
    return matchesSearch && matchesKind;
  });
  const topReviewed = [...paperListings]
    .map((listing) => ({ listing, count: listing.questions.filter((q) => reviewIds.has(q.id)).length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  useEffect(() => {
    const previous = previousStudiedRef.current;
    if (studiedCount > previous) {
      setStudiedDelta(studiedCount - previous);
      const id = window.setTimeout(() => setStudiedDelta(0), 1600);
      previousStudiedRef.current = studiedCount;
      return () => window.clearTimeout(id);
    }
    previousStudiedRef.current = studiedCount;
    return undefined;
  }, [studiedCount]);

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm backdrop-blur ${isDark ? 'border-stone-700/80 bg-stone-900/85' : 'border-stone-200 bg-white/90'}`}>
        <div aria-hidden className={`pointer-events-none absolute -top-24 right-[-4rem] h-56 w-56 rounded-full blur-3xl ${isDark ? 'bg-amber-500/15' : 'bg-red-600/10'}`} />
        <div className="relative mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}>Question Paper Practice</p>
            <h2 className={`mt-1 text-2xl font-bold leading-tight md:text-3xl ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Pick a paper</h2>
            <p className={`mt-1 text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{totalPapers} curated papers · {totalQuestions} questions · {totalReviewable} flagged for review</p>
          </div>
          <button
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 ${isDark ? 'border-stone-700 bg-stone-950/80 text-stone-100 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-950 hover:bg-stone-100'}`}
            onClick={() => onBrowse(selectedPaperId, selectedSection)}
            type="button"
          >
            <Eye size={16} />
            View questions
          </button>
        </div>
        <div className={`relative mb-4 flex flex-col gap-3 rounded-2xl border p-3 ${isDark ? 'border-stone-800 bg-stone-950/60' : 'border-stone-200 bg-stone-50'}`}>
          <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${isDark ? 'border-stone-700 bg-stone-950' : 'border-stone-200 bg-white'}`}>
            <Search size={15} className={isDark ? 'text-stone-500' : 'text-stone-400'} />
            <input className={`min-w-0 flex-1 bg-transparent text-sm outline-none ${isDark ? 'text-stone-100 placeholder:text-stone-500' : 'text-stone-900 placeholder:text-stone-400'}`} onChange={(event) => setPaperDashboardSearch(event.target.value)} placeholder="Search papers" value={paperDashboardSearch} />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'see', label: 'SEE' },
              { id: 'midsem', label: 'Mid-sem' },
              { id: 'pretest', label: 'Pre-test' },
              { id: 'pattern', label: 'Patterns' },
            ].map((chip) => (
              <button className={`rounded-full px-3 py-1 text-xs font-bold transition ${paperKindFilter === chip.id ? isDark ? 'bg-amber-500 text-stone-950' : 'bg-red-700 text-white' : isDark ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-white text-stone-600 hover:bg-stone-100'}`} key={chip.id} onClick={() => setPaperKindFilter(chip.id as 'all' | PaperKind)} type="button">
                {chip.label}
              </button>
            ))}
          </div>
        </div>
        <div className="relative grid gap-3 sm:grid-cols-2">
          {filteredPaperListings.map((listing) => (
            <Fragment key={listing.id}>
              <PaperListingCard isDark={isDark} listing={listing} onSelect={() => onSelectPaper(listing.id)} reviewIds={reviewIds} selected={selectedPaperId === listing.id} wrongIds={wrongIds} />
            </Fragment>
          ))}
          {filteredPaperListings.length === 0 && (
            <p className={`rounded-xl border p-5 text-center text-sm ${isDark ? 'border-stone-800 bg-stone-950 text-stone-400' : 'border-stone-200 bg-white text-stone-500'}`}>No papers match the current filters.</p>
          )}
        </div>
      </div>

      <aside className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm backdrop-blur lg:sticky lg:top-4 lg:max-h-[calc(100vh-1.5rem)] lg:overflow-y-auto ${isDark ? 'border-stone-700/80 bg-stone-900/90' : 'border-stone-200 bg-white/95'}`}>
        <div aria-hidden className={`pointer-events-none absolute -top-16 right-[-3rem] h-36 w-36 rounded-full blur-2xl ${isDark ? 'bg-amber-500/15' : 'bg-red-600/10'}`} />
        <div className="relative">
          <div className="flex items-start gap-3">
            <div className={`grid h-12 w-12 place-items-center rounded-xl shadow-sm ${isDark ? 'bg-amber-500 text-stone-950' : 'bg-red-700 text-white'}`}><BarChart3 size={22} /></div>
            <div className="min-w-0 flex-1">
              <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Opened paper</p>
              <h2 className={`mt-1 truncate text-xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{isAggregate ? 'All question papers' : openedListing?.title ?? getPaperLabel(selectedPaperId)}</h2>
              {isAggregate ? (<p className={`mt-0.5 truncate text-[0.72rem] font-semibold uppercase tracking-[0.08em] ${isDark ? 'text-amber-300/80' : 'text-red-700/80'}`}>Aggregate practice scope</p>) : openedListing?.subtitle && (<p className={`mt-0.5 truncate text-[0.72rem] font-semibold uppercase tracking-[0.08em] ${isDark ? 'text-amber-300/80' : 'text-red-700/80'}`}>{openedListing.subtitle}</p>)}
            </div>
          </div>
          {isAggregate ? (<p className={`mt-3 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>All curated papers combined into one review and test scope.</p>) : openedListing?.description && (<p className={`mt-3 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{openedListing.description}</p>)}

          <div className="mt-5 grid grid-cols-2 gap-2">
            <MiniMetric isDark={isDark} label="Questions" tone="neutral" value={String(selectedQuestions.length)} />
            <MiniMetric isDark={isDark} label="Answered" tone="success" value={String(answeredCount)} />
            <MiniMetric isDark={isDark} label="Review" tone="amber" value={String(reviewCount)} />
            <MiniMetric isDark={isDark} label="Wrong" tone="danger" value={String(wrongCount)} />
          </div>

          <div className="mt-5">
            <div className={`flex items-center justify-between text-xs font-semibold ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              <span>Progress</span>
              <span className="tabular-nums">{progressPercent}%</span>
            </div>
            <div className={`mt-1.5 h-2 overflow-hidden rounded-full ${isDark ? 'bg-stone-800' : 'bg-stone-200'}`}>
              <motion.div animate={{ width: `${progressPercent}%` }} className={`h-full rounded-full ${isDark ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-red-600 to-red-700'}`} initial={false} transition={{ duration: 0.4, ease: 'easeOut' }} />
            </div>
            <p className={`mt-2 truncate text-xs font-medium ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{studiedCount}/{selectedQuestions.length} reviewed · {selectedSectionTitle}{studiedDelta > 0 ? ` (+${studiedDelta} reviewed)` : ''}</p>
          </div>

          <div className="mt-5 grid gap-2">
            <button className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 ${isDark ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 hover:from-amber-300 hover:to-amber-400' : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600'}`} onClick={() => onLearn(selectedPaperId, 'all')} type="button"><BookOpen size={16} />Full paper review</button>
            {/* Full paper test — hidden until the test flow is ready. No "Soon"
                hints. Source preserved; do not delete. */}
            {/*
            <button
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${isDark ? 'border-stone-800 bg-stone-950/40 text-stone-500' : 'border-stone-200 bg-stone-100 text-stone-400'} cursor-not-allowed`}
              disabled
              title="Test mode is paused — review mode only for now"
              type="button"
            >
              <ClipboardList size={16} />
              Full paper test
              <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.08em] ${isDark ? 'bg-stone-800 text-stone-400' : 'bg-stone-200 text-stone-500'}`}>Soon</span>
            </button>
            */}
            <button className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark ? 'border-stone-700 bg-stone-950/60 text-stone-100 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-950 hover:bg-stone-100'}`} onClick={() => onBrowse(selectedPaperId, selectedSection)} type="button"><Eye size={16} />View opened questions</button>
            {selectedSection !== 'all' && (
              <>
                <div className={`mt-1 border-t pt-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] ${isDark ? 'border-stone-800 text-stone-500' : 'border-stone-200 text-stone-500'}`}>Section actions</div>
                <button className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark ? 'border-stone-700 bg-stone-950/60 text-stone-100 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-950 hover:bg-stone-100'}`} onClick={() => onLearn(selectedPaperId, selectedSection)} type="button"><BookMarked size={15} />Review section</button>
                {/* Test section — hidden until the test flow is ready. Source
                    preserved; do not delete. */}
                {/*
                <button
                  className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${isDark ? 'border-stone-800 bg-stone-950/40 text-stone-500' : 'border-stone-200 bg-stone-100 text-stone-400'} cursor-not-allowed`}
                  disabled
                  title="Test mode is paused — review mode only for now"
                  type="button"
                >
                  <ClipboardList size={15} />
                  Test section
                  <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.08em] ${isDark ? 'bg-stone-800 text-stone-400' : 'bg-stone-200 text-stone-500'}`}>Soon</span>
                </button>
                */}
              </>
            )}
            <button className={`mt-1 inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 ${isDark ? 'border-amber-700/70 bg-amber-950/40 text-amber-200 hover:bg-amber-950/60' : 'border-red-200 bg-red-50 text-red-800 hover:bg-red-100'}`} disabled={reviewCount === 0} onClick={onReviewOnly} type="button"><Flag size={15} />Practice review-later ({reviewCount})</button>
          </div>

          {isAggregate && (
            <div className={`mt-6 rounded-2xl border p-3 ${isDark ? 'border-stone-800 bg-stone-950/60' : 'border-stone-200 bg-stone-50'}`}>
              <p className={`text-[0.7rem] font-bold uppercase tracking-[0.16em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Aggregate summary</p>
              <p className={`mt-2 text-sm ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>{totalQuestions} total questions across {totalPapers} curated papers.</p>
              <div className="mt-3 grid gap-2">
                {topReviewed.map(({ listing, count }) => (
                  <div className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold ${isDark ? 'bg-stone-900 text-stone-300' : 'bg-white text-stone-700'}`} key={listing.id}>
                    <span>{listing.title}</span>
                    <span>{count} reviewed</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isAggregate && <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Sections · {sections.length}</p>
              <button className={`rounded-full px-3 py-1 text-[0.7rem] font-bold transition ${selectedSection === 'all' ? isDark ? 'bg-amber-500 text-stone-950' : 'bg-red-700 text-white' : isDark ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`} onClick={() => onSectionChange('all')} type="button">Full paper</button>
            </div>
            <div className="mt-3 grid gap-2">
              {sections.map((section) => {
                const sReview = section.questions.filter((q) => reviewIds.has(q.id)).length;
                const sWrong = section.questions.filter((q) => wrongIds.has(q.id)).length;
                const isSel = selectedSection === section.id || selectedSection === section.title;
                return (
                  <button
                    className={`group relative overflow-hidden rounded-xl border p-3 text-left transition hover:-translate-y-0.5 ${isSel ? isDark ? 'border-amber-500 bg-amber-950/50 shadow-sm shadow-amber-900/30' : 'border-red-700 bg-red-50 shadow-sm shadow-red-900/10' : isDark ? 'border-stone-800 bg-stone-950/60 hover:border-stone-600' : 'border-stone-200 bg-white hover:border-stone-400'}`}
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
                    type="button"
                  >
                    {isSel && <span aria-hidden className={`absolute left-0 top-0 h-full w-1 ${isDark ? 'bg-amber-400' : 'bg-red-700'}`} />}
                    <span className={`block text-sm font-bold leading-5 ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>{section.title}</span>
                    {section.subtitle && (<span className={`mt-0.5 block text-[0.7rem] font-medium ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{section.subtitle}</span>)}
                    <span className={`mt-2 flex flex-wrap gap-2 text-[0.72rem] font-semibold ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      <span>{section.questions.length} questions</span>
                      {sReview > 0 && <span className={isDark ? 'text-amber-300' : 'text-amber-700'}>★ {sReview}</span>}
                      {sWrong > 0 && <span className={isDark ? 'text-rose-300' : 'text-rose-700'}>✕ {sWrong}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>}

          <button className={`mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark ? 'border-stone-800 bg-stone-950/60 text-stone-300 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'}`} onClick={() => onSelectPaper(ALL_PAPERS_ID)} type="button"><ListFilter size={15} />All papers aggregate</button>
        </div>
      </aside>
    </section>
  );
}

type PaperKind = 'see' | 'midsem' | 'test' | 'pretest' | 'pattern';

function classifyPaper(listing: PaperListing): PaperKind {
  if (listing.id === 'paper-pattern-bank') return 'pattern';
  if (listing.id.includes('midsem')) return 'midsem';
  if (listing.id.includes('pretest') || listing.id === 'paper-feb-2026') return 'pretest';
  if (listing.id === 'paper-jan-2026') return 'test';
  return 'see';
}

const PAPER_KIND_LABEL: Record<PaperKind, string> = {
  see: 'SEE paper', midsem: 'Mid-sem', test: 'Class test', pretest: 'Pre-test', pattern: 'Patterns',
};

function getPaperKindStyles(kind: PaperKind, isDark: boolean) {
  if (isDark) {
    switch (kind) {
      case 'see': return { chip: 'bg-amber-500/20 text-amber-200 border-amber-500/40', accent: 'from-amber-400/40' };
      case 'midsem': return { chip: 'bg-sky-500/20 text-sky-200 border-sky-500/40', accent: 'from-sky-400/40' };
      case 'test': return { chip: 'bg-violet-500/20 text-violet-200 border-violet-500/40', accent: 'from-violet-400/40' };
      case 'pretest': return { chip: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40', accent: 'from-emerald-400/40' };
      case 'pattern': return { chip: 'bg-stone-700/60 text-stone-200 border-stone-600/60', accent: 'from-stone-500/40' };
    }
  }
  switch (kind) {
    case 'see': return { chip: 'bg-red-100 text-red-800 border-red-200', accent: 'from-red-400/30' };
    case 'midsem': return { chip: 'bg-sky-100 text-sky-800 border-sky-200', accent: 'from-sky-400/30' };
    case 'test': return { chip: 'bg-violet-100 text-violet-800 border-violet-200', accent: 'from-violet-400/30' };
    case 'pretest': return { chip: 'bg-emerald-100 text-emerald-800 border-emerald-200', accent: 'from-emerald-400/30' };
    case 'pattern': return { chip: 'bg-stone-100 text-stone-800 border-stone-200', accent: 'from-stone-400/30' };
  }
}

function PaperListingCard({ isDark, listing, onSelect, reviewIds, selected, wrongIds }: { isDark: boolean; listing: PaperListing; onSelect: () => void; reviewIds: Set<string>; selected: boolean; wrongIds: Set<string>; }) {
  const reviewCount = listing.questions.filter((q) => reviewIds.has(q.id)).length;
  const wrongCount = listing.questions.filter((q) => wrongIds.has(q.id)).length;
  const kind = classifyPaper(listing);
  const kindStyles = getPaperKindStyles(kind, isDark);
  return (
    <button
      className={`group relative overflow-hidden rounded-2xl border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 hover:-translate-y-0.5 hover:shadow-md ${selected ? isDark ? 'border-amber-500 bg-amber-950/40 ring-1 ring-amber-500/40 focus:ring-amber-500' : 'border-red-700 bg-red-50 ring-1 ring-red-500/30 focus:ring-red-700' : isDark ? 'border-stone-800 bg-stone-950/70 hover:border-stone-600 focus:ring-amber-500' : 'border-stone-200 bg-white hover:border-stone-300 focus:ring-red-700'}`}
      onClick={onSelect} type="button"
    >
      <span aria-hidden className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${kindStyles.accent} to-transparent blur-2xl`} />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`text-base font-bold leading-6 ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{listing.title}</h3>
            <span className={`rounded-full border px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.08em] ${kindStyles.chip}`}>{PAPER_KIND_LABEL[kind]}</span>
          </div>
          {listing.subtitle && (<p className={`mt-0.5 truncate text-[0.7rem] font-semibold uppercase tracking-[0.08em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{listing.subtitle}</p>)}
          <p className={`mt-1.5 text-sm leading-5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{listing.description}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold tabular-nums ${isDark ? 'bg-stone-800/80 text-stone-100' : 'bg-stone-100 text-stone-800'}`}>{listing.questions.length} q</span>
      </div>
      <div className={`relative mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem] font-semibold ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
        <span>{listing.sections.length} section{listing.sections.length === 1 ? '' : 's'}</span>
        {reviewCount > 0 && <span className={isDark ? 'text-amber-300' : 'text-amber-700'}>★ {reviewCount} to review</span>}
        {wrongCount > 0 && <span className={isDark ? 'text-rose-300' : 'text-rose-700'}>✕ {wrongCount} wrong</span>}
        {selected && (<span className={`ml-auto inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}><span className={`h-1.5 w-1.5 rounded-full ${isDark ? 'bg-amber-400' : 'bg-red-700'}`} /> Opened</span>)}
      </div>
    </button>
  );
}

type MetricTone = 'neutral' | 'success' | 'amber' | 'danger';

function getMetricToneStyles(tone: MetricTone, isDark: boolean) {
  if (isDark) {
    switch (tone) {
      case 'success': return 'border-emerald-700/50 bg-emerald-950/40 text-emerald-200';
      case 'amber': return 'border-amber-700/50 bg-amber-950/40 text-amber-200';
      case 'danger': return 'border-rose-700/50 bg-rose-950/40 text-rose-200';
      default: return 'border-stone-700 bg-stone-950 text-stone-50';
    }
  }
  switch (tone) {
    case 'success': return 'border-emerald-200 bg-emerald-50 text-emerald-900';
    case 'amber': return 'border-amber-200 bg-amber-50 text-amber-900';
    case 'danger': return 'border-rose-200 bg-rose-50 text-rose-900';
    default: return 'border-stone-200 bg-stone-50 text-stone-900';
  }
}

function MiniMetric({ isDark, label, tone = 'neutral', value }: { isDark: boolean; label: string; tone?: MetricTone; value: string }) {
  return (
    <div className={`rounded-xl border px-3 py-2 ${getMetricToneStyles(tone, isDark)}`}>
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] opacity-75">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
    </div>
  );
}

interface PaperLearnModeProps {
  currentIndex: number;
  isDark: boolean;
  onBack: () => void;
  onMove: (direction: -1 | 1) => void;
  onStartTest: () => void;
  onToggleReview: (questionId: string) => void;
  question: PaperQuestion | undefined;
  questions: PaperQuestion[];
  reviewIds: Set<string>;
  scopeTitle: string;
  studiedCount: number;
}

function PaperLearnMode({ currentIndex, isDark, onBack, onMove, onStartTest, onToggleReview, question, questions, reviewIds, scopeTitle, studiedCount }: PaperLearnModeProps) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [defaultReveal, setDefaultReveal] = useState(false);
  const isMarked = question ? reviewIds.has(question.id) : false;
  const correct = question?.options.find((o) => o.isCorrect);
  const answerRevealed = Boolean(question && (defaultReveal || revealedIds.has(question.id)));
  const previousPreview = questions[currentIndex - 1];
  const nextPreview = questions[currentIndex + 1];
  if (!question) {
    return (
      <section className={`rounded-2xl border p-8 text-center shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/80' : 'border-stone-200 bg-white/85'}`}>
        <h2 className={`text-xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>No questions in scope</h2>
        <p className={`mt-2 text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>Try a different paper or section.</p>
        <button onClick={onBack} className={`mt-4 inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${isDark ? 'border-stone-700 bg-stone-950 text-stone-100' : 'border-stone-200 bg-white text-stone-950'}`} type="button"><ArrowLeft size={16} /> Back</button>
      </section>
    );
  }
  return (
    <section className="grid gap-4">
      <div className={`flex flex-wrap items-center gap-3 rounded-2xl border p-3 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/80' : 'border-stone-200 bg-white/85'}`}>
        <p className={`text-[0.72rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}>{scopeTitle}</p>
        <span className={`rounded-full px-3 py-1 text-xs font-bold tabular-nums ${isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}>{currentIndex + 1} / {questions.length}</span>
        <span className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Reviewed {studiedCount}/{questions.length}</span>
        <div className="ml-auto flex flex-wrap gap-2">
          <label className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-bold ${isDark ? 'border-stone-700 bg-stone-950 text-stone-300' : 'border-stone-200 bg-white text-stone-700'}`}>
            <input checked={defaultReveal} className="accent-current" onChange={(event) => setDefaultReveal(event.target.checked)} type="checkbox" />
            Default reveal
          </label>
          <button onClick={() => question && setRevealedIds((prev) => new Set(prev).add(question.id))} className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition ${answerRevealed ? isDark ? 'border-emerald-700 bg-emerald-950/50 text-emerald-200' : 'border-emerald-300 bg-emerald-50 text-emerald-800' : isDark ? 'border-stone-700 bg-stone-950 text-stone-300 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'}`} type="button">
            <Eye size={13} />
            {answerRevealed ? 'Answer shown' : 'Show answer'}
          </button>
          <button onClick={() => onToggleReview(question.id)} className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition ${isMarked ? isDark ? 'border-amber-500 bg-amber-950/50 text-amber-200' : 'border-amber-300 bg-amber-50 text-amber-800' : isDark ? 'border-stone-700 bg-stone-950 text-stone-300 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'}`} type="button"><Flag size={13} /> {isMarked ? 'Marked' : 'Mark for review'}</button>
          {/* Test these — hidden until the test flow is ready. Source preserved;
              do not delete. */}
          {/*
          <button
            disabled
            title="Test mode is paused — review mode only for now"
            className={`sticky bottom-3 z-20 inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-bold cursor-not-allowed sm:static ${isDark ? 'bg-stone-800 text-stone-500' : 'bg-stone-200 text-stone-500'}`}
            type="button"
          >
            <ClipboardList size={13} /> Test these
            <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.08em] ${isDark ? 'bg-stone-900 text-stone-400' : 'bg-white text-stone-500'}`}>Soon</span>
          </button>
          */}
        </div>
      </div>
      <article className={`rounded-2xl border p-5 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/85' : 'border-stone-200 bg-white/90'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{question.sectionTitle.replace(/^[^\p{L}\p{N}]+/u, '').trim() || 'Section'}</p>
            <h3 className={`mt-1 text-lg font-bold leading-7 ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{question.number} {question.prompt}</h3>
          </div>
          {question.prediction?.label && (<span className={`shrink-0 rounded-full px-3 py-1 text-[0.7rem] font-bold ${isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}>{question.prediction.label}</span>)}
        </div>
        {question.options.length > 0 && (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {question.options.map((option) => (
              <li key={option.id} className={`rounded-xl border p-3 text-sm ${answerRevealed && option.isCorrect ? isDark ? 'border-emerald-700 bg-emerald-950/40 text-emerald-100' : 'border-emerald-300 bg-emerald-50 text-emerald-900' : isDark ? 'border-stone-800 bg-stone-950/60 text-stone-200' : 'border-stone-200 bg-white text-stone-800'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium leading-5">{option.text}</span>
                  {answerRevealed && option.isCorrect && <CheckCircle2 size={16} className={isDark ? 'text-emerald-300' : 'text-emerald-700'} />}
                </div>
              </li>
            ))}
          </ul>
        )}
        {answerRevealed && (question.explanation.length > 0 || correct) && (
          <div className={`mt-4 rounded-xl p-3 text-sm leading-6 ${isDark ? 'bg-stone-800/50 text-stone-300' : 'bg-stone-100 text-stone-700'}`}>
            {correct && <p className={`mb-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>Answer · {correct.text}</p>}
            {question.explanation.map((line, idx) => (<p key={idx} className="mt-1">{line}</p>))}
          </div>
        )}
      </article>
      <div className="grid gap-2 sm:grid-cols-2">
        <button onClick={() => onMove(-1)} disabled={!previousPreview} className={`rounded-xl border p-3 text-left text-xs transition disabled:opacity-45 ${isDark ? 'border-stone-800 bg-stone-950/50 text-stone-400 hover:border-stone-600' : 'border-stone-200 bg-white text-stone-500 hover:border-stone-400'}`} type="button">
          <span className="block font-bold uppercase tracking-[0.14em]">Previous preview</span>
          <span className="mt-1 block truncate">{previousPreview ? `${previousPreview.number} ${previousPreview.prompt}` : 'Start of section'}</span>
        </button>
        <button onClick={() => onMove(1)} disabled={!nextPreview} className={`rounded-xl border p-3 text-left text-xs transition disabled:opacity-45 ${isDark ? 'border-stone-800 bg-stone-950/50 text-stone-400 hover:border-stone-600' : 'border-stone-200 bg-white text-stone-500 hover:border-stone-400'}`} type="button">
          <span className="block font-bold uppercase tracking-[0.14em]">Next preview</span>
          <span className="mt-1 block truncate">{nextPreview ? `${nextPreview.number} ${nextPreview.prompt}` : 'End of section'}</span>
        </button>
      </div>
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => onMove(-1)} disabled={currentIndex === 0} className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition disabled:opacity-50 ${isDark ? 'border-stone-700 bg-stone-950 text-stone-100 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-950 hover:bg-stone-100'}`} type="button"><ChevronLeft size={16} /> Previous</button>
        <p className={`text-xs font-semibold ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>← / → to navigate</p>
        <button onClick={() => onMove(1)} disabled={currentIndex >= questions.length - 1} className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition disabled:opacity-50 ${isDark ? 'bg-amber-500 text-stone-950 hover:bg-amber-400' : 'bg-red-700 text-white hover:bg-red-800'}`} type="button">Next <ChevronRight size={16} /></button>
      </div>
    </section>
  );
}

interface PaperTestModeProps {
  answers: Record<string, string>;
  confirmSubmitOpen: boolean;
  currentIndex: number;
  elapsedSeconds: number;
  isDark: boolean;
  onAnswer: (questionId: string, optionId: string) => void;
  onBack: () => void;
  onCancelSubmit: () => void;
  onConfirmSubmit: () => void;
  onFinish: () => void;
  onJump: (index: number) => void;
  onMove: (direction: -1 | 1) => void;
  question: PaperQuestion | undefined;
  questions: PaperQuestion[];
  reviewIds: Set<string>;
  scopeTitle: string;
}

function PaperTestMode({ answers, confirmSubmitOpen, currentIndex, elapsedSeconds, isDark, onAnswer, onBack, onCancelSubmit, onConfirmSubmit, onFinish, onJump, onMove, question, questions, reviewIds, scopeTitle }: PaperTestModeProps) {
  if (!question) {
    return (<section className={`rounded-2xl border p-8 text-center shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/80' : 'border-stone-200 bg-white/85'}`}><p>No questions available.</p><button onClick={onBack} className="mt-4" type="button">Back</button></section>);
  }
  const answered = answers[question.id];
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined).length;
  const unansweredCount = questions.length - answeredCount;
  return (
    <section className="grid gap-4">
      <div className={`flex flex-wrap items-center gap-3 rounded-2xl border p-3 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/80' : 'border-stone-200 bg-white/85'}`}>
        <p className={`text-[0.72rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}>{scopeTitle}</p>
        <span className={`rounded-full px-3 py-1 text-xs font-bold tabular-nums ${isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}>{currentIndex + 1} / {questions.length}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold tabular-nums ${isDark ? 'bg-emerald-950/60 text-emerald-200' : 'bg-emerald-50 text-emerald-800'}`}>{answeredCount} / {questions.length} answered</span>
        <span className={`inline-flex items-center gap-1 text-xs font-semibold tabular-nums ${isDark ? 'text-stone-400' : 'text-stone-500'}`}><Clock3 size={13} /> {formatTime(elapsedSeconds)}</span>
        <div className="relative ml-auto">
          <button onClick={onFinish} className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-bold ${isDark ? 'bg-emerald-500 text-stone-950 hover:bg-emerald-400' : 'bg-emerald-700 text-white hover:bg-emerald-800'}`} type="button"><CheckCircle2 size={13} /> Submit</button>
          {confirmSubmitOpen && (
            <div className={`absolute right-0 top-11 z-20 w-72 rounded-2xl border p-3 text-sm shadow-xl ${isDark ? 'border-amber-700 bg-stone-950 text-stone-100' : 'border-red-200 bg-white text-stone-900'}`}>
              <p className="font-bold">Submit with {unansweredCount} unanswered?</p>
              <p className={`mt-1 text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>Unanswered questions will stay out of the score.</p>
              <div className="mt-3 flex justify-end gap-2">
                <button className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${isDark ? 'border-stone-700 text-stone-300' : 'border-stone-200 text-stone-700'}`} onClick={onCancelSubmit} type="button">Cancel</button>
                <button className={`rounded-lg px-3 py-1.5 text-xs font-bold ${isDark ? 'bg-amber-500 text-stone-950' : 'bg-red-700 text-white'}`} onClick={onConfirmSubmit} type="button">Submit anyway</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <article className={`rounded-2xl border p-5 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/85' : 'border-stone-200 bg-white/90'}`}>
        <p className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{question.sectionTitle.replace(/^[^\p{L}\p{N}]+/u, '').trim() || 'Section'}</p>
        <h3 className={`mt-1 text-lg font-bold leading-7 ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{question.number} {question.prompt}</h3>
        {question.options.length > 0 ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {question.options.map((option) => {
              const isSel = answered === option.id;
              return (<li key={option.id}><button onClick={() => onAnswer(question.id, option.id)} className={`w-full rounded-xl border p-3 text-left text-sm transition hover:-translate-y-0.5 ${isSel ? isDark ? 'border-amber-500 bg-amber-950/40 text-amber-100' : 'border-red-700 bg-red-50 text-red-900' : isDark ? 'border-stone-800 bg-stone-950/60 text-stone-200 hover:border-stone-600' : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'}`} type="button">{option.text}</button></li>);
            })}
          </ul>
        ) : (<p className={`mt-4 text-sm ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Descriptive question — review the answer in Learn mode.</p>)}
      </article>
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => onMove(-1)} disabled={currentIndex === 0} className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition disabled:opacity-50 ${isDark ? 'border-stone-700 bg-stone-950 text-stone-100 hover:bg-stone-800' : 'border-stone-200 bg-white text-stone-950 hover:bg-stone-100'}`} type="button"><ChevronLeft size={16} /> Previous</button>
        <div className="flex max-w-[56vw] snap-x items-center gap-1 overflow-x-auto px-1 py-1 sm:max-w-lg">
          {questions.map((q, i) => {
            const isReview = reviewIds.has(q.id);
            return (
              <button key={q.id} onClick={() => onJump(i)} className={`relative h-8 w-8 shrink-0 snap-start rounded-lg text-[0.7rem] font-bold tabular-nums transition ${i === currentIndex ? isDark ? 'bg-amber-500 text-stone-950' : 'bg-red-700 text-white' : answers[q.id] ? isDark ? 'bg-emerald-900/60 text-emerald-200' : 'bg-emerald-100 text-emerald-800' : isDark ? 'bg-stone-800 text-stone-400 hover:bg-stone-700' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`} type="button">
                {i + 1}
                {isReview && <span className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ${isDark ? 'bg-amber-200' : 'bg-amber-500'}`} />}
              </button>
            );
          })}
        </div>
        <button onClick={() => onMove(1)} disabled={currentIndex >= questions.length - 1} className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition disabled:opacity-50 ${isDark ? 'bg-amber-500 text-stone-950 hover:bg-amber-400' : 'bg-red-700 text-white hover:bg-red-800'}`} type="button">Next <ChevronRight size={16} /></button>
      </div>
    </section>
  );
}

interface PaperResultsProps {
  answers: Record<string, string>;
  elapsedSeconds: number;
  isDark: boolean;
  onBack: () => void;
  onRetry: () => void;
  questions: PaperQuestion[];
  scopeTitle: string;
}

function PaperResults({ answers, elapsedSeconds, isDark, onBack, onRetry, questions, scopeTitle }: PaperResultsProps) {
  const answered = questions.filter((q) => answers[q.id] !== undefined);
  const correct = answered.filter((q) => { const c = q.options.find((o) => o.isCorrect); return c && answers[q.id] === c.id; });
  const score = answered.length === 0 ? 0 : Math.round((correct.length / answered.length) * 100);
  return (
    <section className="grid gap-4">
      <div className={`rounded-2xl border p-6 text-center shadow-sm ${isDark ? 'border-emerald-800 bg-emerald-950/60 text-emerald-100' : 'border-emerald-300 bg-emerald-50 text-emerald-900'}`}>
        <div className={`mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full ${isDark ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}><Award size={32} /></div>
        <h2 className="text-2xl font-bold">{scopeTitle}</h2>
        <p className={`mt-1 text-sm ${isDark ? 'text-emerald-200' : 'text-emerald-800'}`}>{correct.length} of {answered.length} correct · {score}% · {formatTime(elapsedSeconds)}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            disabled
            title="Test mode is paused — review mode only for now"
            className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold cursor-not-allowed ${isDark ? 'bg-stone-800 text-stone-500' : 'bg-stone-200 text-stone-500'}`}
            type="button"
          >
            <RotateCcw size={15} /> Retry
          </button>
          <button onClick={onBack} className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${isDark ? 'border-emerald-700 bg-emerald-950/40 text-emerald-100' : 'border-emerald-300 bg-white text-emerald-900'}`} type="button"><ArrowLeft size={15} /> Back</button>
        </div>
      </div>
      <div className="grid gap-2">
        {questions.map((q) => {
          const given = answers[q.id];
          const c = q.options.find((o) => o.isCorrect);
          const isCorrect = c && given === c.id;
          const isUnanswered = given === undefined;
          return (
            <div key={q.id} className={`rounded-xl border p-3 text-sm ${isUnanswered ? isDark ? 'border-stone-800 bg-stone-950/50 text-stone-400' : 'border-stone-200 bg-stone-50 text-stone-600' : isCorrect ? isDark ? 'border-emerald-700/50 bg-emerald-950/30 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-800' : isDark ? 'border-rose-700/50 bg-rose-950/30 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-800'}`}>
              <p className="font-semibold">{q.number} {q.prompt}</p>
              <p className="mt-1 text-xs">Your answer: {given ? q.options.find((o) => o.id === given)?.text ?? '—' : 'Not answered'}{c && !isCorrect && (<span className="ml-2">· Correct: {c.text}</span>)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

interface PaperQuestionBrowserProps {
  answeredIds: Set<string>;
  filter: PaperFilter;
  isDark: boolean;
  onBack: () => void;
  onFilterChange: (filter: PaperFilter) => void;
  onOpenLearn: (index: number) => void;
  onSearchChange: (value: string) => void;
  onToggleReview: (questionId: string) => void;
  questions: PaperQuestion[];
  reviewIds: Set<string>;
  scopeTitle: string;
  search: string;
  wrongIds: Set<string>;
}

function PaperQuestionBrowser({ answeredIds, filter, isDark, onBack, onFilterChange, onOpenLearn, onSearchChange, onToggleReview, questions, reviewIds, scopeTitle, search, wrongIds }: PaperQuestionBrowserProps) {
  const [rangeFilter, setRangeFilter] = useState('all');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const mcqLike = questions.filter((q) => q.options.length > 0).length >= Math.max(3, Math.floor(questions.length * 0.7));
  const chunkSize = mcqLike ? 5 : 10;
  const rangeChips = useMemo(() => {
    if (questions.length <= chunkSize) return [{ id: 'all', label: 'All', start: 0, end: questions.length - 1 }];
    const chips = [{ id: 'all', label: 'All', start: 0, end: questions.length - 1 }];
    for (let start = 0; start < questions.length; start += chunkSize) {
      const end = Math.min(start + chunkSize - 1, questions.length - 1);
      chips.push({ id: `${start}-${end}`, label: `Q${start + 1}-Q${end + 1}`, start, end });
    }
    return chips;
  }, [chunkSize, questions.length]);
  const filtered = questions.map((q, i) => ({ q, i })).filter(({ q }) => {
    if (filter === 'unanswered' && answeredIds.has(q.id)) return false;
    if (filter === 'wrong' && !wrongIds.has(q.id)) return false;
    if (filter === 'review' && !reviewIds.has(q.id)) return false;
    if (search.trim()) {
      const needle = search.trim().toLowerCase();
      if (!(q.prompt.toLowerCase().includes(needle) || q.number.toLowerCase().includes(needle))) return false;
    }
    const selectedRange = rangeChips.find((chip) => chip.id === rangeFilter);
    if (selectedRange && rangeFilter !== 'all') {
      const index = questions.findIndex((candidate) => candidate.id === q.id);
      if (index < selectedRange.start || index > selectedRange.end) return false;
    }
    return true;
  });

  useEffect(() => {
    setHighlightedIndex(0);
  }, [filter, rangeFilter, search, questions.length]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isEditableKeyboardTarget(event.target)) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex((index) => Math.max(index - 1, 0));
      } else if (event.key === 'Enter' && filtered[highlightedIndex]) {
        event.preventDefault();
        onOpenLearn(filtered[highlightedIndex].i);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtered, highlightedIndex, onOpenLearn]);
  return (
    <section className="grid gap-4">
      <div className={`flex flex-wrap items-center gap-3 rounded-2xl border p-3 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/80' : 'border-stone-200 bg-white/85'}`}>
        <button onClick={onBack} className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold ${isDark ? 'border-stone-700 bg-stone-950 text-stone-300' : 'border-stone-200 bg-white text-stone-700'}`} type="button"><ArrowLeft size={14} /> Back</button>
        <p className={`text-[0.72rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}>{scopeTitle}</p>
        <span className={`rounded-full px-3 py-1 text-xs font-bold tabular-nums ${isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}>{filtered.length} / {questions.length}</span>
        <div className={`ml-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${isDark ? 'border-stone-700 bg-stone-950' : 'border-stone-200 bg-white'}`}>
          <Search size={14} className={isDark ? 'text-stone-500' : 'text-stone-400'} />
          <input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search prompts" className={`min-w-[8rem] bg-transparent text-sm outline-none ${isDark ? 'text-stone-100 placeholder:text-stone-500' : 'text-stone-900 placeholder:text-stone-400'}`} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {(['all', 'unanswered', 'wrong', 'review'] as PaperFilter[]).map((f) => (
          <button key={f} onClick={() => onFilterChange(f)} className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition ${filter === f ? isDark ? 'bg-amber-500 text-stone-950' : 'bg-red-700 text-white' : isDark ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`} type="button">{f}</button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {rangeChips.map((chip) => (
          <button key={chip.id} onClick={() => setRangeFilter(chip.id)} className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${rangeFilter === chip.id ? isDark ? 'bg-amber-500 text-stone-950' : 'bg-red-700 text-white' : isDark ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`} type="button">
            {chip.label}
          </button>
        ))}
      </div>
      <div className="grid gap-2">
        {filtered.map(({ q, i }, rowIndex) => {
          const correct = q.options.find((o) => o.isCorrect);
          const isReview = reviewIds.has(q.id);
          const isWrong = wrongIds.has(q.id);
          return (
            <button key={q.id} onClick={() => onOpenLearn(i)} className={`group rounded-xl border p-3 text-left transition hover:-translate-y-0.5 ${rowIndex === highlightedIndex ? isDark ? 'border-amber-500 bg-amber-950/30' : 'border-red-700 bg-red-50' : isDark ? 'border-stone-800 bg-stone-950/60 hover:border-stone-600' : 'border-stone-200 bg-white hover:border-stone-400'}`} type="button">
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[0.65rem] font-bold tabular-nums ${isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}>{q.number}</span>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold leading-6 ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>{q.prompt}</p>
                  {correct && (<p className={`mt-1 text-[0.72rem] font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>✓ {correct.text}</p>)}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {isReview && <span className={isDark ? 'text-amber-300' : 'text-amber-700'} title="Marked for review">★</span>}
                  {isWrong && <span className={isDark ? 'text-rose-300' : 'text-rose-700'} title="Answered wrong">✕</span>}
                  <span onClick={(e) => { e.stopPropagation(); onToggleReview(q.id); }} role="button" className={`ml-2 inline-flex h-7 items-center gap-1 rounded-full border px-2 text-[0.65rem] font-bold ${isReview ? (isDark ? 'border-amber-500 text-amber-200' : 'border-amber-400 text-amber-700') : (isDark ? 'border-stone-700 text-stone-400' : 'border-stone-300 text-stone-600')}`}><Flag size={11} /> {isReview ? 'Marked' : 'Mark'}</span>
                </div>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (<p className={`rounded-xl border p-6 text-center text-sm ${isDark ? 'border-stone-800 bg-stone-950 text-stone-400' : 'border-stone-200 bg-white text-stone-500'}`}>No questions match the current filter.</p>)}
      </div>
    </section>
  );
}

function SplashScreen({ isDark, onSkip }: { isDark: boolean; onSkip: () => void }) {
  return (
    <motion.div animate={{ opacity: 1 }} className={`fixed inset-0 z-50 flex items-center justify-center px-6 ${isDark ? 'bg-[#0f0e0c] text-stone-50' : 'bg-[#fbf7ef] text-stone-950'}`} initial={{ opacity: 0 }} onClick={onSkip}>
      <motion.div animate={{ opacity: 1, scale: 1, y: 0 }} className="flex flex-col items-center text-center" initial={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.35 }}>
        <div className={`mb-5 grid h-20 w-20 place-items-center rounded-2xl border text-4xl font-bold shadow-sm ${isDark ? 'border-amber-700 bg-stone-900 text-amber-300' : 'border-red-200 bg-white text-red-700'}`}>{isDark ? '月' : '日'}</div>
        <div className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${isDark ? 'border-stone-700 text-amber-300' : 'border-stone-300 text-red-700'}`}>{isDark ? <Moon size={14} /> : <Sun size={14} />}{isDark ? 'Dark mode' : 'Light mode'}</div>
        <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">Kanji Match Dojo</h2>
        <button
          className={`mt-4 rounded-full border px-4 py-1.5 text-xs font-bold ${isDark ? 'border-stone-700 bg-stone-900 text-stone-300 hover:bg-stone-800' : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'}`}
          onClick={onSkip}
          type="button"
        >
          Skip
        </button>
        <div className={`mt-6 h-1.5 w-44 overflow-hidden rounded-full ${isDark ? 'bg-stone-800' : 'bg-stone-200'}`}>
          <motion.div animate={{ x: ['-100%', '100%'] }} className={`h-full w-1/2 rounded-full ${isDark ? 'bg-amber-400' : 'bg-red-700'}`} transition={{ duration: 0.9, ease: 'easeInOut' }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

interface MatchColumnProps {
  isDark: boolean;
  isError: boolean;
  items: KanjiData[];
  matchedIds: Set<number>;
  onSelect: (id: number) => void;
  selectedId: number | null;
}

function KanjiColumn({ isDark, isError, items, matchedIds, onSelect, selectedId }: MatchColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      <ColumnHeading isDark={isDark} label="Kanji" />
      {items.filter((item) => !matchedIds.has(item.id)).map((item) => (
        <Fragment key={`kanji-${item.id}`}>
          <MatchButton isDark={isDark} isError={isError} onClick={() => onSelect(item.id)} selected={selectedId === item.id}>
            <span className="text-4xl font-semibold leading-none sm:text-5xl">{item.kanji}</span>
          </MatchButton>
        </Fragment>
      ))}
    </div>
  );
}

function MeaningColumn({ isDark, isError, items, matchedIds, onSelect, selectedId }: MatchColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      <ColumnHeading isDark={isDark} label="Meaning" />
      {items.filter((item) => !matchedIds.has(item.id)).map((item) => (
        <Fragment key={`meaning-${item.id}`}>
          <MatchButton isDark={isDark} isError={isError} onClick={() => onSelect(item.id)} selected={selectedId === item.id}>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-bold text-current sm:text-base">{item.meaning}</span>
            </span>
          </MatchButton>
        </Fragment>
      ))}
    </div>
  );
}

function ColumnHeading({ isDark, label }: { isDark: boolean; label: string }) {
  return (
    <div className={`sticky top-0 z-10 rounded-md border px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.18em] backdrop-blur ${isDark ? 'border-stone-700 bg-stone-900/95 text-stone-400' : 'border-stone-200 bg-white/95 text-stone-500'}`}>{label}</div>
  );
}

interface MatchButtonProps {
  children: ReactNode;
  isDark: boolean;
  isError: boolean;
  onClick: () => void;
  selected: boolean;
}

function MatchButton({ children, isDark, isError, onClick, selected }: MatchButtonProps) {
  return (
    <motion.button
      animate={selected && isError ? { backgroundColor: '#fef2f2', borderColor: '#dc2626', color: '#991b1b', opacity: 1, x: [-5, 5, -5, 5, 0] } : selected ? { backgroundColor: isDark ? '#451a03' : '#fff7ed', borderColor: isDark ? '#f59e0b' : '#c2410c', color: isDark ? '#fef3c7' : '#9a3412', opacity: 1, scale: 1.02 } : { backgroundColor: isDark ? '#1c1917' : '#ffffff', borderColor: isDark ? '#44403c' : '#e7e5e4', color: isDark ? '#f5f5f4' : '#1c1917', opacity: 1, scale: 1 }}
      aria-pressed={selected}
      className={`relative flex min-h-20 w-full items-center justify-center rounded-lg border-2 px-3 text-center shadow-sm transition focus:outline-none focus:ring-2 disabled:cursor-default sm:min-h-24 ${isDark ? 'focus:ring-amber-500' : 'focus:ring-red-700'}`}
      onClick={onClick} transition={{ duration: 0.18 }} type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

interface StatCardProps {
  icon: ReactNode;
  isDark: boolean;
  label: string;
  value: string;
}

function StatCard({ icon, isDark, label, value }: StatCardProps) {
  return (
    <div className={`rounded-xl border px-3 py-2 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900' : 'border-stone-200 bg-white'}`}>
      <div className={`flex items-center gap-2 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{icon}<span className="text-xs font-bold uppercase tracking-[0.12em]">{label}</span></div>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{value}</p>
    </div>
  );
}
