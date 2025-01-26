import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getScores, updateScores } from '../services/scoreServices';
import { startGame } from '../store/gameSlice';
import { AppDispatch, RootState } from '../store/store';
import { CurrentGameScore } from '../types/scoreTypes';
import ScoreTemplate from '../ui/templates/ScoreTemplate';
import { isCurrentGameScore, sortScores } from '../utils/scoreUtils';

/**
 * Displays the final score screen at the end of the game.
 * Includes the current score, a leaderboard of top scores, and actions to save the score or start a new game.
 */
function ScoreScreen(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();

  const previousScores = useMemo(getScores, []);
  const scoreId = useMemo(() => uuidv4(), []);
  const [playerName, setPlayerName] = useState('');
  const [isScoreSaved, setIsScoreSaved] = useState(false);
  const currentScore: CurrentGameScore = {
    id: scoreId,
    playerName: playerName,
    scoreValue: gameState.score,
    isCurrentGameScore: true,
  };
  const newScores = [...previousScores, currentScore];
  const newScoresSorted = sortScores(newScores);

  const topThreeScores = newScoresSorted.slice(0, 3);

  const currentScoreIndex = newScoresSorted.findIndex((score) =>
    isCurrentGameScore(score),
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
    <ScoreTemplate
      displayedScores={topThreeScores}
      currentScore={currentScore}
      currentScoreRanking={currentScoreRanking}
      playerName={playerName}
      setPlayerName={setPlayerName}
      isCurrentScoreSaved={isScoreSaved}
      onClickSaveCurrentScore={saveScore}
      onClickPlayAgain={startNewGame}
    />
  );
}

export default ScoreScreen;
