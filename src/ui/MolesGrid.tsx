import React from 'react';
import { MolesGridData } from '../types';
import MolesRow from './MolesRow';

type MolesGridProps = {
  data: MolesGridData;
  onMoleHit: () => void;
};

function MolesGrid({ data, onMoleHit }: MolesGridProps): React.JSX.Element {
  return (
    <div>
      {data.map((rowData, index) => {
        const key = rowData[index]?.id[1]; // TODO: Make a proper mechanism defining the row key.

        return <MolesRow key={key} data={rowData} onMoleHit={onMoleHit} />;
      })}
    </div>
  );
}

export default MolesGrid;
