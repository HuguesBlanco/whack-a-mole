import { useEffect, useState } from 'react';
import { MolesGridData } from '../types';

type MoleCoodinates = { rowId: number; columnId: string };

export const _ROW_IDS = [1, 2, 3];
export const _COLUMN_IDS = ['A', 'B', 'C', 'D'];

/**
 * Generates the coordinates of the visible mole in the grid.
 *
 * @returns An object containing the row and column identifiers for the visible mole.
 */
export function _getMoleUpCoordinates(): MoleCoodinates {
  const selectedRow = Math.floor(Math.random() * _ROW_IDS.length);
  const selectedColumn = Math.floor(Math.random() * _COLUMN_IDS.length);

  return {
    // Default to 1 an "A" but that's just because TypeScript doesn't understand that the retrieved value can only be defined, as the index comes from ROW_IDS.length and COLUMN_IDS.length.
    rowId: _ROW_IDS[selectedRow] ?? 1,
    columnId: _COLUMN_IDS[selectedColumn] ?? 'A',
  };
}

/**
 * Creates data for a grid of mole holes, ensuring one hole contains a visible mole.
 *
 * @returns The grid data with mole hole information, including the ID of the hole and which hole has the mole visible.
 */
export function _generateMolesGridData(
  moleUpCoordinates: MoleCoodinates,
): MolesGridData {
  return _ROW_IDS.map((rowId) =>
    _COLUMN_IDS.map((columnId) => {
      const id = columnId + String(rowId);

      const isMoleUp =
        rowId === moleUpCoordinates.rowId &&
        columnId === moleUpCoordinates.columnId;

      return {
        id,
        isUp: isMoleUp,
      };
    }),
  );
}

/**
 * Generates a random delay time between 500 milliseconds and 2.5 seconds.
 */
export function _getRandomDelay(): number {
  const minimalDelay = 500;
  const maximalDelay = 2500;

  return (
    Math.floor(Math.random() * (maximalDelay - minimalDelay)) + minimalDelay
  );
}

/**
 * Hook to provide moles grid data, updated at random intervals.
 */
export function useMolesDataAtRandomInterval(): MolesGridData {
  const [molesGridData, setMolesGridData] = useState<MolesGridData>(() => {
    const moleUpCoordinates = _getMoleUpCoordinates();
    return _generateMolesGridData(moleUpCoordinates);
  });

  useEffect(() => {
    const delayBeforeGeneration = _getRandomDelay();

    const timeoutId = setTimeout(() => {
      const moleUpCoordinates = _getMoleUpCoordinates();
      const newMolesGridData = _generateMolesGridData(moleUpCoordinates);
      setMolesGridData(newMolesGridData);
    }, delayBeforeGeneration);

    return (): void => {
      clearTimeout(timeoutId);
    };
  }, [molesGridData]);

  return molesGridData;
}
