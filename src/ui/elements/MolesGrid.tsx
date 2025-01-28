import React from 'react';
import { MolesData } from '../../types/moleTypes';
import Mole from './Mole';

type MolesGridProps = {
  /** The data needed to create the moles grid*/
  molesData: MolesData;
  /** The callback executed when a mole is touched. */
  onMoleHit: () => void;

  /** Is the screen portrait oriented and should a specific version of the component be displayed. Defaults to false ? */
  isPortrait?: boolean;
};

/**
 * Display all the moles in a grid.
 */
function MolesGrid({
  molesData,
  onMoleHit,
  isPortrait = false,
}: MolesGridProps): React.JSX.Element {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: isPortrait ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
        gridTemplateRows: isPortrait
          ? 'repeat(4, 25%)'
          : 'repeat(3, 33.333333%)',
        columnGap: '18%',
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
