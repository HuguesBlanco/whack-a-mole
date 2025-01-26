import React from 'react';
import { COLOR_GREEN } from '../../styles/colors';

/**
 * Displays a feedback to the user when a mole is hit.
 */
function HitFeedback(): React.JSX.Element {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: COLOR_GREEN,
        opacity: 0.5,
        fontFamily: 'DynaPuff, serif',
        fontSize: '8vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          transform: 'rotate(-20deg)',
        }}
      >
        Ouch !
      </div>
    </div>
  );
}

export default HitFeedback;
