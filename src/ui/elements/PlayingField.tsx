import React from 'react';
import fieldImageUrl from '../assets/field-background.jpg';

type PlayingFieldProps = {
  /** The elements contained in the game board. */
  children: React.JSX.Element | React.JSX.Element[];
};

/**
 * Display the field on which we play the game. The background.
 */
function PlayingField({ children }: PlayingFieldProps): React.JSX.Element {
  return (
    <div
      style={{
        backgroundImage: `url(${fieldImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export default PlayingField;
