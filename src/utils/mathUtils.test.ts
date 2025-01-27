import { describe, expect, it } from 'vitest';
import { getRandomInteger } from './mathUtils';

describe('Math utilitary functions', () => {
  describe('getRandomInteger', () => {
    it('should return a number between 0 and 1000 by default', () => {
      const actualDelay = getRandomInteger();

      expect(actualDelay).toBeGreaterThanOrEqual(0);
      expect(actualDelay).toBeLessThanOrEqual(1000);
    });

    it('should produce a uniform random value within the defined range', () => {
      const actualFirstGeneratedInteger = getRandomInteger(500, 2500, () => 0);
      const expectedFirstGeneratedInteger = 500;
      expect(actualFirstGeneratedInteger).toBe(expectedFirstGeneratedInteger);

      const actualSecondGeneratedInteger = getRandomInteger(
        500,
        2500,
        () => 0.9999999999, // Not 1 because the randomNumberGenerator callback must generate a number in between 0 inclusive and 1 EXCLUSIVE.
      );
      const expectedSecondGeneratedInteger = 2500;
      expect(actualSecondGeneratedInteger).toBe(expectedSecondGeneratedInteger);

      const actualThirdGeneratedInteger = getRandomInteger(
        500,
        2500,
        () => 0.2,
      );
      const expectedThirdGeneratedInteger = 900;
      expect(actualThirdGeneratedInteger).toBe(expectedThirdGeneratedInteger);
    });
  });
});
