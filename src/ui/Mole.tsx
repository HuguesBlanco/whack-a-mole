import React, { useState } from 'react';
import moleDownImagePath from '../assets/hole-mole-down.png';
import moleUpImagePath from '../assets/hole-mole-up.png';

type MoleProps = {
  isUp: boolean;
  onMoleHit: () => void;
};

function Mole({ isUp, onMoleHit }: MoleProps): React.JSX.Element {
  const [isHit, setIsHit] = useState(false);

  const isMoleVisible = isUp && !isHit;

  if (!isUp && isHit) {
    setIsHit(false);
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <img
        style={{ width: '60%', height: 'auto' }}
        src={isMoleVisible ? moleUpImagePath : moleDownImagePath}
        alt={isMoleVisible ? 'Mole up in hole' : 'Mole down in hole'}
        onClick={() => {
          if (isMoleVisible) {
            onMoleHit();
            setIsHit(true);
          }
        }}
      />
    </div>
  );
}

export default Mole;
