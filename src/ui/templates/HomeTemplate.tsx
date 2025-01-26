import React from 'react';
import { COLOR_YELLOW } from '../../styles/colors';
import Button from '../elements/Button';
import PlayingField from '../elements/PlayingField';
import Title from '../elements/Title';

type HomeTemplateProps = {
  /** Callback executed when the start button is clicked. */
  onClickStart: () => void;
};

/**
 * Renders the initial screen layout.
 */
function HomeTemplate({ onClickStart }: HomeTemplateProps): React.JSX.Element {
  return (
    <PlayingField>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: COLOR_YELLOW,
          opacity: 0.8,
        }}
      >
        <div
          style={{
            opacity: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15vh',
          }}
        >
          <Title>Whack a mole</Title>
          <Button onClick={onClickStart} size="BIG">
            Start Game
          </Button>
        </div>
      </div>
    </PlayingField>
  );
}

export default HomeTemplate;
