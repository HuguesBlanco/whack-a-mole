import React from 'react';
import { MolesRowData } from '../types';
import Mole from './Mole';

type MolesRowProps = {
  data: MolesRowData;
  onMoleHit: () => void;
};

function MolesRow({ data, onMoleHit }: MolesRowProps): React.JSX.Element {
  return (
    <div style={{ display: 'flex' }}>
      {data.map((MoleData) => (
        <Mole key={MoleData.id} isUp={MoleData.isUp} onMoleHit={onMoleHit} />
      ))}
    </div>
  );
}

export default MolesRow;
