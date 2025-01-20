import { CurrentScore, Score } from './types';

export function isCurrentScore(
  score: Score | CurrentScore,
): score is CurrentScore {
  if ('isCurrent' in score) {
    return true;
  }
  return false;
}
