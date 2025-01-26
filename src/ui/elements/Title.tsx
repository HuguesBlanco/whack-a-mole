import React from 'react';
import { COLOR_PURPLE, COLOR_WHITE } from '../../styles/colors';

type TitleProps = {
  /** The title text. */
  children: string;
};

/**
 * A styled title component that renders a large, fancy header (h1).
 */
function Title({ children }: TitleProps): React.JSX.Element {
  return (
    <h1
      style={{
        fontFamily: 'DynaPuff, serif',
        fontWeight: 600,
        fontSize: '8vw',
        textAlign: 'center',
        textShadow: `
            -1px -1px 0 ${COLOR_WHITE},
             1px -1px 0 ${COLOR_WHITE},
            -1px  1px 0 ${COLOR_WHITE},
             1px  1px 0 ${COLOR_WHITE}`,
        color: COLOR_PURPLE,
      }}
    >
      {children}
    </h1>
  );
}

export default Title;
