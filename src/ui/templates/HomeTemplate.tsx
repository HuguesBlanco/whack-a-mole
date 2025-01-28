import React from 'react';
import { COLOR_YELLOW } from '../../styles/colors';
import Button from '../elements/Button';
import PlayingField from '../elements/PlayingField';
import Title from '../elements/Title';

type HomeTemplateProps = {
  /** Callback executed when the start button is clicked. */
  onClickStart: () => void;

  /** Is the screen portrait oriented and should a specific version of the component be displayed. Defaults to false ? */
  isPortrait?: boolean;
};

/**
 * Renders the initial screen layout.
 */
function HomeTemplate({
  onClickStart,
  isPortrait = false,
}: HomeTemplateProps): React.JSX.Element {
  return (
    <PlayingField>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: COLOR_YELLOW,
          opacity: 0.8,
          userSelect: 'none',
        }}
      >
        <div
          style={{
            height: '100%',
            opacity: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ marginBottom: '6vh' }}>
            <Title isPortrait={isPortrait}>Whack-A-Mole</Title>
          </div>

          <div style={{ marginBottom: '6vh' }}>
            <Button onClick={onClickStart} size="BIG" isPortrait={isPortrait}>
              Start Game
            </Button>
          </div>
        </div>
      </div>
    </PlayingField>
  );
}

export default HomeTemplate;
