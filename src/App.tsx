import React from 'react';
import { useSelector } from 'react-redux';
import './font.css';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import ScoreScreen from './screens/ScoreScreen';
import { RootState } from './store/store';

function App(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);

  return (
    <>
      {gameState.status === 'INITIAL' && <HomeScreen />}
      {gameState.status === 'IN_PROGRESS' && <GameScreen />}
      {gameState.status === 'ENDED' && <ScoreScreen />}
    </>
  );
}

export default App;
