import { describe, expect, it } from 'vitest';
import { hexToRgba } from './colorsUtils';

describe('hexToRgba', () => {
  it('should convert a valid hex color to an rgba string with full opacity (default)', () => {
    expect(hexToRgba('#FF5733')).toBe('rgba(255, 87, 51, 1)');
  });

  it('should convert a valid hex color to an rgba string with custom opacity', () => {
    expect(hexToRgba('#00FF00', 0.5)).toBe('rgba(0, 255, 0, 0.5)');
  });

  it('should return fallback color when input is not a valid hex string', () => {
    expect(hexToRgba('invalidHex')).toBe('rgba(0, 0, 0, 1)');
    expect(hexToRgba('#GGGGGG')).toBe('rgba(0, 0, 0, 1)');
  });

  it('should return fallback color when hex string length is incorrect', () => {
    expect(hexToRgba('#FFF')).toBe('rgba(0, 0, 0, 1)');
    expect(hexToRgba('#1234567')).toBe('rgba(0, 0, 0, 1)');
  });

  it('should return fallback color when opacity is greater than 1', () => {
    expect(hexToRgba('#654321', 1.5)).toBe('rgba(0, 0, 0, 1)');
  });

  it('should allow an opacity of 0 (fully transparent)', () => {
    expect(hexToRgba('#123456', 0)).toBe('rgba(18, 52, 86, 0)');
  });

  it('should handle opacity slightly below 1 correctly', () => {
    expect(hexToRgba('#112233', 0.99)).toBe('rgba(17, 34, 51, 0.99)');
  });

  it('should handle a valid hex string with lowercase characters', () => {
    expect(hexToRgba('#abcdef')).toBe('rgba(171, 205, 239, 1)');
  });

  it('should return fallback color when opacity is lower than 0', () => {
    expect(hexToRgba('#123456', -0.5)).toBe('rgba(0, 0, 0, 1)');
  });
});
