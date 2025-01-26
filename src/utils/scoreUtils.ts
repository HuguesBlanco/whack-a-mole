import {
  CurrentGameScore,
  Score,
  Scores,
  ScoresWithCurrentGameOne,
} from '../types/scoreTypes';

/**
 * Determines whether the provided value is a CurrentScore object.
 * @param score The object to test.
 * @returns true if the object of type CurrentScore, otherwise false.
 */

export function isCurrentScore(
  score: Score | CurrentGameScore,
): score is CurrentGameScore {
  if ('isCurrent' in score) {
    return true;
  }
  return false;
}

/**
 * Validates if a value conforms to the Score type.
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
export function isValidScoreList(value: unknown): boolean {
  return Array.isArray(value) && value.every(isValidScore);
}

/**
 * Removes the current score information from the scores list.
 * @param scores The list of scores with current score information.
 * @returns The list of scores without current score information.
 */
export function removeCurrentScoreInformation(
  scores: ScoresWithCurrentGameOne,
): Scores {
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
