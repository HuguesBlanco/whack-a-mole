import { describe, expect, it, vi } from 'vitest';
import {
  _COLUMN_IDS,
  _generateMolesGridData,
  _getMoleUpCoordinates,
  _getRandomDelay,
  _ROW_IDS,
} from './useMolesDataAtRandomInterval';

describe('Tests of _getMoleUpCoordinates function', () => {
  it('should return valid coordinates within the range of _ROW_IDS and _COLUMN_IDS', () => {
    const actualCoordinates = _getMoleUpCoordinates();

    expect(_ROW_IDS).toContain(actualCoordinates.rowId);
    expect(_COLUMN_IDS).toContain(actualCoordinates.columnId);
  });
});

describe('Tests of _generateMolesGridData function', () => {
  it('should generate grid data with correct IDs and mole visibility', () => {
    const moleUpCoordinates = { rowId: 2, columnId: 'B' };
    const actualGridData = _generateMolesGridData(moleUpCoordinates);

    expect(actualGridData.length).toBe(_ROW_IDS.length);

    const flattenedGrid = actualGridData.flat();
    expect(flattenedGrid.length).toBe(_ROW_IDS.length * _COLUMN_IDS.length);

    flattenedGrid.forEach((moleData) => {
      expect(typeof moleData.id).toBe('string');
      expect(typeof moleData.isUp).toBe('boolean');
    });
  });

  it('should generate all grid IDs regardless of the mole coordinates', () => {
    const actualGridData = _generateMolesGridData({
      rowId: 999,
      columnId: 'Z',
    });

    const flattenedGrid = actualGridData.flat();

    flattenedGrid.forEach(({ id }) => {
      const [columnId, rowId] = [id[0], Number(id.slice(1))];
      expect(_COLUMN_IDS).toContain(columnId);
      expect(_ROW_IDS).toContain(rowId);
    });
  });

  it('should define as up the mole with the passed coordinates', () => {
    const moleUpCoordinates = { rowId: 2, columnId: 'B' };
    const actualGridData = _generateMolesGridData(moleUpCoordinates);

    const expectedMoleUpData = actualGridData
      .flat()
      .find((moleData) => moleData.id === 'B2');

    expect(expectedMoleUpData?.isUp).toBe(true);
  });
});

describe('Tests of _getRandomDelay function', () => {
  it('should return a number between 500 and 2500 milliseconds', () => {
    const actualDelay = _getRandomDelay();

    expect(actualDelay).toBeGreaterThanOrEqual(500);
    expect(actualDelay).toBeLessThanOrEqual(2500);
  });

  it('should produce a uniform random value within the defined range', () => {
    const mockMathRandom = vi.spyOn<typeof Math, 'random'>(Math, 'random');

    // Mock random values and verify results
    mockMathRandom.mockReturnValue(0);
    expect(_getRandomDelay()).toBe(500);

    mockMathRandom.mockReturnValue(1);
    expect(_getRandomDelay()).toBe(2500);

    mockMathRandom.mockReturnValue(0.2);
    expect(_getRandomDelay()).toBe(900);

    mockMathRandom.mockRestore();
  });
});
