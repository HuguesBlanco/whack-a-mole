import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getScores, updateScores } from '../services/scoreServices';
import { startGame } from '../store/gameSlice';
import { AppDispatch, RootState } from '../store/store';
import {
  COLOR_GREEN,
  COLOR_PURPLE,
  COLOR_WHITE,
  COLOR_YELLOW,
} from '../styles/colors';
import Button from '../ui/Button';
import LeaderBoard from '../ui/LeaderBoard';
import PlayingField from '../ui/PlayingField';
import ScoreInput from '../ui/ScoreInput';
import TextInput from '../ui/TextInput';
import { isCurrentScore, sortScores } from '../utils/scoreUtils';

/**
 * Screen shown at the end of the game that displays the final score.
 */
function ScoreScreen(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();

  const previousScores = useMemo(getScores, []);
  const scoreId = useMemo(() => uuidv4(), []);
  const [playerName, setPlayerName] = useState('');
  const [isScoreSaved, setIsScoreSaved] = useState(false);
  const currentScore = {
    id: scoreId,
    playerName: playerName,
    scoreValue: gameState.score,
    isCurrent: true,
  };
  const newScores = [...previousScores, currentScore];
  const newScoresSorted = sortScores(newScores);

  const topThreeScores = newScoresSorted.slice(0, 3);

  const currentScoreIndex = newScoresSorted.findIndex((score) =>
    isCurrentScore(score),
  );
  const currentScoreRanking = currentScoreIndex + 1;

  const saveScore = (): void => {
    const scoresUpdatedOrError = updateScores(newScoresSorted);

    if (scoresUpdatedOrError instanceof Error) {
      console.error(scoresUpdatedOrError);
    } else {
      setIsScoreSaved(true);
    }
  };

  const startNewGame = (): void => {
    dispatch(startGame());
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
            width: '50%',
            margin: '15vh auto 0 auto',
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <LeaderBoard
              scoresData={topThreeScores}
              textInputComponent={
                <TextInput value={playerName} setValue={setPlayerName} />
              }
              onClickSave={saveScore}
            />
          </div>

          <div>
            <ScoreInput
              currentScore={currentScore}
              scoreRanking={currentScoreRanking}
              playerName={playerName}
              setPlayerName={setPlayerName}
              isScoreSaved={isScoreSaved}
            />
          </div>

          <div
            style={{ marginTop: '1rem', height: '12vh', textAlign: 'center' }}
          >
            {!isScoreSaved && (
              <div>
                <Button onClick={saveScore} backgroundColor={COLOR_GREEN}>
                  Save score
                </Button>
                <div
                  style={{
                    marginTop: '1rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    color: COLOR_WHITE,
                    fontFamily: 'DynaPuff, serif',
                  }}
                >
                  OR
                </div>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button onClick={startNewGame} backgroundColor={COLOR_YELLOW}>
              Play again
            </Button>
          </div>
        </div>
      </div>
    </PlayingField>
  );
}

export default ScoreScreen;
