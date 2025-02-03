import { Scores } from '../types/scoreTypes';

/**
 * Key used for storing scores in localStorage.
 */
export const LOCAL_STORAGE_SCORE_KEY = 'gameScores';

/**
 * Provides a default list of scores.
 * @returns The default score list.
 */
export function getDefaultScores(): Scores {
  return [
    { playerName: 'Alice', scoreValue: 10, id: 'mock01' },
    { playerName: 'Bob', scoreValue: 5, id: 'mock02' },
    { playerName: 'Charlie', scoreValue: 8, id: 'mock03' },
    { playerName: 'Jane', scoreValue: 5, id: 'mock04' },
    { playerName: 'John', scoreValue: 14, id: 'mock05' },
    { playerName: 'Lisa', scoreValue: 10, id: 'mock06' },
    { playerName: 'Tom', scoreValue: 5, id: 'mock07' },
    { playerName: 'Sam', scoreValue: 8, id: 'mock08' },
    { playerName: 'Bridget', scoreValue: 5, id: 'mock09' },
    { playerName: 'Lucy', scoreValue: 14, id: 'mock10' },
  ];
}

/**
 * Retrieves the score list from localStorage.
 * @param storageKey The key used to retrieve the scores from localStorage.
 * @returns The fetched scores or an error if parsing the stored data fails.
 */
export function getScores(storageKey: string): Scores | Error {
  const savedScores = localStorage.getItem(storageKey);

  if (savedScores === null) {
    return Error('Scores not retrieved');
  }

  try {
    const parsedScores = JSON.parse(savedScores) as unknown;
    return parsedScores as Scores;
  } catch {
    return new Error('Failed to parse scores from localStorage.');
  }
}

/**
 * Saves a new score list on localStorage.
 * @param storageKey The key used to save the scores from localStorage.
 * @param newScores The new score list to save.
 * @returns The updated scores or an error if saving failed.
 */
export function saveScores(
  storageKey: string,
  newScores: Scores,
): Scores | Error {
  try {
    const serializedScores = JSON.stringify(newScores);
    localStorage.setItem(storageKey, serializedScores);
    return newScores;
  } catch {
    return new Error('Failed to save scores to localStorage.');
  }
}
