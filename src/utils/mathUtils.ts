/**
 * Returns a random integer between the specified minimal and maximal values.\
 * Allows dependency injection of a random number generator for testability.
 *
 * @param minimalValue The lower bound of the range (inclusive). Default value is 0.
 * @param maximalValue The upper bound of the range (inclusive). Default value is 1000.
 * @param randomNumberGenerator A random number generator function returning a value in between 0 (inclusive) and 1 (exclusive). Default is Math.random.
 * @returns A random integer within the specified range.
 */
export function getRandomInteger(
  minimalValue = 0,
  maximalValue = 1000,
  randomNumberGenerator: () => number = Math.random,
): number {
  // Explaination on that function here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive

  const minimalCeiled = Math.ceil(minimalValue);
  const maximalFloored = Math.floor(maximalValue);
  return Math.floor(
    randomNumberGenerator() * (maximalFloored - minimalCeiled + 1) +
      minimalCeiled,
  );
}
