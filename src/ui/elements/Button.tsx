import React from 'react';
import { COLOR_PURPLE, COLOR_RED } from '../../styles/colors';

type ButtonProps = {
  /** The text in the button. */
  children: string;

  /** The callback executed when clicking on the button. */
  onClick: () => void;

  /** The color of the background. */
  backgroundColor?: string;

  /** The text color. */
  textColor?: string;

  /** The size of the button. */
  size?: 'SMALL' | 'BIG';
};

/**
 * A styled button component designed with a playful appearance.
 */
function Button({
  children,
  onClick,
  backgroundColor = COLOR_RED,
  textColor = COLOR_PURPLE,
  size = 'SMALL',
}: ButtonProps): React.JSX.Element {
  const isBigButton = size === 'BIG';

  return (
    <button
      style={{
        backgroundColor,
        color: textColor,
        fontSize: isBigButton ? '4vw' : '1.5rem',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        padding: '1rem 2rem',
        border: `2px solid ${textColor}`,
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
