import { Fragment, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Clock3,
  Languages,
  Moon,
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

const KANJI_LIST: KanjiData[] = [
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

const BEST_TIME_KEY = 'kanji-matcher-best-time';
const THEME_KEY = 'kanji-matcher-theme';

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

export default function App() {
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
  const isComplete = matchedIds.size === KANJI_LIST.length;
  const attempts = matchedIds.size + mistakes;
  const accuracy = attempts === 0 ? 100 : Math.round((matchedIds.size / attempts) * 100);
  const remaining = KANJI_LIST.length - matchedIds.size;

  const selectedKanji = useMemo(
    () => KANJI_LIST.find((item) => item.id === selectedKanjiId),
    [selectedKanjiId],
  );

  const initGame = useCallback(() => {
    setShuffledKanji(shuffle(KANJI_LIST));
    setShuffledMeanings(shuffle(KANJI_LIST));
    setSelectedKanjiId(null);
    setSelectedMeaningId(null);
    setMatchedIds(new Set());
    setIsError(false);
    setMistakes(0);
    setElapsedSeconds(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

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
    const storedBestTime = window.localStorage.getItem(BEST_TIME_KEY);
    if (storedBestTime !== null) {
      const parsedBestTime = Number(storedBestTime);
      if (Number.isFinite(parsedBestTime)) {
        setBestTime(parsedBestTime);
      }
    }
  }, []);

  useEffect(() => {
    if (isComplete) {
      return;
    }

    const timerId = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isComplete]);

  useEffect(() => {
    if (!isComplete) {
      return;
    }

    setBestTime((previousBestTime) => {
      if (previousBestTime !== null && previousBestTime <= elapsedSeconds) {
        return previousBestTime;
      }

      window.localStorage.setItem(BEST_TIME_KEY, String(elapsedSeconds));
      return elapsedSeconds;
    });
  }, [elapsedSeconds, isComplete]);

  const finishAttempt = useCallback((kanjiId: number, meaningId: number) => {
    if (kanjiId === meaningId) {
      setMatchedIds((previousIds) => new Set(previousIds).add(kanjiId));
      setSelectedKanjiId(null);
      setSelectedMeaningId(null);
      return;
    }

    setIsError(true);
    setMistakes((currentMistakes) => currentMistakes + 1);
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

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={isDark ? 'min-h-screen bg-[#12110f] text-stone-100' : 'min-h-screen bg-[#f6f4ef] text-stone-900'}>
      {showSplash && <SplashScreen isDark={isDark} />}
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
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
                22 essential characters
              </p>
              <h1 className={`text-3xl font-bold tracking-normal sm:text-4xl ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>
                Kanji Match Dojo
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <button
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className={`inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDark
                  ? 'border-stone-600 bg-stone-900 text-amber-200 hover:bg-stone-800 focus:ring-amber-500 focus:ring-offset-[#12110f]'
                  : 'border-stone-300 bg-white text-stone-900 hover:bg-stone-100 focus:ring-red-700 focus:ring-offset-[#f6f4ef]'
              }`}
              onClick={toggleTheme}
              type="button"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
              {isDark ? 'Light' : 'Dark'}
            </button>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[34rem]">
              <StatCard icon={<Target size={18} />} isDark={isDark} label="Matched" value={`${matchedIds.size}/22`} />
              <StatCard icon={<XCircle size={18} />} isDark={isDark} label="Misses" value={String(mistakes)} />
              <StatCard icon={<Sparkles size={18} />} isDark={isDark} label="Accuracy" value={`${accuracy}%`} />
              <StatCard icon={<Clock3 size={18} />} isDark={isDark} label="Time" value={formatTime(elapsedSeconds)} />
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-[minmax(0,1fr)_17rem]">
          <div className={`rounded-lg border p-4 shadow-sm ${isDark ? 'border-stone-700 bg-stone-900/90' : 'border-stone-300 bg-white/80'}`}>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-stone-50' : 'text-stone-950'}`}>Match each character to its meaning</h2>
                <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  {remaining === 0 ? 'Board complete.' : `${remaining} remaining`}
                </p>
              </div>
              <button
                onClick={initGame}
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
                isError={isError}
                items={shuffledKanji}
                isDark={isDark}
                matchedIds={matchedIds}
                onSelect={handleKanjiClick}
                selectedId={selectedKanjiId}
              />
              <MeaningColumn
                isError={isError}
                items={shuffledMeanings}
                isDark={isDark}
                matchedIds={matchedIds}
                onSelect={handleMeaningClick}
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
              onClick={initGame}
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
      </main>
    </div>
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
  isError: boolean;
  isDark: boolean;
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
