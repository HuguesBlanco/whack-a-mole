import { Score, Scores, ScoresWithCurrentInfo } from '../types';

/**
 * Key used for storing scores in localStorage.
 */
const LOCAL_STORAGE_KEY = 'gameScores';

/**
 * Validates if a value conforms to the Score type.
 * @param value The value to check.
 * @returns True if the value is a valid Score, false otherwise.
 */
function _isValidScore(value: unknown): value is Score {
  if (typeof value !== 'object' || value === null) return false;

  if (!('id' in value) || typeof value.id !== 'string' || value.id === '')
    return false;

  if (!('playerName' in value) || typeof value.playerName !== 'string')
    return false;

  if (!('score' in value) || typeof value.score !== 'number') return false;

  return true;
}

/**
 * Checks if the given value is a valid list of scores.
 * @param value The value to validate as a list of scores.
 * @returns True if the value is a valid list of scores, false otherwise.
 */
function _isValidScoreList(value: unknown): boolean {
  return Array.isArray(value) && value.every(_isValidScore);
}

/**
 * Provides a mocked set of scores for initial data.
 * @returns A predefined list of scores.
 */
export function _getMockedScores(): Scores {
  return [
    { playerName: 'Alice', scoreValue: 10, id: 'mock01' },
    { playerName: 'Bob', scoreValue: 5, id: 'mock02' },
    { playerName: 'Charlie', scoreValue: 8, id: 'mock03' },
    { playerName: 'Jane', scoreValue: 5, id: 'mock04' },
    { playerName: 'John', scoreValue: 14, id: 'mock05' },
  ];
}

/**
 * Removes the current score information from the scores list.
 * @param scores The list of scores with current score information.
 * @returns The list of scores without current score information.
 */
function _removeCurrentScoreInformation(scores: ScoresWithCurrentInfo): Scores {
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
export function _sortScores(scores: Scores): Scores {
  return [...scores].sort((a, b) => {
    if (b.scoreValue !== a.scoreValue) {
      return b.scoreValue - a.scoreValue;
    }
    return a.playerName.localeCompare(b.playerName);
  });
}

/**
 * Retrieves the score list.
 * @returns The fetched scores or an error if parsing the stored data fails.
 */
export function _fetchScores(): Scores | Error {
  const savedScores = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedScores === null) {
    return Error('Score not retrieved');
  }

  try {
    const parsedScores = JSON.parse(savedScores) as unknown;

    return parsedScores as Scores;
  } catch {
    return new Error('Failed to parse scores from localStorage.');
  }
}

/**
 * Saves a new score list.
 * @param newScores The new score list to save.
 * @returns The updated scores or an error if saving failed.
 */
export function _saveScores(newScores: Scores): Scores | Error {
  try {
    const serializedScores = JSON.stringify(newScores);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedScores);
    return newScores;
  } catch {
    return new Error('Failed to save scores to localStorage.');
  }
}

export function getScores(): Scores {
  const fetchedScores = _fetchScores();

  if (fetchedScores instanceof Error || !_isValidScoreList(fetchedScores)) {
    const mockedScores = _getMockedScores();
    _saveScores(mockedScores);
    return _sortScores(mockedScores);
  }

  return _sortScores(fetchedScores);
}

/**
 * Updates the stored scores.
 * @param newScores The new list of scores.
 * @returns The updated scores list or an error if the update fails.
 */
export function updateScores(
  newScores: Scores | ScoresWithCurrentInfo,
): Scores | Error {
  if (!_isValidScoreList(newScores)) {
    return new Error('Invalid scores provided.');
  }

  const cleanedScores = _removeCurrentScoreInformation(newScores);
  const sortedScores = _sortScores(cleanedScores);
  const saveResult = _saveScores(sortedScores);

  if (saveResult instanceof Error) {
    return new Error('Failed to save the scores.');
  }

  return sortedScores;
}
