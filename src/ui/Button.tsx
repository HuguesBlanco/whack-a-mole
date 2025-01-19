import React from 'react';
import { COLOR_PURPLE, COLOR_RED } from '../styles/colors';

type ButtonProps = {
  /** The text in the button. */
  children: string;

  /** The callback executed when clicking on the button. */
  onClick: () => void;
};

/**
 * A styled button component designed with a playful appearance.
 */
function Button({ children, onClick }: ButtonProps): React.JSX.Element {
  const handleClick = (): void => {
    onClick();
  };

  return (
    <button
      style={{
        backgroundColor: COLOR_RED,
        color: COLOR_PURPLE,
        fontSize: '3vw',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        padding: '1rem 2rem',
        border: `2px solid ${COLOR_PURPLE}`,
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s ease-in-out', // Smooth scaling on hover
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
