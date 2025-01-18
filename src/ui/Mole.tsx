import React from 'react';
import moleDown from '../assets/hole-mole-down.png';
import moleUp from '../assets/hole-mole-up.png';

type MoleProps = {
  isUp: boolean;
  onActiveClick: () => void;
};

function Mole({ isUp, onActiveClick }: MoleProps): React.JSX.Element {
  return (
    <div>
      <img
        src={isUp ? moleUp : moleDown}
        alt={isUp ? 'Mole up in hole' : 'Mole down in hole'}
        onClick={() => {
          if (isUp) {
            onActiveClick();
          }
        }}
      />
    </div>
  );
}

export default Mole;
