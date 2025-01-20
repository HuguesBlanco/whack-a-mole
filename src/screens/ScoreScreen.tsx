import React from 'react';
import { useSelector } from 'react-redux';
import { getScores, updateScores } from '../services/scoreServices';
import { RootState } from '../store/store';
import { COLOR_PURPLE, COLOR_YELLOW } from '../styles/colors';
import { ScoresWithCurrentInfo } from '../types';
import Button from '../ui/Button';
import LeaderBoard from '../ui/LeaderBoard';
import PlayingField from '../ui/PlayingField';

/**
 * Screen shown at the end of the game that displays the final score.
 */
function ScoreScreen(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);

  const previousScores = getScores();

  const scoreId = String(Date.now());

  const newScores: ScoresWithCurrentInfo = [
    ...previousScores,
    {
      id: scoreId,
      playerName: '',
      scoreValue: gameState.score,
      isCurrent: true,
    },
  ];

  const saveScore = (): void => {
    updateScores(newScores);
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
          <div style={{ marginBottom: '2rem' }}>
            <LeaderBoard scoresData={newScores} onClickSave={saveScore} />
          </div>
          <Button onClick={startNewGame} backgroundColor={COLOR_YELLOW}>
            Play again
          </Button>
        </div>
      </div>
    </PlayingField>
  );
}

export default ScoreScreen;
