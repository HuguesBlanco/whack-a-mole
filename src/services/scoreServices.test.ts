import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Scores } from '../types/scoreTypes';
import {
  getDefaultScores,
  getScores,
  LOCAL_STORAGE_SCORE_KEY,
  saveScores,
} from './scoreServices';

describe('Scores services', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
  });

  describe('getDefaultScores', () => {
    it('should return the default list of scores', () => {
      const expectedScores: Scores = [
        { playerName: 'Alice', scoreValue: 10, id: 'mock01' },
        { playerName: 'Bob', scoreValue: 5, id: 'mock02' },
        { playerName: 'Charlie', scoreValue: 8, id: 'mock03' },
        { playerName: 'Jane', scoreValue: 5, id: 'mock04' },
        { playerName: 'John', scoreValue: 14, id: 'mock05' },
      ];

      const actualScores = getDefaultScores();

      expect(actualScores).toEqual(expectedScores);
    });
  });

  describe('getScores', () => {
    it('should retrieve scores from localStorage when valid data exists', () => {
      const mockScores: Scores = [
        { playerName: 'Alice', scoreValue: 10, id: 'mock01' },
      ];
      localStorage.getItem = vi
        .fn()
        .mockReturnValue(JSON.stringify(mockScores));

      const actualScores = getScores(LOCAL_STORAGE_SCORE_KEY);

      expect(actualScores).toEqual(mockScores);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(localStorage.getItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_SCORE_KEY,
      );
    });

    it('should return an error when no data is found in localStorage', () => {
      localStorage.getItem = vi.fn().mockReturnValue(null);

      const actualResult = getScores(LOCAL_STORAGE_SCORE_KEY);

      expect(actualResult).toBeInstanceOf(Error);
      expect((actualResult as Error).message).toBe('Scores not retrieved');
    });

    it('should return an error when data in localStorage is invalid JSON', () => {
      localStorage.getItem = vi.fn().mockReturnValue('invalid-json');

      const actualResult = getScores(LOCAL_STORAGE_SCORE_KEY);

      expect(actualResult).toBeInstanceOf(Error);
      expect((actualResult as Error).message).toBe(
        'Failed to parse scores from localStorage.',
      );
    });
  });

  describe('saveScores', () => {
    it('should save scores to localStorage and return the new scores', () => {
      const scoresToSave: Scores = [
        { playerName: 'Jane', scoreValue: 20, id: 'mock06' },
      ];

      const actualSavedScores = saveScores(
        LOCAL_STORAGE_SCORE_KEY,
        scoresToSave,
      );

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(localStorage.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_SCORE_KEY,
        JSON.stringify(scoresToSave),
      );
      expect(actualSavedScores).toEqual(scoresToSave);
    });

    it('should return an error if saving to localStorage fails', () => {
      localStorage.setItem = vi.fn(() => {
        throw new Error('Storage error');
      });

      const scoresToSave: Scores = [
        { playerName: 'Jane', scoreValue: 20, id: 'mock06' },
      ];

      const actualResult = saveScores(LOCAL_STORAGE_SCORE_KEY, scoresToSave);

      expect(actualResult).toBeInstanceOf(Error);
      expect((actualResult as Error).message).toBe(
        'Failed to save scores to localStorage.',
      );
    });
  });
});
