import rawExpressions from './dailyExpressions.json';
import { type Pair } from './types';

interface DailyExpression {
  english: string;
  japanese: string;
}

export const DAILY_EXPRESSION_PAIRS: Pair[] = (rawExpressions as DailyExpression[]).map(
  (expression, index) => ({
    id: `daily-expression-${index + 1}`,
    term: expression.english,
    definition: expression.japanese,
  }),
);

export const DAILY_EXPRESSION_COUNT = DAILY_EXPRESSION_PAIRS.length;
