import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateMolesGridData } from '../libs/gridGeneration';
import { decrementTimer, incrementScore } from '../store/gameSlice';
import { AppDispatch, RootState } from '../store/store';
import { MolesGridData } from '../types';
import MolesGrid from '../ui/MolesGrid';

function GameScreen(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();

  const molesGridData: MolesGridData = useMemo(generateMolesGridData, []);

  useEffect(() => {
    if (gameState.status === 'IN_PROGRESS') {
      const intervalId = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);

      return (): void => {
        clearInterval(intervalId);
      };
    }

    return undefined;
  }, [gameState.status, dispatch]);

  const score = (): void => {
    dispatch(incrementScore());
  };

  return (
    <div>
      <div>{gameState.timeLeftInSeconds}</div>
      <div>{gameState.score}</div>
      <MolesGrid data={molesGridData} onActiveClick={score} />
    </div>
  );
}

export default GameScreen;
