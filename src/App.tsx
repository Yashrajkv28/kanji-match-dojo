import { Fragment, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Clock3,
  Languages,
  Layers3,
  Moon,
  Play,
  RotateCcw,
  Sparkles,
  Sun,
  Target,
  XCircle,
} from 'lucide-react';

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

const THEME_KEY = 'kanji-matcher-theme';

type AppView = 'dashboard' | 'game';
type Theme = 'light' | 'dark';

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

function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem(THEME_KEY);
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getBestTimeKey(setId: string): string {
  return `kanji-matcher-best-time:${setId}`;
}

export default function App() {
  const [appView, setAppView] = useState<AppView>('dashboard');
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
  const [showSplash, setShowSplash] = useState(true);

  const isDark = theme === 'dark';
  const selectedSet = useMemo(
    () => QUESTION_SETS.find((set) => set.id === selectedSetId),
    [selectedSetId],
  );
  const activeSet = selectedSet ?? QUESTION_SETS[0];
  const totalQuestions = activeSet.items.length;
  const isComplete = matchedIds.size === totalQuestions;
  const attempts = matchedIds.size + mistakes;
  const accuracy = attempts === 0 ? 100 : Math.round((matchedIds.size / attempts) * 100);
  const remaining = totalQuestions - matchedIds.size;

  const selectedKanji = useMemo(
    () => activeSet.items.find((item) => item.id === selectedKanjiId),
    [activeSet.items, selectedKanjiId],
  );

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

  useEffect(() => {
    initGame(activeSet);
  }, [activeSet, initGame]);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const splashTimer = window.setTimeout(() => {
      setShowSplash(false);
    }, 1100);

    return () => window.clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!selectedSet) {
      setBestTime(null);
      return;
    }

    const storedBestTime = window.localStorage.getItem(getBestTimeKey(selectedSet.id));
    if (storedBestTime !== null) {
      const parsedBestTime = Number(storedBestTime);
      setBestTime(Number.isFinite(parsedBestTime) ? parsedBestTime : null);
      return;
    }

    setBestTime(null);
  }, [selectedSet]);

  useEffect(() => {
    if (appView !== 'game' || isComplete) {
      return;
    }

    const timerId = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [appView, isComplete]);

  useEffect(() => {
    if (!isComplete || appView !== 'game') {
      return;
    }

    setBestTime((previousBestTime) => {
      if (previousBestTime !== null && previousBestTime <= elapsedSeconds) {
        return previousBestTime;
      }

      window.localStorage.setItem(getBestTimeKey(activeSet.id), String(elapsedSeconds));
      return elapsedSeconds;
    });
  }, [activeSet.id, appView, elapsedSeconds, isComplete]);

  const finishAttempt = useCallback((kanjiId: number, meaningId: number) => {
    setSelectedKanjiId(kanjiId);
    setSelectedMeaningId(meaningId);

    if (kanjiId === meaningId) {
      setMatchedIds((previousIds) => new Set(previousIds).add(kanjiId));
      setSelectedKanjiId(null);
      setSelectedMeaningId(null);
      return;
    }

    setMistakes((currentMistakes) => currentMistakes + 1);
    setIsError(true);
    window.setTimeout(() => {
      setIsError(false);
      setSelectedKanjiId(null);
      setSelectedMeaningId(null);
    }, 600);
  }, []);

  const handleKanjiClick = (id: number) => {
    if (matchedIds.has(id) || isError) {
      return;
    }

    if (selectedKanjiId === id) {
      setSelectedKanjiId(null);
      return;
    }

    if (selectedMeaningId !== null) {
      finishAttempt(id, selectedMeaningId);
      return;
    }

    setSelectedKanjiId(id);
  };

  const handleMeaningClick = (id: number) => {
    if (matchedIds.has(id) || isError) {
      return;
    }

    if (selectedMeaningId === id) {
      setSelectedMeaningId(null);
      return;
    }

    if (selectedKanjiId !== null) {
      finishAttempt(selectedKanjiId, id);
      return;
    }

    setSelectedMeaningId(id);
  };

  const handleSelectSet = (setId: string) => {
    setSelectedSetId(setId);
    setAppView('dashboard');
  };

  const handleStartSet = (setId: string) => {
    const questionSet = QUESTION_SETS.find((set) => set.id === setId) ?? QUESTION_SETS[0];
    setSelectedSetId(questionSet.id);
    initGame(questionSet);
    setAppView('game');
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={isDark ? 'min-h-screen bg-[#12110f] text-stone-100' : 'min-h-screen bg-[#f6f4ef] text-stone-900'}>
      {showSplash && <SplashScreen isDark={isDark} />}
      <main
        className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8"
        onClick={appView === 'dashboard' ? () => setSelectedSetId(null) : undefined}
      >
        <AppHeader
          appView={appView}
          isDark={isDark}
          onBackToDashboard={() => setAppView('dashboard')}
          onToggleTheme={toggleTheme}
          selectedSet={activeSet}
          stats={{
            accuracy,
            elapsedSeconds,
            matched: matchedIds.size,
            mistakes,
            total: totalQuestions,
          }}
        />

        {appView === 'dashboard' ? (
          <Dashboard
            bestTime={bestTime}
            isDark={isDark}
            onSelectSet={handleSelectSet}
            onStartSet={handleStartSet}
            questionSets={QUESTION_SETS}
            selectedSetId={selectedSetId}
          />
        ) : (
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
            remaining={remaining}
            selectedKanji={selectedKanji}
            selectedKanjiId={selectedKanjiId}
            selectedMeaningId={selectedMeaningId}
            selectedSet={activeSet}
            shuffledKanji={shuffledKanji}
            shuffledMeanings={shuffledMeanings}
          />
        )}
      </main>
    </div>
  );
}

interface AppHeaderProps {
  appView: AppView;
  isDark: boolean;
  onBackToDashboard: () => void;
  onToggleTheme: () => void;
  selectedSet: QuestionSet;
  stats: {
    accuracy: number;
    elapsedSeconds: number;
    matched: number;
    mistakes: number;
    total: number;
  };
}

function AppHeader({ appView, isDark, onBackToDashboard, onToggleTheme, selectedSet, stats }: AppHeaderProps) {
  return (
    <header
      className={`flex flex-col gap-5 border-b pb-5 lg:flex-row lg:items-end lg:justify-between ${
        isDark ? 'border-stone-700' : 'border-stone-300/80'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg text-white shadow-sm ${isDark ? 'bg-amber-600' : 'bg-red-700'}`}>
          <Languages size={26} />
        </div>
        <div>
          <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-amber-400' : 'text-red-700'}`}>
            {appView === 'dashboard' ? 'Question dashboard' : selectedSet.subtitle}
          </p>
          <h1 className={`text-3xl font-bold tracking-normal sm:text-4xl ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>
            Kanji Match Dojo
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        {appView === 'game' && (
          <button
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isDark
                ? 'border-stone-600 bg-stone-900 text-stone-100 hover:bg-stone-800 focus:ring-amber-500 focus:ring-offset-[#12110f]'
                : 'border-stone-300 bg-white text-stone-900 hover:bg-stone-100 focus:ring-red-700 focus:ring-offset-[#f6f4ef]'
            }`}
            onClick={onBackToDashboard}
            type="button"
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>
        )}
        <button
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isDark
              ? 'border-stone-600 bg-stone-900 text-amber-200 hover:bg-stone-800 focus:ring-amber-500 focus:ring-offset-[#12110f]'
              : 'border-stone-300 bg-white text-stone-900 hover:bg-stone-100 focus:ring-red-700 focus:ring-offset-[#f6f4ef]'
          }`}
          onClick={onToggleTheme}
          type="button"
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
          {isDark ? 'Light' : 'Dark'}
        </button>
        {appView === 'game' && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[34rem]">
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

interface DashboardProps {
  bestTime: number | null;
  isDark: boolean;
  onSelectSet: (setId: string) => void;
  onStartSet: (setId: string) => void;
  questionSets: QuestionSet[];
  selectedSetId: string | null;
}

function Dashboard({ bestTime, isDark, onSelectSet, onStartSet, questionSets, selectedSetId }: DashboardProps) {
  const selectedSet = questionSets.find((set) => set.id === selectedSetId);

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className={`rounded-lg border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/90' : 'border-stone-300 bg-white/80'}`}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Choose a question set</h2>
            <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              Select a deck now; add more decks later without changing the game screen.
            </p>
          </div>
          <div className={`hidden h-10 w-10 place-items-center rounded-md sm:grid ${isDark ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-red-700'}`}>
            <Layers3 size={20} />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {questionSets.map((questionSet) => {
            const selected = questionSet.id === selectedSetId;
            const preview = questionSet.items.slice(0, 6).map((item) => item.kanji).join(' ');

            return (
              <button
                className={`rounded-lg border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  selected
                    ? isDark
                      ? 'border-amber-500 bg-amber-950/50 focus:ring-amber-500 focus:ring-offset-stone-900'
                      : 'border-red-700 bg-red-50 focus:ring-red-700 focus:ring-offset-[#f6f4ef]'
                    : isDark
                      ? 'border-stone-700 bg-stone-950 hover:border-stone-500 focus:ring-amber-500 focus:ring-offset-stone-900'
                      : 'border-stone-300 bg-white hover:border-stone-400 focus:ring-red-700 focus:ring-offset-[#f6f4ef]'
                }`}
                key={questionSet.id}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelectSet(questionSet.id);
                }}
                type="button"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-[0.18em] ${isDark ? 'text-amber-300' : 'text-red-700'}`}>{questionSet.level}</p>
                    <h3 className={`mt-1 text-xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{questionSet.title}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}>
                    {questionSet.items.length}
                  </span>
                </div>
                <p className={`text-sm leading-6 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{questionSet.description}</p>
                <p className={`mt-5 text-3xl font-semibold tracking-normal ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{preview}</p>
              </button>
            );
          })}
        </div>
      </div>

      <aside className={`rounded-lg border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900' : 'border-stone-300 bg-white'}`}>
        <div className={`mb-4 grid h-12 w-12 place-items-center rounded-lg ${isDark ? 'bg-amber-600 text-stone-950' : 'bg-red-700 text-white'}`}>
          <BookOpen size={24} />
        </div>
        <p className={`text-xs font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
          {selectedSet ? 'Selected deck' : 'No deck selected'}
        </p>
        <h2 className={`mt-2 text-2xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>
          {selectedSet ? selectedSet.title : 'Choose a set'}
        </h2>
        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
          {selectedSet ? selectedSet.description : 'Pick a question set from the dashboard before starting a drill.'}
        </p>
        {selectedSet && (
          <div className={`mt-5 rounded-md p-3 ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`}>
            <p className={`text-xs font-bold uppercase tracking-[0.16em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Best time</p>
            <p className={`mt-1 text-3xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>
              {bestTime === null ? 'Not set' : formatTime(bestTime)}
            </p>
          </div>
        )}
        <button
          className={`mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            isDark
              ? 'bg-amber-500 text-stone-950 hover:bg-amber-400 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-stone-950'
              : 'bg-stone-950 text-white hover:bg-stone-800 focus:ring-red-700 focus:ring-offset-2'
          }`}
          disabled={!selectedSet}
          onClick={(event) => {
            event.stopPropagation();
            if (selectedSet) {
              onStartSet(selectedSet.id);
            }
          }}
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
  remaining: number;
  selectedKanji: KanjiData | undefined;
  selectedKanjiId: number | null;
  selectedMeaningId: number | null;
  selectedSet: QuestionSet;
  shuffledKanji: KanjiData[];
  shuffledMeanings: KanjiData[];
}

function GameBoard({
  bestTime,
  elapsedSeconds,
  isComplete,
  isDark,
  isError,
  matchedIds,
  mistakes,
  onKanjiSelect,
  onMeaningSelect,
  onReset,
  remaining,
  selectedKanji,
  selectedKanjiId,
  selectedMeaningId,
  selectedSet,
  shuffledKanji,
  shuffledMeanings,
}: GameBoardProps) {
  return (
    <>
      <section className="grid gap-4 md:grid-cols-[minmax(0,1fr)_17rem]">
        <div className={`rounded-lg border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/90' : 'border-stone-300 bg-white/80'}`}>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Match each character to its meaning</h2>
              <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                {remaining === 0 ? 'Board complete.' : `${remaining} remaining in ${selectedSet.title}`}
              </p>
            </div>
            <button
              onClick={onReset}
              className={`inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDark
                  ? 'border-amber-700 bg-amber-600 text-stone-950 hover:bg-amber-500 focus:ring-amber-500 focus:ring-offset-stone-900'
                  : 'border-stone-300 bg-stone-950 text-white hover:bg-stone-800 focus:ring-red-700 focus:ring-offset-2'
              }`}
              type="button"
            >
              <RotateCcw size={17} />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <KanjiColumn
              isDark={isDark}
              isError={isError}
              items={shuffledKanji}
              matchedIds={matchedIds}
              onSelect={onKanjiSelect}
              selectedId={selectedKanjiId}
            />
            <MeaningColumn
              isDark={isDark}
              isError={isError}
              items={shuffledMeanings}
              matchedIds={matchedIds}
              onSelect={onMeaningSelect}
              selectedId={selectedMeaningId}
            />
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className={`rounded-lg border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900' : 'border-stone-300 bg-white'}`}>
            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Current pick</p>
            <div className={`mt-4 min-h-36 rounded-md p-4 ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`}>
              {selectedKanji ? (
                <div className="flex h-full flex-col justify-between gap-4">
                  <span className={`text-6xl font-semibold leading-none ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>
                    {selectedKanji.kanji}
                  </span>
                  <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Choose the matching meaning.</p>
                </div>
              ) : (
                <div className={`flex min-h-28 items-center text-sm ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Select a kanji to begin a match.
                </div>
              )}
            </div>
          </div>

          <div className={`rounded-lg border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900' : 'border-stone-300 bg-white'}`}>
            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Best time</p>
            <p className={`mt-3 text-3xl font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>
              {bestTime === null ? 'Not set' : formatTime(bestTime)}
            </p>
          </div>
        </aside>
      </section>

      {isComplete && (
        <motion.section
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`rounded-lg border p-6 text-center shadow-sm ${
            isDark
              ? 'border-emerald-800 bg-emerald-950/60 text-emerald-100'
              : 'border-emerald-300 bg-emerald-50 text-emerald-900'
          }`}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
        >
          <div className={`mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full ${isDark ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
            <Award size={32} />
          </div>
          <h2 className="text-2xl font-bold">Perfect score. Subarashii!</h2>
          <p className={`mt-2 text-sm ${isDark ? 'text-emerald-200' : 'text-emerald-800'}`}>
            Finished in {formatTime(elapsedSeconds)} with {mistakes} misses.
          </p>
          <button
            onClick={onReset}
            className={`mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 ${
              isDark
                ? 'bg-emerald-500 text-stone-950 hover:bg-emerald-400 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-stone-950'
                : 'bg-emerald-700 text-white hover:bg-emerald-800 focus:ring-emerald-700 focus:ring-offset-2'
            }`}
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

function SplashScreen({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={`fixed inset-0 z-50 flex items-center justify-center px-6 ${
        isDark ? 'bg-[#0f0e0c] text-stone-50' : 'bg-[#fbf7ef] text-stone-950'
      }`}
      initial={{ opacity: 0 }}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.35 }}
      >
        <div
          className={`mb-5 grid h-20 w-20 place-items-center rounded-2xl border text-4xl font-bold shadow-sm ${
            isDark
              ? 'border-amber-700 bg-stone-900 text-amber-300'
              : 'border-red-200 bg-white text-red-700'
          }`}
        >
          {isDark ? '月' : '日'}
        </div>
        <div className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
          isDark ? 'border-stone-700 text-amber-300' : 'border-stone-300 text-red-700'
        }`}>
          {isDark ? <Moon size={14} /> : <Sun size={14} />}
          {isDark ? 'Dark mode' : 'Light mode'}
        </div>
        <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">Kanji Match Dojo</h2>
        <div className={`mt-6 h-1.5 w-44 overflow-hidden rounded-full ${isDark ? 'bg-stone-800' : 'bg-stone-200'}`}>
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            className={`h-full w-1/2 rounded-full ${isDark ? 'bg-amber-400' : 'bg-red-700'}`}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
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
      {items
        .filter((item) => !matchedIds.has(item.id))
        .map((item) => (
          <Fragment key={`kanji-${item.id}`}>
            <MatchButton
              isDark={isDark}
              isError={isError}
              onClick={() => onSelect(item.id)}
              selected={selectedId === item.id}
            >
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
      {items
        .filter((item) => !matchedIds.has(item.id))
        .map((item) => (
          <Fragment key={`meaning-${item.id}`}>
            <MatchButton
              isDark={isDark}
              isError={isError}
              onClick={() => onSelect(item.id)}
              selected={selectedId === item.id}
            >
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
    <div className={`sticky top-0 z-10 rounded-md border px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.18em] backdrop-blur ${
      isDark ? 'border-stone-700 bg-stone-900/95 text-stone-400' : 'border-stone-200 bg-white/95 text-stone-500'
    }`}>
      {label}
    </div>
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
      animate={
        selected && isError
          ? {
              backgroundColor: '#fef2f2',
              borderColor: '#dc2626',
              color: '#991b1b',
              opacity: 1,
              x: [-5, 5, -5, 5, 0],
            }
          : selected
            ? {
                backgroundColor: isDark ? '#451a03' : '#fff7ed',
                borderColor: isDark ? '#f59e0b' : '#c2410c',
                color: isDark ? '#fef3c7' : '#9a3412',
                opacity: 1,
                scale: 1.02,
              }
            : {
                backgroundColor: isDark ? '#1c1917' : '#ffffff',
                borderColor: isDark ? '#44403c' : '#e7e5e4',
                color: isDark ? '#f5f5f4' : '#1c1917',
                opacity: 1,
                scale: 1,
              }
      }
      aria-pressed={selected}
      className={`relative flex min-h-20 w-full items-center justify-center rounded-lg border-2 px-3 text-center shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-default sm:min-h-24 ${
        isDark ? 'focus:ring-amber-500 focus:ring-offset-stone-900' : 'focus:ring-red-700 focus:ring-offset-2'
      }`}
      onClick={onClick}
      transition={{ duration: 0.18 }}
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
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
    <div className={`rounded-lg border px-3 py-2 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900' : 'border-stone-300 bg-white'}`}>
      <div className={`flex items-center gap-2 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
        {icon}
        <span className="text-xs font-bold uppercase tracking-[0.12em]">{label}</span>
      </div>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>{value}</p>
    </div>
  );
}
