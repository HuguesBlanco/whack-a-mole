import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  getDefaultScores,
  getScores,
  LOCAL_STORAGE_SCORE_KEY,
  saveScores,
} from '../services/scoreServices';
import { startGame } from '../store/gameSlice';
import { AppDispatch, RootState } from '../store/store';
import { Score } from '../types/scoreTypes';
import ScoreTemplate from '../ui/templates/ScoreTemplate';
import {
  isValidScoreList,
  removeCurrentGameScoreInformation,
  sortScores,
} from '../utils/scoreUtils';

/**
 * Displays the final score screen at the end of the game.
 * Includes the current score, a leaderboard of top scores, and actions to save the score or start a new game.
 */
function ScoreScreen(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();

  const previousScores = useMemo(() => {
    const scoresOrError = getScores(LOCAL_STORAGE_SCORE_KEY);
    const scores =
      !(scoresOrError instanceof Error) && isValidScoreList(scoresOrError)
        ? scoresOrError
        : getDefaultScores();

    return scores;
  }, []);
  const scoreId = useMemo(() => uuidv4(), []);
  const [playerName, setPlayerName] = useState('');
  const [isScoreSaved, setIsScoreSaved] = useState(false);
  const currentScore: Score = {
    id: scoreId,
    playerName: playerName,
    scoreValue: gameState.score,
    isCurrentGameScore: true,
  };
  const newScores = [...previousScores, currentScore];
  const newScoresSorted = sortScores(newScores);

  const topThreeScores = newScoresSorted.slice(0, 3);

  const currentScoreIndex = newScoresSorted.findIndex(
    (score) => score.isCurrentGameScore === true,
  );
  const currentScoreRanking = currentScoreIndex + 1;

  const saveCurrentGameScore = (): void => {
    const cleanedScores = removeCurrentGameScoreInformation(newScores);
    const sortedScores = sortScores(cleanedScores);
    const savedScoresOrError = saveScores(
      LOCAL_STORAGE_SCORE_KEY,
      sortedScores,
    );

    if (savedScoresOrError instanceof Error) {
      console.error(savedScoresOrError);
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
      setPlayerName={setPlayerName}
      isCurrentScoreSaved={isScoreSaved}
      onClickSaveCurrentScore={saveCurrentGameScore}
      onClickPlayAgain={startNewGame}
    />
  );
}

export default ScoreScreen;
