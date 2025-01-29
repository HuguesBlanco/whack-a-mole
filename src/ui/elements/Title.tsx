import React from 'react';
import { COLOR_PURPLE, COLOR_WHITE } from '../../styles/colors';

type TitleProps = {
  /** The title text. */
  children: string;

  /** Is the screen portrait oriented and should a specific version of the component be displayed. Defaults to false ? */
  isPortrait?: boolean;
};

/**
 * A styled title component that renders a large, fancy header (h1).
 */
function Title({
  children,
  isPortrait = false,
}: TitleProps): React.JSX.Element {
  const spaceOrDashRegex = /[\s-]+/;
  const words = children.split(spaceOrDashRegex);

  return (
    <h1
      style={{
        fontFamily: 'DynaPuff, serif',
        fontWeight: 600,
        fontSize: isPortrait ? '15vw' : '8vw',
        textAlign: 'center',
        textShadow: `
            -1px -1px 0 ${COLOR_WHITE},
             1px -1px 0 ${COLOR_WHITE},
            -1px  1px 0 ${COLOR_WHITE},
             1px  1px 0 ${COLOR_WHITE}`,
        color: COLOR_PURPLE,
      }}
    >
      {isPortrait
        ? words.map((word, index) => (
            <span key={index} style={{ display: 'block', marginBottom: '5vh' }}>
              {word}
            </span>
          ))
        : children}
    </h1>
  );
}

export default Title;
