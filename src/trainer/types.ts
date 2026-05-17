export interface Pair {
  id: string;
  term: string; // Column A
  definition: string; // Column B
}

export interface GameState {
  pairs: Pair[];
  status: 'setup' | 'training' | 'playing' | 'results';
  shuffledTerms: Pair[]; // Order of Column A (usually 1-N)
  shuffledDefinitions: Pair[]; // Order of Column B (usually A-Z, randomized)
  userMatches: Record<string, string>; // termId -> definitionId
}
