import { MolesData } from '../types/moleTypes';

/**
 * Creates data for all mole holes, marking one hole as containing a visible mole.
 *
 * @param allMolesCount The total number of moles.
 * @param activeMoleIndex The index of the hole containing the visible mole.
 * @returns An array of objects representing the mole holes. Each object includes the hole ID and visibility status.
 */
export function generateMolesData(
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
