import React from 'react';
import { MolesData } from '../types/moleTypes';
import Mole from './Mole';

type MolesGridProps = {
  /** The data needed to create the moles grid*/
  molesData: MolesData;
  /** The callback executed when a mole is touched. */
  onMoleHit: () => void;
};

/**
 * Display all the moles in a grid.
 */
function MolesGrid({
  molesData,
  onMoleHit,
}: MolesGridProps): React.JSX.Element {
  return (
    <div
      style={{
        width: '60vw',
        height: '60vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, auto)',
      }}
    >
      {molesData.map((moleDatum) => (
        <div key={moleDatum.id}>
          <Mole isUp={moleDatum.isUp} onMoleHit={onMoleHit} />
        </div>
      ))}
    </div>
  );
}

export default MolesGrid;
