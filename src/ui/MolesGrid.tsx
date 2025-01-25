import React from 'react';
import { MolesGridData } from '../types/moleTypes';
import Mole from './Mole';

type MolesGridProps = {
  /** The data needed to create the moles grid*/
  data: MolesGridData;
  /** The callback executed when a mole is touched. */
  onMoleHit: () => void;
};

/**
 * Display all the moles in a grid.
 */
function MolesGrid({ data, onMoleHit }: MolesGridProps): React.JSX.Element {
  return (
    <div
      style={{
        width: '60vw',
        height: '60vh',
      }}
    >
      {data.map((rowData) => {
        const rowKey = rowData.reduce<string>((key, moleData) => {
          const newKey = key + moleData.id;
          return newKey;
        }, '');

        return (
          <div
            className="row"
            key={rowKey}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {rowData.map((moleData) => (
              <div
                className="cell"
                key={moleData.id}
                style={{ width: '15vw', height: '20vh' }}
              >
                <Mole isUp={moleData.isUp} onMoleHit={onMoleHit} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default MolesGrid;
