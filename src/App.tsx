import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementTimer, incrementScore, startGame } from './store/gameSlice';
import { AppDispatch, RootState } from './store/store';
import Mole from './ui/Mole';

function App(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();

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
          <Mole isActive onActiveClick={score}></Mole>
          <Mole isActive={false} onActiveClick={score}></Mole>
        </div>
      )}

      {gameState.status === 'ENDED' && <div>{gameState.score}</div>}
    </>
  );
}

export default App;
