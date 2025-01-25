import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Scores } from '../types/scoreTypes';
import { _fetchScores, _getMockedScores, _saveScores } from './scoreServices';

describe('Score Utilities', () => {
  const LOCAL_STORAGE_KEY = 'gameScores';

  beforeEach(() => {
    globalThis.localStorage = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      getItem: vi.fn(() => {}),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setItem: vi.fn(() => {}),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeItem: vi.fn(() => {}),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      clear: vi.fn(() => {}),
    } as unknown as Storage;
  });

  describe('Tests of _getMockedScores', () => {
    it('should return a predefined list of mocked scores', () => {
      const expectedScores = [
        { playerName: 'Alice', scoreValue: 10, id: 'mock01' },
        { playerName: 'Bob', scoreValue: 5, id: 'mock02' },
        { playerName: 'Charlie', scoreValue: 8, id: 'mock03' },
        { playerName: 'Jane', scoreValue: 5, id: 'mock04' },
        { playerName: 'John', scoreValue: 14, id: 'mock05' },
      ];

      const actualScores = _getMockedScores();

      expect(actualScores).toEqual(expectedScores);
    });
  });

  describe('Tests of _fetchScores', () => {
    it('should return an error if localStorage is empty', () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      vi.mocked(localStorage.getItem).mockReturnValue(null);

      const result = _fetchScores();

      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('Score not retrieved');
    });

    it('should return an error if the data in localStorage is invalid JSON', () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      vi.mocked(localStorage.getItem).mockReturnValue('invalid-json');

      const result = _fetchScores();

      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe(
        'Failed to parse scores from localStorage.',
      );
    });

    it('should return parsed scores if the data in localStorage is valid', () => {
      const initialScores: Scores = [
        { playerName: 'Test', scoreValue: 20, id: 'test01' },
      ];
      // eslint-disable-next-line @typescript-eslint/unbound-method
      vi.mocked(localStorage.getItem).mockReturnValue(
        JSON.stringify(initialScores),
      );

      const result = _fetchScores();

      expect(result).toEqual(initialScores);
    });
  });

  describe('Tests of _saveScores', () => {
    it('should save the provided scores to localStorage', () => {
      const newScores: Scores = [
        { playerName: 'Test', scoreValue: 20, id: 'test01' },
      ];

      const result = _saveScores(newScores);

      expect(result).toEqual(newScores);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(localStorage.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY,
        JSON.stringify(newScores),
      );
    });

    it('should return an error if saving to localStorage fails', () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      vi.mocked(localStorage.setItem).mockImplementation(() => {
        throw new Error('Mocked error');
      });

      const newScores: Scores = [
        { playerName: 'Test', scoreValue: 20, id: 'test01' },
      ];

      const result = _saveScores(newScores);

      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe(
        'Failed to save scores to localStorage.',
      );
    });
  });
});
