import { Score, Scores } from '../types/scoreTypes';

/**
 * Tells if a value is a valid score.
 * @param value The value to check.
 * @returns True if the value is a valid Score, false otherwise.
 */
export function isValidScore(value: unknown): value is Score {
  if (typeof value !== 'object' || value === null) return false;

  if (!('id' in value) || typeof value.id !== 'string' || value.id === '')
    return false;

  if (!('playerName' in value) || typeof value.playerName !== 'string')
    return false;

  if (!('scoreValue' in value) || typeof value.scoreValue !== 'number')
    return false;

  return true;
}

/**
 * Checks if the given value is a valid list of scores.
 * @param value The value to validate as a list of scores.
 * @returns True if the value is a valid list of scores, false otherwise.
 */
export function isValidScoreList(value: unknown): value is Scores {
  return Array.isArray(value) && value.every(isValidScore);
}

/**
 * Removes the information indicating which score is the one of the current game from the scores list.
 * @param scores The list of scores with one score being marked as the current game score.
 * @returns The list of scores without the information of which one is the current game score.
 */
export function removeCurrentGameScoreInformation(scores: Scores): Scores {
  return scores.map((score) => ({
    id: score.id,
    playerName: score.playerName,
    scoreValue: score.scoreValue,
  }));
}

/**
 * Sorts a list of scores in descending order by score.
 * If scores are tied, sorts alphabetically by player name.
 * @param scores The list of scores to sort.
 * @returns The sorted list of scores.
 */
export function sortScores(scores: Scores): Scores {
  return [...scores].sort((a, b) => {
    if (b.scoreValue !== a.scoreValue) {
      return b.scoreValue - a.scoreValue;
    }
    return a.playerName.localeCompare(b.playerName);
  });
}

/**
 * Returns the ordinal suffix for a given number (e.g., 'st' for 1, 'nd' for 2).
 * @param number The number to determine the ordinal suffix for.
 * @returns The corresponding ordinal suffix ('st', 'nd', 'rd', or 'th'), or an empty string for non-positive numbers.
 */
export function getOrdinalSuffix(number: number): string {
  if (number <= 0) return '';

  const lastTwoDigits = number % 100;
  const lastDigit = number % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th';
  }

  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
