import { useEffect, useState } from 'react';
import { MolesData } from '../types/moleTypes';
import { getRandomInteger } from '../utils/mathUtils';
import { generateMolesData } from '../utils/molesUtils';

/**
 * A custom hook that provides mole hole data, updated at random intervals.
 *
 * @returns An array representing the current mole holes data. Each object includes the hole ID and visibility status.
 */
export function useMolesDataAtRandomInterval(): MolesData {
  const allMolesCount = 12;

  const [molesData, setMolesGridData] = useState<MolesData>(() => {
    const activeMoleIndex = getRandomInteger(0, allMolesCount - 1);
    return generateMolesData(allMolesCount, activeMoleIndex);
  });

  useEffect(() => {
    const delayInMillisecondBeforeGeneration = getRandomInteger(500, 2500);

    const timeoutId = setTimeout(() => {
      const activeMoleIndex = getRandomInteger(0, allMolesCount - 1);
      const newMolesData = generateMolesData(allMolesCount, activeMoleIndex);
      setMolesGridData(newMolesData);
    }, delayInMillisecondBeforeGeneration);

    return (): void => {
      clearTimeout(timeoutId);
    };
  }, [molesData]);

  return molesData;
}
