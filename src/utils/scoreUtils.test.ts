import { describe, expect, it } from 'vitest';
import {
  CurrentScore,
  Score,
  ScoresWithCurrentInfo,
} from '../types/scoreTypes';
import {
  isCurrentScore,
  isValidScore,
  isValidScoreList,
  removeCurrentScoreInformation,
  sortScores,
} from './scoreUtils';

describe('Tests of isCurrentScore', () => {
  it('should return true when the object has the "isCurrent" property', () => {
    const initialScore: CurrentScore = {
      id: '1',
      playerName: 'John',
      scoreValue: 100,
      isCurrent: true,
    };
    expect(isCurrentScore(initialScore)).toBe(true);
  });

  it('should return false when the object lacks the "isCurrent" property', () => {
    const initialScore: Score = {
      id: '1',
      playerName: 'John',
      scoreValue: 100,
    };
    expect(isCurrentScore(initialScore)).toBe(false);
  });
});

describe('Tests if isValidScore', () => {
  it('should return true for a valid Score object', () => {
    const initialScore: Score = {
      id: '1',
      playerName: 'Alice',
      scoreValue: 200,
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

describe('Tests of isValidScoreList', () => {
  it('should return true for a valid list of Score objects', () => {
    const initialScores = [
      { id: '1', playerName: 'Alice', scoreValue: 100 },
      { id: '2', playerName: 'Bob', scoreValue: 200 },
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

describe('Tests of removeCurrentScoreInformation', () => {
  it('should remove the "isCurrent" property from scores', () => {
    const initialScores: ScoresWithCurrentInfo = [
      { id: '1', playerName: 'Alice', scoreValue: 100, isCurrent: true },
      { id: '2', playerName: 'Bob', scoreValue: 200 },
    ];
    const expectedScores = [
      { id: '1', playerName: 'Alice', scoreValue: 100 },
      { id: '2', playerName: 'Bob', scoreValue: 200 },
    ];
    const actualScores = removeCurrentScoreInformation(initialScores);
    expect(actualScores).toEqual(expectedScores);
  });
});

describe('Tests of sortScores', () => {
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
