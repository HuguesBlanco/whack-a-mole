import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hammerCursor from '../assets/hammer-cursor-128x100.png';
import { useGameTimer } from '../hooks/useGameTimer';
import { generateMolesGridData } from '../libs/gridGeneration';
import { incrementScore } from '../store/gameSlice';
import { AppDispatch, RootState } from '../store/store';
import { MolesGridData } from '../types';
import MetricPanel from '../ui/MetricPanel';
import MolesGrid from '../ui/MolesGrid';
import PlayingField from '../ui/PlayingField';

function getRandomDelay(): number {
  return Math.floor(Math.random() * (2000 - 200 + 1)) + 200;
}

function GameScreen(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();

  const [molesGridData, setMolesGridData] = useState<MolesGridData>(
    generateMolesGridData(),
  );

  // Generate grid data at random interval.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMolesGridData(generateMolesGridData());
    }, getRandomDelay());

    return (): void => {
      clearTimeout(timeoutId);
    };
  }, [molesGridData]);

  useGameTimer();

  const score = (): void => {
    dispatch(incrementScore());
  };

  return (
    <div style={{ cursor: `url(${hammerCursor}) 128 100, pointer` }}>
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
            labelColor="#ea1831"
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
            labelColor="#1422c8"
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
          <MolesGrid data={molesGridData} onMoleHit={score} />
        </div>
      </PlayingField>
    </div>
  );
}

export default GameScreen;
