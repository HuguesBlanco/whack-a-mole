import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGameTimer } from '../hooks/useGameTimer';
import { useMolesDataAtRandomInterval } from '../hooks/useMolesDataAtRandomInterval';
import { useSreenInformation } from '../hooks/useScreenInformation';
import { useTemporaryActivity } from '../hooks/useTemporaryActivity';
import { incrementScore } from '../store/gameSlice';
import { AppDispatch, RootState } from '../store/store';
import GameTemplate from '../ui/templates/GameTemplate';

/**
 * Displays the game screen while the game is in progress.
 * Manages game state, moles' behavior, and user interactions.
 */
function GameScreen(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();

  const { isPortrait } = useSreenInformation();

  const molesData = useMolesDataAtRandomInterval();

  useGameTimer();

  const [isMoleHit, triggerMoleHitEvent] = useTemporaryActivity(500);

  const hitMole = (): void => {
    dispatch(incrementScore());
    triggerMoleHitEvent();
  };

  return (
    <GameTemplate
      molesData={molesData}
      isMoleHit={isMoleHit}
      onHitMole={hitMole}
      scoreValue={gameState.score}
      timeLeftInSeconds={gameState.timeLeftInSeconds}
      isPortrait={isPortrait}
    />
  );
}

export default GameScreen;
