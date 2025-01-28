import React, { useState } from 'react';
import moleDownImagePath from '../../assets/hole-mole-down.png';
import moleUpImagePath from '../../assets/hole-mole-up.png';

type MoleProps = {
  /** Is the mole visible in the hole ? */
  isUp: boolean;
  /** Callback function triggered when the mole is hit. */
  onMoleHit: () => void;
};

/**
 * A mole hole on the board, with possibly a mole visible in the hole.
 */
function Mole({ isUp, onMoleHit }: MoleProps): React.JSX.Element {
  const [isHit, setIsHit] = useState(false);

  const isMoleVisible = isUp && !isHit;

  if (!isUp && isHit) {
    setIsHit(false);
  }

  const strikeTheMole = (): void => {
    if (isMoleVisible) {
      onMoleHit();
      setIsHit(true);
    }
  };

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
        style={{ width: '100%', height: 'auto' }}
        src={isMoleVisible ? moleUpImagePath : moleDownImagePath}
        alt={isMoleVisible ? 'Mole up in hole' : 'Mole down in hole'}
        onClick={strikeTheMole}
      />
    </div>
  );
}

export default Mole;
