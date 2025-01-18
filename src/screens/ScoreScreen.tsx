import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function ScoreScreen(): React.JSX.Element {
  const gameState = useSelector((state: RootState) => state.game);

  return <div>{gameState.score}</div>;
}

export default ScoreScreen;
