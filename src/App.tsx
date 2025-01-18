import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateMolesGridData } from './libs/gridGeneration';
import { decrementTimer, incrementScore, startGame } from './store/gameSlice';
import { AppDispatch, RootState } from './store/store';
import { MolesGridData } from './types';
import MolesGrid from './ui/MolesGrid';

function App(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();

  const molesGridData: MolesGridData = useMemo(generateMolesGridData, []);

  const handleGameStart = (): void => {
    dispatch(startGame());
  };

  const score = (): void => {
    dispatch(incrementScore());
  };

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

  return (
    <>
      <div>{gameState.status}</div>
      <div>{gameState.timeLeftInSeconds}</div>

      {gameState.status === 'INITIAL' && (
        <div>
          <button onClick={handleGameStart}>Start</button>
        </div>
      )}

      {gameState.status === 'IN_PROGRESS' && (
        <div>
          <div>{gameState.score}</div>
          <MolesGrid data={molesGridData} onActiveClick={score} />
        </div>
      )}

      {gameState.status === 'ENDED' && <div>{gameState.score}</div>}
    </>
  );
}

export default App;
