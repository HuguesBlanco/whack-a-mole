import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hammerCursor from '../assets/hammer-cursor-small.png';
import { generateMolesGridData } from '../libs/gridGeneration';
import { decrementTimer, incrementScore } from '../store/gameSlice';
import { AppDispatch, RootState } from '../store/store';
import { MolesGridData } from '../types';
import MolesGrid from '../ui/MolesGrid';

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

  // Run game timer.
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return (): void => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  const score = (): void => {
    dispatch(incrementScore());
  };

  return (
    <div style={{ cursor: `url(${hammerCursor}) 32 32, pointer` }}>
      <div>{gameState.timeLeftInSeconds}</div>
      <div>{gameState.score}</div>
      <MolesGrid data={molesGridData} onMoleHit={score} />
    </div>
  );
}

export default GameScreen;
