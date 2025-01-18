import React from 'react';
import { MolesGridData } from '../types';
import MolesRow from './MolesRow';

type MolesGridProps = {
  data: MolesGridData;
  onActiveClick: () => void;
};

function MolesGrid({ data, onActiveClick }: MolesGridProps): React.JSX.Element {
  return (
    <div>
      {data.map((rowData, index) => {
        const key = rowData[index]?.id[1]; // TODO: Make a proper mechanism defining the row key.

        return (
          <MolesRow key={key} data={rowData} onActiveClick={onActiveClick} />
        );
      })}
    </div>
  );
}

export default MolesGrid;
