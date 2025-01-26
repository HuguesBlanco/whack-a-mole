import { Scores, ScoresWithCurrentGameOne } from '../types/scoreTypes';
import {
  isValidScoreList,
  removeCurrentScoreInformation,
  sortScores,
} from '../utils/scoreUtils';

/**
 * Key used for storing scores in localStorage.
 */
const LOCAL_STORAGE_KEY = 'gameScores';

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

/**
 * Retrieves the scores saved.
 * @returns The scores saved, or the mock data if there is no stored scores. Scores are sorted.
 */
export function getScores(): Scores {
  const fetchedScores = _fetchScores();

  if (fetchedScores instanceof Error || !isValidScoreList(fetchedScores)) {
    const mockedScores = _getMockedScores();
    _saveScores(mockedScores);
    return sortScores(mockedScores);
  }

  return sortScores(fetchedScores);
}

/**
 * Updates the stored scores.
 * @param newScores The new list of scores.
 * @returns The updated scores list or an error if the update fails.
 */
export function updateScores(
  newScores: Scores | ScoresWithCurrentGameOne,
): Scores | Error {
  if (!isValidScoreList(newScores)) {
    return new Error('Invalid scores provided.');
  }

  const cleanedScores = removeCurrentScoreInformation(newScores);
  const sortedScores = sortScores(cleanedScores);
  const saveResult = _saveScores(sortedScores);

  if (saveResult instanceof Error) {
    return new Error('Failed to save the scores.');
  }

  return sortedScores;
}
