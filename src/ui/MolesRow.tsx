import React from 'react';
import { MolesRowData } from '../types';
import Mole from './Mole';

type MolesRowProps = {
  data: MolesRowData;
  onActiveClick: () => void;
};

function MolesRow({ data, onActiveClick }: MolesRowProps): React.JSX.Element {
  return (
    <div style={{ display: 'flex' }}>
      {data.map((MoleData) => (
        <Mole
          key={MoleData.id}
          isUp={MoleData.isUp}
          onActiveClick={onActiveClick}
        />
      ))}
    </div>
  );
}

export default MolesRow;
