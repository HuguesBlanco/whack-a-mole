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

  /** Is the screen portrait oriented and should a specific version of the component be displayed. Defaults to false ? */
  isPortrait?: boolean;
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
  isPortrait = false,
}: ButtonProps): React.JSX.Element {
  const getFontSize = (): string => {
    if (size === 'BIG') {
      return isPortrait ? '6vw' : '6vh';
    }

    return isPortrait ? '3vw' : '2vh';
  };

  return (
    <button
      style={{
        backgroundColor,
        color: textColor,
        fontSize: getFontSize(),
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        padding: size === 'BIG' ? '2vh 4vw' : '1vh 2vw',
        border: `1px solid ${textColor}`,
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
