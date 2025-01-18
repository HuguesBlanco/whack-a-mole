import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hammerCursor from '../assets/hammer-cursor-small.png';
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
    const intervalId = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return (): void => {
      clearInterval(intervalId);
    };
  }, [gameState.status, dispatch]);

  const score = (): void => {
    dispatch(incrementScore());
  };

  return (
    <div style={{ cursor: `url(${hammerCursor}) 32 32, pointer` }}>
      <div>{gameState.timeLeftInSeconds}</div>
      <div>{gameState.score}</div>
      <MolesGrid data={molesGridData} onActiveClick={score} />
    </div>
  );
}

export default GameScreen;
