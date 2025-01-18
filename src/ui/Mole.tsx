import React from 'react';
import moleDown from '../assets/hole-mole-down.png';
import moleUp from '../assets/hole-mole-up.png';

type MoleProps = {
  isUp: boolean;
  onMoleHit: () => void;
};

function Mole({ isUp, onMoleHit }: MoleProps): React.JSX.Element {
  return (
    <div>
      <img
        src={isUp ? moleUp : moleDown}
        alt={isUp ? 'Mole up in hole' : 'Mole down in hole'}
        onClick={() => {
          if (isUp) {
            onMoleHit();
          }
        }}
      />
    </div>
  );
}

export default Mole;
