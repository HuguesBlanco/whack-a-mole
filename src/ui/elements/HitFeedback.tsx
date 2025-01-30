import React from 'react';
import { COLOR_GREEN } from '../../styles/colors';

type HitFeedbackProps = {
  /** Is the screen portrait oriented and should a specific version of the component be displayed. Defaults to false ? */
  isPortrait?: boolean;
};

/**
 * Displays a feedback to the user when a mole is hit.
 */
function HitFeedback({
  isPortrait = false,
}: HitFeedbackProps): React.JSX.Element {
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
        fontSize: isPortrait ? '20vw' : '20vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'none',
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
