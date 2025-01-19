import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  COLOR_GREEN,
  COLOR_PURPLE,
  COLOR_RED,
  COLOR_YELLOW,
} from '../styles/colors';
import Button from '../ui/Button';
import MetricPanel from '../ui/MetricPanel';
import PlayingField from '../ui/PlayingField';

/**
 * Screen shown at the end of the game that displays the final score.
 */
function ScoreScreen(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);

  const saveScore = (): void => {
    console.log('Save score');
  };

  const startNewGame = (): void => {
    console.log('New game');
  };

  return (
    <PlayingField>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: COLOR_PURPLE,
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
          <MetricPanel
            label="Score"
            value={gameState.score}
            labelColor={COLOR_YELLOW}
            valueColor={COLOR_GREEN}
          />
          <Button onClick={saveScore} backgroundColor={COLOR_RED}>
            Save your score
          </Button>
          <Button onClick={startNewGame} backgroundColor={COLOR_YELLOW}>
            Play again
          </Button>
        </div>
      </div>
    </PlayingField>
  );
}

export default ScoreScreen;
