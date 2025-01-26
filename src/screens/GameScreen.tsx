import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hammerCursor from '../assets/hammer-cursor-128x100.png';
import { useGameTimer } from '../hooks/useGameTimer';
import { useMolesDataAtRandomInterval } from '../hooks/useMolesDataAtRandomInterval';
import { useTemporaryActivity } from '../hooks/useTemporaryActivity';
import { incrementScore } from '../store/gameSlice';
import { AppDispatch, RootState } from '../store/store';
import { COLOR_GREEN, COLOR_PURPLE, COLOR_RED } from '../styles/colors';
import MetricPanel from '../ui/MetricPanel';
import MolesGrid from '../ui/MolesGrid';
import PlayingField from '../ui/PlayingField';

/**
 * The screen displayed while the game is in progress. Contains the game itself.
 */
function GameScreen(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();

  const molesGridData = useMolesDataAtRandomInterval();

  useGameTimer();

  const [isMoleHit, triggerMoleHitEvent] = useTemporaryActivity(500);

  const score = (): void => {
    dispatch(incrementScore());
    triggerMoleHitEvent();
  };

  return (
    <div>
      <div style={{ cursor: `url(${hammerCursor}) 35 65, pointer` }}>
        <PlayingField>
          <div
            style={{
              width: '20vw',
              height: '20vh',
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MetricPanel
              label="Score"
              value={gameState.score}
              labelColor={COLOR_RED}
            />
          </div>

          <div
            style={{
              width: '20vw',
              height: '20vh',
              position: 'absolute',
              top: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MetricPanel
              label="Time left"
              value={gameState.timeLeftInSeconds}
              labelColor={COLOR_PURPLE}
            />
          </div>

          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MolesGrid molesData={molesGridData} onMoleHit={score} />
          </div>
        </PlayingField>
      </div>

      {isMoleHit && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: COLOR_GREEN,
            opacity: 0.5,
            fontFamily: 'DynaPuff, serif',
            fontSize: '8vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              transform: 'rotate(-20deg)',
            }}
          >
            Ouch !
          </div>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
