import { Scores } from '../types/scoreTypes';
import {
  isValidScoreList,
  removeCurrentGameScoreInformation,
  sortScores,
} from '../utils/scoreUtils';

/**
 * Key used for storing scores in localStorage.
 */
const LOCAL_STORAGE_KEY = 'gameScores';

/** A mocked set of scores for initial data. */
const MOCKED_SCORE: Scores = [
  { playerName: 'Alice', scoreValue: 10, id: 'mock01' },
  { playerName: 'Bob', scoreValue: 5, id: 'mock02' },
  { playerName: 'Charlie', scoreValue: 8, id: 'mock03' },
  { playerName: 'Jane', scoreValue: 5, id: 'mock04' },
  { playerName: 'John', scoreValue: 14, id: 'mock05' },
] as const;

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
    _saveScores(MOCKED_SCORE);
    return sortScores(MOCKED_SCORE);
  }

  return sortScores(fetchedScores);
}

/**
 * Updates the stored scores.
 * @param newScores The new list of scores.
 * @returns The updated scores list or an error if the update fails.
 */
export function updateScores(newScores: Scores): Scores | Error {
  if (!isValidScoreList(newScores)) {
    return new Error('Invalid scores provided.');
  }

  const cleanedScores = removeCurrentGameScoreInformation(newScores);
  const sortedScores = sortScores(cleanedScores);
  const saveResult = _saveScores(sortedScores);

  if (saveResult instanceof Error) {
    return new Error('Failed to save the scores.');
  }

  return sortedScores;
}
