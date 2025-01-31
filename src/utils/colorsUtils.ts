export function hexToRgba(hexColor: string, opacity = 1): string {
  const errorFallback = 'rgba(0, 0, 0, 1)';

  const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
  const isValidColor = hexColorRegex.test(hexColor);
  if (!isValidColor) return errorFallback;

  if (opacity > 1 || opacity < 0) return errorFallback;

  const rgbNumbers = hexColor
    .slice(1)
    .match(/.{2}/g)
    ?.map((hexPair) => parseInt(hexPair, 16));

  if (!rgbNumbers || rgbNumbers.length !== 3) return errorFallback;

  const [r, g, b] = rgbNumbers;

  return `rgba(${String(r)}, ${String(g)}, ${String(b)}, ${String(opacity)})`;
}
