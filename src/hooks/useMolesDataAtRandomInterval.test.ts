import { describe, expect, it, vi } from 'vitest';
import {
  _generateMolesData,
  _getActiveMoleIndex,
  _getRandomDelayInMilliseconds,
} from './useMolesDataAtRandomInterval';

describe('Tests of _getActiveMoleIndex function', () => {
  it('should return a random integer between 0 and 11 if the number of mole is 12', () => {
    const totalNumberOfMoles = 12;
    const actualIndex = _getActiveMoleIndex(totalNumberOfMoles);

    const isInteger = Number.isInteger(actualIndex);
    expect(isInteger).toBe(true);

    expect(actualIndex).toBeGreaterThanOrEqual(0);
    expect(actualIndex).toBeLessThanOrEqual(11);
  });
});

describe('Tests of _generateMolesData function', () => {
  it('should generate data with correct IDs and mole visibility types', () => {
    const totalNumberOfMoles = 5;
    const moleUpIndex = 2;
    const actualMolesData = _generateMolesData(totalNumberOfMoles, moleUpIndex);

    expect(actualMolesData.length).toBe(totalNumberOfMoles);

    actualMolesData.forEach((moleData) => {
      expect(typeof moleData.id).toBe('string');
      expect(typeof moleData.isUp).toBe('boolean');
    });

    const molesUp = actualMolesData.filter((moleDatum) => moleDatum.isUp);
    expect(molesUp.length).toBe(1);
  });

  it('should generate data with only one mole up', () => {
    const totalNumberOfMoles = 34;
    const moleUpIndex = 23;
    const actualMolesData = _generateMolesData(totalNumberOfMoles, moleUpIndex);

    const molesUp = actualMolesData.filter((moleDatum) => moleDatum.isUp);
    expect(molesUp.length).toBe(1);
  });

  it('should define the passed index as mole up', () => {
    const totalNumberOfMoles = 34;
    const moleUpIndex = 9;
    const actualMolesData = _generateMolesData(totalNumberOfMoles, moleUpIndex);

    const expectedMoleUpDatum = actualMolesData.find(
      (moleDatum) => moleDatum.isUp,
    );

    expect(expectedMoleUpDatum?.id).toBe(String(moleUpIndex));
  });
});

describe('Tests of _getRandomDelay function', () => {
  it('should return a number between 500 and 2500 milliseconds', () => {
    const actualDelay = _getRandomDelayInMilliseconds();

    expect(actualDelay).toBeGreaterThanOrEqual(500);
    expect(actualDelay).toBeLessThanOrEqual(2500);
  });

  it('should produce a uniform random value within the defined range', () => {
    const mockMathRandom = vi.spyOn<typeof Math, 'random'>(Math, 'random');

    mockMathRandom.mockReturnValue(0);
    expect(_getRandomDelayInMilliseconds()).toBe(500);

    mockMathRandom.mockReturnValue(1);
    expect(_getRandomDelayInMilliseconds()).toBe(2500);

    mockMathRandom.mockReturnValue(0.2);
    expect(_getRandomDelayInMilliseconds()).toBe(900);

    mockMathRandom.mockRestore();
  });
});
