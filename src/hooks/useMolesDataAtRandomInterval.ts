import { useEffect, useState } from 'react';
import { MolesData } from '../types/moleTypes';

/**
 * Returns the index of a random mole that is visible.
 *
 * @param allMolesCount The total number of moles.
 * @returns The index of the visible mole.
 */
export function _getActiveMoleIndex(allMolesCount: number): number {
  const maxIndex = allMolesCount - 1;

  return Math.floor(Math.random() * maxIndex);
}

/**
 * Creates data for all mole holes, marking one hole as containing a visible mole.
 *
 * @param allMolesCount The total number of moles.
 * @param activeMoleIndex The index of the hole containing the visible mole.
 * @returns An array of objects representing the mole holes. Each object includes the hole ID and visibility status.
 */
export function _generateMolesData(
  allMolesCount: number,
  activeMoleIndex: number,
): MolesData {
  const moleIndexes = Array.from(
    { length: allMolesCount },
    (_, index) => index,
  );

  return moleIndexes.map((moleIndex) => {
    return {
      id: String(moleIndex),
      isUp: moleIndex === activeMoleIndex,
    };
  });
}

/**
 * Generates a random delay time between 500 milliseconds and 2.5 seconds.
 *
 * @returns A random delay in milliseconds.
 */
export function _getRandomDelayInMilliseconds(): number {
  const minimalDelay = 500;
  const maximalDelay = 2500;

  return (
    Math.floor(Math.random() * (maximalDelay - minimalDelay)) + minimalDelay
  );
}

/**
 * A custom hook that provides mole hole data, updated at random intervals.
 *
 * @returns An array representing the current mole holes data. Each object includes the hole ID and visibility status.
 */
export function useMolesDataAtRandomInterval(): MolesData {
  const ALL_MOLES_COUNT = 12;

  const [molesData, setMolesGridData] = useState<MolesData>(() => {
    const activeMoleIndex = _getActiveMoleIndex(ALL_MOLES_COUNT);
    return _generateMolesData(ALL_MOLES_COUNT, activeMoleIndex);
  });

  useEffect(() => {
    const delayBeforeGeneration = _getRandomDelayInMilliseconds();

    const timeoutId = setTimeout(() => {
      const activeMoleIndex = _getActiveMoleIndex(ALL_MOLES_COUNT);
      const newMolesData = _generateMolesData(ALL_MOLES_COUNT, activeMoleIndex);
      setMolesGridData(newMolesData);
    }, delayBeforeGeneration);

    return (): void => {
      clearTimeout(timeoutId);
    };
  }, [molesData]);

  return molesData;
}
