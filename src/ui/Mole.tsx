import React from 'react';
import moleDown from '../assets/hole-mole-down.png';
import moleUp from '../assets/hole-mole-up.png';

type MoleProps = {
  isActive: boolean;
  onActiveClick: () => void;
};

function Mole({ isActive, onActiveClick }: MoleProps): React.JSX.Element {
  return (
    <div>
      <img
        src={isActive ? moleUp : moleDown}
        alt={isActive ? 'Mole up in hole' : 'Mole down in hole'}
        onClick={() => {
          if (isActive) {
            onActiveClick();
          }
        }}
      />
    </div>
  );
}

export default Mole;
