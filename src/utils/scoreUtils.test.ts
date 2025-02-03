import { describe, expect, it } from 'vitest';
import { Score, Scores } from '../types/scoreTypes';
import {
  getOrdinalSuffix,
  isValidScore,
  isValidScoreList,
  removeCurrentGameScoreInformation,
  sortScores,
} from './scoreUtils';

describe('Score utilitary functions', () => {
  describe('isValidScore', () => {
    it('should return true for a valid score', () => {
      const initialScore: Score = {
        id: '1',
        playerName: 'Alice',
        scoreValue: 200,
      };
      expect(isValidScore(initialScore)).toBe(true);
    });

    it('should return true for a valid current game score', () => {
      const initialScore: Score = {
        id: '2',
        playerName: 'Bob',
        scoreValue: 145,
        isCurrentGameScore: true,
      };
      expect(isValidScore(initialScore)).toBe(true);
    });

    it('should return false for an object missing required properties', () => {
      const initialScore = {
        id: '1',
        playerName: 'Alice',
      };
      expect(isValidScore(initialScore)).toBe(false);
    });

    it('should return false for a non-object value', () => {
      expect(isValidScore(null)).toBe(false);
      expect(isValidScore(123)).toBe(false);
    });
  });

  describe('isValidScoreList', () => {
    it('should return true for a valid list of scores', () => {
      const initialScores: Scores = [
        { id: '1', playerName: 'Alice', scoreValue: 100 },
        { id: '2', playerName: 'Bob', scoreValue: 200 },
      ];
      expect(isValidScoreList(initialScores)).toBe(true);
    });

    it('should return true for a valid list of score with the current game score in it', () => {
      const initialScores: Scores = [
        { id: '1', playerName: 'Alice', scoreValue: 100 },
        { id: '2', playerName: 'Bob', scoreValue: 200 },
        {
          id: '3',
          playerName: 'Jane',
          scoreValue: 329,
          isCurrentGameScore: true,
        },
      ];
      expect(isValidScoreList(initialScores)).toBe(true);
    });

    it('should return false if any element in the list is invalid', () => {
      const initialScores = [
        { id: '1', playerName: 'Alice', scoreValue: 100 },
        { id: '2', playerName: 'Bob' },
      ];
      expect(isValidScoreList(initialScores)).toBe(false);
    });

    it('should return false for a non-array value', () => {
      expect(isValidScoreList(null)).toBe(false);
      expect(isValidScoreList({})).toBe(false);
    });
  });

  describe('removeCurrentGameScoreInformation', () => {
    it('should remove the current game score information from scores', () => {
      const initialScores: Scores = [
        {
          id: '1',
          playerName: 'Alice',
          scoreValue: 100,
          isCurrentGameScore: true,
        },
        { id: '2', playerName: 'Bob', scoreValue: 200 },
      ];
      const expectedScores = [
        { id: '1', playerName: 'Alice', scoreValue: 100 },
        { id: '2', playerName: 'Bob', scoreValue: 200 },
      ];
      const actualScores = removeCurrentGameScoreInformation(initialScores);
      expect(actualScores).toEqual(expectedScores);
    });
  });

  describe('sortScores', () => {
    it('should sort scores in descending order by scoreValue', () => {
      const initialScores = [
        { id: '1', playerName: 'Charlie', scoreValue: 100 },
        { id: '2', playerName: 'Alice', scoreValue: 200 },
      ];
      const expectedScores = [
        { id: '2', playerName: 'Alice', scoreValue: 200 },
        { id: '1', playerName: 'Charlie', scoreValue: 100 },
      ];
      const actualScores = sortScores(initialScores);
      expect(actualScores).toEqual(expectedScores);
    });

    it('should sort alphabetically by playerName if scores are tied', () => {
      const initialScores = [
        { id: '1', playerName: 'Charlie', scoreValue: 100 },
        { id: '2', playerName: 'Alice', scoreValue: 100 },
      ];
      const expectedScores = [
        { id: '2', playerName: 'Alice', scoreValue: 100 },
        { id: '1', playerName: 'Charlie', scoreValue: 100 },
      ];
      const actualScores = sortScores(initialScores);
      expect(actualScores).toEqual(expectedScores);
    });
  });

  describe('getOrdinalSuffix', () => {
    it('should return correct ordinal suffix for general cases', () => {
      const cases: [number, string][] = [
        [1, 'st'],
        [2, 'nd'],
        [3, 'rd'],
        [4, 'th'],
        [11, 'th'],
        [12, 'th'],
        [13, 'th'],
        [21, 'st'],
        [22, 'nd'],
        [23, 'rd'],
        [24, 'th'],
        [100, 'th'],
        [101, 'st'],
        [102, 'nd'],
        [103, 'rd'],
        [111, 'th'],
        [112, 'th'],
        [113, 'th'],
        [200, 'th'],
        [201, 'st'],
        [202, 'nd'],
        [203, 'rd'],
      ];

      cases.forEach(([number, expectedSuffix]) => {
        expect(getOrdinalSuffix(number)).toBe(expectedSuffix);
      });
    });

    it('should return an empty string for non-positive numbers', () => {
      [-1, 0, -10].forEach((num) => {
        expect(getOrdinalSuffix(num)).toBe('');
      });
    });
  });
});
