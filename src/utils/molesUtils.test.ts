import { describe, expect, it } from 'vitest';
import { generateMolesData } from './molesUtils';

describe('Moles utilitary functions', () => {
  describe('generateMolesData', () => {
    it('should generate data with correct IDs and mole visibility types', () => {
      const totalNumberOfMoles = 5;
      const moleUpIndex = 2;
      const actualMolesData = generateMolesData(
        totalNumberOfMoles,
        moleUpIndex,
      );

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
      const actualMolesData = generateMolesData(
        totalNumberOfMoles,
        moleUpIndex,
      );

      const molesUp = actualMolesData.filter((moleDatum) => moleDatum.isUp);
      expect(molesUp.length).toBe(1);
    });

    it('should define the passed index as mole up', () => {
      const totalNumberOfMoles = 34;
      const moleUpIndex = 9;
      const actualMolesData = generateMolesData(
        totalNumberOfMoles,
        moleUpIndex,
      );

      const expectedMoleUpDatum = actualMolesData.find(
        (moleDatum) => moleDatum.isUp,
      );

      expect(expectedMoleUpDatum?.id).toBe(String(moleUpIndex));
    });
  });
});
