import { MolesGridData } from '../types';

const ROW_IDS = [1, 2, 3];

const COLUMN_IDS = ['A', 'B', 'C', 'D'];

function getMoleUpCoordonates(): { row: number; column: string } {
  const selectedRow = Math.floor(Math.random() * 3);
  const selectedColumn = Math.floor(Math.random() * 4);

  return {
    row: ROW_IDS[selectedRow] ?? 1, // TODO: Solve than in a proper way
    column: COLUMN_IDS[selectedColumn] ?? 'A', // TODO: Solve than in a proper way
  };
}

export function generateMolesGridData(): MolesGridData {
  const moleUpCoordonates = getMoleUpCoordonates();

  return Array.from(ROW_IDS, (rowId) => {
    return Array.from(COLUMN_IDS, (columnId) => {
      const id = columnId + String(rowId);

      if (
        rowId === moleUpCoordonates.row &&
        columnId === moleUpCoordonates.column
      ) {
        return { id, isUp: true };
      }
      return { id, isUp: false };
    });
  });
}
