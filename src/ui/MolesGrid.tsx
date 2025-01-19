import React from 'react';
import { MolesGridData } from '../types';
import Mole from './Mole';

type MolesGridProps = {
  data: MolesGridData;
  onMoleHit: () => void;
};

function MolesGrid({ data, onMoleHit }: MolesGridProps): React.JSX.Element {
  return (
    <div
      style={{
        width: '60vw',
        height: '60vh',
      }}
    >
      {data.map((rowData, index) => {
        const rowKey = rowData[index]?.id[1]; // TODO: Make a proper mechanism defining the row key.

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
